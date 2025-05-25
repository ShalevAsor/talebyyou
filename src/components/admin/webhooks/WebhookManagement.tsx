"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminActionDialog from "@/components/admin/AdminActionDialog";
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  List,
  Trash2,
  Send,
} from "lucide-react";
import { WebhookResponse } from "@/types/print";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  getLuluWebhookStatus,
  setupLuluWebhook,
  testLuluWebhook,
  deleteLuluWebhook,
  getAllLuluWebhooks,
  deleteLuluWebhookById,
} from "@/actions/admin-actions";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface WebhookManagementProps {
  initialWebhook: WebhookResponse | null;
}

export function WebhookManagement({ initialWebhook }: WebhookManagementProps) {
  const [webhook, setWebhook] = useState<WebhookResponse | null>(
    initialWebhook
  );
  const [loading, setLoading] = useState<{
    refresh: boolean;
    setup: boolean;
    test: boolean;
    delete: boolean;
    listAll: boolean;
    deleteById: string | null;
  }>({
    refresh: false,
    setup: false,
    test: false,
    delete: false,
    listAll: false,
    deleteById: null,
  });
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    timestamp: Date;
  } | null>(null);
  const [allWebhooks, setAllWebhooks] = useState<WebhookResponse[]>([]);
  const [webhooksDialogOpen, setWebhooksDialogOpen] = useState(false);

  // Refresh webhook status
  const refreshStatus = async () => {
    setLoading((prev) => ({ ...prev, refresh: true }));
    try {
      const result = await getLuluWebhookStatus();
      if (result.success) {
        setWebhook(result.data);
        setMessage({
          type: "success",
          text: result.data
            ? "Webhook status refreshed successfully."
            : "No webhook configured.",
        });
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to refresh webhook status.",
        });
      }
    } catch (error) {
      console.error("Error refreshing webhook status:", error);
      setMessage({
        type: "error",
        text: "An error occurred while refreshing webhook status.",
      });
    } finally {
      setLoading((prev) => ({ ...prev, refresh: false }));
    }
  };

  // Setup or update webhook
  const setupWebhook = async () => {
    setLoading((prev) => ({ ...prev, setup: true }));
    try {
      const result = await setupLuluWebhook();
      if (result.success) {
        setWebhook(result.data);
        setMessage({
          type: "success",
          text: webhook
            ? "Webhook updated successfully."
            : "Webhook set up successfully.",
        });
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to set up webhook.",
        });
      }
    } catch (error) {
      console.error("Error setting up webhook:", error);
      setMessage({
        type: "error",
        text: "An error occurred while setting up the webhook.",
      });
    } finally {
      setLoading((prev) => ({ ...prev, setup: false }));
    }
  };

  // Test webhook
  const testWebhook = async () => {
    if (!webhook) {
      setMessage({
        type: "error",
        text: "No webhook configured. Please set up a webhook first.",
      });
      return;
    }

    setLoading((prev) => ({ ...prev, test: true }));
    try {
      const result = await testLuluWebhook();
      if (result.success) {
        setTestResult({
          success: true,
          timestamp: new Date(),
        });
        setMessage({
          type: "success",
          text: "Test webhook sent successfully. Check your logs for the received webhook.",
        });
      } else {
        setTestResult({
          success: false,
          timestamp: new Date(),
        });
        setMessage({
          type: "error",
          text: result.error || "Failed to send test webhook.",
        });
      }
    } catch (error) {
      console.error("Error testing webhook:", error);
      setMessage({
        type: "error",
        text: "An error occurred while testing the webhook.",
      });
    } finally {
      setLoading((prev) => ({ ...prev, test: false }));
    }
  };

  // Delete webhook
  const removeWebhook = async () => {
    if (!webhook) {
      setMessage({
        type: "info",
        text: "No webhook configured to delete.",
      });
      return;
    }

    setLoading((prev) => ({ ...prev, delete: true }));
    try {
      const result = await deleteLuluWebhook();
      if (result.success) {
        setWebhook(null);
        setMessage({
          type: "success",
          text: "Webhook deleted successfully.",
        });
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to delete webhook.",
        });
      }
    } catch (error) {
      console.error("Error deleting webhook:", error);
      setMessage({
        type: "error",
        text: "An error occurred while deleting the webhook.",
      });
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  // Get all webhooks
  const fetchAllWebhooks = async () => {
    setLoading((prev) => ({ ...prev, listAll: true }));
    try {
      const result = await getAllLuluWebhooks();
      if (result.success) {
        setAllWebhooks(result.data);
        setWebhooksDialogOpen(true);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to get all webhooks.",
        });
      }
    } catch (error) {
      console.error("Error fetching all webhooks:", error);
      setMessage({
        type: "error",
        text: "An error occurred while fetching all webhooks.",
      });
    } finally {
      setLoading((prev) => ({ ...prev, listAll: false }));
    }
  };

  // Delete webhook by ID
  const deleteWebhookById = async (webhookId: string) => {
    setLoading((prev) => ({ ...prev, deleteById: webhookId }));
    try {
      const result = await deleteLuluWebhookById(webhookId);
      if (result.success) {
        // Remove from the list
        setAllWebhooks((prev) => prev.filter((wh) => wh.id !== webhookId));

        // If this was our main webhook, refresh the main webhook status
        if (webhook && webhook.id === webhookId) {
          await refreshStatus();
        }

        setMessage({
          type: "success",
          text: `Webhook ${webhookId} deleted successfully.`,
        });
      } else {
        setMessage({
          type: "error",
          text: result.error || `Failed to delete webhook ${webhookId}.`,
        });
      }
    } catch (error) {
      console.error(`Error deleting webhook ${webhookId}:`, error);
      setMessage({
        type: "error",
        text: `An error occurred while deleting webhook ${webhookId}.`,
      });
    } finally {
      setLoading((prev) => ({ ...prev, deleteById: null }));
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Webhook Configuration</CardTitle>
              <CardDescription>
                Manage the Lulu Print API webhook for status updates
              </CardDescription>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={refreshStatus}
              disabled={loading.refresh}
            >
              <RefreshCw
                className={`h-4 w-4 ${loading.refresh ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {message && (
            <Alert
              variant={
                message.type === "success"
                  ? "default"
                  : message.type === "error"
                  ? "destructive"
                  : "default"
              }
              className="mb-6"
            >
              <AlertTitle>
                {message.type === "success"
                  ? "Success"
                  : message.type === "error"
                  ? "Error"
                  : "Information"}
              </AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          {/* Webhook Status Card */}
          <div className="mb-6 p-4 border rounded-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Current Status</h3>
              <Badge
                variant={
                  webhook && webhook.is_active ? "success" : "destructive"
                }
                className={
                  webhook && webhook.is_active
                    ? "bg-green-100 text-green-800"
                    : ""
                }
              >
                {webhook && webhook.is_active ? "Active" : "Not Configured"}
              </Badge>
            </div>

            {webhook ? (
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-1">
                  <span className="font-medium">Webhook ID:</span>
                  <span className="col-span-2">{webhook.id}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="font-medium">URL:</span>
                  <span className="col-span-2 break-all">{webhook.url}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="font-medium">Topics:</span>
                  <span className="col-span-2">
                    {webhook.topics.join(", ")}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="font-medium">Status:</span>
                  <span className="col-span-2">
                    {webhook.is_active ? (
                      <span className="text-green-600 flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-1" /> Active
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> Inactive
                      </span>
                    )}
                  </span>
                </div>

                {testResult && (
                  <div className="mt-2 p-2 bg-muted rounded-md">
                    <span className="font-medium">Last Test:</span>{" "}
                    {testResult.timestamp.toLocaleString()} -
                    {testResult.success ? (
                      <span className="text-green-600 ml-1">Successful</span>
                    ) : (
                      <span className="text-red-600 ml-1">Failed</span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center text-amber-600">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>
                  No webhook currently configured. Set up a webhook to receive
                  print job status updates.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant={webhook ? "outline" : "default"}
              onClick={setupWebhook}
              disabled={loading.setup}
            >
              {loading.setup && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {webhook ? "Update Webhook" : "Set Up Webhook"}
            </Button>

            {webhook && (
              <>
                <AdminActionDialog
                  title="Send Test Notification"
                  description="This will send a test webhook to your configured endpoint. Check your logs to verify it was received."
                  actionLabel="Send Test"
                  triggerLabel="Send Test Notification"
                  triggerIcon={<Send className="h-4 w-4" />}
                  isLoading={loading.test}
                  onAction={testWebhook}
                  variant="default"
                />

                <AdminActionDialog
                  title="Delete Webhook"
                  description="Are you sure you want to delete this webhook? This action cannot be undone."
                  actionLabel="Delete"
                  triggerLabel="Delete Webhook"
                  triggerIcon={<Trash2 className="h-4 w-4" />}
                  isLoading={loading.delete}
                  onAction={removeWebhook}
                  variant="destructive"
                  actionVariant="destructive"
                />
              </>
            )}

            {/* Button to list all webhooks */}
            <Button
              variant="outline"
              onClick={fetchAllWebhooks}
              disabled={loading.listAll}
              className="ml-auto"
            >
              {loading.listAll ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <List className="h-4 w-4 mr-2" />
              )}
              View All Webhooks
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialog to show all webhooks */}
      <Dialog open={webhooksDialogOpen} onOpenChange={setWebhooksDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>All Lulu Webhooks</DialogTitle>
            <DialogDescription>
              List of all webhooks registered with Lulu in your account
            </DialogDescription>
          </DialogHeader>

          {allWebhooks.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              No webhooks found for your Lulu account.
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {allWebhooks.map((wh) => (
                <div key={wh.id} className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium truncate max-w-[70%]">
                      {wh.id}
                    </div>
                    <Badge
                      variant={wh.is_active ? "success" : "destructive"}
                      className={
                        wh.is_active ? "bg-green-100 text-green-800" : ""
                      }
                    >
                      {wh.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="truncate">
                      <span className="font-medium">URL:</span> {wh.url}
                    </div>
                    <div>
                      <span className="font-medium">Topics:</span>{" "}
                      {wh.topics.join(", ")}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="text-xs text-muted-foreground">
                      {webhook && webhook.id === wh.id ? (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-600"
                        >
                          Current
                        </Badge>
                      ) : null}
                    </div>

                    <AdminActionDialog
                      title={`Delete Webhook: ${wh.id.substring(0, 8)}...`}
                      description="Are you sure you want to delete this webhook? This action cannot be undone."
                      actionLabel="Delete Webhook"
                      triggerLabel="Delete"
                      triggerIcon={<Trash2 className="h-4 w-4" />}
                      isLoading={loading.deleteById === wh.id}
                      onAction={() => deleteWebhookById(wh.id)}
                      variant="destructive"
                      actionVariant="destructive"
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setWebhooksDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
