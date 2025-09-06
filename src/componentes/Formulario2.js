import React, { useState } from "react";
import {Modal, StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, TouchableNativeFeedbackComponent, Pressable} from 'react-native'
import DatePicker from 'react-native-date-picker';

const Formulario = ( {modalVisible} ) => {

    const Image = {uri:'https://i.ibb.co/cYLP9z9/prueba.png>'}
    const [Nombre, setNombre] = useState('')
    const [Dirrección, setDirreccion] = useState('')
    const [Correo, setCorreo] = useState('')
    const [Telefono, setTelefono] = useState('')
    const [date, setDate] = useState(new Date())
    console.log(Nombre)

    return (
        <Modal animationType='slide' visible={modalVisible}> 
            <View style={style.modal} >
            <ImageBackground source={Image} resizeMode="cover" style={style.image} >
                <Text style={style.txt}>Torneos</Text>
                <Pressable style={style.btnagg} >  
                    <Text style={style.txt3}>CREAR NUEVO TORNEO</Text> 
                </Pressable>
            </ImageBackground>
            </View>
        </Modal>  
    )
}

const style = StyleSheet.create({
    modal: {
        flex: 1
    },
    txt:{
        color: '#fff',
        fontSize:25,
        fontWeight:"bold",
        textAlign: "center",
    },
    label: {
        marginHorizontal:5,
        marginBottom:5,
        fontSize: 15,
        color: '#fff'
    },
    input:{
        backgroundColor: 'white',
        color: 'black',
        marginLeft: 20,
        marginRight: 20,
        marginBottom:15,
        paddingTop: 1,
        paddingBottom: 1,
        borderRadius:10,
    },
    datepicker:{
        color:'blue'
    },
    image:{
        flex:1        
    },
    btnagg: {
        backgroundColor: '#0E0E16',
        padding: 10,
        paddingTop: 10,
        marginLeft: 20,
        marginRight: 20,
        width: 315,
        height: 39,
        left: 23,
        top: 300,
        borderRadius: 10,
    },
    txt3: {
        color:'white',
        textAlign: 'center',
    },
})

export default Formulario2