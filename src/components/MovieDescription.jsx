/* eslint-disable react/no-did-update-set-state */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { push } from 'connected-react-router';
import { FaPlay, FaEye } from 'react-icons/fa';
import { MdPlaylistAdd as Add } from 'react-icons/md';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFocus } from 'store/ducks/focus';
import { showMovieById } from 'store/ducks/movies';

import ButtonHandler from 'components/ButtonHandler';

const buttons = [
  { title: 'Play', icon: <FaPlay /> },
  { title: 'Trailer', icon: <FaEye /> },
  { title: 'Add', icon: <Add /> },
];

class MovieDescription extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focusedIndex: 0,
    };
  }

  handleArrowLeft = () => {
    const { focusedIndex } = this.state;
    const newIndex = focusedIndex - 1 >= 0 ? focusedIndex - 1 : focusedIndex;
    this.changeFocus(newIndex);
  };

  handleArrowRight = () => {
    const { focusedIndex } = this.state;
    const newIndex = focusedIndex + 1 <= buttons.length - 1 ? focusedIndex + 1 : focusedIndex;
    this.changeFocus(newIndex);
  };

  handleKeyB = () => {
    const { setFocus, match, push } = this.props;
    push(`/${match.params.category}`);
    setFocus('movieList');
  };

  returnButtons = () => {
    return {
      ArrowLeft: this.handleArrowLeft,
      ArrowRight: this.handleArrowRight,
      KeyB: this.handleKeyB,
      Default: () => false,
    };
  };

  changeFocus = (newIndex) => {
    this.setState({
      focusedIndex: newIndex,
    });
  };

  render() {
    const { focusedIndex } = this.state;
    const { movie, focusedScreen, pressedKey } = this.props;
    if (movie.length <= 0) {
      return null;
    }
    return (
      <ButtonHandler
        buttons={this.returnButtons()}
        screen="movieDescription"
        pressedKey={pressedKey}
        focusedScreen={focusedScreen}
      >
        <Section>
          <Title>{movie[0].title}</Title>
          <Info>
            <Details>
              <Row>
                <Element>
                  <ShadowTitle>Vote Average</ShadowTitle>
                  <p>{movie[0].vote_average}</p>
                </Element>
                <Element>
                  <ShadowTitle>Language</ShadowTitle>
                  <p>{movie[0].original_language}</p>
                </Element>
                <Element>
                  <ShadowTitle>Original Title</ShadowTitle>
                  <p>{movie[0].original_title}</p>
                </Element>
              </Row>
              <Image src={movie[0].poster_path} alt={movie[0].title} />
              <ButtonWrapper>
                {buttons.map((item, index) => (
                  <Button
                    key={item.title}
                    focus={focusedIndex === index && focusedScreen === 'movieDescription'}
                  >
                    {item.icon} {item.title}
                  </Button>
                ))}
              </ButtonWrapper>
            </Details>
            <Overview>{movie[0].overview}</Overview>
          </Info>
        </Section>
      </ButtonHandler>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  movie: showMovieById(state, ownProps),
  focusedScreen: state.focus.focusedScreen,
  pressedKey: state.focus.pressedKey,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setFocus, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MovieDescription);

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  flex: 1;
`;
const Title = styled.h2`
  font-size: 26px;
`;
const Details = styled.div`
  margin-right: 20px;
`;
const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const Element = styled.div`
  width: 150px;
  margin-right: 30px;
  padding: 10px 0;
  border-top: 2px solid #484848;
`;
const Info = styled.div`
  display: flex;
  margin: 25px 0;
`;
const ShadowTitle = styled.h3`
  font-size: 14px;
  line-height: 1.5;
  color: #484848;
  text-transform: uppercase;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 75px;
  margin: 15px 0;
  font-size: 20px;
  color: #fff;
  background-color: ${({ focus }) => (focus ? 'orange' : 'transparent')};
  border: ${({ focus }) => (focus ? '2px solid orange' : '2px solid transparent')};
  border-radius: 7px;
  &:hover {
    background-color: orange;
  }
  & svg {
    margin-right: 10px;
  }
`;
const Image = styled.img`
  width: 550px;
  height: 350px;
  object-fit: cover;
`;
const Overview = styled.p`
  color: #a19f9f;
  line-height: 1.5;
`;
