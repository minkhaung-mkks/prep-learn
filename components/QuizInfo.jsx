import { useState } from 'react';

const QuizInfo = ({ quizInfoState, updateQuizInfoState, nextPage }) => {
  const [quizTopic, setQuizTopic] = useState([]);
  const [quizSubtopic, setQuizSubtopic] = useState([]);

  const handleTopicClick = (topic) => {
    let updatedQuizTopic = [];
    if (quizTopic.includes(topic)) {
      updatedQuizTopic = quizTopic.filter((st) => st !== topic);
    } else {
      updatedQuizTopic = [...quizTopic, topic];
    }
    setQuizTopic(updatedQuizTopic);
    updateQuizInfoState({ ...quizInfoState, topic: updatedQuizTopic });
  };

  const handleSubtopicClick = (subtopic) => {
    let updatedQuizSubtopic = [];
    if (quizSubtopic.includes(subtopic)) {
      updatedQuizSubtopic = quizSubtopic.filter((st) => st !== subtopic);
    } else {
      updatedQuizSubtopic = [...quizSubtopic, subtopic];
    }
    setQuizSubtopic(updatedQuizSubtopic);
    updateQuizInfoState({ ...quizInfoState, sub_topic: updatedQuizSubtopic });
  };

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
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, name: e.target.value })}
        placeholder="Quiz Name"
      />
      <input
        type="text"
        value={quizInfoState.quizSubject}
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, subject: e.target.value })}
        placeholder="Quiz Subject"
      />
      <div>
        <h4>Quiz Topics:</h4>
        <button onClick={() => handleTopicClick('government')}>
          Government
        </button>
        <button onClick={() => handleTopicClick('history')}>History</button>
        <button onClick={() => handleTopicClick('economy')}>Economy</button>
      </div>
      <div>
        <h4>Quiz Subtopics:</h4>
        <button onClick={() => handleSubtopicClick('greek')}>Greek</button>
        <button onClick={() => handleSubtopicClick('US')}>US</button>
      </div>
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
      <button onClick={() => console.log(quizInfoState)}>Tests</button>
    </div>
  );
};

export default QuizInfo;
