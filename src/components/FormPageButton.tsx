type FormPageButtonProps = {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export const FormPageButton = ({ icon, label, isActive, onClick }: FormPageButtonProps) => {
  return (
    <div className='flex flex-col items-center'>
      <button
        type='button'
        onClick={onClick}
        className={`text-white p-2 hover:bg-blue-700 transition-colors duration-300 rounded-full ${
          isActive ? "bg-blue-500" : "bg-blue-200"
        }`}
      >
        <img src={icon} alt={label} className='w-6 h-6' />
      </button>
      <label className={`mt-2 ${isActive ? "text-black" : "text-gray-700"}`}>{label}</label>
    </div>
  );
};
