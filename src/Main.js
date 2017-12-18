import React, { Component } from 'react';
import {
    View, Text, ListView, ActivityIndicator
} from 'react-native';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responeJson) => {
                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({
                    isLoading: false,
                    dataTitle: responeJson.title,
                    dataDes : responeJson.description,
                    dataRows: ds.cloneWithRows(responeJson.movies),
                }, function () {
                    // do something with new state
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <Text>{'Title : ' + this.state.dataTitle}</Text>
                <Text>{'Description : ' + this.state.dataDes}</Text>
                <ListView
                dataSource={this.state.dataRows}
                renderRow={(rowData) => <Text>{rowData.title}, {rowData.releaseYear}</Text>}
                />
            </View>
        );
    }
}