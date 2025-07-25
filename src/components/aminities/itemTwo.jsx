import Link from "next/link";
import IconRenderer from "@/components/icons/iconsRender";

const AminitiesItemTwo = ({ data, styles }) => {
  console.log(data?.from === "react-icon" &&  <IconRenderer name={data.icon} />)
  return (
    <>
      <div style={styles} className=" ltn__category-item ltn__category-item-5 ltn__category-item-5-2">
        <Link href="/shop">
          <span className="category-icon d-flex align-items-center justify-content-center">
            {data?.from === "react-icon" ? (
              <IconRenderer name={data.icon} className="no-size" />
            ) : (
              <i className={`${data.icon}`}></i>
            )}
          </span>
          <span className="category-number">{data.id}</span>
          <span className="category-title">{data.title}</span>
          <p className="category-brief ">{data.description}</p>
        </Link>
      </div>
    </>
  );
};

export default AminitiesItemTwo;
