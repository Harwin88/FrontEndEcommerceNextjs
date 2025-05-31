'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, loginUser } from '@/redux/features/authSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { redirectAfterLogin } = useAuthRedirect();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const [dropdown, setDropdown] = useState(false);

  // ✅ AGREGADO: Estados para el formulario de login
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleLogout = () => {
    dispatch(logout());
    router.push('/signin');
  };

  // ✅ MEJORADO: Manejar el login con redirección inteligente
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      return;
    }

    try {
      const result = await dispatch(
        loginUser({
          identifier: loginForm.email,
          password: loginForm.password,
        })
      );

      if (loginUser.fulfilled.match(result)) {
        setDropdown(false);
        setLoginForm({ email: '', password: '' });

        // ✅ AGREGADO: Redirección inteligente después del login exitoso
        // Como estamos en checkout, simplemente recargamos la página para que se muestre el contenido
        window.location.reload();
      }
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white shadow-1 rounded-[10px]">
      <div
        onClick={() => setDropdown(!dropdown)}
        className={`cursor-pointer flex items-center gap-0.5 py-5 px-5.5 ${
          dropdown && 'border-b border-gray-3'
        }`}
      >
        {user ? (
          <>
            Logged in as <strong>{user.email}</strong>
          </>
        ) : (
          'Returning customer?'
        )}
        <span className="flex items-center gap-2.5 pl-1 font-medium text-dark">
          {user ? 'Click here to logout' : 'Click here to login'}
          <svg
            className={`${
              dropdown && 'rotate-180'
            } fill-current ease-out duration-200`}
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.06103 7.80259C4.30813 7.51431 4.74215 7.48092 5.03044 7.72802L10.9997 12.8445L16.9689 7.72802C17.2572 7.48092 17.6912 7.51431 17.9383 7.80259C18.1854 8.09088 18.1521 8.5249 17.8638 8.772L11.4471 14.272C11.1896 14.4927 10.8097 14.4927 10.5523 14.272L4.1356 8.772C3.84731 8.5249 3.81393 8.09088 4.06103 7.80259Z"
              fill=""
            />
          </svg>
        </span>
      </div>

      {/* Dropdown menu */}
      <div
        className={`${
          dropdown ? 'block' : 'hidden'
        } pt-7.5 pb-8.5 px-4 sm:px-8.5`}
      >
        {user ? (
          <>
            <p className="text-custom-sm mb-6">¿Deseas cerrar sesión?</p>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex font-medium text-white bg-blue py-3 px-10.5 rounded-md ease-out duration-200 hover:bg-blue-dark"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <p className="text-custom-sm mb-6">
              Si ya tienes una cuenta, inicia sesión aquí.
            </p>

            {/* ✅ CORREGIDO: Formulario de login con manejo correcto */}
            <form onSubmit={handleLogin}>
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={loginForm.email}
                  onChange={handleInputChange}
                  className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={loginForm.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex font-medium text-white bg-blue py-3 px-10.5 rounded-md ease-out duration-200 hover:bg-blue-dark disabled:opacity-50"
              >
                {loading ? 'Iniciando sesión...' : 'Login'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
