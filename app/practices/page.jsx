'use client'
import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import InfoCard from '@components/InfoCard';


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
        if(sub_topic !== 'All'){
            setSelectedSubTopics((prev)=>[...prev,sub_topic])
        }
        else{
            setSelectedSubTopics([])
        }
    }

    const selectTopics = (topic)=>{
        if (topic !== 'Sciences') {
            setSelectedSubTopics([]);
        }
        if(topic !== 'All'){
            setSelectedTopics((prev)=>[...prev,topic])
        }
        else{
            setSelectedTopics([])
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
                    data = data.filter(quiz => quiz.topic.some(topic => selectedTopics.includes(topic)));
                }    
                
                // Filter by selected subtopics if any subtopic is selected
                if(selectedSubTopics.length > 0){
                    data = data.filter(quiz=> quiz.sub_topic.some(subTopic => selectedSubTopics.includes(subTopic)))
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
            <button data-exam="GED" class="selected_selector_btn selector_btn">
                GED
            </button>
        </div>
        <h2 class="headings">Subject</h2>
        <div class="heading_line"></div>
        <div id="GED" class="selector_btns_box">
            <button onClick={setSelectedSubject('All')} class="selected_selector_btn selector_btn">
                All
            </button>
            <button  onClick={setSelectedSubject('Social Studies')} class="selector_btn">
                Social Studies
            </button>
            <button  onClick={setSelectedSubject('RLA')} class="selector_btn">
                Reasoning through Art
            </button>
            <button  onClick={setSelectedSubject('Math')} class="selector_btn">
                Math
            </button>
            <button  onClick={setSelectedSubject('Sciences')} class="selector_btn">
                Sciences
            </button>
        </div>
        <h2 class="headings">Topic</h2>
        <div class="heading_line"></div>
        {selectedSubject === 'Social Studies' && (
            <div id="GEDSocialStudies" class="selector_btns_box">
                <button onClick={selectTopics('All')} class="selected_selector_btn selector_btn">
                    All
                </button>
                <button onClick={selectTopics('Types of Government')} class="selector_btn">
                    Types of Government
                </button>
                <button onClick={selectTopics('American Principal and Consitution')} class="selector_btn">
                    American Principal and Consitution
                </button>
                <button onClick={selectTopics('American Goverment Strucutre')} class="selector_btn">
                    American Goverment Strucutre
                </button>
                <button onClick={selectTopics('American History')} class="selector_btn">
                    American History
                </button>
            </div>
        )}
        {selectedSubject === 'Sciences' && (
            <div id="GEDSciences" class="selector_btns_box">
            <button onClick={selectTopics('All')} class="selected_selector_btn selector_btn">
                All
            </button>
            <button onClick={selectTopics('Chemistry')} class="selector_btn">
                Chemistry
            </button>
            <button onClick={selectTopics('Physics')} class="selector_btn">
                Physics
            </button>
            <button onClick={selectTopics('Biology')} class="selector_btn">
                Biology
            </button>
            <button onClick={selectTopics('Earth and Space')} class="selector_btn">
                Earth and Space
            </button>
        </div>
        )}
        {selectedSubject === 'RLA' && (
             <div id="GEDRLA" class="selector_btns_box">
                <button onClick={selectTopics('All')} class="selected_selector_btn selector_btn">
                    All
                </button>
                <button onClick={selectTopics('Fictional Reading Comprehension')} class="selector_btn">
                    Fictional Reading Comprehension
                </button>
                <button onClick={selectTopics('Non-Fictional Reading Comprehension')} class="selector_btn">
                    Non-Fictional Reading Comprehension
                </button>
                <button onClick={selectTopics('Grammar')} class="selector_btn">
                    Grammar
                </button>
            </div>
        )}
        {selectedSubject === 'Math' && (
            <div id="GEDMath" class="selector_btns_box">
                <button onClick={selectTopics('All')} class="selected_selector_btn selector_btn">
                    All
                </button>
                <button onClick={selectTopics('Percent & Rate')} class="selector_btn">
                    Percent & Rate
                </button>
                <button onClick={selectTopics('Polynomial Expressions')} class="selector_btn">
                    Polynomial Expressions
                </button>
                <button  onClick={selectTopics('Quadratic Equations')} class="selector_btn">
                    Quadratic Equations
                </button>
                <button onClick={selectTopics('Graphs and Functions')} class="selector_btn">
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
                        <button onClick={selectSubTopics('All')} class="selected_selector_btn selector_btn">
                            All
                        </button>
                    </div>
                    )
                }
                {selectedTopics.includes('Biology') && (
                    <div id="GEDScience_biology" class="selector_btns_box">
                        <button onClick={selectSubTopics('All')} class="selected_selector_btn selector_btn">
                            All
                        </button>
                    </div>
                    )
                }
                {selectedTopics.includes('Physics') && (
                    <div id="GEDScience_physics" class="selector_btns_box">
                        <button onClick={selectSubTopics('All')} class="selected_selector_btn selector_btn">
                            All
                        </button>
                    </div>
                    )
                }
                {selectedTopics.includes('EarthAndScience') && (
                    <div id="GEDScience_EarthAndSpace" class="selector_btns_box">
                        <button onClick={selectSubTopics('All')} class="selected_selector_btn selector_btn">
                            All
                        </button>
                    </div>
                    )
                }
            </>
        )}
        
        
       
        <div class="quiz_select_box">
            {quizzes.map((quiz, index)=>(
                <InfoCard key={index} quiz={quiz}/>
            ))}
            
        </div>
    </main>
    )
}

export default PracticeListPage
