const parseContext = (context) => {
    return context.trim();
}

const parseQuestions = (questionText) => {
    const lines = questionText.split('\n').filter(Boolean); // split by newline and remove empty lines
    let questions = [];
    let answers = {};

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (/^\d+\./.test(line)) { // a new question starts with number.
            // Add a new question with empty answers
            questions.push({
                text: line.slice(2).trim(), // remove number and dot from start
                answers: {},
                correct: ""
            });
        } else if (line.startsWith('   ')) {
            // this line is an answer
            const answerKey = line.charAt(3);
            const answerText = line.slice(5).trim();
            answers[answerKey] = answerText;
            questions[questions.length - 1].answers = answers; // assign answers to last question
        }
    }

    return questions;
}

const parseAnswers = (answersText) => {
    // Split the input text into individual lines
    const answerLines = answersText.split('\n');

    // Initialize variables to hold the correct answer and the reason
    let correctAnswer = '';
    let reason = '';
    let correctAnswers =[]
    let reasons = []

    // Loop over each line
    for (let line of answerLines) {
        reason = ''
        // Try to match the line to the pattern for a correct answer (e.g., "1. a. Some text")
        let match = line.match(/^\s*\d+\.\s*(\w)\.\s*(.*)\s*$/);
        console.log(match)
        if (match) {
            // If the line matches, extract the option letter and the answer text
            const [_, option, text] = match;
            // Set `correctAnswer` to the option letter and answer text combined (e.g., "a. Some text")
            correctAnswer = `${option}. ${text}`;
            correctAnswers.push(correctAnswer)
        }

        // Try to match the line to the pattern for a reason (e.g., "- Some text")
        match = line.match(/^- (.*)/);
        if (match) {
            // If the line matches, extract the reason text
            const [_, reasonText] = match;
            // Set `reason` to the reason text
            reason = reasonText;
            reasons.push(reason)
        }
    }

    // Return the correct answer and the reason
    return {
        correct: correctAnswers,
        reasons,
    };
}


const txtToData = (context, question, answer = null) => {
    let section = {
        context: parseContext(context),
        questions: parseQuestions(question)
    };
    // This assume the correct answer was correctly 
    //indicated in the question with * so theres no need to get answers
    if (!answer) return section
    // Update answers for questions
    let answers = parseAnswers(answer);
    for (let i = 0; i < section.questions.length; i++) {
        if (answers.correct[i]) {
            section.questions[i].correct = answers.correct[i];
        }
    }
    console.log(section)
    return section;
}

let c = ""
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

6. Which system of government is characterized by rule by a few, often the wealthy or well-educated?
   a. Democracy
   b. Monarchy
   c. Oligarchy
   d. Autocracy

7. In which type of government do religious laws form the legal system?
   a. Theocracy
   b. Federal system
   c. Republic
   d. Democracy

8. Which country is an example of a constitutional monarchy?
   a. Canada
   b. United States
   c. France
   d. China

9. In a direct democracy, decisions are made by:
   a. The President
   b. The citizens directly
   c. Elected representatives
   d. A Monarch

10. A government where power is held by one central authority is known as:
   a. Federal
   b. Unitary
   c. Confederation
   d. Anarchy

11. The head of state in a parliamentary system is often:
   a. The Prime Minister
   b. The President
   c. The Queen/King
   d. The Chief Justice

12. A type of government where the people govern themselves without any intermediary is a:
   a. Direct democracy
   b. Indirect democracy
   c. Monarchy
   d. Republic

13. Who has the power in a representative democracy? *
   a. Elected officials
   b. All citizens
   c. The monarch
   d. The military   
`

let a = `
1. c. Autocracy
2. c. Federal republic
3. b. Federal system
4. b. Constitutional monarchy
5. c. The Prime Minister
6. c. Oligarchy
7. a. Theocracy
8. a. Canada
9. b. The citizens directly
10. b. Unitary
11. c. The Queen/King
12. a. Direct democracy
13. a. Elected officials
`

txtToData(c,q,a)