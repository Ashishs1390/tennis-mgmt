import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./components/global/login/Login";
import store from "./redux/store";
import LandingPage from "./components/player-coach/LandingPage/LandingPage";
import UserProfile from "./components/player-coach/UserProfile/UserProfile";
import PlayerRegistration from "./components/global/registration/registartion/registartion";
import VideoPlayerContainer from "./components/player-coach/youtube-player/player-container";
import StrockAnalysisList from "./components/player-coach/strock-analysis-list/strock-analysis-list";
import CompareLibrary from "./components/player-coach/compare-library/compare-library";
import CompetancyRating from "./components/player-coach/competancy_rating/competancy_rating";
import PlayerDevelopment from "./components/PlayerDevelopment/PlayerDevelopment";
import LinkPlayer from "./components/player-coach/link-player/link-player";
import CompetancyAggregation from "./components/player-coach/CompetancyAggregation/CompetancyAggregation";
import UserListAggregation from "./components/player-coach/CompetancyAggregation/UserListAggregation";
import Cookies from "js-cookie";

function App() {
  const [isLoggedIn, setISLoggedIn] = useState(
    Cookies.get("token") == null ? false : true
  );


  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="login"></Navigate>}>
                {" "}
              </Route>
              <Route path="login" element={<Login onAuth={setISLoggedIn} />}>
                {" "}
              </Route>
              <Route
                path="registration/:role"
                element={<PlayerRegistration />}
              ></Route>
              <Route
                path="link/player"
                element={
                  isLoggedIn ? <LinkPlayer /> : <Navigate to="/"></Navigate>
                }
              ></Route>
              <Route
                path="competancyaggregation"
                element={
                  isLoggedIn ? <UserListAggregation /> : <Navigate to="/"></Navigate>
                }
              >
                <Route
                  path="players/:playerId"
                  element={<CompetancyAggregation />}
                ></Route>

              </Route>
              <Route
                path="user/:role"
                element={
                  isLoggedIn ? <LandingPage /> : <Navigate to="/"></Navigate>
                }
              >
                <Route path="profilepage" element={<UserProfile />}></Route>
                <Route
                  path="video/:from"
                  element={<VideoPlayerContainer />}
                ></Route>
                <Route
                  path="strockanalysislist"
                  element={<StrockAnalysisList />}
                ></Route>
                <Route
                  path="comparelibrary"
                  element={<CompareLibrary />}
                ></Route>
                <Route
                  path="assessments"
                  element={<CompetancyRating />}
                ></Route>
                <Route
                  path="playerdevelopment"
                  element={<PlayerDevelopment />}
                ></Route>
              </Route>

              <Route path="*" element={<PageNotFound />}></Route>
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
    console.log(error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(errorInfo);
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

function PageNotFound() {
  return <div>Page not found</div>;
}

function PrivateRoute() { }
