import { ArrowLeft, ArrowRight } from "lucide-react";
import { routeSteps } from "../constants";
import { useComplianceStore } from "../store/complianceStore";
import { useNavigate } from "react-router";

const StepNavigation = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, markStepCompleted, resetSteps } =
    useComplianceStore();

  const handleNext = () => {
    // Validate current step here
    markStepCompleted(currentStep);
    if (currentStep < routeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      // In real app: navigate(steps[currentStep + 1].route)
      navigate(`${routeSteps[currentStep + 1].route}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // In real app: navigate(steps[currentStep - 1].route)
    }
  };

  return (
    <div className="flex justify-between items-center pt-8 border-t border-gray-200">
      <button
        onClick={handlePrevious}
        disabled={currentStep === 0}
        className={`flex items-center space-x-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg transition-colors ${
          currentStep === 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-50"
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      <div className="flex space-x-3">
        <button
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          // reset steps
          onClick={() => {
            resetSteps();
          }}
        >
          Reset
        </button>

        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <span>
            {currentStep === routeSteps.length - 1 ? "Submit" : "Continue"}
          </span>
          {currentStep < routeSteps.length - 1 && (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default StepNavigation;
