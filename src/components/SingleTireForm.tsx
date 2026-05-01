export const SingleTireForm = ({ tireName }: { tireName: string }) => {
  return (
    <div>
      <h1>{tireName}</h1>
      <form>
        <label className='block mb-2'>Marka opon:</label>
        <input type='text' className='border p-2 w-full mb-4' />
        <label className='block mb-2'>Rozmia:</label>
        <input type='text' className='border p-2 w-full mb-4' />
        <label className='block mb-2'>Bieżnik głębokość:</label>
        <input type='text' className='border p-2 w-full mb-4' />
        <label className='block mb-2'>DOT:</label>
        <input type='text' className='border p-2 w-full mb-4' />
        <label className='block mb-2'>Ocena:</label>
        <input type='text' className='border p-2 w-full mb-4' />
        <label className='block mb-2'>Uwagi opcjonalnie:</label>
        <input type='text' className='border p-2 w-full mb-4' />
      </form>
    </div>
  );
};
