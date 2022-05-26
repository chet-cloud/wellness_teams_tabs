import React, { useEffect, useState } from 'react';
import { Container,
    Row,
    Col,
    Spinner,
} from 'react-bootstrap';
import {getCoins} from './api';
import Popup from 'reactjs-popup';

function Header(props) {
    const [streaks, setStreak] = useState();
    const [open, setOpen] = useState(false);
    const userId = props.userId;
    function loadStreak(userId){
        getCoins(userId).then(({data}) => {
            var check = data.data;
            if(check.length === 0){
                setStreak(0);
            }else{
                setStreak(data.data[0].attributes.streaks);
            }
        })
    }

    useEffect(() => {
        loadStreak(userId);
    }, [userId])

    if(streaks == null){
        return(
            <div>
                <Container className='d-flex justify-content-center align-items-center'>
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
            <Col className='col-12 sub-box frow'>
                <img className='avatar' src={props.avatar} alt="User Avatar" />
                <h2><span className='lighter'>Hello</span> {props.userName}<br/>
                <p>Have a nice day!</p></h2>
    
                <div className='streak'>
                    <Popup open={open}
                        trigger={(() => {
                            if(streaks < 3){
                                return(
                                    <svg aria-label='sm-mus' onClick={() => setOpen(o => !o)}>
                                        <use xlinkHref='#sm-mus'></use>
                                    </svg>
                                )
                            }else if(streaks > 7){
                                return(
                                    <svg aria-label='lg-mus' onClick={() => setOpen(o => !o)}>
                                        <use xlinkHref='#lg-mus'></use>
                                    </svg>
                                )
                            }else{
                                return(
                                    <svg aria-label='med-mus' onClick={() => setOpen(o => !o)}>
                                        <use xlinkHref='#med-mus'></use>
                                    </svg>
                                )
                            }
                        })()}
                        on={['hover', 'focus']}
                        position='left center'
                        className='muscle-popup'
                    >
                        <p>Grow your wellness muscle by watching <br />your daily videos.</p>
                    </Popup>
                </div>
            </Col>
        );
    }
}

export default Header;