import React from "react";
import ReactCardFlip from "react-card-flip";
import FlashCard from "../components/QuestionList/index.jsx";

const getRandomOperation = () => {
  const operations = ['+', '-', 'x', '/'];
  return operations[Math.floor(Math.random() * operations.length)];
};

const randomMath = () => {
  const num1 = Math.floor(Math.random() * 13) + 1;
  const num2 = Math.floor(Math.random() * 13) + 1;
  const operation = getRandomOperation();
  
  let question, answer;
  switch (operation) {
    case '+':
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;
    case '-':
      question = `${num1} - ${num2}`;
      answer = num1 - num2;
      break;
    case 'x':
      question = `${num1} x ${num2}`;
      answer = num1 * num2;
      break;
    case '/':
      question = `${num1 * num2} / ${num2}`;
      answer = num1;
      break;
    default:
      question = `${num1} x ${num2}`;
      answer = num1 * num2;
  }

  const options = new Set();
  options.add(answer);
  while (options.size < 4) {
    let wrongAnswer;
    switch (operation) {
      case '+':
        wrongAnswer = Math.floor(Math.random() * 26);
        break;
      case '-':
        wrongAnswer = Math.floor(Math.random() * 26);
        break;
      case 'x':
        wrongAnswer = Math.floor(Math.random() * 169);
        break;
      case '/':
        wrongAnswer = Math.floor(Math.random() * 13);
        break;
      default:
        wrongAnswer = Math.floor(Math.random() * 169);
    }
    if (wrongAnswer !== answer) options.add(wrongAnswer);
  }

  return {
    question,
    answer,
    options: Array.from(options).sort(() => Math.random() - 0.5),
    operation
  };
};

class FlashcardPage extends React.Component {
  state = {
    isFlipped: false,
    problem: randomMath(),
    selectedAnswer: null,
    correctAnswer: null,
    timeLeft: 15,
    score: 0
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timeLeft <= 1) {
          clearInterval(this.timer);
          this.handleSubmit();
          return { timeLeft: 0 };
        }
        return { timeLeft: prevState.timeLeft - 1 };
      });
    }, 1000);
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  };

  handleAnswerClick = (answer) => {
    this.setState({ selectedAnswer: answer });
  };

  handleSubmit = (e) => {
    if (e) e.preventDefault();
    const { problem, selectedAnswer } = this.state;
    const isCorrect = selectedAnswer === problem.answer;

    this.setState(prevState => ({
      correctAnswer: isCorrect,
      isFlipped: true,
      score: isCorrect ? prevState.score + 1 : prevState.score
    }));

    clearInterval(this.timer);
  };

  nextProblem = () => {
    this.setState({
      isFlipped: false,
      problem: randomMath(),
      selectedAnswer: null,
      correctAnswer: null,
      timeLeft: 15
    });
    this.startTimer();
  };

  render() {
    const { problem, isFlipped, correctAnswer, timeLeft, selectedAnswer } = this.state;

    return (
      <div>
        <h2 className="score">Score: {this.state.score}</h2>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          <FlashCard key="front">
            <div>
              <p className="problem">{problem.question}</p>
              <form className="form" onSubmit={this.handleSubmit}>
                <div className="options">
                  {problem.options.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      className={selectedAnswer === option ? 'selected' : ''}
                      onClick={() => this.handleAnswerClick(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <button type="submit">Submit</button>
              </form>
              <p className="timer">Time left: {timeLeft} seconds</p>
            </div>
          </FlashCard>
          <FlashCard key="back">
            <div>
              {correctAnswer !== null && (
                <p className="problem">
                  {correctAnswer ? "Correct!" : `Incorrect! The correct answer is ${problem.answer}`}
                </p>
              )}
              <button onClick={this.nextProblem}>Next Problem</button>
            </div>
          </FlashCard>
        </ReactCardFlip>
      </div>
    );
  }
}

export default FlashcardPage;
