import React, { Component } from 'react'

class Beat extends Component {
    handleChange(evt, val) {
        this.props.handleAccentChange(val, evt.target.value);
    }
    render() {
        const beatStyle = { height: 150, width: 100, backgroundColor: "grey" }
        return (
            <div style={beatStyle}>
                <form>
                    <input
                        type="text"
                        defaultValue={this.props.accent.toString()}
                        onChange={(e) => { this.handleChange(e, this.props.beatNo) }}>
                    </input>
                </form>
            </div>
        )
    }
}

export default Beat;