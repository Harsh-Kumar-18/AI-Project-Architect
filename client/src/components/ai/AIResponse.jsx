import React from "react";

import OutputTabs from "./OutputTabs";
import GeneratedStack from "./GeneratedStack";
import FolderStructure from "./FolderStructure";
import RoadmapTimeline from "./RoadmapTimeline";
import ProjectHeader from "./ProjectHeader";
import FeaturesList from "./FeaturesList";
import ArchitectureDiagram from "./ArchitectureDiagram";
import DatabaseSchema from "./DatabaseSchema";
import APIEndpoints from "./APIEndpoints";
import SystemDesign from "./SystemDesign";
import FutureEnhancements from "./FutureEnhancements";

const AIResponse = ({
  projectData,
  prompt,
}) => {
  const tabs = [
    {
  id: "features",
  label: "Features",
  content: (
    <FeaturesList
      features={projectData?.features}
    />
  ),
},
    {
      id: "stack",
      label: "Tech Stack",
      content: (
        <GeneratedStack
  stack={projectData?.techStack}
/>
      ),
    },

    {
      id: "structure",
      label: "Structure",
      content: (
        <FolderStructure
          structure={
            projectData?.folderStructure
          }
        />
      ),
    },

    {
      id: "roadmap",
      label: "Roadmap",
      content: (
        <RoadmapTimeline
          roadmap={projectData?.developmentRoadmap}
        />
      ),
    },

    {
  id: "architecture",
  label: "Architecture",
  content: (
    <ArchitectureDiagram
      architecture={
        projectData?.architectureDiagram
      }
    />
  ),
},

{
  id: "database",
  label: "Database",
  content: (
    <DatabaseSchema
      schema={projectData?.databaseSchema}
    />
  ),
},

{
  id: "api",
  label: "API",
  content: (
    <APIEndpoints
      endpoints={projectData?.apiEndpoints}
    />
  ),
},

{
  id: "systemDesign",
  label: "System Design",
  content: (
    <SystemDesign
      systemDesign={projectData?.systemDesign}
    />
  ),
},

{
  id: "future",
  label: "Future",
  content: (
    <FutureEnhancements
      enhancements={projectData?.futureEnhancements}
    />
  ),
},
  ];


  return (
    <div className="mt-8 space-y-8">

      <ProjectHeader
        projectData={projectData}
      />

      <OutputTabs tabs={tabs} />
    </div>
  );
};

export default AIResponse;