import { Fragment } from "react";
import Loader from "./loader";

const SubmitButton = ({
  isSubmitting,
  cta,
}: {
  isSubmitting: boolean;
  cta: string;
}) => {
  return (
    <Fragment>
      {isSubmitting ? (
        <div className="w-full form-group-button">
          <button
            type="button"
            className="flex items-center w-full max-w-full text-center btn-medium bg-dark/80 text-light"
          >
            <Loader />
            <span className="w-full">Please wait...</span>
          </button>
        </div>
      ) : (
        <div className="w-full form-group-button">
          <button
            type="submit"
            className="flex items-center w-full max-w-full text-center btn-medium gradient-highlight"
          >
            <span className="w-full">{cta}</span>
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default SubmitButton;
