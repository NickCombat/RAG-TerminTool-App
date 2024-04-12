import { Pressable, StyleSheet, Text } from 'react-native';

export default function BigButton({onPress, buttonName, style}) {

  return (
      <>
        <Pressable onPress={onPress}
                    style={[styles.button, style]}>
            <Text style={styles.buttontext}>{buttonName}</Text>
        </Pressable>
      </>
  );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: 'darkblue',
    },
    buttontext: {
        color: 'gray',
        fontSize: 18,
    },
});