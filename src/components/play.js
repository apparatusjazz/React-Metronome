import React, { Component } from 'react'

class Play extends Component {

    handleClick(e) {
        this.props.togglePlaying(e);
    }
    handleKeyPress(e) {
        if (e.key === "Space") {
            this.props.togglePlaying(e);
        }
    }

    render() {
        return (
            <div>
                <button
                    onClick={(e) => this.handleClick(e)}
                    onKeyDown={e => this.handleKeyPress(e)}
                >Play</button>
            </div>
        )
    }
}

export default Play;