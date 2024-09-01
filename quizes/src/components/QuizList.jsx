import { useState } from "react";
import "../components/QuizAnalysis.css";

const quizzesData = [
  { id: 1, name: "Quiz 1", date: "01 Sep, 2023", impressions: "345" },
  { id: 2, name: "Quiz 2", date: "04 Sep, 2023", impressions: "667" },
  { id: 3, name: "Quiz 3", date: "06 Sep, 2023", impressions: "1.6K" },
  { id: 4, name: "Quiz 4", date: "09 Sep, 2023", impressions: "789" },
  { id: 5, name: "Quiz 5", date: "11 Sep, 2023", impressions: "995" },
  { id: 6, name: "Quiz 6", date: "13 Sep, 2023", impressions: "2.5K" },
  { id: 7, name: "Quiz 7", date: "14 Sep, 2023", impressions: "231" },
  { id: 8, name: "Quiz 8", date: "17 Sep, 2023", impressions: "1.3K" },
  { id: 9, name: "Quiz 1", date: "01 Sep, 2023", impressions: "345" },
  { id: 10, name: "Quiz 2", date: "04 Sep, 2023", impressions: "667" },
  { id: 11, name: "Quiz 3", date: "06 Sep, 2023", impressions: "1.6K" },
  { id: 12, name: "Quiz 4", date: "09 Sep, 2023", impressions: "789" },
  { id: 13, name: "Quiz 5", date: "11 Sep, 2023", impressions: "995" },
  { id: 14, name: "Quiz 6", date: "13 Sep, 2023", impressions: "2.5K" },
  { id: 15, name: "Quiz 7", date: "14 Sep, 2023", impressions: "231" },
  { id: 16, name: "Quiz 8", date: "17 Sep, 2023", impressions: "1.3K" },
];

const QuizAnalysis = () => {
  const [quizzes, setQuizzes] = useState(quizzesData);
  const [showModal, setShowModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [showToaster, setShowToaster] = useState(false);

  const handleDeleteClick = (quizId) => {
    setQuizToDelete(quizId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== quizToDelete));
    setShowModal(false);
    setQuizToDelete(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setQuizToDelete(null);
  };

  const handleShareClick = (quizId) => {
    const quizLink = `https://example.com/quiz/${quizId}`; // Replace with your actual quiz link format
    navigator.clipboard.writeText(quizLink).then(() => {
      setShowToaster(true);
      setTimeout(() => setShowToaster(false), 4000);
    });
  };

  return (
    <div className="quiz-analysis">
      <aside className="sidebar">
        <div className="logo">QUIZZIE</div>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li className="active">Analytics</li>
            <li>Create Quiz</li>
          </ul>
        </nav>
        <button className="logout">LOGOUT</button>
      </aside>

      <main className="content">
        <h1 className="title">Quiz Analysis</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Quiz Name</th>
                <th>Created on</th>
                <th>Impression</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {quizzes.slice(0, 10).map((quiz, index) => (
                <tr key={quiz.id}>
                  <td>{index + 1}</td>
                  <td>{quiz.name}</td>
                  <td>{quiz.date}</td>
                  <td>{quiz.impressions}</td>
                  <td className="actions">
                    <button className="edit">✏️</button>
                    <button
                      className="delete"
                      onClick={() => handleDeleteClick(quiz.id)}
                    >
                      🗑️
                    </button>
                    <button
                      className="share"
                      onClick={() => handleShareClick(quiz.id)}
                    >
                      🔗
                    </button>
                  </td>
                  <td>
                    <a href="#">Question Wise Analysis</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Are you sure you want to delete?</h2>
              <button onClick={confirmDelete} className="confirm-btn">
                Confirm Delete
              </button>
              <button onClick={cancelDelete} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        )}

        {showToaster && (
          <div className="toaster">
            <span>
              <span>✅</span> Link copied to clipboard
            </span>
            <button
              className="close-toaster"
              onClick={() => setShowToaster(false)}
            >
              ❌
            </button>
            <div className="progress-bar"></div>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizAnalysis;
