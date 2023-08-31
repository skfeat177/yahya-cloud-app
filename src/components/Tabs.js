import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

export default function Tabs() {
  const navigate = useNavigate();
  const [value, setValue] = useState('/files'); // Initialize the value state

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the selected tab value
    navigate(newValue); // Navigate to the selected tab
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels ={true}
        sx={{ borderTop: 1, borderColor: 'divider' }}
      >
        <BottomNavigationAction
          label={'Files'}
          value="/files"
          icon={<InsertDriveFileOutlinedIcon />}
          sx={{ fontSize: 12, minWidth: 0 }}
        />
        <BottomNavigationAction
          label={'Code'}
          value="/code"
          icon={<CodeOutlinedIcon />}
          sx={{ fontSize: 12, minWidth: 0 }}
        />
        <BottomNavigationAction
          label={'Text'}
          value="/text"
          icon={<TextSnippetOutlinedIcon />}
          sx={{ fontSize: 12, minWidth: 0 }}
        />
        <BottomNavigationAction
          label={'Links'}
          value="/link"
          icon={<LinkOutlinedIcon />}
          sx={{ fontSize: 12, minWidth: 0 }}
        />
      </BottomNavigation>
    </Box>
  );
}