import { useState } from "react";

interface SingleTireFormProps {
  positionKey: string;
  positionLabel: string;
  tireData: any;
  onTireChange: (positionKey: string, fieldName: string, value: string) => void;
}

export const SingleTireForm = ({
  positionKey,
  positionLabel,
  tireData,
  onTireChange,
}: SingleTireFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTireChange(positionKey, e.target.name, e.target.value);
  };

  const safeNumberString = tireData.tread_depth ? tireData.tread_depth.replace(",", ".") : "";
  const numericTread = parseFloat(safeNumberString);
  const isTreadTooLow =
    !isNaN(numericTread) && numericTread < 1.6 && tireData.tread_depth.trim() !== "";

  const inputClass =
    "border p-2 w-full mb-4 outline-none transition-colors " +
    "user-invalid:border-red-500 user-invalid:text-red-600 focus:user-invalid:border-red-500 focus:user-invalid:ring-1 focus:user-invalid:ring-red-500";
  return (
    <div>
      <h3 className='text-lg font-bold mb-2' onClick={() => setIsOpen(!isOpen)}>
        {positionLabel} {isOpen ? "▲" : "▼"}
      </h3>
      <div className={`border p-4 mb-4 ${isOpen ? "block" : "hidden"}`}>
        <label className='block mb-2'>Marka opon:</label>
        <input
          type='text'
          className={inputClass}
          value={tireData.brand}
          onChange={handleChange}
          minLength={2}
          required
          placeholder='Podaj markę opony'
          name='brand'
        />
        <label className='block mb-2'>Rozmiar:</label>
        <input
          type='text'
          className={inputClass}
          value={tireData.size}
          onChange={handleChange}
          required
          placeholder='Podaj rozmiar opony'
          name='size'
        />
        <label className='block mb-2'>
          Bieżnik głębokość (mm):{" "}
          {isTreadTooLow && (
            <span className='text-orange-600 text-sm mb-4 font-medium'>
              ⚠️ Ostrzeżenie: Bieżnik poniżej minimalnej wartości 1.6 mm.
            </span>
          )}
        </label>
        <input
          type='text'
          className={inputClass}
          value={tireData.tread_depth}
          onChange={handleChange}
          required
          placeholder='Podaj głębokość bieżnika w mm'
          name='tread_depth'
        />

        <label className='block mb-2'>DOT:</label>
        <input
          type='text'
          className={inputClass}
          value={tireData.dot_code}
          onChange={handleChange}
          required
          pattern='\d{4}'
          placeholder='Podaj 4 cyfry, np. 1223'
          name='dot_code'
        />
        <label className='block mb-2'>Ocena:</label>
        <input
          type='text'
          className={inputClass}
          value={tireData.rating}
          onChange={handleChange}
          required
          placeholder='Podaj ocenę'
          name='rating'
        />
        <label className='block mb-2'>Uwagi (opcjonalne):</label>
        <input
          type='text'
          className={inputClass}
          value={tireData.notes}
          onChange={handleChange}
          placeholder='Dodatkowe uwagi'
          name='notes'
        />
      </div>
    </div>
  );
};
