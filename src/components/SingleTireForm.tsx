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

  return (
    <div>
      <h3 className='text-lg font-bold mb-2' onClick={() => setIsOpen(!isOpen)}>
        {positionLabel} {isOpen ? "▲" : "▼"}
      </h3>
      <div className={`border p-4 mb-4 ${isOpen ? "block" : "hidden"}`}>
        <label className='block mb-2'>Marka opon:</label>
        <input
          type='text'
          className='border p-2 w-full mb-4'
          value={tireData.brand}
          onChange={handleChange}
          name='brand'
        />
        <label className='block mb-2'>Rozmiar:</label>
        <input
          type='text'
          className='border p-2 w-full mb-4'
          value={tireData.size}
          onChange={handleChange}
          name='size'
        />
        <label className='block mb-2'>Bieżnik głębokość:</label>
        <input
          type='text'
          className='border p-2 w-full mb-4'
          value={tireData.tread_depth}
          onChange={handleChange}
          name='tread_depth'
        />
        <label className='block mb-2'>DOT:</label>
        <input
          type='text'
          className='border p-2 w-full mb-4'
          value={tireData.dot_code}
          onChange={handleChange}
          name='dot_code'
        />
        <label className='block mb-2'>Ocena:</label>
        <input
          type='text'
          className='border p-2 w-full mb-4'
          value={tireData.rating}
          onChange={handleChange}
          name='rating'
        />
        <label className='block mb-2'>Uwagi opcjonalnie:</label>
        <input
          type='text'
          className='border p-2 w-full mb-4'
          value={tireData.notes}
          onChange={handleChange}
          name='notes'
        />
      </div>
    </div>
  );
};
