import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from "./store/store";
import ErrorBar from "./components/common/ErrorBar";
import Layout from "./hoc/Layout/Layout";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import "./App.css";

const MissionControlAsync = asyncComponent(() =>
  import("./components/FindingFalcone/MissionControl/MissionControl")
);

const MissionReportAsync = asyncComponent(() =>
  import("./components/FindingFalcone/MissionReport/MissionReport")
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Layout>
            <div className="App-Content">
              <Route exact path="/" component={MissionControlAsync} />
              <Route exact path="/report" component={MissionReportAsync} />
            </div>
          </Layout>
          <ErrorBar />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
