import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";

import InputPassword from "../authentication/InputPassword";
import FullButton from "../common/FullButton";
import { changePassword } from "../../util/user";

const ResetPassword = (props) => {
  const { onChangeScreenHandler } = props || {};
  const emptyFocus = {
    password: false,
    repeatPassword: false,
  };

  const [isFocus, setIsFocus] = useState(emptyFocus);
  const [isPasswordHide, setIsPasswordHide] = useState({
    password: true,
    repeatPassword: true,
  });
  const [passwordInputData, setPasswordInputData] = useState({
    password: "",
    repeatPassword: "",
  });

  const updatePasswordInputValues = (key, value) => {
    setPasswordInputData((existingInputValues) => {
      return {
        ...existingInputValues,
        [key]: value,
      };
    });
  };

  const screenChangeHandler = () => {
    setIsFocus(emptyFocus);
    setIsPasswordHide({
      password: true,
      repeatPassword: true,
    });
    setPasswordInputData({
      password: "",
      repeatPassword: "",
    });
    onChangeScreenHandler("profile");
  };

  const validatePassword = async () => {
    if (passwordInputData.password === passwordInputData.repeatPassword) {
      // Define regular expressions for each criterion
      const minLengthRegex = /.{8,}/;
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /[0-9]/;
      const specialCharRegex = /[^a-zA-Z0-9\s]/; // Matches any character that is not a letter, number, or whitespace

      // Check each criterion
      const isValidLength = minLengthRegex.test(passwordInputData.password);
      const hasUppercase = uppercaseRegex.test(passwordInputData.password);
      const hasLowercase = lowercaseRegex.test(passwordInputData.password);
      const hasNumber = numberRegex.test(passwordInputData.password);
      const hasSpecialChar = specialCharRegex.test(passwordInputData.password);

      // Check if all criteria are met
      const isValidPassword =
        isValidLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar;
      if (isValidPassword) {
        const res = await changePassword(passwordInputData.password);
        console.log(res);
        if (res.status === "success") {
          Alert.alert("Reset Password", "PassWord Changed Succesfully", [
            {
              text: "Ok",
              onPress: () => {
                screenChangeHandler();
              },
            },
          ]);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <InputPassword
        inputContainerStyle={[
          styles.inputContainer,
          isFocus.password && styles.inputTextBorder,
        ]}
        inputProps={{
          value: passwordInputData.password,
          onChangeText: (inp) => updatePasswordInputValues("password", inp),
          autoFocus: isFocus.password,
          onFocus: () =>
            setIsFocus({
              ...emptyFocus,
              password: true,
            }),
          onBlur: () => setIsFocus(emptyFocus),
          placeholder: "Password",
          secureTextEntry: isPasswordHide.password,
          multiline: false,
        }}
        hidePassword={() =>
          setIsPasswordHide({
            ...isPasswordHide,
            password: !isPasswordHide.password,
          })
        }
        isPasswordHide={isPasswordHide.password}
      />

      <InputPassword
        inputContainerStyle={[
          styles.inputContainer,
          isFocus.repeatPassword && styles.inputTextBorder,
        ]}
        inputProps={{
          value: passwordInputData.repeatPassword,
          onChangeText: (inp) =>
            updatePasswordInputValues("repeatPassword", inp),
          autoFocus: isFocus.repeatPassword,
          onFocus: () =>
            setIsFocus({
              ...isFocus,
              repeatPassword: true,
            }),
          onBlur: () =>
            setIsFocus({
              password: false,
              repeatPassword: false,
            }),
          placeholder: "Repeat Password",
          secureTextEntry: isPasswordHide.repeatPassword,
          multiline: false,
        }}
        hidePassword={() =>
          setIsPasswordHide({
            ...isPasswordHide,
            repeatPassword: !isPasswordHide.repeatPassword,
          })
        }
        isPasswordHide={isPasswordHide.repeatPassword}
      />
      <FullButton onPress={validatePassword}>Reset Password</FullButton>
      <View style={{ marginTop: 5 }}>
        <Text style={styles.passCriteria}>- Minimum 8 characters</Text>
        <Text style={styles.passCriteria}>
          - Must contain at least one uppercase letter
        </Text>
        <Text style={styles.passCriteria}>
          - Must contain at least one lowercase letter
        </Text>
        <Text style={styles.passCriteria}>
          - Must contain at least one number
        </Text>
        <Text style={styles.passCriteria}>
          - Must contain at least one special character
        </Text>
        <Text style={styles.passCriteria}>
          - Avoid using common words or patterns
        </Text>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "#43bdbd",
    fontSize: 18,
    fontFamily: "capriola",
    textAlign: "left",
  },
  inputContainer: {
    marginTop: 20,
    width: "95%",
    backgroundColor: "#171717",
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#ffffff",
  },
  inputTextBorder: {
    borderColor: "#42d1e7",
    borderTopWidth: 3.5,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 1.25,
  },
  passCriteria: {
    color: "white",
    fontFamily: "sfPro",
    fontSize: 10.5,
  },
});
