import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const useAuthRedirect = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  // Guardar la URL de destino cuando el usuario no está autenticado
  const saveIntendedUrl = (url: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('intendedUrl', url);
    }
  };

  // Obtener y limpiar la URL de destino
  const getAndClearIntendedUrl = (): string | null => {
    if (typeof window !== 'undefined') {
      const intendedUrl = localStorage.getItem('intendedUrl');
      localStorage.removeItem('intendedUrl');
      return intendedUrl;
    }
    return null;
  };

  // Redirigir después del login exitoso
  const redirectAfterLogin = () => {
    const intendedUrl = getAndClearIntendedUrl();
    if (intendedUrl) {
      router.push(intendedUrl);
    } else {
      router.push('/my-account'); // URL por defecto
    }
  };

  // Proteger una ruta (redirigir a login si no está autenticado)
  const protectRoute = (currentPath: string) => {
    if (!user) {
      saveIntendedUrl(currentPath);
      router.push('/signin');
      return false;
    }
    return true;
  };

  return {
    saveIntendedUrl,
    getAndClearIntendedUrl,
    redirectAfterLogin,
    protectRoute,
    isAuthenticated: !!user,
  };
};
