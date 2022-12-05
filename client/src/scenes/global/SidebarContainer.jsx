import react, { useState } from 'react'
import { MenuItem } from 'react-pro-sidebar'
import List from '@mui/material/List'
import { Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'

import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { useAuth, logout } from '../../service/AuthContext'

const Item = ({ title, to, icon, selected, setSelected }) => {
    // const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            className="text-sm"
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography className="text-base-content font-poppins">
                {title}
            </Typography>
            <Link to={to} />
        </MenuItem>
    )
}

const SidebarContainer = (provider) => {
    const [selected, setSelected] = useState('Dashboard')
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    console.log(currentUser)

    const handleClick = () => {
        setOpen(!open)
    }

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <div className="border-0 bg-base-200">
            <div class="mt-4 w-64 mb-4">
                <h2 className=" pl-8 py-4 sidebar-menu-item font-bold text-lg">
                    Ultimate Dashboard
                </h2>
            </div>
            <aside class="w-64 rounded-md bg-neutral mt-4" aria-label="Sidebar">
                <div class="sidebar-menu-item">
                    <div className=" px-4 py-4 flex bg-neutral-focus">
                        {/* {currentUser.photoURL === null ? (
                            <AccountCircleIcon />
                        ) : ( */}
                        <img
                            className="w-12 rounded-full"
                            src={currentUser.photoURL}
                            alt="avatar"
                        />
                        {/* )} */}
                        <div className="ml-4">
                            <p className="text-base-content my-auto">
                                Welcome back,
                            </p>
                            <p className="text-base-content my-auto font-bold">
                                {/* {currentUser.displayName === 'undefined'
                                    ? ''
                                    : currentUser.displayName} */}
                                {currentUser.displayName}
                            </p>
                        </div>
                    </div>
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                        }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <Link to="/">
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </Link>
                        <h1 class="sidebar-break-heading">Data</h1>

                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Team" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link to="/team">
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary="Show team" />
                                    </ListItemButton>
                                </Link>
                            </List>
                            <List component="div" disablePadding>
                                <Link to="/form">
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary="Add a user" />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>
                        <Link to="/contacts">
                            <ListItemButton>
                                <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon>
                                <ListItemText primary="Contacts" />
                            </ListItemButton>
                        </Link>
                        <Link to="/invoices">
                            <ListItemButton>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Invoices" />
                            </ListItemButton>
                        </Link>
                        <h1 class="sidebar-break-heading">Pages</h1>
                        <Link to="/calendar">
                            <ListItemButton>
                                <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon>
                                <ListItemText primary="Calender" />
                            </ListItemButton>
                        </Link>
                        <Link to="/faq">
                            <ListItemButton>
                                <ListItemIcon>
                                    <LiveHelpIcon />
                                </ListItemIcon>
                                <ListItemText primary="Faq" />
                            </ListItemButton>
                        </Link>
                    </List>
                    <div className="absolute inset-x-0 bottom-0 w-64">
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sign out" />
                        </ListItemButton>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default SidebarContainer

{
    /* <Sidebar className="border-r-0 bg-base-300 ">
  <Menu className="bg-base-300 h-screen border-0" iconShape="square">



    <MenuItem
      onClick={() => collapseSidebar()}
      className="mx-2 my-4"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <h1 className="text-primary text-xl font-bold">
          DASHBOARD
        </h1>
        <IconButton>
          <MenuOutlinedIcon className="text-primary"/>
        </IconButton>
      </Box>
    </MenuItem>
    <Box>
      <Link to="/">
        <Item
          color="text-primary"
          title="Dashboard"
          className="bg-primary"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Link>
      <p className="text-lg font-semibold ml-5 my-4 text-secondary">
        Data
      </p>
      <Link to="/team">
        <Item
          // color={colors.grey[100]}
          title="Manage Team"
          icon={<PeopleOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Link>
      <Link to="/contacts">
        <Item
          title="Contacts Information"
          icon={<ContactsOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Link>
      <Link to="/invoices">
        <Item
          title="Invoices Balances"
          icon={<ReceiptOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Link>
      <p className="text-lg font-semibold ml-5 my-4 text-secondary">
        Pages
      </p>
      <Link to="/form">
        <Item
          title="Profile Form"
          icon={<PersonOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Link>
      <Link to="/calendar">
        <Item
          title="Calendar"
          icon={<CalendarTodayOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Link>
      <Link to="/faq">
        <Item
          title="FAQ Page"
          icon={<HelpOutlineOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Link>
      {/* <p className="text-lg font-semibold ml-5 my-4 text-secondary">
        Charts
      </p>
      <Link to="/bar">
        <Item
          title="Bar Chart"
          icon={<BarChartOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Link>
      <Link to="/pie">
        <Item
          title="Pie Chart"
          icon={<PieChartOutlineOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Link>
      <Link to="/line">
        <Item
          title="Line Chart"
          icon={<TimelineOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Link>
      <Link to="/geography">
        <Item
          title="Geography Chart"
          icon={<MapOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Link> */
}

{
    /*</Box>
  </Menu>
</Sidebar> */
}
