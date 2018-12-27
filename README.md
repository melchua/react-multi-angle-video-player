**Summary**

![Player Demo](public/assets/dhplayer-demo.gif?raw=true "Demo")

Responsive custom video player that allows for mirroring, multi-angle, and speed controls. This works in full screen for desktop and inline video for mobile / responsive. This player is currently setup to toggle between two camera angle feeds. They will seamlessly transition between each other because you will essentially be only playing one video: the videos will have to be stitched to each other (top to bottom) and must be the exact same dimensions. 

**Install**

```yarn install```

**Usage**

1. Setup your MUITheme config file: theme.js

Colors for the player are defined by Material UI Theme Palette in order to keep the same theme as your site.

```
cd ./ProjectDirectoryRoot/
touch theme.js
```

Here's an example theme.js file:
```theme.js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

export default createMuiTheme({
    palette: {
        type: 'dark',
        primary: purple,
        secondary: purple, 
    }
});
```
2. Import the component 

```
import DHVideoPlayer from "react-multi-angle-video";
```

3. Insert the component to where you want it
```
<DHVideoPlayer videoUrl="(video Url)"/>
``` 

** Props **
videoUrl - the url to the video url, please note that this video will need to be stitched (the front video on top, and the back video on the bottom)
posterUrl (optional) - the poster image to display before the video is played