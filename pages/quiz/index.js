import React from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizBgImage from '../../src/components/BgImage';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import Button from '../../src/components/Button';
import AlternativesForm from '../../src/components/AlternativesForm';
import BackLinkArrow from '../../src/components/BackLinkArrow';

function ResultWidget({results}){
    const numAcertos = results.filter((x) => x).length;
    return (
        <Widget>
            <Widget.Header>
                <BackLinkArrow href="/"/>
                Resultado final
            </Widget.Header>

            <Widget.Content>
                {
                numAcertos === 0 &&
                    <p>
                        Você acertou
                        {' nenhuma '}
                        pergunta
                    </p>
                }
                {
                    numAcertos % 2 === 0 && numAcertos !== 0 &&
                    <p>
                        Você acertou
                        {' '}
                        {results.filter((x) => x).length}
                        {' '}
                        perguntas
                    </p>
                }
                {
                    numAcertos % 2 === 1 &&
                    <p>
                        Você acertou 1 pergunta
                    </p>
                }
                <ul>
                    {results.map((result, index) => (
                        <li key={`result__${result}`}>
                            {`Pergunta ${index+1}: `}
                            {result === true
                                ? 'Acertou'
                                : 'Errou'}
                        </li>
                    ))}
                </ul>
            </Widget.Content>
        </Widget>
    );
}

function LoadingWidget(){
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>

            <Widget.Content>
            </Widget.Content>
        </Widget>
    );
}

function QuestionWidget ({question, questionIndex, totalQuestions, onSubmit, addResult}){
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const questionID = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;

    return (
        <Widget>
            <Widget.Header>
                <BackLinkArrow href="/"/>
                <h3>
                    {`Pergunta ${questionIndex+1} de ${totalQuestions}`}
                </h3>
            </Widget.Header>

            <Widget.Content>
                <h2>
                    {question.title}
                </h2>
                <p>
                    {question.description}
                </p>

                <AlternativesForm
                    onSubmit={(infosDoEvento) =>{
                        infosDoEvento.preventDefault();
                        setIsQuestionSubmited(true);
                        setTimeout(() => {
                            addResult(isCorrect);
                            onSubmit();
                            setIsQuestionSubmited(false);
                            setSelectedAlternative(undefined);
                        }, 1 * 1000);
                    }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        
                        const alternativeID = `alternative__${alternativeIndex}`;
                        const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                        const isSelected = selectedAlternative === alternativeIndex;
                        return (
                            <Widget.Topic
                                as="label"
                                key={alternativeID}
                                htmlFor={alternativeID}
                                data-selected={isSelected}
                                data-status={isQuestionSubmited && alternativeStatus}
                            >
                                <input
                                    style={{display: 'none'}}
                                    id={alternativeID}
                                    name={questionID}
                                    onChange={() => setSelectedAlternative(alternativeIndex)}
                                    type="radio"
                                />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}

                    <Button type="submit" disabled={!hasAlternativeSelected || isQuestionSubmited } >
                        Confirmar resposta
                    </Button>
                    {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
                    {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
                </AlternativesForm>
            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setcurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[currentQuestion];

    function addResult(result) {
        setResults([
            ...results,
            result,
        ]);
    }

    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 1 * 1000);
    }, []);

    function handleSubmitQuiz() {
        const nextQuestion = questionIndex +1;
        if (nextQuestion < totalQuestions) {
            setcurrentQuestion(nextQuestion);
        } else {
            setScreenState(screenStates.RESULT);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>  
            <QuizContainer>
                <QuizBgImage srcImage={db.bgImage}></QuizBgImage>
                    {screenState === screenStates.QUIZ && (
                        <QuestionWidget
                            question={question}
                            questionIndex={questionIndex}
                            totalQuestions={totalQuestions}
                            onSubmit={handleSubmitQuiz}
                            addResult={addResult}
                        />
                    )}

                {screenState === screenStates.LOADING && <LoadingWidget />}
                
                {screenState === screenStates.RESULT && <ResultWidget results={results} />}
            </QuizContainer>
        </QuizBackground>
    );
}