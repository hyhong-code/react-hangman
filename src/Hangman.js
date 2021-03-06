import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./words";
import AlphaButton from "./AlphaButton";
import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(ltr) {
    // let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .map((ltr) => (
        <AlphaButton
          value={ltr}
          guess={this.handleGuess}
          disabled={this.state.guessed.has(ltr)}
          key={ltr}
        />
      ));
  }

  handleClick() {
    this.setState((ps) => ({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    }));
  }

  /** render: render game */
  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={`${this.state.nWrong}/${this.props.maxWrong} guesses`}
        />
        <h3>Number wrong: {this.state.nWrong}</h3>
        <p className="Hangman-word">
          {!gameOver ? this.guessedWord() : this.state.answer}
        </p>
        <p className="Hangman-btns">
          {gameOver
            ? `You Lose!`
            : this.guessedWord().join("") === this.state.answer
            ? `You Win!`
            : this.generateButtons()}
        </p>
        <button id="reset" onClick={this.handleClick}>
          Restart?
        </button>
      </div>
    );
  }
}

export default Hangman;
