import React from 'react'

const SummaryCard = ({ quiz, score, total }) => {
    const convertToPercent = (max, number) => {
        return Math.ceil((number / max) * 100)
    }
    return (
        <>
            <div div className="summary_card" >
                <div className="summary_l">
                    {/* Quiz Infos */}
                    <h3 className="quiz_name">
                        {quiz.name}
                    </h3>
                    <div className="topics_box">
                        {quiz.topic.map((topic, index) => (
                            <button className='selector_btn  summary_topics ' key={index}>{topic}</button>
                        ))}
                    </div>
                </div>
                <div className="summary_r">
                    <div className="user_score_box">
                        <h2 className='user_score'>
                            {score}
                        </h2>
                        <div className="number_line">

                        </div>
                        <h2 className='user_score'>
                            {total}
                        </h2>
                    </div>

                </div>
                <div className="summary_r">
                    <div className="user_score_box user_percent_box">
                        <h2 className="user_score">
                            {convertToPercent(total, score)}%
                        </h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SummaryCard