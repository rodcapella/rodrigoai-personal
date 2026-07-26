interface FormFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormField = ({
  name,
  type = "text",
  placeholder,
  disabled = false,
  value,
  onChange,
  error,
}: FormFieldProps) => {
  const inputId = `contact-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label htmlFor={inputId} className="sr-only">
        {placeholder ?? name}
      </label>
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full p-3 rounded-lg border bg-background ${
          error
            ? "border-red-500"
            : "border-border focus:border-primary focus:ring-2 focus:ring-primary/30"
        }`}
      />
      {error && (
        <p id={errorId} role="alert" className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
