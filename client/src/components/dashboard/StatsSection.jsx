import React, { useEffect, useState } from "react";

import {
  FaFolder,
  FaCalendarWeek,
  FaRocket,
  FaInfinity,
} from "react-icons/fa";

import StatsCard from "./StatsCard";
import { getProjects } from "../../services/projectService";
import { getProfile } from "../../services/userService";

const StatsSection = () => {
  const [stats, setStats] = useState([
    {
      title: "Total Projects",
      value: 0,
      icon: FaFolder,
    },
    {
      title: "Generated Today",
      value: 0,
      icon: FaRocket,
    },
    {
      title: "AI Credits",
      value: 10,
      icon: FaInfinity,
    },
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectData, userData] = await Promise.all([
        getProjects(),
        getProfile(),
      ]);

      const projects = projectData?.projects || [];

      const today = new Date().toDateString();

      const generatedToday = projects.filter(
        (project) =>
          new Date(project.createdAt).toDateString() === today
      ).length;

      setStats([
        {
          title: "Total Projects",
          value: projects.length,
          icon: FaFolder,
        },
        {
          title: "Generated Today",
          value: generatedToday,
          icon: FaRocket,
        },
        {
          title: "AI Credits",
          value: userData?.user?.aiCredits ?? 10, 
          icon: FaInfinity,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default StatsSection;