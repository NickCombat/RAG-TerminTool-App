import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator } from 'react-native';

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
        loadSettings();
        try{
            if(!settings){
                loadSettings();
            }
            if(!settings[0].toolUri){
                alert( 'Keine URL in Settings');
                loadSettings();
            }
            const toolUri = settings[0].toolUri + "/api/anmelden/" + anmeldeId + "?name=" + anmeldung.name + "&vorname=" + anmeldung.vorname;

            const response = await fetch(toolUri, {
                method: "GET"
            });
            const json = await response.json();
            setAnmeldeStatus('gesetzt');
            setAnmeldeText(json.results);
        }
        catch(error)
        {
            setAnmeldungProcess(false);
            alert("Die Anmeldung konnte nicht versendet werden.");
            console.error('Error: ', error);
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
            settingArray = [{'toolUri': toolUri}];
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
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
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
  
