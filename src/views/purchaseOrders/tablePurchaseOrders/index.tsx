import { Stack } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client";
import { GET_PURCHASE_ORDERS } from "../../../apolloClient/querys";
import { PurchaseOrder } from "../../../interfaces/purchaseOrder";
import { useMemo } from "react";
import dayjs from "dayjs";

interface Query {
  getPurchaseOrders: PurchaseOrder[];
}

const TablePurchaseOrders = () => {
  const { loading, error, data } = useQuery<Query>(GET_PURCHASE_ORDERS);

  const rows = useMemo<PurchaseOrder[]>(() => {
    if (loading) return [];

    return data!.getPurchaseOrders.map(p => ({ ...p, date: new Date(+p.date) }))
  }, [loading, data]);

  const columns = useMemo<GridColDef[]>(() => [
    {
      field: 'client',
      headerName: 'Cliente',
      width: 250,
    },
    {
      field: 'address',
      headerName: 'Dirección',
      width: 250,
    },
    {
      field: 'date',
      headerName: 'Fecha',
      width: 250,
      valueGetter: (params: GridValueGetterParams<PurchaseOrder>) => dayjs(params.row.date).format("DD/MM/YYYY hh:mm a"),
    }
  ], []);

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <DataGrid
      columns={columns}
      rows={rows.map((r, i) => ({ ...r, id: i }))}
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
            Sin órdenes de compra.
          </Stack>
        ),
      }}
      loading={loading}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
    />
  )
}

export default TablePurchaseOrders;