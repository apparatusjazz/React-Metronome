import React, { Component } from 'react'

class Beat extends Component {

    handleClick(val) {
        if (this.accent === 4) {
            this.accent = 0;
        }
        this.props.handleAccentChange(val, ++this.accent);

    }
    componentDidMount() {
        this.accent = 1;
    }
    render() {
        const colors = ["grey", "blue", "red", "black"];
        const beatStyle = { backgroundColor: colors[this.accent] }
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