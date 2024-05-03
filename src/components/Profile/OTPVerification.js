import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import InputText from "../common/InputText";
import FullButton from "../common/FullButton";
import {
  getOTP,
  verifyOTP,
  getOTPForResetPasswprd,
  verifyResetOTP,
} from "../../util/user";
import Loading from "../common/Loading";

const OTPVerification = (props) => {
  const { onChangeScreenHandler, purpose, email, changeLogInMode } =
    props || {};
  const [OTPValue, setOTPValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const changeOTPValueHandler = (value) => {
    setOTPValue(value);
  };

  const otpVerifyHandler = async () => {
    const res = await verifyOTP(OTPValue);

    if (res.status === "success") {
      Alert.alert("Mail Verification", "Mail Verified Successfully", [
        {
          text: "OK",
          onPress: () => {
            changeOTPValueHandler("");
            setIsFocus(false);
            onChangeScreenHandler("profile", true);
          },
        },
      ]);
    } else {
      Alert.alert("Mail Verification", res.message, [
        {
          text: "OK",
          onPress: () => {
            changeOTPValueHandler("");
            setIsFocus(false);
            onChangeScreenHandler("profile", true);
          },
        },
      ]);
    }
  };

  const getOTPHandler = async () => {
    const res = await getOTP();
    if (res.status === "success") {
      Alert.alert("Get OTP", "OTP send to your registered mail Id", [
        {
          text: "OK",
          onPress: () => {
            setIsLoading(false);
          },
        },
      ]);
    } else {
      Alert.alert("Get OTP", "Something Wrong, try someother time", [
        {
          text: "OK",
          onPress: () => {
            changeOTPValueHandler("");
            setIsFocus(false);
            onChangeScreenHandler("profile", true);
          },
        },
      ]);
    }
  };

  const resetPasswordOTPHandler = async () => {
    const res = await getOTPForResetPasswprd(email);
    if (res.status === "success" && res !== undefined) {
      Alert.alert("Get OTP", "OTP send to your entered mail Id", [
        { text: "Ok", onPress: () => setIsLoading(false) },
      ]);
    } else {
      Alert.alert("Get OTP", res.message, [
        {
          text: "OK",
          onPress: () => {
            changeOTPValueHandler("");
            setIsFocus(false);
            onChangeScreenHandler("LogIn");
          },
        },
      ]);
    }
  };

  const otpVerifyResetHandler = async () => {
    const res = await verifyResetOTP(email, OTPValue);

    if (res.status === "success") {
      Alert.alert(
        "Mail Verification",
        "Mail Verified Successfully,You can Reset Your Password",
        [
          {
            text: "OK",
            onPress: () => {
              changeOTPValueHandler("");
              setIsFocus(false);
              changeLogInMode("ResetPassword");
            },
          },
        ]
      );
    } else {
      Alert.alert("Mail Verification", res.message, [
        {
          text: "OK",
          onPress: () => {
            changeOTPValueHandler("");
            setIsFocus(false);
            changeLogInMode("LogIn");
          },
        },
      ]);
    }
  };

  useEffect(() => {
    if (purpose === "reset-password") {
      resetPasswordOTPHandler();
    } else {
      getOTPHandler();
    }
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <View>
      {purpose === "reset-password" && (
        <TouchableOpacity
          onPress={() => {
            changeLogInMode("LogIn");
          }}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      )}
      <View style={{ alignItems: "center" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>OTP Verification</Text>
        </View>
        <View
          style={[styles.inputContainer, isFocus && styles.inputTextBorder]}
        >
          <InputText
            value={OTPValue}
            keyboardType="number-pad"
            onChangeText={(inp) => changeOTPValueHandler(inp)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            autoFocus={isFocus}
            placeholder="OTP"
            maxLength={4}
          />
        </View>
        <Text style={styles.hint}>*OTP send to your registered e-mail</Text>
        <View style={{ alignItems: "center", width: "100%" }}>
          <FullButton
            style={{ marginTop: 20 }}
            onPress={() => {
              if (purpose === "reset-password") {
                otpVerifyResetHandler();
              } else {
                otpVerifyHandler();
              }
            }}
          >
            Verify OTP
          </FullButton>
        </View>
      </View>
    </View>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
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
    alignItems: "center",
  },
  inputTextBorder: {
    borderColor: "#42d1e7",
    borderTopWidth: 3.5,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 1.25,
  },
  hint: {
    color: "white",
    fontFamily: "sfPro",
    fontSize: 10.5,
    marginLeft: 25,
    marginTop: 10,
  },
});
