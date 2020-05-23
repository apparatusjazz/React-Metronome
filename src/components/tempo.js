import React, { Component } from 'react'

class Tempo extends Component {

    changeTempo(evt) {
        let tempo = parseInt(evt.target.value);
        if (isNaN(tempo)) tempo = this.props.tempo;
        else {
            this.props.changeTempo(tempo);
        }
    }
    tempoChange(val) {
        this.props.tempoChange(val);
    }
    handleKeyPress(evt) {
        if (evt.key === "Enter") {
            this.changeTempo(evt);
        }
    }
    handleFocus = (evt) => evt.target.select();

    render() {
        return (
            <div key={this.props.tempo}>
                <button className="bpmDown" onClick={() => this.tempoChange(0)}>--</button>
                <input
                    defaultValue={this.props.tempo}
                    onFocus={this.handleFocus}
                    onKeyPress={e => this.handleKeyPress(e)}
                ></input>
                <button className="bpmUp" onClick={() => this.tempoChange(1)}>--</button>
            </div>
        )
    }
}

export default Tempo;