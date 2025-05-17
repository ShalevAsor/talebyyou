// src/components/contact/ContactContent.tsx
"use client";

import React from "react";
import { ContactForm } from "@/components/form/ContactForm";
import { ContactInformation } from "@/components/contact/ContactInformation";
import { ContactFormData } from "@/schemas/contact-schema";
import { toast } from "react-toastify";

/**
 * Client component for displaying contact content
 * Handles form submission logic and contact information display
 */
export const ContactContent: React.FC = () => {
  // Handle successful form submission
  const handleFormSuccess = (data: ContactFormData) => {
    toast.success("Your message has been sent successfully!");

    // For now just console log the data
    console.log("Form submitted successfully:", data);
  };

  return (
    <div className="bg-indigo-50/50 p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information Sidebar */}
        <div className="lg:col-span-1">
          <ContactInformation />
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm onSuccess={handleFormSuccess} />
        </div>
      </div>
    </div>
  );
};
