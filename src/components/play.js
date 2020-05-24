import React, { Component } from 'react'
import '../css/play.css'

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
        const playing = this.props.playing ? "button pause" : "button play";
        return (

            <button
                className={playing}
                onClick={(e) => this.handleClick(e)}
                onKeyDown={e => this.handleKeyPress(e)}
            >Play</button>

        )
    }
}

export default Play;