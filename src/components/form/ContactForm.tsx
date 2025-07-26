// src/components/form/ContactForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { sendContactFormEmail } from "@/actions/email-actions";
import { SelectField } from "@/components/common/SelectField";
import { TextAreaField } from "@/components/common/TextAreaField";
import { TextField } from "@/components/common/TextField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  contactCategoryLabels,
  contactFormSchema,
  type ContactFormData,
} from "@/schemas/contact-schema";

interface ContactFormProps {
  onSuccess?: (data: ContactFormData) => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize form with contact form schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      category: "general_inquiry",
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Watch the category field to conditionally show fields
  const watchedCategory = watch("category");

  // Form submission handler
  const onSubmit = async (data: ContactFormData) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      // Call the server action to send the contact form email
      const result = await sendContactFormEmail(
        data.name,
        data.email,
        data.category,
        data.subject,
        data.message,
        data.orderNumber
      );

      if (result.success) {
        // Show success message
        setSuccessMessage(
          "Thank you for your message! We'll get back to you soon."
        );

        // Reset the form
        reset();

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess(data);
        }
      } else {
        // Show error message from the server
        setErrorMessage(
          result.error || "An error occurred while submitting your message"
        );
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while submitting your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Send Us a Message</CardTitle>
      </CardHeader>
      <CardContent>
        {successMessage ? (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Error message */}
            {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium mb-3">Your Information</h3>
              <TextField
                label="Name"
                id="name"
                placeholder="Your name"
                {...register("name")}
                error={errors.name?.message}
              />

              <TextField
                label="Email Address"
                type="email"
                id="email"
                placeholder="your@email.com"
                {...register("email")}
                error={errors.email?.message}
              />
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-lg font-medium mb-3">Message Details</h3>

              <SelectField
                label="What can we help you with?"
                id="category"
                options={Object.entries(contactCategoryLabels).map(
                  ([value, label]) => ({
                    value,
                    label,
                  })
                )}
                {...register("category")}
                error={errors.category?.message}
              />

              {/* Conditionally show order number field */}
              {watchedCategory === "order_question" && (
                <TextField
                  label="Order Number"
                  id="orderNumber"
                  placeholder="e.g. ORD-123456-7890"
                  {...register("orderNumber")}
                  error={errors.orderNumber?.message}
                />
              )}

              <TextField
                label="Subject"
                id="subject"
                placeholder="Brief description of your inquiry"
                {...register("subject")}
                error={errors.subject?.message}
              />

              <TextAreaField
                label="Message"
                id="message"
                placeholder="Please provide details about your inquiry..."
                rows={6}
                {...register("message")}
                error={errors.message?.message}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex-col items-stretch">
        <p className="mt-4 text-xs text-gray-500 text-center">
          By submitting this form, you agree to our{" "}
          <Link
            href="/terms"
            className="text-blue-600 hover:underline inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
            <ExternalLink className="h-3 w-3 ml-0.5" aria-hidden="true" />
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-blue-600 hover:underline inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
            <ExternalLink className="h-3 w-3 ml-0.5" aria-hidden="true" />
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
