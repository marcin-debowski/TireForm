import type { FormPageButtonProps } from "../types/report-form.types";

export const FormPageButton = ({ icon, label, isActive, onClick }: FormPageButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      // Dodana stała szerokość (np. w-32), żeby zapobiec jakimkolwiek przesunięciom na boki
      className='flex flex-col items-center group focus:outline-none w-32'
    >
      {/* Kontener ikony (Kółko) - usunięto wszystkie klasy 'scale-' */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
          isActive
            ? "bg-blue-50 border-blue-500 shadow-md shadow-blue-500/20"
            : "bg-gray-100 border-transparent group-hover:bg-gray-200"
        }`}
      >
        <img
          src={icon}
          alt={label}
          className={`w-8 h-8 transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-50 group-hover:opacity-70"
          }`}
        />
      </div>

      {/* Etykieta pod ikoną - stała waga czcionki (font-medium), zmienia się TYLKO kolor */}
      <span
        className={`mt-3 text-sm font-medium transition-colors duration-300 ${
          isActive ? "text-blue-700" : "text-gray-500 group-hover:text-gray-700"
        }`}
      >
        {label}
      </span>
    </button>
  );
};
