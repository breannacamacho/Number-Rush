import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import CommentList from "../components/QuestionList";
import CommentForm from "../components/QuizForm";
import UpdateMonsterForm from "../components/updateMonsterForm";
import { QUERY_Flashcard_Page } from "../utils/queries";

const flashcardPage = () => {
  const { flashcardId } = useParams();
  const { loading, data } = useQuery(QUERY_flashcard_Page, {
    variables: { flashcardId: flashcardId },
  });

  const flashcardPage = data?.flashcard || {};

  const [showUpdateFlashcardModal, setShowUpdatFlashcardModal] = useState(false);

  const handleCloseUpdateFlashcardModal = () => setShowUpdateFlashcardModal(false);
  const handleShowUpdateFlashcardModal = () => setShowUpdateFlashcardModal(true);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='my-3'>
        <h4 className='card-header bg-dark text-light p-2 m-0'>
          {flashcard.flashcardName}
        </h4>
        <div className='card-body bg-light p-2'>
          <h5>Type:</h5>
          <p>{flashcard.type}</p>
          <h5>Habitat:</h5>
          <p>{flashcard.habitat}</p>
          <h5>Weaknesses:</h5>
          <ul>
            {flashcard.weaknesses.map((weakness, i) => (
              <li key={i}>{weakness}</li>
            ))}
          </ul>
          <Button onClick={handleShowUpdateflashcardModal}>Update Flashcard</Button>
        </div>

        <div className='my-5'>
          <CommentList comments={flashcard.comments} flashcardId={flashcard._id} />
        </div>
        <div className='m-3 p-4' style={{ border: "1px dotted #1a1a1a" }}>
          <CommentForm flashcardId={flashcard._id} />
        </div>
      </div>

      <Modal
        show={showUpdateFlashcardModal}
        onHide={handleCloseUpdateFlashcardModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Flashcard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Pass initialFlashcardData prop here */}
          <UpdateFlashcardForm
            FlashcardId={flashcard._id}
            initialFlashcardData={flashcardID}
            handleCloseUpdateFlashcardModal={handleCloseUpdateFlashcardModal}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseUpdateFlashcardModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SingleFlashcard;
