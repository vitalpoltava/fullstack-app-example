import React, {useEffect, useState, memo} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type {City, EditProduct} from "../types/products";
import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import Grid from "@mui/material/Grid";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import {useStore} from "../App";
import {getCityIds, getPrice} from "./utils";
import {deleteWarehouse, updateProduct, postWarehouse} from "../fetchers/http";

type Props = {
  updateList: Function;
  cities: City[]
}

const EditProduct = ({updateList, cities}: Props) => {
  const [open, setOpen] = useState(false);
  const [productEditSuccess, setProductEditSuccess] = useState<boolean>(false);
  const [productEditFailure, setProductEditFailure] = useState<boolean>(false);
  const [stockOptions, setStockOptions] = useState<string[]>([]);

  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');

  const selectedEditProduct = useStore((state) => state.selectedEditProduct);
  const setEditProduct = useStore((state) => state.setEditProduct);

  useEffect(() => {
    if (selectedEditProduct) {

      if (selectedEditProduct.stock.length) {
        const citiesObj: string[] = getCityIds(selectedEditProduct.stock, cities)
        setStockOptions(citiesObj)
      }

      // init form values
      setProductPrice(getPrice(selectedEditProduct.price))
      setProductDescription(selectedEditProduct.description)
      setProductName(selectedEditProduct.name)

      // Open dialog
      setOpen(true);
    } else {
      handleClose()
    }
  }, [selectedEditProduct]);

  const handleClose = () => {
    setOpen(false);
    setEditProduct && setEditProduct(null)
  };

  const handleEditSubmit = (json: { [p: string]: any }) => {
    const editProductItem: EditProduct = {
      id: json.id,
      name: json.name,
      description: json.description,
      price: parseInt(json.price, 10) * 100,
    };

    const editAvailabilityObject: string[] = cities.reduce((acc: string[], item) => {
      json[item.id] && acc.push(item.id)
      return acc;
    }, []);

    deleteWarehouse(editProductItem.id)
      .then(() => postWarehouse(editProductItem.id, editAvailabilityObject))
      .then(() => updateProduct(editProductItem))
      .then(() => {
        updateList()
        setProductEditSuccess(true)
      })
      .catch(() => setProductEditFailure(true))
      .finally(handleClose);
  };

  const handleCloseSuccess = () => {
    setProductEditSuccess(false)
  }

  const handleCloseFailure = () => {
    setProductEditFailure(false)
  }

  const updateStockOptions = (id: string) => {
    if (stockOptions.includes(id)) {
      setStockOptions(stockOptions.filter((optionId) => optionId !== id));
    } else {
      setStockOptions([...stockOptions, id])
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            handleEditSubmit(formJson)
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <input name={"id"} type={"hidden"} value={selectedEditProduct && selectedEditProduct.id || 0}/>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Product name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setProductName(event.target.value)}
            value={productName}
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Product description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setProductDescription(event.target.value)}
            value={productDescription}
          />
          <TextField
            required
            margin="dense"
            id="price"
            name="price"
            label="Product price, $"
            type="number"
            fullWidth
            variant="standard"
            onChange={(event) => setProductPrice(event.target.value)}
            value={productPrice}
          />
          {cities.length ? (
            <>
              <FormLabel sx={{mt: 3, mb: 2}} component="legend">Assign availability:</FormLabel>
              <Grid container spacing={2}>
                {cities.map((item: City) => (
                  <Grid item xs={6} key={item.id}>
                    <FormControlLabel control={
                      <Checkbox name={item.id} value={true}
                                onClick={() => updateStockOptions(item.id)}
                                checked={(stockOptions.includes(item.id))}/>
                    } label={item.city}/>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : <Alert severity="error">Error loading warehouses list</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={productEditSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          variant="filled"
          sx={{width: '100%'}}
        >
          Product updated successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={productEditFailure} autoHideDuration={6000} onClose={handleCloseFailure}>
        <Alert
          onClose={handleCloseFailure}
          severity="error"
          variant="filled"
          sx={{width: '100%'}}
        >
          Product update error!
        </Alert>
      </Snackbar>
    </>
  )
}

export default memo(EditProduct);
