import { Box, Typography, Button, Tooltip, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import React, { useState } from 'react'
import { useLoader } from '@react-three/fiber'
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BluetoothSearchingIcon from '@mui/icons-material/BluetoothSearching';
import DashBoard from './page_contents/dashboard';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HeartPage from './page_contents/heart-page';
import PositionPage from './page_contents/position-page';
import ForcePage from './page_contents/force-page';
const HEART_BPM_DATA = "heart_bpm"
const POSITIONAL_DATA = "position"
const FORCE_DATA = "force"
const QUATERNION_DATA = "quaternion"
const drawerWidth = 240;
const topBarHeight = 80;
const DASHBOARD_CONTENT = "dashboard"
const HEART_CONTENT = "heart"
const POSITION_CONTENT = "position"
const FORCE_CONTENT = "force"

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#112235',
    },
    secondary: {
      main: '#0b5394',
    },
    background: {
      default: '#ffffff',
      paper: '#172e48',
    },
  },
});

function App(props) {

  const objLeft = useLoader(OBJLoader, "/assets/pole_down_scaled_left.obj");
  const objRight = useLoader(OBJLoader, "/assets/pole_down_scaled_right.obj");
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [leftQuaternionData, setLeftQuaternionData] = useState([0, 0, 0, 0]);
  const [leftPositionalData, setLeftPositionalData] = useState({ count: [0], data: [0] });
  const [leftForceData, setLeftForceData] = useState({ count: [0], data: [0] });
  let currentdateRoot = new Date();
  let currentDayMillisecondsRoot = (parseInt(currentdateRoot.getHours()) * 3600000) + (parseInt(currentdateRoot.getMinutes()) * 60000) + (parseInt(currentdateRoot.getSeconds()) * 1000) + (parseInt(currentdateRoot.getMilliseconds()))
  const [leftHeartBPMData, setLeftHeartBPMData] = useState({ time: [currentDayMillisecondsRoot], bpm: [0] });
  let leftPositionalDataSet = { count: [0], data: [0] }
  const leftPositionalDataSetMaxLen = 20
  let leftForceDataSet = { count: [0], data: [0] }
  const leftForceDataSetMaxLen = 20
  let leftHeartBPMDataSet = { time: [currentDayMillisecondsRoot], bpm: [0] }
  const leftHeartBPMDataSetMaxLen = 20

  function handleChangedValueLeftSide(event) {
    let value = new TextDecoder().decode(event.target.value);
    let bt_data = JSON.parse(value)
    if (POSITIONAL_DATA in bt_data && FORCE_DATA in bt_data) {
      setLeftQuaternionData(bt_data[POSITIONAL_DATA][QUATERNION_DATA]) //for updating webgl view      
      leftPositionalDataSet.data.push(bt_data[POSITIONAL_DATA])
      leftPositionalDataSet.count.push(leftPositionalDataSet.count.at(-1) + 1)
      leftForceDataSet.data.push(bt_data[FORCE_DATA])
      leftForceDataSet.count.push(leftForceDataSet.count.at(-1) + 1)
      if (leftPositionalDataSet.data.length > leftPositionalDataSetMaxLen) {
        leftPositionalDataSet.data.shift() // Pop front
        leftPositionalDataSet.count.shift()
      }
      setLeftPositionalData(leftPositionalDataSet) // for updating raw data view
      if (leftForceDataSet.data.length > leftForceDataSetMaxLen) {
        leftForceDataSet.data.shift() // Pop front    
        leftForceDataSet.count.shift() // Pop front 
      }
      setLeftForceData(leftForceDataSet) // for updating 
    } else if (HEART_BPM_DATA in bt_data) {
      let currentdate = new Date();
      let currentDayMilliseconds = (parseInt(currentdate.getHours()) * 3600000) + (parseInt(currentdate.getMinutes()) * 60000) + (parseInt(currentdate.getSeconds()) * 1000) + (parseInt(currentdate.getMilliseconds()))
      leftHeartBPMDataSet.bpm.push(bt_data[HEART_BPM_DATA])
      leftHeartBPMDataSet.time.push(currentDayMilliseconds)
      if (leftHeartBPMDataSet.bpm.length > leftHeartBPMDataSetMaxLen) {
        leftHeartBPMDataSet.bpm.shift() // Pop front    
        leftHeartBPMDataSet.time.shift() // Pop front 
      }
      setLeftHeartBPMData(leftHeartBPMDataSet)
    }
  }

  async function connectLeftSideBluetooth() { //the side with the heart
    const device = await navigator.bluetooth.requestDevice({ filters: [{ services: ['51ad213f-e568-4e35-84e4-67af89c79ef0'] }] })
    const server = await device.gatt.connect()
    const service = await server.getPrimaryService('51ad213f-e568-4e35-84e4-67af89c79ef0')
    const char = await service.getCharacteristic('528ff74b-fdb8-444c-9c64-3dd5da4135ae')
    await char.addEventListener('characteristicvaluechanged', handleChangedValueLeftSide)
    await char.startNotifications()
    console.log("the name of the left side pole is: " + device) //BluetoothDevice
    console.log('Getting server... ' + server) //BluetoothRemoteGATTServer
    console.log('Getting service... ' + service) //BluetoothRemoteGATTService
    console.log('Getting char... ' + char) //BluetoothRemoteGATTCharacteristic
  }

  const [rightQuaternionData, setRightQuaternionData] = useState([0, 0, 0, 0]);
  const [rightPositionalData, setRightPositionalData] = useState({ count: [0], data: [0] });
  const [rightForceData, setRightForceData] = useState({ count: [0], data: [0] });
  let rightPositionalDataSet = { count: [0], data: [0] }
  const rightPositionalDataSetMaxLen = 20
  let rightForceDataSet = { count: [0], data: [0] }
  const rightForceDataSetMaxLen = 20
  function handleChangedValueRightSide(event) {
    let value = new TextDecoder().decode(event.target.value);
    let bt_data = JSON.parse(value)
    if (POSITIONAL_DATA in bt_data && FORCE_DATA in bt_data) {
      setRightQuaternionData(bt_data[POSITIONAL_DATA][QUATERNION_DATA]) //for updating webgl view      
      rightPositionalDataSet.data.push(bt_data[POSITIONAL_DATA])
      rightPositionalDataSet.count.push(rightPositionalDataSet.count.at(-1) + 1)
      rightForceDataSet.data.push(bt_data[FORCE_DATA])
      rightForceDataSet.count.push(rightForceDataSet.count.at(-1) + 1)
      if (rightPositionalDataSet.data.length > rightPositionalDataSetMaxLen) {
        rightPositionalDataSet.data.shift() // Pop front
        rightPositionalDataSet.count.shift()
      }
      setRightPositionalData(rightPositionalDataSet) // for updating raw data view
      if (rightForceDataSet.data.length > rightForceDataSetMaxLen) {
        rightForceDataSet.data.shift() // Pop front    
        rightForceDataSet.count.shift() // Pop front 
      }
      setRightForceData(rightForceDataSet) // for updating 
    }
  }
  async function connectRightSideBluetooth() {
    const device = await navigator.bluetooth.requestDevice({ filters: [{ services: ['419096de-e4e9-11ed-b5ea-0242ac120002'] }] })
    const server = await device.gatt.connect()
    const service = await server.getPrimaryService('419096de-e4e9-11ed-b5ea-0242ac120002')
    const char = await service.getCharacteristic('569375ce-e4e9-11ed-b5ea-0242ac120002')
    await char.addEventListener('characteristicvaluechanged', handleChangedValueRightSide)
    await char.startNotifications()
    console.log("the name of the right side pole is: " + device) //BluetoothDevice
    console.log('Getting server... ' + server) //BluetoothRemoteGATTServer
    console.log('Getting service... ' + service) //BluetoothRemoteGATTService
    console.log('Getting char... ' + char) //BluetoothRemoteGATTCharacteristic
  }


  const container = window !== undefined ? () => window().document.body : undefined;

  const viewSwitch = () => {
    let showContent=(<></>)
    switch (currentView) {
      case DASHBOARD_CONTENT:
        showContent= (<DashBoard objLeft={objLeft} objRight={objRight} leftQuaternionData={leftQuaternionData} rightQuaternionData={rightQuaternionData} leftForceData={leftForceData} rightForceData={rightForceData} leftHeartBPMData={leftHeartBPMData} />)
        break;
      case HEART_CONTENT:
        showContent=  (<HeartPage leftHeartBPMData={leftHeartBPMData} />)
        break;
      case POSITION_CONTENT:
        showContent=  (<PositionPage objLeft={objLeft} objRight={objRight} leftQuaternionData={leftQuaternionData} rightQuaternionData={rightQuaternionData} leftPositionalData={leftPositionalData} rightPositionalData={rightPositionalData} />)
        break;
      case FORCE_CONTENT:
        showContent=  (<ForcePage leftForceData={leftForceData} rightForceData={rightForceData} />)
        break;
      default:
        showContent=  (<DashBoard objLeft={objLeft} objRight={objRight} leftQuaternionData={leftQuaternionData} rightQuaternionData={rightQuaternionData} leftForceData={leftForceData} rightForceData={rightForceData} leftHeartBPMData={leftHeartBPMData} />)
    }
    return showContent
  }

  const [currentView, setCurrentView] = useState(DASHBOARD_CONTENT);

  const handleDashBoardContentClick = () => {
    setCurrentView(DASHBOARD_CONTENT)
  }

  const handleHeartContentClick = () => {
    setCurrentView(HEART_CONTENT)
  }

  const handlePositionContentClick = () => {
    setCurrentView(POSITION_CONTENT)
  }

  const handleForceContentClick = () => {
    setCurrentView(FORCE_CONTENT)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Smart Nordic Walking
            </Typography>
            <div>
              <Tooltip title="Connect to the left side of the walking pole, will only scan for comptible devices">
                <Button onClick={connectLeftSideBluetooth} sx={{
                  color: "white", textTransform: "none", ":hover": {
                    bgcolor: "#182e46"
                  }
                }}>          <Typography variant="subtitle1" >

                    Connect Left Pole</Typography><BluetoothSearchingIcon /></Button></Tooltip>
              <Tooltip title="Connect to the left side of the walking pole, will only scan for comptible devices">
                <Button onClick={connectRightSideBluetooth} sx={{
                  color: "white", textTransform: "none", ":hover": {
                    bgcolor: "#182e46"
                  }
                }}>          <Typography variant="subtitle1" >

                    Connect Right Pole</Typography><BluetoothSearchingIcon /></Button></Tooltip>
            </div>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <Box sx={{ p: 3 }}>
            </Box>
            <List>
              <ListItem key="DashBoard" >
                <ListItemButton onClick={handleDashBoardContentClick} sx={{
                  ":hover": {
                    bgcolor: "#1f3a5a"
                  }
                }}>
                  <NordicWalkingIcon color="disabled" />
                  <ListItemText sx={{ pl: 1 }} primary="DashBoard" color="disabled" />
                </ListItemButton >
              </ListItem>
              <ListItem key="Heart" >

                <ListItemButton onClick={handleHeartContentClick} sx={{
                  ":hover": {
                    bgcolor: "#1f3a5a"
                  }
                }}>
                  <FavoriteBorderIcon color="disabled" />
                  <ListItemText sx={{ pl: 1 }} primary="Heart" color="disabled" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Position" >
                <ListItemButton onClick={handlePositionContentClick} sx={{
                  ":hover": {
                    bgcolor: "#1f3a5a"
                  }
                }}>
                  <ThreeSixtyIcon color="disabled" />
                  <ListItemText sx={{ pl: 1 }} primary="Position" color="disabled" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Force"  >
                <ListItemButton onClick={handleForceContentClick} sx={{
                  ":hover": {
                    bgcolor: "#1f3a5a"
                  }
                }}>
                  <FitnessCenterIcon color="disabled" />
                  <ListItemText sx={{ pl: 1 }} primary="Force" color="disabled" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
        </Box>
        <Box

          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, pt: `${topBarHeight}px` }}
        >
          {viewSwitch()}
        </Box>
      </Box>
    </ThemeProvider>


  );
}

export default App;
