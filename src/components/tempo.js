import React, { Component } from 'react'
import { Slider } from '@material-ui/core'

class Tempo extends Component {

    changeTempo(evt) {
        let tempo = parseInt(evt.target.value);
        if (isNaN(tempo)) tempo = this.props.tempo;
        else {
            this.props.changeTempo(tempo);
        }
    }
    tempoChange(val) {      // Incrementing tempo up or down
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
                <button className="bpmDown" onClick={() => this.tempoChange(0)}>-</button>
                {/* <input
                    defaultValue={this.props.tempo}
                    onFocus={this.handleFocus}
                    onKeyPress={e => this.handleKeyPress(e)}
                ></input> */}
                <h2>{this.props.tempo}</h2>
                <button className="bpmUp" onClick={() => this.tempoChange(1)}>+</button>
                <div>
                    <Slider
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