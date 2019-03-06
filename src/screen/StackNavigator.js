import { createStackNavigator, createAppContainer } from 'react-navigation';
import ListPokemonScreen from './ListPokemonScreen';
import DetailPokemonScreen from './DetailPokemonScreen';

const AppNavigator = createStackNavigator(
    {
        List: ListPokemonScreen,
        Detail: DetailPokemonScreen,
    },
    {
        initialRouteName: 'List',
    },
);

export default AppContainer = createAppContainer(AppNavigator);