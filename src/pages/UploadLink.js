import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import { FileUploadOutlined } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function UploadText() {
  const [loading, setLoading] = useState(false);
  const [dataName, setDataName] = useState('');
  const [dataContent, setDataContent] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handlePostData = async () => {
    setLoading(true);

    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Assuming you want to send the dataName and dataContent as query parameters
      const queryParams = `?dataName=${dataName}&dataType=link`;

      // Perform the POST request
      const response = await fetch(`https://my-yahya-cloud-server.vercel.app/postdata${queryParams}`, {
        method: 'POST',
        // Assuming 'link' is a variable containing the link you want to send in the request body
        body: JSON.stringify({ link: dataContent }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setAlertSeverity('success');
        setAlertMessage('Link Uploaded successfully.');
      } else {
        setAlertSeverity('error');
        setAlertMessage('Unexcepted Error Occured');
      }
    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage('An Server error occurred.');
    } finally {
      setLoading(false);
      setAlertOpen(true);

      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{marginInline:"15px"}}
    >
      <Card>
        <CardContent>
          <TextField
            label="Link Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={dataName}
            onChange={(e) => setDataName(e.target.value)}
          />
          <TextField
            label="Link Content"
            variant="outlined"
            fullWidth
            margin="normal"
            value={dataContent}
            onChange={(e) => setDataContent(e.target.value)}
          />
          <Box display="flex" justifyContent="center">
            <LoadingButton
              color="primary"
              onClick={handlePostData}
              loading={loading}
              loadingPosition="start"
              variant="contained"
              startIcon={<FileUploadOutlined />}
            >
                <span>{loading?"Posting Link":"Post Link"}</span>
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertOpen} autoHideDuration={1000} sx={{marginTop:8}} onClose={() => setAlertOpen(false)}>
      <MuiAlert severity={alertSeverity}
         elevation={6}
          variant="filled" 
          onClose={() => setAlertOpen(false)} 
          sx={{ width: '100%' }}>
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default UploadText;
