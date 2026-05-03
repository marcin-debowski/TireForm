import { useState } from "react";
import { supabase } from "../utils/supabase";
import { carSchema } from "../schemas/car.schema";
import { tiresSchema } from "../schemas/tire.schema";
import { TIRE_POSITIONS } from "../types/report-form.types";
import type {
  CarFormData,
  CarFieldErrors,
  ValidationIssue,
  TiresFormData,
  SelectedForm,
  TirePosition,
  TireFormData,
  TiresFieldErrors,
} from "../types/report-form.types";

const tirePositionLabels = Object.fromEntries(
  TIRE_POSITIONS.map(({ key, label }) => [key, label]),
) as Record<TirePosition, string>;

interface UseReportFormSubmitProps {
  carData: CarFormData;
  tiresData: TiresFormData;
  onSuccess: () => void;
  onSelectForm: (form: SelectedForm) => void;
}

const buildCarFieldErrors = (issues: ValidationIssue[]): CarFieldErrors => {
  return issues.reduce<CarFieldErrors>((acc, issue) => {
    const fieldName = issue.path[0];

    if (typeof fieldName === "string") {
      acc[fieldName as keyof CarFormData] = issue.message;
    }

    return acc;
  }, {});
};

const buildTireFieldErrors = (issues: ValidationIssue[]): TiresFieldErrors => {
  return issues.reduce<TiresFieldErrors>((acc, issue) => {
    const [positionKey, fieldName] = issue.path;

    if (typeof positionKey === "string" && typeof fieldName === "string") {
      const typedPosition = positionKey as TirePosition;
      const typedField = fieldName as keyof TireFormData;

      acc[typedPosition] = {
        ...(acc[typedPosition] ?? {}),
        [typedField]: issue.message,
      };
    }

    return acc;
  }, {});
};

export const useReportFormSubmit = ({
  carData,
  tiresData,
  onSuccess,
  onSelectForm,
}: UseReportFormSubmitProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [carFieldErrors, setCarFieldErrors] = useState<CarFieldErrors>({});
  const [tireFieldErrors, setTireFieldErrors] = useState<TiresFieldErrors>({});

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    setCarFieldErrors({});
    setTireFieldErrors({});

    const carValidation = carSchema.safeParse(carData);
    if (!carValidation.success) {
      setCarFieldErrors(buildCarFieldErrors(carValidation.error.issues));
      setError(`Błąd (Samochód): ${carValidation.error.issues[0].message}`);
      onSelectForm("car");
      setIsLoading(false);
      return;
    }

    const tiresValidation = tiresSchema.safeParse(tiresData);
    if (!tiresValidation.success) {
      setTireFieldErrors(buildTireFieldErrors(tiresValidation.error.issues));

      const failedTirePositionKey = String(tiresValidation.error.issues[0].path[0]);
      const failedTirePosition =
        tirePositionLabels[failedTirePositionKey as TirePosition] ?? "Nieznana pozycja";
      const errorMessage = tiresValidation.error.issues[0].message;

      setError(`Błąd (Opony - ${failedTirePosition}): ${errorMessage}`);
      onSelectForm("tire");
      setIsLoading(false);
      return;
    }

    try {
      const { data: insertedCar, error: carError } = await supabase
        .from("cars")
        .insert([carData])
        .select()
        .single();

      if (carError) throw carError;

      const tiresToInsert = Object.entries(tiresData).map(([position, tireDetails]) => ({
        car_id: insertedCar.id,
        position,
        ...tireDetails,
      }));

      const { error: tiresError } = await supabase.from("tires").insert(tiresToInsert);
      if (tiresError) throw tiresError;

      setSuccessMessage("Sukces! Dane zostały zapisane.");
      setError(null);
      setCarFieldErrors({});
      setTireFieldErrors({});
      setIsLoading(false);
      onSuccess();
    } catch (error: unknown) {
      setIsLoading(false);
      setError(error instanceof Error ? error.message : "Wystąpił nieznany błąd");
      setSuccessMessage(null);
    }
  };

  return {
    isLoading,
    error,
    successMessage,
    carFieldErrors,
    tireFieldErrors,
    handleSubmit,
  };
};
