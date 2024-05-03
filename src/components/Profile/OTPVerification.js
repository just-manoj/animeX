import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import InputText from "../common/InputText";
import FullButton from "../common/FullButton";
import { getOTP, verifyOTP } from "../../util/user";

const OTPVerification = (props) => {
  const { onChangeScreenHandler } = props || {};
  const [OTPValue, setOTPValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

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

  useEffect(() => {
    const getOTPHandler = async () => {
      const res = await getOTP();
      if (res.status === "success") {
        Alert.alert("Get OTP", "OTP send to your registered mail Id");
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

    getOTPHandler();
  }, []);

  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>OTP Verification</Text>
      </View>
      <View style={[styles.inputContainer, isFocus && styles.inputTextBorder]}>
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
      <View style={{ alignItems: "center" }}>
        <FullButton style={{ marginTop: 20 }} onPress={otpVerifyHandler}>
          GET OTP
        </FullButton>
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
    width: "100%",
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
  hint: {
    color: "white",
    fontFamily: "sfPro",
    fontSize: 10.5,
    marginLeft: 25,
  },
});
