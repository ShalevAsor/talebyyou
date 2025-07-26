// Update any download button component

import { Button } from "@/components/ui/button";
import { useEbookMutations } from "@/hooks/useEbookMutations";

interface EbookDownloadButtonProps {
  bookId: string;
}

export function EbookDownloadButton({ bookId }: EbookDownloadButtonProps) {
  const { getDownloadUrlMutation, isPreparingDownload } = useEbookMutations();

  const handleDownload = async () => {
    const result = await getDownloadUrlMutation.mutateAsync({ bookId });

    if (result.success && result.data) {
      // Open the download URL in a new tab
      window.open(result.data, "_blank");
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isPreparingDownload}>
      {isPreparingDownload ? "Preparing PDF..." : "Download PDF"}
    </Button>
  );
}
