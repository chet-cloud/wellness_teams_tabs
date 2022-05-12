// Import Components and Plugins
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { TeamsFxContext } from "./Context";
import { useData } from "@microsoft/teamsfx-react";
import { Container,
    Row,
    Col
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Footer from './lib/Footer.js';

// Import scss
import "../scss/App.scss";

// Import images
import demoAva from '../img/demo-ava.png';
import { addPref, getCat, getPref, likeCat } from './lib/api';
import { useReducer } from 'react';
import { initializeComponentRef } from '@uifabric/utilities';
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
                if(pref.id == action.id){
                    return {...pref, attributes: { ...pref.attributes, liked: !pref.attributes.liked} }
                } else{
                    return pref;
                }
            })
    }
}

function MainScreen(props) {
    const { teamsfx } = useContext(TeamsFxContext);
    const { loading, data, error } = useData(async () => {
        if (teamsfx) {
        const userInfo = await teamsfx.getUserInfo();
        return userInfo;
        }
    });
    const userName = (loading || error) ? "User": data.displayName;
    const avatar = (loading || error) ? demoAva : data.photoUrl;
    const [cats, setCats] = useState([]);
    const [prefs, dispatch] = useReducer(reducer, []);
    const [loaded, setLoaded] = useState(0);
    const userId = 2;

    function loadCats(_callback){
        getCat().then( ({data}) => {
            setCats(data.data);
            var test = data.data;
            test.map((cat) => {
                addPref(userId, cat.id);
                loadPrefs();
            });
        });
        _callback();
    }

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
        loadCats(() => {
            loadPrefs();
        });
    }, [])
    
    return (
        <div>
            <Container className='box mx-0 mx-md-auto'>
                <Row>
                    <Header userId={userId} userName={userName} avatar={avatar} />
                    <Col className='col-12'>
                        <h4 className='mb-3'>Categories</h4>
                        <Row>
                            {cats.map((cat) => {
                                if(loaded == 0){
                                    setLoaded(1);
                                }else{
                                    return(
                                        <Col className='col-12' key={cat.id}>
                                            <div className='cat-box'>
                                                <div className='sticker-box' style={{backgroundColor: `${cat.attributes.background}`}}>
                                                    <img src={cat.attributes.icon.data.attributes.url} />
                                                </div>
                                                <h4>{cat.attributes.name}<br />
                                                <p>{cat.attributes.des}</p></h4>
                                                <div>
                                                    {prefs.map((pref) => {
                                                        if(pref.attributes.category.data == null){
                                                            window.location.reload(false);
                                                        }else{
                                                            if(pref.attributes.category.data.id == cat.id){
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
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                }
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default MainScreen;