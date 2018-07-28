import store from "store";

import React, { Component } from "react";
import { Allergies } from "./Allergies";
import { Settings } from "./Settings.js";

import { classNameForLanguage } from "./data_language_direction";

import logo from "./daisy.svg";
import settings from "./settings.svg";

import IntroText from "./data_intro";
import "./App.css";
import "./fonts.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSettings: false,
      allergies: store.get("allergies") || [],
      languages: store.get("languages") || ["en"]
    };
  }

  updateSettings = ({ allergies, languages }) => {
    store.set("allergies", allergies);
    store.set("languages", languages);
    this.setState({ allergies, languages, showSettings: false });
  };
  toggleSettings = () => this.setState(state => ({showSettings: !state.showSettings}));
  hideSettings = () => this.setState({ showSettings: false });
  showSettings = () => this.setState({ showSettings: true });

  render() {
    return (
      <div className="App">
        <div className="TopBar">
          <img alt="Logo for Alergio, a daisy flower" src={logo} id="logo" />
          <h1>Alergio</h1>
          <button onClick={this.toggleSettings} id="settings">
            <img alt="settings" src={settings} />
          </button>
        </div>
        <div className="content">
          {this.state.showSettings ? (
            <Settings
              languages={this.state.languages}
              allergies={this.state.allergies}
              hideSettings={this.hideSettings}
              updateSettings={this.updateSettings}
            />
          ) : this.state.allergies.length > 0 ? (
            <div>
              <div className="introText">
                <p
                  className={`primaryLanguage ${classNameForLanguage(
                    this.state.languages[0]
                  )}`}
                >
                  {IntroText[this.state.languages[0]]}{" "}
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
                    {IntroText[language]}{" "}
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
                Welcome to <strong>alergio</strong>, a simple way to share your
                food allergies and dietary requirements with chefs and waiters
                in their first language.
              </p>
              <p>
                To get started, simply pick your allergies and choose the
                languages you want to see. Don{"'"}t worry, your data is neither
                stored nor transmitted to our servers.
              </p>
              <p>
                This app is also offline-enabled! Simply open the settings and
                click "Add to home screen" and <strong>alergio</strong> will
                work just like a native app!
              </p>
              <p style={{ textAlign: "center" }}>
                <button className="btn btn-primary" onClick={this.showSettings}>
                  Get Started
                </button>
              </p>
            </div>
          )}
          <div className="box footer">
            <p>
              Settings Icon made by{" "}
              <a
                href="https://www.flaticon.com/authors/smashicons"
                title="Smashicons"
              >
                Smashicons
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>{" "}
              is licensed by{" "}
              <a
                href="http://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
              >
                CC 3.0 BY
              </a>
            </p>
            <p>
              Daisy Icon made by{" "}
              <a href="http://www.freepik.com" title="Freepik">
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>{" "}
              is licensed by{" "}
              <a
                href="http://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
              >
                CC 3.0 BY
              </a>
            </p>
            <p>
              Tangerine-Regular.ttf: Copyright (c) 2010 by Toshi Omagari. All
              rights reserved.<br />
              Tangerine-Bold.ttf: Copyright (c) 2010 by Toshi Omagari. All
              rights reserved.
            </p>
            <p>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.
            </p>
            <p>
              We provide no guarantees about the accuracy of the translations.
              This app does not provide medical advice but is for informational
              purposes only.
            </p>
            <p>
              <strong>Privacy statement</strong>: We are not storing any of your
              information. Our hosting is done via netlify, you can read their
              DPA <a href="https://www.netlify.com/gdpr/">here</a>.
            </p>
            <p>
              <a href="https://ymmv.craftswerk.io/imprint/">Imprint</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
