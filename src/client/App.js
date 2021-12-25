import React,{useState} from "react";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import {Provider} from 'react-redux';
import Login from "./components/login/Login";
import store from './redux/store';
import LandingPage from './components/LandingPage/LandingPage'
import UserProfile from './components/UserProfile/UserProfile';
// import PlayerRegistration from "./components/registration/PlayerRegistration/PlayerRegistration";
import PlayerRegistration from './components/registration/registartion/registartion';
import VideoPlayerContainer from './components/youtube-player/player-container';
import StrockAnalysisList from './components/strock-analysis-list/strock-analysis-list';
import CompareLibrary from './components/compare-library/compare-library';
import CompetancyRating from './components/competancy_rating/competancy_rating';
import Cookies from 'js-cookie';


function App() {

  const [isLoggedIn,setISLoggedIn] = useState(Cookies.get("token") == null ? false:true)
  console.log(isLoggedIn)

  return (
    <ErrorBoundary>
    <Provider store = {store}>
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login onAuth = {setISLoggedIn}/>}> </Route>
            <Route path="login" element={<Login onAuth = {setISLoggedIn}/>}> </Route>
            <Route path="registration/:role" element = {<PlayerRegistration/>}></Route>

            <Route path="landingpage" element={isLoggedIn ?<LandingPage/> :<Navigate to="/"></Navigate>}></Route>
            <Route path="profilepage" element={isLoggedIn ?<UserProfile/> :<Navigate to="/"></Navigate>}></Route>
            <Route path="video/:from" element={isLoggedIn ? <VideoPlayerContainer/>:<Navigate to="/"></Navigate>}></Route>
            <Route path="strockanalysislist" element={isLoggedIn ?<StrockAnalysisList/> :<Navigate to="/"></Navigate>}></Route>
            <Route path="comparelibrary" element={isLoggedIn ?<CompareLibrary/> :<Navigate to="/"></Navigate>}></Route>
            <Route path="competancyrating" element={ isLoggedIn ? <CompetancyRating />:<Navigate to="/"></Navigate>}></Route>
            <Route path="assessments" element={  isLoggedIn ?  <CompetancyRating />:<Navigate to="/"></Navigate>}></Route>
            
            <Route path="*" element = {<PageNotFound/>}></Route>

         
        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
    </ErrorBoundary>
  );
}

export default App;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error)
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(errorInfo)
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}


function PageNotFound(){
  return <div>Page not found</div>
}

function PrivateRoute(){

}
