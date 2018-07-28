import React from "react";
import AllergiesDb from "./data_allergies";
import "./Settings.css";

const availableAllergies = Object.keys(AllergiesDb);
const availableLanguages = Object.keys(
  AllergiesDb[availableAllergies[0]].translations
);

export class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allergies: [...props.allergies],
      languages: [...props.languages]
    };
  }

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
      this.setState({ languages: [...this.state.languages, language] });
    } else {
      this.setState({
        languages: this.state.languages.filter(a => a !== language)
      });
    }
  };

  render() {
    const { allergies, languages } = this.state;
    const { updateSettings, hideSettings } = this.props;

    return (
      <div className="settings">
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
                  {AllergiesDb[allergy].translations.en}
                </label>
              </li>
            ))}
          </ul>
        </div>
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
                <label htmlFor={`language_${language}`}>{language}</label>
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
        <button className="secondary" onClick={hideSettings}>
          Cancel
        </button>&nbsp;
        <button
          className="primary"
          onClick={() => updateSettings({ allergies, languages })}
        >
          Save Settings
        </button>
      </div>
    );
  }
}
