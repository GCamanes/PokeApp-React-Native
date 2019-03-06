import { createStackNavigator, createAppContainer } from 'react-navigation';
import ListPokemonScreen from './ListPokemonScreen';

const AppNavigator = createStackNavigator(
    {
        ListPokemon: ListPokemonScreen,
    },
    {
        initialRouteName: 'ListPokemon',
    },
);

export default AppContainer = createAppContainer(AppNavigator);