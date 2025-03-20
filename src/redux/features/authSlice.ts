// /redux/features/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import client from "@/graphql/client";  // tu cliente urql
import { LoginDocument } from "@/graphql/generated/graphql"; // mutación generada
import Cookies from "js-cookie";       // para guardar el token si no tienes cookie HttpOnly

interface User {
  id: string;
  email: string;
  // otros campos que retorne tu mutación
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
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
        return rejectWithValue("No se obtuvo respuesta de login.");
      }

      const { jwt, user } = result.data.login;

      // Idealmente, tu backend debería setear el JWT en una cookie HttpOnly. 
      // Si no puedes, aquí lo guardas con js-cookie (menos seguro).
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
    // Acción para logout
    logout(state) {
      state.user = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
