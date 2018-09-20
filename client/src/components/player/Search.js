import React, { Component } from 'react'
import './Search.css'

export default class Search extends Component {

	render() {
		return (
			<div className="row">
				<div className="col-12 fright">
					<input type="text" className="transparent-input" placeholder="Search..." onChange={(e) => this.props.filterBy(e.target.value)} />
				</div>
			</div>
		)
	}
}