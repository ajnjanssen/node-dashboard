import { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
// import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  // const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      className="text-sm"
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="text-base-content font-poppins">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarContainer = () => {
  const [selected, setSelected] = useState("Dashboard");
  const { collapseSidebar } = useProSidebar();

  return (
    <div className="border-0 bg-base-200 p-4 " >
      <div class="w-64 mb-4 rounded-md bg-base-300">
        <h2 className=" pl-8 sidebar-menu-item font-bold text-lg">Ultimate Dashboard</h2>
      </div>
      <aside class="w-64 rounded-md bg-base-300" aria-label="Sidebar">
        <div class="sidebar-menu-item">
          <ul class="sidebar-ul-menu-item">
            <Link to="/">
            <li>
                <a href="#" class="sidebar-a-menu-item">
                  <HomeOutlinedIcon />
                  <span class="ml-3">Dashboard</span>
                </a>
            </li>
            </Link>
          </ul>
            <h1 class="sidebar-break-heading">
                Data
            </h1>
            <ul class="sidebar-ul-menu-item">
            <Link to="/team">
            <li className="mb-2">
              <a href="#" class="sidebar-a-menu-item">
                <PeopleOutlinedIcon />
                <span class="ml-3">Team</span>
                </a>
            </li>
            </Link>
            <Link to="/contacts">
            <li className="mb-2">
              <a href="#" class="sidebar-a-menu-item">
                <ContactsOutlinedIcon />
                <span class="ml-3">Contacts</span>
              </a>
            </li>
            </Link>
            <Link to="/invoices">
            <li className="mb-2">
              <a href="#" class="sidebar-a-menu-item">
                <ReceiptOutlinedIcon />
                <span class="ml-3">Invoices</span>
              </a>
            </li>
            </Link>

            <h1 class="sidebar-break-heading">
                Pages
            </h1>

            <Link to="/form">
            <li className="mb-2">
              <a href="#" class="sidebar-a-menu-item">
                <PersonOutlinedIcon />
                <span class="ml-3">Form</span>
              </a>
            </li>
            </Link>
            <Link to="/calendar">
            <li className="mb-2">
              <a href="#" class="sidebar-a-menu-item">
                <CalendarTodayOutlinedIcon />
                <span class="ml-3">Calendar</span>
              </a>
            </li>
            </Link>
            <Link to="/faq">
            <li className="mb-2">
              <a href="#" class="sidebar-a-menu-item">
                <HelpOutlineOutlinedIcon />
                <span class="ml-3">FAQ</span>
              </a>
            </li>
            </Link>
          </ul>
        </div>
      </aside>
      <Link>
        <div class="w-64 mt-4 mb-4 bg-base-300 flex items-center text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-error">
          <LogoutIcon className="ml-6 text-base-content"/>
          <h2 className="pl-2 py-2 text-lg">sign out</h2>
        </div>
      </Link>
    </div>

  );
};

export default SidebarContainer;

{/* <Sidebar className="border-r-0 bg-base-300 ">
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
      </Link> */}


    {/*</Box>
  </Menu>
</Sidebar> */}