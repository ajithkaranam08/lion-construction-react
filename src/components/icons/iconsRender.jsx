// components/icons/iconsRender.tsx
import React from "react";
import {
    FaFileSignature,
    FaMountain,
    FaRocket,
    FaProjectDiagram,
    FaTools,
    FaHardHat,
    FaPlug,
    FaSolarPanel,
    FaDoorOpen,
    FaTree,
    FaFlagCheckered,
    FaClock,
    FaComments,
    FaDraftingCompass,
    FaUserCog,
  } from "react-icons/fa";
  import { MdRoofing } from "react-icons/md";


  
  const iconMap = {
    agreement: FaFileSignature,
    soil: FaMountain,
    kickoff: FaRocket,
    column: FaProjectDiagram,
    foundation: FaTools,
    roofSupport: FaHardHat,
    concreteRoof: MdRoofing,
    partition: FaProjectDiagram, // fallback
    plumbing: FaPlug,
    extras: FaSolarPanel,
    fixtures: FaDoorOpen,
    handover: FaFlagCheckered,
  
    // Newly added
    clock: FaClock,                   // React Icon
    conversation: FaComments,        // React Icon
    blueprint: FaDraftingCompass,    // React Icon
    engineering: FaUserCog,          // React Icon
    tools: FaTools,                  // Already used, but repeated
  };
  

const IconRenderer = ({ name, size = 42, className = "" }) => {
  const Icon = iconMap[name];

  if (!Icon) {
    console.warn(`Icon "${name}" not found in iconMap.`);
    return null;
  }

  return <Icon size={size} className={className} />;
};

export default IconRenderer;
