import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { container } from "../styles/styles";

const UserProfile = () => {
  return (
    <View style={container}>
      <TouchableOpacity>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <View>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../../assets/profile/1692017424178-thiyagu.jpeg")}
              style={styles.profileImage}
            />
            <Text style={styles.name}>Thiyagesh</Text>
            <Text style={styles.detail}>thiyagesh@test.in</Text>
            <Text style={styles.detail}>+91 63691 91976</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <View>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Text style={styles.buttonText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

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
    borderRadius: 10,
  },
  name: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "lucidaGrandeBold",
    fontWeight: "600",
    paddingTop: 5,
  },
  detailsContainer: {
    paddingTop: 50,
    paddingLeft: 30,
  },
  detail: {
    color: "#9c8f8f",
    fontSize: 15.5,
    fontFamily: "sfPro",
    paddingLeft: 7,
    fontWeight: "500",
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
