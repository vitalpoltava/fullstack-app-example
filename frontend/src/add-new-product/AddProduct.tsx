import React, {useState} from 'react';
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
import {postProduct, postWarehouse} from "../fetchers/http";

type Props = {
  updateList: Function;
  cities: City[]
}

const AddProduct = ({updateList, cities}: Props) => {
  const [open, setOpen] = useState(false);
  const [productCreateSuccess, setProductCreateSuccess] = useState<boolean>(false);
  const [productCreateFailure, setProductCreateFailure] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSuccess = () => {
    setProductCreateSuccess(false)
  }

  const handleCloseFailure = () => {
    setProductCreateFailure(false)
  }

  const handleSubmit = (json: { [p: string]: any }) => {
    const newProductItem: NewProduct = {
      name: json.name,
      description: json.description,
      price: json.price,
    };

    const availabilityObject: string[] = cities.reduce((acc: string[], item) => {
      if (json[item.id]) {
        acc.push(item.id)
      }
      return acc;
    }, []);

    postProduct(newProductItem)
      .then((resProduct) => postWarehouse(resProduct.id, availabilityObject))
      .then(() => {
        setProductCreateSuccess(true)
        updateList()
      })
      .catch(() => {
        setProductCreateFailure(true)
      });
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>Add Product</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            handleSubmit(formJson)
            handleClose();
          },
        }}
      >
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
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
          />
          {cities.length ? (
            <>
              <FormLabel sx={{mt: 3, mb: 2}} component="legend">Assign availability:</FormLabel>
              <Grid container spacing={2}>
                {cities.map((item: City) => (
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox name={item.id} value={true}/>} label={item.city}/>
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

      <Snackbar open={productCreateSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          variant="filled"
          sx={{width: '100%'}}
        >
          Product posted successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={productCreateFailure} autoHideDuration={6000} onClose={handleCloseFailure}>
        <Alert
          onClose={handleCloseFailure}
          severity="error"
          variant="filled"
          sx={{width: '100%'}}
        >
          Product creation error!
        </Alert>
      </Snackbar>

    </>
  )
}

export default AddProduct;
