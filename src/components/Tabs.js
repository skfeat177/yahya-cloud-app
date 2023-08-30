import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab
              icon={<InsertDriveFileOutlinedIcon />}
              label={!isMobile ? 'Files' : ''}
              value="1"
              sx={{ fontSize: 12, minWidth: 0 }}
            />
            <Tab
              icon={<CodeOutlinedIcon />}
              label={!isMobile ? 'Code Snippets' : ''}
              value="3"
              sx={{ fontSize: 12, minWidth: 0 }}
            />
            <Tab
              icon={<TextSnippetOutlinedIcon />}
              label={!isMobile ? 'Text' : ''}
              value="4"
              sx={{ fontSize: 12, minWidth: 0 }}
            />
            <Tab
              icon={<LinkOutlinedIcon />}
              label={!isMobile ? 'Links' : ''}
              value="5"
              sx={{ fontSize: 12, minWidth: 0 }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item Four</TabPanel>
        <TabPanel value="5">Item Five</TabPanel>
      </TabContext>
    </Box>
  );
}
