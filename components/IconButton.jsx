import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';


export default function IconButton({onPress, icon, style}) {

  return (
      <>
        <Pressable 
            onPress={onPress} 
            style={style}>
              <MaterialIcons 
                name={icon} 
                size={36} 
                color="darkblue"/>
        </Pressable>
      </>
  );
}