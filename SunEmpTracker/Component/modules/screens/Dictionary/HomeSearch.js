import React, {Component} from 'react';
import {
    StyleSheet,
    Alert,
    BackHandler,
    View,
    TextInput,
    Text,
    Image,
    Button,
    ListView,
    PixelRatio,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import  Colors from '../../../thems/Colors'
import ImagePicker from 'react-native-image-picker';

import Voice from 'react-native-voice';
import {Dialog, ProgressDialog, ConfirmDialog} from "react-native-simple-dialogs";
/*import TouchableHighlight from "react-native-gesture-handler/touchables/TouchableHighlight";*/

var VoiceSearchWords;
const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
const {width, height} = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


export default class HomeSearch extends Component {
    state = {
        ImageSource: null,
        recognized: '',
        pitch: '',
        error: '',
        inputWords: '',
        end: '',
        started: '',
        dataSource: ds,
        loaded: false,
        isSearching: false,
        feedURL: 'https://api.urbandictionary.com/v0/autocomplete?term=',
        results: [],
        partialResults: [],
    };

    openDialog = (show) => {
        this.setState({showDialog: show});
    }

    constructor(props) {
        super(props);
        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechRecognized = this.onSpeechRecognized;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
        /*const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         this.state = {

         };*/
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        Voice.destroy().then(Voice.removeAllListeners);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentDidMount() {
        console.log('componentDidMount');
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        Alert.alert(
            'SunEmp Tracker',
            "Are you sure you want to exit from app ?", [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
                cancelable: false
            }
        )
        return true;
    }

    searchForTerm(term) {

        // alert(term);
        let url = this.state.feedURL + term;
        let tempWord = '';

        if (this.state.partialResults.length > 0) {
            tempWord = this.state.partialResults.pop()
        } else {
            tempWord = term;
        }

        console.log("Searching  :- " + term)

        this.setState({
            isRefreshing: true,
            partialResults: [],
            inputWords: term,
        })

        fetch(url).then((response) => response.json()).then((newsItems) => {

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(newsItems),
                loaded: true,
                isRefreshing: false,
                isAnimating: false,
            })


        }).catch((error) => {
            console.error(error);
        });
        // this.state.partialResults.push(tempWord)
    }

    onSearch(term) {
        console.log(term);
        this.props.navigation.navigate('ListWords', {
            title: term,
            searchWord: 'https://api.urbandictionary.com/v0/define?term=' + term
        })
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            title: 'Select Searching Image',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'image'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};

                console.log("Image Url path :- " + source)

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    ImageSource: source,
                });

                this.openDialog(true)
            }
        });
    }

    onSpeechStart = e => {
        // eslint-disable-next-line
        console.log('onSpeechStart: ', e);
        this.setState({
            started: '√',
        });
    };

    onSpeechRecognized = e => {
        // eslint-disable-next-line
        console.log('onSpeechRecognized: ', e);
        this.setState({
            recognized: '√',
        });
    };

    onSpeechEnd = e => {
        // eslint-disable-next-line
        console.log('onSpeechEnd: ', e);
        this.setState({
            end: '√',
        });
    };

    onSpeechError = e => {
        // eslint-disable-next-line
        console.log('onSpeechError: ', e);
        this.setState({
            error: JSON.stringify(e.error),
        });
    };

    onSpeechResults = e => {
        // eslint-disable-next-line
        console.log('onSpeechResults: ', e);
        this.setState({
            results: e.value,
        });
    };

    onSpeechPartialResults = e => {
        // eslint-disable-next-line
        console.log('onSpeechPartialResults: ', e);
        this.setState({
            partialResults: e.value,
        });

    };

    onSpeechVolumeChanged = e => {
        // eslint-disable-next-line
        console.log('onSpeechVolumeChanged: ', e);
        this.setState({
            pitch: e.value,
        });
    };

    _startRecognizing = async () => {
        this.setState({
            recognized: '',
            pitch: '',
            error: '',
            started: '',
            results: [],
            partialResults: [],
            end: '',
        });

        try {
            await Voice.start('en-US');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    _stopRecognizing = async () => {
        try {
            await Voice.stop();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    _cancelRecognizing = async () => {
        try {
            await Voice.cancel();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    _destroyRecognizer = async () => {
        try {
            await Voice.destroy();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
        this.setState({
            recognized: '',
            pitch: '',
            error: '',
            started: '',
            results: [],
            partialResults: [],
            end: '',
        });
    };


    _renderRows(data) {
        return (

            <TouchableOpacity underlayColor='white' style={{backgroundColor: 'white', height: 50}}
                              onPress={() => this.onSearch(data)}>


                <View style={styles.row}>
                    <Text style={styles.rowText}>{data}</Text>
                    <Icon name="chevron-right" color={Colors.gray} size={30}/>
                </View>


            </TouchableOpacity>



        );
    }

    _renderHeader() {
        return (

            <View style={{backgroundColor: Colors.headerBack}}>

                <View style={{marginTop: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>

                    <Text style={{color: Colors.white, marginRight: 30, fontWeight: 'bold'}}>English</Text>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name="repeat" color={Colors.white} size={20}/>
                    </View>

                    <Text style={{color: Colors.white, marginLeft: 30, fontWeight: 'bold'}}>Hindi</Text>

                </View>


                <View style={{
                    flex: 1, flexDirection: 'row', borderBottomColor: Colors.white, backgroundColor: Colors.white,
                    borderBottomWidth: 1, marginLeft: 10, marginTop: 30, marginRight: 10, borderRadius: 5,
                    marginBottom: 20
                }}>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'center', marginLeft: 10
                    }}>
                        <Icon name="search" color={Colors.gray} size={30}/>
                    </View>


                    {this.state.partialResults.length === 0

                        ?
                        <TextInput style={{
                            height: 50,
                            width: width - 160,
                            marginBottom: 1,
                            alignItems: 'center',
                            paddingHorizontal: 10, justifyContent: 'center'
                        }}
                                   ref={(input) => this.searchInput = input}
                                   placeholder='Input Search Word'
                                   placeholderTextColor={Colors.gray}

                                   autoCapitalize='sentences'
                                   autoFocus={true}
                                   value={this.state.inputWords}
                                   clearButtonMode='always'
                                   keyboardShouldPersistTaps={false}

                                   returnKeyType='search'
                                   onChangeText={(text) => this.searchForTerm(text)}
                        />

                        :

                        this.state.partialResults.map((result, index) => (

                            <TextInput style={{
                                height: 50,
                                width: width - 160,
                                marginBottom: 1,
                                alignItems: 'center',
                                paddingHorizontal: 10, justifyContent: 'center'
                            }}
                                       key={index}
                                       ref={(input) => this.searchInput = input}
                                       placeholder='Input Search Word'
                                       value={result}
                                       placeholderTextColor={Colors.gray}
                                       returnKeyType='search'
                                       autoCapitalize='sentences'
                                       autoFocus={true}
                                       clearButtonMode='always'
                                       keyboardShouldPersistTaps={true}
                                       onChangeText={(text) => this.searchForTerm(text)}
                                       onSubmitEditing={(event) => this.searchForTerm(event.nativeEvent.text)}


                            />

                        ))}


                    <View style={{justifyContent: 'center'}}>
                        <TouchableHighlight
                            underlayColor={Colors.white}
                            style={{padding: 10, backgroundColor: Colors.white, height: 45}}
                            onPress={this._startRecognizing}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Icon name="mic" color={Colors.headerBack} size={25}/>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={{justifyContent: 'center'}}>
                        <TouchableOpacity
                            underlayColor={Colors.headerBack}
                            style={{padding: 10, backgroundColor: Colors.white, height: 45}}
                            onPress={this.selectPhotoTapped.bind(this)}
                            /* onPress={ () =>  this.openDialog(true)}*/
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Icon name="camera" color={Colors.headerBack} size={25}/>
                            </View>

                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        )


    };

    render() {
        return (
            <View style={ styles.container }>
                <StatusBar backgroundColor={Colors.headerBack} barStyle="light-content"/>

                <ListView
                    contentContainer={ styles.listContainer }
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderRow={(rowData) => this._renderRows(rowData)}
                    renderHeader={() => this._renderHeader()}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={{
                        flex: 1,
                        height: 0.5,
                        marginLeft: 20, marginRight: 2,
                        backgroundColor: Colors.grayLight
                    }}/>}
                />

                <Dialog
                    title="Selected Image"
                    titleStyle={Colors.headerBack}
                    animationType="fade"
                    contentStyle={
                        {
                            alignItems: "center",
                            justifyContent: "center",
                        }
                    }
                    onTouchOutside={ () => this.openDialog(false) }
                    visible={ this.state.showDialog }>

                    <View style={styles.ImageContainer}>

                        { this.state.ImageSource === null ? <Text>Select a Photo</Text> :
                            <Image style={styles.ImageContainer} source={this.state.ImageSource}/>
                        }

                    </View>

                    <TouchableOpacity
                        underlayColor='white'
                        style={{
                            marginTop: 20,
                            backgroundColor: Colors.headerBack,
                            height: 40,
                            width: 150,
                            justifyContent: 'center'
                        }}
                        onPress={() => this.openDialog(false)}>


                        <Text style={{color: Colors.white, textAlign: 'center'}}>OK</Text>


                    </TouchableOpacity>

                </Dialog>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        // marginTop: 4,
        //  marginLeft: 5,

        //  shadowRadius: 5,
        //  borderRadius: 10,

        //  shadowColor: Colors.black,
        //  shadowOpacity: 0.2,


        shadowOffset: {
            height: 10,
            width: 0
        },

        alignItems: 'stretch',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: Colors.white,
        overflow: 'visible',


    },
    headerGroup: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,


    },
    input: {
        height: 50,
        width: width - 90,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    listContainer: {
        margin: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        marginHorizontal: 15,
        height: 50
    },
    rowText: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        lineHeight: 20,

    }, stat: {
        textAlign: 'center',
        color: '#B0171F',
        marginBottom: 1,
    },
    ImageContainer: {
        borderRadius: 2,
        width: 300,
        height: 320,
        //  flex:1,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',

    },

});
