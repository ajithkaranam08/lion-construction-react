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
      FaRegBuilding,
    } from "react-icons/fa";
    import { MdOutlineHandshake, MdRoofing } from "react-icons/md";

    import { GiOnTarget, GiReceiveMoney, GiStrong, GiTeamIdea } from "react-icons/gi";

    import { RiFocus2Line, RiHotelLine, RiTeamLine   } from "react-icons/ri"
    import { LiaUserShieldSolid, LiaPersonBoothSolid } from "react-icons/lia";
    import { IoIosBulb } from "react-icons/io";

    import { FaLaptop } from "react-icons/fa";


    
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

      creativity: IoIosBulb,
      honest: GiStrong,
      target: GiOnTarget,
      focus: RiFocus2Line,

      handShake: MdOutlineHandshake,
      teamShield : LiaUserShieldSolid,
      teamSales: GiReceiveMoney,
      teamIdea: GiTeamIdea,
      team: RiTeamLine,
      addTeam: LiaPersonBoothSolid,

      laptop: FaLaptop,
      building: FaRegBuilding,
      hotel: RiHotelLine
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
