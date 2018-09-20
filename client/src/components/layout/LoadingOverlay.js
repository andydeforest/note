import React, { Component } from 'react'
import './LoadingOverlay.css'

export default class LoadingOverlay extends Component {

	render() {
		return (
			<div>
				<div className="loading-overlay d-flex" style={{visibility: this.props.isVisible ? 'visible' : 'hidden' }}>
					<div className="loading-animation m-auto"></div>
				</div>
				<div style={{ visibility: 'visible' }}>
					{this.props.children}
				</div>
			</div>				
		)
	}
}