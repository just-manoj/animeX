import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import React, { useState } from "react";
import SearchBar from "./SearchBar";

const CategorywiseHeader = (props) => {
  const {
    animeCategory,
    searchInputData,
    changeSearchInputData,
    clearSearchInputData,
    setSearchInputData,
  } = props || {};
  const navigation = useNavigation();

  const [isItSearchBar, setItIsSearchBar] = useState(false);

  const goBack = () => {
    setSearchInputData("");
    setItIsSearchBar(false);
    navigation.navigate("main");
  };

  const changeHeaderType = () => {
    clearSearchInputData();
    setItIsSearchBar(!isItSearchBar);
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={goBack}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{animeCategory}</Text>
        </View>
        <TouchableOpacity onPress={changeHeaderType}>
          <Feather name="search" size={26} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {isItSearchBar && (
        <View style={styles.searchBarContainer}>
          <SearchBar
            searchInputData={searchInputData}
            changeSearchInputData={changeSearchInputData}
            placeholder="Search Anime Series..."
            clearSearchInputData={clearSearchInputData}
          />
        </View>
      )}
    </View>
  );
};

export default CategorywiseHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: { flexDirection: "row", alignItems: "center" },
  title: {
    color: "#59dad6",
    fontSize: 20,
    fontFamily: "capriola",
  },
  searchBarContainer: {
    marginTop: 7,
  },
});
