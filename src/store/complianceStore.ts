/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ComplianceStore {
  // State
  currentStep: number;
  completedSteps: Set<number>;
  formData: {
    companyInfo: Record<string, any>;
    directorsOwners: Record<string, any>;
    kycDocuments: Record<string, any>;
  };
  errors: Record<string, string[]>;

  // Actions
  setCurrentStep: (step: number) => void;
  markStepCompleted: (step: number) => void;
  updateFormData: (
    section: "companyInfo" | "directorsOwners" | "kycDocuments",
    data: Record<string, any>
  ) => void;
  setErrors: (errors: Record<string, string[]>) => void;
  clearErrors: () => void;

  // Computed
  getProgress: () => number;
  isStepAccessible: (stepIndex: number) => boolean;

  // reset steps
  resetSteps: () => void;
}

export const useComplianceStore = create<ComplianceStore>()(
  persist(
    (set, get) => ({
      // State
      currentStep: 0,
      completedSteps: new Set<number>(),
      formData: {
        companyInfo: {},
        directorsOwners: {},
        kycDocuments: {},
      },
      errors: {},

      // Actions
      setCurrentStep: (step) => set({ currentStep: step }),

      markStepCompleted: (step) =>
        set((state) => ({
          completedSteps: new Set([...state.completedSteps, step]),
        })),

      updateFormData: (
        section: "companyInfo" | "directorsOwners" | "kycDocuments",
        data: Record<string, any>
      ) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [section]: { ...state.formData[section], ...data },
          },
        })),

      setErrors: (errors) => set({ errors }),
      clearErrors: () => set({ errors: {} }),

      // Computed
      getProgress: () => (get().completedSteps.size / 4) * 100,
      isStepAccessible: (stepIndex) => {
        const { currentStep, completedSteps } = get();
        return stepIndex <= currentStep || completedSteps.has(stepIndex);
      },
      resetSteps: () => set({ currentStep: 0, completedSteps: new Set() }),
    }),
    {
      name: "compliance-form", // localStorage key
      partialize: (state) => ({
        formData: state.formData,
        completedSteps: Array.from(state.completedSteps),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.completedSteps = new Set(state.completedSteps); // Deserialize back to a Set
        }
      },
    }
  )
);
