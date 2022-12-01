import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
  useTheme
} from "@mui/material";
import Button from "@mui/material/Button";
import react, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [currentEvents, setCurrentEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [currentSelected, setCurrentSelected] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [backendData, setBackendData] = useState([{}]);
  // console.log(backendData);
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
console.log(calendarApi);

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    handleOpen();
    // selected.event.remove();
    // setEventTitle(selected.event.title);
    setCurrentSelected(selected);
  };

  const deleteEvent = () => {
    // currentSelected.remove();
    // selected.event.remove();
    currentSelected.event.remove();
    handleClose();
  };
  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              class="bold"
              variant="h4"
              component="h2"
            >
              Are you sure you want to delete {eventTitle}?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              {" "}
              <Button onClick={deleteEvent} color="error" variant="contained">
                Delete
              </Button>
              {/* <Button onClick={handleClose} color="success" variant="outlined">
              Cancel
            </Button>  */}
            </Box>
          </Box>
        </Modal>
        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          {typeof backendData.mockAgendaItems === "undefined" ? (
            <p>loading...</p>
          ) : (
            backendData.mockAgendaItems.map((item, i) => (
              <FullCalendar
                height="75vh"
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                eventsSet={(events) => setCurrentEvents(events)}
                initialEvents={[
                  {
                    id: backendData.item,
                    // title: backendData.item[i].title,
                    // date: backendData.item[i].date,
                  },
                ]}
              />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
