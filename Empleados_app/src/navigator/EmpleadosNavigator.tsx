import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeEmpleados } from "../screens/HomeEmpleados";
import { ReportesNavigator } from "./ReportesNavigator";
import { ConfigureIpApi } from "../screens/ConfigureIpApi";
import { CreateEmpleadoDto } from '../interfaces/empleadosInterface';

export type RootStackParams = {
    HomeEmpleados: undefined;
    Reportes: { empleado: CreateEmpleadoDto };
    ConfigureIpApi: undefined;
}

export type RootDrawerParams = {
    HomeStack: undefined;
    ConfigureIpApi: undefined;
}

const HomeStack = () => {
    const Stack = createStackNavigator<RootStackParams>();
    
    return (
        <Stack.Navigator
            initialRouteName="HomeEmpleados"
            screenOptions={{
                headerMode: "float",
                headerShown: false, 
            }}
        >
            <Stack.Screen name="HomeEmpleados" component={ HomeEmpleados } />
            <Stack.Screen 
                name="Reportes" 
                component={({ route }: any) => <ReportesNavigator empleado={route.params.empleado} />}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export const EmpleadosNavigator = () => {
    const Drawer = createDrawerNavigator<RootDrawerParams>();
    
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false, 
            }}
        >
            <Drawer.Screen 
                name="HomeStack" 
                component={HomeStack}
                options={{
                    title: "Empleados",
                   
                }}
            />
            <Drawer.Screen 
                name="ConfigureIpApi" 
                component={ConfigureIpApi}
                options={{ 
                    title: "Configurar IP del API",
                    
                }}
            />
        </Drawer.Navigator>
    );
}