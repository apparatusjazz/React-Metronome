import React, { Component } from 'react'

class Tempo extends Component {

    handleChange(evt) {
        let tempo = parseInt(evt.target.value);
        if (isNaN(tempo)) tempo = this.props.tempo;
        else this.props.changeTempo(tempo);
    }
    tempoChange(val) {
        this.props.tempoChange(val);
    }
    handleFocus = (evt) => evt.target.select();

    render() {
        return (
            <div>
                <button className="bpmDown" onClick={() => this.tempoChange(0)}>--</button>
                <input
                    value={this.props.tempo}
                    onFocus={this.handleFocus}
                    onChange={e => { this.handleChange(e) }}
                ></input>
                <button className="bpmUp" onClick={() => this.tempoChange(1)}>--</button>
            </div>
        )
    }
}

export default Tempo;