import { Box } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

const FAQ = () => {

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
    <Box className="m-6">
      <div className="pb-5">
      <h1 className="headTitle">FAQ</h1>
      <h3 className="underTitle">Frequently Asked Questions Page</h3>
      </div>
      {typeof backendData.mockFaqQuestions === "undefined" ? (
        <p>loading...</p>
      ) : (
        backendData.mockFaqQuestions.map((question, i) => (


          <Accordion className="bg-red" defaultChecked>
            <AccordionSummary className="bg-red" expandIcon={<ExpandMoreIcon />}>
              <Typography className="text-lg text-primary">
                {backendData.mockFaqQuestions[i].question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="text-neutral">{backendData.mockFaqQuestions[i].answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
};

export default FAQ;
