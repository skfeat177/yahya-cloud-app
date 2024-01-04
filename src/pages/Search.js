import React, { useState ,useRef,useEffect} from 'react';
import {
  Box,
  TextField,
  Select,
  Button,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  Typography,
  CardActions,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Add missing import
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'; // Add missing import
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'; // Add missing import
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import JavascriptIcon from '@mui/icons-material/Javascript';
import CssIcon from '@mui/icons-material/Css';
import HtmlIcon from '@mui/icons-material/Html';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import PhpIcon from '@mui/icons-material/Php';
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'; // Add missing import
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useNavigate } from 'react-router-dom';

function Search() {



  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('code');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [autoFocus, setAutoFocus] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const getIconForFileType = (fileType) => {
    if (fileType.startsWith('image/')) {
      return <ImageOutlinedIcon sx={{ fontSize: 65 }} />;
    } else if (fileType === 'application/pdf') {
      return <PictureAsPdfOutlinedIcon sx={{ fontSize: 65 }} />;
    } else if (fileType.startsWith('video/')) {
      return <MovieOutlinedIcon sx={{ fontSize: 65 }} />;
    } else if (fileType.startsWith('audio/')) {
      return <MusicNoteOutlinedIcon sx={{ fontSize: 65 }} />;
    } else if (fileType === 'text/javascript') {
      return <JavascriptIcon sx={{ fontSize: 65 }} />;
    } else if (fileType === 'text/css') {
      return <CssIcon sx={{ fontSize: 65 }} />;
    } else if (fileType === 'text/html') {
      return <HtmlIcon sx={{ fontSize: 65 }} />;
    } else if (fileType === 'text/java') {
      return <CodeOutlinedIcon sx={{ fontSize: 65 }} />;
    } else if (fileType === 'text/python') {
      return <CodeOutlinedIcon sx={{ fontSize: 65 }} />;
    } else if (fileType === 'text/cpp' || fileType === 'text/c') {
      return <CodeOutlinedIcon sx={{ fontSize: 65 }} />;
    } else if (fileType === 'text/php') {
      return <PhpIcon sx={{ fontSize: 65 }} />;
    } else if (fileType === 'application/x-zip-compressed') {
      return <FolderZipOutlinedIcon sx={{ fontSize: 65 }} />;
    } else {
      return <InsertDriveFileOutlinedIcon sx={{ fontSize: 65 }} />;
    }
  };
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setSearchResults([]); // Clear previous results
    let apiUrl = '';
    if (searchType === 'file') {
      apiUrl = `https://my-yahya-cloud-server.vercel.app/searchfile?name=${searchQuery}`;
    } else {
      apiUrl = `https://my-yahya-cloud-server.vercel.app/searchdata?name=${searchQuery}&type=${searchType}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setSearchResults([]); // Clear the results in case of an error
        setLoading(false);
      });
  };

  let messageToDisplay = null;
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Kolkata',
    hour12: true,
  };
  const copyToClipboard = (content) => {
    const textArea = document.createElement('textarea');
    textArea.value = content; // Do not remove newline characters
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  
    setSnackbarMessage('Copied to clipboard.');
    setSnackbarOpen(true);
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://my-yahya-cloud-server.vercel.app/deletedata?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSnackbarMessage('Deleted successfully.');
        setSnackbarOpen(true);
        handleSearch()
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const handleDeleteClick = (fileId) => {
    fetch(`https://my-yahya-cloud-server.vercel.app/deletefile?id=${fileId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      setSnackbarMessage("File Deleted Successfully");
      setSnackbarOpen(true);
      handleSearch()
    })
    .catch(error => {
      console.error('Error deleting file:', error);
    });
  };
  if (loading) {
    messageToDisplay = (
        <Box  sx={{display:'flex',justifyContent:'center',alignItems:"center",height:"65vh",gap:2}}>
<CircularProgress thickness={7}/>        <Typography variant="h6" sx={{fontWeight:'bold'}} >
      Loading
      </Typography>
   </Box>
    );
  } else if (searchQuery.trim() === '') {
    messageToDisplay = (
      <Box  sx={{display:'flex',justifyContent:'center',alignItems:"center",height:"65vh"}}>
           <Typography variant="body1">
       Nothing to Show here
      </Typography>
      </Box>
    );
  } else if (searchResults.length === 0) {
    messageToDisplay = (
        <Box  sx={{display:'flex',justifyContent:'center',alignItems:"center",height:"65vh"}}>
        <Typography variant="body1">
        No Results Found
   </Typography>
   </Box>
    );
  }
const searchChange=(e)=>{
  setSearchQuery(e.target.value)
  setSearchResults([]);
}
const selectType=(e)=>{
  setSearchType(e.target.value)
  setSearchResults([]);
}

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission if inside a form element
    handleSearch();
    setAutoFocus(false);

    // Remove focus from the input field
    event.target.blur();

    // Hide the Android keyboard
    if (document.activeElement) {
      document.activeElement.blur();
    }
  }
};

const copyFileToClipboard = (content) => {
  const textArea = document.createElement('textarea');
  textArea.value = content; // Do not remove newline characters
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);

  setSnackbarMessage('Download Link copied to clipboard.');
  setSnackbarOpen(true);
};
const Download = ()=>{
  setSnackbarMessage('Download has been started');
  setSnackbarOpen(true)
}
  return (
    <Box sx={{ marginTop: 11 }}>
      <Box sx={{ marginInline: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          id="name"
          label="Search Data"
          type="text"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={searchChange}
          onKeyPress={handleKeyPress}
          autoFocus={autoFocus}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Type"
          size="small"
          value={searchType}
          onChange={selectType}
          sx={{ borderLeft: 'none', marginInline: 1 }}
        >
          <MenuItem value="file">File</MenuItem>
          <MenuItem value="code">Code</MenuItem>
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="link">Link</MenuItem>
        </Select>
      </Box>
<Box sx={{marginTop:3,marginInline:1,marginBottom:11}}>
      {messageToDisplay ? (
        messageToDisplay
      ) : (
        searchType === 'code' ? (
          // Display code search results
          searchResults.map((item) => (
            <Card key={item._id} sx={{ width: '100%', marginBottom: '20px' }} elevation={3}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  {item.dataName}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1, color: 'darkgrey' }}>
                  {new Date(item.postedAt).toLocaleString('en-IN', options)}
                </Typography>
                <Accordion sx={{ marginBottom: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="code-content" id="code-header">
                    Click here to Show Code
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ width: '100%' }}>
                      <SyntaxHighlighter language="javascript" style={okaidia}>
                        {item.link}
                      </SyntaxHighlighter>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingRight: '20px', gap: 2, marginTop: 'auto', marginBottom: 2 }}>
                  <Button startIcon={<DeleteOutlinedIcon />} variant="outlined" color="error" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                  <Button startIcon={<FileCopyOutlinedIcon />} variant="contained" color="primary" onClick={() => copyToClipboard(item.link)}>
                    Copy
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : searchType === 'file' ? (
          // Display file search results
          searchResults.map((file) => (
            <Card key={file._id} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }} elevation={3}>
              <CardContent>
              <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    >
                      {(file.fileDescription).substring(0, 15)}
                      {((file.fileDescription).length>15)?"...":""}
                    </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {getIconForFileType(file.fileType)}
                  <Box sx={{ marginLeft: 2 }}>
                    <Typography variant="body2" sx={{ color: 'grey' }}>{new Date(file.uploadedDate).toLocaleString('en-IN', options)}</Typography>
                        <Typography variant="body2" sx={{ color: 'grey' }}>{(file.fileSize / 1024).toFixed(2)>1024?((file.fileSize / 1024).toFixed(2)/1024).toFixed(2) + " MB":(file.fileSize / 1024).toFixed(2)+" KB" }</Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                {/* Delete Button */}
                <IconButton color="error" onClick={() => handleDeleteClick(file._id)}>
                  <DeleteOutlinedIcon />
                </IconButton>

                <IconButton color="primary" onClick={() => copyFileToClipboard(file.fileUrl)}>
                     <FileCopyOutlinedIcon />
                    </IconButton>
  
                    {/* Download Button */}
                    <a href={file.fileUrl}  download={file.fileDescription}  rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <IconButton color="success" onClick={Download}>
                        <GetAppOutlinedIcon />
                      </IconButton>
                    </a>
              </CardActions>
            </Card>
          ))
        ) : searchType === 'link' ? (
          // Display link search results
          searchResults.map((item) => (
            <Card key={item._id} sx={{ width: '100%', marginBottom: '20px' }} elevation={3}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  {item.dataName}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1, color: 'darkgrey' }}>
                  {new Date(item.postedAt).toLocaleString('en-IN', options)}
                </Typography>
                <div style={{ width: '100%' }}>
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Typography variant="body1" sx={{ marginBottom: 2,padding:3, border: '1px solid #ccc', padding: '8px', borderRadius: 2, color: '#66d9ef',backgroundColor:'#272822', whiteSpace: "pre-line" }}>
                  {item.link}
                  </Typography>
                </a>
              </div>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingRight: '20px', gap: 2, marginTop: 'auto', marginBottom: 2 }}>
                <Button startIcon={<DeleteOutlinedIcon />} variant="outlined" color="error" onClick={() => handleDelete(item._id)}>
                  Delete
                </Button>
                <Button startIcon={<FileCopyOutlinedIcon />} variant="contained" color="primary" onClick={() => copyToClipboard(item.link)}>
                  Copy
                </Button>
              </Box>
            </Card>
          ))
        ) : (
          // Display text search results
          searchResults.map((item) => (
            <Card key={item._id} sx={{ width: '100%', marginBottom: '20px' }} elevation={3}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  {item.dataName}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1, color: 'darkgrey' }}>
                  {new Date(item.postedAt).toLocaleString('en-IN', options)}
                </Typography>
                <div style={{width:'100%'}}>
                  <Typography variant="body1" sx={{ marginBottom: 2, border: '1px solid #ccc', padding: '10px', borderRadius: 2, color: '#e6db74',backgroundColor:'#272822', whiteSpace: "pre-line" }}>
                  {item.dataContent}
                  </Typography>
                  </div>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingRight: '20px', gap: 2, marginTop: 'auto', marginBottom: 2 }}>
                <Button startIcon={<DeleteOutlinedIcon />} variant="outlined" color="error" onClick={() => handleDelete(item._id)}>
                  Delete
                </Button>
                <Button startIcon={<FileCopyOutlinedIcon />} variant="contained" color="primary" onClick={() => copyToClipboard(item.dataContent)}>
                  Copy
                </Button>
              </Box>
            </Card>
          ))
        )
      )}
    </Box>
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setSnackbarOpen(false)}
        sx={{marginBottom:7}}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Search;
