import React from "react";
import ComplianceSidebar from "./complianceSidebar";
import StepNavigation from "./complianceStepNavigation";

// pass children

const ComplianceFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <ComplianceSidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {children}
            <StepNavigation />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComplianceFormLayout;
