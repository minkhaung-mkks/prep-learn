"use client"
import { useState } from 'react';
import QuizInfo from '@components/QuizInfo';
import SectionForm from '@components/SectionForm';
import { makeQuiz } from '@utlis/Quiz_creation';

const Form = () => {
    const [formState, setFormState] = useState({
        quizName: '',
        quizSubject: '',
        quizTopic: '',
        quizSubTopic: '',
        difficulty: '',
        idealTime: '',
        creator: '',
        creatorID: '',
        sections: [],
    });

    const [currentPage, setCurrentPage] = useState('info');
    const [sectionIndex, setSectionIndex] = useState(0);

    const updateFormState = (updatedState) => {
        setFormState((prevState) => ({
            ...prevState,
            ...updatedState,
        }));
    };

    const updateSectionState = (index, updatedState) => {
        setFormState((prevState) => {
            const updatedSections = [...prevState.sections];
            updatedSections[index] = {
                ...updatedSections[index],
                ...updatedState,
            };
            return {
                ...prevState,
                sections: updatedSections,
            };
        });
    };

    const prevPage = () => {
        if (currentPage === 'section') {
            const prevIndex = sectionIndex - 1;
            if (prevIndex >= 0) {
                setSectionIndex(prevIndex);
            } else {
                setCurrentPage('info');
            }
        }
    };

    const nextPage = () => {
        if (currentPage === 'info') {
            if (formState.sections.length === 0) {
                const newSection = {
                    context: '',
                    question: '',
                    answer: '',
                };
                setFormState((prevState) => ({
                    ...prevState,
                    sections: [newSection],
                }));
            }
            setCurrentPage('section');
        } else {
            const nextIndex = sectionIndex + 1;
            if (nextIndex >= formState.sections.length) {
                addSection();
            }
            setSectionIndex(nextIndex);
        }
    };

    const addSection = () => {
        const newSection = {
            context: '',
            question: '',
            answer: '',
        };
        setFormState((prevState) => ({
            ...prevState,
            sections: [...prevState.sections, newSection],
        }));
    };

    return (
        <div>
            {currentPage === 'info' ? (
                <QuizInfo
                    quizInfoState={formState}
                    updateQuizInfoState={updateFormState}
                    nextPage={nextPage}
                />
            ) : (
                <SectionForm
                    sectionIndex={sectionIndex}
                    sectionState={formState.sections[sectionIndex]}
                    updateSectionState={updateSectionState}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />
            )}
        </div>
    );
};

export default Form;
