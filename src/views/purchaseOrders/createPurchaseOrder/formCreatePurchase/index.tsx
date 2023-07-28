import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button, Stack, Grid } from "@mui/material";
import { PurchaseOrder } from "../../../../interfaces/purchaseOrder";
import { useCreatePurchaseOrder } from "../../../../context/createPurchaseContext";
import { maxLength } from "../../../../constans";

const FormCreatePurchase = () => {
  const { setActiveStep, refButtonCreateOrder, purchaseOrder, setPurchaseOrder } = useCreatePurchaseOrder();
  const { register, handleSubmit, formState: { errors } } = useForm<PurchaseOrder>({
    defaultValues: purchaseOrder
  });

  const onSubmit: SubmitHandler<PurchaseOrder> = _purchaseOrder => {
    if (Object.keys(errors).length > 0) return;

    setPurchaseOrder(_purchaseOrder);
    setActiveStep(1);
  }

  return (
    <Stack
      component="form"
      spacing={2}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          Fecha:
        </Grid>
        <Grid item xs={9}>
          {dayjs(purchaseOrder.date).format("DD/MM/YYYY hh:mm a")}
        </Grid>
        <Grid item xs={12} md={3}>
          <label>Nombre del cliente:</label>
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            fullWidth
            {...register(
              "client",
              {
                required: "El nombre del cliente es requerido.",
                maxLength
              }
            )}
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
            {...register(
              "address",
              {
                required: "La dirección es requerida.",
                maxLength
              }
            )}
            error={Boolean(errors.address)}
            helperText={errors.address?.message}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        style={{ display: "none" }}
        ref={refButtonCreateOrder}
      />
    </Stack>
  )
}

export default FormCreatePurchase;