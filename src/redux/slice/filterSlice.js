import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;

      switch (sort) {
        case "latest":
          state.filteredProducts = products;
          break;
        case "lowest-price":
          state.filteredProducts = products
            .slice()
            .sort((a, b) => a.price - b.price);
          break;
        case "highest-price":
          state.filteredProducts = products
            .slice()
            .sort((a, b) => b.price - a.price);
          break;
        case "a-z":
          state.filteredProducts = products
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "z-a":
          state.filteredProducts = products
            .slice()
            .sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    },
    FILTER_BY_CATEGORY(state, action) {
      const { products, cat } = action.payload;
      if (cat === "All") {
        state.filteredProducts = products;
      } else {
        state.filteredProducts = products.filter(
          (product) => product.category === cat
        );
      }
    },
    FILTER_BY_BRAND(state, action) {
      const { products, brand } = action.payload;
      if (brand === "All") {
        state.filteredProducts = products;
      } else {
        state.filteredProducts = products.filter(
          (product) => product.brand === brand
        );
      }
    },
    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;
      state.filteredProducts = products.filter((product) => product.price <= price);
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
