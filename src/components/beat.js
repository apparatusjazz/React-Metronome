import React, { Component } from 'react'

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
        const colors = ["grey", "blue", "red", "black"];
        const highlight = () => {
            if (this.props.beatNo + 1 === this.props.currentNote ||
                (this.props.beatNo === 3 && this.props.currentNote === 0)) {
                return 5;
            } else return 2;
        }
        const beatStyle = { backgroundColor: colors[this.accent], padding: highlight() }
        return (
            <span className="beat" style={beatStyle}>
                <button
                    onClick={() => this.handleClick(this.props.beatNo)}
                >{this.props.beatNo}</button>
            </span>
        )
    }
}

export default Beat;