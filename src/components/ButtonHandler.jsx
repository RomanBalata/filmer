import React, { PureComponent } from 'react';

class ButtonHandler extends PureComponent {
  componentDidUpdate(oldProps) {
    const { focusedScreen, pressedKey, buttons, screen } = this.props;
    if (focusedScreen !== screen || oldProps.pressedKey === pressedKey || !pressedKey) {
      return;
    }
    (buttons[pressedKey] || buttons.Default)();
  }

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default ButtonHandler;
