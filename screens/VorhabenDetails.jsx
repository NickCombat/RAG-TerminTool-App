import { Image, StyleSheet, Text, ScrollView, View, Button } from 'react-native';
import { useState } from 'react';
import Anmeldung from '../components/Anmeldung.jsx';

export default function VorhabenDetails({navigation, route}) {

  const { item } = route.params; 
  const [isAnmelden, setAnmelden] = useState(false);
  const onClick = () => setAnmelden(true);
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image 
              style={styles.image}
              source={{uri: item.picture.large}} 
        />
        <View>
          <Text>Vorhaben: {item.name}</Text>
          <Text>{item.nummerIntern} {item.bezeichnung}</Text>
          <Text>Ort: {item.strasse} {item.hnr} {item.plz} {item.ort}</Text>
          <Text>Ges.leitung: {item.gesamtleitung}</Text>
          <Text>Schiessleiter: {item.schiessleiter}</Text>
          <Text>Bemerkung: {item.bemerkung} </Text>
          <Text>Frist:  {item.frist_datum}</Text>
          <Text>Zeit: {item.von_datum} {item.von_zeit} - {item.bis_zeit}</Text>
          <Text style={{textAlign: 'left', marginLeft:25}}>freie Plätze: {item.plaetze - item.plaetzebelegt}</Text>
          <Text style={{textAlign: 'left', marginLeft:25}}>offene Anfragen: {item.plaetzeAngefragt}</Text>
          <Text style={{textAlign: 'left', marginLeft:25}}>belegte Plätze: {item.plaetzebelegt}</Text>
          { isAnmelden ? <Anmeldung vorhabenId={item.id} /> : <Button title="Anmeldung" onPress={onClick}/> }
        </View>
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
    viewBlock: {
      justifyContent: 'left',
    },
    image: {
        width: 50, 
        height: 61, 
    },
  });
  