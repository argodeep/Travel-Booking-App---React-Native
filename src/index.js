import React, {Component} from 'react';
import { Font } from 'expo';
import getTheme from '../native-base-theme/components';
import { StyleSheet, Text, ActivityIndicator, Alert, View, NetInfo, Switch, BackHandler} from 'react-native';
import { StyleProvider, Root, Container, Content, Form, Item, Input, Label, Icon, Button, Thumbnail} from 'native-base';
import { createStackNavigator, createAppContainer} from 'react-navigation';
import { useScreens } from 'react-native-screens';
useScreens();
import firebase from '../Firebase'

// Redux
import allReducers from './Redux/reducers/index.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

// Screens
import HomeScreen from './Screens/Home/Home/index';
import FoodScreen from './Screens/Home/Food/index';
import SwiggyScreen from './Screens/Home/Food/swiggy';
import FaasosScreen from './Screens/Home/Food/faasos';
import PizzahutScreen from './Screens/Home/Food/pizzahut';
import DominosScreen from './Screens/Home/Food/dominos';
import KFCcreen from './Screens/Home/Food/kfc';
import HelpScreen from './Screens/Help/index';
import AboutScreen from './Screens/Help/About';
import DisclaimerScreen from './Screens/Help/Disclaimer';
import SuggestionScreen from './Screens/Help/webviewSuggestions';
import DonationScreen from './Screens/Help/webviewDonation';
import SelectScreen from './Screens/Home/Flight/select';
import FlightScreen from './Screens/Home/Flight/index';
import SelectCityScreen from './Screens/Home/Flight/city';
import CalenderScreen from './Screens/Home/Flight/calender';





const store = createStore(allReducers);

const RootStack = createStackNavigator(
  {
    Flight: FlightScreen, 
    Calender: CalenderScreen,
    City: SelectCityScreen,
    Home: HomeScreen,
    Help: HelpScreen,
    Suggestion: SuggestionScreen,
    Donation: DonationScreen,
    About: AboutScreen,
    Disclaimer: DisclaimerScreen,
    Food: FoodScreen,
    Swiggy: SwiggyScreen,
    KFC: KFCcreen,
    Dominos: DominosScreen,
    Pizzahut: PizzahutScreen,
    Faasos: FaasosScreen,
    Select: SelectScreen
  },
  {
    initialRouteName: 'Home',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerBackImage: <Icon name="ios-arrow-back" style={{padding: 5}} />,
      headerTintColor: '#444',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily: 'Roboto_medium',
        textAlign: 'center',
        flex: 1
      },
      headerBackTitle: null,
    },
  },
);
let Navigation = createAppContainer(RootStack);


export default class App extends React.Component {

  constructor(props){
      super(props);
      this.toggleSwitch = this.toggleSwitch.bind(this);
      this.state={
        email: '',
        password: '',
        isLoading: true,
        authenticated: "",
        connection_Status : "",
        showPassword: true,
        font: false,
    }
  }
 
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('./assets/fonts/Exo-Light.ttf'),
      'Roboto_medium': require('./assets/fonts/Exo-Medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
    });
    this.setState({ font: true });
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user != null) {
    //     console.log("Login Successfull");
    //     this.setState({ 
    //       authenticated: true
    //     });
    //   } else {
    //     console.log("Login Failed");
    //     this.setState({ 
    //       isLoading: false,
    //       authenticated: false
    //     });
    //   }
    // });
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange );
   
    NetInfo.isConnected.fetch().done((isConnected) => {
 
      if(isConnected == true)
      {
        this.setState({connection_Status : "Online"})
      }
      else
      {
        this.setState({connection_Status : "Offline"})
      }
 
    });
  }
  
 
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this._handleConnectivityChange
 
    );
 
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }


  stringtInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }


  loginuser = (email, password) => {
    if (this.state.email == '' || this.state.password == '' ) {
      Alert.alert("Please Enter Login Details");
    } else {
    this.setState({
       isLoading: true,
    });

    firebase.auth().signInWithEmailAndPassword(email, password).then(function (user)  {
         console.log(user)
         {
            Alert.alert('Login Successfull', '',
      [
        {text: 'Ok', onPress: () => console.log('Login Successfull')},
      ],
      { cancelable: false });
         }
    }).catch((error) => {
      console.log(error.toString());
      {
            Alert.alert('Wrong User Details', '',
      [
        {text: 'Please Check', onPress: () => console.log('Wrong User Details'), style: 'cancel'},
      ],
      { cancelable: false });
      }

      this.setState({
       isLoading: false,
     });
    });
    }
    
  }
 
  _handleConnectivityChange = (isConnected) => {
 
    if(isConnected == true)
      {
        this.setState({connection_Status : "Online"})
      }
      else
      {
        this.setState({connection_Status : "Offline"})
      }
  };

  render() {
    if(this.state.connection_Status == 'Offline')
    return(
      <View style={{position: 'absolute', left: 0, right: 0, top: -50, bottom: 20, alignItems: 'center', justifyContent: 'center'}}>
        <Thumbnail style={{height: 60, width: 60, borderRadius: 50, marginBottom: 15}} source={require('./assets/error.png')} />
          <Text style={{fontSize: 16, fontFamily: 'Roboto_medium', color: '#777'}}>No Internet Connection</Text>
          <Button rounded light block style={{marginLeft: '20%', marginRight: '20%', marginTop: 15}} onPress={() => BackHandler.exitApp()}>
              <Text>Exit App</Text>
          </Button>
      </View>   
    )
    
    // if (this.state.authenticated) {
      return (
        <Provider store={store}>
        <StyleProvider style={getTheme()}>
            <Root>
            { this.state.font == true ? (
            <Navigation />               
            ) : null }
            </Root>
          </StyleProvider>
         </Provider>
      )
    // }
    
    
    // if(this.state.isLoading){
    //   return(
    //     <View style={styles.activity}>
    //       <ActivityIndicator size="large" color="#0000ff"/>
    //       <Text style={{paddingTop: 7, paddingBottom: 7, fontSize: 13}}>Verifying User</Text>
    //     </View>
    //   )
    }

  //   return (
      
  //     <Container>
      
  //     <Content style={{
  //                            paddingLeft: 7,
  //                            paddingRight: 7,
  //                            paddingTop: 3,
  //                            paddingBottom: 0
  //                        }} keyboardShouldPersistTaps={'handled'} style= {{ flex: 1}}>     
  //   <View style={{
  //                            paddingLeft: 15,
  //                            paddingRight: 15,
  //                            paddingTop: 10,
  //                            paddingBottom: 0,
  //                            marginTop: 95
  //                        }}>

  //     <Form style={{
  //                            paddingTop: 0,
  //                            paddingBottom: 10
  //                        }}>


  //     <Label style={{color: 'blue', fontWeight: 'bold', fontSize: 18, textAlign:'center', marginBottom: 20, marginTop: 95}}>Login With Email</Label>              

  //      <Item rounded style={{
  //                             borderColor: '#00BFA5'
  //                        }}>
  //           <Input 
  //             placeholder="Enter Email"
  //             value={this.state.email}
  //             autoCapitalize='none'
  //             onChangeText={(text) => this.stringtInput(text, 'email')}
  //             autoFocus={true}
  //             style={{
  //                              paddingLeft: 15,
  //                              paddingRight: 15,
  //                              paddingTop: 0,
  //                              paddingBottom: 0,
  //                              color: 'gray',
  //                              fontSize: 15,
  //                              textAlign:'center',
  //                              fontWeight: 'bold'
  //                          }}/>

  //         </Item>

  //         <Item rounded style={{
  //                             marginTop: 10,
  //                             borderColor: '#00BFA5'
  //                        }}>
  //           <Input 
  //             placeholder="Enter Password"
  //             value={this.state.password}
  //             secureTextEntry={this.state.showPassword}
  //             autoCapitalize='none'
  //             password={true}
  //             onChangeText={(text) => this.stringtInput(text, 'password')}
  //             style={{
  //                              paddingLeft: 15,
  //                              paddingRight: 15,
  //                              paddingTop: 0,
  //                              paddingBottom: 0,
  //                              color: 'gray',
  //                              fontSize: 15,
  //                              textAlign:'center',
  //                              fontWeight: 'bold'
  //                          }}/>

  //         </Item>
  //       </Form>
  //     </View>

  //      <Button rounded block transparent>
  //       <Label style={{color: 'black', fontSize: 14}}>Show Password</Label>
  //           <Switch
  //           onValueChange={this.toggleSwitch}
  //           value={!this.state.showPassword}
  //       />  
  //       </Button>


  //     <View style={{
  //                            paddingLeft: 35,
  //                            paddingRight: 35,
  //                            paddingTop: 0,
  //                            paddingBottom: 0
  //                        }}>
  //      <Button rounded block success onPress={() => this.loginuser(this.state.email, this.state.password)}>
  //        <Label style={{color: 'white', fontSize: 17}}>Login</Label>
  //       </Button>

  //     </View>
  //     </Content>
  //   </Container>
  //   )
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activity: {
    position: 'absolute',
    backgroundColor: '#fff',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});