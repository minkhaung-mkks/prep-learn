import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const InfoCard = ({ index, quiz }) => {
    return (
        <div className="quiz_card">

            <div className="creator_info_box">
                <Image width={50} height={50} src="/assets/preplearn-website-favicon-color.png" alt="" className="creator_img" />

                <a href={`../users/{quiz.creatorID}`} className="creator_name">{quiz.creator}</a>
                <h5 className="creator_type"></h5>
                <h4 className="quiz_type"> {quiz.source}</h4>
            </div>

            <div className="quiz_info_box quiz_long_box">

                <div className="quiz_title_box">

                    <h2 className="quiz_title">{quiz.name}</h2>

                    <h3 className="quiz_subject">Subject : {quiz.subject}</h3>

                    <h3 className="quiz_topic">
                        Topics:
                        <div className="topics_box">
                            {quiz.topic.map((topic, index) => (
                                <button className='selector_btn' key={index}>{topic}</button>
                            ))}
                        </div>

                    </h3>

                    {quiz.sub_topic.length > 0 &&
                        <h3 className="quiz_topic">Sub Topics:
                            <div className="topics_box">
                                {quiz.sub_topic.map((sub_topic, index) => (
                                    <button className='selector_btn' key={index}>{sub_topic}</button>
                                ))}
                            </div>
                        </h3>
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
                <Link href={`/practices/quiz/${quiz.id}`} className="take_quiz_btn">
                    Start in Quiz Mode
                </Link>
                <Link href={`/practices/test/${quiz.id}`} className="take_quiz_btn">
                    Start in Test Mode
                </Link>
            </div>
        </div>
    )
}

export default InfoCard