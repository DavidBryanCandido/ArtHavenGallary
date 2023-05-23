import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    FlatList,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../Global/styles'
import Header from '../Components/Header'
import { FIRESTORE_DB } from '../../firebaseConfig'
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    updateDoc,
    increment,
    getDoc,
} from 'firebase/firestore'

export function TodoItem({ todo }) {
    return (
        <View style={styles.todoItem}>
            <Text style={styles.todoId}>ID: {todo.id}</Text>
            <Text style={styles.todoTitle}>{todo.title}</Text>
            <Text style={styles.todoStatus}>
                {todo.done ? 'Done' : 'Pending'}
            </Text>
        </View>
    )
}

const NotificationScreen = ({ navigation }) => {
    const onMenuPress = () => {
        navigation.toggleDrawer()
    }
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState([])
    const addTodo = async () => {
        try {
            const docRef = await addDoc(collection(FIRESTORE_DB, 'todos'), {
                title: todo,
                done: false,
            })
            console.log('Document written with ID: ', docRef.id)
            setTodo('')
        } catch (e) {
            console.error('Error adding document: ', e)
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(FIRESTORE_DB, 'todos'),
            (snapshot) => {
                const newTodos = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setTodos(newTodos)
            }
        )
        return () => unsubscribe()
    }, [])

    return (
        <View style={{ ...styles.container, flex: 1 }}>
            <Header
                menuOrBack={'forwardburger'}
                title={'Notification'}
                fontSize={22}
                onMenuPress={onMenuPress}
                navigation={navigation}
            />
            {/*
            <View style={styles.form}>
                <TextInput
                    placeholder="add new todo"
                    onChangeText={(text) => setTodo(text)}
                    value={todo}
                    style={styles.input}
                />
                <Button title="add" onPress={addTodo} disabled={todo === ''} />
            </View>
            {todos.length > 0 && (
                <View>
                    <FlatList
                        data={todos}
                        renderItem={({ item }) => <TodoItem todo={item} />}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            )}
            */}
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgLight,
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'green',
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    todoTitle: {
        fontSize: 16,
    },
    todoStatus: {
        fontSize: 14,
        color: 'gray',
    },
})
