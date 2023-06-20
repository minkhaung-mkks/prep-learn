import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const InfoCard = ({ index, quiz }) => {
    const takeQuiz = (id) => {
        router.push(`/practices/${id}`)
    }
    return (
        <div className="quiz_card">

            <div className="creator_info_box">
                <Image width={50} height={50} src="/assets/preplearn-website-favicon-color.png" alt="" className="creator_img" />

                <a href={`../users/{quiz.creatorID}`} className="creator_name">{quiz.creator}</a>
                <h5 className="creator_type"></h5>
                <h4 className="quiz_type"> {quiz.source}</h4>
            </div>

            <div className="quiz_info_box">

                <div className="quiz_title_box">

                    <h2 className="quiz_title">{quiz.name}</h2>

                    <h3 className="quiz_subject">Subject : {quiz.subject}</h3>

                    <h3 className="quiz_topic">Topic : {quiz.topic}</h3>
                    {quiz.sub_topic !== "" &&
                        <h3 className="quiz_topic">Sub Topic {quiz.sub_topic}</h3>
                    }
                </div>

            </div>
            <div className="quiz_info_box">

                <div className="quiz_title_box">

                    <h3 className="quiz_title">Difficulty : {quiz.difficulty}</h3>

                    <h3 className="quiz_subject">Questions : {quiz.total_questions} questions</h3>

                    <h3 className="quiz_topic"> Ideal Time : {quiz.ideal_time} Mins</h3>
                </div>

            </div>
            <div className="take_quiz_btn_box">
                <Link href={`/practices/${id}`} onClick={() => takeQuiz(quiz.id)} className="take_quiz_btn">
                    Start
                </Link>
            </div>
        </div>
    )
}

export default InfoCard