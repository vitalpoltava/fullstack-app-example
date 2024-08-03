import type {Product} from "./products";

export type State = {
  editProductDialogOpened: boolean,
  selectedDeleteProduct: Product | null,
  selectedEditProduct: Product | null,
  setDeletedProduct: ((product: Product | null) => void) | null,
}

