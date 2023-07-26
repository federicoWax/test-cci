
import { ReactNode } from "react";
import { useCreatePurchase } from "../../context/createPurchaseContext";
import { Stepper as Ste, Step, StepLabel, Grid, Button } from "@mui/material";
import { NavigateNext, NavigateBefore } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const steps = [
  'Información General',
  'Productos'
];

const Stepper = ({ children }: { children: ReactNode }) => {
  const { activeStep, setActiveStep } = useCreatePurchase();

  return (
    <>
      <Ste activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel><b>{label}</b></StepLabel>
          </Step>
        ))}
      </Ste>
      {children}
      <br />
      <Grid container justifyContent="center">
        {
          !activeStep
            ? <Button
              variant="contained"
              color="primary"
              endIcon={<NavigateNext />}
              onClick={() => setActiveStep(1)}
            >
              Siguiente
            </Button>
            : <div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "grey" }}
                    startIcon={<NavigateBefore />}
                    onClick={() => setActiveStep(undefined)}
                  >
                    Atras
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<ShoppingCartIcon />}
                  >
                    Finalizar
                  </Button>
                </Grid>
              </Grid>
            </div>
        }
      </Grid >
    </>
  )
}

export default Stepper;