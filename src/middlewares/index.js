export const logger = (store) => (next) => (action) => {
    console.log(action);
    next(action);
};

export const featuring = (store) => (next) => (actionInfo) => {
    const featured = [{ name: 'Eddie' }, ...actionInfo.action.payload];
    const updatedActionInfo = {
        ...actionInfo, 
        action: {...actionInfo.action, payload: featured}, 
    };
    next(updatedActionInfo);
}

export const addNumberPokemon = (store) => (next) => (actionInfo) => {
    let arrayPokemons = actionInfo.action.payload;

    arrayPokemons.forEach(pokemon => {
        if(pokemon.id){
            pokemon.pokemonNumber = Number(pokemon.id);
        }else{
            pokemon.pokemonNumber = 'CUSTOM';
        }
    })
    
    const updatedAction = {
        ...actionInfo, payload: arrayPokemons,        
    };
    next(updatedAction);
}
