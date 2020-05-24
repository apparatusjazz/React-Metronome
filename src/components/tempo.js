import React, { Component } from 'react'
import { Slider } from '@material-ui/core'
import '../css/tempo-controls.css'

class Tempo extends Component {

    changeTempo(evt) {
        let tempo = parseInt(evt.target.value);
        if (isNaN(tempo)) tempo = this.props.tempo;
        else {
            this.props.changeTempo(tempo);
        }
    }
    tempoChange(val) {      // Incrementing tempo up or down
        if (this.props.tempo > 50 && this.props.tempo <= 350)
            this.props.tempoChange(val);
    }
    handleKeyPress(evt) {
        if (evt.key === "Enter") {
            this.changeTempo(evt);
        }
    }
    handleSliderChange(event, newVal) {
        this.props.changeTempo(newVal);
    }
    handleFocus = (evt) => evt.target.select();

    render() {
        return (
            <div /*key={this.props.tempo}*/>
                <div className="tempo-controls">
                    <button className="bpm-adjust down" onClick={() => this.tempoChange(0)}>-</button>
                    {/* <input
                        defaultValue={this.props.tempo}
                        onFocus={this.handleFocus}
                        onKeyPress={e => this.handleKeyPress(e)}
                    ></input> */}
                    <p id="bpm" >{this.props.tempo}</p>
                    <button className="bpm-adjust up" onClick={() => this.tempoChange(1)}>+</button>
                </div>
                <div>
                    <Slider
                        id="bpm-slider"
                        value={this.props.tempo}
                        onChange={(e, val) => this.handleSliderChange(e, val)}
                        aria-labelledby="continuous-slider"
                        min={50}
                        max={350}
                        valueLabelDisplay="auto"
                    />
                </div>
            </div>
        )
    }
}

export default Tempo;