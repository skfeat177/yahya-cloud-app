import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { Box, Snackbar, Alert, Skeleton, CircularProgress } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfiniteScroll from 'react-infinite-scroll-component';

function Text() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1); 
  const [hasMore,setHasMore] = useState(true)

  const containerRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://quick-share-cors.vercel.app/getlimiteddata?count=3&type=code&page=${page}`);
      if (response.ok) {
        const responseData = await response.json();
        if (page === 1) {
          // If it's the first page, replace the existing data
          setData(responseData);
        } else {
          // If it's not the first page, append the new data
          setData(prevData => [...prevData, ...responseData]);
        }
      } else {
        // Handle other response status codes as needed
        if (response.status === 404) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Data is loaded or if there's an error, set loading to false
    }
  };
  
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1); // Load the next page when the "Load More" button is clicked
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts or when the page changes
  }, [page]);

  const handleScroll = () => {
    if (
      containerRef.current &&
      window.innerHeight + window.scrollY >= containerRef.current.offsetHeight - 100 &&
      data.length > 0
    ) {
      // Load more data when the user is near the bottom
      setPage(prevPage => prevPage + 1);
    }
  };

  const copyToClipboard = (content) => {
    const textArea = document.createElement('textarea');
    textArea.value = content; // Do not remove newline characters
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  
    setSnackbarMessage('Code Snippet copied to clipboard.');
    setSnackbarOpen(true);
  };

  const handleDelete = (fileId) => {
    fetch(`https://quick-share-cors.vercel.app/deletedata?id=${fileId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      setSnackbarMessage("Code Deleted Successfully");
      setSnackbarOpen(true);
      // Update file list by filtering out the deleted file
      setData(prevFileData => prevFileData.filter(file => file._id !== fileId));
    })
    .catch(error => {
      console.error('Error deleting file:', error);
    });
  };
  

  return (
    <div
      ref={containerRef}
      style={{
        marginInline: '10px',
        marginTop: '80px',
        marginBottom: '90px',
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        overflowX: 'hidden', // Add this to prevent horizontal overflow
      }}
      onScroll={handleScroll}
    >
      {loading ? (
        <SkeletonLoader/>
      ) : (
        <Box sx={{width:'100%',height:'100%'}}>
<InfiniteScroll
  dataLength={data.length}
  next={handleLoadMore}
  hasMore={hasMore} 
  loader={
    <Box sx={{ width: '100%'}}>
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
  </Box>
  }
  endMessage={
    <Typography variant="body1" sx={{marginTop:'35px',textAlign:'center',marginBottom:'15px'}}>
    No more data available
</Typography>
  }
  style={{display:'flex',justifyContent:'center' ,flexDirection:'column',marginInline:'auto'}}
>
  {data.map((item) => (
        <Card key={item._id} sx={{ width: '99%', display: 'flex', flexDirection: 'column', marginBottom: '10px',marginInline:'auto',boxSizing:'border-box'}} elevation={2}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {item.dataName}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1, color: 'darkgrey' }}>
            {new Date(item.postedAt).toLocaleString('en-IN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              timeZone: 'Asia/Kolkata',
              hour12: true,
            })}
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
  ))}
</InfiniteScroll>
</Box>

      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setSnackbarOpen(false)}
        sx={{ marginBottom: 7 }}
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

function SkeletonLoader() {
  return (
    <Box sx={{ width: '100%', marginBottom: '20px',marginInline:'auto'}}>
    <Box sx={{ width: '100%', marginBottom: '20px' }} elevation={3}>
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
    </Box>
    <Box sx={{ width: '100%', marginBottom: '20px' }} elevation={3}>
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
    </Box>
    <Box sx={{ width: '100%', marginBottom: '20px' }} elevation={3}>
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
    </Box>
    </Box>
  );
}

export default Text;
