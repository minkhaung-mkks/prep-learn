'use client'
import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from "next/navigation";


const PracticeListPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selecetdExam, setSelecetdExam]=useState("GED")
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [selectedTopics, setSelectedTopics] = useState([]); 
    const [selectedSubTopics, setSelectedSubTopics] = useState([]); 

  const router = useRouter();


    
    const selectSubTopics = (sub_topic) =>{
        // When provided a function on setState, react calls the function with the current State
        // so setSelectedSubTopic(prev => prev + topic) = setSelectedSubTopic((prev)=> prev + topic)
        setSelectedSubTopics((prev)=>[...prev,sub_topic])
    }

    const selectTopics = (topic)=>{
        setSelectedTopics((prev)=>[...prev,topic])
        if (topic !== 'Sciences') {
            setSelectedSubTopics([]);
        }
        
    }

    const takeQuiz = (id)=>{
        router.push(`/practices/${id}`)
    }
    useEffect(()=>{
        const retriveData = async ()=>{
            try {
                const response = await fetch('../../dummydata/dummyData.json');
                const data = await response.json();
    
                // Filter by selected subject if it's not 'All'
                if (selectedSubject !== 'All') {
                    data = data.filter(quiz => quiz.subject === selectedSubject);
                }
    
                // Filter by selected topics if any topic is selected
                if (selectedTopics.length > 0) {
                    data = data.filter(quiz => selectedTopics.includes(quiz.topic));
                }
    
                // Filter by selected subtopics if any subtopic is selected
                if(selectedSubTopics.length > 0){
                    data = data.filter(quiz=> selectedSubTopics.includes(quiz.sub_topic))
                }

    
                setQuizzes(data);
            } catch (error) {
                console.error('Error fetching quiz data: ', error);
            }
        }
        retriveData();
    
    },[selectedSubject,selectedTopics,selectedSubTopics])
    return (
        <main id="web_page">
        <h2 class="headings">Exam</h2>
        <div class="heading_line"></div>
        <div class="selector_btns_box">
            <button data-exam="GED" data class="selected_selector_btn selector_btn">
                GED
            </button>
        </div>
        <h2 class="headings">Subject</h2>
        <div class="heading_line"></div>
        <div id="GED" class="selector_btns_box">
            <button data class="selected_selector_btn selector_btn">
                All
            </button>
            <button data class="selector_btn">
                Social Studies
            </button>
            <button data class="selector_btn">
                Reasoning through Art
            </button>
            <button data class="selector_btn">
                Math
            </button>
            <button data class="selector_btn">
                Sciences
            </button>
        </div>
        <h2 class="headings">Topic</h2>
        <div class="heading_line"></div>
        {selectedSubject === 'Social Studies' && (
            <div id="GEDSocialStudies" class="selector_btns_box">
                <button data class="selected_selector_btn selector_btn">
                    All
                </button>
                <button data class="selector_btn">
                    Mixed
                </button>
                <button data class="selector_btn">
                    Types of Government
                </button>
                <button data class="selector_btn">
                    American Principal and Consitution
                </button>
                <button data class="selector_btn">
                    American Goverment Strucutre
                </button>
                <button data class="selector_btn">
                    American History
                </button>
            </div>
        )}
        {selectedSubject === 'Sciences' && (
            <div id="GEDSciences" class="selector_btns_box">
            <button data class="selected_selector_btn selector_btn">
                All
            </button>
            <button data class="selector_btn">
                Mixed
            </button>
            <button data class="selector_btn">
                Chemistry
            </button>
            <button data class="selector_btn">
                Physics
            </button>
            <button data class="selector_btn">
                Biology
            </button>
            <button data class="selector_btn">
                Earth and Space
            </button>
        </div>
        )}
        {selectedSubject === 'RLA' && (
             <div id="GEDRLA" class="selector_btns_box">
                <button data class="selected_selector_btn selector_btn">
                    All
                </button>
                <button data class="selector_btn">
                    Mixed
                </button>
                <button data class="selector_btn">
                    Fictional Reading Comprehension
                </button>
                <button data class="selector_btn">
                    Non-Fictional Reading Comprehension
                </button>
                <button data class="selector_btn">
                    Grammar
                </button>
            </div>
        )}
        {selectedSubject === 'Math' && (
            <div id="GEDMath" class="selector_btns_box">
                <button data class="selected_selector_btn selector_btn">
                    All
                </button>
                <button data class="selector_btn">
                    Mixed
                </button>
                <button data class="selector_btn">
                    Percent & Rate
                </button>
                <button data class="selector_btn">
                    Polynomial Expressions
                </button>
                <button data class="selector_btn">
                    Quadratic Equations
                </button>
                <button data class="selector_btn">
                    Graphs and Functions
                </button>
            </div>
        )}
        
        {selectedSubject === 'Sciences' && (
            <>
                <h2 class="headings">Sub-Topic</h2>
                <div class="heading_line"></div>
                {selectedTopics.includes('Chemistry') && (
                    <div id="GEDScience_chemistry" class="selector_btns_box">
                        <button data class="selected_selector_btn selector_btn">
                            All
                        </button>
                        <button data class="selector_btn">
                            Mixed
                        </button>
                    </div>
                    )
                }
                {selectedTopics.includes('Biology') && (
                    <div id="GEDScience_biology" class="selector_btns_box">
                        <button data class="selected_selector_btn selector_btn">
                            All
                        </button>
                        <button data class="selector_btn">
                            Mixed
                        </button>
                    </div>
                    )
                }
                {selectedTopics.includes('Physics') && (
                    <div id="GEDScience_physics" class="selector_btns_box">
                        <button data class="selected_selector_btn selector_btn">
                            All
                        </button>
                        <button data class="selector_btn">
                            Mixed
                        </button>
                    </div>
                    )
                }
                {selectedTopics.includes('EarthAndScience') && (
                    <div id="GEDScience_EarthAndSpace" class="selector_btns_box">
                        <button data class="selected_selector_btn selector_btn">
                            All
                        </button>
                        <button data class="selector_btn">
                            Mixed
                        </button>
                    </div>
                    )
                }
            </>
        )}
        
        
       
        <div class="quiz_select_box">
            {quizzes.map((quiz, index)=>(
                <div key={index} class="quiz_card">
                
                <div class="creator_info_box">
                    <Image src="../public/assets/preplearn-website-favicon-color.png" alt="" class="creator_img"/>
                    
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
                    <button onClick={takeQuiz(quiz.id)} class="take_quiz_btn">
                        Start
                    </button>
                </div>
            </div>
            ))}
            
        </div>
    </main>
    )
}

export default PracticeListPage
