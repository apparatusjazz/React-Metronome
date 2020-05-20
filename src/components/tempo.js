import React, { Component } from 'react'

class Tempo extends Component {
    handleChange(evt) {
        this.props.changeTempo(parseInt(evt.target.value));
    }
    render() {
        return (
            <div>
                <input value={this.props.tempo} onChange={e => this.handleChange(e)}></input>
            </div>
        )
    }
}

export default Tempo;