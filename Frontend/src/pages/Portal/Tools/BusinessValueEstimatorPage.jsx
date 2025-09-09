import React, { useEffect } from "react";
import BusinessValueEstimator from "../../../components/Portal/Tools/BusinessValueEstimator";
import { useLoading } from "../../../utils/LoadingContext";

export default function BusinessValueEstimatorPage() {
  const { stopLoading } = useLoading();

  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <BusinessValueEstimator />
    </div>
  );
}
