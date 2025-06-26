import { useEffect, useState } from 'react';

const Qna = () => {
  const [answer, setAnswer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [showAns, setShowAns] = useState(false)

  const handleQuestion = () => {
    //this will make a fetch to the api and save the answer in a variable to be shown on the front
    setAnswer({/*response from fetch to ai api*/});
    setShowAns(true)
  };

  return (
    <section id='question_container'>
      <input
        id='question_input'
        placeholder='Any questions?'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button id="send_question" onClick={handleQuestion}>Ask</button>
      <div id='question_res'>{answer}</div>
    </section>
  );
};

export default Qna;
