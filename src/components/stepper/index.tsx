
import { ReactNode, FC, Dispatch, SetStateAction } from "react";
import { Stepper as Ste, Step, StepLabel, Grid, Button } from "@mui/material";
import { NavigateNext, NavigateBefore } from '@mui/icons-material';

interface Props {
  children: ReactNode;
  activeStep?: number;
  setActiveStep: Dispatch<SetStateAction<number | undefined>>;
  onNext: () => void;
  onFinish: () => void;
}

const steps = [
  'Información General',
  'Productos'
];

const Stepper: FC<Props> = ({ children, activeStep, setActiveStep, onNext, onFinish }) => {
  return (
    <>
      <br />
      <Ste activeStep={activeStep} alternativeLabel>
        {
          steps.map((label) => (
            <Step key={label}>
              <StepLabel><b>{label}</b></StepLabel>
            </Step>
          ))
        }
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
              onClick={() => {
                onNext();
              }}
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
                    onClick={onFinish}
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