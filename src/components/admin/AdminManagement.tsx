"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  UserPlus,
  UserMinus,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { setUserAdminStatus } from "@/actions/admin-actions";

export function AdminManagement() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleAdminAction = async (makeAdmin: boolean) => {
    if (!email.trim()) {
      setMessage({ type: "error", text: "Email is required" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const result = await setUserAdminStatus(email.trim(), makeAdmin);

      if (result.success) {
        setMessage({
          type: "success",
          text: `Successfully ${
            makeAdmin ? "granted" : "revoked"
          } admin access for ${email}`,
        });
        setEmail(""); // Clear the input on success
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to update admin status",
        });
      }
    } catch (error) {
      console.error("Error updating admin status:", error);
      setMessage({
        type: "error",
        text: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Admin Management
        </CardTitle>
        <CardDescription>
          Grant or revoke admin access for users by their email address
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-email">User Email</Label>
          <Input
            id="admin-email"
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"}>
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button
            onClick={() => handleAdminAction(true)}
            disabled={isLoading || !email.trim()}
            className="flex-1"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <UserPlus className="h-4 w-4 mr-2" />
            )}
            Grant Admin
          </Button>

          <Button
            variant="outline"
            onClick={() => handleAdminAction(false)}
            disabled={isLoading || !email.trim()}
            className="flex-1"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <UserMinus className="h-4 w-4 mr-2" />
            )}
            Revoke Admin
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            <strong>Note:</strong> Only existing users with accounts can be made
            admins.
          </p>
          <p>You cannot revoke your own admin access.</p>
        </div>
      </CardContent>
    </Card>
  );
}
