// src/components/admin/template/GenreManagement.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Trash2,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Loader2,
  Eye,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  analyzeGenreUsage,
  cleanupOrphanedGenres,
} from "@/actions/genre-actions";
import AdminActionDialog from "@/components/admin/AdminActionDialog";

export function GenreManagement() {
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Query for genre analysis
  const {
    data: analysisData,
    isLoading: analysisLoading,
    refetch: refetchAnalysis,
  } = useQuery({
    queryKey: ["genre-analysis"],
    queryFn: async () => {
      const result = await analyzeGenreUsage();
      if (!result.success) {
        throw new Error(result.error || "Failed to analyze genres");
      }
      return result.data;
    },
    enabled: false, // Only run when manually triggered
  });

  // Mutation for cleanup
  const cleanupMutation = useMutation({
    mutationFn: async () => {
      const result = await cleanupOrphanedGenres();
      if (!result.success) {
        throw new Error(result.error || "Failed to cleanup genres");
      }
      return result.data;
    },
    onSuccess: (data) => {
      if (data.removedCount > 0) {
        toast.success(
          `Successfully removed ${data.removedCount} orphaned genres`
        );
        // Refresh analysis after cleanup
        refetchAnalysis();
      } else {
        toast.info("No orphaned genres found to remove");
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to cleanup genres"
      );
    },
  });

  const handleAnalyze = () => {
    setShowAnalysis(true);
    refetchAnalysis();
  };

  const handleCleanup = async () => {
    cleanupMutation.mutate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Genre Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Analyze genre usage and clean up orphaned genres that are not
          connected to any templates.
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={showAnalysis} onOpenChange={setShowAnalysis}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                onClick={handleAnalyze}
                disabled={analysisLoading}
              >
                {analysisLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Eye className="h-4 w-4 mr-2" />
                )}
                Analyze Genre Usage
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Genre Usage Analysis</DialogTitle>
              </DialogHeader>

              {analysisLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Analyzing genres...</span>
                </div>
              ) : analysisData ? (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">
                        {analysisData.totalGenres}
                      </div>
                      <div className="text-sm text-blue-600">Total Genres</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">
                        {analysisData.usedGenres}
                      </div>
                      <div className="text-sm text-green-600">Used Genres</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600">
                        {analysisData.orphanedGenres.length}
                      </div>
                      <div className="text-sm text-orange-600">
                        Orphaned Genres
                      </div>
                    </div>
                  </div>

                  {/* Orphaned Genres */}
                  {analysisData.orphanedGenres.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Orphaned Genres Found</AlertTitle>
                      <AlertDescription>
                        The following genres are not connected to any templates:
                        <div className="flex flex-wrap gap-1 mt-2">
                          {analysisData.orphanedGenres.map((genre) => (
                            <Badge key={genre.id} variant="destructive">
                              {genre.name}
                            </Badge>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* No orphaned genres message */}
                  {analysisData.orphanedGenres.length === 0 && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>All Genres In Use</AlertTitle>
                      <AlertDescription>
                        All genres are currently connected to at least one
                        template. No cleanup needed.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Genre Usage Details */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Genre Usage Details
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {analysisData.genreUsageDetails.map((genre) => (
                        <div
                          key={genre.id}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            genre.templateCount === 0
                              ? "bg-orange-50 border-orange-200"
                              : "bg-green-50 border-green-200"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {genre.templateCount === 0 ? (
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            <span className="font-medium">{genre.name}</span>
                            {genre.templateCount > 0 &&
                              genre.templates.length > 0 && (
                                <div className="text-xs text-gray-500 ml-2">
                                  (
                                  {genre.templates
                                    .map((t) => t.title)
                                    .join(", ")}
                                  )
                                </div>
                              )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {genre.templateCount} template
                            {genre.templateCount !== 1 ? "s" : ""}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowAnalysis(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AdminActionDialog
            title="Cleanup Orphaned Genres"
            description={
              analysisData?.orphanedGenres.length
                ? `This will permanently delete ${
                    analysisData.orphanedGenres.length
                  } genres that are not connected to any templates: ${analysisData.orphanedGenres
                    .map((g) => g.name)
                    .join(", ")}`
                : "This will remove any genres that are not connected to any templates. Run analysis first to see what will be removed."
            }
            actionLabel="Cleanup Genres"
            triggerLabel="Cleanup Orphaned Genres"
            triggerIcon={<Trash2 className="h-4 w-4" />}
            isLoading={cleanupMutation.isPending}
            onAction={handleCleanup}
            variant="outline"
            actionVariant="destructive"
            disabled={analysisData?.orphanedGenres.length === 0}
          />
        </div>

        {/* Quick Stats */}
        {analysisData && (
          <Alert>
            <BarChart3 className="h-4 w-4" />
            <AlertTitle>Quick Stats</AlertTitle>
            <AlertDescription>
              {analysisData.totalGenres} total genres •{" "}
              {analysisData.usedGenres} in use •{" "}
              {analysisData.orphanedGenres.length} orphaned
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
