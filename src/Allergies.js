import React from "react";
import AllergiesDb from "./data_allergies";
import "./Allergies.css";

const Allergy = ({ id, languages }) => {
  const allergy = AllergiesDb[id];
  return (
    <div className="allergy">
      {allergy.icon && <img src={allergy.icon} className="allergyIcon" />}
      <ul className="translations">
        <li className="primaryLanguage">
          {allergy.translations[languages[0]]}
        </li>
        {languages.slice(1).map(language => (
          <li key={language} class="otherLanguage">
            {allergy.translations[language]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export class Allergies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="allergies">
        {this.props.allergies.length > 0 ? (
          this.props.allergies.map(allergy => (
            <Allergy id={allergy} languages={this.props.languages} />
          ))
        ) : (
          <div>No Allergies yet</div>
        )}
      </div>
    );
  }
}
