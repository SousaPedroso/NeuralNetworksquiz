import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GithubCorner from '../src/components/GithubCorner'
import Head from 'next/head'

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
