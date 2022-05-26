// Import Components and Plugins
import React, { useState, useEffect } from 'react';
import { Container,
    Row,
    Col,
    Spinner
} from 'react-bootstrap';
import ReactPlayer from 'react-player';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { getSaved, updateHistory, info } from './lib/api';
import Header from './lib/Header';
import Footer from './lib/Footer.js';

// Import scss
import 'reactjs-popup/dist/index.css';
import "../scss/App.scss";
import "../scss/playlist.scss";

// Import images
import demoAva from '../img/demo-ava.png';
import welcome from '../img/welcoming-icon.png';

function PlaylistScreen(props) {
    const userId = info.username;
    const userName = userId.substring(0, userId.indexOf("@"));
    const avatar = demoAva;
    const [vids, setVids] = useState(null);
    const [loaded, setLoaded] = useState(0);

    function loadVids(){
        getSaved(userId).then(({data}) => {
            setVids(data.data);
        });
    }
    function dislike(entry){
        console.log("Unlike");
        updateHistory(entry, false);
        setLoaded(1);
    }

    useEffect(() => {
        loadVids();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    if(loaded === 1){
        loadVids();
        setLoaded(0);
    }

    if(vids === null){
        return(
            <div>
                <Container className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
                    <Row>
                        <Col className='col-12'>
                            <Spinner animation='border' />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }else{
        return (
            <div>
                <Container className='box mx-0 mx-md-auto'>
                    <Row>
                        <Header userId={userId} userName={userName} avatar={avatar}/>
                        <Col className='col-12'>
                            <h4 className='mb-3'>Saved Videos</h4>
                            <Row>
                                {vids.length > 0 &&
                                    vids.map((vid) => {
                                        if(loaded === 1){
                                            loadVids();
                                            setLoaded(0);
                                        }
                                        console.log(vids);

                                        if(vid.attributes.video.data != null){
                                            var tags = "";
                                            if (vid.attributes.video.data.attributes.tags.data != null) {
                                                var i = 1;
                                                var tag_list = vid.attributes.video.data.attributes.tags.data;
                                                tag_list.forEach(tag => {
                                                    tags += `${tag.attributes.name}`;
                                                    if(tag_list.length > i){
                                                        tags += ' • ';
                                                    }
                                                    i++;
                                                })
                                            } 
                                            return(
                                                <Col className='col-12' key={vid.id}>
                                                    <div className='cat-box'>
                                                        <div className='sticker-box'>
                                                            <Popup trigger={vid.attributes.video.data.attributes.vid_thumb.data != null ?
                                                                <img className='avatar' src={vid.attributes.video.data.attributes.vid_thumb.data.attributes.url} alt="video thumb" />
                                                                : <img className='avatar' src={welcome} alt="placeholder thumb" />
                                                            } modal>
                                                                <div className="vid-box">
                                                                    {vid.attributes.video.data.attributes.cdn_url !== "" ?
                                                                        <ReactPlayer url={vid.attributes.video.data.attributes.cdn_url} 
                                                                        className='react-player'
                                                                        />
                                                                    : <ReactPlayer url={vid.attributes.video.data.attributes.url} 
                                                                    className='react-player'
                                                                    />
                                                                    }
                                                                </div>
                                                            </Popup>
                                                        </div>
                                                        <h4>{vid.attributes.video.data.attributes.title}<br />
                                                        <p>{tags}</p>
                                                        </h4>
                                                        <div>
                                                            <div className='heart-container' key={'sup' + vid.id}>
                                                                <FontAwesomeIcon icon={faHeart} color='#F06595' size='2x' 
                                                                onClick={ () => dislike(vid.id)} 
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        }else{
                                            return (
                                                <Col className='col-12' key={vid.id}>
                                                    <div className='cat-box'>
                                                        <p>This video is encountering errors. Please check back later.</p>
                                                    </div>
                                                </Col>
                                            )
                                        }
                                    })
                                }
                                {vids.length === 0 &&
                                    <Col className='col-12'>
                                        <div className='cat-box'>
                                            <p>You don't have any saved videos.</p>
                                        </div>
                                    </Col>
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default PlaylistScreen;