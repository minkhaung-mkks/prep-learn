"use client"
import { useState, useEffect } from 'react';

export default function QuestionsPage() {
    const [sections, setSections] = useState([]);
    const [answers, setAnswers] = useState({});
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(null);
    const [totalScore, setTotalScore] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            const res = await fetch('/api/questions');
            const data = await res.json();
            setSections(data.Sections);

            /**
             * This code initializes the `initialAnswers` object which will hold the user's answers to the questions.
             * 
             * 1. The `reduce` method is being used on `data.Sections` which is an array of all sections in the data. `reduce` produces a single output value from the array's elements. This output value could be any data type.
             * 
             * 2. The `reduce` method takes two arguments: a callback function and an initial value. The callback function also takes two arguments: an accumulator (`acc`) and the current value being processed (`section` and `i` which is its index in the array).
             * 
             * 3. In each iteration, the callback function returns a new object that contains all properties of the accumulator object (i.e., `...acc`) and a new property. This new property's key is the index of the current section (`[i]`), and its value is another object.
             * 
             * 4. This new object is created by reducing over the `questions` array of the current section. Similar to the outer `reduce`, 
             * it returns an object that contains an empty string for each question (indicating that the user hasn't answered the question yet). 
             * 
             * 5. The `acc, _, j` parameters in the inner `reduce` function represents the accumulator (the object being built),
             *  the current question (which is ignored, hence the `_`), and the index of the current question (`j`), respectively.
             * 
             * 6. The resulting `initialAnswers` object will be something like this (assuming there are two sections and each section has two questions):
             * 
             * {
             *   0: { 0: '', 1: '' },
             *   1: { 0: '', 1: '' }
             * }
             * 
             * Each key in the outer object represents a section, 
             * and its value is another object where each key represents a question in that section and 
             * its value is the user's answer to that question ('' indicating no answer).
            */
            let totalQuestions = 0;
            data.Sections.forEach((section) => {
                totalQuestions += section.questions.length;
            });
            const initialAnswers = data.Sections.reduce(
                (acc, section, i) => ({
                    ...acc,
                    [i]: section.questions.reduce(
                        (acc, _, j) => ({ ...acc, [j]: '' }),
                        {}
                    ),
                }),
                {}
            );
            setTotalScore(totalQuestions)
            console.log(totalQuestions)
            setAnswers(initialAnswers);
        };

        fetchQuestions();
    }, []);

    const handleOptionChange = (e, sectionIndex, questionIndex) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [sectionIndex]: {
                ...prevAnswers[sectionIndex],
                [questionIndex]: e.target.value
            }
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        let totalScore = 0;

        sections.forEach((section, i) => {
            section.questions.forEach((question, j) => {
                if (answers[i][j] === question.correct) {
                    totalScore++;
                }
            });
        });

        setScore(totalScore);
        setShowScore(true);
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                {sections.map((section, i) => (
                    <div key={i}>
                        <h1>Section {i + 1}</h1>
                        <p>{section.context}</p>
                        {section.questions.map((question, j) => (
                            <div key={j}>
                                <h2>{question.text}</h2>
                                {Object.entries(question.answers).map(([key, value]) => (
                                    <div key={key}>
                                        <input
                                            type="radio"
                                            id={`section-${i}-question-${j}-answer-${key}`}
                                            name={`section-${i}-question-${j}`}
                                            value={key}
                                            checked={answers[i] && answers[i][j] === key}
                                            onChange={(e) => handleOptionChange(e, i, j)}
                                        />
                                        <label htmlFor={`section-${i}-question-${j}-answer-${key}`}>{value}</label>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            {showScore && <h1>Your Score: {score}/{totalScore}</h1>}
        </div>
    );
}
