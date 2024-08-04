import type {Product} from "./products";

export type State = {
  editProductDialogOpened: boolean,
  selectedDeleteProduct: Product | null,
  selectedEditProduct: Product | null,
  setDeleteProduct: ((product: Product | null) => void) | null,
  setEditProduct: ((product: Product | null) => void) | null,
}

