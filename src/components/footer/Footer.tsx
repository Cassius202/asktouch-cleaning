"use client";

import { askTouchData } from "@/constants/data";
import { assets } from "@/constants/assets";
import Image from "next/image";
import Link from "next/link";
// import { navLinks } from "@/constants/consts";
import {
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaPhone,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/book-now" || pathname === "/book") return;
  return (
    <div className="px-0">
      <footer className="bg-zinc-900 w-full max-w-screen mx-auto text-white pt-8 lg:pt-12 px-4 sm:px-8 md:px-16 lg:px-28 rounded-tl-3xl rounded-tr-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-3 space-y-6">
            <Link href="/" className="block">
              <Image
                src={assets.logo}
                alt={askTouchData.brand.name}
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm/6 text-gray-300 max-w-96">
              {askTouchData.brand.slogan}. Creating healthy, pest-free spaces
              for homes and offices across{" "}
              {askTouchData.contact.locations.join(" and ")}.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-5 md:gap-6">
              <a
                href={askTouchData.social.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={askTouchData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-emerald-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href={askTouchData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-emerald-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href={askTouchData.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-emerald-400 transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok size={20} />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Quick Links */}
            {/* <div>
              <h3 className="font-semibold text-sm mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-emerald-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Services */}
            <div>
              <h3 className="font-semibold text-sm mb-4 text-white">
                Services
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                {askTouchData.services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={`/services/${service
                        .toLowerCase()
                        .replace(/\s+&\s+/g, "-and-")
                        .replace(/\s+/g, "-")}`}
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-semibold text-sm mb-4 text-white">
                Contact Us
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                {askTouchData.contact.phone_numbers.map((phone, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FaPhone size={12} className="shrink-0 text-emerald-400" />
                    <a
                      href={`tel:+234${phone.slice(1)}`}
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/234${askTouchData.contact.whatsapp_primary.slice(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    WhatsApp Us
                  </a>
                </li>
                <li className="mt-4">
                  <Link
                    href="/contact"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Get a Free Quote
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-12 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {askTouchData.brand.name}
          </p>
          <p className="text-sm text-gray-400">All rights reserved.</p>
        </div>

        {/* Brand Watermark */}
        <div className="relative mb-5">
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 bg-emerald-500 rounded-full blur-[170px] pointer-events-none opacity-20" />
          <h3 className="text-center font-extrabold leading-[0.7] text-transparent text-[clamp(3rem,15vw,15rem)] [-webkit-text-stroke:1px_rgba(16,185,129,0.3)] mt-6 select-none">
            {askTouchData.brand.name}
          </h3>
        </div>

        <div className="flex mt-10 border-t-1 border-zinc-800 pt-5 pb-5 justify-between items-center">
          {/* Dev Agency name */}
          <span className="text-gray-400 text-sm">Made by Cassius Solutions</span>

          {/* Ghost button - Login as admin */}
          <Link
            href="/admin/login"
            className="text-gray-100 bg-emerald-800/60 px-4 rounded-md py-2 hover:text-gray-300 text-xs transition-colors duration-200 opacity-60 hover:opacity-100"
          >
            Login as admin
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
