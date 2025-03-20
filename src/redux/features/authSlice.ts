import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import client from "@/graphql/client";
import { LoginDocument, RegisterDocument } from "@/graphql/generated/graphql";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Acción asíncrona para login
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    { identifier, password }: { identifier: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await client
        .mutation(LoginDocument, {
          login: { identifier, password },
        })
        .toPromise();

      if (result.error) {
        return rejectWithValue(result.error.message);
      }
      if (!result.data?.login) {
        return rejectWithValue("No se obtuvo respuesta de inicio de sesión.");
      }

      const { jwt, user } = result.data.login;

      Cookies.set("token", jwt, {
        expires: 7,
        sameSite: "strict",
        secure: true,
      });

      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Acción asíncrona para registro
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (
    { username, email, password, confirmPassword }: { username: string; email: string; password: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      if (password !== confirmPassword) {
        return rejectWithValue("Las contraseñas no coinciden.");
      }

      const result = await client
        .mutation(RegisterDocument, {
          input: { username, email, password },
        })
        .toPromise();

      if (result.error) {
        return rejectWithValue(result.error.message);
      }

      if (!result.data?.register) {
        return rejectWithValue("No se obtuvo respuesta de registro.");
      }

      const { jwt, user } = result.data.register;

      Cookies.set("token", jwt, {
        expires: 7,
        sameSite: "strict",
        secure: true,
      });

      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.successMessage = null;
      state.error = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.successMessage = "Inicio de sesión exitoso.";
      state.error = null;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.successMessage = null;
    });
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.successMessage = "Registro exitoso.";
      state.error = null;
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.successMessage = null;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
