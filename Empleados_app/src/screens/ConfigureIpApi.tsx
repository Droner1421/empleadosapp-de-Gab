import React, { useContext, useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
} from "react-native";
import { ApiConfigContext } from "../context/ApiConfigContext";

export const ConfigureIpApi = ({ navigation }: any) => {
    const { apiIP, setApiIP } = useContext(ApiConfigContext);
    const [ip, setIp] = useState(apiIP);

    const handleSave = () => {
        if (!ip.trim()) {
            Alert.alert("Error", "Por favor ingresa una IP");
            return;
        }
        setApiIP(ip);
        Alert.alert("Éxito", "IP configurada");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.headerTextContainer}>
                <Text style={styles.title}>CONFIGURACIÓN DE API</Text>
                <Text style={styles.subtitle}>
                    Define la dirección que la aplicación usará para conectarse a tu servicio.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.currentIpLabel}>IP/URL ACTUAL</Text>
                <Text style={styles.currentIpValue}>{apiIP || 'NO CONFIGURADA'}</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="ej: http://192.168.1.100:3000"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        value={ip}
                        onChangeText={setIp}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="url"
                    />
                </View>
                
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>GUARDAR</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6700', // FONDO NARANJA TOTAL
        paddingHorizontal: 25,
        paddingTop: 80,
    },
    headerTextContainer: {
        marginBottom: 60, 
    },
    title: {
        fontSize: 26,
        fontWeight: "900",
        color: '#FFFFFF', // Texto Blanco
        marginBottom: 10,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)', // Texto ligeramente transparente
        lineHeight: 22,
        maxWidth: '85%', 
        textAlign: 'left',
    },
    
    // --- Card y Componentes Centrales ---
    card: {
        backgroundColor: '#F9FAFB', // Tarjeta de fondo blanco/gris
        borderRadius: 15,
        padding: 25,
        
        alignSelf: 'center',
        width: '100%',
        marginTop: 0, 
        
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 10,
    },
    currentIpLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FF6700', // Naranja
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 4,
    },
    currentIpValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    inputContainer: {
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#FF6700', // Input Naranja
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 14,
        fontSize: 15,
        color: '#FFFFFF', // Texto del input Blanco
        fontWeight: '600',
        
        // Sombra de Input más pronunciada
        shadowColor: "#FF6700",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    
    // --- Botón de Acción Naranja Oscuro ---
    button: {
        backgroundColor: '#CC5200', // Naranja más oscuro para contraste en la acción
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        
        shadowColor: '#CC5200',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "800",
        letterSpacing: 1,
    },
});