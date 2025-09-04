import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cart-slice";
import { useState } from "react";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/store/slices/wishlist-slice";
import QuickViewtModal from "@/components/modals/quickViewModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const RelatedProduct = ({
  productData,
  slug,
  baseUrl,
  discountedPrice,
  productPrice,
  cartItem,
  wishlistItem,
  compareItem,
}) => {
  let badgeText = "";

  if (productData.rent) {
    badgeText = "";
  } else {
    badgeText = "";
  }
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const wishListTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Wishlist
    </Tooltip>
  );
  const quickViewTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Quick View
    </Tooltip>
  );
  const addToCartTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add To Cart
    </Tooltip>
  );
  return (
    <>
      <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5">
        <div className="product-img">
          {/* <Link href={`/${baseUrl}/${slug}`}> */}
          <img
            src={productData.productImg}
            loading="lazy"
            alt={`${productData.title}`}
            width={"100%"}
            height={250}
          />
          {/* </Link> */}
          {/* <div className="real-estate-agent">
            <div className="agent-img">
              <Link href={`/${baseUrl}/${slug}`}>
                <img
                  src={`/img/blog/author.jpg`}
                  alt={`${productData.title}`}
                />
              </Link>
            </div>
          </div> */}
        </div>
        <div className="product-info">
          <div className="product-badge">
            <ul>
              {/* <li
                className={`sale-badge ${productData.rent ? "bg-green" : ""}`}
              >
                {badgeText}
              </li> */}
            </ul>
          </div>
          <h2 className="product-title">
            {/* <Link href={`/${baseUrl}/${slug}`}>{productData.title}</Link> */}
            {productData.title}
          </h2>
          <div className="product-img-location">
            <ul>
              <li>
                {/* <Link href={`/${baseUrl}/${slug}`}>
                  <i className="flaticon-pin"></i>
                </Link> */}
                <i className="flaticon-pin"></i> {productData.locantion}
              </li>
            </ul>
          </div>
          <ul className="ltn__plot-brief">
            {productData.propertyDetails.bedrooms ? (
              <li>
                <span>{productData.propertyDetails.bedrooms}</span>
                <span className="ms-1">Bedrooms</span>
              </li>
            ) : null}

            {productData.propertyDetails.baths ? (
              <li>
                <span>{productData.propertyDetails.baths}</span>
                <span className="ms-1">Bathrooms</span>
              </li>
            ) : null}

            {productData.propertyDetails.area ? (
              <li>
                <span>{productData.propertyDetails.area}</span>
                <span className="ms-1">Built-up Area</span>
              </li>
            ) : null}

            {productData.propertyDetails.plotArea ? (
              <li>
                <span>{productData.propertyDetails.plotArea}</span>
                <span className="ms-1">Plot Area</span>
              </li>
            ) : null}

            {productData.propertyDetails.noOfFloors ? (
              <li>
                <span>No. of Floors</span>
                <span className="ms-1">
                  {productData.propertyDetails.noOfFloors}
                </span>
              </li>
            ) : null}
          </ul>
            <div className="product-description">
              <p>{productData.description?.shortDescription}</p>
            </div>
          {/* <div className="product-hover-action">
            <ul>
              <li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={quickViewTooltip}
                >
                  <button onClick={() => setModalShow(true)}>
                    <i className="flaticon-expand"></i>
                  </button>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={wishListTooltip}
                >
                  <button
                    onClick={
                      wishlistItem !== undefined
                        ? () => dispatch(deleteFromWishlist(productData.id))
                        : () => dispatch(addToWishlist(productData))
                    }
                  >
                    <i className="flaticon-heart-1"></i>
                  </button>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={addToCartTooltip}
                >
                  <button onClick={() => dispatch(addToCart(productData))}>
                    <i className="flaticon-add"></i>
                  </button>
                </OverlayTrigger>
              </li>
            </ul>
          </div> */}
        </div>
        {/* <div className="product-info-bottom">
          <div className="product-price">
            <span>
              {`$ ${productData.price}`}
              <label>/Month</label>
            </span>
          </div>
        </div> */}
      </div>

      <QuickViewtModal
        productData={productData}
        show={modalShow}
        onHide={() => setModalShow(false)}
        slug={slug}
        discountedprice={discountedPrice}
        productprice={productPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
      />
    </>
  );
};

export default RelatedProduct;
