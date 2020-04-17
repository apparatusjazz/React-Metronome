import React, { Component } from 'react'

class Beat extends Component {
    render() {
        const beatStyle = { height: 150, width: 100, backgroundColor: "grey" }
        return (
            <div style={beatStyle}>
                Beat
            </div>
        )
    }
}

export default Beat;