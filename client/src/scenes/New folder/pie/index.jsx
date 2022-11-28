import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Pie = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box paddingLeft={2} marginRight={2}>
      <Header title="Pie chart" subtitle="display your Pie chart" />
    </Box>
  )
}

export default Pie