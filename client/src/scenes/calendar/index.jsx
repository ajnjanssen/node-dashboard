import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Modal,
    Typography,
} from '@mui/material'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState([])
    const [eventTitle, setEventTitle] = useState('')
    const [event, setEvent] = useState('')
    const [openAdd, setOpenAdd] = useState(false)
    const [open, setOpen] = useState(false)
    const [currentSelected, setCurrentSelected] = useState([])
    const [currentSelectedTitle, setCurrentSelectedTitle] = useState([])
    const [newEventDate, setNewEventDate] = useState([])

    const [message, setMessage] = useState('')

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleOpenAdd = () => setOpenAdd(true)
    const handleCloseAdd = () => setOpenAdd(false)

    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
        fetch('/api')
            .then((response) => response.json())
            .then((data) => {
                setBackendData(data)
            })
    }, [])

    // updates the given message
    const handleChange = (event) => {
        setMessage(event.target.value)
        // setMessage(event.target.value);
        // console.log('value is:', event.target.value);
    }

    // Opens a modal to set a new event
    const handleDateClick = (selected) => {
        setMessage('')
        // the modal opens
        handleOpenAdd()
        // the title is dynamically set
        const title = message

        setNewEventDate(selected)
        // console.log(selected.start)

        // the selected date is set to the event
        // const calendarApi = selected.view.calendar;
        // if (title) {
        //   calendarApi.addEvent({
        //     id: `${selected.dateStr}-${title}`,
        //     title,
        //     start: selected.startStr,
        //     end: selected.endStr,
        //     allDay: selected.allDay,
        //   });

        // }

        // the select event is unselected
        // calendarApi.unselect();
        // close the modal
    }

    // function to set a new event
    const handleAddEvent = () => {
        const calendarApi = newEventDate.view.calendar
        if (message) {
            calendarApi.addEvent({
                id: `${newEventDate.dateStr}-${currentSelectedTitle}`,
                // id: newEventDate.message,
                message,
                start: newEventDate.startStr,
                end: newEventDate.endStr,
                allDay: newEventDate.allDay,
            })
            console.log(message)
            handleCloseAdd()
        }
        calendarApi.unselect()
    }

    // open existing event
    const handleEventClick = (selected) => {
        handleOpen()
        setCurrentSelected(selected)
        setCurrentSelectedTitle(
            selected.el.fcSeg.eventRange.def.extendedProps.message
        )
        // console.log(currentSelected);
        // console.log(currentSelectedTitle);
        console.log(selected.el.fcSeg.eventRange.def.extendedProps.message)
        // console.log(currentSelected);
    }

    // delete existing event
    const deleteEvent = (selected) => {
        setCurrentSelectedTitle(selected.title)
        setCurrentSelected(selected.id)
        currentSelected.event.remove()
        setMessage('')
        handleClose()
    }

    return (
        <Box className="m-5">
            <div className="pb-5">
                <h1 className="headTitle">CALENDAR</h1>
                <h3 className="underTitle">Full Calendar Interactive Page</h3>
            </div>
            <Box className="mt-6 flex space-between">
                <Box className="flex-[1_1_20%]  rounded-lg p-4 h-3/4 bg-neutral">
                    <p className="text-md font-bold text-base-content">
                        Events
                    </p>
                    <List>
                        {currentEvents.map((event) => (
                            <ListItem
                                className="bg-neutral-focus rounded-lg mb-2 p-2 mg-4"
                                key={event.id}
                            >
                                <div className="">
                                    <div>
                                        <p className="text-md font-bold text-secondary">
                                            {event.title}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-md font-bold text-base-content">
                                            {formatDate(event.start, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                {/* Modal Add Event */}
                <Modal
                    className="w-1/3 m-auto my-auto h-60 "
                    open={openAdd}
                    onClose={handleCloseAdd}
                >
                    <Box className=" rounded-lg p-4 shadow-lg bg-neutral">
                        <p
                            id="modal-modal-title"
                            className="text-base-content font-bold mb-6 text-xl"
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
                            <button
                                onClick={handleAddEvent}
                                className="btn btn-active btn-primary"
                            >
                                Add event
                            </button>
                        </Box>
                    </Box>
                </Modal>
                {/* Modal delete Event*/}
                <Modal
                    className="w-1/3 m-auto my-auto h-60 "
                    open={open}
                    onClose={handleClose}
                >
                    <Box className=" rounded-lg p-4 shadow-lg bg-neutral">
                        <div className="flex space-x-2">
                            <p className="text-base-content mb-6 text-xl">
                                Are you sure you want to delete{' '}
                            </p>
                            <p className="text-base-content px-2 font-bold mb-6 text-xl bg-error rounded-lg">
                                {currentSelectedTitle}?
                            </p>
                        </div>
                        <Box className="flex space-between p-1 rounded-sm">
                            <button
                                onClick={deleteEvent}
                                className="btn btn-active btn-primary"
                            >
                                Delete event
                            </button>
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
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
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
    )
}

export default Calendar
