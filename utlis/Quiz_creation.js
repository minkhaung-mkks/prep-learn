const fs = require('fs');
const fsPromise = require('fs').promises;

/**
 * Removes the leading and trailing white space from the context string
 * @param {string} context - The context string to be parsed
 * @returns {string} The parsed context string
 */
export const parseContext = (context) => {
  return context.trim();
}

/**
 * Parses the question string and constructs a list of question objects
 * @param {string} questionText - The string of questions
 * @returns {Array} An array of question objects
 * @example
 * Returns [{ text: "What is the capital of France?", answers: { a: "Paris" }, correct: "" }]
 */
export const parseQuestions = (questionText) => {
  // Split by newline and remove empty lines
  const lines = questionText.split('\n').filter(Boolean);

  let questions = [];
  let answers = {};

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim(); // Trim spaces from the line

    // A new question starts with a number.
    if (/^\d+\./.test(line)) {
      // Add a new question with empty answers
      // Remove the number and dot from the start
      questions.push({
        text: line.slice(2).trim(),
        answers: {},
        correct: "",
        answer_text: "",
        reason: "",
      });
      answers = {}; // Initialize answers for the new question
    } else if (line.match(/^[a-z]\./i)) {
      // This line is an answer
      const answerKey = line.charAt(0).toLowerCase();
      let answerText = line.slice(2).trim();
      let isCorrect = false;

      // Check if the answer ends with an asterisk
      if (answerText.endsWith('*')) {
        // If so, remove the asterisk and set the answer as correct
        answerText = answerText.slice(0, -1).trim(); // remove asterisk from end
        isCorrect = true;
      }

      // Assign answers to the last question
      answers[answerKey] = answerText;
      questions[questions.length - 1].answers = answers;

      // If this is the correct answer, set it
      if (isCorrect) {
        questions[questions.length - 1].correct = answerKey;
        questions[questions.length - 1].answer_text = answerText;
      }
    } else {
      // Try to match the line to the pattern for a reason
      const match = line.match(/^- (.*)$/);
      if (match) {
        // If the line matches, extract the reason text
        const [, reasonText] = match;
        // Set `reason` to the reason text
        questions[questions.length - 1].reason = reasonText;
      }
    }
  }
  return questions;
};

/**
 * Parses the answers string and constructs an object with correct answers and reasons
 * @param {string} answersText - The string of answers
 * @returns {Object} An object containing correct answers and reasons
 * 
 * @example
 * Returns { correct: ["a. Paris"], reasons: ["Because it's the most populous city in France"] }
 */
export const parseAnswers = (answersText) => {
  // Split the input text into individual lines
  const answerLines = answersText.split('\n');

  // Initialize variables to hold the correct answer and the reason
  let correctAnswers = [];
  let correctText = [];
  let reasons = [];

  // Loop over each line
  for (let line of answerLines) {
    // Trim spaces from the line
    line = line.trim();

    // Try to match the line to the pattern for a correct answer
    let match = line.match(/^\d+\.\s*([a-z])\.\s*(.*)$/i);
    if (match) {
      // If the line matches, extract the option letter and the answer text
      const [, option, text] = match;
      // Set `correctAnswers` to the option letter
      correctAnswers.push(option);
      // Set `correctText` to the answer text
      correctText.push(text);
    }

    // Try to match the line to the pattern for a reason
    match = line.match(/^-\s*(.*)$/);
    if (match) {
      // If the line matches, extract the reason text
      const [, reasonText] = match;
      // Set `reasons` to the reason text
      reasons.push(reasonText);
    }
  }

  // Return the correct answers and the reasons
  return {
    correct: correctAnswers,
    answer_text: correctText,
    reasons,
  };
};


/**
 * Parses the provided context, question and answer strings into a structured data object
 * @param {string} context - The context string
 * @param {string} question - The question string
 * @param {string} [answer=null] - The answers string (optional)
 * @returns {Object} The parsed data object
 * @example
 * Returns { sections: [{ context: "World War II", questions: [{ text: "What is the capital of France?", answers: { a: "Paris" }, correct: "a. Paris", reason: "Because it's the most populous city in France" }]}]}
 *
 */
export const txtToData = (context, question, answer = null) => {
  let section = {
    context: parseContext(context),
    questions: parseQuestions(question)
  };

  // If the answer string is provided, update the answers for the questions
  if (answer) {
    let answers = parseAnswers(answer);
    for (let i = 0; i < section.questions.length; i++) {
      if (answers.correct[i]) {
        section.questions[i].correct = answers.correct[i];
      }
      if (answers.reasons[i]) {
        section.questions[i].reason = answers.reasons[i];
      }
      if (answers.answer_text[i]) {
        section.questions[i].answer_text = answers.answer_text[i]
      }
    }
  }

  let quiz = {
    sections: [
      section
    ]
  }
  return quiz;
}

let q = `
1. A system where a single authority, like a monarch, exercises absolute power is known as:
   a. Democracy
   b. Oligarchy
   c. Autocracy
   d. Republic

2. The United States government is best characterized as a:
   a. Direct democracy
   b. Theocracy
   c. Federal republic
   d. Monarchy

3. In which system of government is power divided between a central government and individual states or provinces?
   a. Unitary system
   b. Federal system
   c. Confederacy
   d. Oligarchy

4. What type of government does the United Kingdom have?
   a. Absolute monarchy
   b. Constitutional monarchy
   c. Direct democracy
   d. Presidential system

5. In a parliamentary system of government, who typically holds the most power?
   a. The Queen/King
   b. The President
   c. The Prime Minister
   d. The Judiciary
`

let a = `
1. c. Autocracy
2. c. Federal republic
3. b. Federal system
4. b. Constitutional monarchy
5. c. The Prime Minister
`

let q2 = `1. What was the primary cause of World War I?
a. Assassination of Archduke Franz Ferdinand
b. Bombing of Pearl Harbor
c. The Great Depression
d. The Russian Revolution

2. The United Nations was founded in:
a. 1919
b. 1939
c. 1945
d. 1950

3. Who was the President of the United States during the majority of the Civil Rights Movement in the 1960s?
a. Richard Nixon
b. Lyndon B. Johnson
c. John F. Kennedy
d. Dwight D. Eisenhower

4. The concept of separation of powers is most closely associated with which of the following documents?
a. The Magna Carta
b. The U.S. Constitution
c. The Bill of Rights
d. The Declaration of Independence

5. What economic system is characterized by private or corporate ownership of goods and means of production?
a. Communism
b. Socialism
c. Capitalism
d. Feudalism
`
let a2 = `
1. a. Assassination of Archduke Franz Ferdinand
- The assassination of Archduke Franz Ferdinand of Austria-Hungary in 1914 was the immediate trigger of World War I.

2. c. 1945
- The United Nations was founded in 1945 after World War II to replace the League of Nations, to stop wars between countries, and to provide a platform for dialogue.

3. b. Lyndon B. Johnson
- Lyndon B. Johnson was the President of the United States from 1963 to 1969, a significant portion of the Civil Rights Movement.

4. b. The U.S. Constitution
- The U.S. Constitution introduced the principle of separation of powers into practice, providing the framework for the U.S. government.

5. c. Capitalism
- Capitalism is characterized by private or corporate ownership of goods and means of production.
`

export const fetchOldData = async () => {
  try {
    const fileData = fs.readFileSync('dummyData.json', 'utf8');
    const jsonData = JSON.parse(fileData);
    return jsonData;
  } catch (error) {
    console.error(`Error reading JSON file: ${error}`);
    return [];
  }

}


export const appendToData = async (data) => {
  try {
    await fsPromise.writeFile('public/dummydata/dummyData.json', JSON.stringify(data, null, 2));
    console.log('Data successfully appended to file');
  } catch (error) {
    console.error(`Error appending data to file: ${error}`);
  }
};

export const addToFile = async (oldData, newData) => {
  let updatedData = [];

  // Check if existingData is an array
  if (Array.isArray(oldData)) {
    updatedData = oldData;
  } else if (oldData) {
    updatedData.push(oldData);
  }

  updatedData.push(newData);
  return updatedData;
}

export const addToSection = async (existingData, newData) => {
  let updatedData = {
    ...existingData,
    sections: [...existingData.sections, ...newData.sections]
  };
  return updatedData
}

let quizName;
let subject;
let exam;
let topic = [];
let sub_topic = [];
let difficulty;
let creator;
let creatorID;
let type;
let ideal_time;
let total_questions;
let source;

let newData = {
  id: 1,
  name: "Types of Government Quiz, GED Social Studies",
  subject: "Social Studies",
  exam: "GED",
  topic: ["Types of Government"],
  sub_topic: [],
  difficulty: "Easy",
  creator: "Prep & Learn",
  creatorID: "Prep & Learn",
  type: "Normal",
  ideal_time: 3,
  total_questions: 2,
  source: "Generated",
  sections: []
};

let quizSections = [
  {
    context: "",
    questions: q,
    answers: a
  },
  {
    context: "",
    questions: q2,
    answers: a2
  },
]

const addSection = async () => {
  quizSections.push({
    context: "",
    questions: "",
    answers: ""
  })
}

/**
 * Creates a quiz object and appends it to a data file.
 *
 * @param {string} name - The name of the quiz.
 * @param {string} subject - The subject of the quiz.
 * @param {string} exam - The exam related to the quiz.
 * @param {Array.<string>} [topic=[]] - The topic(s) covered in the quiz.
 * @param {Array.<string>} [sub_topic=[]] - The sub-topic(s) covered in the quiz.
 * @param {string} difficulty - The difficulty level of the quiz.
 * @param {string} creator - The creator of the quiz.
 * @param {string} creatorID - The creator's ID.
 * @param {string} type - The type of the quiz.
 * @param {number} ideal_time - The ideal time (in minutes) to complete the quiz.
 * @param {number} total_questions - The total number of questions in the quiz.
 * @param {string} source - The source of the quiz.
 * @param {Array.<Object>} [sections=[]] - The sections of the quiz, each containing context, questions, and answers.
 * @returns {Promise<void>} - A promise that resolves once the quiz is appended to the data file.
 */
export const makeQuiz = async (name, subject, exam, topic = [], sub_topic = [], difficulty, creator, creatorID, type, ideal_time, total_questions, source, sections = []) => {
  let newData = {
    id: 1,
    name,
    subject,
    exam,
    topic,
    sub_topic,
    difficulty,
    creator: "Prep & Learn",
    creatorID: "Prep & Learn",
    type: "Normal",
    ideal_time: 3,
    total_questions: total_questions,
    source: "Generated",
    sections: []
  };
  for (let i = 0; i < quizSections.length; i++) {
    let section = await txtToData(quizSections[i].context, quizSections[i].questions, quizSections[i].answers)
    newData = await addToSection(newData, section)
  }
  let oldData = await fetchOldData();
  newData.id = oldData.length + 1;
  let finalData = []
  finalData = await addToFile(oldData, newData)
  appendToData(finalData)
}