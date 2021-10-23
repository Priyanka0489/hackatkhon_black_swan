import logo from "./logo.svg";
import "./App.css";
import MainMenu from "./Components/MainMenu";
import CustomTabs from "./Components/Tab";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ResultPage from "./Components/ResultPage";
import FacebookSharePost from "./Components/FacebookSharePost";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={CustomTabs} exact />
          <Route path="/result_car" component={ResultPage} exact />
          <Route path="/search_diagnostic" component={ResultPage} exact />
          <Route path="/result_pan" component={ResultPage} exact />
          <Route path="/fbpost" component={FacebookSharePost} exact />
        </Switch>
      </Router>

      {/*<header className="App-header">*/}
      {/*  /!*<MainMenu/>*!/*/}
      {/*  <CustomTabs />*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
