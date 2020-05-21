import React, { Component } from 'react'

class Tempo extends Component {
    handleChange(evt) {
        this.props.changeTempo(parseInt(evt.target.value));
    }
    tempoChange(val) {
        this.props.tempoChange(val);
    }
    render() {
        return (
            <div>
                <button className="bpmDown" onClick={() => this.tempoChange(0)}>--</button>
                <input value={this.props.tempo} onChange={e => this.handleChange(e)}></input>
                <button className="bpmUp" onClick={() => this.tempoChange(1)}>--</button>
            </div>
        )
    }
}

export default Tempo;