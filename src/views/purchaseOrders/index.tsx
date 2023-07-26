import { useState } from "react";
import { Button, Grid, Stack } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { DataGrid } from "@mui/x-data-grid";
import CreatePurchaseOrder from "./createPurchaseOrder";
import { CreatePurchaseOrderProvider } from "../../context/createPurchaseContext";

const PurchaseOrders = () => {
  const [loading, setLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={12} md={10}>
          <h1>LISTA ORDENES DE COMPRA</h1>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<AddShoppingCartIcon />}
            onClick={() => setOpenCreate(true)}
          >
            Crear orden
          </Button>
        </Grid>
      </Grid>
      <DataGrid
        columns={[]}
        rows={[]}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        autoHeight
        slotProps={{
          pagination: {
            labelRowsPerPage: "Renglones por página",
            labelDisplayedRows: ({ from, to, count }) => `${from}–${to} de ${count}`,
          }
        }}
        slots={{
          noRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Sin ordenes de compra.
            </Stack>
          ),
        }}
        onPaginationModelChange={({ page: _page }) => {

        }}
        loading={loading}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
      />
      <CreatePurchaseOrderProvider>
        <CreatePurchaseOrder
          open={openCreate}
          onClose={() => setOpenCreate(false)}
        />
      </CreatePurchaseOrderProvider>
    </div>
  )
}

export default PurchaseOrders;