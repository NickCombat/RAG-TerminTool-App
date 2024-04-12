import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VorhabenListeItem from '../components/VorhabenListeItem';

const appPfad = '/api/liste';

export default function VorhabenScreen({navigation}) {

//  console.log('VorhabenScreen', navigation);
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isLoadSetting, setLoadSetting] = useState(true);
    const [settings, setSettings] = useState([]);

    async function fetchData() {
      setLoading(true);
      try {
        let toolUri = settings.toolUri;
        if(undefined === toolUri || isLoadSetting){
          alert("Fehler beim Laden der Daten!(1)");
          setData([]);
          setLoading(false);
          console.log('settings', settings);
          //loadSettings();
        }
        toolUri = toolUri + appPfad;
        console.log('toolUri', toolUri);
        const respons = await fetch( toolUri );
        //console.log('respons', respons);
        const json = await respons.json();
        setData(json.results);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
        alert("Fehler beim Laden der Daten! (2)");
        setData([]);
        setLoading(false);
      }
    } 

    useEffect(() => {
      loadSettings();  
    }, []);

    async function loadSettings(){
      setLoadSetting(true);
      let settingsFromDb = await AsyncStorage.getItem('settings');
      console.log('settingsFromDb1', settingsFromDb);
      //settingsFromDb = {toolUri: "https://ragplaner.rk-hude.de"};
      //settingsFromDb = {toolUri: "https://testragtool.millenni.website"};
      //settingsFromDb = {toolUri: "http://10.111.225.118/ragTerminToolV1/public",};
      settingsFromDb = {toolUri: "http://192.168.68.171/ragTerminToolV1/public",};
      //settingsFromDb = {toolUri: "https://testragtool.millenni.website"};
      console.log('settingsFromDb2', settingsFromDb);

      setSettings(settingsFromDb);
      setLoadSetting(false);
      fetchData();
    }

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
          ListEmptyComponent={<Text>Es konnten keine Daten geladen werden!</Text>}
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
  