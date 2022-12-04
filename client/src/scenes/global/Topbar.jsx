import { Box, IconButton} from '@mui/material'
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';

const Topbar = () => {
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box
            display="flex"
            // backgroundColor={colors.primary[400]}
            borderRadius="3px"
          >
          <input type="text" placeholder="Type here" className="bg-base-300 input w-full max-w-xs text-base-content placeholder-base" />


            <IconButton className="w-12 p-2" type="button">
              <SearchIcon className="text-base-content"/>
            </IconButton>

          </Box>
          <Box display="flex">
            {/* <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton> */}
            <IconButton>
              <NotificationsOutlinedIcon className="text-base-content"/>
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon className="text-base-content"/>
            </IconButton>
            <IconButton>
              <PersonOutlinedIcon className="text-base-content"/>
            </IconButton>
          </Box>
        </Box>
    )
  }

  export default Topbar