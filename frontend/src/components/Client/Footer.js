import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer id="contact" className="bg-[#F6FAFF] py-12 px-6">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <ul className="space-y-2 ml-36">
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Team
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
          <p className="text-sm mt-20 ml-36">
            Copyright &copy; 2024 GrandmaBakery
          </p>
        </div>
        <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center">
          <h4 className="font-bold mb-4">Contact</h4>
          <p>Mahendrapool</p>
          <p>Pokhara, Nepal</p>
          <p>+977-[0]61-328463</p>
        </div>
        <div className="w-full md:w-1/3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28124.515820686516!2d83.9532816410065!3d28.220541823920808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595e988527dd3%3A0x33336f9ce7ee7ab3!2sPokhara%20Pet%20Zone!5e0!3m2!1sen!2snp!4v1731249429309!5m2!1sen!2snp"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <p className="text-sm mt-28 text-right">Created by Gopal</p>
        </div>
      </div>
      <div className="container mx-auto text-center mt-2 flex justify-center items-center space-x-4 m">
        <a href="#" aria-label="Facebook">
          <FontAwesomeIcon
            icon={faFacebook}
            className="h-6 w-6 text-blue-600"
          />
        </a>
        <a href="#" aria-label="YouTube">
          <FontAwesomeIcon icon={faYoutube} className="h-6 w-6 text-red-600" />
        </a>
        <a href="#" aria-label="Instagram">
          <FontAwesomeIcon
            icon={faInstagram}
            className="h-6 w-6 text-pink-600"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
