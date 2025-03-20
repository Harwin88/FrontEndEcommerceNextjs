"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { registerThunk } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, successMessage, user } = useSelector(
    (state: RootState) => state.auth
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push("/my-account");
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null); // Limpiar errores anteriores

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Las contraseñas no coinciden.");
      return;
    }

    dispatch(
      registerThunk({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })
    );
  };

  return (
    <>
      <Breadcrumb title={"Crear una cuenta"} pages={["Crear una cuenta"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Crear una cuenta
              </h2>
              <p>Ingresa tus datos a continuación</p>
            </div>

            <div className="mt-5.5">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="username" className="block mb-2.5">
                    Nombre de usuario <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Ingresa tu nombre de usuario"
                    value={formData.username}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none focus:border-transparent focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2.5">
                    Correo electrónico <span className="text-red">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Ingresa tu correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none focus:border-transparent focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5">
                    Contraseña <span className="text-red">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none focus:border-transparent focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>

                <div className="mb-5.5">
                  <label htmlFor="confirmPassword" className="block mb-2.5">
                    Confirmar contraseña <span className="text-red">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirma tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none focus:border-transparent focus:ring-2 focus:ring-blue/20"
                    required
                  />
                </div>

                {localError && (
                  <p className="text-red-500 text-sm text-center mt-3">
                    {localError}
                  </p>
                )}

                {error && (
                  <p className="text-red-500 text-sm text-center mt-3">
                    {error}
                  </p>
                )}

                {successMessage && (
                  <p className="text-green-500 text-sm text-center mt-3">
                    {successMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full font-medium text-white bg-dark py-3 px-6 rounded-lg hover:bg-blue mt-7.5"
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Crear Cuenta"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
