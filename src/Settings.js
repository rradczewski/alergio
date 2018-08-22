import React from "react";
import AllergiesDb from "./data_allergies";
import "./Settings.css";
import { withRouter } from "react-router";

const availableAllergies = Object.keys(AllergiesDb);
const availableLanguages = Object.keys(
  AllergiesDb[availableAllergies[0]].translations
);

const withPreventDefault = f => e => {
  e.preventDefault();
  return f(e) || false;
};

class SettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allergies: [...props.allergies],
      languages: [...props.languages]
    };
  }

  setPrimary = language => {
    this.setState({
      languages: [language, ...this.state.languages.filter(a => a !== language)]
    });
  };

  toggleAllergy = (allergy, checked) => {
    if (checked) {
      this.setState({ allergies: [...this.state.allergies, allergy] });
    } else {
      this.setState({
        allergies: this.state.allergies.filter(a => a !== allergy)
      });
    }
  };

  toggleLanguage = (language, checked) => {
    if (checked) {
      this.setState({
        languages: [
          ...this.state.languages.filter(a => a !== language),
          language
        ]
      });
    } else {
      const newLanguages = this.state.languages.filter(a => a !== language);
      if (newLanguages.length === 0) newLanguages.push("en");
      this.setState({
        languages: newLanguages
      });
    }
  };

  saveAndExit = () => {
    const { allergies, languages } = this.state;
    const { updateSettings } = this.props;

    updateSettings({ allergies, languages });
    this.props.history.push("/");
  };

  cancel = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="settings">
        <div className="box">
          <h2>Languages</h2>
          <ul>
            {availableLanguages.map(language => (
              <li key={language}>
                <input
                  type="checkbox"
                  checked={
                    this.state.languages.includes(language) ? "checked" : ""
                  }
                  id={`language_${language}`}
                  name="language"
                  onChange={e =>
                    this.toggleLanguage(e.target.value, e.target.checked)
                  }
                  value={language}
                />
                <label htmlFor={`language_${language}`}>
                  {language}
                  <button
                    onClick={withPreventDefault(() =>
                      this.setPrimary(language)
                    )}
                    className={`button-primary-language ${
                      this.state.languages[0] === language
                        ? "button-primary-language-active"
                        : ""
                    }`}
                  >
                    Primary
                  </button>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="box">
          <h2>Allergies</h2>
          <ul>
            {availableAllergies.map(allergy => (
              <li key={allergy}>
                <input
                  type="checkbox"
                  checked={
                    this.state.allergies.includes(allergy) ? "checked" : ""
                  }
                  id={`allergy_${allergy}`}
                  name="allergy"
                  onChange={e =>
                    this.toggleAllergy(e.target.value, e.target.checked)
                  }
                  value={allergy}
                />
                <label htmlFor={`allergy_${allergy}`}>
                  <img
                    alt={`Icon for ${allergy}`}
                    src={AllergiesDb[allergy].icon}
                  />
                  {AllergiesDb[allergy].translations[this.state.languages[0]]}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="box">
          Want to add a language or an allergene? Alergio is free software under
          MIT license. You can add a language{" "}
          <a href="https://github.com/rradczewski/alergio">
            here via Pull Request
          </a>.
        </div>
        <button onClick={this.cancel}>Cancel</button>&nbsp;
        <button className="btn-primary" onClick={this.saveAndExit}>
          Save Settings
        </button>
      </div>
    );
  }
}

export const Settings = withRouter(SettingsPanel);
