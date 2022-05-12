// Import Components and Plugins
import React from 'react';
import { useState } from 'react';
import { useContext } from "react";
import { TeamsFxContext } from "./Context";
import { useData } from "@microsoft/teamsfx-react";
import { Container,
    Row,
    Col
} from 'react-bootstrap';
import VideoPlayer from './VideoPlayer';
import Footer from './lib/Footer.js';

// Import scss
import "../scss/App.scss";

// Import images
import demoAva from '../img/demo-ava.png';
import Header from './lib/Header';

function StreamScreen(props) {
    const { teamsfx } = useContext(TeamsFxContext);
    const { loading, data, error } = useData(async () => {
        if (teamsfx) {
        const userInfo = await teamsfx.getUserInfo();
        return userInfo;
        }
    });
    const userName = (loading || error) ? "User": data.displayName;
    const avatar = (loading || error) ? demoAva : data.photoUrl;
    const userId = 2;

    var rows = [];
    var numvids = 1;
    for (var i = 1; i <= numvids; i++){
        rows.push(
            <div  key={i} >
                <VideoPlayer vidId={i} userId={userId}/>
            </div>
            );
    }

    return (
        <div>
            <Container className='box stream'>
                <Row>
                    <Header userId={userId} userName={userName} avatar={avatar}/>
                    <Col className='col-12'>
                        <h4 className='mb-3'>Video of the Day</h4>
                    </Col>
                </Row>
            </Container>
            <Container className='container-fluid add-botpad'>
                <Row>
                    <Col className='col-12 px-0 px-md-auto full-box'>
                        {/* video goes here */}
                        {rows}
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default StreamScreen;