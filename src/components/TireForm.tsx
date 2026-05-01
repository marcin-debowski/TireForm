import { MoveButton } from "./MoveButton";
import { SingleTireForm } from "./SingleTireForm";
interface TireFormProps {
  onClick: () => void;
  tiresData: any;
  onTireChange: (positionKey: string, fieldName: string, value: string) => void;
}
export const TireForm = ({ onClick, tiresData, onTireChange }: TireFormProps) => {
  const tirePositions = [
    { key: "front_right", label: "Prawy przód" },
    { key: "front_left", label: "Lewy przód" },
    { key: "rear_right", label: "Prawy tył" },
    { key: "rear_left", label: "Lewy tył" },
  ];
  return (
    <div className='mx-4'>
      <h2 className='text-xl font-bold mb-4 text-center'>TireForm</h2>
      {tirePositions.map((pos) => (
        <SingleTireForm
          key={pos.key}
          positionKey={pos.key}
          positionLabel={pos.label}
          tireData={tiresData[pos.key]}
          onTireChange={onTireChange}
        />
      ))}
      <div className='flex justify-center'>
        <MoveButton text='Cofinj' onClick={onClick} />
      </div>
    </div>
  );
};
