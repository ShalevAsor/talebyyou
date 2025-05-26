import React from "react";
import { Button } from "@/components/ui/button";
import {
  FiEdit,
  FiEye,
  FiPrinter,
  FiShoppingCart,
  FiDownload,
} from "react-icons/fi";
import useBookPreviewStore from "@/store/useBookPreviewStore";
import { BookStatus, ProductType } from "@prisma/client";
import ActionDialog from "../common/ActionDialog";

interface ActionBarProps {
  title: string;
  isEditMode: boolean;
  toggleEditMode: () => void;
  saveAndOrder: () => void;
  saveAndPrint: () => void;
  isSaving: boolean;
  isCompletingBook: boolean;
}

/**
 * ActionBar component for the book preview page
 * Displays the book title and action buttons for toggling edit mode and saving/ordering
 */
export const ActionBar: React.FC<ActionBarProps> = ({
  title,
  isEditMode,
  toggleEditMode,
  saveAndOrder,
  saveAndPrint,
  isSaving,
  isCompletingBook,
}) => {
  const bookStatus = useBookPreviewStore((state) => state.book?.status);
  const productType = useBookPreviewStore(
    (state) => state.book?.order?.productType
  );
  const enableToggle =
    bookStatus === BookStatus.CUSTOMIZING || bookStatus === BookStatus.ORDERED;
  return (
    <div className="bg-indigo-300/5 rounded-t-md px-1 mb-2 py-2 border-b border-indigo-500 flex justify-between items-center">
      <h2 className="text-xl font-bold">{title || "Book Preview"}</h2>

      <div className="flex space-x-2">
        {/* Toggle edit/preview mode button - only available where book is in customizing status or ordered */}
        {enableToggle &&
          (!isEditMode ? (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleEditMode}
              className="flex items-center"
            >
              <FiEdit className="mr-2" />
              Edit Book
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleEditMode}
              className="flex items-center"
            >
              <FiEye className="mr-2" />
              Preview
            </Button>
          ))}

        {/* Save & Order button - only available when book is in customizing status */}
        {bookStatus === BookStatus.CUSTOMIZING && (
          <Button
            variant="default"
            size="sm"
            onClick={saveAndOrder}
            disabled={isSaving}
            className="flex items-center"
          >
            <FiShoppingCart className="mr-2" />
            {isSaving ? "Saving..." : "Save & Order"}
          </Button>
        )}
        {/* Save & Print Action dialog or save and download button - only available when book is in ordered status */}
        {bookStatus === BookStatus.ORDERED && (
          <ActionDialog
            title={
              productType === ProductType.BOOK
                ? "Prepare Book for Printing"
                : "Prepare Book for Download"
            }
            description={
              productType === ProductType.BOOK
                ? "Your book will be saved and marked as ready for printing. Do you want to continue?"
                : "Your book will be saved and marked as ready for download. Do you want to continue?"
            }
            actionLabel={
              productType === ProductType.BOOK
                ? "Save & Print"
                : "Save & Download"
            }
            triggerLabel={
              productType === ProductType.BOOK ? "Print Book" : "Download Book"
            }
            triggerIcon={
              productType === ProductType.BOOK ? (
                <FiPrinter className="w-6 h-6 text-white" />
              ) : (
                <FiDownload className="w-6 h-6 text-white" />
              )
            }
            isLoading={isCompletingBook}
            onAction={saveAndPrint}
            variant="default"
            actionVariant="default"
          />
        )}
        {/* Preview only - only available when book is in ready to print status */}
        {bookStatus === BookStatus.READY_FOR_PRINTING && (
          <p className="text-zinc-400 text-sm ">Preview Only</p>
        )}
      </div>
    </div>
  );
};
