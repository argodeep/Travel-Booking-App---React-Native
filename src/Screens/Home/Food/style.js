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
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, 
        flexDirection: 'row'
    },
    flightContent: {
        marginTop: -30,
        marginRight: 10,
        marginLeft: 10
    },
    buttons: {
        alignSelf: 'center'
    },
    cityInputFROM: {
        alignSelf: 'flex-start',
        fontWeight: '600',
        fontFamily: 'Roboto_medium',
        fontSize: 24,
        color: '#b71c1c'
    },
    cityInputTO: {
        alignSelf: 'flex-end',
        fontWeight: '600',
        fontFamily: 'Roboto_medium',
        fontSize: 24,
        color: '#b71c1c'
    },

    cityTitleFROM: {
        color: '#777',
        fontSize: 16,
        alignSelf: 'flex-start',
        paddingBottom: 10
    },
    cityTitleTO: {
        color: '#777',
        fontSize: 16,
        alignSelf: 'flex-end',
        paddingBottom: 10
    },
    cityNameFROM: {
        color: '#999',
        alignSelf: 'flex-start',
        fontSize: 12
    },
    cityNameTO: {
        color: '#999',
        alignSelf: 'flex-end',
        fontSize: 12
    },
    booking: {
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10
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
        color: '#4caf50',
        fontSize: 20,
    },
    swipe: {
        borderRadius: 30,
        height: 52,
        width: 52,
        color: '#fff',
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
        flex: 3, 
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
    passengers: {
        width: '33.33%',
        color: '#4caf50',
        fontSize: 12,
    },

    passengerAlignTitle: {
        alignSelf: 'center',
        fontWeight: '600',
        fontFamily: 'Roboto_medium',
        fontSize: 24,
        color: '#b71c1c'
    },

    passengerAlign: {
        color: '#777',
        alignSelf: 'center',
    },

    smallText: {
        fontSize: 11
    },
    cabin: {
        color: '#777',
        marginRight: 10
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
        fontSize: 18,
        color: '#b71c1c',
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
        fontSize: 18,
        color: '#b71c1c',
        marginTop: 3,
        paddingBottom: 5,
    },

    dateCalenderEnd: {
        alignSelf: 'flex-end',
        fontWeight: '400',
        fontSize: 18,
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

  });