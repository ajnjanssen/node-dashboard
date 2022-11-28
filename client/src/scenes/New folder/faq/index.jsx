import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Faq = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box paddingLeft={2} marginRight={2}>
      <Header title="Faq" subtitle="Frequently asked questions" />
    </Box>
  )
}

export default Faq