import React, { Component } from 'react';
import { Font, Constants, Location, Permissions } from 'expo';
import { WebView, Dimensions, Platform, BackHandler } from 'react-native';
import { Container, Tabs, Tab } from 'native-base';
import { showFont } from '../../Redux/actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Index extends Component{

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    // title: 'MakeMyTrip'
    };
  };


  constructor(props){
    super(props);    
    this.WEBVIEW_REF = React.createRef();
    this.state = {
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
      'Roboto': require('../../assets/fonts/Exo-Light.ttf'),
      'Roboto_medium': require('../../assets/fonts/Exo-Medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
    });
    this.props.showFont()
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
    if (this.state.canGoBack == false) {
        this.props.navigation.navigate('Help')
        return false
    } else {
        this.WEBVIEW_REF.current.goBack();
        return true
    }
    console.log(this.state.canGoBack)
  }
 
  onNavigationStateChange(navState) {
   this.setState({
     canGoBack: navState.canGoBack
   });
  }
  
  render(){

    var jsCode = `
        document.querySelector('.listingHeaderMain').style.display = 'none',
        document.querySelector('#flightsContainer').style.marginTop = '-125px';
    `;

    return(
      <Container style={{ marginTop: Constants.statusBarHeight }}>
      { this.props.loaded ? (
        <Container>
        <WebView
           style={{height: Dimensions.get('window').height}}
           userAgent="Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Mobile Safari/537.36"
           injectedJavaScript={jsCode}
           source={{uri: 'https://www.swiggy.com/support/issues/faq'}}
           startInLoadingState={true}
           scalesPageToFit={true}
           javaScriptEnabled={true}
           domStorageEnabled={true}
           thirdPartyCookiesEnabled={true}
           scrollEnabled={false}
           geolocationEnabled={true}
           useWebKit={true} 
           ref={this.WEBVIEW_REF}
           onNavigationStateChange={this.onNavigationStateChange.bind(this)}
           allowUniversalAccessFromFileURLs={true}
         />
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

  