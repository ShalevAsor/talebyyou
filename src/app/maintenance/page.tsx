import { getMaintenanceStatus } from "@/actions/maintenance-actions";
import { Wrench, Clock } from "lucide-react";
import RefreshButton from "@/components/common/RefreshButton";
import AdminLink from "@/components/common/AdminLink"; // ADD THIS

export default async function MaintenancePage() {
  const result = await getMaintenanceStatus();

  // Handle case where we can't get the config
  const config = result.success
    ? result.data.config
    : {
        maintenanceTitle: "We'll be back soon!",
        maintenanceMessage:
          "We're performing scheduled maintenance. Please check back in a few minutes.",
        estimatedDowntime: null,
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Wrench className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {config.maintenanceTitle}
          </h1>
          <p className="text-gray-600">{config.maintenanceMessage}</p>
        </div>

        {config.estimatedDowntime && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">
                Estimated downtime: {config.estimatedDowntime}
              </span>
            </div>
          </div>
        )}

        <RefreshButton />

        <div className="mt-4">
          <p className="text-xs text-gray-500">Thank you for your patience</p>
          {/* ADD ADMIN LINK */}
          <AdminLink />
        </div>
      </div>
    </div>
  );
}
