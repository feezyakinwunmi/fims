import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Email */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-400">
              <a
                href="mailto:feezyalkinwunmi001@gmail.com"
                className="hover:text-green-500 transition-colors duration-200"
              >
                feezyalkinwunmi001@gmail.com
              </a>
            </p>
          </div>

          {/* Phone Number */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-gray-400">
              <a
                href="tel:+2349161460898"
                className="hover:text-green-500 transition-colors duration-200"
              >
                +234 916 146 0898
              </a>
            </p>
          </div>

          {/* Address */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <p className="text-gray-400">
              Ora Estate, Mojoda, Epe, Lagos State, Nigeria
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Fims. All rights reserved.
          </p>
          <p className="mt-2">
            Designed with ❤️ by{" "}
            <Link
              href="https://yourportfolio.com" // Replace with your portfolio link
              className="text-green-500 hover:text-green-400 transition-colors duration-200"
            >
              CodeTheFuture
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};