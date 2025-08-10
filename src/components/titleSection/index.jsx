const TitleSection = ({ titleSectionData, sectionClasses, headingClasses }) => {
  return (
    <>
      <div className={`section-title-area ${sectionClasses}`}>
        {titleSectionData?.subTitle &&
          <h6
            className={`section-subtitle-2 ${headingClasses} ltn__secondary-color`}
          >
            {titleSectionData.subTitle}
          </h6>
        }

        <h1 className="section-title"> {titleSectionData.title}</h1>
        {titleSectionData?.description &&
          <p>
            {titleSectionData?.description}
          </p>
        }
      </div>
    </>
  );
};

export default TitleSection;
