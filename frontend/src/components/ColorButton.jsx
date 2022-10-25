import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[900]),
  "&:hover": {
    backgroundColor: grey[900],
  },
}));

export default function CustomizedButtons({ children }) {
  return <ColorButton variant="text">{children}</ColorButton>;
}
