
import { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';  // Add useLocation
import SLT from '../assets/SLT_logo.png';
import Dashboard from '../assets/dashboards.svg';
import Customer from '../assets/person.svg';
import Incident from '../assets/megaphone.svg';
import Report from '../assets/file.svg';
import Setting from '../assets/information.svg';

const drawerWidth = 240;

const SideBar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();  // Use this to track the current location

  // Sidebar items
  const items = [
    { text: 'Dashboard', src: Dashboard, path: '/dashboard' },
    { text: 'Incidents Management', src: Incident, path: '/incidentmain' },
    { text: 'Customer Feedback', src: Customer, path: '/feedback' },
    { text: 'Reports', src: Report, path: '/report' },
    { text: 'Settings', src: Setting, path: '/settings' },
  ];

  // Get active route on page load
  const getSelectedIndex = () => {
    return items.findIndex(item => item.path === location.pathname);
  };

  const [selectedIndex, setSelectedIndex] = useState(getSelectedIndex());

  useEffect(() => {
    // When the location changes, update the selectedIndex
    setSelectedIndex(getSelectedIndex());
  }, [location.pathname]);

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    navigate(path);
    toggleSidebar();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(to bottom, #0F407B, #24AF77)', // Gradient background
          color: 'white', // Ensure text color is white
        },
      }}
    >
      {/* Logo Section */}
      <Box
        component="img"
        src={SLT}
        alt="SLT Mobitel Logo"
        sx={{
          width: '250px',
          margin: '10px auto',
          display: 'block',
        }}
      />

      {/* Sidebar Items */}
      <List>
        {items.map((item, index) => (
            <ListItem
            key={item.text}
            button
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index, item.path)}
            sx={{
              color: selectedIndex === index ? 'white' : '#CCC',
              backgroundColor: selectedIndex === index ? '#485DFF' : 'transparent',
              padding: '10px 20px', // Adjust padding here for left and right spaces
              borderRadius: '10px', // Slightly reduce the border-radius
              margin: '4px auto', // Add auto to center it
              maxWidth: '200px', // Restrict the width of the highlighted item
              '&:hover': {
                backgroundColor: '#485DFF',
              },
            }}
          >
            <ListItemIcon sx={{ color: selectedIndex === index ? 'white' : '#CCC' }}>
              <img
                src={item.src}
                alt={`${item.text} icon`}
                style={{
                  width: '24px',
                  height: '24px',
                  filter: selectedIndex === index ? 'invert(1)' : 'none',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={<Typography sx={{ fontWeight: selectedIndex === index ? 'bold' : 'normal' }}>{item.text}</Typography>}
            />
          </ListItem>
                  
        //   <ListItem
        //     key={item.text}
        //     button
        //     selected={selectedIndex === index}
        //     onClick={() => handleListItemClick(index, item.path)}
        //     sx={{
        //       color: selectedIndex === index ? 'white' : '#CCC',
        //       backgroundColor: selectedIndex === index ? '#485DFF' : 'transparent',
        //       padding: '10px 5px',
        //       borderRadius: '15px',
        //       margin: '4px ',
        //       '&:hover': {
        //         backgroundColor: '#485DFF',
        //       },
        //     }}
        //   >
        //     <ListItemIcon sx={{ color: selectedIndex === index ? 'white' : '#CCC' }}>
        //       <img
        //         src={item.src}
        //         alt={`${item.text} icon`}
        //         style={{
        //           width: '24px',
        //           height: '24px',
        //           filter: selectedIndex === index ? 'invert(1)' : 'none',
        //         }}
        //       />
        //     </ListItemIcon>
        //     <ListItemText
        //       primary={<Typography sx={{ fontWeight: selectedIndex === index ? 'bold' : 'normal' }}>{item.text}</Typography>}
        //     />
        //   </ListItem>

        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
