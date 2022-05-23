import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Segment,
    Item,
    Dropdown,
    Divider,
    Button,
    Message
} from 'semantic-ui-react';

import mindImg from '../../images/mind.svg';

import {
    CATEGORIES,
    NUM_OF_QUESTIONS,
    DIFFICULTY,
    QUESTIONS_TYPE,
    COUNTDOWN_TIME
} from '../../constants';
import { shuffle } from '../../utils';

import Offline from '../Offline';

const Main = ({ startQuiz }) => {
    const [category, setCategory] = useState(null);
    const [numOfQuestions, setNumOfQuestions] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [questionsType, setQuestionsType] = useState(null);
    const [countdownTime, setCountdownTime] = useState({
        hours: null,
        minutes: null,
        seconds: null
    });
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [offline, setOffline] = useState(false);

    const handleTimeChange = (e, { name, value }) => {
        setCountdownTime({...countdownTime, [name]: value });
    };

    let allFieldsSelected = false;
    if (
        category &&
        numOfQuestions &&
        difficulty &&
        questionsType &&
        (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
    ) {
        allFieldsSelected = true;
    }

    const fetchData = () => {
            setProcessing(true);

            if (error) setError(null);

            const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`;

            fetch(API)
                .then(respone => respone.json())
                .then(data =>
                    setTimeout(() => {
                            const { response_code, results } = data;

                            if (response_code === 1) {
                                const message = ( <
                                        p >
                                        The API doesn 't have enough questions for your query. (Ex.
                                        Asking
                                        for 50 Questions in a Category that only has 20.) <
                                    br / >
                                    <
                                    br / >
                                    Please change the < strong > No.of Questions < /strong>,{' '} <
                                strong > Difficulty Level < /strong>, or{' '} <
                                strong > Type of Questions < /strong>. < /
                                p >
                            );

                            setProcessing(false);
                            setError({ message });

                            return;
                        }

                        results.forEach(element => {
                            element.options = shuffle([
                                element.correct_answer,
                                ...element.incorrect_answers
                            ]);
                        });

                        setProcessing(false); startQuiz(
                            results,
                            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
                        );
                    }, 1000)
        )
        .catch(error =>
            setTimeout(() => {
                if (!navigator.onLine) {
                    setOffline(true);
                } else {
                    setProcessing(false);
                    setError(error);
                }
            }, 1000)
        );
};

if (offline) return <Offline / > ;

return ( <
    Container >
    <
    Segment >
    <
    Item.Group divided >
    <
    Item >
    <
    Item.Image src = { mindImg }
    /> <
    Item.Content >
    <
    Item.Header >
    <
    h1 > QUIZ < /h1> < /
    Item.Header > {
        error && ( <
            Message error onDismiss = {
                () => setError(null)
            } >
            <
            Message.Header > Error! < /Message.Header> { error.message } < /
            Message >
        )
    } <
    Divider / >
    <
    Item.Meta >
    <
    Dropdown fluid selection name = "category"
    placeholder = "Sélectionnez la catégorie de quiz"
    options = { CATEGORIES }
    value = { category }
    onChange = {
        (e, { value }) => setCategory(value)
    }
    disabled = { processing }
    /> <
    br / >
    <
    Dropdown fluid selection name = "numOfQ"
    placeholder = "Sélectionnez le nombre de questions"
    options = { NUM_OF_QUESTIONS }
    value = { numOfQuestions }
    onChange = {
        (e, { value }) => setNumOfQuestions(value)
    }
    disabled = { processing }
    /> <
    br / >
    <
    Dropdown fluid selection name = "difficulty"
    placeholder = "Sélectionnez le niveau de difficulté"
    options = { DIFFICULTY }
    value = { difficulty }
    onChange = {
        (e, { value }) => setDifficulty(value)
    }
    disabled = { processing }
    /> <
    br / >
    <
    Dropdown fluid selection name = "type"
    placeholder = "Sélectionnez le type de question"
    options = { QUESTIONS_TYPE }
    value = { questionsType }
    onChange = {
        (e, { value }) => setQuestionsType(value)
    }
    disabled = { processing }
    /> <
    br / >
    <
    Dropdown search selection name = "hours"
    placeholder = "Sélectionnez les heures"
    options = { COUNTDOWN_TIME.hours }
    value = { countdownTime.hours }
    onChange = { handleTimeChange }
    disabled = { processing }
    /> <
    Dropdown search selection name = "minutes"
    placeholder = "Sélectionnez Minutes"
    options = { COUNTDOWN_TIME.minutes }
    value = { countdownTime.minutes }
    onChange = { handleTimeChange }
    disabled = { processing }
    /> <
    Dropdown search selection name = "seconds"
    placeholder = "Sélectionnez les secondes"
    options = { COUNTDOWN_TIME.seconds }
    value = { countdownTime.seconds }
    onChange = { handleTimeChange }
    disabled = { processing }
    /> < /
    Item.Meta > <
    Divider / >
    <
    Item.Extra >
    <
    Button primary size = "large"
    icon = "play"
    labelPosition = "right"
    content = { processing ? 'EnCours...' : 'jouer maintenant' }
    onClick = { fetchData }
    disabled = {!allFieldsSelected || processing }
    /> < /
    Item.Extra > <
    /Item.Content> < /
    Item > <
    /Item.Group> < /
    Segment > <
    br / >
    <
    /Container>
);
};

Main.propTypes = {
    startQuiz: PropTypes.func.isRequired
};

export default Main;