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

        <h1 className="section-title">
          {titleSectionData?.highlightTitle ? (
            <span
              className="d-inline-block px-4 py-2 rounded-3"
              style={{
                background: "linear-gradient(135deg, rgba(255,137,63,0.15) 0%, rgba(255,137,63,0.08) 100%)",
                border: "2px solid rgba(255,137,63,0.3)",
                boxShadow: "0 4px 15px rgba(255,137,63,0.1)"
              }}
            >
              {titleSectionData.title}
            </span>
          ) : (
            titleSectionData.title
          )}
        </h1>
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
