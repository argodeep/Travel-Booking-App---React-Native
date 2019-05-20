import React, { Component } from 'react';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Image, FlatList, View} from 'react-native'
import { Container, Content, ActionSheet, Text, Grid, Col, Row, Card, Header, List, ListItem, Footer, FooterTab, Badge, Segment, Thumbnail, Icon, Right, Left, Body, Button, Title, CardItem, Item, Label, Input, Form } from 'native-base';
import { showFont, roundTrip, onewayTrip } from '../../../Redux/actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import styles from './style.js';
import moment from 'moment';
import axios from 'axios';



var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

const data = [
  {
    imageUrl: "https://imgak.mmtcdn.com/seo/cms-staticpages/sites/default/files/content_images/offer/537x350-Mobiwik02-21092018.jpg",
    title: "Get10% MobiKwik SuperCash",
    url: "https://www.makemytrip.com/promos/mobikwik-17102018.html"
  },
  {
    imageUrl: "https://imgak.mmtcdn.com/seo/cms-staticpages/sites/default/files/content_images/offer/dh-537x350-02042019.jpg",
    title: "Rs.1,800 OFF on Dom Hotel"
  },

  {
    imageUrl: "https://assets.oyoroomscdn.com/dealtile/small/20190207_web_tile_couple.jpg",
    title: "5% cashback upto Rs.250"
  }
];


class Index extends Component{

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Search Flight',
      header: null,
      headerMode: 'none',
      navigationOptions: {
          headerVisible: false,
      }
    };
  };


  constructor(props){
    super(props);    
    this.state = {
      startDate: '',
      untilDate: '',
      defaultCity1: {
        city: 'Delhi',
        iata: 'DEL',
        airport: 'Delhi Airport'
      },
      defaultCity2: {
        city: 'Mumbai',
        iata: 'BOM',
        airport: 'Chhatrapati Shivaji International Airport'
      },
      departCity: {},
      returnCity: {},
      origin: false,
      destination: false,
      departureDate: [],
      dateQuotes: [],
      data: data
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('../../../assets/fonts/Exo-Light.ttf'),
      'Roboto_medium': require('../../../assets/fonts/Exo-Medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
    });
    this.props.showFont()
  }

  componentDidUpdate(prevProps) {
    const { navigation } = this.props  
    const departDate = navigation.getParam('startDate');
    const returnDate = navigation.getParam('returnDate');
    const departCity = navigation.getParam('depart');
    const returnCity = navigation.getParam('return'); 
    const selectedAirport = navigation.getParam('selectedAirport');
      if (departCity == true && selectedAirport != prevProps.navigation.getParam('selectedAirport')) {
        this.setState({
              departCity: selectedAirport,
              origin: true
        });
      }

      if (returnCity == true && selectedAirport != prevProps.navigation.getParam('selectedAirport')) {
        this.setState({
              returnCity: selectedAirport,
              destination: true
        });
      }
  }


  dateSelect() {
    if (this.props.roundDate == false) {
    if (this.props.navigation.getParam('startDate') != undefined) {
      this.props.navigation.navigate('Calender',  {
        round: this.props.roundDate,
        startDate: this.props.navigation.getParam('startDate')
      });
    }
    if (this.props.navigation.getParam('startDate') == undefined) {
      this.props.navigation.navigate('Calender',  {
        round: this.props.roundDate,
        startDate: new Date()
      });
    }
    }
    if (this.props.roundDate == true) {
      if (this.props.navigation.getParam('returnDate') != undefined) {
        this.props.navigation.navigate('Calender',  {
          round: this.props.roundDate,
          startDate: this.props.navigation.getParam('startDate'),
          returnDate: this.props.navigation.getParam('returnDate')
        });
      }
      if (this.props.navigation.getParam('returnDate') == undefined) {
        this.props.navigation.navigate('Calender',  {
          round: this.props.roundDate,
          startDate: new Date(),
          returnDate: new Date(Date.now() + 1*24*60*60*1000),
        });
      }
    }
  }

  adults(){
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: "Testing ActionSheet"
      },
      buttonIndex => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
      })
  }

  roundTripDate () {
    this.props.roundTrip()
  }

  oneWayDate () {
    this.props.onewayTrip()
  }

  getdepartureDates () {   
    // var month = new Date().getMonth() + 1
    // var year =  new Date().getFullYear()
    // var nextYear =  new Date().getFullYear() + 1

    // for (var i = month; i < 13; i++) {
      
    //   if (i < 10) {
    //     var newMonth = ('0' + i)
    //   }
      
    //   if (i >= 10)  {
    //     var newMonth = i
    //   }
    //   var date = moment(year + '-' + newMonth).format("YYYY-MM")
    //   if (this.state.departureDate.indexOf(date) === -1) {
    //       this.state.departureDate.push(date)
    //   }      
    // }

    // for (var j = 1; j < month; j++) {
      
    //   if (j < 10) {
    //     var newMonth = ('0' + j)
    //   }
      
    //   if (j >= 10)  {
    //     var newMonth = j
    //   }
    //   var newDate = moment(nextYear + '-' + newMonth).format("YYYY-MM")
    //   if (this.state.departureDate.indexOf(newDate) === -1) {
    //       this.state.departureDate.push(newDate)
    //   }
    // }

    // for (var k = 0 ; k < this.state.departureDate.length; k++) {
    //        axios.get(
    //           "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/IN/INR/en-US/BLR-sky/IXA-sky/" + this.state.departureDate[k], {
    //         headers: {
    //           "X-Rapidapi-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    //           "X-Rapidapi-Key": "bb1bc006b4msh1940f798eb8aebdp148dd4jsna2e791ea5b8d"
    //         }
    //         }).then(res => {
    //             if (this.state.dateQuotes.indexOf(res.data.Dates) === -1) {
    //               this.state.dateQuotes.push(res.data.Dates)
    //             }
    //             console.log(this.state.dateQuotes.length)
    //             //console.log(this.state.dateQuotes[0].OutboundDates.map(route => route.PartialDate))
    //         })   
    // }
    // this.getDates()
  }


  async getDates () {
    // console.log(this.state.dateQuotes.length)
    // await this.state.dateQuotes.forEach(id => {
    //  // console.log(id.OutboundDates.map(route => route.PartialDate))
      
    // });
  }

  departSelect () {
    this.props.navigation.navigate('City', {
      departCity: true
    });
  }

  returnSelect () {
    this.props.navigation.navigate('City', {
      returnCity: true
    });
  }

  swipe () {
    const origin =  this.state.departCity
    const destination =  this.state.returnCity
    this.setState({
      departCity: destination,
      returnCity: origin,
    });
  }

  helpNavigation(){
    this.props.navigation.navigate('Help')
  }

  food(){
    this.props.navigation.navigate('Food')
  }

  flight(){
    this.props.navigation.navigate('Flight')
  }


  render(){
    const { navigation } = this.props;
    const departDate = navigation.getParam('startDate');
    const returnDate = navigation.getParam('returnDate');    

    return(
      <Container showsVerticalScrollIndicator={false}>
      { this.props.loaded ? (
         <Container>
          <Content>
            <Image style={styles.headerImage} source={require('../../../assets/flight.jpg')} />
              {/* <Text style={styles.headerTitle}>Search Flights</Text> */}
              <Card style={styles.flightContent}>
                  <CardItem>

                    <Grid style={{width: '100%'}}>
                      <Row style={{width: '100%'}}>
                        <View style={{width: '25%', padding: 10, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.flight()}>
                          <Ionicons name="ios-airplane" size={32} color="#e91e63" style={{padding: 5}}  onPress={() => this.flight()}/>
                          <Text style={{fontSize: 12, fontFamily: 'Roboto_medium', color: '#777'}}  onPress={() => this.flight()}>
                              Flight
                          </Text>
                        </View>
                        <View style={{width: '25%', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                          <Ionicons name="ios-bed" size={32} color="#2196f3" style={{padding: 5}} />
                          <Text style={{fontSize: 12, fontFamily: 'Roboto_medium', color: '#777'}} >
                              Hotel
                          </Text>
                        </View>
                        <View style={{width: '25%', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                          <Ionicons name="ios-train" size={32} color="#ab003c" style={{padding: 5}} />
                          <Text style={{fontSize: 12, fontFamily: 'Roboto_medium', color: '#777'}} >
                              Train
                          </Text>
                        </View>
                        <View style={{width: '25%', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                          <Ionicons name="ios-bus" size={32} color="#ff5722" style={{padding: 5}} />
                          <Text style={{fontSize: 12, fontFamily: 'Roboto_medium', color: '#777'}} >
                              Bus
                          </Text>
                        </View>
                      </Row>
                      <Row style={{width: '100%'}}>
                        <View style={{width: '25%', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                          <Ionicons name="ios-compass" size={32} color="#673ab7" />
                          <Text style={{fontSize: 12, fontFamily: 'Roboto_medium', color: '#777'}} >
                              Visa
                          </Text>
                        </View>
                        <View style={{width: '25%', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                          <Ionicons name="ios-car" size={32} color="#00e676" style={{padding: 5}} />
                          <Text style={{fontSize: 12, fontFamily: 'Roboto_medium', color: '#777'}} >
                              Rental
                          </Text>
                        </View>
                        <View style={{width: '25%', padding: 10, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.food()}>
                          <Ionicons name="ios-restaurant" size={32} color="#801313" style={{padding: 5}} onPress={() => this.food()} />
                          <Text style={{fontSize: 12, fontFamily: 'Roboto_medium', color: '#777'}} onPress={() => this.food()}>
                              Food
                          </Text>
                        </View>
                        <View style={{width: '25%', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                          <Ionicons name="ios-videocam" size={32} color="#0d47a1" style={{padding: 5}} />
                          <Text style={{fontSize: 12, fontFamily: 'Roboto_medium', color: '#777'}} >
                              Movie
                          </Text>
                        </View>
                      </Row>
                    </Grid>                  
                  </CardItem>
                </Card>
                <Text style={{fontSize: 18, fontFamily: 'Roboto_medium', color: '#555', textAlign: 'left', marginTop: 10, marginLeft: 10 }}>Exciting Deals</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.state.data}
                  renderItem={({ item: rowData }) => {
                    return (
                      <Content>
                        <Card style={styles.booking}>
                          <CardItem>
                              <Body>
                                <Text style={{fontSize: 13, fontFamily: 'Roboto_medium', color: '#777', textAlign: 'center' }}>{rowData.title}</Text>
                              </Body>
                          </CardItem>
                          <CardItem cardBody>
                              <Image source={{uri: rowData.imageUrl}} style={{height: 130, width: null, flex: 1, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}/>
                          </CardItem>
                        </Card>
                      </Content>
                    );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                 
              
              </Content>
              <Footer style={{borderTopWidth: 0.4, elevation: 10, borderTopColor: '#888'}}>
                <FooterTab>
                  <Button active vertical>
                    <Icon name="navigate" />
                    <Text>Explore</Text>
                  </Button>
                  <Button vertical>
                    <Icon name="pricetags" />
                    <Text>Offers</Text>
                  </Button>
                  <Button vertical>
                    <Icon name="briefcase" />
                    <Text>Booking</Text>
                  </Button>
                  <Button vertical onPress={() => this.helpNavigation()}>
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
    roundDate: state.roundDate
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({showFont: showFont, roundTrip: roundTrip, onewayTrip: onewayTrip}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Index);
