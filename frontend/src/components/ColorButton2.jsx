import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[900]),
  borderColor: grey[400],
  width: 120,
  height: 70,
  fontSize: 30,
  "&:hover": {
    backgroundColor: grey[900],
    borderColor: grey[400],
  },
}));

export default function CustomizedButtons({ children }) {
  return <ColorButton variant="outlined">{children}</ColorButton>;
}
