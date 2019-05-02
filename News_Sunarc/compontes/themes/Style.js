import {StyleSheet} from "react-native"
import Colors from './/Colors';

export default StyleSheet.create({

    container: {
        backgroundColor: Colors.white
    },
    mb10: {
        marginBottom: 10
    },
    header: {
        padding: 20,
        marginTop: 15,
        marginBottom: 15,
        position: 'absolute',
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    },
    listFooterHeight: {
        height: 50,
        color: 'grey'
    },
    searchBarSize: {
        height: 40,
        marginLeft: 45,
        width: '100%',
        backgroundColor: Colors.white,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fff',
        borderBottomWidth: 0,
    },
    searchBarSize2: {
        height: 50,
        marginLeft: 5,
        marginRight: 5,
        width: '97%',
        backgroundColor: '#dedede',
        borderRadius: 4,
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        borderColor: '#fff'
    },
    searchBarRightSize: {
        height: 45,
        width: 45,
        marginLeft: 6
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        borderWidth: 1,
        padding: 25,
        borderColor: '#2f7413'
    },
    btnText: {
        fontSize: 18,
        color: '#FAFAFA',
        marginLeft: 10,
        marginTop: 2,
    },
    separator: {
        height: 0.5,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },

    itemBorderRemover: {
        borderBottomWidth: 0,
    },

    itemWithIconBoder: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.white,
        marginTop: 15,
        paddingLeft: 10,
        paddingBottom: 1,
        paddingTop: 1,
        paddingRight: 2,
        borderRadius: 5,
        height: 45,
marginRight:10,
        marginLeft:10


    },
    DefultContentPaddingColor: {
        padding: 10,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10
    },

    //Radio Button Style
    radioButtonStyle: {
        paddingRight: 8,
        marginLeft: 10,
    },

    radioButtonTextStyle: {
        fontFamily: '',
        color: Colors.mainHeading,
        fontSize: 13,
    },
    buttonWithImage: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        height:40,
    },
    cardStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#569331',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 4,
        marginBottom: 4,
    },









    logoPostion: {
        height: 100,
        width: 100,
        marginTop: 50,
        marginBottom: 15,
        alignSelf: 'center',
        // justifyContent: 'center', // Used to set Text Component Vertically Center
        //alignItems: 'center' // Used to set Text Component Horizontally Center
    },

    TouchableOpacityButton: {
        alignItems: 'center',
        backgroundColor: '#62aa7c',
        color: Colors.white,
        padding: 10,
        marginTop: 25,
        marginLeft: 15,
        marginRight: 15,
    },

    RoundButton: {
        alignItems: 'center',
        backgroundColor: Colors.red,
        color: Colors.white,
        padding: 10,
        marginTop: 30,
        marginBottom: 10,
        marginLeft: '8%',
        marginRight: '7%',
        height: 45,
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    RactButton: {
        alignItems: 'center',
        backgroundColor: Colors.white,
        color: Colors.appTheme,
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: 10,
        height: 45,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    CardButton: {
        height: 100,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fc433a',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 1,
    },


    ButtonText: {
        color: Colors.white,
        fontFamily: 'Feather',
        fontSize:18
    },


    viewMainAllScreen: {
        marginBottom: 56
    },

    backgroundImage: {
        flex: 1,
        width: undefined,
        height: undefined,
        justifyContent: 'center',
        resizeMode: 'cover', // or 'stretch','cover',contain
    },


});
