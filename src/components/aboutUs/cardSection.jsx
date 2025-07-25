import { Row, Col, Container } from "react-bootstrap";

const CardSection = ({ data = [] }) => {
    return (
        <div className="ltn__blog-area mb-120">
            <Container>

                <Row className="justify-content-center ltn__blog-slider-one-active slick-arrow-1 ltn__blog-item-3-normal">
                    {data.map((item, index) => (
                        <Col xs={12} lg={4} className="ltn__blog-item ltn__blog-item-3 d-flex flex-column" key={index}>
                            <div className="ltn__blog-img">
                                <img className="w-100" src={`${item.image}`} alt={`${item.title}`} />
                            </div>
                            <div className="ltn__blog-brief flex-grow-1">
                                <h3 className="ltn__blog-title">
                                    {item.title}
                                </h3>
                                <p className="">
                                    {item.description}
                                </p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>


    );
};

{/* <div className="ltn__blog-area mb-120">
    <Container>
        <Row>
            <Col xs={12} lg={8}>
                <div className="ltn__blog-list-wrap">
                    {currentItems.map((blog, key) => {
                        const slug = productSlug(blog.title);

                        return (
                            <BlogItemTwo
                                key={key}
                                blogData={blog}
                                slug={slug}
                                baseUrl="blog"
                            />
                        );
                    })}
                </div>
                </Row>
                </Col>
              </Row>
            </Container>
          </div> */}

export default CardSection;
