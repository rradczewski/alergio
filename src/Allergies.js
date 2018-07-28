import React from "react";
import AllergiesDb from "./data_allergies";
import "./Allergies.css";

const Allergy = ({ id, languages }) => {
  const allergy = AllergiesDb[id];
  return (
    <div className="allergy">
      {allergy.icon && <img alt={allergy.translations[languages[0]]} src={allergy.icon} className="allergyIcon" />}
      <ul className="translations">
        <li className="primaryLanguage">
          {allergy.translations[languages[0]]}  <span className="language-code">({languages[0]})</span>
        </li>
        {languages.slice(1).map(language => (
          <li key={language} className="otherLanguage">
            {allergy.translations[language]} <span className="language-code">({language})</span>
          </li>
        ))}
      </ul>
      <p className="allergyIconCredit" dangerouslySetInnerHTML={{__html: allergy.icon_credit}} />
    </div>
  );
};

export class Allergies extends React.Component {
  render() {
    return (
      <div className="allergies">
        {this.props.allergies.length > 0 ? (
          this.props.allergies.map(allergy => (
            <Allergy key={allergy} id={allergy} languages={this.props.languages} />
          ))
        ) : (
          <div>No Allergies yet</div>
        )}
      </div>
    );
  }
}
