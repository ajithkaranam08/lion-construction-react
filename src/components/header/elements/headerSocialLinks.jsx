import Link from "next/link";

import {
  FaDribbble,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
const HeaderSocialLinks = function () {
  return (
    <div className="ltn__social-media">
      <ul>
        {/* <li>
          <Link href="">  <FaFacebookF /> </Link>
        </li>
        <li>
          <Link href="#">  <FaTwitter /> </Link>
        </li> */}

        <li>
          <Link
            href="https://instagram.com/lionconstructionofficial"
            target="_blank" className="d-flex align-items-center">
            {" "}
            <FaInstagram className="me-2"/> lionconstructionofficial
          </Link>
        </li>
        {/* <li>
          <Link href="#">  <FaDribbble /> </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default HeaderSocialLinks;
