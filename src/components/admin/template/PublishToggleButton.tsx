"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface PublishToggleButtonProps {
  publish: boolean;
  isPending: boolean;
  onToggle: () => void;
}

export function PublishToggleButton({
  publish,
  onToggle,
  isPending,
}: PublishToggleButtonProps) {
  const handleToggle = () => {
    onToggle();
    setIsPublished(!isPublished);
  };
  const [isPublished, setIsPublished] = useState(publish);
  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      variant={isPublished ? "destructive" : "default"}
    >
      {isPending ? (
        <span className="flex items-center">
          <span className="animate-spin mr-2">⟳</span>
          {isPublished ? "Unpublishing..." : "Publishing..."}
        </span>
      ) : (
        <span>{isPublished ? "Unpublish" : "Publish"}</span>
      )}
    </Button>
  );
}
