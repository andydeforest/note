import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavHeader from './components/layout/NavHeader'
import Home from './components/Home'
import './App.css'

export default class App extends Component {

	render() {
		return (
			<div className="full-height">
				<NavHeader />
				<Home />
			</div>
		)
	}
}