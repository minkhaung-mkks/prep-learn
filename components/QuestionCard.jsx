import React from "react";

const QuestionCard = ({ question, qIndex, index, toggleRadio, answer }) => {
  return (
    <div className="question_card">
      <h3 className="question">{question.text}</h3>
      <div className="answers_box">
        <div onClick={(e) => toggleRadio(e, index, qIndex)} className={`radio_container ${answer === "a" ? "checked_container" : ""}`}>
          <input
            className="answers"
            type="radio"
            value="a"
            name={question.text}
            id="A"
            checked={answer === "a"}
          />
          <label htmlFor="A">{question.answers.a}</label>
        </div>
        <div onClick={(e) => toggleRadio(e, index, qIndex)} className={`radio_container ${answer === "b" ? "checked_container" : ""}`}>
          <input
            className="answers"
            type="radio"
            value="b"
            name={question.text}
            id="B"
            checked={answer === "b"}
          />
          <label htmlFor="B">{question.answers.b}</label>
        </div>
        <div onClick={(e) => toggleRadio(e, index, qIndex)} className={`radio_container ${answer === "c" ? "checked_container" : ""}`}>
          <input
            className="answers"
            type="radio"
            value="c"
            name={question.text}
            id="C"
            checked={answer === "c"}
          />
          <label htmlFor="C">{question.answers.c}</label>
        </div>
        <div onClick={(e) => toggleRadio(e, index, qIndex)} className={`radio_container ${answer === "d" ? "checked_container" : ""}`}>
          <input
            className="answers"
            type="radio"
            value="d"
            name={question.text}
            id="D"
            checked={answer === "d"}
          />
          <label htmlFor="D">{question.answers.d}</label>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
