import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator } from 'react-native';

export default function Anmeldung(probs) {

    const anmeldeId = probs.vorhabenId;
    const [settings, setSettings] = useState([]);
    const [isAnmeldungProcess, setAnmeldungProcess] = useState(false);
    const [isLoadSetting, setLoadSetting] = useState(true);
    const [anmeldeStatus, setAnmeldeStatus] = useState(null);
    const [anmeldeText, setAnmeldeText] = useState(true);
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
        loadSettings();
        try{
            console.log('sendeAnmeldung', anmeldung);
            if(undefined === settings){
                loadSettings();
                console.error(settings);
            }
            if(undefined === settings[0].toolUri){
                alert( 'Keine URL in Settings');
                console.error(settings);
            }
            const toolUri = settings[0].toolUri + "/api/anmelden/" + anmeldeId;
            console.log('toolUri', toolUri);
        
            const response = await fetch(toolUri, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(anmeldung)
            });
            const json = await response.json();

            console.log('jsonjson', json);
            setAnmeldeStatus(json.success);
            setAnmeldeText(json.results);
        }
        catch(error)
        {
            alert("Die Anmeldung konnte nicht versendet werden.");
            console.error(error);
            console.log('jsonjson', json);
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

    if (null!==anmeldeStatus) {
        return (
            <View
                style={styles.center}
                // :style={{styles.error}}
            >                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      >
                <Text>{anmeldeText}</Text>
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
    center:{
   //     flex: 1,
//justifyContent: 'center',
  //      alignItems: 'center',
    },
    error:{
        color: '#fff',
        backgroundColor: '#999',
        marginTop: 10,
    },
  });
  
