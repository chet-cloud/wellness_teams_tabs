// Import components and plugin
import React from 'react';
import ReactPlayer from 'react-player';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faMeh, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { getVideo, getHis, addHistory, updateHistory, checkHis, addCoin } from './lib/api';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
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
    const [likeVal, setLikeVal] = useState(null);
    const [rate, setRate] = useState(initialState);
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [playing, setPlaying] = useState(true);
    const vid_player = useRef(null);
    const handle = useFullScreenHandle();
    const userId = props.userId;
    // var visited = true;

    // Video Player Event Handler
    const handleProgress = value => {
        setPlayed(value.played);
        if(value.played > 0.75){
            if(count === 0){
                // Check if the history already watched
                if(!history[0].attributes.watched){
                    updateHistory(history[0].id, null, true);
                    addCoin(props.userId);
                }
                setCount(1);
            }
        }
    }

    const handleEnd = () => {
        setOpen(o => !o);
    }

    const handleSeekChange = e => {
        setPlayed(parseFloat(e.target.value));
    }

    const handleSeekMouseUp = e => {
        vid_player.current.seekTo(parseFloat(e.target.value));
    }

    const handlePlayPause = () => {
        setPlaying(!playing);
    }

    const handlePause = () => {
        setPlaying(false);
    }

    const handlePlay = () => {
        setPlaying(true);
    }

    // const handleReady = () => {
        
    //     if(visited === true){
    //         vid_player.current.seekTo(0.5);
    //         setPlayed(0.5);
    //     }

    // }
    // Handle api data fetching

    function addEntry(userId, vidId){
        getHis(userId, vidId).then(({data}) => {
            var check = data.data;
            if(check.length === 0){
                addHistory(userId, vidId);
                setLoaded(0);
            }else{
                setHistory(data.data);
            }
        })
    }

    function loadHis(userId, vidId){
        getHis(userId, vidId).then(({data}) => {
            setHistory(data.data);
            var check = data.data;
            if(check.length > 0){
                setLoaded(1);
                if(likeVal === null){
                    setLikeVal(data.data[0].attributes.liked);
                }
            }
        })
    }

    function setRating({type}){
        // setLoaded(0);
        switch(type){
            case 'like':
                updateHistory(history[0].id, true, null).then(()=>{
                    setLikeVal(true);
                    setRate({ ...initialState, like: '#F06595' })
                })
                break
            case 'dislike':
                updateHistory(history[0].id, false, null).then(()=>{
                    setLikeVal(false);
                    setRate( { ...initialState, dislike: '#F06595' });
                })
                break
            case 'meh':
                updateHistory(history[0].id, null, null).then(()=>{
                    setLikeVal(null);
                    setRate({ ...initialState, meh: '#F06595' });
                })
                break
            default:
                setRate({ ...initialState});
        }
    }

    useEffect(() => {
        function loadVids(){
            checkHis(userId).then(({data}) => {
                var check = data.data;
                if(check.length > 0){
                    getVideo(userId, 'visited').then(({data}) => {
                        setVids(data.data[0]);
                    });
                }else{
                    getVideo(userId).then(({data}) => {
                        setVids(data.data[0]);
                        var check = data.data[0];
                        addEntry(userId, check.id);
                    });
                }
            });
        }

        loadVids();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            }
            var tags = "";
            if (vids.attributes.tags.data != null) {
                var i = 1;
                var tag_list = vids.attributes.tags.data;
                tag_list.forEach(tag => {
                    tags += `${tag.attributes.name}`;
                    if(tag_list.length > i){
                        tags += ' ??? ';
                    }
                    i++;
                })
            } 
            var video_url = "";
            if(vids.attributes.cdn_url === ""){
                video_url = vids.attributes.url;
            }else{
                var base = vids.attributes.cdn_url;
                var updated = base.toString().replace("arwebstore.blob.core.windows.net", "artiswebcdn.azureedge.net");
                video_url = updated;
            }

            return (
                <div>
                    <div>
                        <FullScreen handle={handle}>
                            <ReactPlayer url={video_url}
                            className='react-player'
                            onProgress={handleProgress}
                            onEnded={handleEnd}
                            onPause={handlePause}
                            onPlay={handlePlay}
                            // onReady={handleReady}
                            controls={false}
                            playing={playing}
                            ref={vid_player}
                            />
                        </FullScreen>

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
                                {/* <button onClick={handle.enter} className="pp_btn mar-left d-none d-md-block">
                                    <FontAwesomeIcon icon={faExpand} color='#F06595' />
                                </button> */}
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
                                                <FontAwesomeIcon icon={faThumbsUp} color={(likeVal != null && likeVal)  ? rate.like = '#F06595' : rate.like} size='3x' onClick={ () => setRating({type: 'like'})} />
                                            </div>
                                            <div className="icon-box">
                                                <FontAwesomeIcon icon={faMeh} color={rate.meh} size='3x' onClick={ () => setRating({type: 'meh'})} />
                                            </div>
                                            <div className="icon-box">
                                                <FontAwesomeIcon icon={faThumbsDown} color={(likeVal != null && !likeVal)  ? rate.dislike = '#F06595' : rate.dislike} size='3x' onClick={ () => setRating({type: 'dislike'})} />
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