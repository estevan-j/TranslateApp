import "./ButtonsBar.scss";
import Talk from "../../assets/sound_max_fill.svg";
import Copy from "../../assets/Copy.svg";

const ButtonsBar = ({ text, handleCopy,handleSpeakText }) => {
  
  return (
    <div className="container-btns">
      <button onClick={(e) => handleSpeakText(e, text)}>
        <img src={Talk} />
      </button>
      <button id="btn-copy" onClick={() => handleCopy(text)}>
        <img src={Copy} />
      </button>
    </div>
  );
};

export default ButtonsBar;
