import questions from '@dummydata/dummyData.json';

export const GET = async (req, res) => {
    //Get a list of quizes, give name and id only.
    return new Response(JSON.stringify(questions), { status: 200 })
};
