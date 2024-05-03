import { View, TouchableOpacity, BackHandler } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { container } from "../styles/styles";
import { logoutCall } from "../util/Auth";
import { getUserProfile } from "../util/user";
import Loading from "../components/common/Loading";
import ResetPassword from "../components/Profile/ResetPassword";
import Profile from "../components/Profile/Profile";
import OTPVerification from "../components/Profile/OTPVerification";

const UserProfile = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [profileScreenName, setProfileScreenName] = useState("profile");

  const logoutHandler = async () => {
    const res = await logoutCall();

    if (res.status === "success") {
      navigation.navigate("Authentication", { againLogin: true });
    }
  };

  const fetchProfileData = async () => {
    setIsLoading(true);
    const res = await getUserProfile();
    if (res.status === "success") {
      setUserProfile(() => {
        return { ...res.profile };
      });
      setIsLoading(false);
    }
  };

  const changeScreenHandler = (screen, reload) => {
    if (reload) {
      fetchProfileData();
    }
    setProfileScreenName(() => {
      return screen;
    });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchProfileData();
      return () => {
        //do something when screen unmount
      };
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <View style={container}>
      <TouchableOpacity>
        <Ionicons
          name="arrow-back"
          size={28}
          color="white"
          onPress={() => {
            if (profileScreenName === "profile") {
              navigation.goBack();
            } else {
              changeScreenHandler("profile");
            }
          }}
        />
      </TouchableOpacity>
      {profileScreenName === "profile" ? (
        <Profile
          {...userProfile}
          onLogoutHandler={logoutHandler}
          onChangeScreenHandler={changeScreenHandler}
        />
      ) : profileScreenName === "reset" ? (
        <ResetPassword onChangeScreenHandler={changeScreenHandler} />
      ) : profileScreenName === "OTP" ? (
        <OTPVerification onChangeScreenHandler={changeScreenHandler} />
      ) : null}
    </View>
  );
};

export default UserProfile;
