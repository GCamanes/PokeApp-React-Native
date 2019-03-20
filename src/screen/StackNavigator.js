import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
import DetailPokemonScreen from './DetailPokemonScreen';

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Detail: DetailPokemonScreen,
    },
    {
        initialRouteName: 'Home',
    },
);

export default AppContainer = createAppContainer(AppNavigator);