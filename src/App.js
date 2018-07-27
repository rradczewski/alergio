import React, { Component } from "react";
import { Allergies } from "./Allergies";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allergies: [
        "kiwi",
        "cashew",
        "kiwi",
        "cashew",
        "kiwi",
        "cashew",
        "kiwi",
        "cashew"
      ],
      languages: ["en", "de"]
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Allergio</h1>
        <Allergies
          allergies={this.state.allergies}
          languages={this.state.languages}
        />
      </div>
    );
  }
}

export default App;
