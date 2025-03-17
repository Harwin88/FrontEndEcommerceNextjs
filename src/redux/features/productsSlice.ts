import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductsState {
  products: Record<string, Record<number, any[]>>; // slug -> page -> productos
}

const initialState: ProductsState = {
  products: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<{ slug: string; page: number; products: any[] }>) => {
      const { slug, page, products } = action.payload;
      if (!state.products[slug]) state.products[slug] = {};
      state.products[slug][page] = products;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
