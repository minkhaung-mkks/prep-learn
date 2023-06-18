import { useState } from 'react';

const QuizInfo = ({ quizInfoState, updateQuizInfoState, nextPage }) => {
  const handleNext = () => {
    // Validate the quiz information fields
    // ...

    // Proceed to the next page
    nextPage();
  };

  return (
    <div>
      <h2>Quiz Information</h2>
      <input
        type="text"
        value={quizInfoState.quizName}
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, quizName: e.target.value })}
        placeholder="Quiz Name"
      />
      <input
        type="text"
        value={quizInfoState.quizSubject}
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, quizSubject: e.target.value })}
        placeholder="Quiz Subject"
      />
      <input
        type="text"
        value={quizInfoState.quizTopic}
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, quizTopic: e.target.value })}
        placeholder="Quiz Topic"
      />
      <input
        type="text"
        value={quizInfoState.quizSubTopic}
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, quizSubTopic: e.target.value })}
        placeholder="Quiz Sub-Topic"
      />
      <input
        type="text"
        value={quizInfoState.difficulty}
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, difficulty: e.target.value })}
        placeholder="Difficulty"
      />
      <input
        type="text"
        value={quizInfoState.idealTime}
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, idealTime: e.target.value })}
        placeholder="Ideal Time"
      />
      <input
        type="text"
        value={quizInfoState.creator}
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, creator: e.target.value })}
        placeholder="Creator"
      />
      <input
        type="text"
        value={quizInfoState.creatorID}
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, creatorID: e.target.value })}
        placeholder="Creator ID"
      />

      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default QuizInfo;
