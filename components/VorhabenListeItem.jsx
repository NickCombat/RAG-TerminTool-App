import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import {Fragment} from "react";

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
          {vorhaben.nummerIntern + " " + vorhaben.name}&nbsp;
          [ {vorhaben.plaetzebelegt} / {vorhaben.plaetze - vorhaben.plaetzebelegt} ]
        </Text>
      </View>
      <Text style={styles.containersecondline}>{vorhaben.von_datum}  {vorhaben.von_zeit} - {vorhaben.bis_zeit} </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  containerline: {
    flexDirection: "row",
    height: 22,
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
