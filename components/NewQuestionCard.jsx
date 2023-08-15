import { parseQuestions } from '@utlis/Quiz_creation'
import { useState, useEffect } from 'react'

const NewQuestionCard = () => {

    const [currentQuestion, setCurrentQuestion] = useState('')
    const [currentQuestionText, setCurrentQuestionText] = useState('')
    const [answerOptions, setAnswerOptions] = useState({});
    const [correctOption, setCorrectOption] = useState('');
    const [questions, setQuestions] = useState([])
    const [convertedQuestions, setConvertedQuestions] = useState([])
    const newQuestion = async () => {
        const newFormattedQuestion = await transformToFormattedString()
        setQuestions((prev) => [...prev, newFormattedQuestion])
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
    const transformToFormattedString = () => {
        let formattedString = `${currentQuestionText}\n`;
        Object.keys(answerOptions).forEach((optionLetter, index) => {
            formattedString += `${optionLetter}. ${answerOptions[optionLetter]}\n`;
        });
        return formattedString;
    };
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
                <div key={index} className='new_question_card'>
                    <h2 className="question_text">
                        {convertedQuestion.text}
                    </h2>
                    {Object.keys(convertedQuestion.answers).map(answerKey => (
                        <p key={answerKey} className={`answer_text ${answerKey === convertedQuestion.correct ? 'correct_option' : ''}`}>
                            {convertedQuestion.answers[answerKey]}
                        </p>
                    ))}
                    <p className='reasonText'>
                        {convertedQuestion.reason}
                    </p>
                </div>
            ))}
            <div className='new_create_form'>
                <h2>Question: <span> <input type={'text'} className={'input_box'} value={currentQuestionText} onChange={(e) => setCurrentQuestionText(e.target.value)}></input> </span></h2>
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