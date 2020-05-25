import React, { Component } from 'react'
import '../css/beat.css'

const colors = ["transparent", "#474747", "#636363", "#878787"];

class Beat extends Component {

    handleClick(val) {
        if (this.accent === 3) {
            this.accent = 0;
            this.props.handleAccentChange(val, this.accent);
        } else {
            this.props.handleAccentChange(val, ++this.accent);
        }
    }
    componentDidMount() {
        this.accent = 1;
    }
    render() {
        const highlight = () => {
            if (this.props.beatNo + 1 === this.props.currentNote ||
                (this.props.beatNo === this.props.totalBeats - 1 && this.props.currentNote === 0)) {
                return "24px 20px";
            } else return "20px 20px";
        }
        const beatStyle = { backgroundColor: colors[this.accent], padding: highlight() }
        return (
            <span className="beat" style={beatStyle}>
                <button
                    className="btn"
                    onClick={() => this.handleClick(this.props.beatNo)}
                >{this.props.beatNo + 1}</button>
            </span>
        )
    }
}

export default Beat;