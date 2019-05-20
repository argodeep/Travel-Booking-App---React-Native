import React, { Component } from 'react';
import { Font, Constants, WebBrowser } from 'expo';
import { Linking } from 'react-native';
import { Container, Content, ActionSheet, Text, Grid, Col, Row, Card, Header, List, Subtitle, ListItem, Footer, FooterTab, Badge, Segment, Thumbnail, Icon, Right, Left, Body, Button, Title, CardItem, Item, Label, Input, Form } from 'native-base';
import { showFont } from '../../Redux/actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import styles from './style.js';

class Index extends Component{

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
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

  }

  homeNavigation(){
    this.props.navigation.navigate('Home')
  }

  offerNavigation(){
    this.props.navigation.navigate('Help')
  }

  bookingNavigation(){
    this.props.navigation.navigate('Help')
  }

  helpNavigation(){
    this.props.navigation.navigate('Help')
  }

  donation(){
    //WebBrowser.openBrowserAsync('https://www.instamojo.com/@gotripolo/lc0413cd34deb49668e6b634ec29eca34/');
    this.props.navigation.navigate('Donation')
  }

  suggestion(){
    this.props.navigation.navigate('Suggestion')
  }

  about(){
    this.props.navigation.navigate('About')
  }

  disclaimer(){
    this.props.navigation.navigate('Disclaimer')
  }

  render(){
    return(
      <Container>
      { this.props.loaded ? (
        <Container>
         <Content style={{ marginTop: Constants.statusBarHeight, }}>
          <Header style={{backgroundColor: '#fff'}}>
            <Body>
              <Title style={{color: '#444', marginLeft: 10}}>Help Center</Title>
            </Body>
          </Header>
          <List>
            
            <ListItem itemDivider>
                <Text style={{color: '#888'}}>Call Customer Care</Text>
            </ListItem>                    
            <ListItem onPress={ ()=>{ Linking.openURL('tel:1800 102 8747')}}>
              <Left>
                <Text style={{color: '#666', marginLeft: 10}}>MakeMyTrip (1800 102 8747)</Text>
              </Left>
              <Right>
                <Icon name="ios-call" />
              </Right>
            </ListItem>
            <ListItem onPress={ ()=>{ Linking.openURL('tel:095953 33333')}}>
              <Left>
                <Text style={{color: '#666', marginLeft: 10}}>Cleartrip (095953 33333)</Text>
              </Left>
              <Right>
                <Icon name="ios-call" />
              </Right>
            </ListItem>
            <ListItem onPress={ ()=>{ Linking.openURL('tel:011 4313 1313')}}>
              <Left>
                <Text style={{color: '#666', marginLeft: 10}}>EasemyTrip (011 4313 1313)</Text>
              </Left>
              <Right>
                <Icon name="ios-call" />
              </Right>
            </ListItem>
            <ListItem onPress={ ()=>{ Linking.openURL('tel:1800 208 1060')}}>
              <Left>
                <Text style={{color: '#666', marginLeft: 10}}>Goibibo (1800 208 1060)</Text>
              </Left>
              <Right>
                <Icon name="ios-call" />
              </Right>
            </ListItem>
            <ListItem onPress={ ()=>{ Linking.openURL('tel:022 4066 6444')}}>
              <Left>
                <Text style={{color: '#666', marginLeft: 10}}>AkbarTravels (022 4066 6444)</Text>
              </Left>
              <Right>
                <Icon name="ios-call" />
              </Right>
            </ListItem>
            <ListItem onPress={ ()=>{ Linking.openURL('tel:080000 16075')}}>
              <Left>
                <Text style={{color: '#666', marginLeft: 10}}>Booking.com (080000 16075)</Text>
              </Left>
              <Right>
                <Icon name="ios-call" />
              </Right>
            </ListItem>
            <ListItem onPress={ ()=>{ Linking.openURL('tel:0120-4880-880')}}>
              <Left>
                <Text style={{color: '#666', marginLeft: 10}}>Paytm Travel (0120-4880-880)</Text>
              </Left>
              <Right>
                <Icon name="ios-call" />
              </Right>
            </ListItem>
            <ListItem onPress={ ()=>{ Linking.openURL('tel:+91 70 4242 4242')}}>
              <Left>
                <Text style={{color: '#666', marginLeft: 10}}>Fab Hotels (+91 70 4242 4242)</Text>
              </Left>
              <Right>
                <Icon name="ios-call" />
              </Right>
            </ListItem>
            <ListItem onPress={ ()=>{ Linking.openURL('tel:093139 31393')}}>
              <Left>
                <Text style={{color: '#666', marginLeft: 10}}>OYO Rooms (093139 31393)</Text>
              </Left>
              <Right>
                <Icon name="ios-call" />
              </Right>
            </ListItem>
            <ListItem onPress={ ()=>{ Linking.openURL('tel:9322 800 100')}}>
              <Left>
                <Text style={{color: '#666', marginLeft: 10}}>Treebo Hotels (9322 800 100)</Text>
              </Left>
              <Right>
                <Icon name="ios-call" />
              </Right>
            </ListItem>

            <ListItem onPress={ ()=>{ Linking.openURL('tel:0120-4728-728')}}>
              <Left>
                <Text style={{color: '#666', marginLeft: 10}}>Paytm Movies (0120-4728-728)</Text>
              </Left>
              <Right>
                <Icon name="ios-call" />
              </Right>
            </ListItem>

            <ListItem itemDivider>
            <Text style={{color: '#888'}}>App Version 1.0</Text>
            </ListItem>  
            <ListItem onPress={() => this.about()}>
              <Text style={{color: '#666', marginLeft: 10}}>About Us</Text>
            </ListItem>
            <ListItem onPress={() => this.disclaimer()}>
              <Text style={{color: '#666', marginLeft: 10}}>Disclaimers</Text>
            </ListItem>
            <ListItem onPress={() => this.suggestion()}>
              <Text style={{color: '#666', marginLeft: 10}}>Send Feedback</Text>
            </ListItem>
            <ListItem onPress={() => this.donation()}>
              <Text style={{color: '#666', marginLeft: 10}}>Donate Us</Text>
            </ListItem>
 
          
          </List>
        </Content>
        <Footer style={{borderTopWidth: 0.4, elevation: 10, borderTopColor: '#888'}}>
              <FooterTab>
                <Button vertical onPress={() => this.homeNavigation()}>
                  <Icon name="navigate" />
                  <Text>Explore</Text>
                </Button>
                <Button vertical onPress={() => this.offerNavigation()}>
                  <Icon name="pricetags" />
                  <Text>Offers</Text>
                </Button>
                <Button vertical onPress={() => this.bookingNavigation()}>
                  <Icon name="briefcase" />
                  <Text>Booking</Text>
                </Button>
                <Button active vertical onPress={() => this.helpNavigation()}>
                  <Icon name="help-buoy" />
                  <Text>Help</Text>
                </Button>
              </FooterTab>   
          </Footer>
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
