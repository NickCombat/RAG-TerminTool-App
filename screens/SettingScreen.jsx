import {useState} from 'react';
import {Platform, KeyboardAvoidingView, TextInput, SectionList, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BigButton from '../components/BigButton.jsx';

export default function SettingScreen() {
    const [tooluri, setTooluri] = useState("");
    const [settings, setSettings] = useState([]);

    function saveSetting() {
        const newTooluri = tooluri.trim();
        const newToolName= tooluri.trim();
        if (0 === newTooluri.length || 0 === newToolName.length) {
            alert("Die Eingabe Felder müssen beide gefüllt werden.");

            return;
        }
        let settings = { toolUri: newTooluri, toolName: newToolName };
        console.log('settingsSave', JSON.stringify(settings));

        AsyncStorage.setItem('settings', JSON.stringify(settings));
        setTooluri(newTooluri);
        alert("Die Settings wurden gespeichert!");
    }

    function cancelForm() {
        onCancel();
        setTooluri("");
    }

    if(undefined === settings )
    {
        loadSettings();
    }

    async function loadSettings(){

      let settingsFromDb = await AsyncStorage.getItem('settings');
      let settingArray = JSON.parse(settingsFromDb);
    
      setSettings(settingArray);
    }

    return (
        <View style={styles.container}>
            <Text>Einstellungs Liste</Text>
            <SectionList
                sections={[
                    {title: "Version", data: [{name: "1.1.14"}]},
                    {title: "App URL", data: [{name: settings.toolUri}]},
                    {
                        title: "Impressum",
                        data: [
                            {name: "RAG Hude - RAG TerminTool https://rag.rk-hude.de"},
                        ],
                    },
                ]}
                renderItem={({item}) => <Text>{item.name}</Text>}
                renderSectionHeader={({section}) => (
                    <Text style={styles.sections}>{section.title}</Text>
                )}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TextInput
                    placeholder="Tool URI"
                    multiline={true}
                    onChangeText={setTooluri}
                    style={[styles.input, styles.inputText]}
                />
                <BigButton
                    onPress={saveSetting}
                    buttonName={"Speichern"}
                    style={styles.add}
                />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    sections: {
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'lightblue'
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        width: 300,
        textAlign: 'left',
        padding: 5,
        paddingLeft: 10,
        fontSize: 12,
        marginBottom: 10
    },
    inputText: {
        height: 45,
        textAlignVertical: 'top',
    },
    add: {
        width: 150,
        padding: 10,
        borderWidth: 1,
    },
    cancel: {
        position: 'absolute',
        top: 30,
        left: 10,
        padding: 10,
    },
});
  