// Import Components and Plugins
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faList } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {Link} from 'react-router-dom';

// Import scss
import "../../scss/App.scss";

function Footer(props) {
    return (
        <footer>
            <div className='footer'>
                <div className='links'>
                    <Link to={`/home`} className='link'>
                        <div className='icon-box'>
                            <FontAwesomeIcon icon={faHeart} size='2x' color="#fff" />
                        </div>
                        Interest
                    </Link>
                    <Link to={`/stream`} className='link'>
                        <div className='icon-box no-bg'>
                            <svg aria-label='stream'>
                                <use xlinkHref='#film'></use>
                            </svg>
                        </div>
                        Watch Today Video
                    </Link>
                    <Link to={`/list`} className='link'>
                        <div className='icon-box'>
                            <FontAwesomeIcon icon={faList} size='2x' color="#fff" />
                        </div>
                        Playlist
                    </Link>
                </div>
            </div>

            <svg aria-hidden="true" style={{width: 0, height: 0,visibility: "hidden",display: "none"}}
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <symbol id='film' viewBox="0 0 548 550.99">
                    <switch>
                        <g>
                            <path className="st0" d="M464.31,456H82.82c-7.76,0-14.06-6.29-14.06-14.06V128.06c0-7.76,6.29-14.06,14.06-14.06h381.49
                                c7.76,0,14.06,6.29,14.06,14.06v313.89C478.37,449.71,472.07,456,464.31,456z"/>
                            <g>
                                <g>
                                    <rect x="92.44" y="129.44" className="st1" width="40.44" height="21.78"/>
                                    <rect x="156.98" y="129.44" className="st1" width="40.44" height="21.78"/>
                                    <rect x="221.51" y="129.44" className="st1" width="40.44" height="21.78"/>
                                    <rect x="286.04" y="129.44" className="st1" width="40.44" height="21.78"/>
                                    <rect x="350.58" y="129.44" className="st1" width="40.44" height="21.78"/>
                                    <rect x="415.11" y="129.44" className="st1" width="40.44" height="21.78"/>
                                </g>
                                <g>
                                    <rect x="92.44" y="402.77" className="st1" width="40.44" height="21.78"/>
                                    <rect x="156.98" y="402.77" className="st1" width="40.44" height="21.78"/>
                                    <rect x="221.51" y="402.77" className="st1" width="40.44" height="21.78"/>
                                    <rect x="286.04" y="402.77" className="st1" width="40.44" height="21.78"/>
                                    <rect x="350.58" y="402.77" className="st1" width="40.44" height="21.78"/>
                                    <rect x="415.11" y="402.77" className="st1" width="40.44" height="21.78"/>
                                </g>
                                <path className="st2" d="M221.51,208.55"/>
                                <path className="st1" d="M315.1,262.1l-67.8-39.15c-11.46-6.62-25.79,1.65-25.79,14.89v78.29c0,13.23,14.33,21.51,25.79,14.89
                                    l67.8-39.15C326.56,285.26,326.56,268.72,315.1,262.1z"/>
                            </g>
                            <circle className="st3" cx="274" cy="276.99" r="274"/>
                        </g>
                    </switch>
                </symbol>
                <symbol id='med-mus' viewBox="0 0 100 100">
                    <g>
                        <path className="st0" d="M0.83,50.32c0-27.44,22.24-49.68,49.68-49.68s49.68,22.24,49.68,49.68S77.95,100,50.51,100
                            S0.83,77.76,0.83,50.32"/>
                        <path className="st1" d="M1.25,56.72c0.79,4.77,2.18,9.6,4,14.1c2.58,5.69,6.2,10.81,10.62,15.11c8.75,2.52,17.32,3.81,25.52,3.81
                            h0.08c10.47,0,20.59-2.05,30.08-6.1l0.12-0.05l0.13-0.01c2.44-0.26,4.19-1.1,5.2-2.5c1.15-1.57,1.4-3.89,0.74-6.91l-0.02-0.09
                            v-0.09c-0.01-26.08-4.31-41.67-16.44-59.6c-1.1-1.64-3.01-2.65-4.99-2.65c-0.1,0-0.19,0-0.29,0.01c-4.18,0.2-12.02,2.4-15.2,3.34
                            c-1.69,0.5-3.04,1.71-3.7,3.34c-0.55,1.35-0.57,2.83-0.06,4.19l3.25,8.66c0.29,0.8,0.9,1.44,1.69,1.79
                            c0.41,0.18,0.84,0.27,1.28,0.27c0.41,0,0.81-0.08,1.19-0.23l5.56-2.28c1.47-0.6,2.26-2.22,1.84-3.76l-0.54-2.02l4.6,2.65L56,28.08
                            c0.92,4.83,0.16,9.51-0.58,14.04l-0.02,0.11c-0.48,2.92-1.03,6.22-1,9.39c0.02,1.67,0.25,3.45,0.71,5.28l0.62,2.49l-2-1.61
                            c-2.94-2.37-6.52-3.57-10.63-3.57c-4.5,0-8.79,1.67-12.09,4.7l-0.85,0.78l-0.51-1.03c-2.66-5.33-8.39-1.8-14.93-1.8
                            c-5.26,0-8.82-2.3-11.94,1.48"/>
                        <path className="st2" d="M52.63,56.35c-0.3,0.11-0.63,0.06-0.89-0.13c-2.75-2.05-4.99-2.01-8.91-2.01L1.94,55.86
                            c-0.57,0.02-0.98,0.54-0.88,1.1c0.83,4.52,2.24,9.71,3.92,13.85c1.75,3.86,3.97,7.45,6.6,10.71c0.12,0.15,0.28,0.25,0.46,0.31
                            c8.12,2.41,19.56,4.23,26.63,4.16c11.95-0.11,29.27-5,29.27-5l0.13-0.01c2.44-0.26,4.19-1.1,5.2-2.5c1.15-1.57,1.4-3.89,0.74-6.91
                            L74,71.48v-0.09C73.99,45.55,69.77,30,57.88,12.28c-0.13-0.2-0.33-0.34-0.56-0.39c-0.42-0.1-0.85-0.15-1.29-0.15
                            c-0.1,0-0.19,0-0.29,0.01c-4.18,0.2-12.02,2.4-15.2,3.34c-1.69,0.5-3.04,1.71-3.7,3.34c-0.55,1.35-0.57,2.83-0.06,4.19l2.76,7.35
                            c0.18,0.48,0.72,0.74,1.19,0.55c0,0,0.01,0,0.01,0l5.56-2.28c1.47-0.6,2.26-2.22,1.84-3.76l-0.31-1.16
                            c-0.13-0.48,0.14-0.98,0.62-1.13l0.75-0.24c0.2-0.06,0.42-0.06,0.61,0.02l4.39,1.68c1.42,0.54,2.33,1.94,2.24,3.45
                            c0,0.07,0,0.14,0.01,0.21c0.21,1.22,0.05,2.32-0.32,3.35c-0.04,0.12-0.06,0.25-0.05,0.37c0.24,3.79-0.35,7.49-0.94,11.09
                            l-0.02,0.11c-0.48,2.92-1.03,6.22-1,9.39c0.01,1.46-0.79,2.32-0.69,3.74c0.03,0.4-0.22,0.77-0.6,0.92L52.63,56.35z"/>
                        <path className="st3" d="M51.23,25.2l1.34,0.77c0.78,0.45,1.59,0.84,2.42,1.18c0.56,0.22,1.1,0.45,1.11,0.49
                            c0.13,0.74,0.12,1.43,0.01,2.09c-0.19,1.15-0.33,2.32-0.33,3.49c-0.01,3.15-0.5,6.23-0.99,9.24l-0.02,0.11
                            c-0.48,2.92-1.03,6.22-1,9.39l-0.06,4.66h0c-1.32-0.03-2.61-0.36-3.78-0.96c-2.17-1.13-4.25-1.1-7.47-1.1L1.57,56.2"/>
                        <path className="st3" d="M52.47,56.61"/>
                        <path className="st3" d="M51.31,25.44"/>
                        <path className="st3" d="M13.79,85.31c20.32,6.31,39.75,6.05,57.89-1.73c5.34-0.51,7.33-3.7,6.05-9.5c0-25.07-3.81-41.04-16.44-59.69
                            c-1.18-1.74-3.19-2.74-5.29-2.64c-4.01,0.19-11.28,2.18-15.2,3.33c-1.68,0.49-3.04,1.72-3.7,3.34c-0.55,1.34-0.57,2.83-0.06,4.19
                            l3.25,8.66c0.63,1.67,2.51,2.5,4.17,1.82l5.57-2.27c1.57-0.64,2.36-2.41,1.78-4.01l-1.03-2.87c-0.4-1.1-1.56-1.72-2.7-1.43
                            l-2.32,0.59"/>
                        <path className="st4" d="M49.35,60.78"/>
                        <path className="st4" d="M26.23,66.22c1.49-0.76,3.18-1.19,4.98-1.19c2.46,0,4.54,0.7,6.26,1.99"/>
                    </g>
                </symbol>
                <symbol id='lg-mus' viewBox="0 0 100 100">
                    <g >
                        <path className="st0" d="M0.22,49.89C0.22,22.34,22.56,0,50.11,0S100,22.34,100,49.89S77.66,99.78,50.11,99.78S0.22,77.44,0.22,49.89"
                            />
                        <path className="st1" d="M0.65,56.32c0.8,4.79,2.19,9.64,4.02,14.16c2.59,5.71,6.23,10.85,10.67,15.17
                            c8.78,2.53,17.39,3.83,25.62,3.83h0.08c10.52,0,20.68-2.06,30.21-6.13l0.12-0.05l0.13-0.01c2.45-0.26,4.2-1.1,5.22-2.51
                            c1.15-1.57,1.4-3.91,0.75-6.94l-0.02-0.09v-0.09c-0.01-26.19-4.33-41.85-16.51-59.84c-1.1-1.64-3.02-2.66-5.01-2.66
                            c-0.1,0-0.2,0-0.3,0.01c-4.19,0.2-12.07,2.41-15.26,3.35c-1.7,0.5-3.05,1.72-3.72,3.36c-0.55,1.35-0.57,2.85-0.06,4.21l3.26,8.7
                            c0.3,0.81,0.9,1.44,1.7,1.79c0.41,0.18,0.85,0.27,1.29,0.27c0.41,0,0.81-0.08,1.2-0.24l5.59-2.29c1.47-0.6,2.27-2.23,1.85-3.78
                            l-0.55-2.03l4.62,2.66l0.07,0.39c0.92,4.85,0.16,9.55-0.59,14.1l-0.02,0.11c-0.49,2.93-1.04,6.25-1,9.43
                            c0.02,1.68,0.25,3.46,0.71,5.3l0.62,2.5l-2.01-1.61c-2.95-2.38-6.55-3.58-10.67-3.58c-4.52,0-8.83,1.68-12.14,4.72l-0.85,0.78
                            l-0.51-1.03c-2.67-5.35-8.63-8.8-15.2-8.8c-5.28,0-10.29,2.26-13.42,6.05"/>
                        <path className="st2" d="M0.66,56.38c0.8,4.77,2.19,9.6,4.01,14.1c1.8,3.96,4.09,7.65,6.81,10.98c8.17,2.46,19.84,4.33,27.02,4.26
                            c12-0.11,29.4-5.02,29.4-5.02l0.13-0.01c2.45-0.26,4.2-1.1,5.22-2.51c1.15-1.57,1.4-3.91,0.75-6.94l-0.02-0.09v-0.09
                            c-0.01-26.09-4.3-41.74-16.39-59.65c-0.54-0.16-1.1-0.25-1.66-0.25c-0.1,0-0.2,0-0.3,0.01c-4.19,0.2-12.07,2.41-15.26,3.35
                            c-1.7,0.5-3.05,1.72-3.72,3.36c-0.55,1.35-0.57,2.85-0.06,4.21l3.05,8.14c0.32-0.03,0.63-0.09,0.93-0.21l5.59-2.29
                            c1.47-0.6,2.27-2.23,1.85-3.78l-0.55-2.03l1.92-0.61l4.71,1.8c1.46,0.56,2.38,2.01,2.25,3.57c0.25,1.34,0.05,2.53-0.37,3.66
                            c0.27,3.88-0.33,7.66-0.93,11.33l-0.02,0.11c-0.49,2.93-1.04,6.25-1,9.43c0.02,1.68,0.25,3.46,0.71,5.3l0.62,2.5l-2.01-1.61
                            c-2.95-2.38-6.55-3.58-10.67-3.58c-4.52,0-8.83,1.68-12.14,4.72l-0.85,0.78l-0.51-1.03c-2.67-5.35-8.63-8.8-15.2-8.8
                            c-5.28,0-10.29,2.26-13.42,6.05"/>
                        <path className="st3" d="M13.24,85.03c20.4,6.33,39.91,6.07,58.13-1.74c5.37-0.51,7.36-3.72,6.07-9.54c0-25.17-3.83-41.21-16.51-59.93
                            c-1.18-1.75-3.2-2.75-5.31-2.65c-4.02,0.19-11.33,2.19-15.26,3.35c-1.69,0.5-3.05,1.73-3.72,3.36c-0.55,1.34-0.57,2.85-0.06,4.21
                            l3.26,8.7c0.63,1.68,2.52,2.51,4.19,1.83l5.59-2.28c1.58-0.65,2.37-2.42,1.79-4.03l-1.04-2.88c-0.4-1.1-1.57-1.73-2.71-1.44
                            l-2.33,0.59"/>
                        <path className="st3" d="M50.54,24.29l5,2.87c1.74,8.37-1.62,16.17-1.53,24.03c0.07,6.49,3.25,12.52,5.21,14.75"/>
                        <path className="st3" d="M29.72,59.26c3.21-3.36,7.82-5.47,12.94-5.47c5.42,0,9.73,2.05,12.96,5.75"/>
                        <path className="st3" d="M0.51,55.54c3.02-3.69,7.92-6.08,13.45-6.08c9.18,0,16.62,6.6,16.62,14.75"/>
                        <path className="st4" d="M37.67,59.58c1.49-0.76,3.19-1.19,5-1.19c2.47,0,4.56,0.7,6.28,2"/>
                        <path className="st4" d="M9.47,55.56c1.49-0.57,3.22-0.9,5.07-0.9c3.73,0,6.98,1.33,8.69,3.31"/>
                    </g>
                </symbol>
                <symbol id='sm-mus' viewBox="0 0 100 100">
                    <g>
                        <path className="st0" d="M0.77,49.61C0.77,22.21,22.98,0,50.39,0S100,22.21,100,49.61S77.79,99.23,50.39,99.23S0.77,77.02,0.77,49.61"
                            />
                        <path className="st1" d="M54.15,24.92"/>
                        <path className="st1" d="M27.46,61.19"/>
                        <path className="st1" d="M63.77,48.13"/>
                        <path className="st2" d="M64.05,45.85"/>
                        <path className="st1" d="M56.17,26.61"/>
                        <path className="st3" d="M78.9,73.25l-0.02-0.09v-0.09c-0.01-25.81-4.23-41.33-16.09-59.03c-0.13-0.2-0.34-0.34-0.57-0.39
                            c-0.42-0.1-0.85-0.15-1.28-0.15c-0.1,0-0.19,0-0.29,0.01c-4.17,0.2-12,2.4-15.18,3.33c-1.69,0.49-3.04,1.71-3.7,3.34
                            c-0.55,1.34-0.57,2.83-0.06,4.19l2.76,7.36c0.18,0.48,0.72,0.72,1.2,0.53l5.56-2.28c1.47-0.6,2.26-2.21,1.84-3.76l-0.31-1.15
                            c-0.13-0.48,0.14-0.98,0.62-1.13l0.75-0.24c0.2-0.06,0.42-0.06,0.61,0.02l4.38,1.67c1.42,0.54,1.13,1.74,1.05,3.25l0.88,3.76
                            c0,0,0,0,0,0.01c1.64,4.76,0.86,11.3,1.86,16.69l0.24,10.66c-5.88,4.96-27.76,4.49-35,1.87L6.92,57.56
                            c-0.35,0.01-0.65,0.22-0.79,0.51c-0.17,0.17-0.28,0.42-0.28,0.73c0.04,3.43,0.72,6.8,1.41,10.15c0.34,1.66,0.69,3.31,0.95,4.98
                            c0.1,0.62,0.2,1.22,0.39,1.75c0.01,0.07,0.02,0.15,0.04,0.22c0.01,0.24,0.09,0.49,0.23,0.69c0.04,0.13,0.09,0.25,0.16,0.36
                            c0.15,0.25,0.36,0.43,0.62,0.53c0.1,0.08,0.21,0.14,0.34,0.18c0.09,0.07,0.2,0.13,0.32,0.17c3.81,1.37,7.61,2.75,11.43,4.11
                            c3.55,1.27,7.22,2.42,11.03,2.26c1.45,0.3,2.91,0.47,4.42,0.46c11.94-0.11,35.66-2.02,35.66-2.02l0.13-0.01
                            c2.43-0.26,4.18-1.1,5.19-2.49C79.31,78.59,79.56,76.26,78.9,73.25z"/>
                        <path className="st4" d="M38.76,79.23c-1.48,0.76-3.18,1.19-4.97,1.19c-2.46,0-4.54-0.7-6.25-1.99"/>
                        <path className="st3" d="M71.49,27.49c-1.3-4.78-3.57-9.2-6.65-13.08c-0.37-0.46-1.15-0.38-1.53,0c-0.46,0.45-0.36,1.07,0,1.53
                            c2.84,3.58,4.9,7.72,6.09,12.12C69.76,29.4,71.85,28.83,71.49,27.49z"/>
                        <path className="st2" d="M60.99,29.95C60.99,29.95,60.99,29.96,60.99,29.95c1.64,4.77,0.86,11.31,1.86,16.7l0.24,10.66
                            c-5.88,4.96-27.76,4.49-35,1.87L6.87,55.13c-0.57,0.02-0.98,0.54-0.88,1.1c0.83,4.51,2.24,9.69,3.92,13.83l0,0
                            c3.57,3.56,7.83,6.35,12.52,8.2c5.12,2.03,9.69,4.03,14.69,3.98c11.94-0.11,35.66-2.02,35.66-2.02l0.13-0.01
                            c2.43-0.26,4.18-1.1,5.19-2.49c1.15-1.57,1.4-3.89,0.74-6.9l-0.02-0.09v-0.09C78.82,44.83,74.6,29.3,62.74,11.61
                            c-0.13-0.2-0.34-0.34-0.57-0.39c-0.42-0.1-0.85-0.15-1.28-0.15c-0.1,0-0.19,0-0.29,0.01c-4.17,0.2-12,2.4-15.18,3.33
                            c-1.69,0.49-3.04,1.71-3.7,3.34c-0.55,1.34-0.57,2.83-0.06,4.19l2.76,7.36c0.18,0.48,0.72,0.72,1.2,0.53l0,0l5.56-2.28
                            c1.47-0.6,2.26-2.21,1.84-3.76l-0.31-1.15c-0.13-0.48,0.14-0.98,0.62-1.13l0.75-0.24c0.2-0.06,0.42-0.06,0.61,0.02l4.38,1.67
                            c1.42,0.54,1.13,1.74,1.05,3.25L60.99,29.95z"/>
                        <path className="st4" d="M38.68,79.23c-1.48,0.76-3.18,1.19-4.97,1.19c-2.46,0-4.54-0.7-6.25-1.99"/>
                        <path className="st2" d="M44.48,79.66c-2.32-0.09-4.51,0.66-6.74,1.17c-2.35,0.53-4.55,0.34-6.86-0.31c-2.22-0.63-4.38-1.44-6.61-2.02
                            c-0.08-0.02-0.16-0.04-0.24-0.06c-0.01-0.04-0.02-0.08-0.04-0.12c-1.89-4.53-4.26-8.83-7.14-12.81c-1.44-1.99-2.99-3.9-4.65-5.7
                            c-0.83-0.9-1.68-1.78-2.56-2.62c-0.66-0.64-1.35-1.32-2.22-1.6c-0.17-0.26-0.46-0.44-0.86-0.44c-1.25,0.01-2.51-0.06-3.75-0.24
                            c-0.57-0.08-1.17,0.13-1.33,0.76c-0.31,1.21,0.06,2.32,0.45,3.46c0.4,1.17,0.8,2.34,1.21,3.51c0.81,2.34,1.63,4.67,2.45,7.01
                            c0.73,2.05,1.28,4.33,3.12,5.68c0.88,0.65,1.92,1.05,2.93,1.45c1.08,0.43,2.18,0.82,3.29,1.17c0.97,0.3,1.95,0.58,2.94,0.81
                            c0.06,0.03,0.11,0.05,0.17,0.08c1.12,0.49,2.28,0.87,3.46,1.19c2.41,0.66,4.79,1.31,7.17,2.08c2.4,0.78,4.91,1.45,7.45,1.18
                            c2.82-0.29,5.5-1.58,8.36-1.46C45.87,81.88,45.87,79.71,44.48,79.66z M7.92,58.55c0.47,0.45,0.93,0.91,1.39,1.38
                            c1.76,1.8,3.41,3.7,4.93,5.7c2.72,3.6,5.06,7.5,6.93,11.62c-0.4-0.07-0.8-0.15-1.2-0.23c0.28-0.52,0.14-1.28-0.62-1.56
                            c-1.65-0.63-3.31-1.25-4.96-1.88c-0.82-0.49-1.6-1.05-2.32-1.68c-0.4-0.95-1.15-1.75-2.1-2.18c-0.01-0.02-0.02-0.05-0.03-0.07
                            c-0.27-0.68-0.55-1.35-0.82-2.03c0.65,0.17,1.48-0.26,1.42-1.03c-0.14-1.67-0.7-3.2-1.5-4.66c-0.38-0.71-0.81-1.39-1.23-2.06
                            c-0.14-0.22-0.32-0.48-0.48-0.75c0.05-0.4,0.02-0.8-0.07-1.2C7.5,58.1,7.72,58.36,7.92,58.55z"/>
                        <path className="st2" d="M8.29,72.39c-0.9-1.7-1.78-3.43-2.61-5.17c-1.67-3.5-3.08-7.2-3.34-11.1c0-0.04-0.01-0.07-0.01-0.1
                            c-0.1-0.68-1.14-0.51-1.05,0.17c1.06,8.19,4.12,15.75,8.67,22.18c0.05,0.08,0.13,0.14,0.21,0.18"/>
                        <path className="st1" d="M9.26,77.72l11.38,4.19c5.35,2.11,9.7,3.15,15.22,2.96c12.46-0.44,37.26-2.11,37.26-2.11l0.13-0.01
                            c2.54-0.27,4.37-1.14,5.43-2.6c1.2-1.63,1.46-4.05,0.77-7.19l-0.02-0.09v-0.1c-0.01-26.88-4.42-43.05-16.81-61.48
                            c-0.14-0.21-0.35-0.36-0.59-0.41c-0.44-0.1-0.89-0.16-1.34-0.16c-0.1,0-0.2,0-0.31,0.01c-4.36,0.21-12.54,2.5-15.85,3.47
                            c-1.76,0.52-3.17,1.78-3.86,3.48c-0.57,1.4-0.6,2.95-0.06,4.36l3.28,7.7c0.19,0.5,1.29,2.92,1.79,2.73l6.87-2.74
                            c0,0,2.12-1.2,0.83-4.34c-0.07-0.35-0.35-1.6,1.94-1.49c2.3,0.88,3.93,1.09,4.32,2.72l0.84,4.09c0,0,0.67,12.6,1.35,15.62
                            c0.67,3.02,0.24,10.66,0.24,10.66s-4.69,3.72-15.29,3.72s-18.49-0.99-25.9-3.03c-7.42-2.04-15.92-2.93-15.92-2.93L0,54.42"/>
                    </g>
                </symbol>
            </svg>
        </footer>
    );
}

export default Footer;