import styled from 'styled-components';
import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

function bgImage (){
    return (
        <Image
            src="/bgImage.svg"
            alt="Imagem de fundo do quiz"
            layout="responsive"
            width={150}
            height={63}
        />
    );
}

bgImage.propTypes = {
    className: PropTypes.string.isRequired,
}

const QuizBgImage = styled(bgImage)`
    margin: auto;
    display: block;
    @media screen and (max-width: 500px) {
        margin: 0;
    }
`

export default QuizBgImage;