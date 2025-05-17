import { PrintJobStatus } from "@/generated/prisma";

export function mapLuluStatusToPrintJobStatus(
  luluStatus: string
): PrintJobStatus {
  switch (luluStatus) {
    case "CREATED":
      return PrintJobStatus.CREATED;
    case "UNPAID":
      return PrintJobStatus.UNPAID;
    case "PAYMENT_IN_PROGRESS":
      return PrintJobStatus.PAYMENT_IN_PROGRESS;
    case "PRODUCTION_DELAYED":
      return PrintJobStatus.PRODUCTION_DELAYED;
    case "PRODUCTION_READY":
      return PrintJobStatus.PRODUCTION_READY;
    case "IN_PRODUCTION":
      return PrintJobStatus.IN_PRODUCTION;
    case "SHIPPED":
      return PrintJobStatus.SHIPPED;
    case "REJECTED":
      return PrintJobStatus.REJECTED;
    case "CANCELED":
      return PrintJobStatus.CANCELED;
    default:
      return PrintJobStatus.CREATED;
  }
}
export const getStatusBadgeColor = (status: PrintJobStatus) => {
  switch (status) {
    case "CREATED":
      return "bg-yellow-100 text-yellow-800";
    case "UNPAID":
      return "bg-red-100 text-red-800";
    case "PAYMENT_IN_PROGRESS":
      return "bg-blue-100 text-blue-800";
    case "PRODUCTION_DELAYED":
      return "bg-orange-100 text-orange-800";
    case "PRODUCTION_READY":
      return "bg-indigo-100 text-indigo-800";
    case "IN_PRODUCTION":
      return "bg-purple-100 text-purple-800";
    case "SHIPPED":
      return "bg-green-600 text-white";
    case "REJECTED":
      return "bg-red-600 text-white";
    case "CANCELED":
      return "bg-gray-600 text-white";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
