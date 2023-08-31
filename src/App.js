import Appbar from './components/Appbar';
import './App.css';
import UploadFile from './pages/UploadFile';
import UploadText from './pages/UploadText';
import UploadCode from './pages/UploadCode';
import UploadLink from './pages/UploadLink';
import Tabs from './components/Tabs'
import Files from './pages/Files';
import { Box } from '@mui/material';
import Text from './pages/Text';
import Code from './pages/Code';
import Link from './pages/Link';


function App() {
  return (
    <>
      <Appbar />
      <Box>
        {/* <Link/> */}
      <Files/>
      {/* <Code/> */}
      {/* <Text/> */}   
      {/* <UploadFile/> */}
      {/* <UploadText/> */}
      {/* <UploadCode /> */}
      {/* <UploadLink/> */}
      </Box>

      <Tabs/>
    </>
  );
}

export default App;
