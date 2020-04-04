import React, { PureComponent } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'store/configureStore';
import styled from 'styled-components';
import Routes from 'routes';
import Menu from 'components/Menu';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMoviesRequest } from 'store/ducks/movies';
import { setKey, setFocus } from 'store/ducks/focus';

const AllowUseButton = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'KeyB', 'Enter'];
class App extends PureComponent {
  constructor() {
    super();
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }

  componentDidMount() {
    const { getMoviesRequest, setFocus, history } = this.props;
    getMoviesRequest();
    window.addEventListener('keydown', this.onKeyPress);
    window.addEventListener('keyup', this.onKeyPressed);

    const path = history.location.pathname.split('/').filter(Boolean);
    if (path.length === 2) {
      setFocus('movieDescription');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyPress);
    window.removeEventListener('keyup', this.onKeyPressed);
  }

  onKeyPressed(event) {
    const { setKey } = this.props;
    if (!AllowUseButton.includes(event.code)) {
      return;
    }
    setKey(null);
  }

  onKeyPress(event) {
    const { setKey } = this.props;
    if (!AllowUseButton.includes(event.code)) {
      return;
    }
    if (['ArrowUp', 'ArrowDown', 'Space', 'Enter'].includes(event.code)) {
      event.preventDefault();
    }
    setKey(event.code);
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <Wrapper>
          <Header>
            <Title>Filmer</Title>
          </Header>
          <Main>
            <Menu />
            <Routes />
          </Main>
        </Wrapper>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  history: state.router,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getMoviesRequest, setKey, setFocus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

const Wrapper = styled.div`
  padding: 60px;
`;

const Header = styled.header``;
const Title = styled.h1`
  padding-left: 7px;
  text-transform: uppercase;
  font-size: 22px;
`;

const Main = styled.main`
  display: flex;
  margin: 20px 0;
  height: 100vh;
  background-color: black;
`;
