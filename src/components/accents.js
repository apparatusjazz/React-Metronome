import React, { Component } from 'react';
import Beat from './beat';
import '../css/accents.css'

class Accents extends Component {
    render() {
        let accents = [];
        for (let i = 0; i < this.props.beats; i++) {
            let beat = <Beat
                key={i}
                beatNo={i}
                currentNote={this.props.currentNote}
                accent={this.props.defaultAccent}
                handleAccentChange={this.props.handleAccentChange}
                totalBeats={this.props.beats}
            />
            accents.push(beat);
        }
        return (
            <div className="accents">
                {accents}
            </div>
        )
    }
}

export default Accents;