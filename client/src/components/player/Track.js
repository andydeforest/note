import React, { Component } from 'react'
import API from '../../utils/API'
import { FaPlay } from 'react-icons/fa';

export default class Track extends Component {

	render() {
		return(
			<div className="px-3">
				<div className="card card-bg" style={{visibility: this.props.isVisible ? 'visible' : 'hidden' }}>
					<img className="card-img-top img-fluid" src={API.imageFromBuffer(this.props)} alt={this.props.title} />
					<div className="card-body">
						<strong>{this.props.common.title}</strong><br />
						{this.props.common.artist}<br />
						<small><i>{this.props.common.album}</i></small>
						<div className="row pt-3">
							<div className="col-12">
								<button className="btn btn-success btn-block" onClick={() => this.props.onPlay(this.props)}><FaPlay /></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}