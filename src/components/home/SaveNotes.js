import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const SaveNotes = ({notes, setNotes, show, setShow, setFilterNotes}) => {
    const [title, setTitle] = useState('');
    const [dec, setDec] = useState('');

    const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth('default', {
        month: 'short',
    });
    let yy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    const today = dd + '-' + mm + '-' + yy;

    const saveNotes = async (title, dec) => {
        let newNote = [
            {
                title: title,
                description: dec,
                date: today,
            },
        ];

        let allNotes = [];
        if (notes == null) {
            allNotes = newNote;
        } else {
            allNotes = newNote.concat(notes);
        }

        setNotes(allNotes);
        setFilterNotes(allNotes);

        await AsyncStorage.setItem('notes', JSON.stringify(allNotes));
    };

    return (
        <Modal animationType="slide" transparent={true} visible={show}>
            <KeyboardAvoidingView style={{flex:1}}>
                <TouchableOpacity
                    onPress={() => setShow(!show)}
                    activeOpacity={0.8}
                    style={styles.CrossButton}>
                    <Text style={styles.CrossButtonText}>X</Text>
                </TouchableOpacity>

                <View style={styles.MainContainer}>
                    <ScrollView contentContainerStyle={styles.Container}>
                        <TextInput
                            placeholder="Enter Your Title"
                            placeholderTextColor={'gray'}
                            multiline
                            style={styles.TitleContainer}
                            value={title}
                            onChangeText={text => setTitle(text)}
                        />
                        <TextInput
                            placeholder="Enter Your Notes"
                            placeholderTextColor={'gray'}
                            multiline
                            style={styles.NotesContainer}
                            value={dec}
                            onChangeText={text => setDec(text)}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setShow(!show);
                                saveNotes(title, dec);
                                setTitle(null);
                                setDec(null);
                            }}
                            style={styles.SaveButton}>
                            <Text style={styles.SaveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default SaveNotes;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    CrossButton: {
        position: 'absolute',
        right: 20,
        top: 30,
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: 'red',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CrossButtonText: {
        color: '#fff',
        fontSize: height * 0.019,
        fontWeight: '900',
    },
    MainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    Container: {
        width: width * 0.9,
        // height: height * 0.6,
        backgroundColor: '#fff44f',
        elevation: 5,
        borderRadius: 20,
        overflow: 'hidden',
    },
    TitleContainer: {
        height: height * 0.07,
        fontSize: height * 0.02,
        paddingHorizontal: 20,
        backgroundColor: '#fff44f',
        color: '#000',
        elevation: 10,
    },
    NotesContainer: {
        height: height * 0.35,
        fontSize: height * 0.015,
        paddingHorizontal: 20,
        backgroundColor: '#fff44f',
        elevation: 4,
        textAlignVertical: 'top',
        color: '#000',
    },
    SaveButton: {
        width: 200,
        height: 50,
        marginVertical: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 5,
        backgroundColor: 'cyan',
    },
    SaveButtonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: height * 0.02,
    },
});
