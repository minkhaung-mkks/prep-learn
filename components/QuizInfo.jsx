import { useState } from 'react';

const QuizInfo = ({ quizInfoState, updateQuizInfoState, nextPage }) => {
  const [quizTopic, setQuizTopic] = useState([]);
  const [quizSubject, setQuizSubject] = useState('')
  const [difficulty, setDifficulty] = useState('')
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
    setQuizSubject(subject)
  }
  const handleDifficultyClick = (difficulty) => {
    updateQuizInfoState({ ...quizInfoState, difficulty: difficulty })
    setDifficulty(difficulty)
  }
  const handleNext = () => {
    // Validate the quiz information fields
    // ...

    // Proceed to the next page
    nextPage();
  };

  return (
    <div className='quiz_form'>
      <h2>Quiz Information</h2>
      <input
        type="text"
        value={quizInfoState.quizName}
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, name: e.target.value })}
        className='input_fields'
        placeholder="Quiz Name"
      />
      <h2>Subjects</h2>
      <button className={`selectingBtn ${quizSubject === 'RLA' ? 'selectedBtn' : ''} `} onClick={() => handleSubjectClick('RLA')}>
        RLA
      </button>
      <button className={`selectingBtn ${quizSubject === 'Social Studies' ? 'selectedBtn' : ''} `} onClick={() => handleSubjectClick('Social Studies')}>
        Social Studies
      </button>
      <button className={`selectingBtn ${quizSubject === 'Sciences' ? 'selectedBtn' : ''} `} onClick={() => handleSubjectClick('Sciences')}>
        Sciences
      </button>
      <div>
        <h4>Quiz Topics:</h4>
        <h5>Social Studies</h5>
        <button className={`selectingBtn ${quizTopic.includes(`Civics & Government`) ? 'selectedBtn' : ''} `} onClick={() => handleTopicClick('Civics & Government')}>Civics & Government</button>
        <button className={`selectingBtn ${quizTopic.includes(`American Principals`) ? 'selectedBtn' : ''} `} onClick={() => handleTopicClick('American Principals')}>American Principals</button>
        <button className={`selectingBtn ${quizTopic.includes(`American History`) ? 'selectedBtn' : ''} `} onClick={() => handleTopicClick('American History')}>American History</button>
        <button className={`selectingBtn ${quizTopic.includes(`Famouse Speeches`) ? 'selectedBtn' : ''} `} onClick={() => handleTopicClick('Famouse Speeches')}>Famouse Speeches</button>
        <button className={`selectingBtn ${quizTopic.includes(`World History`) ? 'selectedBtn' : ''} `} onClick={() => handleTopicClick('World History')}>World History</button>
        <h5>Sciences</h5>
        <button className={`selectingBtn ${quizTopic.includes(`Chemistry`) ? 'selectedBtn' : ''} `} onClick={() => handleTopicClick('Chemistry')}>Chemistry</button>
        <button className={`selectingBtn ${quizTopic.includes(`Biology`) ? 'selectedBtn' : ''} `} onClick={() => handleTopicClick('Biology')}>Biology</button>
        <button className={`selectingBtn ${quizTopic.includes(`Physics`) ? 'selectedBtn' : ''} `} onClick={() => handleTopicClick('Physics')}>Physics</button>
        <button className={`selectingBtn ${quizTopic.includes(`Earth & Space`) ? 'selectedBtn' : ''} `} onClick={() => handleTopicClick('Earth & Space')}>Earth & Space</button>
        <h5>RLA</h5>
        <button className={`selectingBtn ${quizTopic.includes(`Fictional Reading Comprehension`) ? 'selectedBtn' : ''} `} onClick={() => handleTopicClick('Fictional Reading Comprehension')}>Fictional Reading Comprehension</button>
        <button className={`selectingBtn ${quizTopic.includes(`Non-Fictional Reading Comprehension`) ? 'selectedBtn' : ''} `} onClick={() => handleTopicClick('Non-Fictional Reading Comprehension')}>Non-Fictional Reading Comprehension</button>
        <button className={`selectingBtn ${quizTopic.includes(`Grammar`) ? 'selectedBtn' : ''} `} onClick={() => handleTopicClick('Grammar')}>Grammar</button>
        <button className={`selectingBtn ${quizTopic.includes(`Vocabulary`) ? 'selectedBtn' : ''} `} onClick={() => handleTopicClick('Vocabulary')}>Vocabulary</button>
      </div>
      <div>
        <h4>Quiz Subtopics:</h4>
        <button className={`selectingBtn ${quizSubtopic.includes(`chemistry`) ? 'selectedBtn' : ''} `} onClick={() => handleSubtopicClick('chemistry')}>chemistry</button>
        <button className={`selectingBtn ${quizSubtopic.includes(`biology`) ? 'selectedBtn' : ''} `} onClick={() => handleSubtopicClick('biology')}>biology</button>
      </div>
      <h4>Difficulty</h4>
      <button className={`selectingBtn ${difficulty === 'Easy' ? 'selectedBtn' : ''} `} onClick={() => handleDifficultyClick('Easy')}>
        Easy
      </button>
      <button className={`selectingBtn ${difficulty === 'Medium' ? 'selectedBtn' : ''} `} onClick={() => handleDifficultyClick('Medium')}>
        Medium
      </button>
      <button className={`selectingBtn ${difficulty === 'Hard' ? 'selectedBtn' : ''} `} onClick={() => handleDifficultyClick('Hard')}>
        Hard
      </button>
      <button className={`selectingBtn ${difficulty === 'Very Hard' ? 'selectedBtn' : ''} `} onClick={() => handleDifficultyClick('Very Hard')}>
        Very Hard
      </button>
      <input
        type="text"
        value={quizInfoState.idealTime}
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, idealTime: e.target.value })}
        placeholder="Ideal Time"
        className='input_fields'
      />
      <input
        type="text"
        value={"Prep & Learn"}
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, creator: "Prep & Learn" })}
        placeholder="Creator"
        className='input_fields'
      />
      <input
        type="text"
        value={0}
        onChange={(e) => updateQuizInfoState({ ...quizInfoState, creatorID: 0 })}
        placeholder="Creator ID"
        className='input_fields'
      />

      <button className='next_btn' onClick={handleNext}>Next</button>
      {/* <button onClick={() => console.log(quizInfoState)}>Tests</button> */}
    </div>
  );
};

export default QuizInfo;
