import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Category = {
  documentId: string;
  Name: string;
  slug: string;
  UrlImagen: string;
  parent?: Category;
};

type InitialState = {
  categories: Category[];
};

const initialState: InitialState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
