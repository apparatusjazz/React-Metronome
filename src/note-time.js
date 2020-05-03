export default class NoteTime {
    constructor(tempo) {
        this.tempo = tempo;
        this.scheduleAheadTime = 0.1;
        this.lookahead = 25.0;
        this.noteLength = 0.05;
        this.noteResolution = 0;
        this.nextNoteTime = 0;
        this.audioContext = new AudioContext();
        this.current16thNote = 0;
        this.timerWorker = null;
    }
    timer() {
        setInterval(() => {
            this.scheduler(this.tempo);
        }, this.scheduleAheadTime);
    }
    nextNote(tempo) {
        // Advance current note and time by a 16th note...
        let secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT 
        // tempo value to calculate beat length.
        this.nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

        this.current16thNote++;    // Advance the beat number, wrap to zero
        if (this.current16thNote === 16) {
            this.urrent16thNote = 0;
        }
    }
    scheduleNote(beatNumber, time) {
        if ((this.noteResolution === 1) && (this.beatNumber % 2))
            return; // we're not playing non-8th 16th notes
        if ((this.noteResolution === 2) && (this.beatNumber % 4))
            return; // we're not playing non-quarter 8th notes

        // create an oscillator
        let osc = this.audioContext.createOscillator();
        osc.connect(this.audioContext.destination);
        if (beatNumber % 16 === 0)    // beat 0 == high pitch
            osc.frequency.value = 880.0;
        else if (beatNumber % 4 === 0)    // quarter notes = medium pitch
            osc.frequency.value = 440.0;
        else                        // other 16th notes = low pitch
            osc.frequency.value = 220.0;

        osc.start(time);
        osc.stop(time + this.noteLength);
    }
    scheduler(tempo) {
        // while there are notes that will need to play before the next interval, 
        // schedule them and advance the pointer.
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.current16thNote, this.nextNoteTime);
            this.nextNote(tempo);
        }
    }
    play(playing) {
        if (!playing) {
            this.current16thNote = 0;
            this.nextNoteTime = this.audioContext.currentTime;
            this.timer();
        }
        else {

        }
    }
}