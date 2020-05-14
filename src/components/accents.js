import React, { Component } from 'react';
import Beat from './beat';

class Accents extends Component {
    render() {
        let accents = [];
        for (let i = 0; i < this.props.beats; i++) {
            let beat = <Beat
                key={i}
                beatNo={i}
                accent={this.props.defaultAccent}
                handleAccentChange={this.props.handleAccentChange}
            />
            accents.push(beat);
        }
        return (
            <div>
                {accents}
            </div>
        )
    }
}

export default Accents;