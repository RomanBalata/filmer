/* eslint-disable react/no-did-update-set-state */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { push } from 'connected-react-router';
import { IoIosArrowForward as ArrowForward } from 'react-icons/io';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFocus } from 'store/ducks/focus';

import ButtonHandler from 'components/ButtonHandler';

const genres = ['action', 'comedy', 'drama', 'documentary', 'family', 'thriller'];

class Menu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focusedIndex: 0,
    };
  }

  handleArrowUp = () => {
    const { focusedIndex } = this.state;
    const { push } = this.props;
    const newIndex = focusedIndex - 1 >= 0 ? focusedIndex - 1 : focusedIndex;
    this.changeFocus(newIndex);
    push(`/${genres[newIndex]}`);
  };

  handleArrowDown = () => {
    const { focusedIndex } = this.state;
    const { push } = this.props;
    const newIndex = focusedIndex + 1 <= genres.length - 1 ? focusedIndex + 1 : focusedIndex;
    this.changeFocus(newIndex);
    push(`/${genres[newIndex]}`);
  };

  handleEnter = () => {
    const { focusedIndex } = this.state;
    const { setFocus } = this.props;
    setFocus('movieList');
    push(`/${genres[focusedIndex]}`);
  };

  returnButtons = () => {
    return {
      ArrowUp: this.handleArrowUp,
      ArrowDown: this.handleArrowDown,
      Enter: this.handleEnter,
      Default: () => false,
    };
  };

  changeFocus = (newIndex) => {
    this.setState({
      focusedIndex: newIndex,
    });
  };

  handleClick = (category, index) => {
    const { push, setFocus } = this.props;
    push(`/${category}`);
    setFocus('menu');
    this.changeFocus(index);
  };

  render() {
    const { history, focusedScreen, pressedKey } = this.props;

    return (
      <ButtonHandler
        buttons={this.returnButtons()}
        screen="menu"
        pressedKey={pressedKey}
        focusedScreen={focusedScreen}
      >
        <CategoryList>
          {genres.map((genre, index) => (
            <ListItem
              key={genre}
              active={history?.location.pathname.includes(genre) && focusedScreen === 'menu'}
            >
              <Button
                active={history?.location.pathname.includes(genre)}
                focus={focusedScreen === 'menu'}
                onClick={() => this.handleClick(genre, index)}
              >
                {genre}
                <ArrowForward />
              </Button>
            </ListItem>
          ))}
        </CategoryList>
      </ButtonHandler>
    );
  }
}

const mapStateToProps = (state) => ({
  focusedScreen: state.focus.focusedScreen,
  pressedKey: state.focus.pressedKey,
  history: state.router,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setFocus, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const CategoryList = styled.ul``;
const ListItem = styled.li`
  font-size: 20px;
  border: ${({ active }) => (active ? '1px solid orange' : '1px solid transparent')};
  border-radius: 5px;
`;
const Button = styled.button`
  display: flex;
  align-items: baseline;
  width: 200px;
  padding: 7px;
  text-align: left;
  color: ${({ active }) => (active ? 'white' : 'gray')};
  text-transform: capitalize;
  & svg {
    font-size: 13px;
    color: orange;
    margin-left: 5px;
    opacity: ${({ active }) => (active ? 1 : 0)};
  }
`;
