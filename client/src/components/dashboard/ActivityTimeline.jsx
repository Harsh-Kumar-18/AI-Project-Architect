import React, { useEffect, useState } from "react";
import { FaRocket } from "react-icons/fa";
import { getProjects } from "../../services/projectService";
 
const ActivityTimeline = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getProjects();
        const projects = Array.isArray(data) ? data : data.projects || [];
 
        const timelineData = projects
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          .map((project) => ({
            id: project._id,
            action: project.title,
            time: new Date(project.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          }));
 
        setActivities(timelineData);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
 
    fetchActivities();
  }, []);
 
  return (
    <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
        Recent Activity
      </p>
 
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0" />
              <div className="flex-1 space-y-1.5 pt-1">
                <div className="h-3 bg-slate-100 rounded w-3/4" />
                <div className="h-2.5 bg-slate-100 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <p className="text-sm text-slate-400">No activity yet.</p>
      ) : (
        <div className="space-y-1">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-3">
              {/* Icon + line */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <FaRocket className="text-blue-500" size={11} />
                </div>
                {index !== activities.length - 1 && (
                  <div className="w-px flex-1 bg-slate-100 my-1" />
                )}
              </div>
 
              {/* Content */}
              <div className={`pb-4 ${index === activities.length - 1 ? "pb-0" : ""}`}>
                <p className="text-sm font-medium text-slate-700 leading-tight">
                  {activity.action}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
 
export default ActivityTimeline;