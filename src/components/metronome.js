import React, { Component } from 'react'
import Accents from './accents';
// import noteTimer from '../note-time';

// const timer = new noteTimer(120);
const scheduleAheadTime = 0.1;
const lookahead = 25.0;
const noteLength = 0.05;
let audioContext = new AudioContext();

class Metronome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tempo: 120,
            currentNote: 0,
            nextNoteTime: 0,
            timeSignature: [4, 4],
            playing: false,
            accents: []   // 0 - silent, 1 - regular, 2 - accent 1, 3 - accent 2
        }
        this.togglePlaying = this.togglePlaying.bind(this);
        this.changeTempo = this.changeTempo.bind(this);
        this.handleAccentChange = this.handleAccentChange.bind(this);
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
        osc.connect(audioContext.destination);

        if (this.state.accents[beatNumber] === 3) {
            osc.frequency.value = 880.0;
        } else if (this.state.accents[beatNumber] === 2) {
            osc.frequency.value = 440.0;
        } else if (this.state.accents[beatNumber] === 1) {
            osc.frequency.value = 220.0;
        } else {
            osc.frequency.value = 0;
        }

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
    handleAccentChange(key, val) {
        let accents = this.state.accents;
        accents[key] = parseInt(val);
        this.setState({
            accents: accents
        })
    }
    togglePlaying() {
        if (!this.state.playing) {
            this.setState({
                currentNote: 0,
                nextNoteTime: audioContext.currentTime,
            });
            this.timing = setInterval(() => {
                this.scheduler(this.state.tempo);
            }, lookahead);
        }
        else {
            clearInterval(this.timing);
        }
        this.setState({
            playing: !this.state.playing
        });
    }
    componentDidMount() {
        let accents = Array.from({ length: this.state.timeSignature[0] }, () => 1);
        this.setState({
            accents: accents
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.togglePlaying}>Play</button>
                <input value={this.state.tempo} onChange={this.changeTempo}></input>
                <Accents beats={this.state.timeSignature[0]} defaultAccent={1} handleAccentChange={this.handleAccentChange} />
            </div>
        )
    }
}

export default Metronome;