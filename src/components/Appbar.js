import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ListItemIcon } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const navItems = [
  { label: 'Upload File', link:"/upload-file",icon: <InsertDriveFileOutlinedIcon /> },
  { label: 'Upload Code Snippet',link:"/upload-code", icon: <CodeOutlinedIcon /> },
  { label: 'Upload Text',link:"upload-text", icon: <TextSnippetOutlinedIcon /> },
  { label: 'Upload Link',link:"upload-link", icon: <LinkOutlinedIcon /> },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CloudQueueOutlinedIcon />
        <Typography variant="h6" sx={{ my: 2, color: "grey", marginLeft: 1 }}>
         Cloud Share
        </Typography>
      </Box>

      <Divider />
      <List>
        {navItems.map((item) => (
    <ListItem key={item.label} disablePadding>
    <Link to={item.link} style={{ textDecoration: 'none' }}>
      <ListItemButton sx={{ textAlign: 'left' }}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'grey', marginLeft: -2 } }} />
      </ListItemButton>
    </Link>
  </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" color='primary'>
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
          <Box sx={{ display: 'flex' , alignItems: 'center', justifyContent: 'center' }}>
            <CloudQueueOutlinedIcon />
            <Typography variant="h6" sx={{ my: 2, color: "white", marginLeft: 1 }}>
              Cloud Share
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex'},flex: 1, justifyContent: 'flex-end'  }}>
            {navItems.map((item) => (
                 <Link to={item.link} style={{ textDecoration: 'none' }}>
              <Button key={item.label} sx={{ color: '#fff', alignItems: 'center', marginRight: 2 }}>
                {React.cloneElement(item.icon, { sx: { fontSize: 20, marginRight: "5px", alignSelf: "center" } })}
                {item.label}
              </Button>
              </Link> 
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
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
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
