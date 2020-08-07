/*global chrome*/

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import client from "./axios";
import { Navbar, Button, Spinner } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
      showAudio: false,
      newsData: "",
      render: false,
      spinner: false,
      hideButton: false
    };
    this.renderAudio = this.renderAudio.bind(this);
  }

  renderAudio() {
    client
      .post("/api/scrape", {
        url: window.location.href,
      })
      .then((res) => {
        this.setState({ audioFiles: res.data.files, spinner: true, hideButton: true});
        setTimeout( () => {
          this.setState({showAudio: true, spinner: false});
        }, 30000);
      });
  }

  render() {
    let arr = []
    if (this.state.showAudio === true) {
      console.log(this.state.audioFiles)
      for (let i = 0; i < this.state.audioFiles.length; i++) {
        arr.push(<audio src = {this.state.audioFiles[i]} controls/>)
    }
    }
    
    return (
      <div className="App">
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home" className="navName">
              Newspaper Reader
            </Navbar.Brand>
          </Navbar>
        </div>
        {this.state.hideButton === false && (
          <Button
            variant="success"
            onClick={this.renderAudio}
            className="button"
            size="lg"
          >
            Audio
          </Button>
        )}
        {this.state.spinner === true && 
          <Spinner animation="border" className = 'spinner'/>}
        {arr}
      </div>
    );
  }
}

export default App;
