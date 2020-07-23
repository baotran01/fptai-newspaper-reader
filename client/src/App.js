/*global chrome*/

import React, { Component } from 'react';
import './App.css';
import client from "./axios";

const key  = process.env.REACT_APP_API_KEY

class App extends Component {
  constructor() {
    super()
    this.state = {
      audioFile: "",
      showAudio: false
    }
    this.renderAudio = this.renderAudio.bind(this)
  }
  
  renderAudio() {
    client.post('/api/scrape', {
      url: window.location.href
    })
    .then(res => {
      const data = res.data
      return fetch('https://api.fpt.ai/hmi/tts/v5', {
        method: 'POST',
        headers: {
          'api_key': key
        },
        body: data
      })
      .then(response => response.json())
      .then(jsondata => this.setState({audioFile: jsondata.async, showAudio: true}))
    })
  }

  render() {
    console.log(process.env.REACT_APP_GOOGLE_API_KEY)
    return (
      <div className="App">
        <h1>My Extension</h1>
        {this.state.showAudio === false &&<button onClick = {this.renderAudio}>Audio</button>}
        {this.state.showAudio === true && <audio src= {this.state.audioFile} controls/>}
      </div>
    );
  }
}

export default App;
