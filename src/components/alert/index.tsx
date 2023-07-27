import { FC } from "react";
import { Alert as A, AlertColor } from '@mui/material';
import "./index.css"

interface Props {
  severity: AlertColor;
  error: string;
}

const Alert: FC<Props> = ({ severity, error }) => {
  return (
    <A className="alert-container" severity={severity}>{error}</A>
  )
}

export default Alert;