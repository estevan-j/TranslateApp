import "./App.css";
import Logo from "./assets/logo.svg";
import ChangeLanguage from "./Components/icons/ChangeLanguage";
import LenguageBar from "./Components/LenguageBar/LenguageBar";
import ButtonsBar from "./Components/ButtonsBar/ButtonsBar";
import { useEffect, useState } from "react";
import SortAlfa from "./Components/icons/SortAlfa";
import { fetchTranslation } from "./helpers/fetchTranslation";

function App() {
  const [originLanguage, setOriginLanguage] = useState("en");
  const [translateLanguage, setTranslateLanguage] = useState("fr");
  const [text, setText] = useState("Hello, How are you?");
  const [textTranslate, setTextTranslate] = useState("");

  const handleTextInput = (e) => {
    e.preventDefault();
    if (e.target.value != "") {
      setText(e.target.value);
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Text copied : " + text);
  };
  
  const handleTranslateText = (e) => {
    e.preventDefault();
    if (originLanguage === translateLanguage) {
      return;
    }
    fetchTranslation(text, originLanguage, translateLanguage).then(
      (translation) => {
        console.log(translation);
        setTextTranslate(translation);
      }
    );
  };

  const handleChangeLanguages = (e) => {
    e.preventDefault();
    setOriginLanguage(translateLanguage);
    setTextTranslate(text);
    setTranslateLanguage(originLanguage);
    setText(textTranslate);
  }

  const handleSpeakText = (e, textToSpeak) => {
    e.preventDefault();
    if (textToSpeak.trim() !== '') {
      const speechSynthesis = window.speechSynthesis;
      const speechMessage = new SpeechSynthesisUtterance(textToSpeak);
      speechSynthesis.speak(speechMessage);
    }
  };

  useEffect(() => {
    fetchTranslation(text, originLanguage, translateLanguage).then(
      (translation) => {
        console.log(translation);
        setTextTranslate(translation);
      }
    );
  }, [])

  return (
    <div className="container">
      <div className="container-logo">
        <img src={Logo} alt="logo" />
      </div>
      <section className="card-input">
        <div className="bar-options">
          <LenguageBar
            isInputBar={true}
            currentLanguage={originLanguage}
            changeLenguage={setOriginLanguage}
          />
        </div>
        <textarea
          id="translate-text"
          className="text-to-translate"
          maxLength="500"
          onChange={handleTextInput}
          value={text}
        />
        <span className="letters">0/500</span>
        <div className="container-btns">
          <ButtonsBar 
            text={text} 
            handleCopy={copyText}
            handleSpeakText={handleSpeakText}
          />
          <button className="btn-translate" onClick={handleTranslateText}>
            <SortAlfa />
            Translate
          </button>
        </div>
      </section>
      <section className="card-translate">
        <div className="bar-options">
          <LenguageBar
            currentLanguage={translateLanguage}
            changeLenguage={setTranslateLanguage}
          />
          <button onClick={handleChangeLanguages}>
            <ChangeLanguage />
          </button>
        </div>
        <textarea
          id="translate-1"
          className="text-to-translate"
          maxLength="500"
          value={textTranslate}
          onChange={() => {}}
        />
        <ButtonsBar 
          text={textTranslate} 
          handleCopy={copyText} 
          handleSpeakText={handleSpeakText}            
          />
      </section>
    </div>
  );
}

export default App;
