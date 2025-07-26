// export default CharacterCustomizationForm;
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/common/Button";
import { SelectField } from "@/components/common/SelectField";
import { TextField } from "@/components/common/TextField";
import ImageUpload from "@/components/customization/ImageUpload";
import {
  CharacterData,
  characterSchema,
  eyeColorOptions,
  hairColorOptions,
  hairStyleOptions,
  skinToneOptions,
} from "@/schemas/character-schema";

import PhotoGuidelines from "../customization/PhotoGuidelines";

// Create a modified schema that doesn't require the File object
// since we're handling the image separately
const formSchema = characterSchema.omit({ childPhoto: true });

// Define our extended data type
type FormData = z.infer<typeof formSchema>;

interface CharacterCustomizationFormProps {
  onSubmit: (data: CharacterData & { image: File }) => void;
  isSubmitting?: boolean;
  disabled?: boolean;
  bookTitle?: string;
}

const CharacterCustomizationForm: React.FC<CharacterCustomizationFormProps> = ({
  onSubmit,
  isSubmitting = false,
  disabled = false,
  bookTitle,
}) => {
  // State to control the visibility of the character appearance section
  const [showCharacterOptions, setShowCharacterOptions] = useState(false);

  // State to store the image file
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // State to track image upload validation error
  const [imageError, setImageError] = useState<string | null>(null);

  // Form setup with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Validate on change for more responsive feedback
  });

  // Clear image error when component unmounts
  useEffect(() => {
    return () => {
      if (selectedImage && imageError) {
        setImageError(null);
      }
    };
  }, [selectedImage, imageError]);

  // Gender options
  const genderOptions = [
    { value: "boy", label: "Boy" },
    { value: "girl", label: "Girl" },
  ];

  // Convert appearance options arrays to SelectField format
  // Fixed to work with readonly arrays
  const mapOptions = <T extends readonly string[]>(options: T) =>
    options.map((opt) => ({
      value: opt,
      label: opt.charAt(0).toUpperCase() + opt.slice(1),
    }));

  // Create mapped options for each attribute
  const eyeColorOptionsMapped = mapOptions(eyeColorOptions);
  const hairColorOptionsMapped = mapOptions(hairColorOptions);
  const hairStyleOptionsMapped = mapOptions(hairStyleOptions);
  const skinToneOptionsMapped = mapOptions(skinToneOptions);

  // Handle image selection
  const handleImageSelected = (file: File) => {
    setSelectedImage(file);
    setImageError(null); // Clear any error when an image is uploaded
  };

  // Handle image upload error
  const handleImageError = (error: string) => {
    setImageError(error);
    setSelectedImage(null); // Clear the selected image since it's invalid
  };

  // Handle form submission with image
  const handleFormSubmit = (data: FormData) => {
    // Check if an image has been provided
    if (!selectedImage) {
      setImageError("Please upload a photo of your child");
      return;
    }

    // Send both form data and image to parent component
    onSubmit({
      ...data,
      image: selectedImage,
    });
  };

  // Can submit when form is valid, has image, and not already submitting or disabled
  const canSubmit = isValid && selectedImage && !isSubmitting && !disabled;

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
      aria-labelledby="character-form-title"
    >
      <h2 id="character-form-title" className="text-xl font-bold text-gray-900">
        {bookTitle ? `Personalize "${bookTitle}"` : "Child Information"}
      </h2>

      {/* Basic Child Info Section */}
      <fieldset className="space-y-4">
        <legend className="text-base font-medium text-gray-700 sr-only">
          Basic Information
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                id="childName"
                label="Name"
                {...field}
                value={field.value ?? ""} // Use nullish coalescing to handle undefined
                error={errors.name?.message}
                helperText="This name will appear in the story"
                required
                aria-required="true"
              />
            )}
          />

          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <TextField
                id="childAge"
                label="Age"
                type="number"
                min={0}
                max={120}
                {...field}
                value={field.value ?? ""} // Use empty string for undefined number
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                error={errors.age?.message}
                required
                aria-required="true"
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <SelectField
                id="childGender"
                label="Gender"
                options={genderOptions}
                {...field}
                value={field.value ?? ""} // Use nullish coalescing to handle undefined
                error={errors.gender?.message}
                required
                aria-required="true"
              />
            )}
          />
        </div>
      </fieldset>
      {/* Photo Guidelines - Add this before the photo upload */}
      <PhotoGuidelines className="mb-4" />
      {/* Child Photo Upload Section */}
      <fieldset className="space-y-2">
        <legend className="block text-sm font-medium text-gray-700 mb-1">
          {"Child's Photo"} <span className="text-red-500 ml-1">*</span>
        </legend>

        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 w-full max-w-md">
            <ImageUpload
              onImageSelected={handleImageSelected}
              onError={handleImageError}
            />
            {imageError && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {imageError}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {
                "Upload a clear photo of your child's face for a personalized experience"
              }
            </p>
          </div>
        </div>
      </fieldset>

      {/* Customize Character Button */}
      <div className="my-6">
        <button
          type="button"
          onClick={() => setShowCharacterOptions(!showCharacterOptions)}
          className="flex items-center text-indigo-600 font-medium hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-md px-2 py-1 transition-colors"
          aria-expanded={showCharacterOptions}
          aria-controls="character-options-section"
        >
          <svg
            className={`mr-2 h-5 w-5 transition-transform ${
              showCharacterOptions ? "rotate-90" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          {showCharacterOptions
            ? "Hide character options"
            : "Customize character appearance (optional)"}
        </button>

        <p className="text-sm text-gray-500 mt-1 ml-7">
          These details help personalize the story character
          {selectedImage
            ? " (adds specific traits to complement the photo)"
            : " (recommended for best results)"}
        </p>
      </div>

      {/* Character Appearance Options (conditional) */}
      {showCharacterOptions && (
        <div
          id="character-options-section"
          className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200"
        >
          <h3 className="text-lg font-medium mb-4 text-gray-800">
            Character Appearance
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="eyeColor"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="eyeColor"
                  label="Eye Color"
                  options={eyeColorOptionsMapped}
                  {...field}
                  value={field.value ?? ""} // Use nullish coalescing to handle undefined
                  error={errors.eyeColor?.message}
                />
              )}
            />

            <Controller
              name="hairColor"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="hairColor"
                  label="Hair Color"
                  options={hairColorOptionsMapped}
                  {...field}
                  value={field.value ?? ""} // Use nullish coalescing to handle undefined
                  error={errors.hairColor?.message}
                />
              )}
            />

            <Controller
              name="hairStyle"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="hairStyle"
                  label="Hair Style"
                  options={hairStyleOptionsMapped}
                  {...field}
                  value={field.value ?? ""} // Use nullish coalescing to handle undefined
                  error={errors.hairStyle?.message}
                />
              )}
            />

            <Controller
              name="skinTone"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="skinTone"
                  label="Skin Tone"
                  options={skinToneOptionsMapped}
                  {...field}
                  value={field.value ?? ""} // Use nullish coalescing to handle undefined
                  error={errors.skinTone?.message}
                />
              )}
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="wearingGlasses"
                className="mr-2 h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                {...register("wearingGlasses")}
              />
              <label
                htmlFor="wearingGlasses"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Wearing Glasses
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={!canSubmit}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Creating Your Book..." : "Continue"}
      </Button>

      {/* Screen reader assistance */}
      <div className="sr-only" aria-live="polite">
        {canSubmit
          ? "Form is ready to submit. Please review your entries before continuing."
          : "Please complete all required fields and upload a photo to continue."}
      </div>
    </form>
  );
};

export default CharacterCustomizationForm;
