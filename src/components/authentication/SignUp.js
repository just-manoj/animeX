import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import InputText from "../common/InputText";
import FullButton from "../common/FullButton";
import InputPassword from "./InputPassword";
import Footer from "./Footer";
import { ScrollView } from "react-native";

const SignUp = (props) => {
  const { signUpInput, changeInputValue, changeLogInMode, onPress } =
    props || {};

  const emptyFocus = {
    name: false,
    email: false,
    password: false,
    birthDayDate: false,
    repeatPassword: false,
  };
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [isRepeatPasswordHide, setIsRepeatPasswordHide] = useState(true);
  const [isFocus, setIsFocus] = useState(emptyFocus);

  const [dateOfBirth, setDateOfBirth] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() - 10))
  );
  const [showDataPicker, setShowDatePicker] = useState(false);

  const pickDate = ({ type }, pickedDate) => {
    if (type == "set") {
      setDateOfBirth(new Date(pickedDate));
      changeInputValue("birthDayDate", pickedDate);
      setShowDatePicker(false);
    } else {
      setShowDatePicker(false);
    }
  };

  const dateFormat = (date) => {
    if (date === "") {
      return "";
    }
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();

    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];

    const year = date.getFullYear();

    return `${monthName} ${day} ${year}`;
  };
  return (
    <ScrollView ontentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.secondaryContainer}>
          <View style={[styles.bannerOverlay, styles.bannerImage]} />
          <Text style={styles.title}>SignUp</Text>
          <View
            style={[
              styles.inputContainer,
              isFocus.name && styles.inputTextBorder,
            ]}
          >
            <InputText
              value={signUpInput.name}
              onChangeText={(inp) => changeInputValue("name", inp)}
              onFocus={() =>
                setIsFocus({
                  ...emptyFocus,
                  name: true,
                })
              }
              onBlur={() => setIsFocus(emptyFocus)}
              placeholder="Name"
            />
          </View>
          <View
            style={[
              styles.inputContainer,
              isFocus.email && styles.inputTextBorder,
            ]}
          >
            <InputText
              value={signUpInput.email}
              keyboardType="email-address"
              onChangeText={(inp) => changeInputValue("email", inp)}
              onFocus={() =>
                setIsFocus({
                  ...emptyFocus,
                  email: true,
                })
              }
              onBlur={() => setIsFocus(emptyFocus)}
              placeholder="E-Mail"
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              isFocus.birthDayDate && styles.inputTextBorder,
            ]}
          >
            <InputText
              value={dateFormat(signUpInput.birthDayDate)}
              onChangeText={(inp) => changeInputValue("birthDayDate", inp)}
              placeholder="Date of Birth"
              onFocus={() => setShowDatePicker(true)}
            />
          </View>
          {showDataPicker && (
            <DateTimePicker
              mode="date"
              value={dateOfBirth}
              display="spinner"
              onChange={pickDate}
              themeVariant="dark"
              maximumDate={dateOfBirth}
            />
          )}

          <InputPassword
            inputContainerStyle={[
              styles.inputContainer,
              isFocus.password && styles.inputTextBorder,
            ]}
            inputProps={{
              value: signUpInput.password,
              onChangeText: (inp) => changeInputValue("password", inp),
              autoFocus: isFocus.password,
              onFocus: () =>
                setIsFocus({
                  ...emptyFocus,
                  password: true,
                }),
              onBlur: () => setIsFocus(emptyFocus),
              placeholder: "Password",
              secureTextEntry: isPasswordHide,
              multiline: false,
            }}
            hidePassword={() => setIsPasswordHide(!isPasswordHide)}
            isPasswordHide={isPasswordHide}
          />

          <InputPassword
            inputContainerStyle={[
              styles.inputContainer,
              isFocus.repeatPassword && styles.inputTextBorder,
            ]}
            inputProps={{
              value: signUpInput.repeatPassword,
              onChangeText: (inp) => changeInputValue("repeatPassword", inp),
              autoFocus: isFocus.repeatPassword,
              onFocus: () =>
                setIsFocus({
                  ...isFocus,
                  repeatPassword: true,
                }),
              onBlur: () =>
                setIsFocus({
                  name: false,
                  email: false,
                  password: false,
                  repeatPassword: false,
                }),
              placeholder: "Repeat Password",
              secureTextEntry: isRepeatPasswordHide,
              multiline: false,
            }}
            hidePassword={() => setIsRepeatPasswordHide(!isRepeatPasswordHide)}
            isPasswordHide={isRepeatPasswordHide}
          />
          <FullButton onPress={onPress}>SignUp</FullButton>
        </View>
        <Footer
          changeLogInMode={changeLogInMode}
          changeMode="LogIn"
          account="Already have an account? "
        />
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  bannerOverlay: {
    position: "absolute",
  },
  secondaryContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  title: {
    marginTop: 50,
    fontSize: 25,
    color: "#59e0e0",
    fontFamily: "cilokThere",
  },
  inputTextBorder: {
    borderColor: "#42d1e7",
    borderTopWidth: 3.5,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 1.25,
  },
  inputContainer: {
    marginTop: 20,
    width: "85%",
    backgroundColor: "#171717",
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#ffffff",
  },
});
