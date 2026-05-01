import { MoveButton } from "./MoveButton";
export const CarForm = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className='m-4'>
      <h2 className='text-xl font-bold mb-4 text-center'>Car Form</h2>
      <form>
        <label className='block mb-2'>Marka:</label>
        <input type='text' className='border p-2 w-full mb-4' />
        <label className='block mb-2'>Model:</label>
        <input type='text' className='border p-2 w-full mb-4' />
        <label className='block mb-2'>VIN:</label>
        <input type='text' className='border p-2 w-full mb-4' />
        <label className='block mb-2'>Email: optional</label>
        <input type='email' className='border p-2 w-full mb-4' />
      </form>
      <div className='flex justify-center'>
        <MoveButton text='Dalej' onClick={onClick} />
      </div>
    </div>
  );
};
