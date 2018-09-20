import base64js from 'base64-js'

export default {

	imageFromBuffer: (props) => {
		try {
			return 'data:' + props.common.picture[0].format + ';base64,' + base64js.fromByteArray(props.common.picture[0].data.data);

		} catch(ex) {
			return '/images/album.jpg';
		}
	},

	convertMsToTime: (milliseconds) => {
		var date = new Date(milliseconds);
		var m = date.getMinutes();
		var s = date.getSeconds();
		return m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');

	}

};
