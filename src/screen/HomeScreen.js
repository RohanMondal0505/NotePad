import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, StatusBar, StyleSheet, View} from 'react-native';
import Header from '../components/home/Header';
import NotesSection from '../components/home/NotesSection';
import PlusButton from '../components/home/PlusButton';
import SaveNotes from '../components/home/SaveNotes';
import SearchBar from '../components/home/SearchBar';

const HomeScreen = () => {
    const [notes, setNotes] = useState([]);
    const [filterNotes, setFilterNotes] = useState([]);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');

    const showNotes = async () => {
        const data = await AsyncStorage.getItem('notes');
        setNotes(JSON.parse(data));
        setFilterNotes(JSON.parse(data))
    };

    useEffect(() => {
        showNotes();
    }, []);

    return (
        <View style={styles.container}>
            {/* Statusbar */}
            <StatusBar backgroundColor={'gray'} />
            <KeyboardAvoidingView style={styles.container}>
                {/* Header */}
                <Header />

                {/* SearchBar */}
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    notes={notes}
                    filterNotes={filterNotes}
                    setFilterNotes={setFilterNotes}
                />

                {/* Notes Section */}
                <NotesSection
                    filterNotes={filterNotes}
                    setFilterNotes={setFilterNotes}
                    notes={notes}
                    setNotes={setNotes}
                />

                {/* Plus Button */}
                <PlusButton show={show} setShow={setShow} />
                <SaveNotes
                    notes={notes}
                    setNotes={setNotes}
                    show={show}
                    setShow={setShow}
                    setFilterNotes={setFilterNotes}
                />
            </KeyboardAvoidingView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },
});
