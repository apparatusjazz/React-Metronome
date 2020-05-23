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
                    <select defaultValue="4" onChange={(e) => this.handleFirstI(e)}>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>
                <div>
                    <select defaultValue="4" onChange={(e) => this.handleSecondI(e)}>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default TimeSignature;