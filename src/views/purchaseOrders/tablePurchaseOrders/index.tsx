import { FC } from "react";
import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

interface Props {
  loading: boolean;
}

const TablePurchaseOrders: FC<Props> = ({ loading }) => {
  return (
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
            Sin órdenes de compra.
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
  )
}

export default TablePurchaseOrders;