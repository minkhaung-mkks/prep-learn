import React from "react";

const QuestionCard = ({question,qIndex,index, toggleRadio}) => {
  return (
    <div className="question_card">
      <h3 className="question">{question.text}</h3>
      <div className="answers_box">
        <div onClick={()=>toggleRadio(e,index, qIndex)} className="radioContainer">
          <input
            className="answers"
            type="radio"
            value="a"
            name={question.text}
            id="A"
          />
          <label for="A">{question.answers.a}</label>
        </div>
        <div onClick={()=>toggleRadio(e,index, qIndex)} className="radioContainer">
          <input
            className="answers"
            type="radio"
            value="b"
            name={question.text}
            id="B"
          />
          <label for="B">{question.answers.b}</label>
        </div>
        <div onClick={()=>toggleRadio(e,index, qIndex)} className="radioContainer">
          <input
            className="answers"
            type="radio"
            value="c"
            name={question.text}
            id="C"
          />
          <label for="C">{question.answers.c}</label>
        </div>
        <div onClick={()=>toggleRadio(e,index, qIndex)} className="radioContainer">
          <input
            className="answers"
            type="radio"
            value="d"
            name={question.text}
            id="D"
          />
          <label for="D">{question.answers.d}</label>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
