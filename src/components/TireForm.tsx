import { MoveButton } from "./MoveButton";
import { SingleTireForm } from "./SingleTireForm";

export const TireForm = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className='mx-4'>
      <h2 className='text-xl font-bold mb-4 text-center'>TireForm</h2>
      <SingleTireForm tireName='Prawy przód' />
      <SingleTireForm tireName='Lewy przód' />
      <SingleTireForm tireName='Prawy tył' />
      <SingleTireForm tireName='Lewy tył' />
      <div className='flex justify-center'>
        <MoveButton text='Cofinj' onClick={onClick} />
      </div>
    </div>
  );
};
