import React, { Component } from 'react'
import axios from 'axios'
import Track from '../player/Track'
import Card from '../layout/Card'
import Status from '../player/Status'
import LoadingOverlay from '../layout/LoadingOverlay'
import Search from '../player/Search'
import Switch from 'react-switch'
import Slider from 'react-slick'
import socket from 'socket.io-client'

export default class Player extends Component {

	constructor(props) {
		super(props);
		this.state = {
			autoplay: true,
			isLoading: false,
			songsCopy: [],
			songs: [],
			statusVisible: false,
			playing: false,
			song: null,
			songPosition: 0,
			songDuration: 0
		}
		this.audio = null;
	}

	componentDidMount = () => {
		this.loadSongs();
		// Listens for changes to our music folder
		const updateListener = socket('http://localhost:8001');
		updateListener.on('update', (s) => {
			// A change was found, update the list
			this.loadSongs();
		});
	}

	playSong = song => {
		// If a song is currently playing, we have to remove it
		if(this.audio !== null) {
			this.audio.removeEventListener('timeupdate', () => {
				this.setState({songPosition: 0});
			});
			this.audio.pause();
			this.audio.removeAttribute('src');
			this.audio.load();
		}
		this.audio = new Audio(window.location.href + 'music/' + song.filename);
		this.audio.play();

		// Show the status bar at the bottom
		this.setState({song: song, playing: true, statusVisible: true});

		// Update the song position as the song plays
		this.audio.addEventListener('timeupdate', e => {
			this.setState({songPosition: this.audio.currentTime});
		});

		// If autoplay is set, move to the next song in the queue after the current one has finished
		this.audio.addEventListener('ended', () => {
			if(this.state.autoplay) {
				this.skipSong(1);
			} else {
				this.setState({playing: false, statusVisible: false});
			}
		});
	}

	setSongPosition = seconds => {
		if(this.audio !== null) {
			this.audio.currentTime = seconds;
		}
	}

	skipSong = index => {
		// Reset times
		let indexTo = this.state.song.index + index;
		if(this.state.songs.length > indexTo && indexTo > 0) {
			this.playSong(this.state.songs[indexTo]);
		} else if(indexTo < 0) {
			// Play the last song in the queue
			this.playSong(this.state.songs[this.state.songs.length - 1]);

		} else {
			this.playSong(this.state.songs[0]);
		}
	}

	pauseSong = () => {
		this.audio.pause();
		this.setState({playing: false});
	}

	resumeSong = () => {
		this.audio.play();
		this.setState({playing: true});
	}

	loadSongs = () => {
		this.setState({isLoading: true});
		axios.post('/api/audio/list').then(res => {
			if(res.data.success) {
				res.data.songs.forEach((obj, i) => { 
					obj.isVisible = true
					obj.index = i;
				});
				this.setState({songsCopy: res.data.songs});
				this.setState({songs: res.data.songs});
			}
			this.setState({isLoading: false});
		});
	}

	filterBy = str => {
		this.setState({songs: []});
		let results = this.state.songsCopy.filter(obj => {
			return obj.common.title.toLowerCase().includes(str.toLowerCase());
		});
		this.setState({songs: results});
	}

	render() {
		const settings = {
			dots: false,
			lazyLoad: true,
			infinite: this.state.songs.length > 1,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
					  slidesToShow: 3,
					  slidesToScroll: 3,
					}
				},
				{
					breakpoint: 768,
					settings: {
					  slidesToShow: 1,
					  slidesToScroll: 1,
					}
				}
			  ]	
		};
		return (
			<div>
				<div className="container-fluid" id="app">
					<Card bswidth="col-md-8 col-sm-8 col-xs-6" style={{ backgroundColor: "rgba(255,255,255,0.1)", display: "block" }}>
						<LoadingOverlay isVisible={this.state.isLoading}>
							<div className="row">
								<div className="col">
									<Search filterBy={this.filterBy} />
								</div>
								<div className="col-md-auto align-middle d-none d-sm-block">
									<div className="float-right" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
										Autoplay
									</div>
								</div>
								<div className="col-xs-auto">
									<div className="float-left">
										<label htmlFor="autoplay-switch">
											<Switch onChange={() => this.setState({autoplay: !this.state.autoplay})} checked={this.state.autoplay} id="autoplay-switch" />
										</label>
									</div>
								</div>
							</div>
							<Slider {...settings}>
								{this.state.songs.map((song, i) => {
									return (<Track index={i} key={i} {...song} onPlay={this.playSong} />)
								})}
							</Slider>
						</LoadingOverlay>
					</Card>
				</div>
				<Status isVisible={this.state.statusVisible} isPlaying={this.state.playing} position={this.state.songPosition} skipSong={this.skipSong} song={this.state.song} play={this.resumeSong} pause={this.pauseSong} setSongPosition={this.setSongPosition} />
			</div>
		)
	}
}