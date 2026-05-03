import { useEffect, useRef } from "react";
import { CarForm } from "../components/CarForm";
import carIcon from "../assets/icons8-car-60.png";
import tireIcon from "../assets/icons8-tire-64.png";
import { TireForm } from "../components/TireForm";
import { FormPageButton } from "../components/FormPageButton";
import { useReportFormState } from "../hooks/useReportFormState";
import { useReportFormSubmit } from "../hooks/useReportFormSubmit";
import { FormButton } from "../components/FormButton";

export const FormPage = () => {
  const errorRef = useRef<HTMLDivElement>(null);
  const {
    selectedForm,
    setSelectedForm,
    carData,
    tiresData,
    handleCarChange,
    handleTireChange,
    resetForm,
  } = useReportFormState();

  const { isLoading, error, successMessage, carFieldErrors, tireFieldErrors, handleSubmit } =
    useReportFormSubmit({
      carData,
      tiresData,
      onSuccess: resetForm,
      onSelectForm: setSelectedForm,
    });

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [error]);

  return (
    <div className='bg-white rounded-2xl shadow-lg max-w-4xl mx-auto mt-6 min-h-[calc(100vh-4rem)] flex flex-col p-6'>
      <h1 className='text-2xl font-bold mb-6 text-center text-gray-800'>Kreator Raportu</h1>

      <div className='relative flex justify-center items-start w-full gap-24 mt-2 mb-4'>
        <div className='absolute top-8 left-1/2 -translate-x-1/2 w-32 bg-gray-200 -z-10'></div>

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

      {(error || successMessage) && (
        <div ref={errorRef} className='flex justify-center mb-6 px-4 mt-4 scroll-mt-4'>
          {error && (
            <div className='w-full max-w-2xl bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl font-medium text-center shadow-sm'>
              {error}
            </div>
          )}
          {successMessage && (
            <div className='w-full max-w-2xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl font-medium text-center shadow-sm'>
              {successMessage}
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className='flex-1 flex flex-col'>
        {selectedForm === "car" && (
          <>
            <CarForm
              onClick={() => setSelectedForm("tire")}
              carData={carData}
              onChange={handleCarChange}
              errors={carFieldErrors}
            />
            <div className='flex justify-center pt-8 pb-4 w-full px-4'>
              <FormButton text='Dalej' onClick={() => setSelectedForm("tire")} />
            </div>
          </>
        )}

        {selectedForm === "tire" && (
          <>
            <TireForm
              tiresData={tiresData}
              onTireChange={handleTireChange}
              errors={tireFieldErrors}
            />

            <div className='flex justify-between items-center pt-8 pb-4 w-full px-4'>
              <FormButton text='Wróć' onClick={() => setSelectedForm("car")} variant='secondary' />
              <FormButton
                text={isLoading ? "Wysyłanie..." : "Wyślij raport"}
                type='submit'
                variant='primary'
                disabled={isLoading}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};
