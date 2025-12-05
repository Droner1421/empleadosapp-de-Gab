import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, TextInput, FlatList } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { ReportesDrawerParams } from "../navigator/ReportesNavigator";
import { useReporteAsistencia } from "../hooks/useReportes";

// Definición de Colores (Actualizada a la paleta Naranja)
const PRIMARY_ORANGE = '#FF6700'; // Naranja Principal
const DARK_ORANGE = '#CC5200'; // Naranja Oscuro
const BACKGROUND_LIGHT = '#F9FAFB';
const TEXT_DARK = '#1F2937';
const TEXT_GRAY = '#6B7280';
const CARD_BG = '#FFFFFF';
const BORDER_COLOR = '#E5E7EB';
const INPUT_BG = '#F3F4F6';
const COLOR_ENTRADA = PRIMARY_ORANGE; // Naranja
const COLOR_SALIDA = '#EF4444'; // Rojo (Mantenido para alerta de Salida)
const COLOR_TURNO = DARK_ORANGE; // Naranja Oscuro

// Interfaz para los detalles del registro de asistencia
interface AsistenciaItem {
    a_id_reg_a: number;
    e_nombre: string;
    e_apellido_p: string;
    a_fecha: string;
    a_horaEntrada: string;
    a_horaSalida: string;
    a_turno: string;
}

export const ReporteAsistenciaScreen = ({ route, navigation }: Props) => {
    const { empleado } = route.params as { empleado: any };
    const { data, isLoading, loadData } = useReporteAsistencia();
    const [fechaInicio, setFechaInicio] = useState("01/01/2025");
    const [fechaFin, setFechaFin] = useState("02/01/2025");

    const handleLoadData = () => {
        loadData(empleado.id_empleado, fechaInicio, fechaFin);
    };

    useEffect(() => {
        handleLoadData();
    }, []);

    if (isLoading && !data) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size="large" color={PRIMARY_ORANGE} />
                <Text style={style.loadingText}>Cargando registros...</Text>
            </View>
        );
    }

    const renderHeader = () => (
        <>
            {/* Encabezado Diagonal Naranja */}
            <View style={style.designHeaderContainer}>
                <View style={style.diagonalShape} />
                <View style={style.titleContent}>
                    <Text style={style.headerTitle}>REGISTROS DE ASISTENCIA</Text>
                    <Text style={style.headerSubtitle}>{empleado.nombre} {empleado.apellido_p || empleado.apellido}</Text>
                </View>
            </View>
            
            {/* Contenedor de Filtros Asimétrico */}
            <View style={style.filterContainer}>
                <Text style={style.filterTitle}>Filtro de Fechas</Text>
                <View style={style.actionInputGroup}>
                    <TouchableOpacity style={style.btnBuscar} onPress={handleLoadData} disabled={isLoading}>
                        <Text style={style.btnBuscarText}>
                            {isLoading ? '...' : 'Buscar'}
                        </Text>
                    </TouchableOpacity>
                    <View style={style.inputGroup}>
                        <TextInput
                            style={style.input}
                            placeholder="Inicio (DD/MM/AAAA)"
                            placeholderTextColor={TEXT_GRAY}
                            value={fechaInicio}
                            onChangeText={setFechaInicio}
                            keyboardType="numbers-and-punctuation"
                        />
                        <TextInput
                            style={style.input}
                            placeholder="Fin (DD/MM/AAAA)"
                            placeholderTextColor={TEXT_GRAY}
                            value={fechaFin}
                            onChangeText={setFechaFin}
                            keyboardType="numbers-and-punctuation"
                        />
                    </View>
                </View>
            </View>

            {/* Resumen de Registros (Tarjeta Naranja) */}
            {data && (
                <View style={style.summaryCard}>
                    <View style={style.summaryRow}>
                        <Text style={style.summaryLabel}>Total Registros Encontrados:</Text>
                        <Text style={style.summaryValue}>{data.total}</Text>
                    </View>
                </View>
            )}

            {/* Mensaje de datos vacíos, solo si no está cargando */}
            {!isLoading && (!data || data.total === 0) && (
                <View style={style.emptyMessage}>
                    <Text style={style.emptyText}>No se encontraron registros de asistencia en el periodo seleccionado.</Text>
                </View>
            )}
        </>
    );

    const renderItem = ({ item }: { item: AsistenciaItem }) => (
        <View style={style.card}>
            <View style={style.row}>
                <Text style={style.label}>Fecha:</Text>
                <Text style={style.value}>{item.a_fecha}</Text>
            </View>
            <View style={style.row}>
                <Text style={style.label}>Hora de Entrada:</Text>
                <Text style={[style.value, { color: COLOR_ENTRADA, fontWeight: '700' }]}>{item.a_horaEntrada}</Text>
            </View>
            <View style={style.row}>
                <Text style={style.label}>Hora de Salida:</Text>
                <Text style={[style.value, { color: COLOR_SALIDA, fontWeight: '700' }]}>{item.a_horaSalida}</Text>
            </View>
            <View style={[style.row, style.rowLast]}>
                <Text style={style.label}>Turno:</Text>
                <Text style={[style.value, { color: COLOR_TURNO, fontWeight: '700' }]}>{item.a_turno}</Text>
            </View>
        </View>
    );

    return (
        <View style={style.root}>
            <FlatList
                contentContainerStyle={style.listContent}
                data={(data?.data || []) as AsistenciaItem[]}
                keyExtractor={(item) => item.a_id_reg_a.toString()}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ height: 40 }} />}
            />
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: BACKGROUND_LIGHT,
    },
    containerLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BACKGROUND_LIGHT,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: TEXT_GRAY,
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
        backgroundColor: PRIMARY_ORANGE,
        transform: [
            { rotateZ: '-5deg' },
            { translateY: -60 }
        ],
        transformOrigin: 'top left',
        height: 180,
        shadowColor: PRIMARY_ORANGE,
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
        backgroundColor: CARD_BG,
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        borderLeftWidth: 3, 
        borderLeftColor: PRIMARY_ORANGE,
    },
    filterTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_DARK,
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
        backgroundColor: INPUT_BG,
        borderRadius: 8,
        paddingHorizontal: 10, 
        paddingVertical: 10,
        marginBottom: 10,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        color: TEXT_DARK,
        fontSize: 13,
        height: 40, 
    },
    btnBuscar: {
        backgroundColor: PRIMARY_ORANGE,
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
    
    // --- Resumen Naranja ---
    summaryCard: {
        backgroundColor: PRIMARY_ORANGE,
        borderRadius: 10,
        padding: 16,
        marginBottom: 15,
        shadowColor: DARK_ORANGE,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    summaryLabel: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: "600",
        flex: 1,
    },
    summaryValue: {
        fontSize: 20,
        fontWeight: "800",
        color: '#FFFFFF',
        flex: 1,
        textAlign: "right",
    },
    
    // --- Tarjetas de Detalle ---
    card: {
        backgroundColor: CARD_BG,
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: DARK_ORANGE,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    rowLast: {
        borderBottomWidth: 0,
        paddingBottom: 0,
    },
    label: {
        fontSize: 13,
        color: TEXT_GRAY,
        fontWeight: "600",
        flex: 1,
    },
    value: {
        fontSize: 14,
        fontWeight: "600",
        color: TEXT_DARK,
        flex: 1,
        textAlign: "right",
    },
    
    // --- Mensaje Vacío ---
    emptyMessage: {
        padding: 30,
        backgroundColor: CARD_BG,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        borderLeftWidth: 3, 
        borderLeftColor: PRIMARY_ORANGE,
    },
    emptyText: {
        fontSize: 14,
        color: TEXT_GRAY,
        textAlign: 'center',
        lineHeight: 22,
    },
});