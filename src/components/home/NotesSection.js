import React, {useState} from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ShowNotes from './ShowNotes';

const NotesSection = ({filterNotes, setFilterNotes, notes, setNotes}) => {
    const [noteShow, setNoteShow] = useState(false);
    const [index, setIndex] = useState();
    const [editNotes, setEditNotes] = useState(false);

    const deleteNotes = async index => {
        const tempNotes = notes;
        tempNotes.splice(index, 1);
        // console.log("TempNotes  => ",tempNotes);
        setFilterNotes(tempNotes);
        setNotes(tempNotes);
        // await AsyncStorage.setItem('notes',JSON.stringify(tempNote))
    };
    const alertSection = index => {
        Alert.alert('Are you sure ?', '', [
            {
                text: 'NO',
                onPress: () => console.log('NO'),
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: () => {
                    deleteNotes(index);
                },
                style: 'cancel',
            },
        ]);
    };
    return (
        <>
            <View style={styles.Container}>
                <FlatList
                    data={filterNotes}
                    numColumns={2}
                    renderItem={({item, index}) => (
                        <TouchableOpacity
                            onPress={() => {
                                setIndex(index);
                                setNoteShow(!noteShow);
                            }}
                            activeOpacity={0.7}
                            style={styles.listContainer}>
                            <Text style={styles.DateText}>{item.date}</Text>
                            <Text style={styles.TitleText}> {item.title} </Text>
                            <Text style={styles.DescriptionText}>
                                {item.description}
                            </Text>
                            <View style={styles.IconContainer}>
                                <Icon
                                    name="edit"
                                    color="#000"
                                    size={height * 0.02}
                                    style={styles.EditIcon}
                                    onPress={() => {
                                        setIndex(index);
                                        setNoteShow(!noteShow);
                                        setEditNotes(true);
                                    }}
                                />
                                <Icon2
                                    name="delete"
                                    color="red"
                                    size={height * 0.02}
                                    style={styles.DeleteIcon}
                                    onPress={() => alertSection(index)}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={() => (
                        <Text style={styles.None}>No Notes available</Text>
                    )}
                />
            </View>
            {noteShow || editNotes ? (
                <ShowNotes
                    index={index}
                    editNotes={editNotes}
                    setEditNotes={setEditNotes}
                    noteShow={noteShow}
                    setNoteShow={setNoteShow}
                    setFilterNotes={setFilterNotes}
                    notes={notes}
                    setNotes={setNotes}
                />
            ) : null}
        </>
    );
};

export default NotesSection;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    listContainer: {
        width: width / 2 - 20,
        height: height * 0.2,
        borderRadius: 15,
        margin: 10,
        elevation: 10,
        backgroundColor: '#fff44f',
        padding: 20,
    },
    DateText: {
        flex: 0.5,
        textAlign: 'right',
        marginBottom: 5,
        fontSize: height * 0.013,
        color: '#000',
    },
    TitleText: {
        flex: 1,
        fontSize: height * 0.017,
        fontWeight: '500',
        color: '#000',
        marginBottom: 2,
    },
    DescriptionText: {
        flex: 2,
        fontSize: height * 0.014,
        fontWeight: '400',
        color: '#000',
    },
    None: {
        color: '#000',
        fontSize: height * 0.02,
        textAlign: 'center',
        marginTop: 10,
    },
    IconContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    EditIcon: {
        marginRight: 10,
        padding: 10,
    },
    DeleteIcon: {
        padding: 10,
    },
});
