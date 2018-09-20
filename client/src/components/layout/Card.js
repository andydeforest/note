import React, { Component } from 'react'
import './Card.css'

export default class Card extends Component {

	render() {
		return (
			<div className="row h-100">
				<div className={(this.props.bswidth ? this.props.bswidth : "col-lg-4 col-md-8 col-xs-10") +  " mx-auto"}>
					<div className="card h-auto justify-content-center" {...this.props}>
						{this.props.title &&
						    <h2 className="card-header text-center">{this.props.title}</h2>
						}
						<div className="card-body">
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		)
	}
}