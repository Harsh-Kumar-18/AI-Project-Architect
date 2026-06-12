import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import PromptBox from "../components/ai/PromptBox";
import LoadingAnimation from "../components/ai/LoadingAnimation";
import AIResponse from "../components/ai/AIResponse";
import { generateProject } from "../services/aiService";
import { saveProject } from "../services/projectService";
import EmptyState from "../components/ai/EmptyState";
import { FaBookmark, FaCheck, FaBolt } from "react-icons/fa";
import { getProfile } from "../services/userService";

// ── helpers ──────────────────────────────────────────────────────────────
const formatTimeLeft = (isoDate) => {
  if (!isoDate) return null;
  const diff = new Date(isoDate) - Date.now();
  if (diff <= 0) return null;
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return `${h}h ${m}m`;
};
// ─────────────────────────────────────────────────────────────────────────

const GenerateProject = () => {
  const [prompt, setPrompt]               = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [loading, setLoading]             = useState(false);
  const [projectData, setProjectData]     = useState(null);
  const [saving, setSaving]               = useState(false);
  const [saved, setSaved]                 = useState(false);
  const [error, setError]                 = useState("");
  const [aiCredits, setAiCredits]         = useState(null);   // null = loading
  const [nextRestore, setNextRestore]     = useState(null);   // ISO string or null

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      const data = await getProfile();
      setAiCredits(data?.user?.aiCredits ?? 10);
      setNextRestore(data?.user?.nextRestore ?? null);
    } catch (err) {
      console.error("Failed to fetch credits", err);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    // Client-side guard (server enforces this too)
    if (aiCredits !== null && aiCredits <= 0) {
      const left = formatTimeLeft(nextRestore);
      setError(
        left
          ? `No AI credits left. Next credit restores in ${left}.`
          : "No AI credits left. Credits restore 12 hours after each use."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSaved(false);

      const currentPrompt = prompt.trim();
      setSubmittedPrompt(currentPrompt);

      const response = await generateProject(currentPrompt);

      setProjectData(response.data);
      setPrompt("");

      // Update credits from server response (most accurate source)
      if (response.aiCredits !== undefined) {
        setAiCredits(response.aiCredits);
        setNextRestore(response.nextRestore ?? null);
      } else {
        // Fallback: re-fetch profile
        await fetchCredits();
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Generation failed. Please try again.";
      setError(msg);

      // Server may return updated credit info on 403
      if (err.response?.data?.aiCredits !== undefined) {
        setAiCredits(err.response.data.aiCredits);
        setNextRestore(err.response.data.nextRestore ?? null);
      } else {
        await fetchCredits();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!projectData || saving || saved) return;
    try {
      setSaving(true);
      await saveProject({
        title: projectData?.title || submittedPrompt.slice(0, 60),
        prompt: submittedPrompt,
        generatedOutput: projectData,
      });
      setSaved(true);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const timeLeft     = formatTimeLeft(nextRestore);
  const noCredits    = aiCredits !== null && aiCredits <= 0;
  const creditColor  =
    aiCredits === null   ? "bg-slate-50 text-slate-400 border-slate-200"
    : aiCredits > 3      ? "bg-blue-50 text-blue-700 border-blue-200"
    : aiCredits > 0      ? "bg-amber-50 text-amber-700 border-amber-200"
    :                      "bg-red-50 text-red-600 border-red-200";

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-12">

        {/* ── Page Header ─────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                AI Architect
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
              Generate Project Architecture
            </h1>
            <p className="mt-1 text-sm text-slate-500 max-w-lg">
              Describe your idea — get a complete blueprint with tech stack,
              folder structure, roadmap, and starter code.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* AI Credits badge */}
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border ${creditColor}`}>
              <FaBolt size={11} />
              {aiCredits === null ? "…" : aiCredits}
              &nbsp;credit{aiCredits !== 1 ? "s" : ""} left
            </div>

            {/* Save button – visible only when result is ready */}
            {!loading && projectData && (
              <button
                onClick={handleSave}
                disabled={saving || saved}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  saved
                    ? "bg-green-50 text-green-600 border border-green-200"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                }`}
              >
                {saving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving…
                  </>
                ) : saved ? (
                  <><FaCheck size={12} /> Saved</>
                ) : (
                  <><FaBookmark size={12} /> Save Project</>
                )}
              </button>
            )}
          </div>
        </div>

        {/* ── Next-restore banner ──────────────────────────────────── */}
        {aiCredits !== null && aiCredits < 10 && timeLeft && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl text-sm">
            <FaBolt size={12} />
            <span>
              Next credit restores in <strong>{timeLeft}</strong>.
              Credits refill 12 hours after each use.
            </span>
          </div>
        )}

        {/* ── Prompt input ─────────────────────────────────────────── */}
        <PromptBox
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={handleGenerate}
          loading={loading}
          disabled={noCredits}
        />

        {/* ── Error banner ─────────────────────────────────────────── */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {loading && <LoadingAnimation />}

        {!loading && !projectData && <EmptyState />}

        {/* ── Result + bottom save ─────────────────────────────────── */}
        {!loading && projectData && (
          <>
            <AIResponse projectData={projectData} prompt={submittedPrompt} />

            <div className="flex justify-center pt-6">
              <button
                onClick={handleSave}
                disabled={saving || saved}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold ${
                  saved
                    ? "bg-green-50 text-green-600 border border-green-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {saving ? "Saving..." : saved ? (
                  <><FaCheck size={12} /> Saved</>
                ) : (
                  <><FaBookmark size={12} /> Save Project</>
                )}
              </button>
            </div>
          </>
        )}

      </div>
    </DashboardLayout>
  );
};

export default GenerateProject;
