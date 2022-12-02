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

} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";


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
    setCurrentSelected(selected.id);
    console.log(currentSelected);
    // setCurrentSelectedTitle(selected.event.title);
    // console.log(currentSelectedTitle);
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
    <Box className="m-5">
      <div className="ml-6 ">
      <h1 className="text-primary text-6xl font-bold  uppercase">Calendar</h1>
      <h3 className="text-secondary text-2xl font-light">Full Calendar Interactive Page</h3>
      </div>
      <Box className="mt-6 flex space-between ml-6">
        <Box
          className="flex-[1_1_20%] border rounded-lg p-4 h-3/4"
        >
          <Typography className="text-md">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
              className="border rounded-lg mb-2 p-2 mg-4"
                key={event.id}
              >
                <ListItemText
                  className="text-md font-bold"
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
        <Modal className="w-1/3 m-auto my-auto h-60" open={openAdd} onClose={handleCloseAdd}>
          <Box className="bg-white rounded-lg p-4 shadow-lg">
            <p
              id="modal-modal-title"
              className="font-bold mb-6 text-xl"
            >
              Add a new event
            </p>
            <input
              type="text"
              onChange={handleChange}
              value={message}
              className="mb-6 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="message"
              name="message"
              placeholder="Describe the event"
            />
            <Box className="flex space-between rounded-sm">
              <Button onClick={handleDateClick} color="success" variant="outlined">
              Add event
            </Button>
            </Box>
          </Box>
        </Modal>
        {/* Modal delete Event*/}
        <Modal open={open} onClose={handleClose}>
          <Box>
            <Typography
              id="modal-modal-title"
              className="bold"
              variant="h4"
              component="h2"
            >
              Are you sure you want to delete {currentSelectedTitle}?
            </Typography>
            <Box
             className="flex space-between p-1 rounded-sm"
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
        <Box className="flex-[1_1_100%] ml-6">
          {/* {typeof backendData.mockAgendaItems === "undefined" ? (
            <p>loading...</p>
          ) : (
            backendData.mockAgendaItems.map((item, i) => ( */}
              <FullCalendar
                height="70vh"
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
                  },
                ]}
              />
            {/* ))
          )} */}
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
