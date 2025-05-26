// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChevronLeft, Upload, Check, AlertCircle } from "lucide-react";
// import { BookTemplateFull } from "@/types/book";
// import { ImageUploadSection } from "./ImageUploadSection";
// import { S3ImageSelector } from "./S3ImageSelector";
// import { toast } from "react-toastify";

// interface TemplateImageManagerProps {
//   template: BookTemplateFull;
// }

// export function TemplateImageManager({ template }: TemplateImageManagerProps) {
//   const router = useRouter();
//   const [uploadingImages, setUploadingImages] = useState<Set<number>>(
//     new Set()
//   );
//   const [completedUploads, setCompletedUploads] = useState<Set<number>>(
//     new Set()
//   );

//   // Helper function to check if an image is a placeholder
//   const isPlaceholderImage = (imageUrl: string | null) => {
//     if (!imageUrl) return true;
//     return imageUrl.includes("placeholder") || imageUrl.startsWith("/images/");
//   };

//   // Calculate upload progress
//   const totalImages = template.pages.length + 1; // pages + cover
//   const placeholderCount = [
//     template.coverImage,
//     ...template.pages.map((p) => p.imageUrl),
//   ].filter(isPlaceholderImage).length;
//   const completedCount = [
//     template.coverImage,
//     ...template.pages.map((p) => p.imageUrl),
//   ].filter((imageUrl) => !isPlaceholderImage(imageUrl)).length;
//   const progressPercentage = Math.round((completedCount / totalImages) * 100);

//   const handleImageUploadStart = (pageNumber: number) => {
//     setUploadingImages((prev) => new Set([...prev, pageNumber]));
//   };

//   const handleImageUploadComplete = (pageNumber: number) => {
//     setUploadingImages((prev) => {
//       const newSet = new Set([...prev]);
//       newSet.delete(pageNumber);
//       return newSet;
//     });
//     setCompletedUploads((prev) => new Set([...prev, pageNumber]));
//     toast.success(
//       `Image ${
//         pageNumber === 0 ? "cover" : `page ${pageNumber}`
//       } uploaded successfully!`
//     );
//   };

//   const handleImageUploadError = (pageNumber: number, error: string) => {
//     setUploadingImages((prev) => {
//       const newSet = new Set([...prev]);
//       newSet.delete(pageNumber);
//       return newSet;
//     });
//     toast.error(
//       `Failed to upload ${
//         pageNumber === 0 ? "cover" : `page ${pageNumber}`
//       } image: ${error}`
//     );
//   };

//   const handleImageSelected = () => {
//     // Refresh the page to show updated images
//     router.refresh();
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header with Navigation */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <Button
//             variant="ghost"
//             onClick={() => router.push("/admin/templates")}
//             className="flex items-center"
//           >
//             <ChevronLeft className="h-4 w-4 mr-1" />
//             Back to Templates
//           </Button>
//           <div>
//             <h1 className="text-2xl font-bold">Manage Template Images</h1>
//             <p className="text-muted-foreground">{template.title}</p>
//           </div>
//         </div>

//         {/* Progress Indicator */}
//         <div className="flex items-center space-x-2">
//           <div className="text-sm text-muted-foreground">
//             Progress: {completedCount}/{totalImages} images
//           </div>
//           <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-green-500 transition-all duration-300"
//               style={{ width: `${progressPercentage}%` }}
//             />
//           </div>
//           <span className="text-sm font-medium">{progressPercentage}%</span>
//         </div>
//       </div>

//       {/* Status Alert */}
//       {placeholderCount === 0 && completedUploads.size === 0 ? (
//         <Card className="border-green-200 bg-green-50">
//           <CardContent className="pt-6">
//             <div className="flex items-center space-x-2 text-green-800">
//               <Check className="h-5 w-5" />
//               <span className="font-medium">All images uploaded!</span>
//               <span className="text-sm">This template is ready for use.</span>
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         <Card className="border-orange-200 bg-orange-50">
//           <CardContent className="pt-6">
//             <div className="flex items-center space-x-2 text-orange-800">
//               <AlertCircle className="h-5 w-5" />
//               <span className="font-medium">
//                 {placeholderCount} image{placeholderCount !== 1 ? "s" : ""} need
//                 to be uploaded
//               </span>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Cover Image Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center space-x-2">
//             <Upload className="h-5 w-5" />
//             <span>Cover Image</span>
//             {!isPlaceholderImage(template.coverImage) && (
//               <Check className="h-4 w-4 text-green-600" />
//             )}
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <ImageUploadSection
//             templateId={template.id}
//             pageNumber={0}
//             title="Cover Image"
//             currentImageUrl={template.coverImage}
//             imagePrompt={template.coverPrompt}
//             isUploading={uploadingImages.has(0)}
//             onUploadStart={() => handleImageUploadStart(0)}
//             onUploadComplete={() => handleImageUploadComplete(0)}
//             onUploadError={(error) => handleImageUploadError(0, error)}
//           />

//           {/* S3 Image Selector for Cover */}
//           <div className="pt-2 border-t">
//             <p className="text-sm text-muted-foreground mb-2">
//               Or select an existing image from S3:
//             </p>
//             <S3ImageSelector
//               templateSlug={template.slug}
//               target="cover"
//               targetLabel="Cover"
//               onImageSelected={handleImageSelected}
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Page Images Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center space-x-2">
//             <Upload className="h-5 w-5" />
//             <span>Page Images ({template.pages.length} pages)</span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {template.pages
//               .sort((a, b) => a.pageNumber - b.pageNumber)
//               .map((page) => (
//                 <div key={page.id} className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-medium">Page {page.pageNumber}</h3>
//                     {!isPlaceholderImage(page.imageUrl) && (
//                       <Check className="h-4 w-4 text-green-600" />
//                     )}
//                   </div>

//                   <ImageUploadSection
//                     templateId={template.id}
//                     pageNumber={page.pageNumber}
//                     title={`Page ${page.pageNumber}`}
//                     currentImageUrl={page.imageUrl}
//                     imagePrompt={page.imagePrompt}
//                     isUploading={uploadingImages.has(page.pageNumber)}
//                     onUploadStart={() =>
//                       handleImageUploadStart(page.pageNumber)
//                     }
//                     onUploadComplete={() =>
//                       handleImageUploadComplete(page.pageNumber)
//                     }
//                     onUploadError={(error) =>
//                       handleImageUploadError(page.pageNumber, error)
//                     }
//                   />

//                   {/* S3 Image Selector for Each Page */}
//                   <div className="pt-2 border-t">
//                     <p className="text-sm text-muted-foreground mb-2">
//                       Or select existing image:
//                     </p>
//                     <S3ImageSelector
//                       templateSlug={template.slug}
//                       target={page.id}
//                       targetLabel={`Page ${page.pageNumber}`}
//                       onImageSelected={handleImageSelected}
//                     />
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Action Buttons */}
//       <div className="flex justify-between items-center pt-6 border-t">
//         <Button
//           variant="outline"
//           onClick={() => router.push("/admin/templates")}
//         >
//           Back to Templates
//         </Button>

//         <div className="flex space-x-2">
//           <Button
//             variant="outline"
//             onClick={() =>
//               window.open(
//                 `/library/template-preview/${template.slug}`,
//                 "_blank"
//               )
//             }
//           >
//             Preview Template
//           </Button>

//           {placeholderCount === 0 && (
//             <Button
//               onClick={() => {
//                 toast.success("Template images are complete!");
//                 router.push("/admin/templates");
//               }}
//             >
//               Done
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// src/components/admin/template/TemplateImageManager.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Upload, Check, AlertCircle } from "lucide-react";
import { BookTemplateFull } from "@/types/book";
import { ImageUploadSection } from "./ImageUploadSection";
import { S3ImageSelector } from "./S3ImageSelector";
import { toast } from "react-toastify";

interface TemplateImageManagerProps {
  template: BookTemplateFull;
}

export function TemplateImageManager({ template }: TemplateImageManagerProps) {
  const router = useRouter();
  const [uploadingImages, setUploadingImages] = useState<Set<number>>(
    new Set()
  );
  const [completedUploads, setCompletedUploads] = useState<Set<number>>(
    new Set()
  );

  // Helper function to check if an image is a placeholder
  const isPlaceholderImage = (imageUrl: string | null) => {
    if (!imageUrl) return true;
    return imageUrl.includes("placeholder") || imageUrl.startsWith("/images/");
  };

  // Calculate upload progress
  const totalImages = template.pages.length + 1; // pages + cover
  const placeholderCount = [
    template.coverImage,
    ...template.pages.map((p) => p.imageUrl),
  ].filter(isPlaceholderImage).length;
  const completedCount = [
    template.coverImage,
    ...template.pages.map((p) => p.imageUrl),
  ].filter((imageUrl) => !isPlaceholderImage(imageUrl)).length;
  const progressPercentage = Math.round((completedCount / totalImages) * 100);

  const handleImageUploadStart = (pageNumber: number) => {
    setUploadingImages((prev) => new Set([...prev, pageNumber]));
  };

  const handleImageUploadComplete = (pageNumber: number) => {
    setUploadingImages((prev) => {
      const newSet = new Set([...prev]);
      newSet.delete(pageNumber);
      return newSet;
    });
    setCompletedUploads((prev) => new Set([...prev, pageNumber]));
    toast.success(
      `Image ${
        pageNumber === 0 ? "cover" : `page ${pageNumber}`
      } uploaded successfully!`
    );

    // **FIX: Refresh the page data to show updated image**
    router.refresh();
  };

  const handleImageUploadError = (pageNumber: number, error: string) => {
    setUploadingImages((prev) => {
      const newSet = new Set([...prev]);
      newSet.delete(pageNumber);
      return newSet;
    });
    toast.error(
      `Failed to upload ${
        pageNumber === 0 ? "cover" : `page ${pageNumber}`
      } image: ${error}`
    );
  };

  const handleImageSelected = () => {
    // Refresh the page to show updated images
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/templates")}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Templates
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Manage Template Images</h1>
            <p className="text-muted-foreground">{template.title}</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            Progress: {completedCount}/{totalImages} images
          </div>
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-sm font-medium">{progressPercentage}%</span>
        </div>
      </div>

      {/* Status Alert */}
      {placeholderCount === 0 && completedUploads.size === 0 ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-green-800">
              <Check className="h-5 w-5" />
              <span className="font-medium">All images uploaded!</span>
              <span className="text-sm">This template is ready for use.</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-orange-800">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">
                {placeholderCount} image{placeholderCount !== 1 ? "s" : ""} need
                to be uploaded
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cover Image Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Cover Image</span>
            {!isPlaceholderImage(template.coverImage) && (
              <Check className="h-4 w-4 text-green-600" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageUploadSection
            templateId={template.id}
            pageNumber={0}
            title="Cover Image"
            currentImageUrl={template.coverImage}
            imagePrompt={template.coverPrompt}
            isUploading={uploadingImages.has(0)}
            onUploadStart={() => handleImageUploadStart(0)}
            onUploadComplete={() => handleImageUploadComplete(0)}
            onUploadError={(error) => handleImageUploadError(0, error)}
          />

          {/* S3 Image Selector for Cover */}
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground mb-2">
              Or select an existing image from S3:
            </p>
            <S3ImageSelector
              templateSlug={template.slug}
              target="cover"
              targetLabel="Cover"
              onImageSelected={handleImageSelected}
            />
          </div>
        </CardContent>
      </Card>

      {/* Page Images Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Page Images ({template.pages.length} pages)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {template.pages
              .sort((a, b) => a.pageNumber - b.pageNumber)
              .map((page) => (
                <div key={page.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Page {page.pageNumber}</h3>
                    {!isPlaceholderImage(page.imageUrl) && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </div>

                  <ImageUploadSection
                    templateId={template.id}
                    pageNumber={page.pageNumber}
                    title={`Page ${page.pageNumber}`}
                    currentImageUrl={page.imageUrl}
                    imagePrompt={page.imagePrompt}
                    isUploading={uploadingImages.has(page.pageNumber)}
                    onUploadStart={() =>
                      handleImageUploadStart(page.pageNumber)
                    }
                    onUploadComplete={() =>
                      handleImageUploadComplete(page.pageNumber)
                    }
                    onUploadError={(error) =>
                      handleImageUploadError(page.pageNumber, error)
                    }
                  />

                  {/* S3 Image Selector for Each Page */}
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground mb-2">
                      Or select existing image:
                    </p>
                    <S3ImageSelector
                      templateSlug={template.slug}
                      target={page.id}
                      targetLabel={`Page ${page.pageNumber}`}
                      onImageSelected={handleImageSelected}
                    />
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/templates")}
        >
          Back to Templates
        </Button>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() =>
              window.open(
                `/library/template-preview/${template.slug}`,
                "_blank"
              )
            }
          >
            Preview Template
          </Button>

          {placeholderCount === 0 && (
            <Button
              onClick={() => {
                toast.success("Template images are complete!");
                router.push("/admin/templates");
              }}
            >
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
