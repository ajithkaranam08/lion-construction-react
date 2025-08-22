const TitleSection = ({ titleSectionData, sectionClasses, headingClasses }) => {
  return (
    <>
      <div className={`section-title-area ${sectionClasses}`}>
        {titleSectionData?.subTitle && (
          <h6
            className={`section-subtitle-2 ${headingClasses} ltn__secondary-color`}>
            {titleSectionData.subTitle}
          </h6>
        )}

        <h1 className="section-title">
          {titleSectionData?.highlightTitle ? (
            <span className="d-inline-block px-4 py-2 rounded-3 ltn__gradient-bricks-container">
              {titleSectionData.title}
            </span>
          ) : (
            titleSectionData.title
          )}
        </h1>
        {titleSectionData?.description && (
          <p>{titleSectionData?.description}</p>
        )}
      </div>
    </>
  );
};

export default TitleSection;
