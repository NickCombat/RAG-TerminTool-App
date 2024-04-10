import { Image, View, Text, Pressable, StyleSheet } from "react-native";

export default function VorhabenListeItem({ vorhaben, onPress }) {
  //  console.log(vorhaben);
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.containerline}>
        <Image
          style={styles.image}
          source={{ uri: vorhaben.picture.thumpnail }}
        />
        <Text style={{ paddingLeft: 5 }}>
          {vorhaben.nummerIntern + " " + vorhaben.name}
        </Text>
      </View>
      <Text style={styles.containersecondline}>{vorhaben.von_datum}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    paddingLeft: 10,
    paddingRight: 10,
  },
  containerline: {
    flexDirection: "row",
    height: 20,
  },
  containersecondline: {
    height: 25,
    paddingLeft: 30,
  },
  image: {
    width: 23,
    height: 30,
  },
});
