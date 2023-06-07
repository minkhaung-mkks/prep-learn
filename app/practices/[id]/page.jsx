'use client'
import React,{useEffect,useState} from 'react';
import '@styles/global.css'
import '@styles/quiz.css'

const PraticePage = () => {
    const [questions, setQuestions] = useState([])
    const submitTest=()=>{

    }
    return (
        <main id="web_page">
        <div class="quiz_info_box">

        </div>
        <form onsubmit={submitTest} class="questions_box">
            ${questions.sections.map((section) => {
                <>
                <h2 class="section_title">
                    Section 
                </h2>
                <div class="context_box">
                    <p class="contenxt">
                        ${section.context}
                    </p>
                </div>
                ${
                    section.questions.map((question)=>{
                        <div class="question_card">
                            <h3 class="question">
                                ${question.text}
                            </h3>
                            <div class="answers_box">
                                <input class="answers" type="radio" name={question.text} id="A"/>
                                <label for="A">${questions.answers.a}</label>
                                <input class="answers" type="radio" name={question.text} id="B"/>
                                <label for="B">${questions.answers.b}</label>
                                <input class="answers" type="radio" name={question.text} id="C"/>
                                <label for="C">${questions.answers.c}</label>
                                <input class="answers" type="radio" name={question.text} id="D"/>
                                <label for="D">${questions.answers.d}</label>
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
