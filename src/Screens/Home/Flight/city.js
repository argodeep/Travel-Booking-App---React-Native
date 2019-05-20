import React, { Component } from 'react';
import { Font, Constants } from 'expo';
import getTheme from '../../../../native-base-theme/components';
import { StyleProvider, Container, Content, Separator, Text, Header, ListItem, Icon, Right, Body, Item, Input } from 'native-base';
import { showFont } from '../../../Redux/actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';

class Index extends Component{

  static navigationOptions = ({ navigation }) => {
    return {
        header: null,
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
            <Header searchBar rounded style={{backgroundColor: '#fff', marginTop: Constants.statusBarHeight}}>
              <Item>
                <Icon name="arrow-back" onPress={() => this.goBack()} />
                <Input
                  placeholder="Enter Airport/City Name"
                  style={{color: '#000', fontWeight: 'bold'}} 
                  autoFocus={true}
                  value={this.state.query}
                  //onChangeText={(text) => this.stringtInput(text, 'query')}
                  onChangeText={(text) => this.getAirport(text, 'query')}
                />
                <Text
                    style={{color: '#bc71c7', fontSize: 16, padding: 5}}
                    onPress={() => this.setState({query: '', queryResult: false, querylist: []})}>Clear</Text>
              </Item>
            </Header>
            <Content>
              {/* <Separator bordered>
                <Text>RECENT SEARCHES</Text>
              </Separator>
              <ListItem last>
                <Body>
                  <Text>Bengaluru</Text>
                  <Text note>Kempegowda International Airport</Text>
                </Body>
                <Right>
                  <Text style={{fontWeight: 'bold', color: '#777'}}>BLR</Text>
                </Right>
              </ListItem> */}
              { this.state.queryResult == false && 
              <Content>
                <Separator bordered>
                <Text>POPULAR CITIES</Text>
              </Separator>
              <ListItem last onPress={() => this.selectAirport('Bangalore', 'BLR', 'Kempegowda International Airport', 'India')}>
                <Body>
                  <Text>Bangalore</Text>
                  <Text note>Kempegowda International Airport</Text>
                </Body>
                <Right>
                  <Text style={{fontWeight: 'bold', color: '#777'}}>BLR</Text>
                </Right>
              </ListItem>
              <ListItem last onPress={() => this.selectAirport('Mumbai', 'BOM', 'Chhatrapati Shivaji International Airport', 'India')}>
                <Body>
                  <Text>Mumbai</Text>
                  <Text note>Chhatrapati Shivaji International Airport</Text>
                </Body>
                <Right>
                  <Text style={{fontWeight: 'bold', color: '#777'}}>BOM</Text>
                </Right>
              </ListItem>
              <ListItem last onPress={() => this.selectAirport('Delhi', 'DEL', 'Delhi Airport', 'India')}>
                <Body>
                  <Text>Delhi</Text>
                  <Text note>Delhi Airport</Text>
                </Body>
                <Right>
                  <Text style={{fontWeight: 'bold', color: '#777'}}>DEL</Text>
                </Right>
              </ListItem>
              <ListItem last onPress={() => this.selectAirport('Bangkok', 'BKK', 'Suvarnabhumi Airport', 'Thailand')}>
                <Body>
                  <Text>Bangkok</Text>
                  <Text note>Suvarnabhumi Airport</Text>
                </Body>
                <Right>
                  <Text style={{fontWeight: 'bold', color: '#777'}}>BKK</Text>
                </Right>
              </ListItem>
              <ListItem last onPress={() => this.selectAirport('Hyderabad', 'HYD', 'Rajiv Gandhi International Airport', 'India')}>
                <Body>
                  <Text>Hyderabad</Text>
                  <Text note>Rajiv Gandhi International Airport</Text>
                </Body>
                <Right>
                  <Text style={{fontWeight: 'bold', color: '#777'}}>HYD</Text>
                </Right>
              </ListItem>
              <ListItem last onPress={() => this.selectAirport('Kolkata', 'CCU', 'Netaji Subhash Chandra Bose International Airport', 'India')}>
                <Body>
                  <Text>Kolkata</Text>
                  <Text note>Netaji Subhash Chandra Bose International Airport</Text>
                </Body>
                <Right>
                  <Text style={{fontWeight: 'bold', color: '#777'}}>CCU</Text>
                </Right>
              </ListItem>
              <ListItem last onPress={() => this.selectAirport('Chennai', 'MAA', 'Madras,Chennai International Airport', 'India')}>
                <Body>
                  <Text>Chennai</Text>
                  <Text note>Madras,Chennai International Airport</Text>
                </Body>
                <Right>
                  <Text style={{fontWeight: 'bold', color: '#777'}}>MAA</Text>
                </Right>
              </ListItem>
              <ListItem last onPress={() => this.selectAirport('Dubai', 'DXB', 'Dubai International Airport', 'United Arab Emirates')}>
                <Body>
                  <Text>Dubai</Text>
                  <Text note>Dubai International Airport</Text>
                </Body>
                <Right>
                  <Text style={{fontWeight: 'bold', color: '#777'}}>DXB</Text>
                </Right>
              </ListItem>
              <ListItem last onPress={() => this.selectAirport('Goa', 'GOI', 'Dabolim Goa International Airport', 'India')}>
                <Body>
                  <Text>Goa</Text>
                  <Text note>Dabolim Goa International Airport</Text>
                </Body>
                <Right>
                  <Text style={{fontWeight: 'bold', color: '#777'}}>GOI</Text>
                </Right>
              </ListItem>
              <ListItem last onPress={() => this.selectAirport('Paris', 'CDG', 'Charles de Gaulle Airport', 'France')}>
                <Body>
                  <Text>Paris</Text>
                  <Text note>Charles de Gaulle Airport</Text>
                </Body>
                <Right>
                  <Text style={{fontWeight: 'bold', color: '#777'}}>CDG</Text>
                </Right>
              </ListItem>
              </Content>
              }
              
              { this.state.queryResult == true &&
                <Separator bordered>
                <Text>SEARCH RESULTS</Text>
                </Separator>
              }
              
              {
                this.state.queryResult == true &&  this.state.querylist.map((item, i) => (
              <ListItem last key={i} onPress={() => this.selectAirport(item.city, item.iata, item.airport, item.cn)}>
                <Body>
                  <Text>{item.city}</Text>
                  <Text note>{item.airport}</Text>
                </Body>
                <Right>
                  <Text style={{fontWeight: 'bold', color: '#777'}}>{item.iata}</Text>
                </Right>
              </ListItem>
               ))
              }
            </Content>
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
