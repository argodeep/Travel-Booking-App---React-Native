import React, { Component } from 'react';
import { Font, Constants } from 'expo';
import { Image, View } from 'react-native'
import { Container, Content, Text, Switch, Grid, Col, Card, Header, List,  ListItem, Footer, FooterTab, Badge, Segment, Thumbnail, Icon, Right, Left, Body, Button, Title, CardItem, Item, Label, Input, Form } from 'native-base';
import { showFont, roundTrip, onewayTrip } from '../../../Redux/actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import styles from './style.js';
import moment from 'moment';
import axios from 'axios';


class Index extends Component{

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Search Flight',     
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
      departCity: {"airport":"Kempegowda Int'l Airport","city":"Bangalore","cn":"India","iata":"BLR"},
      returnCity: {"airport":"Chhatrapati Shivaji Int'l Airport","city":"Mumbai","cn":"India","iata":"BOM"},
      origin: false,
      destination: false,
      departureDate: [],
      dateQuotes: []
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('../../../assets/fonts/Exo-Light.ttf'),
      'Roboto_medium': require('../../../assets/fonts/Exo-Medium.ttf'),
      'Ionicons': require('../../../assets/fonts/Ionicons.ttf'),
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

  selectClass(){
    this.props.navigation.navigate('Select');
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

  render(){
    const { navigation } = this.props;
    const departDate = navigation.getParam('startDate');
    const returnDate = navigation.getParam('returnDate');    

    return(
      <Container>
      { this.props.loaded ? (
         <Container>
          <Content>
            {/* <Image style={styles.headerImage} source={require('../../../assets/flight.jpg')} />
              <Text style={styles.headerTitle}>Search Flights</Text> */}
              <Card style={styles.flightContent} transparent>
                  <CardItem  style={styles.tripBook}>
                          <Item stackedLabel style={styles.departure} onPress={() => this.departSelect()}>
                            <Label style={styles.cityTitleFROM}>From</Label>
                            <Label style={styles.cityInputFROM}>{this.state.departCity.iata}</Label>
                            <Label style={styles.cityNameFROM}>{this.state.departCity.city}</Label>
                          </Item>   
                          <Button small light  style={styles.swipe} onPress={() => this.swipe()}>
                            <Icon name="swap" style={styles.iconSize} />
                          </Button>        
                          
                          <Item stackedLabel style={styles.destination} onPress={() => this.returnSelect()}>
                            <Label style={styles.cityTitleTO}>To</Label>
                            <Label style={styles.cityInputTO}>{this.state.returnCity.iata}</Label>
                            <Label style={styles.cityNameTO}>{this.state.returnCity.city}</Label>
                          </Item>                 
                    </CardItem>
                      <View style={{ borderBottomColor: '#f5f5f5', borderBottomWidth: 1.5}}></View>
                    <CardItem  style={styles.tripType}>
                              { !this.props.roundDate &&
                                <Button small rounded style={styles.buttons}>
                                  <Text>One Way</Text>
                                </Button>
                              }

                              { this.props.roundDate &&
                                <Button small transparent dark style={styles.buttons} onPress={() => this.oneWayDate()}>
                                  <Text>One Way</Text>
                                </Button>
                              }
                              { !this.props.roundDate &&
                                <Button small transparent dark style={styles.buttons} onPress={() => this.roundTripDate()}>
                                  <Text>Round Trip</Text>
                                </Button>  
                              } 

                              { this.props.roundDate &&
                                <Button small rounded style={styles.buttons}>
                                  <Text>Round Trip</Text>
                                </Button>     
                              }           
                    </CardItem>
                      <View style={{ borderBottomColor: '#f5f5f5', borderBottomWidth: 1.5}}></View>
                    </Card>
                    <Card style={styles.booking} transparent>
                    <CardItem>
                    <View style={styles.tripDate}>
                        <View style={{flex: 1}}>
                          <Text style={styles.cityTitleFROM} onPress={() => this.dateSelect()}>
                            Departure
                          </Text>
                          <Label onPress={() => this.dateSelect()} style={styles.dateCalenderStart}>{departDate == undefined ||  departDate == null || !departDate ? moment(departDate).format("Do MMMM") : moment(departDate).format("Do MMMM")}
                          </Label>
                          <Label onPress={() => this.dateSelect()} style={styles.cityNameFROM}>{ departDate == undefined || departDate == null && !departDate ? moment(departDate).format("dddd, YYYY") : moment(departDate).format("dddd, YYYY")}</Label>
                        </View>
                        
                      
                      { !this.props.roundDate &&
                      
                      <View style={{flex: 1}} >
                          <Text style={styles.cityTitleTO}>
                            Return
                          </Text>
                          <Label style={styles.dateCalenderEnd}>{ returnDate == undefined || returnDate == null || !returnDate ? 'Book Now' : 'Book Now'}
                          </Label>
                          <Label style={styles.cityNameTO}>{ returnDate == undefined  || returnDate == null || !returnDate ? 'Great Savings' : 'Great Savings'}</Label>
                        
                      </View>

                      }
                    
                      { this.props.roundDate &&
                      
                      <View style={{flex: 1}} >
                          <Text style={styles.cityTitleTO} onPress={() => this.dateSelect()}>
                            Return
                          </Text>
                          <Label onPress={() => this.dateSelect()} style={styles.dateCalenderEndActive}>{ returnDate == undefined || returnDate == null || !returnDate ? 'Select Date' : moment(returnDate).format("Do MMMM")}
                          </Label>
                          <Label onPress={() => this.dateSelect()} style={styles.cityNameTO}>{ returnDate == undefined  || returnDate == null || !returnDate ? '' : moment(returnDate).format("dddd, YYYY")}</Label>
                        
                      </View>

                      }
                      
                    </View>
                    </CardItem>
                    <View style={{ borderBottomColor: '#f5f5f5', borderBottomWidth: 1.5}}></View>
                    <CardItem>
                      <Body style={styles.tripPassenger}>
                          <Item stackedLabel style={styles.passengers} onPress={() => this.selectClass()}>
                            <Label style={styles.passengerAlign}>Adults</Label>
                            <Label style={styles.passengerAlignTitle}>2</Label>
                          </Item>   
                          <Item stackedLabel style={styles.passengers} onPress={() => this.selectClass()}>
                            <Label style={styles.passengerAlign}>Children</Label>
                            <Label style={styles.passengerAlignTitle}>0</Label>
                          </Item>
                          <Item stackedLabel style={styles.passengers} onPress={() => this.selectClass()}>
                            <Label style={styles.passengerAlign}>Infants</Label>
                            <Label style={styles.passengerAlignTitle}>0</Label>
                          </Item>
                      </Body>                   
                    </CardItem>
                    <View style={{ borderBottomColor: '#f5f5f5', borderBottomWidth: 1.5}}></View>
                    <CardItem>
                      <Body style={styles.tripType}>
                          <Label style={styles.cabin}>Choose Cabin Class</Label>
                            <Button small rounded style={styles.buttons} onPress={() => this.selectClass()}>
                                  <Text style={styles.smallText}>Premium Economy</Text>
                            </Button>         
                      </Body>                          
                    </CardItem>
                    <View style={{ borderBottomColor: '#f5f5f5', borderBottomWidth: 1.5}}></View>
                     <CardItem>
                       <Body>
                       <Button block rounded primary onPress={() => this.getdepartureDates()}>
                            <Text>Search</Text>
                        </Button>  
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
    roundDate: state.roundDate
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({showFont: showFont, roundTrip: roundTrip, onewayTrip: onewayTrip}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Index);
