import { useEffect, useState } from 'react';
import Http from '../components/http';
import Qna from '../components/qna';
import '../styles/styles.css';

const App = () => {

  const [showRes, setShowRes] = useState(false)

  interface MyComponentProps {
    showRes: boolean;
  }

  return (
    <div>
      <Http/>
      <Qna/>
    </div>
  );
};

export default App;
