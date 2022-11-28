import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [backendData, setBackendData] = useState([{}]);
  // console.log(backendData);
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
      {typeof backendData.mockFaqQuestions === "undefined" ? (
        <p>loading...</p>
      ) : (
        backendData.mockFaqQuestions.map((question, i) => (
          <Accordion defaultChecked>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                {backendData.mockFaqQuestions[i].question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{backendData.mockFaqQuestions[i].answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
};

export default FAQ;
