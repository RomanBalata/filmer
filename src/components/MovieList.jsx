/* eslint-disable react/no-string-refs */
/* eslint-disable camelcase */
/* eslint-disable react/no-did-update-set-state */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { push } from 'connected-react-router';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFocus } from 'store/ducks/focus';
import { showMoviesByCategory } from 'store/ducks/movies';

import ButtonHandler from 'components/ButtonHandler';

const sectionPadding = 80;
const buttonMargin = 20;

class MovieList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focusedIndex: 0,
    };
    this.sectionRef = React.createRef();
  }

  componentDidUpdate() {
    this.scrollTo();
  }

  scrollTo = () => {
    const { focusedIndex } = this.state;
    return this.refs[focusedIndex]?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  };

  moviesInRow = () => {
    const sectionWidth = this.sectionRef.current.offsetWidth - sectionPadding;
    return Math.floor(sectionWidth / (this.refs[0]?.offsetWidth + buttonMargin));
  };

  handleArrowUp = () => {
    const { focusedIndex } = this.state;
    const newIndex = focusedIndex - this.moviesInRow() > 0 ? focusedIndex - this.moviesInRow() : 0;
    this.changeFocus(newIndex);
  };

  handleArrowDown = () => {
    const { focusedIndex } = this.state;
    const { moviesByCategory } = this.props;
    const newIndex =
      focusedIndex + this.moviesInRow() < moviesByCategory.length - 1
        ? focusedIndex + this.moviesInRow()
        : moviesByCategory.length - 1;
    this.changeFocus(newIndex);
  };

  handleArrowLeft = () => {
    const { focusedIndex } = this.state;
    const newIndex = focusedIndex - 1 >= 0 ? focusedIndex - 1 : focusedIndex;
    this.changeFocus(newIndex);
  };

  handleArrowRight = () => {
    const { focusedIndex } = this.state;
    const { moviesByCategory } = this.props;
    const newIndex =
      focusedIndex + 1 <= moviesByCategory.length - 1 ? focusedIndex + 1 : focusedIndex;
    this.changeFocus(newIndex);
  };

  handleEnter = () => {
    const { focusedIndex } = this.state;
    const { moviesByCategory } = this.props;
    if (moviesByCategory[focusedIndex]) {
      this.goToDescription(moviesByCategory[focusedIndex].id);
    }
  };

  handleKeyB = () => {
    const { setFocus } = this.props;
    setFocus('menu');
    this.changeFocus(0);
  };

  returnButtons = () => {
    return {
      ArrowUp: this.handleArrowUp,
      ArrowDown: this.handleArrowDown,
      ArrowLeft: this.handleArrowLeft,
      ArrowRight: this.handleArrowRight,
      Enter: this.handleEnter,
      KeyB: this.handleKeyB,
      Default: () => false,
    };
  };

  changeFocus = (newIndex) => {
    this.setState({
      focusedIndex: newIndex,
    });
  };

  goToDescription = (id) => {
    const { push, history, setFocus } = this.props;
    push(`${history.location.pathname}/${id}`);
    setFocus('movieDescription');
  };

  render() {
    const { focusedIndex } = this.state;
    const { moviesByCategory, focusedScreen, pressedKey } = this.props;
    return (
      <ButtonHandler
        buttons={this.returnButtons()}
        screen="movieList"
        pressedKey={pressedKey}
        focusedScreen={focusedScreen}
      >
        <Section ref={this.sectionRef}>
          {moviesByCategory.map((movie, index) => (
            <Button
              key={movie.id}
              ref={index}
              focus={focusedIndex === index && focusedScreen === 'movieList'}
              onClick={() => this.goToDescription(movie.id)}
            >
              <Image src={movie.poster_path} alt={movie.title} />
            </Button>
          ))}
        </Section>
      </ButtonHandler>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  moviesByCategory: showMoviesByCategory(state, ownProps),
  focusedScreen: state.focus.focusedScreen,
  pressedKey: state.focus.pressedKey,
  history: state.router,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setFocus, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 0 40px;
  color: white;
  border: ${(props) => (props.focus ? '1px solid orange' : '1px solid transparent')};
`;
const Button = styled.button`
  margin: 10px;
  transition: all 0.2s ease-in-out;
  padding: 0;
  border: ${(props) => (props.focus ? '2px solid orange' : '2px solid black')};
  transform: ${(props) => (props.focus ? 'scale(1.1);' : 'scale(1)')};

  &:hover {
    transform: scale(1.1);
    border: 2px solid orange;
  }
`;
const Image = styled.img`
  width: 170px;
  height: 240px;
  object-fit: cover;
`;
