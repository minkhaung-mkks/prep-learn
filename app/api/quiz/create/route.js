import { txtToData, fetchOldData, addToFile, appendToData } from './utils'; // Import your utility functions

export default async function makeQuizHandler(req, res) {
    const { name, subject, exam, topic, sub_topic, difficulty, creator, creatorID, type, ideal_time, total_questions, source, sections } = req.body;

    try {
        let newData = {
            id: 1,
            name,
            subject,
            exam,
            topic,
            sub_topic,
            difficulty,
            creator,
            creatorID,
            type,
            ideal_time,
            total_questions,
            source,
            sections: [],
        };

        for (let i = 0; i < sections.length; i++) {
            let section = await txtToData(sections[i].context, sections[i].question, sections[i].answer);
            newData = await addToSection(newData, section);
        }

        let oldData = await fetchOldData();
        newData.id = oldData.length + 1;
        let finalData = await addToFile(oldData, newData);
        appendToData(finalData);

        res.status(200).json({ success: 'Quiz created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create the quiz' });
    }
}
