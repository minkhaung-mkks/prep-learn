const SectionForm = ({ sectionIndex, sectionState, updateSectionState, prevPage, nextPage, createQuiz }) => {
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
            <textarea
                type="text"
                value={sectionState ? sectionState.context : ''}
                onChange={(e) => updateSectionState(sectionIndex, { ...sectionState, context: e.target.value })}
                placeholder="Section Context"
                rows={4}
                cols={50}
                className='input_areas'
            />
            <textarea
                value={sectionState ? sectionState.questions : ''}
                onChange={(e) => updateSectionState(sectionIndex, { ...sectionState, questions: e.target.value })}
                placeholder="Section Question"
                rows={4}
                cols={50}
                className='input_areas'
            />
            <textarea
                type="text"
                value={sectionState ? sectionState.answers : ''}
                onChange={(e) => updateSectionState(sectionIndex, { ...sectionState, answers: e.target.value })}
                placeholder="Section Answer"
                rows={4}
                cols={50}
                className='input_areas'
            />

            <button className='next_btn' onClick={handlePrev}>Previous</button>


            <button className='next_btn' onClick={handleNext}>Next</button>
            <button className='save_btn' onClick={createQuiz}>Save Section</button>


        </div>
    );
};

export default SectionForm;
