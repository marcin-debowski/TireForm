import { MoveButton } from "./MoveButton";

interface CarFormProps {
  onClick: () => void;
  carData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CarForm = ({ onClick, carData, onChange }: CarFormProps) => {
  return (
    <div className='m-4'>
      <h2 className='text-xl font-bold mb-4 text-center'>Car Form</h2>

      <label className='block mb-2'>Marka:</label>
      <input
        type='text'
        className='border p-2 w-full mb-4'
        value={carData.brand}
        onChange={onChange}
        name='brand'
      />
      <label className='block mb-2'>Model:</label>
      <input
        type='text'
        className='border p-2 w-full mb-4'
        value={carData.model}
        onChange={onChange}
        name='model'
      />
      <label className='block mb-2'>VIN:</label>
      <input
        type='text'
        className='border p-2 w-full mb-4'
        value={carData.vin}
        onChange={onChange}
        name='vin'
      />
      <label className='block mb-2'>Email: (opcjonalnie)</label>
      <input
        type='email'
        className='border p-2 w-full mb-4'
        value={carData.email}
        onChange={onChange}
        name='email'
      />

      <div className='flex justify-center'>
        <MoveButton text='Dalej' onClick={onClick} />
      </div>
    </div>
  );
};
