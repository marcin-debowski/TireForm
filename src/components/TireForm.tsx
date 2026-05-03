import { SingleTireForm } from "./SingleTireForm";
import { TIRE_POSITIONS } from "../types/report-form.types";
import type { TireFormProps } from "../types/report-form.types";

export const TireForm = ({ tiresData, onTireChange, errors }: TireFormProps) => {
  return (
    <div className='flex flex-col gap-2 w-full max-w-4xl mx-auto px-4'>
      {TIRE_POSITIONS.map((pos) => (
        <SingleTireForm
          key={pos.key}
          positionKey={pos.key}
          positionLabel={pos.label}
          tireData={tiresData[pos.key]}
          onTireChange={onTireChange}
          errors={errors?.[pos.key]}
        />
      ))}
    </div>
  );
};
