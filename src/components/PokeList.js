import _ from 'lodash';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import PokeItem from "./PokeItem";

const PokeList = ({pokemons, onPokemonSelected}) => {
    if (!pokemons || pokemons instanceof Promise) {
        return <CircularProgress/>;
    }
    if (pokemons.length === 0) {
        return <Typography component="p">Nenhum pokemon na sua Pokedex, temos que pegar!</Typography>;
    }
    const renderedList = pokemons.map(pokemon => {
        return (
            <PokeItem
                key={_.uniqueId(`${pokemon.name}_`)}
                pokemon={pokemon}
                onPokemonSelected={onPokemonSelected}
            />
        );
    });
    return <Grid container>{renderedList}</Grid>
};

export default PokeList;
