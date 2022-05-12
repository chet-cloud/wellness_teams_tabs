// Import Components and Plugins
import * as React from 'react';
import { Container,
    Row,
    Col
} from 'react-bootstrap';

// Import scss
import "../scss/App.scss";

// Import images
import logo from '../img/wellness-logo.png';
import welcome from '../img/welcoming-icon.png';

function LoadingMessage() {
    return (
        <Container className='welcoming'>
            <Row>
                <Col className="col-12 d-flex align-items-center flex-column">
                    <img className="logo" src={logo} alt="Logo"/>
                    <h1 className='text-center'>
                        Wellness <br /><span className="lighter">by Artis</span>
                    </h1>
                </Col>
                <Col className='col-12 d-flex justify-content-center'>
                    <div className='welcome-box'>
                        <img src={welcome} alt='healthy wellness icon' />
                        <h2>Ready to feel your best?</h2>
                        <p>Watch this Wellness<br />videos curated just for you</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

function withStartScreen(NewComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
            };
        };

        async componentDidMount() {
            setTimeout(() => {
                this.setState({
                    loading: false,
                });
            }, 2500);
        }

        render() {
            if (this.state.loading) return LoadingMessage();

            return <NewComponent {...this.props} />;
        }
    }
}

export default withStartScreen;