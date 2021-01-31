import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-family: 'Lato';
    color: ${({ theme }) => theme.colors.contrastText};
  }

  html, body {
    min-height: 100vh;
  }

  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

const theme = db.theme;

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://neuralnetworksquiz.vercel.app" />
      <meta property="og:title" content="NN Quiz | O quanto você conhece sobre Redes Neurais?" />
      <meta property="og:description" content="Clique e teste seus conhecimentos sobre essa sub-área da Aprendizagem de Máquina tão destacada." />
      <meta property="og:image" content={db.bg} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://neuralnetworksquiz.vercel.app" />
      <meta property="twitter:title" content="NN Quiz | O quanto você conhece sobre Redes Neurais?" />
      <meta property="twitter:description" content="Clique e teste seus conhecimentos sobre essa sub-área da Aprendizagem de Máquina tão destacada." />
      <meta property="twitter:image" content={db.bg} />

      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>

      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
