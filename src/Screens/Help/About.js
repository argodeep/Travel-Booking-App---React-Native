import React, { Component } from 'react';
import { Font, Constants, DeviceInfo } from 'expo';
import { WebView, Dimensions, BackHandler } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Thumbnail } from 'native-base';
import { showFont } from '../../Redux/actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Index extends Component{

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'About Us'
    };
  };


  constructor(props){
    super(props);    
    this.state = {
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('../../assets/fonts/Exo-Light.ttf'),
      'Roboto_medium': require('../../assets/fonts/Exo-Medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
    });
    this.props.showFont()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = ()=>{
    this.props.navigation.goBack()
        return true
  }

  render(){    

    return(
      <Container style={{ marginTop: 0 }}>
      { this.props.loaded ? (
        <Container>
           <Content padder>
              <Card transparent>
                <CardItem>
                  <Body>
                    <Thumbnail style={{height: 80, width: 80, borderRadius: 50, marginBottom: 15, alignSelf: 'center'}} source={require('../../assets/icon.png')} />
                    <Text>
                      Gotripolo is the one travel app you need for your next travel adventure. Get Flight Booking, Search Hotels, Find Great foods Near You, Explore Movies & many more.
                    </Text>
                  </Body>
                </CardItem>
              </Card>
           </Content>
           
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
