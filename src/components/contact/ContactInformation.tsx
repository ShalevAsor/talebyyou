// src/components/contact/ContactInformation.tsx
import React from "react";
import Link from "next/link";
import { Mail, Info, ExternalLink } from "lucide-react";
import config from "@/lib/config";

/**
 * Component to display contact information sidebar
 */
export const ContactInformation: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
      <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
        Contact Information
      </h3>

      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <Mail className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900">Email Us</h4>
            <p className="text-sm text-gray-600 mt-1">
              {"We'll respond to your inquiry within up to 3 business days."}
            </p>
            {/* Keep as regular <a> tag for mailto link */}
            <Link
              href="mailto:support@custombooks.com"
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-1 inline-block"
            >
              {config.EMAIL.SUPPORT}
            </Link>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900">Helpful Links</h4>
            <ul className="mt-1 space-y-1">
              <li>
                <Link
                  href="/my-books"
                  className="text-indigo-600 hover:text-indigo-800 text-sm inline-flex items-center"
                >
                  View Your Books
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-indigo-600 hover:text-indigo-800 text-sm inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                  <ExternalLink className="h-3 w-3 ml-0.5" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-indigo-600 hover:text-indigo-800 text-sm inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                  <ExternalLink className="h-3 w-3 ml-0.5" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
