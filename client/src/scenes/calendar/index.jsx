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
import react, { useEffect, useState, useInput } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { setNestedObjectValues } from "formik";

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
  const [event, setEvent] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentSelected, setCurrentSelected] = useState([]);
  const [currentSelectedTitle, setCurrentSelectedTitle] = useState([]);

  const [message, setMessage] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

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
    handleOpenAdd();
     const title = message;
     const calendarApi = selected.view.calendar;

    console.log(title);
    // console.log(selected);
    // calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
      calendarApi.unselect();
    }
  };

  const handleEventClick = (selected) => {
    handleOpen();
    setCurrentSelected(selected);
    setCurrentSelectedTitle(selected.event.title);
    console.log(currentSelectedTitle);
  };

  const deleteEvent = () => {
    currentSelected.event.remove();
    handleClose();
  };

  const handleChange = event => {
    setMessage(event.target.value);
    // console.log('value is:', event.target.value);
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
        {/* Modal Add Event */}
        <Modal open={openAdd} onClose={handleCloseAdd}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              className="bold"
              variant="h4"
              component="h2"
            >
              Event Title
            </Typography>
            <input
              type="text"
              onChange={handleChange}
              value={message}
              class="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
              id="message"
              name="message"
              placeholder="Describe the event"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <Button onClick={handleDateClick} color="success" variant="outlined">
              Add event
            </Button>
            </Box>
          </Box>
        </Modal>
        {/* Modal delete Event*/}
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              className="bold"
              variant="h4"
              component="h2"
            >
              Are you sure you want to delete {currentSelectedTitle}?
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
