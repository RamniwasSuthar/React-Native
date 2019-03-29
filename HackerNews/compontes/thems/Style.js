
import {StyleSheet} from "react-native"
import Colors from '../thems/Colors';

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
    width:'100%',
    backgroundColor:Colors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
    borderBottomWidth: 0,
  },
  searchBarSize2: {
    height: 50,
    marginLeft:5,
    marginRight:5,
    width:'97%',
    backgroundColor:'#dedede',
    borderRadius: 4,
    borderWidth: 1,
    marginTop:5,
    marginBottom:5,
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


  //Radio Button Style
  radioButtonStyle: {
    paddingRight: 8,
    marginLeft:10,
  },

  radioButtonTextStyle: {
    fontFamily: '',
    color:Colors.mainHeading,
    fontSize:13,
  },
  cardStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#569331',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 4,
    marginBottom:4,
  },
});
