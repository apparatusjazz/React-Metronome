import React, { Component } from 'react'
import TimeSignature from './time-signature';


// Play button and bpm controls - slider, input
class Controls extends Component {
    handleClick() {
        this.props.togglePlaying();
    }
    render() {
        return (
            <div>
                <button onClick={(e) => this.handleClick(e)}>Play</button>
                <TimeSignature
                    changeBeatNo={this.props.changeBeatNo}
                    changeBeatLength={this.props.changeBeatLength}
                />
            </div>
        )
    }
}

export default Controls;