import { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import Stepper from "../../../components/stepper";

interface Props extends DialogProps {
  handleClose: () => void;
}

const CreatePurchase: FC<Props> = (props) => {
  return (
    <Dialog fullWidth maxWidth="lg" {...props}>
      <DialogTitle>
        <h3>CREAR ORDEN DE COMPRA</h3>
      </DialogTitle>
      <DialogContent>
        <Stepper>
        </Stepper>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cerrar</Button>
        {/*  <Button onClick={props.handleClose}>Subscribe</Button> */}
      </DialogActions>
    </Dialog>
  )
}

export default CreatePurchase;