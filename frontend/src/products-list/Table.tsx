import React, {useContext} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {Product} from "../types/products";
import {getAvailability, getPrice} from "./utils";
import {useStore} from "../App";
import './Table.css'

type Props = {
  list: Product[]
}

const ProductsTable = ({list}: Props) => {
  const setDeletedProduct = useStore((state) => state.setDeletedProduct)
  const handleDelete = (product: Product) => {
    setDeletedProduct && setDeletedProduct(product)
  }
  return (
    <>
      {list.length === 0 ? <Alert severity="error">Error loading products</Alert> :
        <TableContainer component={Paper}>
          <Table aria-label="products table">
            <TableHead>
              <TableRow className={"bgLtGray"}>
                <TableCell className={"boldTh"}>Product Name</TableCell>
                <TableCell className={"boldTh"}>Description</TableCell>
                <TableCell className={"boldTh"} align="right">Price</TableCell>
                <TableCell className={"boldTh"} align="right">Availability</TableCell>
                <TableCell className={"boldTh"} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row: Product) => (
                <TableRow
                  key={row.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="right">{getPrice(row.price)}</TableCell>
                  <TableCell align="right">{getAvailability(row.stock) ||
                    <Typography variant="inherit" color={"lightgray"}>Not available</Typography>}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit" size="small">
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small">
                      <DeleteIcon onClick={() => handleDelete(row)} fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  )
}

export default ProductsTable
