import { SectionList, StyleSheet, Text, View } from 'react-native';

export default function SettingScreen() {
    return (
      <View style={styles.container}>
        <Text>Einstellungs Liste</Text>
        <SectionList 
          sections={[
            {title: 'Version', data: [{name: '1.0.0'}]},
            
            {title: 3, data: [{name: 'C'}]},


            {title: 'Impressum', data: [{name: 'RAG Hude - RAG TerminTool'}]},
          ]}
          renderItem={({item}) => <Text>{item.name}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sections}>{section.title}</Text>}
        />
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
  });
  