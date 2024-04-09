import { useEffect, useState } from "react";
import Expand from "../icons/Expand";
import "./LenguageBar.scss";
import { LanguagesData } from "../../helpers/Lenguaje";
import { selectLanguages } from "../../helpers/SelectLanguages";

// eslint-disable-next-line react/prop-types
const LenguageBar = ({ isInputBar, currentLanguage, changeLenguage }) => {
  const [lenguages, setLenguages] = useState([]);
  const [barLenguages, setBarLenguages] = useState(['es', 'en', 'fr']);
  const data = LanguagesData;

  useEffect(() => {
    let lengs = selectLanguages(data, barLenguages);
    setLenguages(lengs);
  }, [barLenguages]);

  const changeCurrentLenguage = (e) => {
    e.preventDefault();

    if (!barLenguages.includes(e.target.value)){
      setBarLenguages([e.target.value].concat(barLenguages.slice(1)));
    }
    changeLenguage(e.target.value);
  }

  return (
    <div className="lenguageBar">
      {isInputBar && <a>Detect Language</a>}
      {lenguages.map((len, index) => (
        <button key={index} 
          className={`a-lenguage ${currentLanguage == len.code ? 'a-active': ''} `} 
          value={len.code}  
          onClick={changeCurrentLenguage}>
          {len.name}
        </button>
      ))}
      <button id="more-len">
        <Expand />
      </button>
    </div>
  );
};

export default LenguageBar;
