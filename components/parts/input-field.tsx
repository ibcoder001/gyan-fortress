const InputField = ({
  label,
  error,
  emailError,
  register,
  inputName,
  inputId,
  inputType,
  inputPlaceholder,
  icon,
}: {
  label: string;
  error: string;
  emailError?: string;
  register: any;
  inputName: string;
  inputId: string;
  inputType: string;
  inputPlaceholder: string;
  icon: any;
}) => {
  return (
    <div className="relative form-group">
      <label htmlFor={inputId} className="label">
        {label} <span>*</span>
        <span className="text-base text-red-700">{error}</span>
      </label>
      <input
        type={inputType}
        className="py-4 text-formText text-dark placeholder:text-dark/50"
        id={inputId}
        placeholder={inputPlaceholder}
        required
        {...register(inputName)}
      />
      {inputType === "email" && (
        <span className="text-base text-red-700">{emailError}</span>
      )}
      <span className="absolute right-0 flex items-center pr-4 top-16 bottom-8">
        {icon}
      </span>
    </div>
  );
};

export default InputField;
