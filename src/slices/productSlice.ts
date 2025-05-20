import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types/types";

interface ProductState {
  product: Product | null;
}

const initialState: ProductState = {
  product: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (productData: { name: string; price: number; description: string }) => {
    const response = await fetch(`http://localhost:5000/products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productData: { name: string; price: number; description: string }) => {
    const response = await fetch(`http://localhost:5000/products/:id`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
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
    });
    if (!response.ok) throw new Error("Failed to create product");
    return response.json();
  }
);

export const fetchUpdateProduct = createAsyncThunk(
  "products/fetchUpdateProduct",
  async (productData: { name: string; price: number; description: string }) => {
    const response = await fetch(`http://localhost:5000/products/:id`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Failed to create product");
    return response.json();
  }
);

export const fetchDeleteProduct = createAsyncThunk(
  "products/fetchDeleteProduct",
  async () => {
    const response = await fetch(`http://localhost:5000/products/:id`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to create product");
    return response.json();
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.product = action.payload.products;
    });
  },
});
