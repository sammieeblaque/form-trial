import ComplianceFormLayout from "../complainceFormLayout";
import CompanyDetails from "./companyDetails";
import DirectorsDetails from "./directorsDetails";

export const CompanyDirectors = () => {
  return (
    <ComplianceFormLayout>
      <CompanyDetails />
    </ComplianceFormLayout>
  );
};

export const DirectorsShareholder = () => {
  return (
    <ComplianceFormLayout>
      <DirectorsDetails />
    </ComplianceFormLayout>
  );
};
