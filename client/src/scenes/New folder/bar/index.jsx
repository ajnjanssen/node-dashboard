import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Bar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box paddingLeft={2} marginRight={2}>
      <Header title="Bar chart" subtitle="Bar chart" />
    </Box>
  )
}

export default Bar