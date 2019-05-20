import React, { Component } from 'react';
import { Font, Constants, DeviceInfo } from 'expo';
import { WebView, Dimensions, BackHandler } from 'react-native';
import { Container, Content, List, ListItem, Text } from 'native-base';
import { showFont } from '../../Redux/actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Index extends Component{

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Disclaimer'
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
           <Content>
              <List>
                <ListItem itemDivider>
                  <Text>Privacy Policy</Text>
                </ListItem>                    
                <ListItem>
                  <Text>We do not store any user data in our server.</Text>
                </ListItem>
                <ListItem>
                  <Text>All data stored in app itself</Text>
                </ListItem>
                <ListItem itemDivider>
                  <Text>Terms & Conditions</Text>
                </ListItem>  
                <ListItem>
                  <Text>By using this app, you agree that you are aware of using this app.</Text>
                </ListItem>
              </List>
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
