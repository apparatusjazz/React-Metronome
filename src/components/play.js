import React, { Component } from 'react'

class Play extends Component {

    handleClcik(e) {
        this.props.togglePlaying(e);
    }
    render() {
        return (
            <div>
                <button onClick={(e) => this.handleClcik(e)}>Play</button>
            </div>
        )
    }
}

export default Play;