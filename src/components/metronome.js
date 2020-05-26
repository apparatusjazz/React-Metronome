import React, { Component } from 'react'
import Accents from './accents';
import Tap from './tap';
import Tempo from './tempo';
import TimeSignature from './time-signature'
import Play from './play';
import '../css/metronome.css'

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
        this.bpmTap = this.bpmTap.bind(this);
        this.changeBeatLength = this.changeBeatLength.bind(this);
        this.changeBeatNo = this.changeBeatNo.bind(this);
        this.tempoChange = this.tempoChange.bind(this);
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
    changeTempo(val) {
        this.setState({ tempo: val });

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
    bpmTap(bpm) {
        this.setState({
            tempo: bpm
        });
    }
    tempoChange(val) {
        let tempo = this.state.tempo;
        val === 1 ? tempo++ : tempo--;
        this.setState({
            tempo: tempo
        })
    }
    componentDidMount() {
        let accents = Array.from({ length: this.state.timeSignature[0] }, () => 1);
        this.setState({
            accents: accents
        });
    }
    changeBeatNo(val) {
        let newTimeSig = this.state.timeSignature;
        newTimeSig[0] = val;
        let accents = this.state.accents;
        if (val > accents.length) {
            for (let i = accents.length; i < val; i++) {
                accents.push(1);
            }
        } else if (val < accents.length) {
            for (let i = accents.length; i > val; i--) {
                accents.pop();
            }
        }
        this.setState({
            timeSignature: newTimeSig,
            accents: accents
        })
    }
    changeBeatLength(val) {
        let newTimeSig = this.state.timeSignature;
        newTimeSig[1] = val;
        this.setState({
            timeSignature: newTimeSig
        })
    }
    render() {
        return (
            <div>
                <Accents
                    beats={this.state.timeSignature[0]}
                    defaultAccent={1}
                    handleAccentChange={this.handleAccentChange}
                    currentNote={this.state.currentNote}
                />
                <Tempo
                    tempo={this.state.tempo}
                    changeTempo={this.changeTempo}
                    tempoChange={this.tempoChange}
                />
                <div className="controls">
                    <TimeSignature
                        changeBeatNo={this.changeBeatNo}
                        changeBeatLength={this.changeBeatLength}
                    />
                    <Play playing={this.state.playing} togglePlaying={this.togglePlaying} />
                    <Tap bpmTap={this.bpmTap} />
                </div>
            </div>
        )
    }
}

export default Metronome;