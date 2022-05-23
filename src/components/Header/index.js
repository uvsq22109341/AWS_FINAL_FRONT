import React, { useState } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { logout, getCurrentUser } from '../../services/authServices';


const Header = () => {
    const [promptEvent, setPromptEvent] = useState(null);
    const [appAccepted, setAppAccepted] = useState(false);

    let isAppInstalled = false;

    if (window.matchMedia('(display-mode: standalone)').matches || appAccepted) {
        isAppInstalled = true;
    }

    window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault();
        setPromptEvent(e);
    });

    const installApp = () => {
        promptEvent.prompt();
        promptEvent.userChoice.then(result => {
            if (result.outcome === 'accepted') {
                setAppAccepted(true);
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
        });
    };

    return (
        <Menu stackable inverted size="massive" >
            <Menu.Item header>
                <h1 style={{ color: 'orange' }}> QUIZ </h1>
            </Menu.Item>
            {
                promptEvent && !isAppInstalled && (
                    <Menu.Item position="right">
                        <Button
                            color="blue"
                            icon="cloud download"
                            labelPosition="left"
                            content="Install App"
                            onClick={installApp}
                        />
                    </Menu.Item>
                )
            }
            <Menu.Menu position='right'>
                <Menu.Item

                    onClick={() => {
                        logout();
                        window.location.reload();
                    }}
                >
                    {getCurrentUser().email}
                </Menu.Item>

                <Menu.Item
                    name='Se déconnecter'
                    onClick={() => {
                        logout();
                        window.location.reload();
                    }}
                />
            </Menu.Menu>
        </Menu>
    );
};

export default Header;