import React, { Component } from 'react'

class Tap extends Component {
    handleClick() {
        this.time = new Date();
        let newInterval = this.time.getTime() - this.old;
        this.old = this.time;

        if (newInterval < 1000) {      //Don't do anything if interval is too big
            this.interval.push(newInterval);
            this.time = this.time.getTime();
            let avg;
            // Get average
            if (this.interval.length >= 2) {
                let sum = this.interval.reduce((a, b) => a + b, 0)
                avg = sum / this.interval.length;
                this.props.bpmTap(Math.floor(60000 / avg));
            }
        } else this.interval = [];
    }
    componentDidMount() {
        this.interval = [];
        this.time = new Date();
        this.old = 0;
    }
    render() {
        return (
            <div>
                <button onClick={() => this.handleClick()}>Tap</button>
            </div>
        )
    }
}

export default Tap;