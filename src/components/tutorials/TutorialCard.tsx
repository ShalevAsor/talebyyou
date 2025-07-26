"use client";

import { Clock, Play } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tutorial } from "@/data/tutorialsData";

interface TutorialCardProps {
  tutorial: Tutorial;
}

export const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleCardClick = () => {
    setIsVideoOpen(true);
  };

  // Helper function to convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    // Handle youtu.be format
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Handle youtube.com/watch format
    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Return as-is if already in embed format
    return url;
  };

  return (
    <>
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
        onClick={handleCardClick}
      >
        <CardContent className="p-0">
          {/* Video Thumbnail */}
          <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
            {/* Use actual thumbnail if available, otherwise show placeholder */}
            {tutorial.thumbnail &&
            !tutorial.thumbnail.includes("/placeholders/") ? (
              <Image
                src={tutorial.thumbnail}
                alt={tutorial.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={false}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">Tutorial</div>
                  <div className="text-sm opacity-90">{tutorial.title}</div>
                </div>
              </div>
            )}

            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white bg-opacity-90 rounded-full p-4">
                <Play className="w-8 h-8 text-indigo-600 fill-indigo-600" />
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {tutorial.duration}
            </div>
          </div>

          {/* Tutorial Info */}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {tutorial.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3">
              {tutorial.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>{tutorial.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {/* Actual video player */}
            <iframe
              src={getEmbedUrl(tutorial.videoUrl)}
              title={tutorial.title}
              className="w-full h-full rounded"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
