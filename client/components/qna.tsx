import { useEffect, useState } from 'react';

const Qna = () => {
  const [answer, setAnswer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [showAns, setShowAns] = useState(false);
  const [error, setError] = useState(null);

  type OpenaiRes = {
    body: string;
  };

  const handleQuestion = async (): Promise<void> => {
    //this will send the url to the backend, get a response and set a
    //state variable to show the box with the response
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error('Something failed in urlSendHandler function');
      }

      const data: OpenaiRes = await res.json();

      if (data.body.length === 0) {
        throw new Error('Recieved info has no body in urlSendHandler');
      }

      setAnswer(data.body);
      setShowAns(true);
    } catch (err) {
      setError('Server was unable to send a response, try again');
      console.log('Fetch error:', err);
    }
  };

  return (
    <section id='question_container'>
      <input
        id='question_input'
        placeholder='Any questions?'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button id='send_question' onClick={handleQuestion}>
        Ask
      </button>
      {showAns && (
        <section id='answer_container' className='response-container'>
          <div id='answer' className='response'>
            {answer}
          </div>
        </section>
      )}
    </section>
  );
};

export default Qna;
