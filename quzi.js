const readline = require('readline');
const {readFromFile} = require('./testingQuestions')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = async (question) => {
  return new Promise(resolve => {
    rl.question(`${question.text}\nA: ${question.answers.a}\nB: ${question.answers.b}\nC: ${question.answers.c}\nD: ${question.answers.d}\n`, answer => {
      if (answer.toLowerCase() === question.correct) {
        console.log('Correct!');
      } else {
        console.log(`Incorrect. The correct answer is ${question.correct}.`);
      }
      resolve();
    });
  });
};

const startPractice = async () => {
  const jsonData = await readFromFile();
    for(const section of jsonData.Sections){
        if (section.context && section.context.trim() !== "") {
            console.log(`Context: ${section.context}`);
          }
        
        for (const question of section.questions) {
          await askQuestion(question);
        }
    }

  rl.close();
};

startPractice();
