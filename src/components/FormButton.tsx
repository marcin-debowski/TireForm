interface FormButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export const FormButton = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}: FormButtonProps) => {
  const baseClasses =
    "px-8 py-2.5 rounded-xl font-medium transition-all duration-300 active:scale-95 flex items-center justify-center";
  const variants = {
    primary:
      "bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 disabled:bg-blue-400",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {text}
    </button>
  );
};
