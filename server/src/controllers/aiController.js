import userModel from "../models/User.js";
import generateProjectArchitecture from "../services/aiService.js";
import {
  restoreExpiredCredits,
  deductCredit,
  getNextRestoreTime,
} from "../utils/creditHelper.js";

/**
 * POST /api/ai/generate
 * Auth middleware sets req.user (with _id).
 * Body: { prompt: string }
 */
export const generateProject = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required.",
      });
    }

    // 1. Load full user doc (authMiddleware strips password only)
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // 2. Restore credits whose 12-hour window has elapsed
    await restoreExpiredCredits(user);

    // 3. Block if no credits left
    if (user.aiCredits <= 0) {
      return res.status(403).json({
        success: false,
        message: "No AI credits remaining.",
        aiCredits: 0,
        nextRestore: getNextRestoreTime(user),
      });
    }

    // 4. Deduct 1 credit BEFORE AI call (prevents double-spend on retry)
    await deductCredit(user);

    // 5. Run AI generation — refund credit if it fails
    let result;
    try {
      result = await generateProjectArchitecture(prompt.trim());
    } catch (aiError) {
      user.aiCredits += 1;
      user.creditHistory.pop();
      await user.save();
      return res.status(500).json({
        success: false,
        message: aiError.message || "AI generation failed.",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
      aiCredits: user.aiCredits,
      nextRestore: getNextRestoreTime(user),
    });

  } catch (error) {
    console.error("AI generation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};