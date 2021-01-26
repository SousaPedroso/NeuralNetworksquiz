import React from 'react';
import styled from 'styled-components';
import db from '../db.json';
import Head from 'next/head';
import {useRouter} from 'next/router';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return(
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Neural Networks Quiz</title>
      </Head>
      <QuizContainer>
        <Widget>
            <Widget.Header>
              <h1>Neural Networks</h1>
            </Widget.Header>
            <Widget.Content>
              <form onSubmit= {function(infosDoEvento) {
                infosDoEvento.preventDefault();
                router.push(`/quiz?name=${name}`);
              }} >
                <input
                  onChange={function (infosDoEvento) {
                    setName(infosDoEvento.target.value);
                  }}
                placeholder="Insira seu nome de usuário" />
                <button type="submit" disabled={name.length === 0}>
                  Jogar
                </button>
              </form>
            </Widget.Content>
        </Widget>

        <Widget>
            <Widget.Content>
              <h1>Quizes da galera</h1>
            </Widget.Content>
        </Widget>
        <Footer/>
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/SousaPedroso" />
    </QuizBackground>
  )
}
