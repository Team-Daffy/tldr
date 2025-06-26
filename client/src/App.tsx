import { useEffect, useState } from 'react';
import Http from '../components/http';
import Qna from '../components/qna';
import '../styles/styles.css';

const App = () => {
  const [showRes, setShowRes] = useState(false);

  // type Showing = {
  //   showRes: boolean;
  //   setShowRes: React.Dispatch<React.SetStateAction<boolean>>;
  // };

  return (
    <div>
      <Http showRes={showRes} setShowRes={setShowRes}/>
      {showRes && (
        <Qna />
      )}
      
    </div>
  );
};

export default App;
