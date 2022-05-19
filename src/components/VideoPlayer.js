// Import components and plugin
import React from 'react';
import ReactPlayer from 'react-player';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faMeh, faPause, faPlay, faExpand } from '@fortawesome/free-solid-svg-icons';
import { getVideo, getHis, addHistory, updateHistory, checkHis, addCoin } from './lib/api';
import { useReducer } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';

// Import images
import DoneIcon from '../img/done-icon.png';

function VideoPlayer(props) {
    const [played, setPlayed] = useState(0);
    const [vids, setVids] = useState([]);
    const [history, setHistory] = useState([]);
    const [loaded, setLoaded] = useState(0);
    const initialState ={
        like: '#B9C0CA', 
        dislike: '#B9C0CA', 
        meh: '#B9C0CA'
    };
    const [likeVal, setLikeVal] = useState();
    const [rate, setRate] = useReducer(setRating, initialState );
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [playing, setPlaying] = useState(false);
    const vid_player = useRef(null);
    const userId = props.userId;

    // Video Player Event Handler
    const handleProgress = value => {
        setPlayed(value.played);
        if(value.played > 0.75){
            if(count === 0){
                console.log('watched 75%');
                // Check if the history already watched
                if(!history[0].attributes.watched){
                    updateHistory(history[0].id, null, true);
                    addCoin(props.userId);
                    console.log("updated");
                }
                setCount(1);
            }
        }
    }

    const handleEnd = () => {
        setOpen(o => !o);
        // ref.current.open();
        console.log("ended");
    }

    const handleSeekChange = e => {
        setPlayed(parseFloat(e.target.value));
    }

    const handleSeekMouseUp = e => {
        vid_player.current.seekTo(parseFloat(e.target.value));
    }

    const handlePlayPause = () => {
        setPlaying(!playing);
        console.log(!playing);
    }

    const handleFullScreen = e => {
        console.log("FullScreen");
    }
    // Handle api data fetching
    

    function addEntry(userId, vidId){
        console.log(vidId);
        getHis(userId, vidId).then(({data}) => {
            var check = data.data;
            console.log(data.data);
            if(check.length === 0){
                addHistory(userId, vidId);
                setLoaded(0);
                console.log('added');
            }else{
                setHistory(data.data);
            }
        })
    }

    function loadHis(userId, vidId){
        getHis(userId, vidId).then(({data}) => {
            setHistory(data.data);
            var check = data.data;
            console.log(check);
            if(check.length > 0){
                setLoaded(1);
                setLikeVal(data.data[0].attributes.liked);
            }
        })
    }

    function setRating(state, action){
        switch(action.type){
            case 'like':
                updateHistory(history[0].id, true, null);
                setLikeVal(true);
                setLoaded(2);
                return { ...initialState, like: '#F06595' };
            case 'dislike':
                updateHistory(history[0].id, false, null);
                setLikeVal(false);
                setLoaded(2);
                return { ...initialState, dislike: '#F06595' };
            case 'meh':
                updateHistory(history[0].id, null, null);
                setLikeVal(null);
                setLoaded(2);
                return { ...initialState, meh: '#F06595' };
            default:
                return { ...initialState};
        }
    }

    useEffect(() => {
        function loadVids(){
            checkHis(userId).then(({data}) => {
                var check = data.data;
                if(check.length > 0){
                    getVideo(userId, 'visited').then(({data}) => {
                        console.log(data.data);
                        setVids(data.data[0]);
                    });
                }else{
                    getVideo(userId).then(({data}) => {
                        setVids(data.data[0]);
                        console.log(data.data);
                        var check = data.data[0];
                        addEntry(userId, check.id);
                    });
                }
            });
        }

        loadVids();
    }, [userId])

    if(typeof(vids.attributes) === 'undefined'){
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
        if(loaded === 0){
            loadHis(props.userId, vids.id);
            console.log(history);
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
            if(loaded === 2){
                setTimeout(() => loadHis(userId, vids.id), 2000);
                console.log(likeVal);
            }
            var tags = "";
            if (vids.attributes.tags.data != null) {
                var i = 1;
                var tag_list = vids.attributes.tags.data;
                tag_list.forEach(tag => {
                    tags += `${tag.attributes.name}`;
                    if(tag_list.length > i){
                        tags += ' • ';
                    }
                    i++;
                })
            } 
            var video_url = "";
            if(vids.attributes.cdn_url === ""){
                video_url = vids.attributes.url;
            }else{
                video_url = vids.attributes.cdn_url;
            }
            return (
                <div>
                    <div>
                        <ReactPlayer url={video_url}
                        className='react-player'
                        onProgress={handleProgress}
                        onEnded={handleEnd}
                        controls={false}
                        playing={playing}
                        ref={vid_player}
                        />

                        <div className='des-box'>
                            <p className="d-flex justify-content-center align-items-center">
                                <button onClick={handlePlayPause} className="pp_btn">
                                    {playing ?
                                        <FontAwesomeIcon icon={faPause} color='#F06595' />
                                    :   <FontAwesomeIcon icon={faPlay} color='#F06595' />
                                    }
                                </button>
                                <input
                                    type='range' min={0} max={0.999999} step='any'
                                    value={played}
                                    onChange={handleSeekChange}
                                    onMouseUp={handleSeekMouseUp}
                                    className="prog-bar"
                                    style={{backgroundSize: `${played * 100}% 100%`}}
                                />
                                <button onClick={handleFullScreen} className="pp_btn mar-left">
                                    <FontAwesomeIcon icon={faExpand} color='#F06595' />
                                </button>
                            </p>
                            <div className="add-flex">
                                <div className="name-box">
                                    <h4>{`${vids.attributes.category.data.attributes.name}`} 
                                    </h4>
                                    <h3>{vids.attributes.title}<br />
                                        <p>{tags}</p>
                                        {/* <p>{vids.attributes.des}</p> */}
                                    </h3>
                                </div>
                                
                                {history.map((his) => {
                                    return (
                                        <div className="rating" key={his.id}>
                                            <div className="icon-box">
                                                <FontAwesomeIcon icon={faThumbsUp} color={(likeVal != null && likeVal)  ? rate.like = '#F06595' : rate.like} size='3x' onClick={ () => setRate({type: 'like'})} />
                                            </div>
                                            <div className="icon-box">
                                                <FontAwesomeIcon icon={faMeh} color={rate.meh} size='3x' onClick={ () => setRate({type: 'meh'})} />
                                            </div>
                                            <div className="icon-box">
                                                <FontAwesomeIcon icon={faThumbsDown} color={(likeVal != null && !likeVal)  ? rate.dislike = '#F06595' : rate.dislike} size='3x' onClick={ () => setRate({type: 'dislike'})} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <Popup
                        open={open} className='done'
                        closeOnDocumentClick={false}
                    >
                        <div className='done-box'>
                            <img src={DoneIcon} alt='cup icon' />
                            <h3>All done for today!</h3>
                            <p>Comeback tomorrow for more<br />Wellness videos curated for you</p>
                            <Link to={`/list`} className='link'>
                                <button className='continue'>Continue</button>
                            </Link>
                        </div>
                    </Popup>
                </div>
            );
        }
    }
}

export default VideoPlayer;