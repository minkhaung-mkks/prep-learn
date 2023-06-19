import React from "react";

const QuestionCard = ({ question, qIndex, index, toggleRadio, answer, hasSubmitted }) => {
  return (
    <div className="question_card">
      <h3 className="question">{question.text}</h3>
      <div className="answers_box">
        <div onClick={(e) => toggleRadio(e, index, qIndex)} className={`radio_container ${hasSubmitted ? "noClick" : ""} ${answer === "a" ? `checked_container ${hasSubmitted && question.correct !== 'a' ? "wrongBox" : ""}` : ""} ${hasSubmitted && question.correct === 'a' ? "correctBox" : ""}`}>
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
        <div onClick={(e) => toggleRadio(e, index, qIndex)} className={`radio_container ${hasSubmitted ? "noClick" : ""} ${answer === "b" ? `checked_container ${hasSubmitted && question.correct !== 'b' ? "wrongBox" : ""}` : ""} ${hasSubmitted && question.correct === 'b' ? "correctBox" : ""}`}>
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
        <div onClick={(e) => toggleRadio(e, index, qIndex)} className={`radio_container ${hasSubmitted ? "noClick" : ""} ${answer === "c" ? `checked_container ${hasSubmitted && question.correct !== 'c' ? "wrongBox" : ""}` : ""} ${hasSubmitted && question.correct === 'c' ? "correctBox" : ""}`}>
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
        <div onClick={(e) => toggleRadio(e, index, qIndex)} className={`radio_container ${hasSubmitted ? "noClick" : ""} ${answer === "d" ? `checked_container ${hasSubmitted && question.correct !== 'd' ? "wrongBox" : ""}` : ""} ${hasSubmitted && question.correct === 'd' ? "correctBox" : ""}`}>
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
      {hasSubmitted &&
        <div className="correct_box">
          <h5 className={answer === question.correct ? 'correct_answer' : 'wrong_answer'}>
            {question.correct + ' ' + question.answer_text}
          </h5>
          <div className="underline"></div>
          <p className="correct_reason">
            {question.reason}
          </p>
        </div>
      }
    </div>
  );
};

export default QuestionCard;
