// Import Components and Plugins
import React ,{useEffect} from 'react';
import { Container,
    Row,
    Col,
} from 'react-bootstrap';
import VideoPlayer from './VideoPlayer';
import Footer from './lib/Footer.js';
import {info} from './lib/api';
import {needGo} from './lib/visitCheck';
import { useNavigate } from "react-router-dom";
// Import scss
import "../scss/App.scss";

// Import images
import demoAva from '../img/wellness-logo.png';
import Header from './lib/Header';

function StreamScreen(props) {
    let navigate  = useNavigate();
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

    useEffect(() => {
        needGo().then((go)=>{
            if(go) navigate("/home") 
        })
    });

    return (
        <div>
            <Container className='box stream'>
                <Row>
                    <Header userId={userId} userName={userName} avatar={avatar}/>
                    <Col className='col-12'>
                        <h4 className='mb-3'>Video of the Day</h4>
                        <p>Watch till the end of the video to grow your wellness muscle.</p>
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