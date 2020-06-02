import React, { Component } from "react";

class AlphaButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.guess(this.props.value);
  }

  render() {
    return (
      <button
        value={this.props.value}
        onClick={this.handleClick}
        disabled={this.props.disabled}
      >
        {this.props.value}
      </button>
    );
  }
}

export default AlphaButton;
