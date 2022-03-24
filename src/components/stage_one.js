import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, Button, ListItem, Text, Icon } from "react-native-elements";
import Toast from 'react-native-toast-message';

import { MyContext } from "../context";
import { color } from "react-native-reanimated";

const StageOne = () => {
  const context = useContext(MyContext);

  const renderPlayers = () =>
    context.state.players.map((item, idx) => (
      <ListItem
        key={idx}
        bottomDivider
        style={{ width: "100%" }}
        onLongPress={() => context.removePlayer(idx)}
      >
        <ListItem.Chevron />
        <ListItem.Content>
          <ListItem.Title>{item}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ));


  return (
    <>
      <Formik
        initialValues={{ player: "" }}
        validationSchema={Yup.object({
          player: Yup.string()
            .min(3, "Must be more than 3 character")
            .max(15, "Must be 15 characters or less")
            .required("Sorry, the name is required"),
        })}
        onSubmit={(values, { resetForm }) => {
          context.addPlayer(values.player);
          resetForm();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <>
            <Text>Who Pays the Bill?</Text>
            <Input
              placeholder="Add Name here"
              leftIcon={{
                type: "antdesign",
                name: "adduser",
                color: "#ff6500",
              }}
              inputContainerStyle={{
                marginHorizontal: 50,
                marginTop: 50,
              }}
              renderErrorMessage={errors.player && touched.player}
              errorMessage={errors.player}
              errorStyle={{ marginHorizontal: 50 }}
              onChangeText={handleChange("player")}
              onBlur={handleBlur("player")}
              value={values.player}
            />
            <Button
              title="Add Player"
              onPress={handleSubmit}
              buttonStyle={styles.button}
            />
          </>
        )}
      </Formik>
      <View style={styles.list}>
        {context.state.players && context.state.players.length > 0 ? (
          <>
            <Text>List of Players:</Text>
            {renderPlayers()}
            <Button
              buttonStyle={styles.button}
              title="Get Looser"
              onPress={() => context.nextStage()}
            />
          </>
        ) : null}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff6500",
    marginTop: 20,
  },
  list: {
    padding: 20,
    width: "100%",
  },
});

export default StageOne;
