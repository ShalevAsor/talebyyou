"use client";

import { useState } from "react";
import {
  toggleMaintenanceMode,
  updateMaintenanceSettings,
} from "@/actions/maintenance-actions";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Settings, AlertTriangle } from "lucide-react";

interface MaintenanceControlProps {
  initialConfig: {
    maintenanceMode: boolean;
    maintenanceTitle: string;
    maintenanceMessage: string;
    estimatedDowntime?: string | null;
  };
}

export default function MaintenanceControl({
  initialConfig,
}: MaintenanceControlProps) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(
    initialConfig.maintenanceMode
  );
  const [title, setTitle] = useState(initialConfig.maintenanceTitle);
  const [message, setMessage] = useState(initialConfig.maintenanceMessage);
  const [downtime, setDowntime] = useState(
    initialConfig.estimatedDowntime || ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleMaintenance = async () => {
    setIsLoading(true);
    try {
      const result = await toggleMaintenanceMode(!isMaintenanceMode);
      if (result.success) {
        setIsMaintenanceMode(!isMaintenanceMode);
      }
    } catch (error) {
      console.error("Failed to toggle maintenance mode:", error);
    }
    setIsLoading(false);
  };

  const handleUpdateSettings = async () => {
    setIsLoading(true);
    try {
      await updateMaintenanceSettings({
        title,
        message,
        estimatedDowntime: downtime || undefined,
      });
    } catch (error) {
      console.error("Failed to update maintenance settings:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center mb-6">
        <Settings className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-semibold">Maintenance Mode</h2>
      </div>

      {isMaintenanceMode && (
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            ⚠️ Your site is currently in maintenance mode. Regular users cannot
            access the site.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {/* Toggle Switch */}
        <div className="flex items-center space-x-3">
          <Switch
            id="maintenance-mode"
            checked={isMaintenanceMode}
            onCheckedChange={handleToggleMaintenance}
            disabled={isLoading}
          />
          <Label htmlFor="maintenance-mode" className="font-medium">
            {isMaintenanceMode ? "Disable" : "Enable"} Maintenance Mode
          </Label>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Maintenance Page Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="We'll be back soon!"
            />
          </div>

          <div>
            <Label htmlFor="message">Maintenance Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="We're performing scheduled maintenance..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="downtime">Estimated Downtime (Optional)</Label>
            <Input
              id="downtime"
              value={downtime}
              onChange={(e) => setDowntime(e.target.value)}
              placeholder="e.g., 30 minutes, 2 hours"
            />
          </div>

          <Button
            onClick={handleUpdateSettings}
            disabled={isLoading}
            className="w-full"
          >
            Update Maintenance Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
