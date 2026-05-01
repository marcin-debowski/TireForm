import { CarForm } from "../components/CarForm";
import carIcon from "../assets/icons8-car-60.png";
import tireIcon from "../assets/icons8-tire-64.png";
import { TireForm } from "../components/TireForm";
import { useState } from "react";
import { FormPageButton } from "../components/FormPageButton";
import { supabase } from "../utils/supbase";

const emptyTire = { brand: "", size: "", tread_depth: "", dot_code: "", rating: "", notes: "" };

export const FormPage = () => {
  const [selectedForm, setSelectedForm] = useState<"car" | "tire">("car");
  const [carData, setCarData] = useState({ brand: "", model: "", vin: "", email: "" });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      alert("Sukces!");
    } catch (error: any) {
      alert("Błąd: " + error.message);
    }
  };

  return (
    <div className='bg-white rounded shadow max-w-7xl mx-auto mt-2 min-h-[calc(100vh-4rem)] flex flex-col '>
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
      <form onSubmit={handleSubmit}>
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
                Wyślij raport
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
