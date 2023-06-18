import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SectionForm = ({ sectionIndex, sectionState, updateSectionState, prevPage, nextPage, createQuiz }) => {
    const [isEditing, setIsEditing] = useState(sectionState ? true : false);
    const router = useRouter();
    const handlePrev = () => {
        prevPage();
    };

    const handleNext = () => {
        // Validate the section fields
        // ...

        // Proceed to the next page
        nextPage()
    };

    // Check if the current route is the makeQuiz API route
    return (
        <div>
            <h2>Section Form</h2>
            <input
                type="text"
                value={sectionState ? sectionState.context : ''}
                onChange={(e) => updateSectionState(sectionIndex, { ...sectionState, context: e.target.value })}
                placeholder="Section Context"
            />
            <textarea
                value={sectionState ? sectionState.questions : ''}
                onChange={(e) => updateSectionState(sectionIndex, { ...sectionState, questions: e.target.value })}
                placeholder="Section Question"
                rows={4}
                cols={50}
            />
            <textarea
                type="text"
                value={sectionState ? sectionState.answers : ''}
                onChange={(e) => updateSectionState(sectionIndex, { ...sectionState, answers: e.target.value })}
                placeholder="Section Answer"
                rows={4}
                cols={50}
            />

            <button onClick={handlePrev}>Previous</button>


            <button onClick={handleNext}>Next</button>
            <button onClick={createQuiz}>Save Section</button>


        </div>
    );
};

export default SectionForm;
