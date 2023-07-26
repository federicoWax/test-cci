import { SubmitHandler, useForm } from "react-hook-form";
import { PurchaseOrder } from "../../../../interfaces/purchaseOrder";
import { TextField, Button, Stack, Grid } from "@mui/material";
import { useCreatePurchaseOrder } from "../../../../context/createPurchaseContext";
import dayjs from "dayjs";

const FormCreatePurchase = ({ onSubmit: onSubmitProp }: { onSubmit: () => void }) => {
  const { refButtonCreateForm } = useCreatePurchaseOrder();
  const { register, handleSubmit, formState: { errors } } = useForm<PurchaseOrder>();

  console.error(errors);

  const onSubmit: SubmitHandler<PurchaseOrder> = data => {
    if (Object.keys(errors).length > 0) return;

    onSubmitProp();
  };

  return (
    <Stack
      component="form"
      spacing={2}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Fecha: {dayjs().format("DD/MM/YYYY hh:mm a")}
        </Grid>
        <Grid item xs={12} md={3}>
          <label>Nombre del cliente:</label>
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            fullWidth
            {...register("client", { required: "El nombre del cliente es requerido." })}
            error={Boolean(errors.client)}
            helperText={errors.client?.message}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <label>Dirección:</label>
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            fullWidth multiline rows={4}
            {...register("address", { required: "La dirección es requerida." })}
            error={Boolean(errors.address)}
            helperText={errors.address?.message}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        style={{ display: "none" }}
        ref={refButtonCreateForm}
      >
        GUARDAR
      </Button>
    </Stack>
  )
}

export default FormCreatePurchase;