import React, { Component } from "react";
import store from "store";
import { Switch, Route, Link } from "react-router-dom";

import { Allergies } from "./Allergies";
import { Settings } from "./Settings.js";
import { Imprint } from "./Imprint.js";

import { classNameForLanguage } from "./data_language_direction";
import IntroText from "./data_intro";

import logo from "./daisy.svg";
import settings from "./settings.svg";
import cancel from "./cancel.svg";

import "./App.css";
import "./fonts.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allergies: store.get("allergies") || [],
      languages: store.get("languages") || ["en"]
    };
  }

  updateSettings = ({ allergies, languages }) => {
    store.set("allergies", allergies);
    store.set("languages", languages);
    this.setState({ allergies, languages, showSettings: false });
  };

  render() {
    return (
      <div className="App">
        <div className="TopBar">
          <img alt="Logo for Alergio, a daisy flower" src={logo} id="logo" />
          <h1>Alergio</h1>
          <Switch>
            <Route exact path="/">
              <div>
                <Link to="/settings">
                  <button id="settings-button">
                    <img alt="settings" src={settings} />
                  </button>
                </Link>
              </div>
            </Route>
            <Route>
              <Link to="/">
                <button id="settings-button">
                  <img alt="dismiss settings" src={cancel} />
                </button>
              </Link>
            </Route>
          </Switch>
        </div>
        <div className="content">
          <Switch>
            <Route path="/imprint">
              <Imprint />
            </Route>
            <Route exact path="/settings">
              <Settings
                languages={this.state.languages}
                allergies={this.state.allergies}
                hideSettings={this.hideSettings}
                updateSettings={this.updateSettings}
              />
            </Route>
            <Route path="/">
              {this.state.allergies.length > 0 ? (
                <div>
                  <div className="introText">
                    <p
                      className={`primaryLanguage ${classNameForLanguage(
                        this.state.languages[0]
                      )}`}
                    >
                      {IntroText[this.state.languages[0]]}&nbsp;
                      <span className="language-code">
                        ({this.state.languages[0]})
                      </span>
                    </p>
                    {this.state.languages.slice(1).map(language => (
                      <p
                        key={language}
                        className={`otherLanguage ${classNameForLanguage(
                          language
                        )}`}
                      >
                        {IntroText[language]}&nbsp;
                        <span className="language-code">({language})</span>
                      </p>
                    ))}
                  </div>
                  <Allergies
                    allergies={this.state.allergies}
                    languages={this.state.languages}
                  />
                </div>
              ) : (
                <div className="box landing">
                  <p>
                    Welcome to <strong>alergio</strong>, a simple way to share
                    your food allergies and dietary requirements with chefs and
                    waiters in their first language.
                  </p>
                  <p>
                    To get started, simply pick your allergies and choose the
                    languages you want to see. Don{"'"}t worry, your data is
                    neither stored nor transmitted to our servers.
                  </p>
                  <p>
                    This app is also offline-enabled! Simply open the settings
                    and click "Add to home screen" and <strong>alergio</strong>{" "}
                    will work just like a native app!
                  </p>
                  <p style={{ textAlign: "center" }}>
                    <Link to="/settings">
                      <button className="btn btn-primary">Get Started</button>
                    </Link>
                  </p>
                </div>
              )}
            </Route>
          </Switch>
          <div className="box footer">
            <Link to="/imprint">Imprint, Legal and Copyright</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
