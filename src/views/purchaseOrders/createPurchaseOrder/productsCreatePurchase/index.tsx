import { useMemo, useState } from "react";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { useCreatePurchaseOrder } from "../../../../context/createPurchaseContext";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { OrderProduct } from "../../../../interfaces/purchaseOrder";
import { Add, DeleteForever } from '@mui/icons-material';
import Alert from "../../../../components/alert";

const ProductsCreatePurchase = () => {
  const { purchaseOrder, setPurchaseOrder } = useCreatePurchaseOrder();
  const [error, setError] = useState("");

  const columns = useMemo<GridColDef[]>(() => [
    {
      field: 'product',
      headerName: 'Producto',
      width: 250,
      renderCell: (params: GridRenderCellParams<OrderProduct>) => (
        <TextField
          variant="outlined"
          fullWidth
          value={params.row.product}
          onChange={(e) => setPurchaseOrder(po => ({ ...po, products: po.products.map((p, i) => (i === params.id ? { ...p, product: e.target.value } : p)) }))}
          onKeyDown={e => e.stopPropagation()}
        />
      ),
    },
    {
      field: 'quantity',
      headerName: 'Cantidad',
      width: 200,
      renderCell: (params: GridRenderCellParams<OrderProduct>) => (
        <TextField
          type="number"
          variant="outlined"
          fullWidth
          value={params.row.quantity}
          onChange={(e) => setPurchaseOrder(po => ({ ...po, products: po.products.map((p, i) => (i === params.id ? { ...p, quantity: +e.target.value } : p)) }))}
          onKeyDown={e => e.stopPropagation()}
        />
      ),
    },
    {
      field: 'price',
      headerName: 'Precio',
      width: 200,
      renderCell: (params: GridRenderCellParams<OrderProduct>) => (
        <TextField
          type="number"
          variant="outlined"
          fullWidth
          value={params.row.price}
          onChange={(e) => setPurchaseOrder(po => ({ ...po, products: po.products.map((p, i) => (i === params.id ? { ...p, price: +e.target.value } : p)) }))}
          onKeyDown={e => e.stopPropagation()}
        />
      ),
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 200,
      renderCell: (params: GridRenderCellParams<OrderProduct>) => (
        <TextField
          variant="outlined"
          fullWidth
          value={params.row.price * params.row.quantity}
          disabled
        />
      ),
    },
    {
      field: 'delete',
      headerName: 'Eliminar',
      width: 200,
      renderCell: (params: GridRenderCellParams<OrderProduct>) => (
        <Button
          fullWidth
          variant="contained"
          color="warning"
          endIcon={<DeleteForever />}
          onClick={() => setPurchaseOrder(po => ({ ...po, products: po.products.filter((p, i) => i !== params.row.id) }))}
        >
          Eliminar
        </Button>
      ),
    }
  ], [setPurchaseOrder]);

  const addProduct = () => {
    if (purchaseOrder.products.length === 10) {
      setError("Solo puedes agregar 10 productos por orden.");
      setTimeout(() => {
        setError("");
      }, 4000);

      return;
    }

    setPurchaseOrder({ ...purchaseOrder, products: [...purchaseOrder.products, { product: '', quantity: 0, price: 0, total: 0 }] });
  }

  return (
    <div >
      <Grid container justifyContent="end">
        <Button
          variant="contained"
          color="primary"
          endIcon={<Add />}
          onClick={addProduct}
        >
          Agregar producto
        </Button>
      </Grid>
      <br />
      <DataGrid
        isRowSelectable={() => false}
        rowHeight={100}
        rowSelection={false}
        columns={columns}
        rows={purchaseOrder.products.map((product, index) => ({ ...product, id: index }))}
        autoHeight
        slots={{
          noRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Sin productos.
            </Stack>
          ),
        }}
        hideFooter
      />
      {Boolean(error) && <Alert severity="error" error={error} />}
    </div>
  )
}

export default ProductsCreatePurchase;