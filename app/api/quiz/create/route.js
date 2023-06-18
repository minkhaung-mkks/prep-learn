import { txtToData, fetchOldData, addToSection, addToFile, appendToData } from '@utlis/Quiz_creation.js'; // Import your utility functions

export const POST = async (req) => {
    const { name, subject, exam, topic, sub_topic, difficulty, creator, creatorID, type, ideal_time, source, sections } = await req.json();
    console.log(`${name}`)
    console.log(`${sections} : WTF`)
    console.log(`${sections[0].questions}`)
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
            total_questions: 0,
            source,
            sections: [],
        };

        for (let i = 0; i < sections.length; i++) {
            let section = await txtToData(sections[i].context, sections[i].questions, sections[i].answers);
            newData = await addToSection(newData, section);
        }

        let oldData = await fetchOldData();
        if (Array.isArray(oldData)) {
            newData.id = oldData.length + 1;
        }
        let finalData = await addToFile(oldData, newData);
        appendToData(finalData);

        return new Response(JSON.stringify(finalData), {
            status: 201
        })
    } catch (error) {
        console.error(error);
        return new Response("Failed to create New Prompt", {
            status: 500
        })
    }
}
