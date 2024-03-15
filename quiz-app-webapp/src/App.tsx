import React, {lazy, Suspense, useEffect} from 'react';
import './App.scss';
import './styles/styles.scss'
import Loading from "./pages/loading/loading";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/login/login";
import NotFound from "./pages/notFound/notFound";
import Shell from "./@shared/shell/shell";
import 'bootstrap/dist/css/bootstrap.min.css';
import QuizResults from "./pages/quiz/quizResults/quizResults";

const Quiz = lazy(() => import("./pages/quiz/quiz"));

function App() {
  
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
    //eslint-disable-next-line
  }, [])

  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="/login">
          <Route path="/login" element={<Login/>}/>
        </Route>
        <Route path="/quiz" element={<Shell/>}>
          <Route index element={<Quiz/>}/>
          <Route path="/quiz/results" element={<QuizResults/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Suspense>
  );
}

export default App;
