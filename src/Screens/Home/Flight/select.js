import React, { Component } from 'react';
import { Font, Constants } from 'expo';
import getTheme from '../../../../native-base-theme/components';
import { StyleProvider, Container, Content, Separator, Button, Card, CardItem, Label, Text, Header, ListItem, Icon, Right, Body, Item, Input } from 'native-base';
import { showFont } from '../../../Redux/actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import styles from './style.js';
import axios from 'axios';

class Index extends Component{

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Select Travellers',
    };
  };


  constructor(props){
    super(props);
    const { navigation } = this.props;
    const departDate = navigation.getParam('startDate');
    const returnDate = navigation.getParam('returnDate');
    this.state = {
      startDate: '',
      untilDate: '',
      newstartDate: departDate,
      newreturnDate: returnDate,
      departureDate: [],
      dateQuotes: [],
      code: '',
      city: '',
      query: '',
      airportList: [],
      queryResult: false,
      querylist: [],
      selectedAirport: []
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('../../../assets/fonts/Exo-Light.ttf'),
      'Roboto_medium': require('../../../assets/fonts/Exo-Medium.ttf'),
      'Ionicons': require('../../../assets/fonts/Ionicons.ttf'),
    });
    this.props.showFont()
    await axios.get(`https://m.happyeasygo.com/heg_api/airportCity/searchAirPortCity.do`)
    .then(res => {
      const airport = res.data.data
      this.setState({ airportList: airport });

      if (airport.length == 0) {
        this.fetchAirport()
      }
    }).catch(function (error) {
      this.fetchAirport()
    })
  }

  async fetchAirport () {
    await axios.get(`https://res.cloudinary.com/dfxnlms6d/raw/upload/v1556025381/airport.json`)
    .then(res => {
      const airport = res.data.data
      this.setState({ airportList: airport });
    })
  }

  goBack () {
    this.props.navigation.navigate('Flight');
  }

  // stringtInput = (text, field) => {
  //   const state = this.state
  //   state[field] = text;
  //   this.setState(state);
  // }

  getAirport = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
    if (this.state.query.length > 1) {
      this.setState({
        queryResult: true,
       }); 
    } 

    if (this.state.query.length == 0) {
      this.setState({
        queryResult: false,
       }); 
    }
    setTimeout(function(){
      if (this.state.query.length == 1) {
        this.setState({
          queryResult: true,
          querylist: this.state.airportList.filter(e => e.airport.charAt(0) == this.state.query || e.city.charAt(0) == this.state.query || e.iata.charAt(0) == this.state.query.toUpperCase()).sort()
        }); 
      } 

      if (this.state.query.length > 1) {
        this.setState({
          querylist: this.state.airportList.filter(e => e.airport.includes(this.state.query) || e.city.includes(this.state.query) || e.iata.includes(this.state.query.toUpperCase()))
        }); 
      } 

      if (this.state.query.length == 0) {
        this.setState({
          querylist: []
        }); 
      }
    }.bind(this),0); 
  }

  selectAirport(city, iata, airport, cn) {
    const { navigation } = this.props;
    const departCity = navigation.getParam('departCity');
    const returnCity = navigation.getParam('returnCity');  
    if (departCity == true) {
      const location =  [{
        city: city,
        iata: iata,
        airport: airport,
        cn: cn
      }];
      if (this.state.selectedAirport.indexOf(location) === -1) {
        this.state.selectedAirport.push(location)
      }
      this.props.navigation.navigate('Flight', {
        depart: true,
        return: false,
        selectedAirport: this.state.selectedAirport[0][0]
      });
    }

    if (returnCity == true) {
      const location =  [{
        city: city,
        iata: iata,
        airport: airport,
        cn: cn
      }];
      if (this.state.selectedAirport.indexOf(location) === -1) {
        this.state.selectedAirport.push(location)
      }
      this.props.navigation.navigate('Flight', {
        depart: false,
        return: true,
        selectedAirport: this.state.selectedAirport[0][0]
      });
    }
  }

  render(){
    return(
      <StyleProvider style={getTheme()}>
          <Container>
            <Card transparent>
              <CardItem>
                      <Body style={styles.tripType2}>
                          <Label style={styles.cabin}>Choose Travellers</Label>    
                      </Body>                          
              </CardItem>
              <CardItem>
                <Body style={styles.tripPassenger2}>
                          <Item stackedLabel style={styles.passengers2}>
                            <Label style={styles.passengerAlign2}>Adults</Label>
                            <Label style={styles.passengerAlignTitle2}>Number of adults (16+ years). Must be between 1 and 8</Label>
                          </Item>   
                          <Card style={styles.passengers3} onPress={() => this.selectClass()}>
                              <CardItem>
                                <Body style={{justifyContent: 'space-between', alignItems: 'stretch', flex: 3, flexDirection: 'row'}}>
                                  <Icon name="remove" style={{marginRight: 2, color: '#777'}}/>
                                  <Text style={styles.passengerAlignTitle3}>1</Text>
                                  <Icon name="add" style={{marginLeft: 2, color: '#777'}}/>
                                </Body>
                              </CardItem>
                          </Card>
                </Body>                  
              </CardItem>
              <CardItem>
                <Body style={styles.tripPassenger2}>
                          <Item stackedLabel style={styles.passengers2}>
                            <Label style={styles.passengerAlign2}>Children</Label>
                            <Label style={styles.passengerAlignTitle2}>Number of children (1-16 years). Can be between 0 and 8</Label>
                          </Item>   
                          <Card style={styles.passengers3} onPress={() => this.selectClass()}>
                              <CardItem>
                                <Body style={{justifyContent: 'space-between', alignItems: 'stretch', flex: 3, flexDirection: 'row'}}>
                                  <Icon name="remove" style={{marginRight: 2, color: '#777'}}/>
                                  <Text style={styles.passengerAlignTitle3}>1</Text>
                                  <Icon name="add" style={{marginLeft: 2, color: '#777'}}/>
                                </Body>
                              </CardItem>
                          </Card>
                </Body>                  
              </CardItem>
              <CardItem>
                <Body style={styles.tripPassenger2}>
                          <Item stackedLabel style={styles.passengers2}>
                            <Label style={styles.passengerAlign2}>Infants</Label>
                            <Label style={styles.passengerAlignTitle2}>Number of infants (under 12 months). Can be between 0 and 8</Label>
                          </Item>   
                          <Card style={styles.passengers3} onPress={() => this.selectClass()}>
                              <CardItem>
                                <Body style={{justifyContent: 'space-between', alignItems: 'stretch', flex: 3, flexDirection: 'row'}}>
                                  <Icon name="remove" style={{marginRight: 2, color: '#777'}}/>
                                  <Text style={styles.passengerAlignTitle3}>1</Text>
                                  <Icon name="add" style={{marginLeft: 2, color: '#777'}}/>
                                </Body>
                              </CardItem>
                          </Card>
                </Body>                  
              </CardItem>

              <CardItem>
                      <Body style={styles.tripType2}>
                          <Label style={styles.cabin}>Choose Cabin Class</Label>    
                      </Body>                          
              </CardItem>
              <CardItem>
                      <Body style={styles.tripType2}>
                            <Button rounded style={styles.buttons2} onPress={() => this.selectClass()}>
                                  <Text>Economy</Text>
                            </Button>  
                            <Button rounded light style={styles.buttons2} onPress={() => this.selectClass()}>
                                  <Text>Business</Text>
                            </Button>
                      </Body>                          
              </CardItem>  
              <CardItem>
                      <Body style={styles.tripType2}>
                            <Button rounded light style={styles.buttons2} onPress={() => this.selectClass()}>
                                  <Text>Premium Economy</Text>
                            </Button>
                            <Button rounded light style={styles.buttons2} onPress={() => this.selectClass()}>
                                  <Text>First</Text>
                            </Button> 
                      </Body>                          
              </CardItem>    
            </Card>
          </Container>
      </StyleProvider>
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
