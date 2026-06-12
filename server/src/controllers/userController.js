// controllers/userController.js

import userModel from "../models/User.js";
import { restoreExpiredCredits, getNextRestoreTime } from "../utils/creditHelper.js";

/**
 * GET /api/users/profile
 */
export const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });

    // Always restore expired credits before returning so the UI is accurate
    await restoreExpiredCredits(user);

    return res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        github: user.github,
        linkedin: user.linkedin,
        portfolio: user.portfolio,
        profileImage: user.profileImage,
        aiCredits: user.aiCredits,
        nextRestore: getNextRestoreTime(user), // ISO date or null
      },
    });
  } catch (error) {
    console.error("getProfile error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * PUT /api/users/profile
 * Only editable fields — aiCredits is managed server-side only.
 */
export const updateProfile = async (req, res) => {
  try {
    const { bio, github, linkedin, portfolio, profileImage } = req.body;

    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (bio          !== undefined) user.bio          = bio;
    if (github       !== undefined) user.github       = github;
    if (linkedin     !== undefined) user.linkedin     = linkedin;
    if (portfolio    !== undefined) user.portfolio    = portfolio;
    if (profileImage !== undefined) user.profileImage = profileImage;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        github: user.github,
        linkedin: user.linkedin,
        portfolio: user.portfolio,
        profileImage: user.profileImage,
        aiCredits: user.aiCredits,
        nextRestore: getNextRestoreTime(user),
      },
    });
  } catch (error) {
    console.error("updateProfile error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
