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
import demoAva from '../img/wellness-logo.png';
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
    const [loading, setLoading] = useState(0);

    function updateCat(catId, liked, entry){
        dispatch({id: entry});
        likeCat(userId, catId, liked, entry);
    }
    function loadPrefs(){
        getPref(userId).then(({data}) => {
            dispatch({type: 'update', initialState: data.data});
            console.log(data.data);
            setLoading(loading+1);
        })
    }
    

    useEffect(() => {
        getCat().then((category)=>{
            const allCategories = category.data
            console.log("======================"+allCategories)
            return getPref(userId).then((preferences)=>{
                const allPreferences = preferences.data
                console.log("-------------------"+allPreferences)
                return allCategories.data.map((cat)=>{
                    if(allPreferences.data.find((pre)=>{
                        return pre.attributes.category.data.id === cat.id
                    })!=null){
                        cat['selected'] = true
                    }
                    return cat
                })
            })
        }).then((result)=>{
            console.log(result)
        })

        // function loadCats(_callback){
        //     getCat().then( ({data}) => {
        //         debugger
        //         setCats(data.data);
        //         // var test = data.data;
        //         // test.forEach((cat) => {
        //         //     addPref(userId, cat.id);
        //         // });
        //     });
        //     _callback();
        // }

        // loadCats(() => {
        //     setTimeout(() => loadPrefs(), 2000)
        // });
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, loading])
    
    if(cats === null || prefs === null){
        console.log(prefs)
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
        prefs.forEach((pref) => {
            if(pref.attributes.category.data === null){
                loadPrefs();
                setLoading(loading+1);
            }
        });
        if(prefs.length === cats.length){
            return (
                <div>
                    <Container className='box mx-0 mx-md-auto'>
                        <Row>
                            <Header userId={userId} userName={userName} avatar={avatar} />
                            <Col className='col-12'>
                                <h4 className='mb-3'>Categories</h4>
                                <p>Pick a category of your interest and receive your daily video dose based off your choices. Watch your today video in the "Watch Today Video" tab and enjoy a wonderfull day.</p>
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
                                                            if(pref.attributes.category.data === null){
                                                                window.location.reload(false);
                                                                return false;
                                                            }else{
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
                                                            }
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