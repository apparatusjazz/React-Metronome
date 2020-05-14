import React, { Component } from 'react'

class Tap extends Component {

    handleClick() {
        if (typeof this.interval === undefined) {
            this.interval = [];
            this.time = new Date();
        }
        let newInterval = this.time.getTime() - this.time;

        if (newInterval < 70000) {      //Don't do anything if interval is too big
            this.interval.push(newInterval);
            this.time = this.time.getTime();
            const avg;
            // Get average
            if (this.interval.length >= 2) {
                avg = this.interval.reduce((a, b) => {
                    return (a + b) / this.interval.length;
                }, 0);
                this.props.bpmTap(avg);
            }
        }
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Tap</button>
            </div>
        )
    }
}

export default Tap;