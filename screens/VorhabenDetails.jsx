import { Image, StyleSheet, Text, ScrollView } from 'react-native';

export default function VorhabenDetails({navigation, route}) {

  const { item } = route.params; 

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Vorhaben: {item.name}</Text>
        <Text>{item.nummerIntern} {item.bezeichnung}</Text>
        <Image 
            style={styles.image}
            source={{uri: item.picture.large}} 
        />
        <Text>Frist:  {item.frist_datum}</Text>
        <Text>Ort: {item.strasse} {item.hnr} {item.plz} {item.ort}</Text>
        <Text>Zeit: {item.von_datum} {item.von_zeit} - {item.bis_zeit}</Text>

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
        width: 150, 
        height: 196, 
    },
  });
  