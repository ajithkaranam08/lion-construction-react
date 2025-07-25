import Link from "next/link";

const defaultData = {
  title: "Dreaming of a new space?",
  description: "Let us bring it to life with expert care",
  buttonText: "Get Quote",
  buttonLink: "contact",
};

const CallToAction = ({ data = defaultData }) => {
  return (
    <>
      <div className="call-to-action-inner call-to-action-inner-6 ltn__secondary-bg position-relative">
        <div className="coll-to-info text-color-white">
          <h1>
            {data?.title.split("\n").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </h1>
          <p>{data?.description}</p>
        </div>
        <div className="btn-wrapper">
          <Link
            className="btn btn-effect-3 btn-white d-flex align-items-center text-nowrap gap-2"
            href={data?.buttonLink}
          >
            {data?.buttonText} <i className="icon-next"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CallToAction;
