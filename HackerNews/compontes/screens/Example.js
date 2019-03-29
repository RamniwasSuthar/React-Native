import React, { Component } from 'react';
import {
    AppRegistry, Image,
    Text,
    View
} from 'react-native';
import ReactNativeTooltipMenu from 'react-native-tooltip-menu';

export default class Example extends Component {
    state = {
        counterItem1: 0,
        counterItem2: 0
    };

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 25 }}>
                <View>
                    <Text style={{ textAlign: 'center' }}>This is example of react-native-tooltip-menu</Text>
                    <Text style={{ textAlign: 'center' }}>Clicked item1: {this.state.counterItem1}</Text>
                    <Text style={{ textAlign: 'center' }}>Clicked item2: {this.state.counterItem2}</Text>
                </View>
                <ReactNativeTooltipMenu
                    buttonComponent={
                        <View
                            style={{
                                backgroundColor: 'transparent',
                                padding: 10,
                                borderRadius: 25
                            }}
                        >
                           {/* <Text style={{ color: 'white', flex: 1 }}>
                                Click me to show tooltip!
                            </Text>*/}
                            <Image style={{width: 30, height: 30}}
                                   source={require('../thems/image/icon_latest_storys.png')}/>
                        </View>
                    }
                    items={[
                        {
                            label: 'Label #1',
                            onPress: () => this.setState({ filterStoryPosition: this.state.counterItem1 + 1 })
                        },
                        {
                            label: 'Label #2',
                            onPress: () => this.setState({ filterDatePosition: this.state.counterItem2 + 1 }),
                        },
                    ]}
                />
            </View>
        )
    }
}

