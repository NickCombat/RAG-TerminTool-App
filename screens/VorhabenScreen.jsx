import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VorhabenListeItem from '../components/VorhabenListeItem';

const appPfad = '/api/liste';

export default function VorhabenScreen({navigation}) {

    //console.log('VorhabenScreen', navigation);
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isLoadSetting, setLoadSetting] = useState(true);
    const [settings, setSettings] = useState([]);

    async function fetchData() {
        setLoading(true);
        try {
            let toolUri = settings.toolUri;
            if (undefined === toolUri || isLoadSetting) {
                alert("Fehler beim Laden der Daten! (1)");
                setData([]);
                setLoading(false);
                //console.log('undefinedToolUri', settings);
                //loadSettings();
            }
            //toolUri = "https://testragtool.millenni.website";
            if (toolUri.substring(0, 4) !== 'http') {
                toolUri = "http://" + toolUri;
            }
            toolUri = toolUri + appPfad;
            //console.log('CallToolURL', toolUri);
            const respons = await fetch(toolUri);
            //console.log('respons', respons);
            const json = await respons.json();
            setData(json.results);
            setLoading(false);
        } catch (error) {
            //console.log('error', error);
            alert("Fehler beim Laden der Daten! (2)");
            //console.log('falscheToolUri', settings);
            setData([]);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSettings();
    }, []);

    async function loadSettings() {
        setLoadSetting(true);
        let settingsFromDb = await AsyncStorage.getItem('settings');
        let settingArray = JSON.parse(settingsFromDb);
        setSettings(settingArray);
        setLoadSetting(false);
        fetchData();
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
  