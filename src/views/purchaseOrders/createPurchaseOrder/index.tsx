import { FC, forwardRef } from "react";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Slide } from "@mui/material";
import Stepper from "../../../components/stepper";
import { TransitionProps } from "@mui/material/transitions";
import { DeleteForever, Close } from '@mui/icons-material';
import FormCreatePurchase from "./formCreatePurchase";
import { useCreatePurchaseOrder } from "../../../context/createPurchaseContext";
import ProductsCreatePurchase from "./productsCreatePurchase";
import { initPurchaseOrder } from "../../../constans";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreatePurchaseOrder = () => {
  const { activeStep, setActiveStep, refButtonCreateOrder, refButtonFinish, setPurchaseOrder, openCreate, setOpenCreate } = useCreatePurchaseOrder();

  return (
    <Dialog open={openCreate} fullWidth maxWidth="lg" TransitionComponent={Transition}>
      <DialogTitle>
        CREAR ORDEN DE COMPRA
        <IconButton
          onClick={() => setOpenCreate(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          onNext={() => refButtonCreateOrder?.current?.click()}
          onFinish={() => refButtonFinish?.current?.click()}
        >
          <Grid container justifyContent="center">
            <Card style={{ margin: 20, padding: 20 }}>
              {
                !activeStep
                  ? <FormCreatePurchase />
                  : <ProductsCreatePurchase />
              }
            </Card>
          </Grid>
        </Stepper>
      </DialogContent>
      <br />
      <DialogActions>
        <Button
          onClick={() => {
            setActiveStep(undefined);
            setPurchaseOrder(initPurchaseOrder);
            setOpenCreate(false);
          }}
          color="warning"
          variant="contained"
          startIcon={<DeleteForever />}
        >
          Cancelar orden
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreatePurchaseOrder;