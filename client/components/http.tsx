import { useEffect, useState } from 'react';
interface MyComponentProps {
    showRes: boolean;
  }
const Http = () => {



  const [showSumRes, setShowSumRes] = useState(false);
  const [url, setUrl] = useState(null);
  const [response, setResponse] = useState(null);

  const urlSendHandler = () => {
    //this will send the url to the backend, get a response and set a state variable to show the box with the response
    setResponse({/*response we get from fetch request to backend (api response)*/});
    setShowSumRes(true);
  };

  return (
    <section id='http_container'>
      <input
        id='http_input'
        placeholder='URL'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button id='send_URL' onClick={urlSendHandler}>
        Gimme Summ
      </button>
      <div id='openai_res'>
        {response}
      </div>
    </section>
  );
};

export default Http;