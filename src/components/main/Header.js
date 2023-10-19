import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";

import SearchBar from "../common/SearchBar";

const Header = () => {
  const [isItSearchBar, setItIsSearchBar] = useState(false);
  const [searchInputData, setSearchInputData] = useState("");

  const changeHeaderType = () => {
    clearSearchInputData();
    setItIsSearchBar(!isItSearchBar);
  };

  const changeSearchInputData = (inp) => {
    setSearchInputData(inp);
  };

  const clearSearchInputData = () => {
    setSearchInputData("");
  };

  return (
    <View style={styles.container}>
      {isItSearchBar ? (
        <>
          <View style={styles.searchBarHeader}>
            <View style={styles.container}>
              <TouchableOpacity onPress={changeHeaderType}>
                <Ionicons name="arrow-back" size={28} color="white" />
              </TouchableOpacity>
              <FontAwesome
                name="user-circle"
                size={27}
                color="white"
                style={styles.icon}
              />
            </View>
            <View style={styles.searchBarContainer}>
              <SearchBar
                searchInputData={searchInputData}
                changeSearchInputData={changeSearchInputData}
                placeholder="Search Anime Series..."
                clearSearchInputData={clearSearchInputData}
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.title}>Anime</Text>
            <Text style={[styles.title, styles.x]}>X</Text>
          </View>
          <View style={styles.container}>
            <TouchableOpacity onPress={changeHeaderType}>
              <Feather
                name="search"
                size={26}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome
                name="user-circle"
                size={24}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarHeader: { flex: 1 },
  searchBarContainer: {
    marginTop: 7,
  },
  title: {
    color: "#43bdbd",
    fontFamily: "PoetsenOne",
    fontSize: 28,
  },
  x: {
    fontSize: 35,
  },
  icon: {
    marginHorizontal: 7,
  },
});
