import { useMemo } from "react";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { useCreatePurchaseOrder } from "../../../../context/createPurchaseContext";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { OrderProduct } from "../../../../interfaces/purchaseOrder";
import { Add, DeleteForever } from '@mui/icons-material';
import { SubmitHandler } from "react-hook-form";
import { maxLength } from "../../../../constans";

const ProductsCreatePurchase = () => {
  const { purchaseOrder, setPurchaseOrder, setError, refButtonFinish, onFinish, formOrderProducts } = useCreatePurchaseOrder();
  const { register, handleSubmit, formState: { errors }, watch } = formOrderProducts!;
  const products = watch();

  const onSubmit: SubmitHandler<OrderProduct[]> = _purchaseOrder => {
    if (Object.keys(errors).length > 0) return;

    onFinish();
  }

  const columns = useMemo<GridColDef[]>(() => [
    {
      field: 'product',
      headerName: 'Producto',
      width: 250,
      renderCell: (params: GridRenderCellParams<OrderProduct>) => (
        <TextField
          variant="outlined"
          fullWidth
          onKeyDown={e => e.stopPropagation()}
          {...register(
            `${params.id as number}.product`,
            {
              required: "Nombre requerido.",
              maxLength
            }
          )}
          error={Boolean(errors[params.id as number]?.product)}
          helperText={errors[params.id as number]?.product?.message || "Nombre requerido."}
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
          onKeyDown={e => e.stopPropagation()}
          {...register(
            `${params.id as number}.quantity`,
            {
              required: "Cantidad requerida.",
              min: {
                message: "Canitdad minima 1.",
                value: 1
              },
              max: {
                message: "Cantidad máxima 100.",
                value: 100
              }
            }
          )}
          error={Boolean(errors[params.id as number]?.quantity)}
          helperText={errors[params.id as number]?.quantity?.message || "Cantidad requerida."}
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
          onKeyDown={e => e.stopPropagation()}
          {...register(
            `${params.id as number}.price`,
            {
              required: "Precio requerido.",
              min: {
                message: "Precio minimo 1.",
                value: 1
              },
              max: {
                message: "Precio máximo 1000.",
                value: 1000
              }
            }
          )}
          error={Boolean(errors[params.id as number]?.price)}
          helperText={errors[params.id as number]?.price?.message || "Precio requerido."}
        />
      ),
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 200,
      renderCell: (params: GridRenderCellParams<OrderProduct>) => {
        const price = products[params.row.id as number]?.price || 0;
        const quantity = products[params.row.id as number]?.quantity || 0;
        const subtotal = price * quantity;
        const total = subtotal + (subtotal * 0.16);

        return <TextField
          variant="outlined"
          fullWidth
          value={total}
          disabled
          helperText="Impuesto del 16%"
        />
      },
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
  ], [setPurchaseOrder, errors, products, register]);

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
      <Grid container alignItems="center">
        <Grid item xs={6} md={10}>
          <b>Se aplicara un impuesto del 16% a cada producto.</b>
        </Grid>
        <Grid item xs={6} md={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={addProduct}
          >
            Producto
          </Button>
        </Grid>
      </Grid>
      <br />
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DataGrid
          isRowSelectable={() => false}
          rowHeight={110}
          rowSelection={false}
          columns={columns}
          rows={purchaseOrder.products.map((product, index) => ({ ...product, id: index }))}
          autoHeight
          slots={{
            noRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Sin productos.
              </Stack>
            )
          }}
          hideFooter
        />
        <Button
          type="submit"
          style={{ display: "none" }}
          ref={refButtonFinish}
        />
      </form>
    </div>
  )
}

export default ProductsCreatePurchase;