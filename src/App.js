import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Appbar from './components/Appbar';
import UploadFile from './pages/UploadFile';
import UploadText from './pages/UploadText';
import UploadCode from './pages/UploadCode';
import UploadLink from './pages/UploadLink';
import Tabs from './components/Tabs';
import Files from './pages/Files';
import Text from './pages/Text';
import Code from './pages/Code';
import Link from './pages/Link';

function App() {
  return (
    <>
    <BrowserRouter>
      <Appbar />
    <Routes >
          <Route path="/" element={<Files />}  index/>
          <Route path="/files" element={<Files />} />
          <Route path="/code" element={<Code />} />
          <Route path="/text" element={<Text />} />
          <Route path="/link" element={<Link />} />
          <Route path="/upload-file" element={<UploadFile />}/>
          <Route path="/upload-text" element={<UploadText />} />
          <Route path="/upload-code" element={<UploadCode />} />
          <Route path="/upload-link" element={<UploadLink />} />
        </Routes>     
      <Tabs />
  </BrowserRouter>
    </>
  );
}

export default App;
