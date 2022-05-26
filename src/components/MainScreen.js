// Import Components and Plugins
import React, { useState, useEffect } from 'react';
import { Container,
    Row,
    Col,
    Spinner
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Footer from './lib/Footer.js';

// Import scss
import "../scss/App.scss";

// Import images
import demoAva from '../img/demo-ava.png';
import { addPref, getCat, getPref, likeCat, info } from './lib/api';
import { useReducer } from 'react';
// import { initializeComponentRef } from '@uifabric/utilities';
import Header from './lib/Header';

function init(initialState){
    return initialState;
}

const reducer = (state, action) => {
    switch (action.type){
        case 'update':
            return init(action.initialState);
        default:
            return state.map((pref) => {
                if(pref.id === action.id){
                    return {...pref, attributes: { ...pref.attributes, liked: !pref.attributes.liked} }
                } else{
                    return pref;
                }
            })
    }
}

function MainScreen(props) {
    const userId = info.username;
    const userName = userId.substring(0, userId.indexOf("@"));
    const avatar = demoAva;
    const [cats, setCats] = useState(null);
    const [prefs, dispatch] = useReducer(reducer, null);

    function updateCat(catId, liked, entry){
        dispatch({id: entry});
        likeCat(userId, catId, liked, entry);
    }
    function loadPrefs(){
        getPref(userId).then(({data}) => {
            dispatch({type: 'update', initialState: data.data});
        })
    }
    
    useEffect(() => {
        function loadCats(_callback){
            getCat().then( ({data}) => {
                setCats(data.data);
                var test = data.data;
                test.forEach((cat) => {
                    addPref(userId, cat.id);
                });
            });
            _callback();
        }

        loadCats(() => {
            setTimeout(() => loadPrefs(), 1500);
        });
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, prefs])
    
    if(cats === null || prefs === null){
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
        console.log("prefs: " + prefs.length)
        console.log("cats: " + cats.length)
        console.log(prefs.length < cats.length);
        if(prefs.length === cats.length){
            return (
                <div>
                    <Container className='box mx-0 mx-md-auto'>
                        <Row>
                            <Header userId={userId} userName={userName} avatar={avatar} />
                            <Col className='col-12'>
                                <h4 className='mb-3'>Categories</h4>
                                <Row>
                                    {cats.map((cat) => {
                                        return(
                                            <Col className='col-12' key={cat.id}>
                                                <div className='cat-box'>
                                                    <div className='sticker-box' style={{backgroundColor: `${cat.attributes.background}`}}>
                                                        <img src={cat.attributes.icon.data.attributes.url} alt="Category icon"/>
                                                    </div>
                                                    <h4>{cat.attributes.name}<br />
                                                    <p>{cat.attributes.des}</p></h4>
                                                    <div>
                                                        {prefs.map((pref) => {
                                                            if(pref.attributes.category.data.id === cat.id){
                                                                var liked = pref.attributes.liked ? '#F06595' : '#B9C0CA';
                                                                var action = pref.attributes.liked ? false : true;
                                                                return (
                                                                    <div className='heart-container' key={'sup' + cat.id}>
                                                                        <FontAwesomeIcon icon={faHeart} color={liked} size='2x' 
                                                                        onClick={ () => updateCat(cat.id, action, pref.id)} 
                                                                        />
                                                                    </div>
                                                                );
                                                            }
                                                            return false;
                                                        })}
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    <Footer />
                </div>
            );
        }else{
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
        }
    }
}

export default MainScreen;