import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

class Preloader extends Component {
    render() {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator style={{ height: 80 }} size="large" color="#ffffff" />
            </View>
        );
    }
}
export default Preloader;

const styles = StyleSheet.create({
    preloader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        backgroundColor: '#cd1c26'
    }
});