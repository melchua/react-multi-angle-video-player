import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Fullscreenable from 'react-fullscreenable';
import { withSize } from 'react-sizeme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Loop from '@material-ui/icons/Loop';
import Fullscreen from '@material-ui/icons/Fullscreen'; 
import FullscreenExit from '@material-ui/icons/FullscreenExit'; 
import VolumeUp from '@material-ui/icons/VolumeUp'; 
import VolumeOff from '@material-ui/icons/VolumeOff'; 
import Slider from '@material-ui/lab/Slider';
import {isMobile} from 'react-device-detect';
import Duration from './Duration'; 
import SpeedControl from './SpeedControl';
import '../index.css';


const withSizeWrapper = withSize({ monitorHeight: true });

class Player extends Component {
    playerRef = React.createRef();
    updatePlayerSize = () => {
        this.props.triggerGetPlayerSize(this.props.size);        
    }
    componentDidMount() {
        console.log(this.playerRef);
        this.props.onRef(this);
    }
    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.size) !== JSON.stringify(prevProps.size)) { 
            this.updatePlayerSize();
        }
    }
    render() {
        const { playing, loop, onProgress, muted, onDuration, playbackRate, videoUrl, posterUrl } = this.props;
        return (
            <div>
                <ReactPlayer
                    ref={this.playerRef}
                    url={videoUrl}
                    width="100%"
                    height="100%"
                    playing={playing}
                    loop={loop}
                    onProgress={onProgress}
                    muted={muted}
                    onDuration={onDuration}
                    playsinline
                    config={{ 
                        file: { attributes: {
                            crossOrigin: 'anonymous',
                            poster: posterUrl
                    }}}}
                    playbackRate={playbackRate}
                    controls={false}
                />
            </div>
        )    
    }
}

const PlayerSizeAware = withSizeWrapper(Player);

class BasicVideo extends Component {
    state = {
        vidWidth: 0,
        vidHeight: 0,
        isFront: true,
        mirror: true,
        playing: true,
        loop: true,
        played: 0,
        seeking: false,
        duration: 0,
        playbackRate: 1,
        muted: false,
        forceHLS: true,
    }
    
    getPlayerSize = (sizeFromPlayer) => {
        this.setState({ vidHeight: sizeFromPlayer.height / 2});
        this.setState({ vidWidth: sizeFromPlayer.width});
    }

    onDuration = (duration) => {
        console.log('onDuration ', duration);
        this.setState({duration: duration});
    }
    // handlers for controls
    switchAngle = () => {
        this.setState(({isFront}) => ({ isFront: !isFront }));
        this.setState(({mirror}) => ({mirror: !mirror}));
    }
    onMirror = () => {
        this.setState(({mirror}) => ({mirror: !mirror}));
    }
    playPause = () => {
        this.setState(({playing}) =>  ({ playing: !playing }))
    }
    toggleLoop = () => {
        this.setState(({loop}) =>  ({ loop: !loop }))
    }
    toggleMuted = () => {
        this.setState(({muted}) => ({ muted: !muted }));
    }
    handleSliderValueChange = (e, value) => {
        this.setState({ played: value});
        // console.log('on change value: ', value);
        this.child.playerRef.current.seekTo(parseFloat(value));
    }
    getPlaybackRateFromSpeedControl = (playbackRate) => {
        this.setState({playbackRate: parseFloat(playbackRate)});
    }
    onProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }
    render() {
        const bigassWrapper = {
            position: 'relative',
            height: this.state.vidHeight,  
            width: '100%',
            overflow: 'hidden'
        }
        const mover = {
            position: 'absolute',
            top: this.state.isFront ?  -this.state.vidHeight : 0,
            transform: this.state.mirror ? 'rotateY(180deg)' : 'rotateY(0deg)',
            width: '100%',
            height: '100%', 
            backgroundColor: 'black',
        }
        const buttonStyle = {
            color: 'white',
        }
        const controlBarContainerStyle = {
            backgroundColor: 'rgba(0,0,0,0.4)',
            position: 'absolute',
            bottom: '0px',
            width: '100%',
            whiteSpace: 'nowrap'
        }
        const controlBarStyle = { 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'nowrap',
            width: '100%'
        }
        const rangeStyle = {
            width: '98%', // this is strange, slightly hacky for now, revisit later
            display: 'flex',
            justifyContent: 'space-around',
            color: 'white',
            marginLeft: '10px',
            marginRight: '10px',
        }
        
        const {isFront, mirror, playing, loop, muted, played, duration, playbackRate} = this.state;
        const {isFullscreen, toggleFullscreen, videoUrl, posterUrl = ''} = this.props;
        return (
            <div style={bigassWrapper}>
                <div style={mover} className="mover">
                    <PlayerSizeAware 
                        onRef={ref => (this.child = ref)} 
                        triggerGetPlayerSize={this.getPlayerSize} 
                        muted={muted} 
                        playing={playing} 
                        loop={loop} 
                        onProgress={this.onProgress}
                        onDuration={this.onDuration}
                        playbackRate={playbackRate}
                        videoUrl={videoUrl}
                        posterUrl={posterUrl}
                    />
                </div>
                <div style={controlBarContainerStyle}>
                    <div style={rangeStyle}>
                        <Duration seconds={duration * played}/>
                        <Slider
                            style={{padding: '10px'}}
                            value={played}
                            aria-labelledby="label"
                            onChange={this.handleSliderValueChange}
                            min={0}
                            max={1}
                        />
                        <Duration seconds={duration}/>

                    </div>
                    <div style={controlBarStyle}>
                        <span>
                            <Button style={buttonStyle} onClick={this.playPause}>{playing ? <Pause /> : <PlayArrow />}</Button>
                            <Button style={buttonStyle} onClick={this.toggleLoop}>{loop ? <Loop style={{color: 'purple' }}/> : <Loop />}</Button>
                            <Button style={buttonStyle} onClick={this.toggleMuted}>{muted ? <VolumeOff /> : <VolumeUp />}</Button>
                            <SpeedControl playbackRate={playbackRate} getPlaybackRateFromSpeedControl={this.getPlaybackRateFromSpeedControl}/>
                        </span>

                        <span>
                            <FormControlLabel style={buttonStyle} control={<Switch onChange={this.switchAngle} checked={isFront} />} 
                                label={isFront ? <span style={{color: 'white'}}>Front</span> : <span style={{color: 'white'}}>Back</span>} />
                            <FormControlLabel style={buttonStyle} control={<Switch onChange={this.onMirror} checked={mirror}/>} label={<span style={{color: 'white'}}>Mirror</span>} />
                            { !isMobile && (<Button style={buttonStyle} onClick={toggleFullscreen}>{isFullscreen ? <FullscreenExit style={{color: 'white'}} /> : <Fullscreen style={{color: 'white'}} />}</Button>)
                            }
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

const DHVideoPlayer = Fullscreenable()(BasicVideo);
export default DHVideoPlayer;