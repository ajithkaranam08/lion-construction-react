const TestimonialCarouselItem = ({data, clientImage = false}) => {
  const imagePath = clientImage ? `/img/client-img/${data.img}` : `/img/testimonial/${data.img}`;
  
  return (
    <>
      <div className="ltn__testimonial-item ltn__testimonial-item-7">
        <div className="ltn__testimoni-info">
          <p>
            <i className="flaticon-left-quote-1"></i>
            {data.description}
          </p>
          <div className="ltn__testimoni-info-inner">
            <div className="ltn__testimoni-img">
              <img src={imagePath} alt={`${data.name}`} />
            </div>
            <div className="ltn__testimoni-name-designation">
              <h5> {data.name}</h5>
              <label>{data.type}</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialCarouselItem;
