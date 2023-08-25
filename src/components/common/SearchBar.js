import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const SearchBar = (props) => {
  const {
    searchInputData,
    changeSearchInputData,
    placeholder,
    clearSearchInputData,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Feather name="search" size={20} color="#671a1a" style={styles.icon} />
        <TextInput
          style={styles.searchInp}
          value={searchInputData}
          onChangeText={changeSearchInputData}
          placeholder={placeholder}
          autoFocus
        />
      </View>
      <TouchableOpacity onPress={clearSearchInputData}>
        <AntDesign
          name="closecircle"
          size={22}
          color="black"
          style={{ marginRight: 3 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 3,
    borderRadius: 7,
    backgroundColor: "#d8d0d0",
  },
  searchInp: {
    marginLeft: 5,
    color: "#296161",
    fontSize: 17,
    fontFamily: "sfPro",
    fontWeight: "600",
  },
});
