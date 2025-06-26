import Link from "next/link";

const CallToAction = () => {
  return (
    <>
      <div className="call-to-action-inner call-to-action-inner-6 ltn__secondary-bg position-relative">
        <div className="coll-to-info text-color-white">
          <h1>Dreaming of a new space?</h1>
          <p>Let us bring it to life with expert care</p>
        </div>
        <div className="btn-wrapper">
          <Link className="btn btn-effect-3 btn-white" href="contact">
            Get Quote <i className="icon-next"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CallToAction;
