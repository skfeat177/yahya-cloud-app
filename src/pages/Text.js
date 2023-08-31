import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { Box, Snackbar, Alert, Skeleton ,TextField} from '@mui/material';

function Text() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const filteredData = data.filter(item =>
    item.dataName.toLowerCase().includes(searchInput.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const response = await fetch('https://quick-share-cors.vercel.app/getalldata');
      if (response.ok) {
        const responseData = await response.json();
        // Filter and reverse the text data
        const textData = responseData.files.filter(item => item.dataType === 'text').reverse();
        setData(textData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (content) => {
    const textArea = document.createElement('textarea');
    textArea.value = content; // Do not remove newline characters
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  
    setSnackbarMessage('Text copied to clipboard.');
    setSnackbarOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://quick-share-cors.vercel.app/deletedata?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSnackbarMessage('Data deleted successfully.');
        setSnackbarOpen(true);
        fetchData(); // Refresh data
        console.log(data)
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
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
  useEffect(() => {
    fetchData();
  }, [handleDelete]);

  return (
    <div style={{ marginInline: '10px', marginTop: '90px', marginBottom: '90px', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              <TextField
        label="Search"
        variant="outlined"
        size="small"
        style={{ marginBottom: '20px', width: '100%' }}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {loading ? (
        // Skeleton loading while data is being fetched
        Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} sx={{ width: '100%', marginBottom: '20px' }} elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                <Skeleton variant="text" width="50%" />
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <Skeleton variant="text" width="20%" />
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <Skeleton variant="rectangular" height={80} />
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        // Display data cards
        filteredData.map((item) => (
          <Card key={item._id} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '20px' }} elevation={3}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                {item.dataName}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, color: 'darkgrey' }}>
              {new Date(item.postedAt).toLocaleString('en-IN', options)}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2, border: '1px solid #ccc', padding: '8px', borderRadius: 2, color: 'grey' ,whiteSpace:"pre-line"}}>
                {item.dataContent}
              </Typography>
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
      )}
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
    </div>
  );
}

export default Text;
