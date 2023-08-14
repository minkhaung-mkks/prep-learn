import { parseQuestions } from '@utlis/Quiz_creation'
import { useState, useEffect } from 'react'

const NewQuestionCard = () => {

    const [currentQuestion, setCurrentQuestion] = useState('')
    const [answerOptions, setAnswerOptions] = useState({});
    const [correctOption, setCorrectOption] = useState('');
    const [questions, setQuestions] = useState([])
    const [convertedQuestions, setConvertedQuestions] = useState([])
    const newQuestion = () => {
        setQuestions((prev) => [...prev, currentQuestion])
    }
    const handleAddOption = () => {
        const nextOptionIndex = Object.keys(answerOptions).length;
        const nextOptionLetter = alphabet[nextOptionIndex];
        setAnswerOptions({
            ...answerOptions,
            [nextOptionLetter]: ''
        });
    };
    const handleRemoveOption = (optionLetter) => {
        const updatedOptions = { ...answerOptions };
        delete updatedOptions[optionLetter];
        setAnswerOptions(updatedOptions);

        if (correctOption === optionLetter) {
            setCorrectOption('');
        }
    };
    const handleOptionChange = (optionLetter, newText) => {
        setAnswerOptions({
            ...answerOptions,
            [optionLetter]: newText
        });
    };
    const handleSelectCorrectOption = (optionLetter) => {
        const optionText = answerOptions[optionLetter];
        setCorrectOption(optionLetter);
        setAnswerOptions({
            ...answerOptions,
            [optionLetter]: optionText + '*'
        });
    };
    const convertQuestion = useCallback(async () => {
        const newQuestions = await parseQuestions(JSON.stringify(questions));
        return newQuestions;
    }, [questions]);
    useEffect(() => {
        const convertData = async () => {
            const convertedQuestions = await convertQuestion();
            setConvertedQuestions(convertedQuestions);
        };
        convertData();
    }, [convertQuestion])
    return (
        <>
            {convertedQuestions.map((convertedQuestion, index) => (
                <div key={index}>
                    <h2 className="questionText">
                        {convertedQuestion.text}
                    </h2>
                    {Object.keys(convertedQuestion.answers).map(answerKey => (
                        <p key={answerKey} className={`answerText ${answerKey === convertedQuestion.correct ? 'correctOption' : ''}`}>
                            {convertedQuestion.answers[answerKey]}
                        </p>
                    ))}
                    <p className='reasonText'>
                        {convertedQuestion.reason}
                    </p>
                </div>
            ))}
            <div>
                <h2>Question: <span> <input type={'text'} className={'input_box'} value={currentQuestionText} onChange={(e) => setCurrentQuestion(e.target.value)}></input> </span></h2>
                <h4>Answers</h4>
                {Object.keys(answerOptions).map((optionLetter) => (
                    <div key={optionLetter}>
                        <input
                            type="text"
                            className='input_box'
                            value={answerOptions[optionLetter]}
                            onChange={(e) => handleOptionChange(optionLetter, e.target.value)}
                        />
                        {optionLetter === correctOption && <span> ✅ </span>}
                        <button onClick={() => handleRemoveOption(optionLetter)}>Remove</button>
                        <button onClick={() => handleSelectCorrectOption(optionLetter)}>Mark as Correct</button>
                    </div>
                ))}
                <button onClick={handleAddOption}>Add Option</button>
            </div>
        </>
    )
}



// Visual
// Context Field
// Questions that will be mapped over
// Q1-....>
// New Question Card
// Question text
// Answer Options
//  A1
//  A2....
// Correct Option Selector
// Reason

// How the question logic should work
// Q TEXT /n
// AO1 /n
// AO2 /n
// AO3 /n
// AO4 (Correct) * /n
// - Reason.
// 

export default NewQuestionCard