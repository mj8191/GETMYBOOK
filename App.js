import {useEffect,useState,useContext} from 'react';
import { NavigationContainer,useNavigation ,DrawerActions,} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import Login from './src/components/auth/Login'
import List from './src/components/buyer/List';
import Register from './src/components/auth/Register';
import EmailVerificationScreen from './src/components/auth/EmailVerificationScreen';
import EmailInput from './src/components/auth/EmailInput';
import OrderStatus from './src/components/buyer/OrderStatus';



import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserContext';




const StackNav = ()=>{
  const {userDetail} = useContext(UserContext);
  const [stateUser,setStateUser] = userDetail;
  

  
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return ( 
   
  <Stack.Navigator screenOptions={{
    orientation: 'portrait',
    headerTitleAlign: 'center'
  }}>
{stateUser?(<>
  
  <Stack.Screen  name='Home' options={{
    headerLeft: () => {
      return (
        <Entypo
          name="menu"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          size={30}
          color="black"
        />
      );
    }
        
   }} component={List} />
<Stack.Screen  name='Login' options={{ headerShown:false}} component={Login} />
<Stack.Screen name="EmailInput" options={{ headerShown:false}} component={EmailInput}/>
<Stack.Screen name='EmailVerificationScreen' options={{ headerShown:false}} component={EmailVerificationScreen} />
<Stack.Screen  name='Register' options={{ headerShown:false}} component={Register} />
<Stack.Screen  name='OrderStatus' options={{ headerShown:false}} component={OrderStatus} />
    
    
    

</>):(<>
<Stack.Screen  name='Login' options={{ headerShown:false}} component={Login} />
<Stack.Screen  name='OrderStatus' options={{ headerShown:false}} component={OrderStatus} />

<Stack.Screen name="EmailInput" options={{ headerShown:false}} component={EmailInput}/>

<Stack.Screen name='EmailVerificationScreen' options={{ headerShown:false}} component={EmailVerificationScreen} />








<Stack.Screen  name='Home' options={{
   
          headerLeft: () => {
            return (
              <Entypo
                name="menu"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                size={30}
                color="black"
              />
            );
          },
        }} component={List} />

    
 <Stack.Screen  name='Register' options={{ headerShown:false}} component={Register} />



</>)}


    </Stack.Navigator>
   
)}

const DrawerNav = () => {
  
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator screenOptions={{
      headerTitleAlign:'center',
      headerShown:false
    }}
      drawerContent={props => <DrawerContent {...props} />}
      >
      <Drawer.Screen name="Stack" component={StackNav} />
    </Drawer.Navigator>
  );
};



function App() {
  const [user,setUser] = useState();
useEffect(()=>{
  _retrieveData();
},[])
   

  const _retrieveData = async () => {

    try {
     const value = await AsyncStorage.getItem('user')
      if (value !== null) {
      const  data =JSON.parse(value);
              setUser(data)
        
      }
    } catch (error) {
      // Error retrieving data
    }
  };
 
  
  return (
    
    <NavigationContainer>
       <UserContext.Provider value={{userDetail:[user,setUser]}}>
        <DrawerNav/>
     
        </UserContext.Provider>
    </NavigationContainer>
   
  );
}
export default App;
export {UserContext};
registerRootComponent(App);
