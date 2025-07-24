import JsonformBuilder from "../../form-builder/Form";
import { company_details } from "../../constants";

const CompanyDetails = () => {
  return (
    <>
      <h1>Company Details</h1>
      <p>Here you can manage the details of your company.</p>

      <JsonformBuilder data={company_details} />
    </>
  );
};

export default CompanyDetails;
