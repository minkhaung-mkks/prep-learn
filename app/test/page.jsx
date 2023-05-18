"use client"
import { useState, useEffect, useRef } from 'react';

export default function QuestionsPage() {
    const [sections, setSections] = useState([]);
    const firstUpdate = useRef(true);
    const [answers, setAnswers] = useState({});
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(null);
    const [totalScore, setTotalScore] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            const res = await fetch('/api/questions');
            const data = await res.json();
            setSections(data.Sections);

            let totalQuestions = 0;
            data.Sections.forEach((section) => {
                totalQuestions += section.questions.length;
            });

            let initialAnswers;
            const savedAnswers = localStorage.getItem('answers');
            if (savedAnswers) {
                initialAnswers = JSON.parse(savedAnswers);
            }
            else {
                /**
                    * Initializes `initialAnswers` to store user's answers.
                    * 
                    * 1. `reduce` is used on `data.Sections` to create an object from the array.
                    * 2. In each iteration, the callback returns a new object that merges the accumulator object (`acc`) and a new property, where key is the section index (`[i]`), and value is another object.
                    * 3. The value object is created by reducing the `questions` array of the current section. It returns an object with an empty string for each unanswered question. 
                    * 4. `acc, _, j` in the inner `reduce` represents the accumulator (object being built), the current question (ignored - `_`), and the question index (`j`).
                    * 5. `initialAnswers` structure is { sectionIndex: { questionIndex: answer }, ...}, where answer is an empty string for an unanswered question.
                */
                initialAnswers = data.Sections.reduce(
                    (acc, section, i) => ({
                        ...acc,
                        [i]: section.questions.reduce(
                            (acc, _, j) => ({ ...acc, [j]: '' }),
                            {}
                        ),
                    }),
                    {}
                );
            }


            console.log(initialAnswers)
            setTotalScore(totalQuestions)
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

    useEffect(() => {
        // Skip on first render
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        // Save to local storage whenever answers change
        localStorage.setItem('answers', JSON.stringify(answers));
    }, [answers]);

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
