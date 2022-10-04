import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';

const PlusButton = ({show, setShow}) => {
    return (
        <TouchableOpacity
            onPress={() => setShow(true)}
            activeOpacity={0.7}
            style={styles.container}>
            <Text style={styles.IconStyle}>+</Text>
        </TouchableOpacity>
    );
};

export default PlusButton;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: height*.06,
        height: height*.06,
        borderRadius: 100,
        elevation: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems:'center'
    },
    IconStyle: {
        fontSize: height * 0.04,
        color:'black'
    },
});
