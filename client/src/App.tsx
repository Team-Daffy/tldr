import { useEffect, useState } from 'react';
import '../styles/styles.css';

const App = () => {
  const [showSumRes, setShowSumRes] = useState(false);
  const [url,setUrl] = useState(null)
  const [response,setResponse] = useState(null)

  const urlSendHandler = () => {
    //this will send the url to the backend, get a response and set a state variable to show the box with the response
    setResponse({/*response we get from fetch request to backend (api response)*/})
    setShowSumRes(true);
  };

  return (
    <div>
      <section id='http_container'>
        <input id='http_input' placeholder='URL' value={url} onChange={e => setUrl(e.target.value)}/>
        <button id='sendURL' onClick={urlSendHandler}>Gimme Summ</button>
        <div id='openai_res'></div>
      </section>
      <section id='question_container'>
        <div id='question_input'></div>
        <div id='question_res'></div>
      </section>
    </div>
  );
};

export default App;
