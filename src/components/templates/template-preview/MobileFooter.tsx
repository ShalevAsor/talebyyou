import React from "react";
import { FiEdit3 } from "react-icons/fi";

import { Button } from "@/components/common/Button";

interface MobileFooterProps {
  templateId: string;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ templateId }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 sm:hidden">
      <Button
        variant="primary"
        size="md"
        asLink
        href={`/library/customize/${templateId}`}
        className="w-full flex items-center justify-center"
      >
        <FiEdit3 className="mr-2" />
        Customize Book
      </Button>
    </div>
  );
};

export default MobileFooter;
