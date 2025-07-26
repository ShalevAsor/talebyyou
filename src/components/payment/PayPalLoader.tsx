"use client";

import { usePayPalScriptReducer } from "@paypal/react-paypal-js";

import { Loading } from "../common";

export const PayPalLoader: React.FC = () => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();
  if (isPending) {
    return <Loading message="Loading PayPal Payment" />;
  } else if (isRejected) {
    return (
      <div className="flex gap-2 justify-center align-center">
        Error while loading PayPal
      </div>
    );
  }
};
