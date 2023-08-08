'use client'
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation'
import '@styles/global.css'
import '@styles/quiz.css'
import QuestionCard from '@components/QuestionCard';
import SummaryCard from '@components/SummaryCard';

const PraticePage = ({ params }) => {
    const [quiz, setQuiz] = useState({})
    const firstUpdate = useRef(true);
    const quizFetch = useRef(false);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [submittedQuestions, setSubmittedQuestions] = useState([]);
    const [hasFinished, setHasFinished] = useState(false)
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const quizId = parseInt(params.id);
    const mode = params.mode
    const [savedData, setSavedData] = useState();
    const router = useRouter();
    useEffect(() => {
        const retriveData = async () => {
            try {
                const response = await fetch('/data.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch JSON file');
                }
                let data = await response.json();
                data = data.filter(quiz => quiz.id === quizId)
                let totalQuestions = 0;
                data[0].sections.forEach((section) => {
                    totalQuestions += section.questions.length;
                });
                let initialAnswers;
                let initialSavedQuestion;
                let initialSubmissions = [];
                let currentQuestionSubmissionStatus = false;
                let savedData = JSON.parse(localStorage.getItem('savedData'));
                if (savedData) {
                    const savedAnswers = savedData[quizId]?.answers;
                    if (savedAnswers) {
                        initialAnswers = savedAnswers;
                    }
                    else {
                        /**
                         * Initializes `initialAnswers` to store user's answers.
                         * 
                            * 1. `reduce` is used on `data[0].Sections` to create an object from the array.
                            * 2. In each iteration, the callback returns a new object that merges the accumulator object (`acc`) and a new property, where key is the section index (`[i]`), and value is another object.
                            * 3. The value object is created by reducing the `questions` array of the current section. It returns an object with an empty string for each unanswered question. 
                            * 4. `acc, _, j` in the inner `reduce` represents the accumulator (object being built), the current question (ignored - `_`), and the question index (`j`).
                            * 5. `initialAnswers` structure is { sectionIndex: { questionIndex: answer }, ...}, where answer is an empty string for an unanswered question.
                         */
                        initialAnswers = data[0].sections.reduce(
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
                    const savedQuestion = savedData[quizId]?.currentQuestion
                    if (savedQuestion) {
                        initialSavedQuestion = savedQuestion
                    }
                    else {
                        initialSavedQuestion = { sectionIndex: 0, questionIndex: 0 }
                    }
                    const savedSubmissions = savedData[quizId]?.submittedQuestions
                    if (savedSubmissions) {
                        initialSubmissions = savedSubmissions
                        currentQuestionSubmissionStatus = isQuestionSubmitted(initialSavedQuestion.sectionIndex, initialSavedQuestion.questionIndex, initialSubmissions)
                    }
                }
                else {
                    initialAnswers = data[0].sections.reduce(
                        (acc, section, i) => ({
                            ...acc,
                            [i]: section.questions.reduce(
                                (acc, _, j) => ({ ...acc, [j]: '' }),
                                {}
                            ),
                        }),
                        {}
                    );
                    initialSavedQuestion = { sectionIndex: 0, questionIndex: 0 }
                }



                setQuiz(data[0]);
                setTotalScore(totalQuestions)
                setAnswers(initialAnswers);
                setCurrentQuestion(initialSavedQuestion);
                setSubmittedQuestions(initialSubmissions)
                setSavedData(savedData)
                setHasSubmitted(currentQuestionSubmissionStatus)
                quizFetch.current = true;
            } catch (error) {
                console.error('Error fetching quiz data: ', error);
            }
        }
        retriveData();

    }, [quizId])
    const handleOptionChange = (answer, sectionIndex, questionIndex) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [sectionIndex]: {
                ...prevAnswers[sectionIndex],
                [questionIndex]: answer
            }
        }));
    };

    const toggleRadio = (event, sectionIndex, questionIndex) => {
        const clickedElement = event.target;
        const radioButton = clickedElement.querySelector('input[type="radio"]');
        if (radioButton) {
            // Select the radio button
            radioButton.checked = true;
            const answer = radioButton.value
            handleOptionChange(answer, sectionIndex, questionIndex)
        }

    }

    function checkAnswer(sectionIndex, questionIndex) {
        const question = quiz.sections[sectionIndex].questions[questionIndex];
        const answer = answers[sectionIndex][questionIndex];

        return answer.toLowerCase() === question.correct.toLowerCase();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mode === "test") {
            let totalScore = 0;

            quiz.sections.forEach((section, sectionIndex) => {
                section.questions.forEach((question, questionIndex) => {
                    if (checkAnswer(sectionIndex, questionIndex)) {
                        totalScore++;
                    }
                });
            });
            setScore(totalScore);
        }
        setShowScore(true);
        setHasSubmitted(true);
        setHasFinished(true);

    };

    const resetQuiz = async () => {
        const response = await fetch('/data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch JSON file');
        }
        let data = await response.json();
        data = data.filter(quiz => quiz.id === quizId)
        let initialAnswers = data[0].sections.reduce(
            (acc, section, i) => ({
                ...acc,
                [i]: section.questions.reduce(
                    (acc, _, j) => ({ ...acc, [j]: '' }),
                    {}
                ),
            }),
            {}
        );
        let initialSavedQuestion = { sectionIndex: 0, questionIndex: 0 }
        const updatedSubmittedQuestions = { ...submittedQuestions };
        for (const sectionIndex in updatedSubmittedQuestions) {
            updatedSubmittedQuestions[sectionIndex] = [];
        }

        // Save to local storage whenever answers change
        const updatedSavedData = {
            ...savedData,
            [quizId]: {
                answers: initialAnswers,
                currentQuestion: initialSavedQuestion,
                submittedQuestions: updatedSubmittedQuestions,
            },
        };

        localStorage.setItem('savedData', JSON.stringify(updatedSavedData));
    }


    const goBackToQuizChooser = () => {
        resetQuiz()
        router.push('/practices')
    }

    const retryQuiz = () => {
        resetQuiz()
        window.location.reload();
    }

    const toggleSummary = () => {
        setShowScore(!showScore)
    }

    const quizModeSubmit = (e, sectionIndex, questionIndex) => {
        e.preventDefault();
        let correct = checkAnswer(sectionIndex, questionIndex)
        if (correct) {
            setScore(prev => prev + 1)
        }
        setHasSubmitted(true);
        setSubmittedQuestions((prev) => ({
            ...prev,
            [sectionIndex]: [...(prev[sectionIndex] || []), questionIndex],
        }));

    }
    const isQuestionSubmitted = (sectionIndex, questionIndex, checkedSubmissions = submittedQuestions) => {
        return (
            checkedSubmissions[sectionIndex] &&
            checkedSubmissions[sectionIndex].includes(questionIndex)
        );
    };

    const nextQuestion = (sectionIndex, questionIndex) => {
        const isNextQuestionSubmitted = isQuestionSubmitted(sectionIndex, questionIndex);
        setHasSubmitted(isNextQuestionSubmitted)
        setCurrentQuestion({ sectionIndex, questionIndex })
    }
    const prevQuestion = (sectionIndex, questionIndex) => {
        setHasSubmitted(true)
        setCurrentQuestion({ sectionIndex, questionIndex })
    }
    const renderWithLineBreaks = (text) => {
        const paragraphs = text.split('\n\n'); // Split the text into paragraphs

        return paragraphs.map((paragraph, index) => (
            <p className="context" key={index}>
                {paragraph}
            </p>
        ));
    };
    useEffect(() => {
        // Skip on first render
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        // Save to local storage whenever answers change
        const updatedAnswers = {
            ...savedData,
            [quizId]: {
                answers: answers,
                currentQuestion: currentQuestion,
                submittedQuestions: submittedQuestions
            }
        };
        console.log(submittedQuestions)
        localStorage.setItem('savedData', JSON.stringify(updatedAnswers));
    }, [answers, quizId, currentQuestion, submittedQuestions, savedData]);
    return (
        <main id="web_page" className={`${hasFinished && showScore ? 'no_scroll' : ''}`}>
            <form onSubmit={handleSubmit} className={`${hasFinished && showScore ? 'no_scroll quiz_box' : 'quiz_box'}`}>
                {mode === "test" ? (
                    <>
                        {quizFetch.current && quiz.sections.map((section, index) => (
                            <div className='section_box' key={index}>
                                <h2 className="section_title">
                                    Section {index + 1}
                                </h2>
                                <div className="context_box">
                                    {renderWithLineBreaks(section.context)}
                                </div>
                                {
                                    section.questions.map((question, qIndex) => (
                                        <QuestionCard key={qIndex} question={question} qIndex={qIndex} index={index} toggleRadio={toggleRadio} answer={answers[index][qIndex]} hasSubmitted={hasSubmitted} />
                                    ))
                                }
                            </div>
                        ))}
                        <div className="submit_btn_box">
                            <button type="submit" className="submit_btn">Submit</button>
                        </div>
                    </>
                )
                    : (
                        <>
                            {quizFetch.current &&
                                quiz.sections.map((section, sectionIndex) => (
                                    <div className="section_box" key={sectionIndex}>
                                        <h2 className="section_title"
                                            style={{
                                                display:
                                                    currentQuestion.sectionIndex === sectionIndex
                                                        ? "block"
                                                        : "none",
                                            }}
                                        >Section {sectionIndex + 1}</h2>
                                        <div className="context_box"
                                            style={{
                                                display:
                                                    currentQuestion.sectionIndex === sectionIndex
                                                        ? "block"
                                                        : "none",
                                            }}
                                        >
                                            {renderWithLineBreaks(section.context)}
                                        </div>
                                        {section.questions.map((question, questionIndex) => (
                                            <div
                                                className="question_page"
                                                key={questionIndex}
                                                style={{ display: currentQuestion.sectionIndex === sectionIndex && currentQuestion.questionIndex === questionIndex ? "block" : "none" }}
                                            >
                                                <QuestionCard
                                                    question={question}
                                                    qIndex={questionIndex}
                                                    index={sectionIndex}
                                                    toggleRadio={toggleRadio}
                                                    answer={answers[sectionIndex][questionIndex]}
                                                    hasSubmitted={hasSubmitted}
                                                />
                                                <div className="question_nav">
                                                    {questionIndex > 0 && (
                                                        <button
                                                            className="nav_btn prev_btn"
                                                            type="button"
                                                            onClick={() => {
                                                                prevQuestion(sectionIndex, questionIndex - 1);
                                                            }}
                                                        >
                                                            Previous
                                                        </button>
                                                    )}
                                                    {questionIndex === 0 && sectionIndex > 0 && (
                                                        <button
                                                            className="nav_btn prev_btn"
                                                            type='button'
                                                            onClick={() => {
                                                                prevQuestion(sectionIndex - 1, quiz.sections[sectionIndex - 1].questions.length - 1);
                                                            }}
                                                        >
                                                            Previous Section
                                                        </button>
                                                    )}

                                                    {!hasSubmitted && (
                                                        <button
                                                            className="nav_btn check_btn"
                                                            type='button'
                                                            onClick={(e) => {
                                                                quizModeSubmit(e, sectionIndex, questionIndex)
                                                            }}
                                                        >
                                                            Check Answer
                                                        </button>
                                                    )}
                                                    {hasSubmitted && questionIndex < section.questions.length - 1 && (
                                                        <button
                                                            className="nav_btn next_btn"
                                                            type='button'
                                                            onClick={() => {
                                                                nextQuestion(sectionIndex, questionIndex + 1)
                                                            }}
                                                        >
                                                            Next
                                                        </button>
                                                    )}
                                                    {hasSubmitted && questionIndex === section.questions.length - 1 && sectionIndex < quiz.sections.length - 1 && (
                                                        <button
                                                            className="nav_btn next_btn"
                                                            onClick={() => {
                                                                nextQuestion(sectionIndex + 1, 0)
                                                            }}
                                                        >
                                                            Next Section
                                                        </button>
                                                    )}
                                                    {hasSubmitted && questionIndex === section.questions.length - 1 && sectionIndex === quiz.sections.length - 1 && (
                                                        <button
                                                            className="nav_btn finish_btn"
                                                            onClick={(e) => {
                                                                handleSubmit(e)
                                                            }}
                                                        >
                                                            Finish
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                        </>
                    )
                }
            </form>
            {hasFinished && showScore && (
                <div className="summary_box">
                    <SummaryCard quiz={quiz} score={score} total={totalScore} />
                    <div className="summary_btn_box">
                        <button onClick={toggleSummary} className="nav_btn close_btn">
                            Close Summary
                        </button>
                        <button onClick={goBackToQuizChooser} className="nav_btn go_back_btn">
                            Choose another quiz
                        </button>
                    </div>
                </div>
            )
            }
        </main>
    )
}

export default PraticePage
