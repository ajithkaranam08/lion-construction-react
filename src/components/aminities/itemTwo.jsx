import Link from "next/link";

const AminitiesItemTwo = ({ data, styles }) => {
  return (
    <>
      <div style={styles} className="ltn__category-item ltn__category-item-5 ltn__category-item-5-2">
        <Link href="/shop">
          <span className="category-icon">
            <i className={`${data.icon}`}></i>
          </span>
          <span className="category-number">{data.id}</span>
          <span className="category-title">{data.title}</span>
          <p className="category-brief line-clamp-5">{data.description}</p>
        </Link>
      </div>
    </>
  );
};

export default AminitiesItemTwo;
