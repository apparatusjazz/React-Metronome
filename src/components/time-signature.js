import React, { Component } from 'react'


// Play button and bpm controls - slider, input
class TimeSignature extends Component {

    handleFirstI(evt) {
        this.props.changeBeatNo(parseInt(evt.target.value));
    }
    handleSecondI(evt) {
        this.props.changeBeatLength(parseInt(evt.target.value));
    }
    render() {
        return (
            <div>
                <div className="time-signature">
                    <input onChange={(e) => this.handleFirstI(e)}></input>
                    <input onChange={(e) => this.handleSecondI(e)}></input>
                </div>
            </div>
        )
    }
}

export default TimeSignature;