import React, { Component } from 'react';
import { Font } from 'expo';
import { Image, FlatList, View} from 'react-native'
import { Container, Content, ActionSheet, Text, Grid, Col, Row, Card, Header, List, ListItem, Footer, FooterTab, Badge, Segment, Thumbnail, Icon, Right, Left, Body, Button, Title, CardItem, Item, Label, Input, Form } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { showFont } from '../../../Redux/actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import styles from './style.js'

const data = [
    {
      imageUrl: "http://swiggytestblog.wpengine.com/wp-content/uploads/2018/12/Logo-Or_544x180-2-Orange.png",
      title: "Great deals on Swiggy",
      url: "https://www.swiggy.com/offers/restaurant"
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

  
class Index extends Component {

	static navigationOptions = ({ navigation }) => {
    return {
      title: 'Order Online',
      };
      };

      constructor(props){
        super(props);    
        this.state = {
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

	render() {
	    return (
	      <Container>
	         { this.props.loaded ? (
                <Content>
                    <List>                    
                        <ListItem avatar onPress={() => this.props.navigation.navigate('Swiggy')}>
                            <Left>
                                <Thumbnail source={require('../../../assets/swiggy.png')} />
                            </Left>
                            <Body>
                                <Text style={{fontFamily: 'Roboto_medium'}}>Order Food on Swiggy</Text>
                                <Text note numberOfLines={2}>Enjoy Lightning-Fast Delivery‎. Live Order Tracking. Wide Range of Restaurants.</Text>
                            </Body>
                            {/* <Right>
                                <Button transparent>
                                    <Text style={{fontFamily: 'Roboto_medium'}}>Order Now</Text>
                                </Button>
                            </Right> */}
                        </ListItem>
                        <ListItem avatar onPress={() => this.props.navigation.navigate('Pizzahut')}>
                            <Left>
                                <Thumbnail source={require('../../../assets/pizzahut.png')} />
                            </Left>
                            <Body>
                                <Text style={{fontFamily: 'Roboto_medium'}}>Order On Pizza Hut‎</Text>
                                <Text note numberOfLines={2}>Order Online Order Tastiest Pan Pizzas At Amazing Prices with Fast Delivery</Text>
                            </Body>
                            {/* <Right>
                                <Button transparent>
                                    <Text style={{fontFamily: 'Roboto_medium'}}>Order Now</Text>
                                </Button>
                            </Right> */}
                        </ListItem>
                        {/* <ListItem avatar onPress={() => this.props.navigation.navigate('Dominos')}>
                            <Left>
                                <Thumbnail source={require('../../../assets/dominos.png')} />
                            </Left>
                            <Body>
                                <Text style={{fontFamily: 'Roboto_medium'}}>Order On Domino's‎</Text>
                                <Text note numberOfLines={2}>Order Domino's Pizza Online and get deliveries in 30 Minutes*</Text>
                            </Body>
                        </ListItem> */}
                        <ListItem avatar onPress={() => this.props.navigation.navigate('KFC')}>
                            <Left>
                                <Thumbnail source={require('../../../assets/kfc.png')} />
                            </Left>
                            <Body>
                                <Text style={{fontFamily: 'Roboto_medium'}}>Order On KFC‎</Text>
                                <Text note numberOfLines={2}>Order the best fried chicken online from world's most popular chicken restaurant</Text>
                            </Body>
                            {/* <Right>
                                <Button transparent>
                                    <Text style={{fontFamily: 'Roboto_medium'}}>Order Now</Text>
                                </Button>
                            </Right> */}
                        </ListItem>
                        <ListItem avatar onPress={() => this.props.navigation.navigate('Faasos')}>
                            <Left>
                                <Thumbnail source={require('../../../assets/faasos.png')} />
                            </Left>
                            <Body>
                                <Text style={{fontFamily: 'Roboto_medium'}}>Order On Faasos‎</Text>
                                <Text note numberOfLines={2}>Order food online from Faasos and Eat Good, Eat Exciting!</Text>
                            </Body>
                            {/* <Right>
                                <Button transparent>
                                    <Text style={{fontFamily: 'Roboto_medium'}}>Order Now</Text>
                                </Button>
                            </Right> */}
                        </ListItem>
                    </List>   
                    <Text style={{fontSize: 18, fontFamily: 'Roboto_medium', color: '#555', textAlign: 'center', marginTop: 20, marginLeft: 10 }}>Great Offers</Text>
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