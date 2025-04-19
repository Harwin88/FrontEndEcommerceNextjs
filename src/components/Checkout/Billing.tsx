import React, { useEffect, useRef, useState  } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import {
  updateField,
  toggleEdit,
  setFormData,
} from '@/redux/features/billingFormSlice';

const Billing = ({ dataForm, onDataFormChange, setShippingMethodShow }) => {
  const dispatch = useDispatch();
  const initialized = useRef(false);
  const [errors, setErrors] = React.useState<string[]>([]);



  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
      const stored = localStorage.getItem('billingData');

      if (stored) {
        try {
          const parsedData = JSON.parse(stored);
          dispatch(setFormData(parsedData));
          dispatch(toggleEdit());

          if (onDataFormChange) {
            Object.entries(parsedData).forEach(([key, value]) => {
              onDataFormChange(key, value);
            });
          }
        } catch (err) {
          console.error('Error al parsear billingData:', err);
        }
      }

      initialized.current = true;
    }
  }, [dispatch, onDataFormChange]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    onDataFormChange(name, newValue);
  };

  const { formData, isEditing } = useAppSelector((state) => state.billingForm);

  const requiredFields = [
    'firstName',
    'lastName',
    'documentType',
    'documentNumber',
    'address',
    'town',
    'phone',
    'email',
  ];
  
  const missingFields = requiredFields.filter((field) => !dataForm[field]);
  const hasErrors = missingFields.length > 0;

  const handleSave = () => {
   

    if (hasErrors) {
    setErrors(missingFields);
    return;
  }

    setErrors([]); // limpiamos si todo está bien
    dispatch(setFormData(dataForm));
    localStorage.setItem('billingData', JSON.stringify(dataForm));
    dispatch(toggleEdit());
    setShippingMethodShow(true);
  };

  const handleEdit = () => {
    setShippingMethodShow(false);
    dispatch(toggleEdit());
  };

 

  const fieldLabels: Record<string, string> = {
    firstName: 'Nombre',
    lastName: 'Apellido',
    countryRegion: 'Región / País',
    address: 'Dirección',
    town: 'Ciudad',
    phone: 'Teléfono',
    email: 'Correo electrónico',
    documentType: 'Tipo de documento',
    documentNumber: 'Número de documento',
    companyName: 'Nombre de la empresa',
    addressTwo: 'Dirección adicional',
  };

 

  if (!isEditing) {
    return (
      <div className="bg-white shadow-md p-6 rounded-lg space-y-6">
        {/* Alert */}
        <div
          className="flex items-start gap-3 p-4 text-greenScale-7 border border-greenScale-3 rounded-xl bg-greenScale-1 dark:bg-gray-800 dark:text-greenScale-4 dark:border-greenScale-6"
          role="alert"
        >
          <svg
            className="w-5 h-5 mt-1 text-greenScale-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="text-sm leading-snug">
            <p className="font-semibold">¡Información guardada!</p>
            <p className="mt-0.5">
              Gracias por proporcionar la información. Ahora escoge un método de
              envío para activar las opciones de pago, o haz clic en el botón de
              editar para realizar correcciones.
            </p>
          </div>
        </div>

        {/* Data display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
          {Object.entries(formData)
            .filter(([key, value]) => value && fieldLabels[key]) // Filtramos nulos, falsos o no traducidos
            .map(([key, value]) => (
              <div key={key}>
                <p className="text-gray-500 text-sm">{fieldLabels[key]}</p>
                <p className="text-gray-900 font-medium">{String(value)}</p>
              </div>
            ))}
        </div>

        {/* Edit button */}
        <div className="text-end">
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-2 font-medium text-white bg-blue py-2.5 px-5 rounded-md transition hover:bg-blue-dark"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14l4-4h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
            </svg>
            Editar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-9">
      <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5">
        Detalles de facturación
      </h2>

      <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
          <div className="w-full">
            <label htmlFor="firstName" className="block mb-2.5">
              Nombre Completo <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={dataForm.firstName || ''}
              onChange={handleChange}
              id="firstName"
              placeholder="su nombre"
              required
              className={`rounded-md border ${
                hasErrors && missingFields.includes('firstName') ? 'border-red' : 'bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20'
              } bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20`}
            
              />
              {hasErrors && errors.includes('firstName') && (
                <p className="text-sm text-red mt-1">Este campo es obligatorio</p>
              )}
          </div>

          <div className="w-full">
            <label htmlFor="lastName" className="block mb-2.5">
              Apellidos <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={dataForm.lastName || ''}
              onChange={handleChange}
              placeholder="su apellido"
              required
              className={`rounded-md border ${
                hasErrors && missingFields.includes('lastName') ? 'border-red' : 'bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20'
              } bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20`}
            
              />
               {hasErrors && errors.includes('lastName') && (
                <p className="text-sm text-red mt-1">Este campo es obligatorio</p>
              )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
          <div className="w-full">
            <label htmlFor="documentType" className="block mb-2.5">
              Tipo de Documento <span className="text-red">*</span>
            </label>
            <select
              name="documentType"
              id="documentType"
              value={dataForm.documentType || ''}
              onChange={handleChange}
              className={`rounded-md border ${
                hasErrors && missingFields.includes('documentType') ? 'border-red' : 'border-gray-3'
              } bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20`}
             >
              <option value="">Selecciona una opción</option>
              <option value="cc">Cédula de Ciudadanía</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="nit">NIT</option>
            </select>
            {hasErrors && errors.includes('documentType') && (
              <p className="text-sm text-red mt-1">Este campo es obligatorio</p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="documentNumber" className="block mb-2.5">
              Número de Documento <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="documentNumber"
              id="documentNumber"
              value={dataForm.documentNumber || ''}
              onChange={handleChange}
              placeholder="123456789"
              className={`rounded-md border ${
                hasErrors && missingFields.includes('documentNumber') ? 'border-red' : 'bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20'
              } bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20`}
            
              />
               {hasErrors && errors.includes('documentNumber') && (
                <p className="text-sm text-red mt-1">Este campo es obligatorio</p>
              )}
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="companyName" className="block mb-2.5">
            Nombre de la empresa (opcional)
          </label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            value={dataForm.companyName || ''}
            onChange={handleChange}
            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="address" className="block mb-2.5">
            Dirección <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={dataForm.address || ''}
            onChange={handleChange}
            placeholder="Número de casa y nombre de la calle"
            className={`rounded-md border ${
              hasErrors && missingFields.includes('address') ? 'border-red' : 'bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20'
            } bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20`}
          
            />
             {hasErrors && errors.includes('address') && (
              <p className="text-sm text-red mt-1">Este campo es obligatorio</p>
            )}
          <div className="mt-5">
            <input
              type="text"
              name="addressTwo"
              value={dataForm.addressTwo || ''}
              onChange={handleChange}
              id="addressTwo"
              placeholder="Apartamento, unidad, etc. (opcional)"
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="town" className="block mb-2.5">
            Ciudad <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="town"
            value={dataForm.town || ''}
            onChange={handleChange}
            id="town"
            className={`rounded-md border ${
              hasErrors && missingFields.includes('town') ? 'border-red' : 'bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20'
            } bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20`}
          
            />
             {hasErrors && errors.includes('town') && (
              <p className="text-sm text-red mt-1">Este campo es obligatorio</p>
            )}
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2.5">
            Teléfono <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={dataForm.phone || ''}
            onChange={handleChange}
            id="phone"
            className={`rounded-md border ${
              hasErrors && missingFields.includes('phone') ? 'border-red' : 'bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20'
            } bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20`}
          
            />
             {hasErrors && errors.includes('phone') && (
              <p className="text-sm text-red mt-1">Este campo es obligatorio</p>
            )}
        </div>

        <div className="mb-5.5">
          <label htmlFor="email" className="block mb-2.5">
            Correo electrónico <span className="text-red">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={dataForm.email || ''}
            onChange={handleChange}
            id="email"
            className={`rounded-md border ${
              hasErrors && missingFields.includes('email') ? 'border-red' : 'bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20'
            } bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20`}
          
            />
             {hasErrors && errors.includes('email') && (
              <p className="text-sm text-red mt-1">Este campo es obligatorio</p>
            )}
        </div>

        <div className="flex items-center padding-5 mb-10">
          <input
            type="checkbox"
            id="createAccount"
            name="createAccount"
            checked={dataForm.createAccount}
            onChange={(e) =>
              onDataFormChange('createAccount', e.target.checked)
            }
            className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="createAccount"
            className="ml-2 text-dark cursor-pointer"
          >
            Crear una cuenta
          </label>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default Billing;
