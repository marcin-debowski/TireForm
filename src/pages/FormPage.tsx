import { CarForm } from "../components/CarForm";
import carIcon from "../assets/icons8-car-60.png";
import tireIcon from "../assets/icons8-tire-64.png";
import { TireForm } from "../components/TireForm";
import { useState } from "react";
import { FormPageButton } from "../components/FormPageButton";
import { supabase } from "../utils/supbase";
import { z } from "zod";

const carSchema = z.object({
  brand: z.string().min(2, "Marka musi mieć co najmniej 2 znaki"),
  model: z.string().min(1, "Model jest wymagany"),
  vin: z.string().length(17, "Numer VIN musi składać się z dokładnie 17 znaków"),
  email: z.email("Niepoprawny format email").or(z.literal("")),
});
const tireSchema = z.object({
  brand: z.string().min(2, "Marka opony jest wymagana"),
  size: z.string().min(3, "Podaj rozmiar opony (np. 205/55 R16)"),
  tread_depth: z.string().min(1, "Głębokość bieżnika jest wymagana"),
  dot_code: z
    .string()
    .regex(/^\d{4}$/, "DOT musi składać się z 4 cyfr (np. 1223)")
    .or(z.literal("")),
  rating: z.string().min(1, "Ocena jest wymagana"),
  notes: z.string().optional(),
});
const tiresSchema = z.object({
  front_right: tireSchema,
  front_left: tireSchema,
  rear_right: tireSchema,
  rear_left: tireSchema,
});

const emptyTire = { brand: "", size: "", tread_depth: "", dot_code: "", rating: "", notes: "" };

export const FormPage = () => {
  const [selectedForm, setSelectedForm] = useState<"car" | "tire">("car");
  const [carData, setCarData] = useState({ brand: "", model: "", vin: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [tiresData, setTiresData] = useState({
    front_right: { ...emptyTire },
    front_left: { ...emptyTire },
    rear_right: { ...emptyTire },
    rear_left: { ...emptyTire },
  });

  const handleCarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTireChange = (tireName: string, fieldName: string, value: string) => {
    setTiresData((prev) => ({
      ...prev,
      [tireName]: {
        ...prev[tireName as keyof typeof prev],
        [fieldName]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const carValidation = carSchema.safeParse(carData);
    if (!carValidation.success) {
      setError(`Błąd (Samochód): ${carValidation.error.issues[0].message}`);
      setSelectedForm("car");
      setIsLoading(false);
      return;
    }
    const tiresValidation = tiresSchema.safeParse(tiresData);
    if (!tiresValidation.success) {
      const failedTirePosition = String(tiresValidation.error.issues[0].path[0]);
      const errorMessage = tiresValidation.error.issues[0].message;

      setError(`Błąd (Opony - ${failedTirePosition}): ${errorMessage}`);
      setSelectedForm("tire");
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
        position: position,
        ...tireDetails,
      }));

      const { error: tiresError } = await supabase.from("tires").insert(tiresToInsert);
      if (tiresError) throw tiresError;

      setIsLoading(false);
      setSuccessMessage("Sukces! Dane zostały zapisane.");
      setError(null);
      setCarData({ brand: "", model: "", vin: "", email: "" });
      setTiresData({
        front_right: { ...emptyTire },
        front_left: { ...emptyTire },
        rear_right: { ...emptyTire },
        rear_left: { ...emptyTire },
      });
      setSelectedForm("car");
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className='bg-white rounded shadow max-w-7xl mx-auto mt-2 min-h-[calc(100vh-3rem)] flex flex-col '>
      <h1 className='text-2xl font-bold mb-4 text-center'>Form Page</h1>

      <div className='flex justify-center w-full gap-8 mt-2'>
        <FormPageButton
          icon={carIcon}
          label='Dane samochodu'
          isActive={selectedForm === "car"}
          onClick={() => setSelectedForm("car")}
        />
        <FormPageButton
          icon={tireIcon}
          label='Dane opon'
          isActive={selectedForm === "tire"}
          onClick={() => setSelectedForm("tire")}
        />
      </div>
      <div className='flex justify-center mt-2 mx-4'>
        {error && <span className='text-red-500'>{error}</span>}
        {successMessage && <span className='text-green-500'> {successMessage}</span>}
      </div>
      <form onSubmit={handleSubmit} noValidate>
        {selectedForm === "car" && (
          <CarForm
            onClick={() => setSelectedForm("tire")}
            carData={carData}
            onChange={handleCarChange}
          />
        )}
        {selectedForm === "tire" && (
          <>
            <TireForm
              onClick={() => setSelectedForm("car")}
              tiresData={tiresData}
              onTireChange={handleTireChange}
            />{" "}
            <div className='flex justify-center my-4'>
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded self-center mt-auto mb-4 hover:bg-blue-700 transition-colors duration-300'
              >
                {isLoading ? "Wysyłanie..." : "Wyślij raport"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
