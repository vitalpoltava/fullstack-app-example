import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type {City, NewProduct} from "../types/products";
import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import Grid from "@mui/material/Grid";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import {useStore} from "../App";
import {isChecked} from "./utils";

type Props = {
  updateList: Function;
  cities: City[]
}

const EditProduct = ({updateList, cities}: Props) => {
  const [open, setOpen] = useState(false);
  const [productEditSuccess, setProductEditSuccess] = useState<boolean>(false);
  const [productEditFailure, setProductEditFailure] = useState<boolean>(false);

  const selectedEditProduct = useStore((state) => state.selectedEditProduct);
  const setEditProduct = useStore((state) => state.setEditProduct)

  useEffect(() => {
    if (selectedEditProduct) {
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
    const editProductItem: NewProduct = {
      name: json.name,
      description: json.description,
      price: json.price,
    };

    const editAvailabilityObject: string[] = cities.reduce((acc: string[], item) => {
      if (json[item.id]) {
        acc.push(item.id)
      }
      return acc;
    }, []);


  };

  const handleCloseSuccess = () => {
    setProductEditSuccess(false)
  }

  const handleCloseFailure = () => {
    setProductEditFailure(false)
  }

  if (!selectedEditProduct) {
    console.warn('No product selected to edit!')
    return null;
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
          <input type={"hidden"} value={selectedEditProduct.id}/>
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
            value={selectedEditProduct.name}
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
            value={selectedEditProduct.description}
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
            value={selectedEditProduct.price}
          />
          {cities.length ? (
            <>
              <FormLabel sx={{mt: 3, mb: 2}} component="legend">Assign availability:</FormLabel>
              <Grid container spacing={2}>
                {cities.map((item: City) => (
                  <Grid item xs={6}>
                    <FormControlLabel control={
                      <Checkbox name={item.id} value={true}
                                checked={(isChecked(selectedEditProduct.stock, item.city))}/>
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

export default EditProduct;
