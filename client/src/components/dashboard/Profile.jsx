import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getUser } from "../../services/authService";
import { FaGithub, FaLinkedin, FaGlobe, FaCamera, FaCheck } from "react-icons/fa";
import { getProfile, updateProfile } from "../../services/userService";
import { uploadImage } from "../../services/uploadService";
 
const Profile = () => {
  const user = getUser();
 
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
 
  const fields = [profileImage, bio, github, linkedin, portfolio];
  const completionPercentage = Math.round(
    (fields.filter(Boolean).length / fields.length) * 100
  );
 
  const completionColor =
    completionPercentage === 100
      ? "#22c55e"
      : completionPercentage >= 60
      ? "#3b82f6"
      : "#f59e0b";
 
  useEffect(() => {
    fetchProfile();
  }, []);
 
  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      const u = data.user;
      setBio(u.bio || "");
      setGithub(u.github || "");
      setLinkedin(u.linkedin || "");
      setPortfolio(u.portfolio || "");
      setProfileImage(u.profileImage || "");
    } catch (error) {
      console.error(error);
    }
  };
 
  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfile({ bio, github, linkedin, portfolio, profileImage });
 
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...stored, profileImage }));
      window.dispatchEvent(new Event("userUpdated"));
 
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };
 
  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset =
    circumference - (completionPercentage / 100) * circumference;
 
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-5 pb-10">
 
        {/* ── Hero card ── */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Banner */}
          <div className="h-32 bg-linear-to-br from-slate-800 via-slate-700 to-blue-900 relative flex items-center justify-center px-8">
            <div className="text-center">
              <p className="text-white/80 text-sm italic font-light tracking-wide leading-relaxed">
                "The best way to predict the future is to invent it."
              </p>
            </div>
          </div>
 
          {/* Avatar + info */}
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-12">
              {/* Avatar */}
              <div className="relative shrink-0">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl border-4 border-white bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-4xl font-bold text-white shadow-md">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
 
                <label className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg cursor-pointer shadow-md transition">
                  {uploading ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaCamera size={11} />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploading(true);
                      const preview = URL.createObjectURL(file);
                      setProfileImage(preview);
                      try {
                        const data = await uploadImage(file);
                        setProfileImage(data.imageUrl);
                        URL.revokeObjectURL(preview);
                      } catch (err) {
                        console.error(err);
                        setProfileImage("");
                      } finally {
                        setUploading(false);
                      }
                    }}
                  />
                </label>
              </div>
 
              {/* Name / email */}
              <div className="pb-1">
                <h1 className="text-xl font-bold text-slate-900 leading-tight">
                  {user?.name}
                </h1>
                <p className="text-sm text-slate-400 mt-0.5">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
 
        {/* ── Profile completion ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-5">
          {/* SVG ring */}
          <div className="relative shrink-0 w-16 h-16">
            <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
              <circle cx="32" cy="32" r="28" fill="none" stroke="#f1f5f9" strokeWidth="6" />
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke={completionColor}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-700">
              {completionPercentage}%
            </span>
          </div>
 
          <div>
            <p className="text-sm font-semibold text-slate-700">Profile completion</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {completionPercentage === 100
                ? "Your profile is complete 🎉"
                : "Fill in all fields to personalise your AI recommendations."}
            </p>
 
            {/* field chips */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {[
                { label: "Photo", value: profileImage },
                { label: "Bio", value: bio },
                { label: "GitHub", value: github },
                { label: "LinkedIn", value: linkedin },
                { label: "Portfolio", value: portfolio },
              ].map(({ label, value }) => (
                <span
                  key={label}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    value
                      ? "bg-green-50 text-green-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {value ? "✓" : "○"} {label}
                </span>
              ))}
            </div>
          </div>
        </div>
 
        {/* ── About Me ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            About Me
          </label>
          <textarea
            rows={4}
            maxLength={500}
            placeholder="A short bio about yourself — your stack, interests, or what you're building."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3.5 text-sm border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-300 transition"
          />
          <p className="text-xs text-slate-400 mt-1.5 text-right">
            {bio.length} / 500
          </p>
        </div>
 
        {/* ── Social Profiles ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm font-semibold text-slate-700 mb-4">Social Profiles</p>
 
          <div className="space-y-3">
            {[
              {
                icon: <FaGithub size={15} className="text-slate-500" />,
                placeholder: "https://github.com/username",
                value: github,
                onChange: setGithub,
                label: "GitHub",
              },
              {
                icon: <FaLinkedin size={15} className="text-blue-500" />,
                placeholder: "https://linkedin.com/in/username",
                value: linkedin,
                onChange: setLinkedin,
                label: "LinkedIn",
              },
              {
                icon: <FaGlobe size={15} className="text-emerald-500" />,
                placeholder: "https://yourportfolio.com",
                value: portfolio,
                onChange: setPortfolio,
                label: "Portfolio",
              },
            ].map(({ icon, placeholder, value, onChange, label }) => (
              <div key={label} className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
                {icon}
                <input
                  type="url"
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="flex-1 text-sm text-slate-700 placeholder-slate-300 focus:outline-none bg-transparent"
                />
                {value && (
                  <FaCheck size={11} className="text-green-500 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
 
        {/* ── Save button ── */}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
            saved
              ? "bg-green-500 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving…
            </>
          ) : saved ? (
            <>
              <FaCheck size={13} />
              Saved
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </DashboardLayout>
  );
};
 
export default Profile;