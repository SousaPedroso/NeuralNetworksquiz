import React from 'react';

export default function QuizDaGaleraPage() {
    return (
        <div>
            
        </div>
    );
}

export async function getServerSideProps(context) {
    const [projectName, githubUser] = context.query.id.split('___');

    try{
        const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Falha em pegar os dados');
        })
        .then((responseConvertedOnObject) => {
            return responseConvertedOnObject
        })
    
        return {
            props: {
                dbExterno,
            },
        };
    } catch(err){
        throw new Error(err);
    }
}