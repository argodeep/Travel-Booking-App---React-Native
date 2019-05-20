import React, { Component } from 'react';
import { Font, Constants, Location, Permissions, WebBrowser } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { WebView, Linking ,Dimensions, Platform, BackHandler, KeyboardAvoidingView, ProgressBarAndroid, View } from 'react-native';
import { Container, Text, Thumbnail, Button, Icon, Toast } from 'native-base';
import { showFont } from '../../../Redux/actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Index extends Component{

  static navigationOptions = ({ navigation }) => {
    return {
        title: 'Enjoy Your Food',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#444',
        headerBackImage: <Icon name="close" style={{padding: 5}} />,
        headerRight: (
          <Ionicons name="ios-help-circle-outline" size={24} color="#444" style={{padding: 5, marginRight: 10}} onPress={() => WebBrowser.openBrowserAsync('https://linksredirect.com/?pub_id=8447CL7862&source=linkkit&url=https%3A%2F%2Fonline.kfc.co.in%2Fabout-kfc%2Ffaq')}/>
        ),
    };
  };


  constructor(props){
    super(props);    
    this.WEBVIEW_REF = React.createRef();
    this.state = {
      visible: true
    }
  }

  async componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
          errorMessage: 'Your Device Is Not Supported!',
        });
      } else {
        this._getLocationAsync();
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    await Font.loadAsync({
      'Roboto': require('../../../assets/fonts/Exo-Light.ttf'),
      'Roboto_medium': require('../../../assets/fonts/Exo-Medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
    });
    this.props.showFont()
    Toast.show({
      text: "Click on 'X' Button to exit",
      buttonText: "Okay",
      duration: 3000
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };


  handleBackButton = ()=>{
    this.WEBVIEW_REF.current.goBack();
    return true
  }

  showSpinner() {
    return (
      <View style={{position: 'absolute', left: 0, right: 0, top: -50, backgroundColor: '#fff', bottom: 20, alignItems: 'center', justifyContent: 'center'}}>
          { this.props.loaded ? (
            <View style={{position: 'absolute', left: 0, right: 0, top: -50, bottom: 20, alignItems: 'center', justifyContent: 'center'}}>
            <Thumbnail style={{height: 100, width: 100, borderRadius: 50}} source={require('../../../assets/kfc.png')} />
              <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={true}
              color="#e4002b"
              style={{width: 100}}
              progress={0.5}
              />
              <Text style={{fontSize: 16, fontFamily: 'Roboto_medium', color: '#444'}}>Order Food Online</Text>
            </View>
          ) : null }
      </View> 
    )
  }

  showerror() {
    return (
    <View style={{position: 'absolute', left: 0, right: 0, top: -50, backgroundColor: '#fff', bottom: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
    { this.props.loaded ? (
      <View style={{position: 'absolute', left: 0, right: 0, top: -50, bottom: 20, alignItems: 'center', justifyContent: 'center'}}>
        <Thumbnail style={{height: 60, width: 60, borderRadius: 50, marginBottom: 15}} source={require('../../../assets/error.png')} />
        <Text style={{fontSize: 16, fontFamily: 'Roboto_medium', color: '#777'}}>Error Fetching Data</Text>
        {/* <Button rounded block style={{marginLeft: '20%', marginRight: '20%', marginTop: 15}} onPress={() => this.WEBVIEW_REF.current.reload()}>
            <Text>Retry</Text>
        </Button> */}

        <Button rounded light block style={{marginLeft: '20%', marginRight: '20%', marginTop: 15}} onPress={() => this.props.navigation.goBack()}>
            <Text>Go Back</Text>
        </Button>
      </View>
    ) : null }
    </View> 
    )
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  onNavigationStateChange(navState) {
      this.setState({
        canGoBack: navState.canGoBack,
      });
      Linking.canOpenURL("mailto:")
      .then((supported) => {
        if (supported && navState.url.toString().includes("mailto")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      Linking.canOpenURL("tel:")
      .then((supported) => {
        if (supported && navState.url.toString().includes("tel:")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      Linking.canOpenURL("https://")
      .then((supported) => {
        if (supported && navState.url.toString().includes("youtube")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      Linking.canOpenURL("https://")
      .then((supported) => {
        if (supported && navState.url.toString().includes("youtu.be")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      Linking.canOpenURL("https://")
      .then((supported) => {
        if (supported && navState.url.toString().includes("goo.gl/maps/")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      Linking.canOpenURL("https://")
      .then((supported) => {
        if (supported && navState.url.toString().includes("play.google.com/")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      Linking.canOpenURL("https://")
      .then((supported) => {
        if (supported && navState.url.toString().includes("geo:")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      Linking.canOpenURL("https://")
      .then((supported) => {
        if (supported && navState.url.toString().includes("whatsapp://")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      Linking.canOpenURL("https://")
      .then((supported) => {
        if (supported && navState.url.toString().includes("intent://")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      Linking.canOpenURL("http://")
      .then((supported) => {
        if (supported && navState.url.toString().includes("invoice") || navState.url.toString().includes("download")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      Linking.canOpenURL("https://")
      .then((supported) => {
        if (supported && navState.url.toString().includes("m.me/")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      Linking.canOpenURL("https://")
      .then((supported) => {
        if (supported && navState.url.toString().includes("maps.google.com/")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      Linking.canOpenURL("https://")
      .then((supported) => {
        if (supported && navState.url.toString().includes("sharer.php")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      Linking.canOpenURL("https://")
      .then((supported) => {
        if (supported && navState.url.toString().includes("share")) {
          this.props.navigation.goBack()
          return Linking.openURL(navState.url);
        }
      })
      .catch((err) => console.error('An error occurred', err)); 

      if (navState.url.toString().includes("my-account/orders")) {
        Toast.show({
          text: "Double tap on invoice for download",
          buttonText: "Okay",
          duration: 3000,
          type: "success"
        })
      }
   }
  
  render() {
    if (Platform.OS === "ios") {
      var softkeys = Dimensions.get('screen').height - Dimensions.get('window').height;
      var heightView = Dimensions.get('screen').height - softkeys - 64 - Constants.statusBarHeight
    }

    if (Platform.OS === "android") {
      var softkeys = Dimensions.get('screen').height - Dimensions.get('window').height;
      var heightView = Dimensions.get('screen').height - softkeys - 56 - Constants.statusBarHeight
    }

    return(
      <Container style={{ marginTop: 0 }} showsVerticalScrollIndicator={false}>
      {this.state.visible ? (
          <View style={{height: 4, alignItems: 'center', justifyContent: 'center'}}>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={true}
              color="#e4002b"
              style={{width: '100%', marginTop: 0, paddingTop: 0}}
              progress={0.7}
              />
          </View>
           
          ) : null}
       { this.props.loaded ? (
        <Container style={{backgroundColor: '#fff', marginTop: 0}}>
        <KeyboardAvoidingView behavior="padding" style={{height: heightView, backgroundColor: '#fff'}} enabled>
          <WebView
            style={{height: heightView, backgroundColor: '#fff'}}
            userAgent={"Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Mobile Safari/537.36"}
            source={{uri: 'https://linksredirect.com/?pub_id=8447CL7862&source=linkkit&url=https%3A%2F%2Fonline.kfc.co.in%2Fhome'}}
            startInLoadingState={true}
            scalesPageToFit={true}
            bounces={true}
            originWhitelist={['*', 'mailto:']}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            thirdPartyCookiesEnabled={true}
            scrollEnabled={false}
            geolocationEnabled={true}
            useWebKit={true} 
            ref={this.WEBVIEW_REF}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            allowUniversalAccessFromFileURLs={true}
            automaticallyAdjustContentInsets={false}
            mixedContentMode="compatibility"
            allowsInlineMediaPlayback={true}
            onLoadStart={() => this.show()}
            onLoadEnd={() => this.hide()}
            renderLoading={() => this.showSpinner()}
            renderError={() => this.showerror()}
            onError={() => this.showerror()}
          />
        </KeyboardAvoidingView>
       </Container>
        ) : null }
      </Container>
    );
  }
}

function mapStateToProps(state){
  return{
    loaded: state.loaded,
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({showFont: showFont}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Index);

  