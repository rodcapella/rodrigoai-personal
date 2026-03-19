interface FormFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormField = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: FormFieldProps) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 rounded-lg border bg-background ${
          error
            ? "border-red-500"
            : "border-border focus:border-primary focus:ring-2 focus:ring-primary/30"
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;