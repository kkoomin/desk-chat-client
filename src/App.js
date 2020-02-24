import React from "react";
import "./App.css";
import WelcomePage from "./pages/welcome.page";
import MainPage from "./pages/main.page";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class App extends React.Component {
  state = {
    isLoggedIn: false,
    isLoginFormOpened: false
  };

  componentDidMount() {
    if (cookies.get("username")) this.login();
  }

  login = () => {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    });
  };

  render() {
    return (
      <div className="app">
        {this.state.isLoggedIn ? (
          <MainPage login={this.login} />
        ) : (
          <WelcomePage
            login={this.login}
            isLoggedIn={this.state.isLoggedIn}
            submitLogin={this.submitLogin}
          />
        )}
      </div>
    );
  }
}

export default App;
