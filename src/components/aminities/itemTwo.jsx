import Link from "next/link";
import IconRenderer from "@/components/icons/iconsRender";

const AminitiesItemTwo = ({ data, styles }) => {
  return (
    <>
      <div style={styles} className=" ltn__category-item ltn__category-item-5 ltn__category-item-5-2">
        <a>
          <span className="category-icon d-flex align-items-center justify-content-center">
            {data?.from === "react-icon" ? (
              <IconRenderer name={data.icon} className="no-size  ltn__primary-color" />
            ) : (
              <i className={`${data.icon}`}></i>
            )}
          </span>
          <span className="category-number">{data.id}</span>
          <span className="category-title">{data.title}</span>
          <p className="category-brief ">{data.description}</p>
        </a>
      </div>
    </>
  );
};

export default AminitiesItemTwo;
