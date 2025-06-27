import { useEffect, useState } from 'react';

const Http = ({ showRes, setShowRes }) => {
  const [showSumRes, setShowSumRes] = useState(false);
  const [url, setUrl] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  type OpenaiRes = {
    success: boolean;
    data: {
      url: string;
      summary: string;
      cached: boolean;
      cacheDate?: string;
    };
    message: string;
  };

  const urlSendHandler = async (): Promise<void> => {
    //this will send the url to the backend, get a response and set a
    //state variable to show the box with the response
    try {
      const res = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error('Something failed in urlSendHandler function');
      }

      const data: OpenaiRes = await res.json();

      if (data.data.summary.length === 0) {
        throw new Error('Recieved info has no body in urlSendHandler');
      }

      setResponse(data.data.summary);
      setShowRes(true);
    } catch (err) {
      setError('Server was unable to send a response, try again');
      console.log(err);
    }
  };

  return (
    <section id="http_container">
      <input
        id="http_input"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button id="send_URL" onClick={urlSendHandler}>
        Gimme Summ
      </button>
      {showRes && (
        <section id="openai_res_container" className="response-container">
          <div id="openai_res" className="response">
            {response}
          </div>
        </section>
      )}
    </section>
  );
};

export default Http;
