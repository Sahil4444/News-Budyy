import { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const[mode, setMode] = useState('light');

  let toggleMode=()=>{
    if(mode==='light'){
      setMode('dark');
    }else{
      setMode('light');
    }
  }
  return (
    <div className="App">
      <Router>
        <Navbar mode={mode} toggleMode={toggleMode} />
        
        <Routes>
          <Route exact path="/" element={<News key='general' pageSize={12} country="in" category='general' mode={mode} />} />
          <Route exact path="/business" element={<News key='business' pageSize={12} country="in" category='business' mode={mode} />} />
          <Route exact path="/entertainment" element={<News key='entertainment' pageSize={12} country="in" category='entertainment' mode={mode} />} />
          <Route exact path="/health" element={<News key='health' pageSize={12} country="in" category='health' mode={mode} />} />
          <Route exact path="/science" element={<News key='science' pageSize={12} country="in" category='science' mode={mode} />} />
          <Route exact path="/sports" element={<News key='sports' pageSize={12} country="in" category='sports' mode={mode} />} />
          <Route exact path="/technology" element={<News key='technology' pageSize={12} country="in" category='technology' mode={mode} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
