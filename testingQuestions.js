const fs = require('fs');
const fsPromise = require('fs').promises;

let dummyData = {
    Sections: [
        {
            context: "The Civil War in the United States, which lasted from 1861 to 1865, marked a significant turning point in the nation's history. The conflict stemmed from tensions between the North and the South, primarily regarding the issue of the abolition of slavery. The North, or Union, wanted to abolish slavery, while the South, also known as the Confederacy, vehemently defended this institution.",
            questions: [
                {
                    text:"When did the Civil War in the United States take place?",
                    answers:{
                        a:"1756-1763",
                        b:"1861-1865",
                        c:"1914-1918",
                        d:"1939-1945"
                    },
                    correct:"b"
                },
                {
                    text:"What was the primary issue that led to the Civil War?",
                    answers:{
                        a:"Economic disparities",
                        b:"Territorial disputes",
                        c:"Abolition of slavery",
                        d:"Religious differences"
                    },
                    correct:"c"
                },
                {
                    text:"Which region was known as the Union during the Civil War?",
                    answers:{
                        a:"East",
                        b:"West",
                        c:"North",
                        d:"South"
                    },
                    correct:"c"
                }
            ]
        }
    ]
}


const writeToJson =async ()=>{
    try {
        await fsPromise.writeFile('dummyData.json', JSON.stringify(dummyData, null, 2));
        console.log('Data successfully written to file');
    } catch (error) {
        console.error(`Error writing data to file: ${error}`);
    }
}
const readFromFile = async () => {
    try {
        const data = await fsPromise.readFile('dummyData.json', 'utf-8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error(`Error reading data from file: ${error}`);
    }
}


const appendToData = async (existingData,newData) => {
    try {
        // console.log(existingData)
        existingData.Sections.push(...newData.Sections);
        console.log(existingData)
        await fsPromise.writeFile('dummyData.json', JSON.stringify(existingData, null, 2));
        
        console.log('Data successfully appended to file');
        
    } catch (error) {
        console.error(`Error appending data to file: ${error}`);
    }
}
const generateDummyJson = async () => {
    const existingData = await readFromFile();

    if (existingData) {
        await appendToData(existingData,dummyData);
    } else {
        await writeToJson();
    }
};


module.exports={readFromFile, writeToJson}