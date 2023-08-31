import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { Alert, Box, Typography, TextField, Snackbar, CircularProgress } from '@mui/material'; // Import Snackbar from @mui/material
import MuiAlert from '@mui/material/Alert'; // Import MuiAlert from @mui/material
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import HtmlIcon from '@mui/icons-material/Html';
import CssIcon from '@mui/icons-material/Css';
import JavascriptIcon from '@mui/icons-material/Javascript';
import PhpIcon from '@mui/icons-material/Php';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

export default function CenteredCard() {
    const theme = useTheme();
    const [alertTimeout, setAlertTimeout] = React.useState(null);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [loading, setLoading] = React.useState(false);
    const [filedescription, setfiledescription] = React.useState('');
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState('success');
    const [alertMessage, setAlertMessage] = React.useState('');
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleDescription = (event) => {
        const file = event.target.value;
        setfiledescription(file);
    };

    const getIconForFileType = (fileType) => {
        if (fileType.startsWith('image/')) {
            return <ImageOutlinedIcon sx={{ fontSize: 90 }} />;
        } else if (fileType === 'application/pdf') {
            return <PictureAsPdfOutlinedIcon sx={{ fontSize: 90 }} />;
        } else if (fileType.startsWith('video/')) {
            return <MovieOutlinedIcon sx={{ fontSize: 90 }} />;
        } else if (fileType.startsWith('audio/')) {
            return <MusicNoteOutlinedIcon sx={{ fontSize: 90 }} />;
        } else if (fileType === 'text/javascript') {
            return <JavascriptIcon sx={{ fontSize: 90 }} />;
        } else if (fileType === 'text/css') {
            return <CssIcon sx={{ fontSize: 90 }} />;
        } else if (fileType === 'text/html') {
            return <HtmlIcon sx={{ fontSize: 90 }} />;
        } else if (fileType === 'text/java') {
            return <CodeOutlinedIcon sx={{ fontSize: 90 }} />;
        } else if (fileType === 'text/python') {
            return <CodeOutlinedIcon sx={{ fontSize: 90 }} />;
        } else if (fileType === 'text/cpp' || fileType === 'text/c') {
            return <CodeOutlinedIcon sx={{ fontSize: 90 }} />;
        } else if (fileType === 'text/php') {
            return <PhpIcon sx={{ fontSize: 90 }} />;
        } else if (fileType === 'application/zip') {
            return <FolderZipOutlinedIcon sx={{ fontSize: 90 }} />;
        } else {
            return <InsertDriveFileOutlinedIcon sx={{ fontSize: 90 }} />;
        }
    };


    const handleUploadFile = () => {
        if (selectedFile) {
            setLoading(true);
            setUploadProgress(0);
            const formData = new FormData();
            formData.append('file', selectedFile);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', `https://quick-share-cors.vercel.app/upload?description=${filedescription}`);
            xhr.upload.onprogress = (event) => {
                const progress = Math.round((event.loaded / event.total) * 100);
                console.log("Upload Progress:", progress);
                setUploadProgress(progress);
            };
            xhr.onload = () => {
                if (xhr.status === 200) {
                    setAlertSeverity('success');
                    setAlertMessage('File uploaded successfully.');
                } else {
                    setAlertSeverity('error');
                    setAlertMessage('An error occurred while uploading the file.');
                }
                setLoading(false);
                setAlertOpen(true);
            };
            xhr.onerror = (error) => {
                setAlertSeverity('error');
                setAlertMessage('An error occurred while uploading the file.');
                setLoading(false);
                setAlertOpen(true);
                console.log(error)
            };

            xhr.send(formData);
        }
    };

    const handleCloseAlert = () => {
        // Clear the timeout when the alert is manually closed
        if (alertTimeout) {
            clearTimeout(alertTimeout);
        }
        setAlertOpen(false);
    };
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

                <Card sx={{ width: isMobile ? 325 : 600 }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

                        {loading? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' ,height:200 ,marginTop:10}}>
                                <CircularProgress variant="determinate" value={uploadProgress} size={90} />
                                <Typography variant="h6" color="initial" fontWeight="bold">{uploadProgress}% Uploaded</Typography>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
                                {selectedFile ? getIconForFileType(selectedFile.type) : <InsertDriveFileOutlinedIcon sx={{ fontSize: 90 }} />}
                                <Typography variant="h6" color="initial" fontWeight="bold">{selectedFile ? selectedFile.name : 'No File Selected'}</Typography>
                                <Typography variant="h6" color="initial" fontWeight="bold">Size: {selectedFile ? (selectedFile.size / 1024).toFixed(2) : 0.0} KB</Typography>
                                <TextField id="filedescription" label="File Description" variant="outlined" value={filedescription} onChange={handleDescription} />
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                            <input
                                type="file"
                                accept=".pdf,.zip,.doc,.docx,.js,.css,.html,.java,.py,.cpp,.c,.php,.mp3,.wav,.png,.jpg,.jpeg,.ico"
                                id="file-input"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="file-input">
                                <Button variant="outlined" startIcon={<NoteAddOutlinedIcon />} color="primary" component="span">
                                    Select
                                </Button>
                            </label>
                            <LoadingButton
                                color="primary"
                                onClick={handleUploadFile}
                                loading={loading}
                                loadingPosition="start"
                                variant="contained"
                                disabled={!selectedFile || loading}
                                startIcon={<UploadOutlinedIcon />}
                            >
                                <span>Upload</span>
                            </LoadingButton>
                        </Box>
                    </CardContent>
                </Card>
                <Snackbar
                    open={alertOpen}
                    autoHideDuration={1000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleCloseAlert}
                    sx={{marginTop:10}}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={handleCloseAlert}
                        severity={alertSeverity}
                    >
                        {alertMessage}
                    </MuiAlert>
                </Snackbar>
            </Box>
        </>
    );
}
