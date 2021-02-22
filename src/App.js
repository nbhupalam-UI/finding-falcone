import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from "./store/store";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import ErrorBar from "./components/common/ErrorBar";
import MissionControl from "./components/FindingFalcone/MissionControl/MissionControl";
import MissionReport from "./components/FindingFalcone/MissionReport/MissionReport";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <div className="App-Content">
            <Route exact path="/" component={MissionControl} />
            <Route exact path="/report" component={MissionReport} />
          </div>
          <ErrorBar />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
