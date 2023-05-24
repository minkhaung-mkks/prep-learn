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

    // Loop over each line
    for (let line of answerLines) {
        reason = ''
        // Try to match the line to the pattern for a correct answer (e.g., "1. a. Some text")
        let match = line.match(/^\s*\d\.\s*(\w)\.\s*(.*)\s*$/);
        if (match) {
            // If the line matches, extract the option letter and the answer text
            const [_, option, text] = match;
            // Set `correctAnswer` to the option letter and answer text combined (e.g., "a. Some text")
            correctAnswer = `${option}. ${text}`;
        }

        // Try to match the line to the pattern for a reason (e.g., "- Some text")
        match = line.match(/^- (.*)/);
        if (match) {
            // If the line matches, extract the reason text
            const [_, reasonText] = match;
            // Set `reason` to the reason text
            reason = reasonText;
        }
    }

    // Return the correct answer and the reason
    return {
        correctAnswer,
        reason,
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
        if (answers[i + 1]) {
            section.questions[i].correct = answers[i + 1];
        }
    }
    console.log(section);
    return section;
}