import { parseQuestions } from '@utlis/Quiz_creation'
import { useState, useEffect } from 'react'

const NewQuestionCard = () => {

    const [currentQuestion, setCurrentQuestion] = useState('')
    const [questions, setQuestions] = useState([])
    const [convertedQuestions, setConvertedQuestions] = useState([])
    const newQuestion = () => {
        setQuestions((prev) => [...prev, currentQuestion])
    }
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