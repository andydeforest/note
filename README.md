# Note

Note is a simple music server built on top of NodeJS. The server reads MP3 files within a folder, parses their metadata, and delivers them to a ReactJS front-end. It will also listen for changes to the music folder (adding/removing a song) and update the front-end when a change occurs using Socket.IO.

[Working Demo](https://andydeforest-note.herokuapp.com/)

![Image of Note](https://i.imgur.com/R5rZdYl.png)

## Getting Started

### Prerequisites

Note is built on top of NodeJS and requires a package manager such as NPM or Yarn.

### Installing

Clone the repository

```
git clone https://github.com/andydeforest/note.git
```

Download dependencies

```
yarn install
```

Build and run the server

```
yarn start
```

## Built With

* [NodeJS](https://nodejs.org)
* [Express](https://expressjs.com)
* [Socket.io](https://socket.io/)
* [React](https://reactjs.org/)
* [react-slick](https://github.com/akiran/react-slick)
* [music-metadata](https://github.com/Borewit/music-metadata)
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details