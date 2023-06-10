import { useState } from 'react';

const AnswerSection = ({question, answer} :) => {

// const [answer, setAnswer] = useState("");
// const [question, setQuestion] = useState("");

  return (
      <>
          <hr className="hr-line" />
          <div className="answer-container">
              <div className="answer-section">
                  <p className="question">{question}</p>
                  <p className="answer">{answer}</p>
                  <div className="copy-icon">
                      <i className="fa-solid fa-copy"></i>
                  </div>
              </div>
          </div>
      </>
  )
}

export default AnswerSection;
