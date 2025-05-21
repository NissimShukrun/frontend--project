import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types/types";

interface ProductState {
  products: Product[];
  product: Product | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(`http://localhost:5000/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string) => {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return response.json();
  }
);

export const fetchCreateProduct = createAsyncThunk(
  "products/fetchCreateProduct",
  async (productData: { name: string; price: number; description: string }) => {
    const response = await fetch(`http://localhost:5000/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to create product");
    return response.json();
  }
);

export const fetchUpdateProduct = createAsyncThunk(
  "products/fetchUpdateProduct",
  async ({
    id,
    ...productData
  }: {
    id: string;
    name: string;
    price: number;
    description: string;
  }) => {
    const response = await fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to create product");
    return response.json();
  }
);

export const fetchDeleteProduct = createAsyncThunk(
  "products/fetchDeleteProduct",
  async (id: string) => {
    const response = await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok && response.status !== 204)
      throw new Error("Failed to create product");
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(fetchCreateProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.product = action.payload;
      })
      .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
        state.product = null;
      });
  },
});

export default productSlice.reducer;
