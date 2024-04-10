import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Icon from '@expo/vector-icons';
import VorhabenScreen from './screens/VorhabenScreen';
import VorhabenDetails from './screens/VorhabenDetails';
import SettingsScreen from './screens/SettingScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack(){
    return (
        <Stack.Navigator 
            screenOptions={{
                headerStyle: {backgroundColor: 'aliceblue'},
            }} 
        >
            <Stack.Screen 
                name='VorhabenListe' 
                component={VorhabenScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name='VorhabenDetails' 
                component={VorhabenDetails} 
                options={({route}) => {return{title: route.params.item.name}}}
            />
        </Stack.Navigator>
    )
}

export default function Navigation() {
    return(
      <NavigationContainer>
        <Tab.Navigator 
            screenOptions={({ route }) => {
                return {
                tabBarIcon: ({ focused, size, color }) => {
                    let icon;
                    if (route.name === 'Home')
                    icon = focused ? 'home' : 'home-outline';
                    else if (route.name === 'Setting')
                    icon = focused ? 'settings' : 'settings-outline';
                    return (
                    <Icon.Ionicons
                        name={icon}
                        size={size}
                        color={color}
                    />
                    );
                },
                tabBarActiveTintColor: 'orange',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: 'aliceblue' },
                headerShown: false,
                };
            }}
          >
          <Tab.Screen 
            name="Home" 
            component={HomeStack} 
            options={{
                title: 'Vorhaben Liste',
            }} 
          />
          <Tab.Screen 
            name="Setting" 
            component={SettingsScreen} 
            options={{
                title: 'Einstellungen',
            }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }