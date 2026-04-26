
import React from "react";
import { Link } from "react-router-dom";

const SocialIcon = ({ href, children, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-sky-800 to-indigo-700 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                {/* droplet icon */}
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2s6 6.5 6 10a6 6 0 11-12 0C6 8.5 12 2 12 2z" fill="currentColor" />
                </svg>
              </span>
              <span className="text-lg font-semibold">Water Footprint</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              Empowering individuals and communities to understand and reduce their water footprint for a sustainable future.
            </p>

            <div className="flex items-center gap-3">
              <SocialIcon href="https://www.facebook.com" label="Facebook">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.1h-1.07c-1.05 0-1.37.65-1.37 1.32V12h2.34l-.37 2.9h-1.97v7A10 10 0 0022 12z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.twitter.com" label="Twitter">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 5.9c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.4-1.8-.7.4-1.5.7-2.4.9C18 4.6 17 4 15.9 4c-1.8 0-3.2 1.5-3.2 3.2 0 .25.03.5.08.74C9.7 8 7 6.6 5.3 4.4c-.28.48-.44 1.03-.44 1.62 0 1.1.56 2.07 1.42 2.64-.52-.02-1.01-.16-1.44-.4v.04c0 1.56 1.11 2.86 2.58 3.16-.27.07-.57.1-.87.1-.21 0-.42-.02-.62-.06.42 1.3 1.63 2.25 3.07 2.28-1.12.88-2.54 1.4-4.08 1.4-.27 0-.53-.02-.79-.05 1.55 1 3.4 1.6 5.39 1.6 6.46 0 10-5.35 10-9.99v-.45c.7-.5 1.3-1.12 1.78-1.83-.64.28-1.33.47-2.04.56z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com" label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm5.5-2a1.25 1.25 0 11-1.25 1.25A1.25 1.25 0 0117.5 6.5zM12 10.25A1.75 1.75 0 1110.25 12 1.75 1.75 0 0112 10.25z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com" label="LinkedIn">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5A2.5 2.5 0 002.5 6v12a2.5 2.5 0 002.48 2.5h.02A2.5 2.5 0 007.98 18V6a2.5 2.5 0 00-2.5-2.5zM8 9H5v9h3V9zm11 9h-3v-4.5c0-1.07-.02-2.44-1.49-2.44-1.49 0-1.72 1.16-1.72 2.36V18h-3V9h2.88v1.23h.04c.4-.76 1.37-1.56 2.82-1.56 3.02 0 3.58 1.99 3.58 4.57V18z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-teal-200 font-medium mb-4">Contact Info</h3>
            <ul className="space-y-4 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-teal-200 mt-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                </svg>
                <span>RKGIT, Ghaziabad City</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-teal-200 mt-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.06-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.22.2 2.41.57 3.56a1 1 0 01-.24 1.06l-2.2 2.2z" />
                </svg>
                <span>+(91) 7835927718</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-teal-200 mt-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 4H4a2 2 0 00-2 2v.2l10 6.3 10-6.3V6a2 2 0 00-2-2zM4 8.24V18a2 2 0 002 2h12a2 2 0 002-2V8.24l-8 5.04L4 8.24z" />
                </svg>
                <span>abhisheksingh56611@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-teal-200 font-medium mb-4">Newsletter</h3>
            <p className="text-sm text-white/90 mb-4">Subscribe to our newsletter for updates and water conservation tips.</p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-full bg-white/10 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-teal-300"
                aria-label="Email address"
              />
              <button className="px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-600 transition text-white font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/80">
          <p>© 2024 Water Footprint. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
