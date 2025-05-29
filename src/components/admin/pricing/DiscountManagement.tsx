"use client";

import { useState } from "react";
import {
  toggleDiscount,
  updateDiscountSettings,
  updateDiscountBanner,
} from "@/actions/pricing-actions";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tag, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { DiscountConfig } from "@/types/pricing";
import { toast } from "react-toastify";
import { usePricingMutations } from "@/hooks/usePricingMutations";

interface DiscountManagementProps {
  initialDiscount: DiscountConfig;
  isDiscountActive: boolean;
}

export function DiscountManagement({
  initialDiscount,
  isDiscountActive: initialIsActive,
}: DiscountManagementProps) {
  // Discount toggle state
  const [isActive, setIsActive] = useState(initialDiscount.active);
  const [isToggleLoading, setIsToggleLoading] = useState(false);

  // Discount settings state
  const [discountType, setDiscountType] = useState(initialDiscount.type);
  const [discountValue, setDiscountValue] = useState(initialDiscount.value);
  const [discountName, setDiscountName] = useState(initialDiscount.name);
  const [discountDescription, setDiscountDescription] = useState(
    initialDiscount.description
  );
  const [startDate, setStartDate] = useState(initialDiscount.startDate || "");
  const [endDate, setEndDate] = useState(initialDiscount.endDate || "");
  const [applicableProducts, setApplicableProducts] = useState(
    initialDiscount.applicableProducts
  );
  const [isSettingsLoading, setIsSettingsLoading] = useState(false);

  // Banner settings state
  const [bannerEnabled, setBannerEnabled] = useState(
    initialDiscount.bannerEnabled
  );
  const [bannerText, setBannerText] = useState(initialDiscount.bannerText);
  const [isBannerLoading, setIsBannerLoading] = useState(false);

  // Use pricing mutations hook for cache management
  const { invalidatePricing } = usePricingMutations();

  const handleToggleDiscount = async () => {
    setIsToggleLoading(true);
    try {
      const result = await toggleDiscount(!isActive);
      if (result.success) {
        setIsActive(!isActive);
        toast.success(`Discount ${!isActive ? "activated" : "deactivated"}!`);

        // Invalidate cache to update all components immediately
        await invalidatePricing();
      } else {
        toast.error(result.error || "Failed to toggle discount");
      }
    } catch (error) {
      console.error("Failed to toggle discount:", error);
      toast.error("An unexpected error occurred");
    }
    setIsToggleLoading(false);
  };

  const handleUpdateDiscountSettings = async () => {
    setIsSettingsLoading(true);
    try {
      const result = await updateDiscountSettings({
        type: discountType,
        value: discountValue,
        name: discountName,
        description: discountDescription,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        applicableProducts,
      });

      if (result.success) {
        toast.success("Discount settings updated successfully!");

        // Invalidate cache to update all components immediately
        await invalidatePricing();
      } else {
        toast.error(result.error || "Failed to update discount settings");
      }
    } catch (error) {
      console.error("Failed to update discount settings:", error);
      toast.error("An unexpected error occurred");
    }
    setIsSettingsLoading(false);
  };

  const handleUpdateBanner = async () => {
    setIsBannerLoading(true);
    try {
      const result = await updateDiscountBanner({
        enabled: bannerEnabled,
        text: bannerText,
      });

      if (result.success) {
        toast.success("Banner settings updated successfully!");

        // Invalidate cache to update banner and other components immediately
        await invalidatePricing();
      } else {
        toast.error(result.error || "Failed to update banner settings");
      }
    } catch (error) {
      console.error("Failed to update banner:", error);
      toast.error("An unexpected error occurred");
    }
    setIsBannerLoading(false);
  };

  // Validation
  const discountValueNum = parseFloat(discountValue);
  const isValidValue = !isNaN(discountValueNum) && discountValueNum > 0;
  const isValidPercentage = discountType === "FIXED" || discountValueNum < 100;
  const canSaveSettings =
    isValidValue && isValidPercentage && discountName.trim();

  // Date validation
  const isValidDateRange =
    !startDate || !endDate || new Date(startDate) < new Date(endDate);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Tag className="w-5 h-5 text-purple-600 mr-2" />
          <h2 className="text-lg font-semibold">Discount Management</h2>
        </div>
        <div className="flex items-center gap-2">
          {initialIsActive && (
            <Badge variant="default" className="bg-green-100 text-green-800">
              <Clock className="w-3 h-3 mr-1" />
              Active Now
            </Badge>
          )}
        </div>
      </div>

      {/* Active discount alert */}
      {isActive && initialIsActive && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            ✨ Discount is currently active and being applied to orders
          </AlertDescription>
        </Alert>
      )}

      {/* Inactive discount alert */}
      {isActive && !initialIsActive && (
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            ⚠️ Discount is enabled but not currently active (check dates)
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="settings">Discount Settings</TabsTrigger>
          <TabsTrigger value="banner">Banner Control</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          {/* Quick Toggle */}
          <div className="flex items-center space-x-3">
            <Switch
              id="discount-active"
              checked={isActive}
              onCheckedChange={handleToggleDiscount}
              disabled={isToggleLoading}
            />
            <Label htmlFor="discount-active" className="font-medium">
              {isActive ? "Disable" : "Enable"} Discount
            </Label>
          </div>

          {/* Discount Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discount-type">Discount Type</Label>
                <Select
                  value={discountType}
                  onValueChange={(value: "PERCENTAGE" | "FIXED") =>
                    setDiscountType(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                    <SelectItem value="FIXED">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="discount-value">
                  Value {discountType === "PERCENTAGE" ? "(%)" : "($)"}
                </Label>
                <Input
                  id="discount-value"
                  type="number"
                  step={discountType === "PERCENTAGE" ? "1" : "0.01"}
                  min="0"
                  max={discountType === "PERCENTAGE" ? "99" : undefined}
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder={discountType === "PERCENTAGE" ? "10" : "5.00"}
                />
                {!isValidValue && discountValue && (
                  <p className="text-sm text-red-600 mt-1">
                    Please enter a valid value greater than 0
                  </p>
                )}
                {!isValidPercentage && discountType === "PERCENTAGE" && (
                  <p className="text-sm text-red-600 mt-1">
                    Percentage must be less than 100%
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="discount-name">Discount Name</Label>
              <Input
                id="discount-name"
                value={discountName}
                onChange={(e) => setDiscountName(e.target.value)}
                placeholder="Spring Sale"
              />
            </div>

            <div>
              <Label htmlFor="discount-description">Description</Label>
              <Textarea
                id="discount-description"
                value={discountDescription}
                onChange={(e) => setDiscountDescription(e.target.value)}
                placeholder="Save on all personalized children's books..."
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="applicable-products">Applicable Products</Label>
              <Select
                value={applicableProducts}
                onValueChange={(value: "ALL" | "PHYSICAL" | "DIGITAL") =>
                  setApplicableProducts(value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Products</SelectItem>
                  <SelectItem value="PHYSICAL">Physical Books Only</SelectItem>
                  <SelectItem value="DIGITAL">Digital Books Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date (Optional)</Label>
                <Input
                  id="start-date"
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="end-date">End Date (Optional)</Label>
                <Input
                  id="end-date"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {!isValidDateRange && (
              <p className="text-sm text-red-600">
                End date must be after start date
              </p>
            )}

            <Button
              onClick={handleUpdateDiscountSettings}
              disabled={
                isSettingsLoading || !canSaveSettings || !isValidDateRange
              }
              className="w-full"
            >
              {isSettingsLoading ? "Updating..." : "Update Discount Settings"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="banner" className="space-y-6">
          <div className="flex items-center space-x-3">
            <Switch
              id="banner-enabled"
              checked={bannerEnabled}
              onCheckedChange={setBannerEnabled}
            />
            <Label htmlFor="banner-enabled" className="font-medium">
              Show Discount Banner
            </Label>
          </div>

          <div>
            <Label htmlFor="banner-text">Banner Text</Label>
            <Input
              id="banner-text"
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
              placeholder="🎉 Limited Time: 10% off all books!"
              disabled={!bannerEnabled}
            />
          </div>

          <Button
            onClick={handleUpdateBanner}
            disabled={isBannerLoading}
            className="w-full"
          >
            {isBannerLoading ? "Updating..." : "Update Banner Settings"}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
