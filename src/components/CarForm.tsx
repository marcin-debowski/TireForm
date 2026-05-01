import { MoveButton } from "./MoveButton";

interface CarFormProps {
  onClick: () => void;
  carData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CarForm = ({ onClick, carData, onChange }: CarFormProps) => {
  const inputClass =
    "border p-2 w-full mb-4 outline-none transition-colors rounded-xl" +
    "invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-1 focus:invalid:ring-red-500";
  return (
    <div className='mx-4'>
      <h2 className='text-xl font-bold mb-4 text-center'>Car Form</h2>

      <label className='block mb-2'>Marka:</label>
      <input
        type='text'
        className={inputClass}
        value={carData.brand}
        onChange={onChange}
        required
        minLength={2}
        placeholder='Podaj markę samochodu'
        name='brand'
      />
      <label className='block mb-2'>Model:</label>
      <input
        type='text'
        className={inputClass}
        value={carData.model}
        onChange={onChange}
        required
        minLength={1}
        placeholder='Podaj model samochodu'
        name='model'
      />
      <label className='block mb-2'>VIN:</label>
      <input
        type='text'
        className={inputClass}
        value={carData.vin}
        onChange={onChange}
        required
        minLength={17}
        maxLength={17}
        name='vin'
        placeholder='Podaj VIN'
      />
      <label className='block mb-2'>Email: (opcjonalne)</label>
      <input
        type='email'
        className={inputClass}
        value={carData.email}
        onChange={onChange}
        name='email'
        placeholder='Podaj email'
      />

      <div className='flex justify-center'>
        <MoveButton text='Dalej' onClick={onClick} />
      </div>
    </div>
  );
};
