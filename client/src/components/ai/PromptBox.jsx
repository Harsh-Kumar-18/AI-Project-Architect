import React from "react";
import Button from "../common/Button";

const PromptBox = ({ prompt, setPrompt, onGenerate, loading = false, disabled = false }) => {

  const handleSubmit = () => {
    if (!prompt.trim() || disabled) return;
    onGenerate();
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Describe Your Project
        </h2>
        {disabled && (
          <p className="mt-1 text-sm text-red-500 font-medium">
            You have no AI credits remaining. Credits restore 12 hours after each use.
          </p>
        )}
      </div>

      <textarea
        rows={6}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={disabled}
        placeholder="Example: Build a Netflix Clone with authentication, subscription plans and video streaming."
        className={`w-full rounded-2xl border border-gray-200 bg-gray-50 p-5 text-gray-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />

      <div className="mt-4 flex justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          disabled={loading || disabled}
        >
          {loading ? "Generating..." : "Generate Architecture"}
        </Button>
      </div>
    </div>
  );
};

export default PromptBox;
