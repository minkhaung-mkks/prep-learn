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
  const handleSubjectClick = (subject) => {
    updateQuizInfoState({ ...quizInfoState, subject: subject })
  }
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
      <h2>Subjects</h2>
      <button onClick={() => handleSubjectClick('RLA')}>
        RLA
      </button>
      <button onClick={() => handleSubjectClick('Social Studies')}>
        Social Studies
      </button>
      <button onClick={() => handleSubjectClick('Sciences')}>
        Sciences
      </button>
      <div>
        <h4>Quiz Topics:</h4>
        <h5>Social Studies</h5>
        <button onClick={() => handleTopicClick('Civics & Government')}>Civics & Government</button>
        <button onClick={() => handleTopicClick('American Principals')}>American Principals</button>
        <button onClick={() => handleTopicClick('American History')}>American History</button>
        <button onClick={() => handleTopicClick('Famouse Speeches')}>Famouse Speeches</button>
        <button onClick={() => handleTopicClick('World History')}>World History</button>
        <h5>Sciences</h5>
        <button onClick={() => handleTopicClick('Chemistry')}>Chemistry</button>
        <button onClick={() => handleTopicClick('Biology')}>Biology</button>
        <button onClick={() => handleTopicClick('Physics')}>Physics</button>
        <button onClick={() => handleTopicClick('Earth & Space')}>Earth & Space</button>
        <h5>RLA</h5>
        <button onClick={() => handleTopicClick('Fictional Reading Comprehension')}>Fictional Reading Comprehension</button>
        <button onClick={() => handleTopicClick('Non-Fictional Reading Comprehension')}>Non-Fictional Reading Comprehension</button>
        <button onClick={() => handleTopicClick('Grammar')}>Grammar</button>
        <button onClick={() => handleTopicClick('Vocabulary')}>Vocabulary</button>
      </div>
      <div>
        <h4>Quiz Subtopics:</h4>
        <button onClick={() => handleSubtopicClick('chemistry')}>chemistry</button>
        <button onClick={() => handleSubtopicClick('biology')}>biology</button>
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
