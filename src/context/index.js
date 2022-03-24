import React, { Component } from "react";
import Toast from "react-native-toast-message";

const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    stage: 1,
    players: ["Lisa", "Mike", "Anne"],
    result: "",
  };

  addPlayer = (name) => {
    this.setState((prevState, props) => ({
      players: [...prevState.players, name],
    }));
  };

  removePlayer = (idx) => {
    let newArray = this.state.players;
    newArray.splice(idx, 1);
    this.setState({ players: newArray });
  };

  nextHandler = () => {
    const { players } = this.state;

    if (players.length < 2) {
      Toast.show({
        type: "error",
        position: "bottom",
        visibilityTime: 3000,
        text1: "Sorry",
        text2: "You need a least 2 Players",
      });
    } else {
      this.setState(
        {
          stage: 2,
        },
        () => {
          this.generateLooser();
        }
      );
    }
  };

  generateLooser = () => {
    const { players } = this.state;
    const {result} = this.state;
    for (let i = 0; i < players.length; i++) {
      if (players[i] === result) {
        players.splice(i, 1);
        i--;
        players[Math.floor(Math.random() * players.length)];
      } else {
        this.setState({
          result: players[Math.floor(Math.random() * players.length)],
        });
      }
    }
  };

  resetApp = () => {
    this.setState({
      stage: 1,
      players: [],
      result: "",
    });
  };

  render() {
    return (
      <>
        <MyContext.Provider
          value={{
            state: this.state,
            addPlayer: this.addPlayer,
            removePlayer: this.removePlayer,
            nextStage: this.nextHandler,
            getNewLooser: this.generateLooser,
            resetApp: this.resetApp,
          }}
        >
          {this.props.children}
          <Toast />
        </MyContext.Provider>
      </>
    );
  }
}

export { MyContext, MyProvider };
