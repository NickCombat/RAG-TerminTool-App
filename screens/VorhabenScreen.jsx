import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import VorhabenListeItem from '../components/VorhabenListeItem';


export default function VorhabenScreen({navigation}) {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    async function fetchData() {
      setLoading(true);
      try {
        const respons = await fetch(
          "https://ragplaner.rk-hude.de/admin/vorhaben/apiListe"
        );
        const json = await respons.json();
        setData(json.results);
        setLoading(false);
      } catch (error) {
        alert("Fehler beim Laden der Daten!");
        setData([]);
        setLoading(false);
      }
    } 

    useEffect(() => {
            fetchData();
    }, []);

    if(isLoading){
      return (
        <View style={styles.center}>
          <ActivityIndicator size={'large'} color={'darkblue'}/>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList 
          data={data} 
          renderItem={({item}) => (
              <VorhabenListeItem 
                vorhaben={item} 
                onPress={() => navigation.navigate('VorhabenDetails', {item})} 
              />
            )}
          keyExtractor={(item) => item.id}  
          refreshing={isLoading}
          onRefresh={fetchData}
          ItemSeparatorComponent={
            <View style={styles.listSepperator} /> 
          }
          ListEmptyComponent={<Text>Aktuell konnten keine Daten geladen werden!</Text>}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingTop: 60,
    },
    center:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    listSepperator:
    {
      height: StyleSheet.hairlineWidth, 
      backgroundColor: 'lightblue'
    }, 
    listEmpty:
    {
      fontSize: 32,
      paddingTop: 100,
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: 'center',
    }
  });
  