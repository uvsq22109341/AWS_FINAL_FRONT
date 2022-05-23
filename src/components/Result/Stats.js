import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Button } from 'semantic-ui-react';

import ShareButton from '../ShareButton';
import { calculateScore, calculateGrade, timeConverter } from '../../utils';

const Stats = ({
    totalQuestions,
    correctAnswers,
    timeTaken,
    replayQuiz,
    resetQuiz
}) => {
    const score = calculateScore(totalQuestions, correctAnswers);
    const { grade, remarks } = calculateGrade(score);
    const { hours, minutes, seconds } = timeConverter(timeTaken);

    return ( <
        Segment >
        <
        Header as = "h1"
        textAlign = "center"
        block > { remarks } <
        /Header> <
        Header as = "h2"
        textAlign = "center"
        block >
        Note { grade } <
        /Header> <
        Header as = "h3"
        textAlign = "center"
        block >
        Nombre total de questions: { totalQuestions } <
        /Header> <
        Header as = "h3"
        textAlign = "center"
        block >
        Réponses correctes: { correctAnswers } <
        /Header> <
        Header as = "h3"
        textAlign = "center"
        block >
        Votre score { score } %
        <
        /Header> <
        Header as = "h3"
        textAlign = "center"
        block >
        Note de passage: 60 %
        <
        /Header> <
        Header as = "h3"
        textAlign = "center"
        block >
        Temps pris: { ' ' } { `${Number(hours)}h ${Number(minutes)}m ${Number(seconds)}s` } <
        /Header> <
        div style = {
            { marginTop: 35 }
        } >
        <
        Button primary content = "Rejouer"
        onClick = { replayQuiz }
        size = "big"
        icon = "redo"
        labelPosition = "left"
        style = {
            { marginRight: 15, marginBottom: 8 }
        }
        /> <
        Button color = "teal"
        content = "Acceuil"
        onClick = { resetQuiz }
        size = "big"
        icon = "home"
        labelPosition = "left"
        style = {
            { marginBottom: 8 }
        }
        /> <
        ShareButton / >
        <
        /div> < /
        Segment >
    );
};

Stats.propTypes = {
    totalQuestions: PropTypes.number.isRequired,
    correctAnswers: PropTypes.number.isRequired,
    timeTaken: PropTypes.number.isRequired,
    replayQuiz: PropTypes.func.isRequired,
    resetQuiz: PropTypes.func.isRequired
};

export default Stats;