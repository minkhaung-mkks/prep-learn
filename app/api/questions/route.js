import questions from '@dummydata/dummyData.json';

export const GET = async (req, res) => {
    console.log(questions)
    return new Response(JSON.stringify(questions), { status: 200 })
};
