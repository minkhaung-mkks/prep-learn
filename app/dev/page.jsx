'use client'
import SummaryCard from '@components/SummaryCard'
import React, { useState, useEffect } from 'react'

const Dev = () => {
    const [quiz, setQuiz] = useState()
    const [total, setTotal] = useState()
    const getData = async () => {
        const response = await fetch('/data.json');
        let data = await response.json();
        data = data.filter(quiz => quiz.id === 1)
        let totalQuestions = 0
        data[0].sections.forEach((section) => {
            totalQuestions += section.questions.length;
        });
        setQuiz(data[0])
        setTotal(totalQuestions)
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {quiz && <SummaryCard quiz={quiz} score={40} total={total} />}
        </>
    )
}

export default Dev