import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VorhabenListeItem from '../components/VorhabenListeItem';

const testUrl = "https://testragtool.millenni.website";
const appPfad = '/api/liste';

export default function VorhabenScreen({navigation}) {

    //console.log('VorhabenScreen', navigation);
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isLoadSetting, setLoadSetting] = useState(true);
    const [settings, setSettings] = useState([]);


    async function fetchData() {

        let toolUri = '';
        try{
            loadSettings();
            toolUri = settings[0].toolUri;
        }
        catch (error){
            toolUri = testUrl;
            console.log('testUrl ', toolUri);
        }
        try{
            if (!toolUri || isLoadSetting) {
                alert("Fehler beim Laden der Daten! (1)");
                // setData([]); // Data nich löschen um ggf. offline Daten zu erhalten
                setLoading(false);
                // console.error('undefinedToolUri', settings);
                loadSettings();
                toolUri = settings[0].toolUri;
            }
            if (!toolUri) {
                toolUri = testUrl;
                // console.error('ToolUri1 ', toolUri);
            }
            //setData([]);  // Data nich löschen um offline Daten zu erhalten.
            toolUri = toolUri + appPfad;
            console.log('toolUri ', toolUri);
        }catch(error){
            console.error('setting: ', error);
        }
        try {
            // console.log('CallToolURL', toolUri);
            const respons = await fetch(toolUri);
            //console.log('respons', respons);
            const json = await respons.json();
            setData(json.results);
        } catch (error) {
            alert("Fehler beim Laden der Daten! \n[ " + error + " ]");
            console.error(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function loadSettings() {
        setLoadSetting(true);
        let settingsFromDb = await AsyncStorage.getItem('settings');
        let settingArray = JSON.parse(settingsFromDb);
        if(null === settingArray){
            settingArray = [{'toolUri': toolUri}];
        }
        setSettings(settingArray);
        // console.log('loadSetting', settings);
        // console.log('loadToolUri', settings[0].toolUri);
        setLoadSetting(false);
    }

    if (isLoading) {
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
                    <View style={styles.listSepperator}/>
                }
                ListEmptyComponent={<Text style={{textAlign: 'center'}}>Es konnten keine Daten geladen werden! (Bitte
                    erneut versuchen.)</Text>}
            />
        </View>
    );
}

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingTop: 30,
    },
    center:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    listSepperator:
    {
      borderWidth: StyleSheet.hairlineWidth,
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
  