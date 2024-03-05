// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import { Box, Container, Divider, Grid, Typography, Card, CardContent, Button, Tooltip } from '@mui/material'
// import { useEffect } from 'react'

import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
// const inter = Inter({ subsets: ['latin'] })
// BATTERY STUFF
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import Battery20Icon from '@mui/icons-material/Battery20';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery60Icon from '@mui/icons-material/Battery60';
import Battery80Icon from '@mui/icons-material/Battery80';
import Battery90Icon from '@mui/icons-material/Battery90';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';

import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import BatteryCharging30Icon from '@mui/icons-material/BatteryCharging30';
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50';
import BatteryCharging60Icon from '@mui/icons-material/BatteryCharging60';
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80';
import BatteryCharging90Icon from '@mui/icons-material/BatteryCharging90';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
// END OF BATTERY STUFF
// import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import { createRoot } from 'react-dom/client'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
// import { ObjectLoader } from 'three'

import { PerspectiveCamera, TrackballControls, useAspect } from '@react-three/drei'
import { StatusCard } from './components/status-card';
import { Camera } from 'three';

//////IMPORT FOR BAR
// import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BluetoothSearchingIcon from '@mui/icons-material/BluetoothSearching';
// import { Container, Menu, MenuItem, Tooltip, Button  } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
// import Tooltip from '@mui/material/Tooltip';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
const drawerWidth = 240;
const topBarHeight=80;

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

/////END OF IMPORT FOR BAR

function App(props) {

  const [position, setPosition] = useState([5, 5, 5])
  console.log(props.something)
  function Foo() {
    // const camera = useThree(state => state.camera)
    useThree(({camera}) => {
      camera.position.x=position[0];
      camera.position.y=position[1];
      camera.position.z=position[2];
      camera.lookAt(0, 0, 0);
    });
  }
//   const Camera = (props) => {
//     const ref = useRef();
//     const set = useThree((state) => state.set);
//     useEffect(() => void set({ camera: ref.current }), []);
//     useFrame(() => ref.current.updateMatrixWorld());
//     return <perspectiveCamera ref={ref} {...props} />;
//   };

  
// function CameraRig({ position: [x, y, z] }) {
//   useFrame((state) => {
//     // state.camera.position.lerp({ x, y, z }, 0.1)
//     state.camera.lookAt(0, 0, 0)
//   })
// }
  let xaxis=['January', 'February', 'March', 'April', 'May', 'June', 'July']
let yaxis1=[65, 59, 80, 81, 56, 55, 40]
let yaxis2=[55, 49, 70, 71, 46, 45, 90]

function batteryStatus(currentLevel, isCharging){  
  if (currentLevel <20 ){
    return isCharging?(<BatteryCharging20Icon/>):(<BatteryAlertIcon/>)
  }else if(currentLevel <30){
    return isCharging?(<BatteryCharging20Icon/>):(<Battery20Icon/>)
  }else if(currentLevel <50){
    return isCharging?(<BatteryCharging30Icon/>):(<Battery30Icon/>)
  }else if(currentLevel <60){
    return isCharging?(<BatteryCharging50Icon/>):(<Battery50Icon/>)
  }else if(currentLevel <80){
    return isCharging?(<BatteryCharging60Icon/>):(<Battery60Icon/>)
  }else if(currentLevel <90){
    return isCharging?(<BatteryCharging80Icon/>):(<Battery80Icon/>)
  }else if(currentLevel <95){
    return isCharging?(<BatteryCharging90Icon/>):(<Battery90Icon/>)
  }else{
    return isCharging?(<BatteryChargingFullIcon/>):(<BatteryFullIcon/>)
  }
}
  // useEffect(()=>{
  //   document.cookie = JSON.stringify(currentUser)
  // })

  // const scale = useAspect(
  //   1024,                     // Pixel-width
  //   512,                      // Pixel-height
  //   1                         // Optional scaling factor
  // )
  const obj = useLoader(OBJLoader, "/assets/Poimandres.obj");
  const data = {
    labels: xaxis,
    datasets: [
      {
        label: 'Heart Rate1',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: yaxis1
      },
      {
        label: 'Heart Rate2',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,40,145,0.4)',
        borderColor: 'rgba(255,40,145,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,104,177,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,40,145,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: yaxis2
      }
    ]
  };
  
  ////////////START OF BAR STUFF?
  const { window, children,Component, pageProps } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  // const connectLeftSideBluetooth = async () =>{
  //   await navigator.bluetooth.requestDevice({
  //     filters:[{
  //       services:['cf69d05e-dd02-11ed-afa1-0242ac120002' ]
  //     } ]
  //   })
  // }

  async function connectLeftSideBluetooth() {

    // const device = await navigator.bluetooth.requestDevice({ acceptAllDevices:true})
    const device = await navigator.bluetooth.requestDevice({filters: [{services: ['51ad213f-e568-4e35-84e4-67af89c79ef0']}]})
    const server = await device.gatt.connect()
    const service = await server.getPrimaryService('51ad213f-e568-4e35-84e4-67af89c79ef0')
    const char = await service.getCharacteristic('528ff74b-fdb8-444c-9c64-3dd5da4135ae')
    // await char.addEventListener('characteristicvaluechanged', handleChangedValue)
    await char.startNotifications()
    console.log("the name of the device is: "+device) //BluetoothDevice
    console.log('Getting server... '+server) //BluetoothRemoteGATTServer
    console.log('Getting service... '+service) //BluetoothRemoteGATTService
    console.log('Getting char... '+char) //BluetoothRemoteGATTCharacteristic
  }
  const connectRightSideBluetooth = async () =>{
    await navigator.bluetooth.requestDevice({
      filters:[{
        services:['cf69d05e-dd02-11ed-afa1-0242ac120002' ]
      } ]
    })
  }

  // if currentUser then show all options
  // else if currentUser not connected prompt login/sighnup

  const drawer = (
    <div>
      {/* MY LOGO
      {currentUser.login} */}

          <Box sx={{ p: 3 } }

          >
            {/* <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />

              </a>

            </NextLink> */}
            {/* <Container

                   >
                                <Container
                   alignItems="center"
                   justifyContent="center"
                   
                   >
            <Image
            src="/logo_color.png"
            alt="Logo"
            sx={{ width: '100%', height: '100%', flexShrink: 0 }}
            
            />
            </Container>
            </Container> */}
            
            {/* <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nordic Walking
          </Typography> */}
          </Box>

      
      <List>
      <ListItem key="DashBoard" >
      <Tooltip title="Page not visible until both sides of nordic walking pole devices are connected via bluetooth">
            <ListItemButton   sx={{
    ":hover": {
      bgcolor: "#1f3a5a"
    }
  }}>
              <NordicWalkingIcon color="disabled" />
              <ListItemText sx={{ pl: 1 }} primary="DashBoard" color="disabled"  />
            </ListItemButton >
            </Tooltip>
          </ListItem>
          <ListItem key="Heart" >
          <Tooltip title="Page not visible until both sides of nordic walking pole devices are connected via bluetooth">

            <ListItemButton sx={{
    ":hover": {
      bgcolor: "#1f3a5a"
    }
  }}>
              <FavoriteBorderIcon color="disabled" />
              <ListItemText sx={{ pl: 1 }} primary="Heart" color="disabled" />
            </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem key="Position" >
          <Tooltip title="Page not visible until both sides of nordic walking pole devices are connected via bluetooth">

            <ListItemButton sx={{
    ":hover": {
      bgcolor: "#1f3a5a"
    }
  }}>
              <ThreeSixtyIcon color="disabled" />
              <ListItemText sx={{ pl: 1 }} primary="Position" color="disabled"  />
            </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem key="Force"  >
          <Tooltip title="Page not visible until both sides of nordic walking pole devices are connected via bluetooth">
            <ListItemButton sx={{
    ":hover": {
      bgcolor: "#1f3a5a"
    }
  }}>
              <FitnessCenterIcon color="disabled" />
              <ListItemText sx={{ pl: 1 }} primary="Force" color="disabled" />
            </ListItemButton>
            </Tooltip>
          </ListItem>
          
        {/* {['DashBoard', 'Heart Rate', 'Position', 'Force' ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
          {/* <Typography variant="h6" noWrap component="div">
            
          </Typography> */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Nordic Walking
          </Typography>
          <div>
          <Tooltip title="Connect to the left side of the walking pole, will only scan for comptible devices">

          <Button onClick={connectLeftSideBluetooth} sx={{color:"white",textTransform: "none",":hover": {
      bgcolor: "#182e46"
    } }}>          <Typography variant="subtitle1" >
                          
          Connect Left Pole</Typography><BluetoothSearchingIcon  /></Button></Tooltip>
          <Tooltip title="Connect to the left side of the walking pole, will only scan for comptible devices">

<Button onClick={connectLeftSideBluetooth} sx={{color:"white",textTransform: "none",":hover": {
bgcolor: "#182e46"
} }}>          <Typography variant="subtitle1" >
                
Connect Left Pole</Typography><BluetoothSearchingIcon  /></Button></Tooltip>
          {/* <Tooltip title="Connect to the left side of the walking pole, will only scan for comptible devices">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={connectLeftSideBluetooth}
                color="inherit"
                sx={{
                  ":hover": {
                    bgcolor: "white"
                  }
                }}
              >
          <Typography variant="subtitle1" >
                          Connect Left Pole
          </Typography>
                <BluetoothSearchingIcon/>
                
              </IconButton>
              </Tooltip>

              <Tooltip title="Connect to the right side of the walking pole, will only scan for comptible devices"></Tooltip>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={connectRightSideBluetooth}
                color="inherit"
              >
              <Typography variant="subtitle1" >
                          Connect Right Pole
          </Typography>
          <BluetoothSearchingIcon  />
          
              </IconButton> */}
              {/* </Tooltip> */}
              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu> */}
            </div>



        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` },pt: `${topBarHeight}px` }}
      >
        {/* <Component currentUser={currentUser} {...pageProps}/> */}
        {/* {children} */}

  {/* //////////////END OF BAR STUFF */}
  <>


  {/* <form onSubmit={handleSubmit} >
    <label for="username">username:</label>
    <input type="text" id="username" name="username" />
    <label for="password">password:</label>
    <input type="text" id="password" name="password" />
    <button type="submit">Submit</button>
  </form> */}



{/* <Divider textAlign="left">Heart Rate</Divider>
  <Grid container spacing={2}>
  <Grid item xs={6} md={8}>
  <StatusCard/>
  </Grid>
  <Grid item xs={6} md={4}>
  <StatusCard/>
  </Grid>
</Grid>

<Divider textAlign="left"><h2>Force</h2></Divider>

<Grid container spacing={2}>
<Grid item xs={6} md={4}>
  <StatusCard/>
  </Grid>
  <Grid item xs={6} md={8}>
  <StatusCard/>
  </Grid>
</Grid> */}
            {/* <Image
        src="/logo_color.png"
        alt="Logo"
        sx={{ width: '100%', height: '100%', flexShrink: 0 }}
        
        /> */}

<Card  sx={{ height: '35%' }}>
<CardContent sx={{ height: '100%' }}>
<Canvas >
{/* <PerspectiveCamera   position={[5, 5, 5]}> */}
<Foo/>
<pointLight position={[10, 10, 10]} />
<gridHelper />
<axesHelper />
<TrackballControls makeDefault/>
<mesh>
  {/* <sphereGeometry /> */}
  <primitive object={obj} />
  <meshStandardMaterial color="hotpink" />

</mesh>
{/* </PerspectiveCamera> */}
</Canvas>
<Button onClick={() => setPosition([5,5,5])}>click</Button>
</CardContent>
</Card>

<Card
sx={{ width: '100%', backgroundColor: "white" }}
// {...props}
>
<CardContent>
  {/* <Grid
    container
    spacing={3}
    sx={{ justifyContent: 'space-between' }}
  >
    <Grid item>
      <Typography
        color="textSecondary"
        gutterBottom
        variant="overline"
      >
        BUDGET
      </Typography>
      <Typography
        color="textPrimary"
        variant="h4"
      >
        $24k
      </Typography>
    </Grid>
    <Grid item>
      <Avatar
        sx={{
          backgroundColor: 'error.main',
          height: 56,
          width: 56
        }}
      >
        <MoneyIcon />
      </Avatar>
    </Grid>
  </Grid> */}
  {/* <Box
    sx={{
      pt: 2,
      display: 'flex',
      alignItems: 'center'
    }}
  > */}
Bpm
<Line
  data={data}
  // sx={{ width: '100%', pr:5 }}
  // width={400}
  // height={400}
/>
  {/* </Box> */}
</CardContent>
</Card>

<StatusCard/>



</>
</Box>
    </Box>
    </ThemeProvider>
 

  );
}

export default App;
