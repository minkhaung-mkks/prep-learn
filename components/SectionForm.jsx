import { useState } from 'react';

const SectionForm = ({ sectionIndex, sectionState, updateSectionState, prevPage, nextPage }) => {
    const [isEditing, setIsEditing] = useState(sectionState ? true : false);

    const handlePrev = () => {
        prevPage();
    };

    const handleNext = () => {
        // Validate the section fields
        // ...

        // Proceed to the next page
        nextPage()
    };

    const handleAddSection = () => {
        setIsEditing(true);
        updateSectionState(sectionIndex, { context: '', question: '', answer: '' });
    };

    return (
        <div>
            <h2>Section Form</h2>
            <input
                type="text"
                value={sectionState ? sectionState.context : ''}
                onChange={(e) => updateSectionState(sectionIndex, { ...sectionState, context: e.target.value })}
                placeholder="Section Context"
            />
            <input
                type="text"
                value={sectionState ? sectionState.question : ''}
                onChange={(e) => updateSectionState(sectionIndex, { ...sectionState, question: e.target.value })}
                placeholder="Section Question"
            />
            <input
                type="text"
                value={sectionState ? sectionState.answer : ''}
                onChange={(e) => updateSectionState(sectionIndex, { ...sectionState, answer: e.target.value })}
                placeholder="Section Answer"
            />

            <button onClick={handlePrev}>Previous</button>
            {isEditing ? (
                <>
                    <button onClick={handleNext}>Next</button>
                    <button onClick={() => setIsEditing(false)}>Save Section</button>
                </>
            ) : (
                <button onClick={handleAddSection}>Add Section</button>
            )}
        </div>
    );
};

export default SectionForm;
