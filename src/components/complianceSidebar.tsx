import { Check } from "lucide-react";
import { routeSteps } from "../constants";
import { useComplianceStore } from "../store/complianceStore";
import { useNavigate } from "react-router";

const ComplianceSidebar = () => {
  const navigate = useNavigate();
  const { currentStep, completedSteps, isStepAccessible, setCurrentStep } =
    useComplianceStore();

  const handleStepClick = (stepIndex: number) => {
    if (isStepAccessible(stepIndex)) {
      setCurrentStep(stepIndex);
      // In real app: navigate(steps[stepIndex].route)
      navigate(`${routeSteps[stepIndex].route}`);
      console.log(`Navigate to: ${routeSteps[stepIndex].route}`);
    }
  };

  return (
    <div className="w-80 bg-gray-50 min-h-screen border-r border-gray-200">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-lg font-semibold text-gray-900 mb-2">
            Business Compliance
          </h1>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${useComplianceStore().getProgress()}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {completedSteps.size} of {routeSteps.length} steps completed
          </p>
        </div>

        <nav className="space-y-4">
          {routeSteps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = completedSteps.has(index);
            const isAccessible = isStepAccessible(index);

            return (
              <div
                key={step.id}
                className={`flex items-start space-x-3 p-3 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-teal-50 border border-teal-200"
                    : "hover:bg-gray-100"
                } ${!isAccessible ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handleStepClick(index)}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {isCompleted ? (
                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : isActive ? (
                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  ) : (
                    <div
                      className={`w-6 h-6 rounded-full border-2 ${
                        isAccessible ? "border-gray-300" : "border-gray-200"
                      }`}
                    />
                  )}
                </div>
                <div
                  className="flex-1 min-w-0"
                  onClick={() => {
                    navigate(`${step.route}`);
                    setCurrentStep(index);
                  }}
                >
                  <h3
                    className={`text-sm font-medium ${
                      isActive
                        ? "text-teal-700"
                        : isCompleted
                        ? "text-gray-700"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default ComplianceSidebar;
