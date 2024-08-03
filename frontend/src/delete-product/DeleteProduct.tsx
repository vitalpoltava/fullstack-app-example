import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useStore} from "../App";
import {deleteProduct, deleteWarehouse} from "../fetchers/http";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Props = {
  updateList: Function;
}

const DeleteProduct = ({updateList}: Props) => {
  const [open, setOpen] = useState(false);
  const [productDeleteSuccess, setProductDeleteSuccess] = useState<boolean>(false);
  const [productDeleteFailure, setProductDeleteFailure] = useState<boolean>(false);

  const selectedDeleteProduct = useStore((state) => state.selectedDeleteProduct)
  const setDeletedProduct = useStore((state) => state.setDeletedProduct)

  useEffect(() => {
    if (selectedDeleteProduct) {
      setOpen(true);
    } else {
      handleClose()
    }
  }, [selectedDeleteProduct]);

  const handleClose = () => {
    setOpen(false);
    setDeletedProduct && setDeletedProduct(null)
  };

  const handleCloseSuccess = () => {
    setProductDeleteSuccess(false)
  }

  const handleCloseFailure = () => {
    setProductDeleteFailure(false)
  }

  const handleDelete = () => {
    if (selectedDeleteProduct) {
      deleteWarehouse(selectedDeleteProduct.id)
        .then(() => deleteProduct(selectedDeleteProduct.id))
        .then(() => {
          updateList()
          setProductDeleteSuccess(true)
        })
        .catch(() => {
          setProductDeleteFailure(true)
        })
        .finally(() => {
          handleClose();
        })
    }
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete {selectedDeleteProduct?.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undone this action!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={productDeleteSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          variant="filled"
          sx={{width: '100%'}}
        >
          Product deleted successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={productDeleteFailure} autoHideDuration={6000} onClose={handleCloseFailure}>
        <Alert
          onClose={handleCloseFailure}
          severity="error"
          variant="filled"
          sx={{width: '100%'}}
        >
          Product deletion error!
        </Alert>
      </Snackbar>
    </>
  )
}

export default DeleteProduct;
