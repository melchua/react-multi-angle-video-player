import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import DHVideoPlayer from '../lib/Components/DHVideoPlayer';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <div style={{display: 'relative'}}>
        <DHVideoPlayer videoUrl="https://s3-us-west-2.amazonaws.com/course-videos-transcoded/wt/wt.m3u8" 
          posterUrl=""/>
    </div>
  </MuiThemeProvider>
);

export default App;
