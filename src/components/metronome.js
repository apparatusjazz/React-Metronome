import React, { Component } from 'react'

class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bpm: 120,
            beatNum: 1,
            timeSignature: [4, 4],
            playing: false
        }
        this.changeTimeSignature = this.changeTimeSignature.bind(this);
        this.togglePlaying = this.togglePlaying.bind(this);
    }
    changeTimeSignature(newtime) {
        this.setState(st => {
            timeSignature: newtime
        })
    }
    togglePlaying() {
        this.setState(st => {
            playing: !playing
        })
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Metronome;