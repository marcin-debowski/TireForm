import { useState } from "react";
import type {
  CarFormData,
  SelectedForm,
  TireFormData,
  TiresFormData,
  TirePosition,
} from "../types/report-form.types";
import { EMPTY_CAR, EMPTY_TIRES } from "../types/report-form.types";

export const useReportFormState = () => {
  const [selectedForm, setSelectedForm] = useState<SelectedForm>("car");
  const [carData, setCarData] = useState<CarFormData>(EMPTY_CAR);
  const [tiresData, setTiresData] = useState<TiresFormData>(EMPTY_TIRES);

  const handleCarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTireChange = (
    tireName: TirePosition,
    fieldName: keyof TireFormData,
    value: string,
  ) => {
    setTiresData((prev) => ({
      ...prev,
      [tireName]: {
        ...prev[tireName],
        [fieldName]: value,
      },
    }));
  };

  const resetForm = () => {
    setCarData(EMPTY_CAR);
    setTiresData(EMPTY_TIRES);
    setSelectedForm("car");
  };

  return {
    selectedForm,
    setSelectedForm,
    carData,
    tiresData,
    handleCarChange,
    handleTireChange,
    resetForm,
  };
};
