// @flow
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

import Voice from 'react-native-voice';
import  Colors from '../../../thems/Colors'

class VoiceTest extends Component {
    state = {
        recognized: '',
        pitch: '',
        error: '',
        end: '',
        started: '',
        results: [],
        partialResults: [],
    };

    constructor(props) {
        super(props);
        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechRecognized = this.onSpeechRecognized;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    }

    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
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

    render() {
        return (
            <View style={styles.container}>

                <View style={{backgroundColor: Colors.headerBack, width: '100%', alignItems: 'center'}}>

                    <Text style={{fontSize: 20, textAlign: 'center', margin: 10, color: Colors.white}}>
                        Welcome to SunEmpTracker Voice!
                    </Text>

                    <Text style={{
                        textAlign: 'center',
                        color: Colors.white,
                        marginBottom: 5,
                    }}>
                        Press the button and start speaking.
                    </Text>


                    <TouchableHighlight onPress={this._startRecognizing}>
                        <Image style={{
                            width: 50,
                            height: 50, marginBottom: 20, marginTop: 20
                        }} source={require('../../../thems/image/button.png')}/>
                    </TouchableHighlight>

                    {/*<View style={{flex: 1, flexDirection: 'row', height: 50}}>
                        <View style={{width: '33%', height: 50, backgroundColor: 'powderblue'}}>
                            <TouchableHighlight onPress={this._stopRecognizing}>
                                <Text style={styles.action}>Stop Recognizing</Text>
                            </TouchableHighlight>

                        </View>
                        <View style={{width: '33%', height: 50, backgroundColor: 'skyblue'}}>
                            <TouchableHighlight onPress={this._cancelRecognizing}>
                                <Text style={styles.action}>Cancel</Text>
                            </TouchableHighlight>

                        </View>
                        <View style={{width: '33%', height: 50, backgroundColor: 'steelblue'}}>
                            <TouchableHighlight onPress={this._destroyRecognizer}>
                                <Text style={styles.action}>Destroy</Text>
                            </TouchableHighlight>
                        </View>
                    </View>*/}


                </View>



                {/*{this.state.results.map((result, index) => {
                    return (
                        <Text key={`result-${index}`} style={styles.stat}>
                            {result}
                        </Text>
                    );
                })}
                <Text style={styles.stat}>Partial Results</Text>*/}
                {this.state.partialResults.map((result, index) => {
                    return (
                        <Text key={`partial-result-${index}`} style={styles.stat}>
                            {result}
                        </Text>
                    );
                })}





            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    action: {
        textAlign: 'center',
        color: '#0000FF',
        marginVertical: 5,
        fontWeight: 'bold',

    },
    instructions: {
        textAlign: 'center',
        color: Colors.headerBack,
        marginBottom: 5,

    },
    stat: {
        textAlign: 'center',
        color: '#B0171F',
        marginBottom: 1,
    },
});

export default VoiceTest;