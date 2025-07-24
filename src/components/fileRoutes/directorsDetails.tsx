import JsonformBuilder from "../../form-builder/Form";
import { company_directors } from "../../constants";

const DirectorsDetails = () => {
  return (
    <>
      <h1>Directors Details</h1>
      <p>Here you can manage the details of your directors.</p>

      <JsonformBuilder data={company_directors} />
    </>
  );
};

export default DirectorsDetails;
