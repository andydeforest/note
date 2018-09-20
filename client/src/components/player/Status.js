import React, { Component } from 'react'
import AnimateHeight from 'react-animate-height'
import API from '../../utils/API'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';

import './Status.css'


export default class Status extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dragValue: this.props.position * 100000
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({dragValue: nextProps.position * 100000});
	}


	dragProgress = position => {
		this.setState({dragValue: position});
		this.props.setSongPosition(position / 100000);
	}

	render() {

		const iconSize = 32;

		return(
			<AnimateHeight duration={500} height={this.props.isVisible ? 'auto' : 0} style={{position: 'fixed', bottom: 0, width: '100%'}}>
				<div id="player-status">
				{this.props.song &&
					<div className="row p-3">
						<div className="col-md-4 d-none d-lg-block justify-content-center align-self-center">
							<div className="row">
								<div className="col-md-auto">
									<img className="img-fluid" alt={this.props.song.common.title} style={{ maxHeight: '80px' }} src={API.imageFromBuffer(this.props.song)} />
								</div>
								<div className="col-md-auto">
									{this.props.song.common.title && 
										<h4>{this.props.song.common.title}</h4>
									}
									{this.props.song.common.artist &&
										<h6>{this.props.song.common.artist}</h6>
									}
									{this.props.song.common.album &&
										<h6>{this.props.song.common.album}</h6>
									}
								</div>
							</div>
						</div>
						<div className="col-md-4 col-xs-12">
							<div className="row justify-content-center">
								<div className="col-xs-4 px-1">
									<MdSkipPrevious size={iconSize} onClick={() => this.props.skipSong(-1)} />
								</div>
								<div className="col-xs-4 px-1">
									{this.props.isPlaying ? <FaPauseCircle size={iconSize} onClick={this.props.pause} /> : <FaPlayCircle size={iconSize} onClick={this.props.play} />}
								</div>
								<div className="col-xs-4 px-1">
									<MdSkipNext size={iconSize} onClick={() => this.props.skipSong(1)} />
								</div>
							</div>
							<div className="row justify-content-center py-1">
								<div className="col text-center">
									{API.convertMsToTime(this.props.position * 1000)} / {API.convertMsToTime(this.props.song.format.duration * 1000)}
								</div>
							</div>
							<div className="row justify-content-center py-1">
								<div className="col text-center d-sm-none">
									{this.props.song.common.title}
								</div>
							</div>
							<div className="row">
								<div className="col">
									<Slider value={this.state.dragValue} max={this.props.song.format.duration * 100000} onChange={this.dragProgress} tooltip={false} />
								</div>
							</div>
						</div>
					</div>
				}
				</div>
			</AnimateHeight>
		)
	}
}