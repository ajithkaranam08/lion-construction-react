import Link from "next/link";
import {
  FaRegUser,
  FaRegHeart,
  FaShoppingCart,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaSearch,
} from "react-icons/fa";

import {
  getSiblings,
  getClosest,
  slideUp,
  slideDown,
  slideToggle,
} from "@/lib/product";
import { useSelector } from "react-redux";

const MobileMenu = function ({ offCanVastoggleBtn, closeSideBar }) {
  const { cartItems } = useSelector((state) => state.cart);

  const onClickHandler = (e) => {
    const target = e.currentTarget;
    const parentEl = target.parentElement;
    parentEl.classList.toggle("active");
    if (
      parentEl?.classList.contains("menu-expand") ||
      target.classList.contains("menu-expand")
    ) {
      const element = target.classList.contains("icon") ? parentEl : target;
      const parent = getClosest(element, "li");
      const childNodes = parent.childNodes;
      const parentSiblings = getSiblings(parent);
      parentSiblings.forEach((sibling) => {
        sibling.classList.remove("active");
        const sibChildNodes = sibling.childNodes;
        sibChildNodes.forEach((child) => {
          if (child.nodeName === "UL") {
            slideUp(child, 1000);
          }
        });
      });
      childNodes.forEach((child) => {
        if (child.nodeName === "UL") {
          slideToggle(child, 1000);
        }
      });
    }
  };

  return (
    <>
      <div
        id="ltn__utilize-mobile-menu"
        className={`ltn__utilize ltn__utilize-mobile-menu   ${
          offCanVastoggleBtn ? "ltn__utilize-open" : ""
        }`}
      >
        <div className="ltn__utilize-menu-inner ltn__scrollbar">
          <div className="ltn__utilize-menu-head">
            <div className="site-logo">
              <Link href="/">
                <img src="/img/logo.png" alt="Logo" />
              </Link>
            </div>
            <button onClick={closeSideBar} className="ltn__utilize-close">
              ×
            </button>
          </div>
          <div className="ltn__utilize-menu-search-form">
            <form action="#">
              <input type="text" placeholder="Search..." />
              <button>
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="ltn__utilize-menu">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/service/residential">Services</Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
                <ul className="sub-menu">
                  <li>
                    <Link href="/service/construction">Construction</Link>
                  </li>
                  <li>
                    <Link href="/service/residential">Interior Design</Link>
                  </li>
                  <li>
                    <span>Joint Ventures</span>
                  </li>
                  <li>
                    <span>Renovation</span>
                  </li>
                  <li>
                    <span>Interior Design</span>
                  </li>
                  <li>
                    <span>Flat Promotion</span>
                  </li>
                  <li>
                    <span>Commercial Interiors</span>
                  </li>
                  <li>
                    <span>Workspace Interiors</span>
                  </li>
                  <li>
                    <span>Real Estate</span>
                  </li>
                  <li>
                    <span>Property Maintenance</span>
                  </li>
                  <li>
                    <span>Material Supply</span>
                  </li>
                  <li>
                    <span>Manpower Supply</span>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/coming-soon">Blog</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          {/* <div className="ltn__utilize-buttons ltn__utilize-buttons-2">
            <ul>
              <li>
                <Link href="/my-account" title="My Account">
                  <span className="utilize-btn-icon">
                    <FaRegUser />
                  </span>
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/wishlist" title="Wishlist">
                  <span className="utilize-btn-icon">
                    <FaRegHeart />
                    {cartItems.length > 0 ? (
                      <sup>{cartItems.length}</sup>
                    ) : (
                      <sup>0</sup>
                    )}
                  </span>
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" title="Shoping Cart">
                  <span className="utilize-btn-icon">
                    <FaShoppingCart />
                    {cartItems.length > 0 ? (
                      <sup>{cartItems.length}</sup>
                    ) : (
                      <sup>0</sup>
                    )}
                  </span>
                  Shoping Cart
                </Link>
              </li>
            </ul>
          </div> */}
          <div className="ltn__social-media-2">
            <ul>
              {/* <li>
                <Link href="#">
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <FaLinkedin />
                </Link>
              </li> */}
              <li>
                <Link href="https://instagram.com/lionconstructionofficial" target="_blank">
                  <FaInstagram />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

