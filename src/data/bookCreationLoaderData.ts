import { StageInfo } from "@/components/customization/BookCreationLoader";
import { BookOpen, Palette, Upload } from "lucide-react";

export const stages: StageInfo[] = [
  {
    key: "uploading",
    title: "Preparing Your Character",
    description: "Uploading your character to bring your story to life...",
    icon: Upload,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    progressColor: "bg-amber-500",
    ariaLabel: "Uploading character image",
  },
  {
    key: "creating",
    title: "Writing Your Story",
    description: "Crafting a personalized narrative just for you...",
    icon: BookOpen,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    progressColor: "bg-indigo-500",
    ariaLabel: "Creating your personalized book",
  },
  {
    key: "generating",
    title: "Illustrating Your Book",
    description: "Creating the perfect visuals for your story...",
    icon: Palette,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    progressColor: "bg-purple-500",
    ariaLabel: "Generating illustrations for your book",
  },
];
