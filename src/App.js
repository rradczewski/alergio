import React, { Component } from "react";
import { Allergies } from "./Allergies";
import logo from "./daisy.svg";

import IntroText from "./data_intro";
import "./App.css";
import "./fonts.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allergies: ["kiwi", "cashew", "almond", "pistachio"],
      languages: ["en", "ar", "zh", "fr", "es"]
    };
  }

  render() {
    return (
      <div className="App">
        <div className="TopBar">
          <img alt="Logo for Alergio, a daisy flower" src={logo} id="logo" />
          <h1>Alergio</h1>
        </div>
        <div className="introText">
          <p className="primaryLanguage">
            {IntroText[this.state.languages[0]]} <span className="language-code">({this.state.languages[0]})</span>
          </p>
          {this.state.languages.slice(1).map(language => (
            <p key={language} className="otherLanguage">
              {IntroText[language]} <span className="language-code">({language})</span>
            </p>
          ))}
        </div>
        <Allergies
          allergies={this.state.allergies}
          languages={this.state.languages}
        />
        <div className="footer">
          <p>Daisy Icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
          <p>
            Tangerine-Regular.ttf: Copyright (c) 2010 by Toshi Omagari. All rights reserved.<br/>
            Tangerine-Bold.ttf: Copyright (c) 2010 by Toshi Omagari. All rights reserved.
          </p>
          <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
          <p><strong>Privacy statement</strong>: We are not storing any of your information. Our hosting is done via netlify, you can read their DPA <a href="https://www.netlify.com/gdpr/">here</a>.</p>
        </div>
      </div>
    );
  }
}

export default App;
