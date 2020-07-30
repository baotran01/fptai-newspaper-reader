/*global chrome*/

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import client from "./axios";
import { Navbar } from "react-bootstrap";

class App extends Component {
  constructor() {
    super();
    this.state = {
      audioFile: "",
      showAudio: false,
      newsData: "",
    };
    this.renderAudio = this.renderAudio.bind(this);
  }

  renderAudio() {
    client
      .post("/api/scrape", {
        url: window.location.href,
      })
      .then((res) => {
        this.setState({
          audioFile: res.data.async,
          showAudio: true,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          </Navbar>
        </div>
        {this.state.showAudio === false && (
          <button onClick={this.renderAudio}>Audio</button>
        )}
        {this.state.showAudio === true && (
          <div>
            <audio src={this.state.audioFile} controls />
            <br />
            {/* <div className = 'displayText'>{this.state.newsData}</div> */}
          </div>
        )}
      </div>
    );
  }
}

export default App;
