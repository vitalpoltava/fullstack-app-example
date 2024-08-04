import React, {useEffect, useState} from 'react';
import { create } from 'zustand'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from './products-list/List';
import initialState from "./state";
import type {State} from "./types/state";
import type {City, Product} from "./types/products";
import './App.css'
import AddProduct from "./add-new-product/AddProduct";
import {getCities} from "./fetchers/http";
import DeleteProduct from "./delete-product/DeleteProduct";

export const useStore = create<State>((set) => ({
  ...initialState,
  setDeleteProduct: (product: Product | null) => set({selectedDeleteProduct: product}),
  setEditProduct: (product: Product | null) => set({selectedEditProduct: product}),
}));

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [listVersion, updateListVersion] = useState<number>(0);
  const updateList = () => {
    updateListVersion(listVersion + 1);
  }

  useEffect(() => {
    getCities().then((list) => setCities(list));
  }, []);

  return (
    <Container maxWidth="lg">
      <Box component="section" sx={{m: 2, p: 2}}>
        <Grid container>
          <Grid item xs={6} className={"gridCellLeft"}>
            <div>Products List</div>
          </Grid>
          <Grid item xs={6} className={"gridCellRight"}>
            <AddProduct updateList={updateList} cities={cities} />
          </Grid>
        </Grid>
        <List key={listVersion} />
        <DeleteProduct updateList={updateList} />
      </Box>
    </Container>
  );
}

export default App;
