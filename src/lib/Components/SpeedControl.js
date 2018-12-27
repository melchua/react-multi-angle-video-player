import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Slider from '@material-ui/lab/Slider';

const Dropdown = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    color: white;
`

const DropdownContainer = styled.div`
    display: none;
    position: absolute;
    bottom: 40px;
    height: 80px;
    background-color: rgb(58,58,58,0.75);
    z-index: 1;
    /* min-width: 20px; */
    padding: 20px;
    ${Dropdown}:hover & {
        display: inline-block;
    };
`

class SpeedControl extends Component {
    state = {
        level: 1
    };
    handleSpeedValueChange = (e, value) => {
        console.log(value);
        return this.props.getPlaybackRateFromSpeedControl(value);
    }
    render() {
        const { playbackRate } = this.props;
        return(
            <Dropdown>
                <DropdownContainer>
                    <Slider
                        value={playbackRate}
                        aria-labelledby="speed"
                        vertical
                        onChange={this.handleSpeedValueChange}
                        min={0.5}
                        max={2}
                        height="100%"
                    />
                </DropdownContainer>
                <Button style={{color: 'white', padding: '0'}}>{playbackRate.toFixed(2)}X</Button>
            </Dropdown>
        );
    }
}
export default SpeedControl;