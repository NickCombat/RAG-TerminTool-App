import { Image, StyleSheet, Text, ScrollView } from 'react-native';

export default function VorhabenDetails({navigation, route}) {

  const { item } = route.params; 

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Vorhaben: {item.name}</Text>
        <Text>{item.nummerIntern} {item.bezeichnung}</Text>
        <Text>Ort: {item.strasse} {item.hnr} {item.plz} {item.ort}</Text>
        <Image 
            style={styles.image}
            source={{uri: item.picture.large}} 
        />
        <Text>Ges.leitung: {item.gesamtleitung}</Text>
        <Text>Schiessleiter: -na- </Text>
        <Text>Bemerkung: -na- </Text>
        <Text>Frist:  {item.frist_datum}</Text>
        <Text>Zeit: {item.von_datum} {item.von_zeit} - {item.bis_zeit}</Text>
        <Text style={{textAlign: 'left', marginLeft:25}}>freise Plätze: {item.plaetze}</Text>
        <Text style={{textAlign: 'left', marginLeft:25}}>offene Anfragen: {item.plaetzeAngefragt}</Text>
        <Text style={{textAlign: 'left', marginLeft:25}}>belegte Plätze: {item.plaetzebelegt}</Text>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 170, 
        height: 196, 
    },
  });
  