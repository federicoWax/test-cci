import { Dispatch, FC, SetStateAction } from "react";
import { Button, Grid } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface Props {
  setOpenCreate: Dispatch<SetStateAction<boolean>>;
}

const HeaderPurchaseOrders: FC<Props> = ({ setOpenCreate }) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={12} md={10}>
        <h1>LISTA ÓRDENES DE COMPRA</h1>
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
  )
}

export default HeaderPurchaseOrders