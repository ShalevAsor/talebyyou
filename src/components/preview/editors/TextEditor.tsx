"use client";
import { Check, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextEditorProps {
  initialText: string;
  onSave: (text: string) => void;
  onCancel: () => void;
  placeholder?: string;
  maxLength?: number;
  minHeight?: string;
  textType?: "title" | "dedication" | "content";
}

const TextEditor: React.FC<TextEditorProps> = ({
  initialText,
  onSave,
  onCancel,
  placeholder = "Enter text...",
  maxLength = 200,
  minHeight = "100px",
  textType = "content",
}) => {
  const [text, setText] = useState(initialText);

  // Set focus on the textarea when the component mounts
  useEffect(() => {
    const textareaElement = document.getElementById("text-editor-textarea");
    if (textareaElement) {
      textareaElement.focus();
    }
  }, []);

  // Handle text change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setText(e.target.value);
    }
  };

  // Handle paste event separately
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault(); // Prevent default paste behavior

    // Get pasted content from clipboard
    const pastedText = e.clipboardData.getData("text");

    // Only paste if it won't exceed maxLength
    const currentText = e.currentTarget.value;
    const cursorPosition = e.currentTarget.selectionStart || 0;
    const cursorEnd = e.currentTarget.selectionEnd || cursorPosition;

    // Calculate new text: text before selection + pasted content + text after selection
    const newText =
      currentText.substring(0, cursorPosition) +
      pastedText +
      currentText.substring(cursorEnd);

    // Apply maxLength restriction
    if (newText.length <= maxLength) {
      setText(newText);
    } else {
      // If pasted content would exceed maxLength, trim it
      const availableSpace =
        maxLength - (currentText.length - (cursorEnd - cursorPosition));
      if (availableSpace > 0) {
        const trimmedPaste = pastedText.substring(0, availableSpace);
        setText(
          currentText.substring(0, cursorPosition) +
            trimmedPaste +
            currentText.substring(cursorEnd)
        );
      }
    }
  };

  // Handle save button click
  const handleSave = () => {
    onSave(text);
  };

  // Calculate which styles to apply based on text type
  const getEditorStyles = () => {
    switch (textType) {
      case "title":
        return "text-xl font-bold text-center";
      case "dedication":
        return "text-base italic text-center";
      default:
        return "text-base";
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-4 border border-gray-200"
      role="dialog"
      aria-modal="true"
    >
      <Textarea
        id="text-editor-textarea"
        value={text}
        onChange={handleChange}
        onPaste={handlePaste}
        placeholder={placeholder}
        className={`w-full resize-none border border-gray-300 rounded-md ${getEditorStyles()}`}
        style={{ minHeight }}
      />

      <div className="flex justify-between items-center mt-3">
        <div className="text-sm text-gray-500">
          {text.length}/{maxLength} characters
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            aria-label="Cancel"
          >
            <X className="mr-1 h-4 w-4" />
            Cancel
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            aria-label="Save"
          >
            <Check className="mr-1 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TextEditor);
