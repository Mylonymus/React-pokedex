import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemon, getPokemonDetails } from '../api';
import { setLoading } from './uiSlice';

const initialState = {
    pokemons: [],
    pokemonsFiltered: []
};

export const fetchPokemonsWithDetails = createAsyncThunk(
    'data/fetchPokemonsWithDetails',
    async (_, { dispatch }) => {
        dispatch(setLoading(true));
        const pokemonsRes = await getPokemon();
        const pokemonsDetailed = await Promise.all(
            pokemonsRes.map((pokemon) => getPokemonDetails(pokemon))
        );
        dispatch(setPokemons(pokemonsDetailed));
        dispatch(setLoading(false));
    }
);

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload;
            state.pokemonsFiltered = action.payload;
        },
        setFavorite: (state, action) => {
            const currentPokemonIndex = state.pokemons.findIndex((pokemon) => {
                return pokemon.id === action.payload.pokemonId;
            });
            const currentFilteredPokemonIndex = state.pokemonsFiltered.findIndex((pokemon) => {
                return pokemon.id === action.payload.pokemonId;
            });

            if (currentPokemonIndex >= 0) {
                const isFavoriteFiltered = state.pokemonsFiltered[currentFilteredPokemonIndex].favorite;
                const isFavorite = state.pokemons[currentPokemonIndex].favorite;
                state.pokemonsFiltered[currentFilteredPokemonIndex].favorite = !isFavoriteFiltered;
                state.pokemons[currentPokemonIndex].favorite = !isFavorite;
            }
        },
        setFilter: (state, action) => {
            const pokemonsFiltered = state.pokemons.filter(pokemon => pokemon.name.includes(action.payload));
            state.pokemonsFiltered = pokemonsFiltered;
        }
    },
});

export const { setFavorite, setPokemons, setFilter } = dataSlice.actions;
console.log('🚀 ~ file: dataSlice.js ~ line 29 ~ dataSlice', dataSlice);

export default dataSlice.reducer;
