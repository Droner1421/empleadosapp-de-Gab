import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { ReportesDrawerParams } from "../navigator/ReportesNavigator";
import { useUnidadesProducidas } from "../hooks/useReportes";

type Props = DrawerScreenProps<ReportesDrawerParams, 'UnidadesProducidasScreen'>;

export const UnidadesProducidasScreen = ({ route, navigation }: Props) => {
    const { empleado } = route.params as { empleado: any };
    const { data, isLoading, loadData } = useUnidadesProducidas();
    const [fechaInicio, setFechaInicio] = useState("01/01/2025");
    const [fechaFin, setFechaFin] = useState("02/01/2025");

    const handleLoadData = () => {
        loadData(empleado.id_empleado, fechaInicio, fechaFin);
    };

    useEffect(() => {
        handleLoadData();
    }, []);

    return (
        <View style={style.root}>
            {isLoading ? (
                <View style={style.containerLoading}>
                    <ActivityIndicator size="large" color="#3B82F6" />
                </View>
            ) : (
                <>
                    <ScrollView style={style.content}>
                        <View style={style.filterContainer}>
                            <TextInput
                                style={style.input}
                                placeholder="Fecha Inicio"
                                value={fechaInicio}
                                onChangeText={setFechaInicio}
                            />
                            <TextInput
                                style={style.input}
                                placeholder="Fecha Fin"
                                value={fechaFin}
                                onChangeText={setFechaFin}
                            />
                            <TouchableOpacity style={style.btnBuscar} onPress={handleLoadData}>
                                <Text style={style.btnBuscarText}>Buscar</Text>
                            </TouchableOpacity>
                        </View>

                        {data && (
                            <View style={style.dataContainer}>
                                <View style={style.card}>
                                    <View style={style.row}>
                                        <Text style={style.label}>Total de Items:</Text>
                                        <Text style={style.value}>{data.total?.length || 0}</Text>
                                    </View>
                                </View>

                                {data.total && data.total.length > 0 && (
                                    <>
                                        {data.total.map((item, index) => (
                                            <View key={index} style={style.card}>
                                                <View style={style.row}>
                                                    <Text style={style.label}>Producción:</Text>
                                                    <Text style={[style.value, { color: "#27AE60", fontSize: 18 }]}>
                                                        {item.total_producido}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))}
                                    </>
                                )}
                            </View>
                        )}
                    </ScrollView>
                    <View style={{ paddingVertical: 20 }} />
                </>
            )}
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    containerLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F9FAFB',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#6B7280',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 0, 
    },
    
    // --- Header de Diseño (Naranja) ---
    designHeaderContainer: {
        height: 100,
        marginBottom: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        marginHorizontal: -16, 
        marginTop: -12, 
    },
    diagonalShape: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FF6700', // Naranja Primario
        transform: [
            { rotateZ: '-5deg' },
            { translateY: -60 }
        ],
        transformOrigin: 'top left',
        height: 180,
        shadowColor: '#FF6700',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    titleContent: {
        position: 'absolute',
        top: 35,
        left: 25,
        right: 20,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 2,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    headerSubtitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFFFFF',
        lineHeight: 22,
    },

    // --- Filtros Asimétricos ---
    filterContainer: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        borderLeftWidth: 3, 
        borderLeftColor: '#FF6700', // Naranja Primario
    },
    filterTitle: { 
        fontSize: 15,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 10,
    },
    actionInputGroup: { 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputGroup: {
        flexDirection: 'row',
        flex: 1, 
        marginLeft: 10, 
    },
    input: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        paddingHorizontal: 10, 
        paddingVertical: 10,
        marginBottom: 10,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        color: '#1F2937',
        fontSize: 13,
        height: 40, 
    },
    btnBuscar: {
        backgroundColor: '#FF6700', // Naranja Primario
        borderRadius: 8,
        paddingVertical: 10, 
        paddingHorizontal: 12, 
        alignItems: "center",
        height: 40, 
    },
    btnBuscarText: {
        color: "white",
        fontWeight: "700",
        fontSize: 14,
        letterSpacing: 0.3,
    },
    
    // --- Tarjeta de Resumen Naranja ---
    summaryCard: {
        backgroundColor: '#FF6700', // Naranja Primario
        borderRadius: 10,
        padding: 16,
        marginBottom: 15,
        shadowColor: '#CC5200', // Naranja Oscuro
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 4,
    },
    summaryRowLast: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.5)',
        marginTop: 5,
        paddingTop: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: "600",
        flex: 1,
    },
    summaryValue: {
        fontSize: 24,
        fontWeight: "800",
        color: '#FFFFFF',
        flex: 1,
        textAlign: "right",
    },
    summaryValueSmall: {
        fontSize: 16,
        fontWeight: "700",
        color: '#FFFFFF',
        flex: 1,
        textAlign: "right",
    },
    listTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 10,
        marginTop: 5,
    },

    // --- Tarjetas de Detalle (List Items) ---
    dataContainer: { 
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#CC5200', // Naranja Oscuro
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    rowLast: { 
        borderBottomWidth: 0,
        paddingBottom: 0,
        marginTop: 4,
    },
    label: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: "600",
        flex: 1,
    },
    labelTotal: {
        fontSize: 14,
        color: '#CC5200', // Naranja Oscuro
        fontWeight: "700",
        flex: 1,
    },
    value: {
        fontSize: 14,
        fontWeight: "600",
        color: '#1F2937',
        flex: 1,
        textAlign: "right",
    },
    valueTotal: {
        fontSize: 16,
        fontWeight: "800",
        color: '#FF6700', // Naranja Primario
        flex: 1,
        textAlign: "right",
    },
    // --- Mensaje Vacío ---
    emptyMessage: {
        padding: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        borderLeftWidth: 3, 
        borderLeftColor: '#FF6700', // Naranja Primario
    },
    emptyText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
    },
});