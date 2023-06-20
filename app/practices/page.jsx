'use client'
import React, { useEffect, useState } from 'react'
import InfoCard from '@components/InfoCard';
import '@styles/global.css'
import '@styles/quiz_chooser.css'


const PracticeListPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selecetdExam, setSelecetdExam] = useState("GED")
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedSubTopics, setSelectedSubTopics] = useState([]);



    const selectSubTopics = (sub_topic) => {
        // When provided a function on setState, react calls the function with the current State
        // so setSelectedSubTopic(prev => prev + topic) = setSelectedSubTopic((prev)=> prev + topic)
        if (sub_topic !== 'All') {
            setSelectedSubTopics((prev) => [...prev, sub_topic])
        }
        else {
            setSelectedSubTopics([])
        }
    }

    const selectTopics = (topic) => {
        if (topic !== 'Sciences') {
            setSelectedSubTopics([]);
        }
        if (topic !== 'All') {
            setSelectedTopics((prev) => [...prev, topic])
        }
        else {
            setSelectedTopics([])
        }
    }


    useEffect(() => {
        const retriveData = async () => {
            try {
                const response = await fetch('dummydata/dummyData.json');
                let data = await response.json();
                console.log(data)

                // Filter by selected subject if it's not 'All'
                if (selectedSubject !== 'All') {
                    data = data.filter(quiz => quiz.subject === selectedSubject);
                }

                // Filter by selected topics if any topic is selected
                if (selectedTopics.length > 0) {
                    data = data.filter(quiz => quiz.topic.some(topic => selectedTopics.includes(topic)));
                }

                // Filter by selected subtopics if any subtopic is selected
                if (selectedSubTopics.length > 0) {
                    data = data.filter(quiz => quiz.sub_topic.some(subTopic => selectedSubTopics.includes(subTopic)))
                }


                setQuizzes(data);
            } catch (error) {
                console.error('Error fetching quiz data: ', error);
            }
        }
        retriveData();

    }, [selectedSubject, selectedTopics, selectedSubTopics])
    return (
        <main id="web_page">
            <h2 className="headings">Exam</h2>
            <div className="heading_line"></div>
            <div className="selector_btns_box">
                <button data-exam="GED" className="selected_selector_btn selector_btn">
                    GED
                </button>
            </div>
            <h2 className="headings">Subject</h2>
            <div className="heading_line"></div>
            <div id="GED" className="selector_btns_box">
                <button onClick={() => setSelectedSubject('All')} className="selected_selector_btn selector_btn">
                    All
                </button>
                <button onClick={() => setSelectedSubject('Social Studies')} className="selector_btn">
                    Social Studies
                </button>
                <button onClick={() => setSelectedSubject('RLA')} className="selector_btn">
                    Reasoning through Art
                </button>
                <button onClick={() => setSelectedSubject('Math')} className="selector_btn">
                    Math
                </button>
                <button onClick={() => setSelectedSubject('Sciences')} className="selector_btn">
                    Sciences
                </button>
            </div>
            <h2 className="headings">Topic</h2>
            <div className="heading_line"></div>
            {selectedSubject === 'Social Studies' && (
                <div id="GEDSocialStudies" className="selector_btns_box">
                    <button onClick={() => selectTopics('All')} className="selected_selector_btn selector_btn">
                        All
                    </button>
                    <button onClick={() => selectTopics('Types of Government')} className="selector_btn">
                        Types of Government
                    </button>
                    <button onClick={() => selectTopics('American Principal and Consitution')} className="selector_btn">
                        American Principal and Consitution
                    </button>
                    <button onClick={() => selectTopics('American Goverment Strucutre')} className="selector_btn">
                        American Goverment Strucutre
                    </button>
                    <button onClick={() => selectTopics('American History')} className="selector_btn">
                        American History
                    </button>
                </div>
            )}
            {selectedSubject === 'Sciences' && (
                <div id="GEDSciences" className="selector_btns_box">
                    <button onClick={() => selectTopics('All')} className="selected_selector_btn selector_btn">
                        All
                    </button>
                    <button onClick={() => selectTopics('Chemistry')} className="selector_btn">
                        Chemistry
                    </button>
                    <button onClick={() => selectTopics('Physics')} className="selector_btn">
                        Physics
                    </button>
                    <button onClick={() => selectTopics('Biology')} className="selector_btn">
                        Biology
                    </button>
                    <button onClick={() => selectTopics('Earth and Space')} className="selector_btn">
                        Earth and Space
                    </button>
                </div>
            )}
            {selectedSubject === 'RLA' && (
                <div id="GEDRLA" className="selector_btns_box">
                    <button onClick={() => selectTopics('All')} className="selected_selector_btn selector_btn">
                        All
                    </button>
                    <button onClick={() => selectTopics('Fictional Reading Comprehension')} className="selector_btn">
                        Fictional Reading Comprehension
                    </button>
                    <button onClick={() => selectTopics('Non-Fictional Reading Comprehension')} className="selector_btn">
                        Non-Fictional Reading Comprehension
                    </button>
                    <button onClick={() => selectTopics('Grammar')} className="selector_btn">
                        Grammar
                    </button>
                </div>
            )}
            {selectedSubject === 'Math' && (
                <div id="GEDMath" className="selector_btns_box">
                    <button onClick={() => selectTopics('All')} className="selected_selector_btn selector_btn">
                        All
                    </button>
                    <button onClick={() => selectTopics('Percent & Rate')} className="selector_btn">
                        Percent & Rate
                    </button>
                    <button onClick={() => selectTopics('Polynomial Expressions')} className="selector_btn">
                        Polynomial Expressions
                    </button>
                    <button onClick={() => selectTopics('Quadratic Equations')} className="selector_btn">
                        Quadratic Equations
                    </button>
                    <button onClick={() => selectTopics('Graphs and Functions')} className="selector_btn">
                        Graphs and Functions
                    </button>
                </div>
            )}

            {selectedSubject === 'Sciences' && (
                <>
                    <h2 className="headings">Sub-Topic</h2>
                    <div className="heading_line"></div>
                    {selectedTopics.includes('Chemistry') && (
                        <div id="GEDScience_chemistry" className="selector_btns_box">
                            <button onClick={selectSubTopics('All')} className="selected_selector_btn selector_btn">
                                All
                            </button>
                        </div>
                    )
                    }
                    {selectedTopics.includes('Biology') && (
                        <div id="GEDScience_biology" className="selector_btns_box">
                            <button onClick={selectSubTopics('All')} className="selected_selector_btn selector_btn">
                                All
                            </button>
                        </div>
                    )
                    }
                    {selectedTopics.includes('Physics') && (
                        <div id="GEDScience_physics" className="selector_btns_box">
                            <button onClick={selectSubTopics('All')} className="selected_selector_btn selector_btn">
                                All
                            </button>
                        </div>
                    )
                    }
                    {selectedTopics.includes('EarthAndScience') && (
                        <div id="GEDScience_EarthAndSpace" className="selector_btns_box">
                            <button onClick={selectSubTopics('All')} className="selected_selector_btn selector_btn">
                                All
                            </button>
                        </div>
                    )
                    }
                </>
            )}



            <div className="quiz_select_box">
                {quizzes.map((quiz, index) => (
                    <InfoCard key={index} quiz={quiz} />
                ))}

            </div>
        </main>
    )
}

export default PracticeListPage
