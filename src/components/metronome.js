import React, { Component } from 'react'
// import noteTimer from '../note-time';

// const timer = new noteTimer(120);
const scheduleAheadTime = 0.1;
const lookahead = 25.0;
const noteLength = 0.05;
let audioContext = new AudioContext();
let timing;

class Metronome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tempo: 120,
            currentNote: 0,
            nextNoteTime: 0,
            timeSignature: [4, 4],
            playing: false,
            accents: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]   // 0 - silent, 1 - regular, 2 - accented
        }
        this.togglePlaying = this.togglePlaying.bind(this);
        this.changeTempo = this.changeTempo.bind(this);
    }
    nextNote(tempo) {
        // Advance current note and time by a 16th note...
        let secondsPerBeat = 60.0 / tempo;
        let rhythmType = 4 / this.state.timeSignature[1];   // Change note rhythm with time signature

        this.setState({ nextNoteTime: this.state.nextNoteTime + rhythmType * secondsPerBeat })

        this.setState({ currentNote: this.state.currentNote + 1 });
        if (this.state.currentNote === this.state.timeSignature[0]) {
            this.setState({ currentNote: 0 });
        }
    }
    scheduleNote(beatNumber, time) {
        // create an oscillator
        let osc = audioContext.createOscillator();
        console.log(this.state.currentNote)
        osc.connect(audioContext.destination);
        if (beatNumber % this.state.timeSignature[0] === 0)    // beat 0 == high pitch
            osc.frequency.value = 880.0;
        // else if (beatNumber % 4 === 0)    // quarter notes = medium pitch
        //     osc.frequency.value = 440.0;
        else                        // other 16th notes = low pitch
            osc.frequency.value = 220.0;

        osc.start(time);
        osc.stop(time + noteLength);
    }
    scheduler(tempo) {
        // while there are notes that will need to play before the next interval, 
        // schedule them and advance the pointer.
        while (this.state.nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
            this.scheduleNote(this.state.currentNote, this.state.nextNoteTime);
            this.nextNote(tempo);
        }
    }
    changeTempo(event) {
        this.setState({ tempo: parseInt(event.target.value) });
    }
    togglePlaying() {
        if (!this.state.playing) {
            this.setState({
                currentNote: 0,
                nextNoteTime: audioContext.currentTime
            });
            timing = setInterval(() => {
                this.scheduler(this.state.tempo);
            }, lookahead);
        }
        else {
            clearInterval(timing);
        }
        this.setState({
            playing: !this.state.playing
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.togglePlaying}>Play</button>
                <input min={50} max={300} value={this.state.tempo} onInput={this.changeTempo}></input>
            </div>
        )
    }
}

export default Metronome;