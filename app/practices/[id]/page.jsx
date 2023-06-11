'use client'
import React,{useEffect,useState} from 'react';
import '@styles/global.css'
import '@styles/quiz.css'

const PraticePage = () => {
    const [quiz, setQuiz] = useState([])
    const quizId = parseInt(params.id);
    const submitTest=()=>{

    }
    useEffect(()=>{
        const retriveData = async ()=>{
            try {
                const response = await fetch('../../dummydata/dummyData.json');
                const data = await response.json();

                data = data.filter(quiz=> quiz.id === quizId)
                setQuiz(data);
            } catch (error) {
                console.error('Error fetching quiz data: ', error);
            }
        }
        retriveData();
    
    },[])
    return (
        <main id="web_page">
        <div class="quiz_info_box">

        </div>
        <form onsubmit={submitTest} class="quiz_box">
            {quiz.sections.map((section, index) => {
                <>
                <h2 class="section_title">
                    Section {index+1}
                </h2>
                <div class="context_box">
                    <p class="contenxt">
                        {section.context}
                    </p>
                </div>
                {
                    section.quiz.map((question)=>{
                        <div class="question_card">
                            <h3 class="question">
                                {question.text}
                            </h3>
                            <div class="answers_box">
                                <input class="answers" type="radio" name={question.text} id="A"/>
                                <label for="A">{quiz.answers.a}</label>
                                <input class="answers" type="radio" name={question.text} id="B"/>
                                <label for="B">{quiz.answers.b}</label>
                                <input class="answers" type="radio" name={question.text} id="C"/>
                                <label for="C">{quiz.answers.c}</label>
                                <input class="answers" type="radio" name={question.text} id="D"/>
                                <label for="D">{quiz.answers.d}</label>
                            </div>
                        </div>
                    })
                }
                </>
            })}
        </form>
        <div class="submit_btn_box">
            <button type="submit" class="submit_btn">Submit</button>
        </div>
        <div class="timer_box">

        </div>
        </main>
    )
}

export default PraticePage
