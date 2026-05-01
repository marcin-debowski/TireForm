import { CarForm } from "../components/CarForm";
import carIcon from "../assets/icons8-car-60.png";
import tireIcon from "../assets/icons8-tire-64.png";
import { TireForm } from "../components/TireForm";
import { useState } from "react";
import { FormPageButton } from "../components/FormPageButton";
export const FormPage = () => {
  const [selectedForm, setSelectedForm] = useState<"car" | "tire">("car");
  return (
    <div className='bg-white rounded shadow max-w-7xl mx-auto mt-8 min-h-[calc(100vh-4rem)] flex flex-col '>
      <h1 className='text-2xl font-bold mb-4 text-center'>Form Page</h1>
      <div className='flex justify-center w-full gap-8 my-2'>
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

      {selectedForm === "car" && <CarForm onClick={() => setSelectedForm("tire")} />}
      {selectedForm === "tire" && <TireForm onClick={() => setSelectedForm("car")} />}
    </div>
  );
};
