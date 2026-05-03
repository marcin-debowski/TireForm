import type { CarFormProps } from "../types/report-form.types";
import { FormInput } from "./FormInput.tsx";

export const CarForm = ({ carData, onChange, errors }: CarFormProps) => {
  return (
    <div className='mx-4'>
      <FormInput
        label='Marka:'
        name='brand'
        value={carData.brand}
        onChange={onChange}
        error={errors?.brand}
        required
        minLength={2}
        placeholder='Podaj markę samochodu'
      />
      <FormInput
        label='Model:'
        name='model'
        value={carData.model}
        onChange={onChange}
        error={errors?.model}
        required
        minLength={1}
        placeholder='Podaj model samochodu'
      />
      <FormInput
        label='VIN:'
        name='vin'
        value={carData.vin}
        onChange={onChange}
        error={errors?.vin}
        required
        minLength={17}
        maxLength={17}
        placeholder='Podaj VIN'
      />
      <FormInput
        label='Email: (opcjonalne)'
        name='email'
        type='email'
        autoComplete='email'
        value={carData.email}
        onChange={onChange}
        error={errors?.email}
        placeholder='Podaj email'
      />
    </div>
  );
};
