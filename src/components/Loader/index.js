import React from 'react';
import { Container, Message, Icon } from 'semantic-ui-react';

const Loader = () => {
    return ( <
        Container >
        <
        Message icon size = "big" >
        <
        Icon name = "circle notched"
        loading / >
        <
        Message.Content >
        <
        Message.Header > Juste une seconde < /Message.Header>
        Nous récupérons ce contenu pour vous. <
        /Message.Content> <
        /Message> <
        /Container>
    );
};

export default Loader;