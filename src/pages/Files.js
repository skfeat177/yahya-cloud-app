import React, { useEffect, useState, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
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
import { Box, Skeleton, Snackbar,CircularProgress,Alert } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import InfiniteScroll from 'react-infinite-scroll-component';

function Files() {
  const [fileData, setFileData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://quick-share-cors.vercel.app/getlimitedfiles?count=5&page=${page}`);
      if (response.ok) {
        const responseData = await response.json();
        if (page === 1) {
          // If it's the first page, replace the existing data
          setFileData(responseData);
        } else {
          // If it's not the first page, append the new data
          setFileData(prevData => [...prevData, ...responseData]);
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
      fileData.length > 0
    ) {
      // Load more data when the user is near the bottom
      setPage(prevPage => prevPage + 1);
    }
  };


  const handleDeleteClick = (fileId) => {
    fetch(`https://quick-share-cors.vercel.app/deletefile?id=${fileId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      setSnackbarMessage(data.message);
      setSnackbarOpen(true);
      // Update file list by filtering out the deleted file
      setFileData(prevFileData => prevFileData.filter(file => file._id !== fileId));
    })
    .catch(error => {
      console.error('Error deleting file:', error);
    });
  };

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

  return (
    <div
      ref={containerRef}
      style={{
        marginInline: 'auto',
        marginTop: '90px',
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
  dataLength={fileData.length}
  next={() => setPage((prevPage) => prevPage + 1)}
  hasMore={hasMore}
  loader={
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px'}}>
      <CircularProgress thickness={6} size={35}/>     <p style={{ fontSize:25,marginLeft:'10px',color:'grey' }}>
      <b>Loading..</b>
    </p>
    </div>
  }
  endMessage={
    <p style={{ textAlign: 'center',fontSize:20 }}>
      <b>No more data to load</b>
    </p>
  }
  style={{display:'flex',justifyContent:'center' ,flexDirection:'column',marginInline:'auto'}}
>
{fileData.map((file) => (
  <div style={{width:"100%",marginInline:'auto'}}>
    <Card key={file._id} sx={{ width: '98%', display: 'flex', alignItems: 'center', marginBottom: '10px' ,justfySelf:'center',marginLeft:'13px'}} elevation={3} >
      <CardContent sx={{ width: '100%' }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black', width: '100%' }}>
          {file.fileDescription}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {getIconForFileType(file.fileType)}
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="body2" sx={{ color: 'grey' }}>{new Date(file.uploadedDate).toLocaleString('en-IN', options)}</Typography>
            <Typography variant="body2" sx={{ color: 'grey' }}>{(file.fileSize / 1024).toFixed(2)} KB</Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        {/* Delete Button */}
        <IconButton color="error" onClick={() => handleDeleteClick(file._id)}>
          <DeleteOutlinedIcon />
        </IconButton>

        {/* Download Button */}
        <a href={file.fileUrl} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <IconButton color="primary">
            <GetAppOutlinedIcon />
          </IconButton>
        </a>
      </CardActions>
    </Card>
    </div>
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
    Array.from({ length: 5 }).map((_, index) => (
        <Card key={index} sx={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px',marginLeft:'14px' }} elevation={3}>
          <CardContent>
            <Typography variant="body1">
              <Skeleton width={'100%'} />
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton variant="circle" width={65} height={65} />
              <Box sx={{ marginLeft: 2 }}>
                <Typography variant="body2">
                  <Skeleton width={100} />
                </Typography>
                <Typography variant="body2">
                  <Skeleton width={60} />
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <IconButton disabled>
              <DeleteOutlinedIcon />
            </IconButton>
            <IconButton disabled>
              <GetAppOutlinedIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))
  );
}

export default Files;
