import { useState } from "react";
import type { SingleTireFormProps, TireFormData } from "../types/report-form.types";
import { FormInput } from "./FormInput";

export const SingleTireForm = ({
  positionKey,
  positionLabel,
  tireData,
  onTireChange,
  errors,
}: SingleTireFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTireChange(positionKey, e.target.name as keyof TireFormData, e.target.value);
  };

  const safeNumberString = tireData.tread_depth ? tireData.tread_depth.replace(",", ".") : "";
  const numericTread = parseFloat(safeNumberString);
  const isTreadTooLow =
    !isNaN(numericTread) && numericTread < 1.6 && tireData.tread_depth.trim() !== "";

  return (
    <div className='mb-4 shadow-sm rounded-xl'>
      {/* Przycisk nagłówka */}
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center p-4 text-left font-semibold text-lg transition-all border ${
          isOpen
            ? "bg-blue-50/50 border-blue-200 text-blue-800 rounded-t-xl"
            : "bg-gray-50 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-100"
        }`}
      >
        <span>{positionLabel}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-500" : "text-gray-400"
          }`}
        >
          ▼
        </span>
      </button>

      {/* --- ANIMOWANY KONTENER --- */}
      {/* Używamy CSS Grid do płynnej zmiany wysokości od 0 do "auto" */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        {/* Wewnętrzny kontener musi ukrywać nadmiar treści (overflow-hidden), gdy jest zamykany */}
        <div className='overflow-hidden'>
          {/* Właściwe ciało formularza z Twoimi ramkami i paddingiem */}
          <div className='border-x border-b border-gray-200 rounded-b-xl p-5 bg-white'>
            <FormInput
              label='Marka opon:'
              name='brand'
              id={`${positionKey}-brand`}
              value={tireData.brand}
              onChange={handleChange}
              error={errors?.brand}
              minLength={2}
              required
              placeholder='Podaj markę opony'
            />
            <FormInput
              label='Rozmiar:'
              name='size'
              id={`${positionKey}-size`}
              value={tireData.size}
              onChange={handleChange}
              error={errors?.size}
              required
              placeholder='Podaj rozmiar opony'
            />
            <FormInput
              label='Bieżnik głębokość (mm):'
              name='tread_depth'
              id={`${positionKey}-tread_depth`}
              value={tireData.tread_depth}
              onChange={handleChange}
              error={errors?.tread_depth}
              required
              pattern='^\d+$'
              placeholder='Podaj głębokość bieżnika w mm'
              warning={
                isTreadTooLow && "⚠️ Ostrzeżenie: Bieżnik poniżej minimalnej wartości 1.6 mm."
              }
            />
            <FormInput
              label='DOT:'
              name='dot_code'
              id={`${positionKey}-dot_code`}
              value={tireData.dot_code}
              onChange={handleChange}
              error={errors?.dot_code}
              required
              pattern='\d{4}'
              placeholder='Podaj 4 cyfry, np. 1223'
            />
            <FormInput
              label='Ocena:'
              name='rating'
              id={`${positionKey}-rating`}
              value={tireData.rating}
              onChange={handleChange}
              error={errors?.rating}
              required
              placeholder='Podaj ocenę'
            />
            <FormInput
              label='Uwagi (opcjonalne):'
              name='notes'
              id={`${positionKey}-notes`}
              value={tireData.notes}
              onChange={handleChange}
              error={errors?.notes}
              placeholder='Dodatkowe uwagi'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
