// Import Components and Plugins
import React from 'react';
import { Container,
    Row,
    Col
} from 'react-bootstrap';
import VideoPlayer from './VideoPlayer';
import Footer from './lib/Footer.js';
import {info} from './lib/api';

// Import scss
import "../scss/App.scss";

// Import images
import demoAva from '../img/demo-ava.png';
import Header from './lib/Header';

function StreamScreen(props) {
    const userId = info.username;
    const userName = userId.substring(0, userId.indexOf("@"));
    const avatar = demoAva;

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