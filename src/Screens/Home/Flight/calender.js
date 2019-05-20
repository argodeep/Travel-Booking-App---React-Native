import React, { Component } from 'react';
import { View, Image, Dimensions} from 'react-native';
import DatepickerRange, {SingleDatepicker} from '../../../Lib/index.js';
import { Font } from 'expo';
import getTheme from '../../../../native-base-theme/components';
import { StyleProvider,Container, Content, Text, Grid, Col, Card, Header, List,  ListItem, Footer, FooterTab, Badge, Segment, Thumbnail, Icon, Right, Left, Body, Button, Title, CardItem, Item, Label, Input, Form } from 'native-base';
import { showFont } from '../../../Redux/actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import styles from './style.js';

const DEVICE_WIDTH = Dimensions.get('window').width;

class Calender extends Component{

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Select Travel Date',
    };
  };


  constructor(props){
    super(props);
    this.state = {
      dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      startDate: this.props.navigation.getParam('startDate'),
      untilDate: this.props.navigation.getParam('returnDate'),
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('../../../assets/fonts/Exo-Light.ttf'),
      'Roboto_medium': require('../../../assets/fonts/Exo-Medium.ttf'),
      'Ionicons': require('../../../assets/fonts/Ionicons.ttf'),
    });
    this.props.showFont()
  }

  handleConfirmDate(){
	  this.props.navigation.navigate('Flight', {
      startDate: this.state.startDate,
      returnDate: this.state.untilDate
    });
	}

  render(){
    const { navigation } = this.props;
    const round = navigation.getParam('round');
    return(
      <StyleProvider  style={getTheme()}>
      <Container>
      { this.props.loaded ? (
         <Container>
           <View style={{ flexDirection: 'row', justifyContent: "center", paddingHorizontal: 25, paddingBottom: 5, alignItems: 'center', marginTop: 10}}>
              {
                round == false &&
                  <View style={{flex: 1}}>
                  <Text style={{fontSize: 14, color: '#777',  alignSelf: 'center'}}>
                    Departure Date
                  </Text>
                  <Label style={styles.dateCalenderCenter}>{ this.state.startDate ? moment(this.state.startDate).format("ddd, DD MMM") : '--'}
                  </Label>
							  </View>
              
              }
              
              {
                round == true &&
                  <View style={{flex: 1}}>
                  <Text style={{fontSize: 14, color: '#777',  alignSelf: 'flex-start'}}>
                    Departure Date
                  </Text>
                  <Label style={styles.dateCalenderStart}>{ this.state.startDate ? moment(this.state.startDate).format("ddd, DD MMM") : '--'}
                  </Label>
							  </View>
              
              }
						
              {
                round == true &&
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 14, color: '#777',  alignSelf: 'flex-end',}}>
                    Return Date
                  </Text>
                  <Label style={styles.dateCalenderEndActive}>{ this.state.untilDate ? moment(this.state.untilDate).format("ddd DD MMM") : '--'}
                  </Label>
                </View>
              }
						
						</View>
            <View style={styles.dayHeader}>
              {
                this.state.dayHeadings.map((day, i) => {
                  return (<Text style={{width: DEVICE_WIDTH / 7, textAlign: 'center', color: '#777'}} key={i}>{day}</Text>)
                })
              }
            </View>
              <Content>
                {round == true && 
                   <DatepickerRange
                   showReset={false}
                   showClose={false}
                   placeHolderStart='Departure Date'
                   placeHolderUntil='Return Date'
                   selectedBackgroundColor='#4caf50'
                   minDate={new Date()}
                   startDate={this.props.navigation.getParam('startDate')}
                   untilDate={this.props.navigation.getParam('returnDate')}
                   ignoreMinDate={false}
                   onSelect={( startDate, untilDate ) => this.setState({ startDate, untilDate })}
                  />
                }

                  {round == false && 
                   <SingleDatepicker
                   showReset={false}
                   showClose={false}
                   selectedBackgroundColor='#4caf50'
                   minDate={new Date()}
                   startDate={this.props.navigation.getParam('startDate')}
                   ignoreMinDate={false}
                   onSelect={( startDate ) => this.setState({ startDate })}
                  />
                  }
               
              </Content>
              <View style={{BackgroundColor: '#fff', padding: 7, borderTopWidth: 0.4, borderColor: '#ccc'}}>
                <Button	block rounded onPress={() => this.handleConfirmDate()}>
                    <Text>Conifrm Date</Text>
                </Button>
              </View>   
         </Container>
        ) : null }
      </Container>
      </StyleProvider>
    );
  }
}
function mapStateToProps(state){
  return{
    loaded: state.loaded
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({showFont: showFont}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Calender);
