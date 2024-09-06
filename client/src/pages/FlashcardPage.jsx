import React from "react";
import ReactCardFlip from "react-card-flip";
import FlashCard from "../components/QuestionList/index.jsx";


const getRandomOperation = () => {
  const operations = ['+', '-', 'x', '/'];
  const index = Math.floor(Math.random() * operations.length);
  return operations[index];
};

const randomMath = () => {
  const num1 = Math.floor(Math.random() * 13) + 1; // Avoid zero for division
  const num2 = Math.floor(Math.random() * 13) + 1; // Avoid zero for division
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
      question = `${num1 * num2} / ${num2}`; // Ensure the result is an integer
      answer = num1; // Ensure answer is an integer by setting answer to num1
      break;
    default:
      question = `${num1} x ${num2}`;
      answer = num1 * num2;
  }

  // Generate multiple-choice options
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

  const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

  return { question, answer, options: shuffledOptions, operation };
};

class FlashcardPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
      problem: randomMath(),
      selectedAnswer: null,
      correctAnswer: null,
      timeLeft: 15,
      score: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nextProblem = this.nextProblem.bind(this);
    this.timer = null;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timeLeft <= 1) {
          clearInterval(this.timer);
          this.handleSubmit();
          return { timeLeft: 0 };
        }
        return { timeLeft: prevState.timeLeft - 1 };
      });
    }, 1000);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  handleAnswerClick(answer) {
    this.setState({ selectedAnswer: answer });
  }

  handleSubmit(e) {
    if (e) e.preventDefault();
    const { problem, selectedAnswer } = this.state;
    const correctAnswer = selectedAnswer === problem.answer;

    if (correctAnswer) {
      this.setState((prevState) => ({
        correctAnswer: true,
        isFlipped: true,
        score: prevState.score + 1,
      }));
    } else {
      this.setState({
        correctAnswer: false,
        isFlipped: true,
      });
    }
    clearInterval(this.timer);
  }

  nextProblem() {
    this.setState({
      isFlipped: false,
      problem: randomMath(),
      selectedAnswer: null,
      correctAnswer: null,
      timeLeft: 15,
    });
    this.startTimer();
  }

  render() {
    const { problem, isFlipped, correctAnswer, timeLeft, selectedAnswer } = this.state;

    return (
      <div>
        <h2 className="score">Score: {this.state.score}</h2>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" containerClassName="flipCard">
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
              <button className="form" onClick={this.nextProblem}>Next Problem</button>
            </div>
          </FlashCard>
        </ReactCardFlip>
      </div>
    );
  }
}

export default FlashcardPage;















// import { useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";
// import { Modal, Button } from "react-bootstrap";
// import { useState } from "react";
// import CommentList from "../components/QuestionList";
// import CommentForm from "../components/QuizForm";
// import UpdateMonsterForm from "../components/updateMonsterForm";
// import { QUERY_Flashcard_Page } from "../utils/queries";

// const flashcardPage = () => {
//   const { flashcardId } = useParams();
//   const { loading, data } = useQuery(QUERY_flashcard_Page, {
//     variables: { flashcardId: flashcardId },
//   });

//   const flashcardPage = data?.flashcard || {};

//   const [showUpdateFlashcardModal, setShowUpdatFlashcardModal] = useState(false);

//   const handleCloseUpdateFlashcardModal = () => setShowUpdateFlashcardModal(false);
//   const handleShowUpdateFlashcardModal = () => setShowUpdateFlashcardModal(true);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <div className='my-3'>
//         <h4 className='card-header bg-dark text-light p-2 m-0'>
//           {flashcard.flashcardName}
//         </h4>
//         <div className='card-body bg-light p-2'>
//           <h5>Type:</h5>
//           <p>{flashcard.type}</p>
//           <h5>Habitat:</h5>
//           <p>{flashcard.habitat}</p>
//           <h5>Weaknesses:</h5>
//           <ul>
//             {flashcard.weaknesses.map((weakness, i) => (
//               <li key={i}>{weakness}</li>
//             ))}
//           </ul>
//           <Button onClick={handleShowUpdateflashcardModal}>Update Flashcard</Button>
//         </div>

//         <div className='my-5'>
//           <CommentList comments={flashcard.comments} flashcardId={flashcard._id} />
//         </div>
//         <div className='m-3 p-4' style={{ border: "1px dotted #1a1a1a" }}>
//           <CommentForm flashcardId={flashcard._id} />
//         </div>
//       </div>

//       <Modal
//         show={showUpdateFlashcardModal}
//         onHide={handleCloseUpdateFlashcardModal}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Update Flashcard</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {/* Pass initialFlashcardData prop here */}
//           <UpdateFlashcardForm
//             FlashcardId={flashcard._id}
//             initialFlashcardData={flashcardID}
//             handleCloseUpdateFlashcardModal={handleCloseUpdateFlashcardModal}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant='secondary' onClick={handleCloseUpdateFlashcardModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default SingleFlashcard;


