export type SelectedForm = "car" | "tire";

export type CarFormData = {
  brand: string;
  model: string;
  vin: string;
  email: string;
};

export type TirePosition = "front_right" | "front_left" | "rear_right" | "rear_left";

export type TireFormData = {
  brand: string;
  size: string;
  tread_depth: string;
  dot_code: string;
  rating: string;
  notes: string;
};

export type ValidationIssue = {
  path: ReadonlyArray<PropertyKey>;
  message: string;
};

export type CarFieldErrors = Partial<Record<keyof CarFormData, string>>;
export type TireFieldErrors = Partial<Record<keyof TireFormData, string>>;
export type TiresFieldErrors = Partial<Record<TirePosition, TireFieldErrors>>;

export type TiresFormData = Record<TirePosition, TireFormData>;

export type CarFormProps = {
  onClick: () => void;
  carData: CarFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Partial<Record<keyof CarFormData, string>>;
};

export type TireFormProps = {
  tiresData: TiresFormData;
  onTireChange: (positionKey: TirePosition, fieldName: keyof TireFormData, value: string) => void;
  errors?: Partial<Record<TirePosition, Partial<Record<keyof TireFormData, string>>>>;
};

export type SingleTireFormProps = {
  positionKey: TirePosition;
  positionLabel: string;
  tireData: TireFormData;
  onTireChange: (positionKey: TirePosition, fieldName: keyof TireFormData, value: string) => void;
  errors?: Partial<Record<keyof TireFormData, string>>;
};

export type FormPageButtonProps = {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export type MoveButtonProps = {
  text: string;
  onClick: () => void;
};

export type FormInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  id?: string;
  warning?: React.ReactNode;
  error?: React.ReactNode;
};

export const TIRE_POSITIONS = [
  { key: "front_right", label: "Prawy przód" },
  { key: "front_left", label: "Lewy przód" },
  { key: "rear_right", label: "Prawy tył" },
  { key: "rear_left", label: "Lewy tył" },
] as const;

export const EMPTY_CAR: CarFormData = {
  brand: "",
  model: "",
  vin: "",
  email: "",
};

export const EMPTY_TIRE: TireFormData = {
  brand: "",
  size: "",
  tread_depth: "",
  dot_code: "",
  rating: "",
  notes: "",
};

export const EMPTY_TIRES: TiresFormData = {
  front_right: { ...EMPTY_TIRE },
  front_left: { ...EMPTY_TIRE },
  rear_right: { ...EMPTY_TIRE },
  rear_left: { ...EMPTY_TIRE },
};
