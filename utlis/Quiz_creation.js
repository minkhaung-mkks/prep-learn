const fs = require('fs');
const fsPromise = require('fs').promises;

/**
 * Removes the leading and trailing white space from the context string
 * @param {string} context - The context string to be parsed
 * @returns {string} The parsed context string
 */
const parseContext = (context) => {
    return context.trim();
}

/**
 * Parses the question string and constructs a list of question objects
 * @param {string} questionText - The string of questions
 * @returns {Array} An array of question objects
 * @example
 * Returns [{ text: "What is the capital of France?", answers: { a: "Paris" }, correct: "" }]
 */
const parseQuestions = (questionText) => {
    // Split by newline and remove empty lines
    const lines = questionText.split('\n').filter(Boolean);

    let questions = [];
    let answers = {};

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // A new question starts with number.
        if (/^\d+\./.test(line)) {
            // Add a new question with empty answers
            // Remove number and dot from start
            questions.push({
                text: line.slice(2).trim(),
                answers: {},
                correct: ""
            });
        } else if (line.startsWith('   ')) {
            // This line is an answer
            const answerKey = line.charAt(3);
            const answerText = line.slice(5).trim();
            // Assign answers to the last question
            answers[answerKey] = answerText;
            questions[questions.length - 1].answers = answers;
        }
    }
    return questions;
}

/**
 * Parses the answers string and constructs an object with correct answers and reasons
 * @param {string} answersText - The string of answers
 * @returns {Object} An object containing correct answers and reasons
 * 
 * @example
 * Returns { correct: ["a. Paris"], reasons: ["Because it's the most populous city in France"] }
 */
const parseAnswers = (answersText) => {
    // Split the input text into individual lines
    const answerLines = answersText.split('\n');

    // Initialize variables to hold the correct answer and the reason
    let correctAnswers = []
    let reasons = []

    // Loop over each line
    for (let line of answerLines) {
        // Try to match the line to the pattern for a correct answer
        let match = line.match(/^\s*\d+\.\s*(\w)\.\s*(.*)\s*$/);
        if (match) {
            // If the line matches, extract the option letter and the answer text
            const [_, option, text] = match;
            // Set `correctAnswer` to the option letter and answer text combined
            correctAnswers.push(`${option}. ${text}`);
        }

        // Try to match the line to the pattern for a reason
        match = line.match(/^\s*- (.*)$/);
        if (match) {
            // If the line matches, extract the reason text
            const [_, reasonText] = match;
            // Set `reason` to the reason text
            reasons.push(reasonText);
        }
    }

    // Return the correct answers and the reasons
    return {
        correct: correctAnswers,
        reasons,
    };
}

/**
 * Parses the provided context, question and answer strings into a structured data object
 * @param {string} context - The context string
 * @param {string} question - The question string
 * @param {string} [answer=null] - The answers string (optional)
 * @returns {Object} The parsed data object
 * @example
 * Returns { Sections: [{ context: "World War II", questions: [{ text: "What is the capital of France?", answers: { a: "Paris" }, correct: "a. Paris", reason: "Because it's the most populous city in France" }]}]}
 *
 */
const txtToData = (context, question, answer = null) => {
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
            else {
                section.questions[i].reason = ''
            }
        }
    }

    let quiz = {
        Sections: [
            section
        ]
    }
    console.log(quiz)
    return quiz;
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
let c2 = ""
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

6. The Industrial Revolution began in which country?
a. France
b. Germany
c. United States
d. United Kingdom

7. The Treaty of Versailles ended which conflict?
a. World War I
b. World War II
c. The French Revolution
d. The American Revolution

8. Who first proposed the idea of the separation of powers?
a. Thomas Jefferson
b. John Locke
c. Montesquieu
d. Jean-Jacques Rousseau

9. The Great Wall of China was primarily built as a defense against:
a. The Mongols
b. The Romans
c. The Japanese
d. The British

10. The term "Cold War" refers to the political tension and non-combative rivalry that existed between which two superpowers?
a. USA and Japan
b. Germany and USSR
c. USA and USSR
d. China and USA

11. The primary purpose of the Federal Reserve in the United States is to:
a. Regulate the national defense
b. Control the money supply and stabilize the economy
c. Supervise healthcare policies
d. Manage international trade policies

12. Which document declared the United States' independence from Great Britain?
a. The Emancipation Proclamation
b. The Mayflower Compact
c. The U.S. Constitution
d. The Declaration of Independence

13. What was the main reason for the establishment of the United Nations?
a. To promote global free trade
b. To maintain international peace and security
c. To spread democracy worldwide
d. To manage global healthcare crisis

14. The phrase “Life, Liberty, and the Pursuit of Happiness” is found in:
a. The U.S. Constitution
b. The Declaration of Independence
c. The Bill of Rights
d. The Magna Carta

15. The term "Iron Curtain" was used to describe:
a. The defensive fortifications of ancient China
b. The division between capitalist Western Europe and communist Eastern Europe during the Cold War
c. The defense strategy of the Roman Empire
d. The trade barrier policies of the United States in the 19th century

16. The abolitionist movement in the United States focused on ending:
a. Prohibition
b. Segregation
c. Slavery
d. Women's suffrage

17. In a democratic society, how are government officials usually chosen?
a. By royal appointment
b. By lottery selection
c. By public vote or election
d. By religious leaders

18. The Berlin Wall was a symbol of:
a. Nazi Germany
b. The division between East and West Germany during the Cold War
c. The First World War
d. The Great Depression

19. The period of intense fear of communism in the United States during the 1950s is known as:
a. The Cold War
b. The Red Scare
c. McCarthyism
d. The Berlin Crisis

20. Who was the first woman to fly solo across the Atlantic Ocean?
a. Rosa Parks
b. Amelia Earhart
c. Eleanor Roosevelt
d. Margaret Thatcher
`
let a2 = `1. a. Assassination of Archduke Franz Ferdinand
- The assassination of Archduke Franz Ferdinand of Austria-Hungary in 1914 was the immediate trigger of World War I.

2. c. 1945
- The United Nations was founded in 1945 after World War II to replace the League of Nations, to stop wars between countries, and to provide a platform for dialogue.

3. b. Lyndon B. Johnson
- Lyndon B. Johnson was the President of the United States from 1963 to 1969, a significant portion of the Civil Rights Movement.

4. b. The U.S. Constitution
- The U.S. Constitution introduced the principle of separation of powers into practice, providing the framework for the U.S. government.

5. c. Capitalism
- Capitalism is characterized by private or corporate ownership of goods and means of production.

6. d. United Kingdom
- The Industrial Revolution began in the United Kingdom in the late 18th century.

7. a. World War I
- The Treaty of Versailles officially ended World War I. 

8. c. Montesquieu
- Montesquieu, a French philosopher, was the one who articulated the principle of separation of powers.

9. a. The Mongols
- The Great Wall of China was mainly built as a defense against invasions by the Mongols.

10. c. USA and USSR
- The term "Cold War" refers to the political tension and non-combative rivalry that existed between the USA and the USSR from 1947 to 1991.

11. b. Control the money supply and stabilize the economy
- The primary purpose of the Federal Reserve in the United States is to control the money supply to promote effectively the goals of maximum employment, stable prices, and moderate long-term interest rates.

12. d. The Declaration of Independence
- The Declaration of Independence, adopted on July 4, 1776, declared the 13 American colonies independent from Great Britain.

13. b. To maintain international peace and security
- The United Nations was established primarily to maintain international peace and security, and to develop friendly relations among nations based on respect for equal rights and self-determination of peoples.

14. b. The Declaration of Independence
- The phrase “Life, Liberty, and the Pursuit of Happiness” is found in the United States' Declaration of Independence.

15. b. The division between capitalist Western Europe and communist Eastern Europe during the Cold War
- The term "Iron Curtain" was used by Winston Churchill in his speech in 1946 to describe the division between free capitalist Western Europe and the communist Eastern Europe during the Cold War.

16. c. Slavery
- The abolitionist movement in the United States was a movement to end slavery.

17. c. By public vote or election
- In a democratic society, government officials are usually chosen by public vote or election.

18. b. The division between East and West Germany during the Cold War
- The Berlin Wall was a symbol of the division between East and West Germany during the Cold War.

19. b. The Red Scare
- The period of intense fear of communism in the United States during the 1950s is known as the Red Scare.

20. b. Amelia Earhart
- Amelia Earhart was the first woman to fly solo across the Atlantic Ocean, in 1932.
`

let s1 = txtToData(c, q, a)
let s2 = txtToData(c2, q2, a2)

const appendToData = async (existingData, newData) => {
    try {
        // console.log(existingData)
        console.log(existingData)
        // console.log(newData)
        existingData.Sections.push(...newData.Sections);
        await fsPromise.writeFile('dummyData.json', JSON.stringify(existingData, null, 2));

        console.log('Data successfully appended to file');

    } catch (error) {
        console.error(`Error appending data to file: ${error}`);
    }
}
let ed = {
    Sections: []
}
appendToData(ed, s1)
appendToData(s1, s2)