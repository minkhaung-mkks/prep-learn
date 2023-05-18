import questions from '@dummydata/dummyData.json';

export const GET = async (req, res) => {
    //Get a quiz with the ID from the file
    return new Response(JSON.stringify(questions), { status: 200 })
};
