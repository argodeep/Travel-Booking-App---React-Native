import { StyleSheet} from 'react-native';
import Left from '../../../../native-base-theme/components/Left';

module.exports =  StyleSheet.create({
    headerImage: {
        height: 160,
        width: '100%', 
        backgroundColor: '#b71c55',
        opacity: 0.7,
    },
    headerTitle: {
        position: 'absolute', 
        top: 40, 
        left: 20, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        fontFamily: 'Roboto_medium',
        color: '#fff',
        fontSize: 26,
        //transform: translate('-50%, -50%)
    },
    tripType: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flex: 1, 
        flexDirection: 'row'
    },
    flightContent: {
        marginTop: 0,
        marginRight: 0,
        marginLeft: 0,
    },
    buttons: {
        alignSelf: 'center'
    },
    cityInputFROM: {
        alignSelf: 'flex-start',
        fontWeight: '600',
        fontFamily: 'Roboto_medium',
        fontSize: 22,
        color: '#444'
    },
    cityInputTO: {
        alignSelf: 'flex-end',
        fontWeight: '600',
        fontFamily: 'Roboto_medium',
        fontSize: 22,
        color: '#444'
    },

    cityTitleFROM: {
        color: '#999',
        fontSize: 15,
        alignSelf: 'flex-start',
        paddingBottom: 0
    },
    cityTitleTO: {
        color: '#999',
        fontSize: 15,
        alignSelf: 'flex-end',
        paddingBottom: 0
    },
    cityNameFROM: {
        color: '#666',
        alignSelf: 'flex-start',
        fontSize: 12
    },
    cityNameTO: {
        color: '#666',
        alignSelf: 'flex-end',
        fontSize: 12
    },
    booking: {
        marginTop: 0,
        marginRight: 0,
        marginLeft: 0
    },
    departure: {
        width: '40%',
        color: '#4caf50',
    },
    destination: {
        width: '40%',
        color: '#ff9800',
    },
    iconSize: {
        color: '#fff',
        fontSize: 20,
    },
    swipe: {
        borderRadius: 30,
        height: 52,
        width: 52,
        color: '#fff',
        backgroundColor: '#5271ff',
        alignSelf: 'center'
    },
    tripBook: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flex: 3, 
        flexDirection: 'row',
    },
    dateFROM: {
        alignSelf: 'flex-start',
        fontWeight: '600',
        fontFamily: 'Roboto_medium',
        fontSize: 20,
        color: '#263238'
    },
    dateTOInvalid: {
        textAlign: 'right',
        alignSelf: 'flex-end',
        fontWeight: '600',
        fontFamily: 'Roboto_medium',
        fontSize: 20,
        color: '#777'
    },
    dateTOActive: {
        textAlign: 'left',
        alignSelf: 'flex-end',
        fontWeight: '600',
        fontFamily: 'Roboto_medium',
        fontSize: 20,
        color: '#263238'
    },
    tripDate: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 2, 
        flexDirection: 'row'
    },
    tripClass: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, 
        flexDirection: 'row'
    },

    tripPassenger: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flex: 3, 
        flexDirection: 'row'
    },
    tripPassenger2: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flex: 2, 
        flexDirection: 'row'
    },
    passengers: {
        width: '33.33%',
        color: '#4caf50',
        fontSize: 12,
    },

    passengers2: {
        width: '60%',
    },

    passengers3: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center'
    },

    passengerAlignTitle: {
        alignSelf: 'center',
        fontWeight: '600',
        fontFamily: 'Roboto_medium',
        fontSize: 18,
        color: '#444'
    },

    passengerAlignTitle2: {
        alignSelf: 'flex-start',
        fontFamily: 'Roboto_medium',
        fontSize: 11,
        color: '#999'
    },

    passengerAlignTitle3: {
        alignSelf: 'center',
        fontFamily: 'Roboto_medium',
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },

    passengerAlign: {
        color: '#777',
        alignSelf: 'center',
    },

    passengerAlign2: {
        color: '#444',
        fontFamily: 'Roboto_medium',
        fontSize: 20,
        alignSelf: 'flex-start',
    },

    smallText: {
        fontSize: 10
    },
    cabin: {
        color: '#777',
        marginRight: 10,
        alignSelf: 'flex-start',
    },
    dateSelect: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10
    },

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    dayHeader : { 
		flexDirection: 'row', 
		//borderTopWidth: 0.4, 
        borderColor: '#4caf50',
        borderBottomWidth: 0.2,
		paddingBottom: 10,
        paddingTop: 10,
    },
    
    dateCalenderStart: {
        alignSelf: 'flex-start',
        fontWeight: '600',
        fontSize: 20,
        color: '#444',
        marginTop: 3,
        paddingBottom: 5,
    },

    dateCalenderCenter: {
        alignSelf: 'center',
        fontWeight: '600',
        fontSize: 18,
        color: '#b71c1c',
        marginTop: 3,
        paddingBottom: 5,
    },

    dateCalenderEndActive: {
        alignSelf: 'flex-end',
        fontWeight: '600',
        fontSize: 20,
        color: '#444',
        marginTop: 3,
        paddingBottom: 5,
    },

    dateCalenderEnd: {
        alignSelf: 'flex-end',
        fontWeight: '400',
        fontSize: 20,
        color: '#999',
        marginTop: 3,
        paddingBottom: 5,
    },

    returnTo: {
        color: '#000',
        alignSelf: 'flex-end',
        textAlign: 'right',
        fontSize: 14,
        marginTop: 4
    },

    tripType2: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flex: 2, 
        flexDirection: 'row'
    },

    buttons2: {
        alignSelf: 'center',
        margin: 5
    },

  });