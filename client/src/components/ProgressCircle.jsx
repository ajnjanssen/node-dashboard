import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient("#ffffff" 55%, transparent 56%),
            conic-gradient(transparent 0deg 83deg, "#ffffff" 27deg 360deg),
            "#ffffff"`,
        borderRadius: "50%",
        width: `10px`,
        height: `20px`,
      }}
    />
  );
};

export default ProgressCircle;
