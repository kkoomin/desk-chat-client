import React from "react";
import "./App.css";
import WelcomePage from "./pages/welcome.page";
import MainPage from "./pages/main.page";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// When user closes the browser, it will remove the user cookies
window.addEventListener("beforeunload", () => {
  cookies.remove("username");
  cookies.remove("userId");
});

class App extends React.Component {
  state = {
    isLoggedIn: false,
    isLoginFormOpened: false
  };

  componentDidMount() {
    if (cookies.get("username")) this.setState({ isLoggedIn: true });
  }

  toggleLogin = () => {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    });
  };

  render() {
    return (
      <div className="app">
        {this.state.isLoggedIn ? (
          <MainPage toggleLogin={this.toggleLogin} />
        ) : (
          <WelcomePage
            toggleLogin={this.toggleLogin}
            isLoggedIn={this.state.isLoggedIn}
            submitLogin={this.submitLogin}
          />
        )}
      </div>
    );
  }
}

export default App;
