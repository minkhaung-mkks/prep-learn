import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const InfoCard = ({index,quiz}) => {
    const router = useRouter();
    const takeQuiz = (id)=>{
        router.push(`/practices/${id}`)
    }
    return (
        <div class="quiz_card">
                
                <div class="creator_info_box">
                    <Image width={50} height={50} src="/assets/preplearn-website-favicon-color.png" alt="" class="creator_img"/>
                    
                    <a href={`../users/{quiz.creatorID}`} class="creator_name">{quiz.creator}</a>
                    <h5 class="creator_type"></h5>
                    <h4 class="quiz_type"> {quiz.source}</h4>
                </div>
                
                <div class="quiz_info_box">
                    
                    <div class="quiz_title_box">
                       
                        <h2 class="quiz_title">{quiz.name}</h2>
                       
                        <h3 class="quiz_subject">Subject : {quiz.subject}</h3>
                        
                        <h3 class="quiz_topic">Topic : {quiz.topic}</h3>
                        {quiz.sub_topic !== "" && 
                            <h3 class="quiz_topic">Sub Topic {quiz.sub_topic}</h3>
                        }
                    </div>
                    
                </div>
                <div class="quiz_info_box">
                    
                    <div class="quiz_title_box">
                        
                        <h3 class="quiz_title">Difficulty : {quiz.difficulty}</h3>
                       
                        <h3 class="quiz_subject">Questions : {quiz.total_questions} questions</h3>
                        
                        <h3 class="quiz_topic"> Ideal Time : {quiz.ideal_time} Mins</h3>
                    </div>
                    
                </div>
                <div class="take_quiz_btn_box">
                    <button onClick={()=>takeQuiz(quiz.id)} class="take_quiz_btn">
                        Start
                    </button>
                </div>
            </div>
    )
}

export default InfoCard