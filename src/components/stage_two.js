import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import { MyContext } from "../context";

const StageTwo = () => {
  const context = useContext(MyContext);
  return (
    <>
      <Text>Who pays the Bill?</Text>
      <Text>The Looser is....</Text>
      <Text style={styles.looser}>{context.state.result}</Text>
      <Button
        title="Try Again"
        onPress={() => context.getNewLooser()}
        buttonStyle={styles.button}
      />
      <Button
        title="Start Over"
        onPress={() => context.resetApp()}
        buttonStyle={styles.button}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff6500",
    marginTop: 20,
  },
  looser: {
      fontSize:30,
      marginTop:20
  }
});
export default StageTwo;
