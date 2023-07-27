import { FC, forwardRef } from "react";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Grid, IconButton, Slide } from "@mui/material";
import Stepper from "../../../components/stepper";
import { TransitionProps } from "@mui/material/transitions";
import { DeleteForever, Close } from '@mui/icons-material';
import FormCreatePurchase from "./formCreatePurchase";
import { useCreatePurchaseOrder } from "../../../context/createPurchaseContext";
import ProductsCreatePurchase from "./productsCreatePurchase";

interface Props extends DialogProps {
  onClose: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreatePurchaseOrder: FC<Props> = (props) => {
  const { activeStep, setActiveStep, refButtonCreateForm } = useCreatePurchaseOrder();

  return (
    <Dialog fullWidth maxWidth="lg" TransitionComponent={Transition} {...props}>
      <DialogTitle>
        CREAR ORDEN DE COMPRA
        <IconButton
          onClick={props.onClose}
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
          onNext={() => refButtonCreateForm?.current?.click()}
          onFinish={() => { }}
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
          onClick={props.onClose}
          color="warning"
          variant="contained"
          endIcon={<DeleteForever />}
        >
          Cancelar orden
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreatePurchaseOrder;