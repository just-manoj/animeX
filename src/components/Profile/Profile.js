import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const Profile = (props) => {
  const {
    name,
    birthDay,
    email,
    onLogoutHandler,
    emailVerified,
    wishList,
    onChangeScreenHandler,
  } = props || {};

  const navigation = useNavigation();
  const ageCalculationHandler = (date) => {
    const currentDate = new Date();
    let age = currentDate.getFullYear() - date.getFullYear();
    if (
      currentDate.getMonth() < date.getMonth() ||
      (currentDate.getMonth() === date.getMonth() &&
        currentDate.getDate() < date.getDate())
    ) {
      age--;
    }
    return age;
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <View style={styles.profileContainer}>
      <View>
        <View style={styles.profileImageContainer}>
          <Image
            source={require("../../../assets/profile/1692017424178-thiyagu.jpeg")}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{name}</Text>
        </View>
        <View>
          <View>
            <Text style={[styles.text, styles.heading]}>User Details</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.details}>
            <Text style={[styles.text, styles.label]}>Birth Day</Text>
            <Text style={[styles.text, styles.userData]}>
              {formatDate(new Date(birthDay))}
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.details}>
            <Text style={[styles.text, styles.label]}>Age</Text>
            <Text style={[styles.text, styles.userData]}>
              {ageCalculationHandler(new Date(birthDay))}
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <View>
            <Text
              style={[
                styles.text,
                styles.label,
                { paddingHorizontal: 10, paddingTop: 10 },
              ]}
            >
              E-Mail
            </Text>
            <Pressable
              style={styles.mailContainer}
              disabled={emailVerified}
              onPress={() => {
                if (emailVerified == false) {
                  onChangeScreenHandler("OTP");
                }
              }}
            >
              <Text style={[styles.text, { width: "80%" }]} numberOfLines={1}>
                {email}
              </Text>
              <View style={styles.verifyContainer}>
                <Text
                  style={[
                    styles.text,
                    emailVerified === true
                      ? { color: "#3ae93a" }
                      : { color: "red" },
                  ]}
                >
                  {emailVerified === true ? "Verified" : "Verify"}
                </Text>
                <AntDesign name="right" size={12} color="#ffffff" />
              </View>
            </Pressable>
          </View>
          <View style={styles.horizontalLine} />
          <Pressable
            style={[styles.details, styles.mailContainer, { marginTop: 10 }]}
            onPress={() =>
              navigation.navigate("CategorywiseAnime", {
                isWishList: true,
                animeIds: wishList,
              })
            }
          >
            <Text style={[styles.text, styles.label]}>WishList</Text>
            <AntDesign name="right" size={12} color="#ffffff" />
          </Pressable>
          <View style={styles.horizontalLine} />
          <Pressable
            style={[styles.details, styles.mailContainer, { marginTop: 10 }]}
            onPress={() => navigation.navigate("FavoriteEpisode")}
          >
            <Text style={[styles.text, styles.label]}>FavoriteList</Text>
            <AntDesign name="right" size={12} color="#ffffff" />
          </Pressable>
          <View style={styles.horizontalLine} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onChangeScreenHandler("reset")}>
          <View>
            <Text style={styles.buttonText}>Change Password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogoutHandler}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  profileImageContainer: {
    paddingTop: 10,
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#43bdbd",
    borderWidth: 4,
  },
  horizontalLine: {
    borderBottomColor: "rgba(115, 117, 118,0.5)",
    borderBottomWidth: 1.5,
  },
  name: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "lucidaGrandeBold",
    fontWeight: "600",
    paddingTop: 5,
  },
  detailsContainer: {
    paddingTop: 50,
    paddingLeft: 30,
  },
  label: {
    fontSize: 15,
    fontFamily: "sfProMed",
  },
  text: {
    color: "#ffffff",
    fontFamily: "sfPro",
  },
  heading: {
    fontSize: 17,
    fontFamily: "lucidaGrandeBold",
    paddingVertical: 15,
  },
  details: {
    padding: 10,
  },
  userData: {
    paddingLeft: 15,
    fontSize: 13,
  },
  mailContainer: {
    marginTop: 5,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#252424",
  },
  verifyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "20%",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "lucidaGrande",
  },
  buttonContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
});
