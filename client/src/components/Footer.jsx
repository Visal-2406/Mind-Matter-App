import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
    return (
      <footer className="bg-zinc-800  text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo or App Name */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300">MindMatter</h2>
              <p className="text-sm">Your partner in mental wellness</p>
            </div>
  
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">

            <a href="/home" className="hover:underline">
               Home
              </a>

              <a href="/features" className="hover:underline">
                Features
              </a>
              <a href="/benefits" className="hover:underline">
                Benefits
              </a>
             
            </div>
  
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href=""
                className="hover:text-teal-400"
                rel="noopener noreferrer"
                
              >
                <FaFacebook />
              </a>
              <a
                href=""
               className="hover:text-black"
                rel="noopener noreferrer"
              
              >
                <FaXTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
              <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-500"
              >
               <FaLinkedinIn />
              </a>
            </div>
          </div>
  
          {/* Copyright Section */}
          <div className="text-center mt-6 text-sm border-t border-teal-200 dark:border-gray-700 pt-4">
            © {new Date().getFullYear()} Visal Viswanadhuni. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  
