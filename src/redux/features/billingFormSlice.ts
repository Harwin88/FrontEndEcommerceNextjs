// store/billingFormSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BillingFormData {
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  companyName?: string;
  address: string;
  addressTwo?: string;
  town: string;
  country?: string;
  phone: string;
  email: string;
  createAccount: boolean;
}

interface BillingState {
  formData: BillingFormData;
  isEditing: boolean;
}

const getInitialFormData = (): BillingFormData => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('billingData');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (err) {
        console.error('Error parsing billing data from localStorage:', err);
      }
    }
  }

  return {
    firstName: '',
    lastName: '',
    documentType: '',
    documentNumber: '',
    companyName: '',
    address: '',
    addressTwo: '',
    town: '',
    country: '',
    phone: '',
    email: '',
    createAccount: false,
  };
};

const initialState: BillingState = {
  formData: {
    firstName: '',
    lastName: '',
    documentType: '',
    documentNumber: '',
    companyName: '',
    address: '',
    addressTwo: '',
    town: '',
    country: '',
    phone: '',
    email: '',
    createAccount: false,
  },
  isEditing: true, // Default: en modo edición
};

const billingFormSlice = createSlice({
  name: 'billingForm',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ name: string; value: any }>) => {
      state.formData[action.payload.name] = action.payload.value;
    },
    setFormData: (state, action: PayloadAction<BillingFormData>) => {
      state.formData = action.payload;
    },
    toggleEdit: (state) => {
      state.isEditing = !state.isEditing;
    },
  },
});

export const { updateField, setFormData, toggleEdit } = billingFormSlice.actions;
export default billingFormSlice.reducer;
