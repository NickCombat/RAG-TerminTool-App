import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator } from 'react-native';

const testUrl = "https://testragtool.millenni.website";
const appPfad = '/api/anmelden/';

export default function Anmeldung(probs) {

    const anmeldeId = probs.vorhabenId;
    const [settings, setSettings] = useState([]);
    const [isAnmeldungProcess, setAnmeldungProcess] = useState(false);
    const [isLoadSetting, setLoadSetting] = useState(true);
    const [anmeldeStatus, setAnmeldeStatus] = useState(null);
    const [anmeldeText, setAnmeldeText] = useState(null);
    const [anmeldeVorname, setAnmeldeVorname] = useState("");
    const [anmeldeName, setAnmeldeName] = useState("");
    const trackedVorname = (text) => {
        setAnmeldeVorname(text);
    };
    const trackedName = (text) => {
        setAnmeldeName(text);        
    };
    const onClickAnmelden = (anmeldeVorname, anmeldeName) => {
        const anmeldungData = {'id': anmeldeId, 'name': anmeldeName, 'vorname': anmeldeVorname};
        sendeAnmeldung(anmeldungData);
    };
     
    async function sendeAnmeldung(anmeldung){

        setAnmeldungProcess(true);
        setAnmeldeStatus('error');
        let toolUri = '';
        try{
            loadSettings();
            toolUri = settings[0].toolUri;
        }
        catch (error){
            toolUri = testUrl;
            console.log('testUrl ', toolUri);
        }
        alert("toolUri: \n[" + toolUri + "]");

        try{
            if (!toolUri || isLoadSetting) {
                alert("Fehler beim Laden der Daten! (1)");
                loadSettings();
                toolUri = settings[0].toolUri;
            }
            if (!toolUri) {
                toolUri = testUrl;
            }
            toolUri = toolUri + appPfad + anmeldeId + "?name=" + anmeldung.name + "&vorname=" + anmeldung.vorname;
        }catch(error){
            console.error('setting: ', error);
        }

        try{
            const response = await fetch(toolUri,{method: "GET"});
            const json = await response.json();
            setAnmeldeStatus('gesetzt');
            setAnmeldeText(json.results);
        }
        catch(error)
        {
            setAnmeldungProcess(false);
            alert("Die Anmeldung konnte nicht versendet werden.");
            console.error('anmeldung: ', error);
        }
        setAnmeldungProcess(false);
    }

    if(isAnmeldungProcess){
        return (
            <View style={styles.center}>
                <ActivityIndicator size={'large'} color={'darkblue'}/>
            </View>
        );
    }
    
    async function loadSettings() {
        setLoadSetting(true);
        let settingsFromDb = await AsyncStorage.getItem('settings');
        let settingArray = JSON.parse(settingsFromDb);
        if(null === settingArray){
            settingArray = [{'toolUri': testUrl}];
        }
        setSettings(settingArray);
        setLoadSetting(false);
    }

    if (null!==anmeldeText) {
        return (
            <View
                style={styles.center}
            >
                <Text style={styles.anmeldeStatus}>{anmeldeText}</Text>
            </View>
        );
    }

    return (
    <View>
        <View style={styles.container}>
            <TextInput 
                style={styles.textInput}
                placeholder='Vorname'
                onChangeText={trackedVorname}
            />
        </View>
        <View style={styles.container}>
            <TextInput 
                style={styles.textInput}
                placeholder='Name'
                onChangeText={trackedName}
            />
        </View>
        <View style={styles.container}>
            <Button title="Anmelden" onPress={() => onClickAnmelden(anmeldeVorname, anmeldeName)}/>
        </View>
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 5,
    },
    textInput:{
        height: 40,
        backgroundColor: '#eee',
        borderColor: '#000',
        borderWidth: 1,
    },
    center: {
        //flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    anmeldeStatus:{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
    },
    gesetzt:{
        color: '#fff',
        backgroundColor: '#74cc5c',
        marginTop: 10,
    },
    error:{
        color: '#fff',
        backgroundColor: '#d57070',
        marginTop: 10,
    },
  });
  
