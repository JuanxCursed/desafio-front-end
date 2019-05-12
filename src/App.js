import React from 'react';
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

import {capturePokemon, fetchPokemon, fetchPokemons, myPokedex, releasePokemon, searchTerm} from './actions'

import PokeList from "./components/PokeList";
import PokeDetail from "./components/PokeDetail";
import SearchBar from "./components/SearchBar";

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1400 + theme.spacing.unit * 3 * 2)]: {
            width: 1400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    scrollableContainer: {
        maxHeight: 450,
        overflowY: 'auto',
        marginRight: 15
    },
    selectedContainer: {
        marginTop: 32,
    }
});

class App extends React.Component {
    async componentDidMount() {
        await this.props.myPokedex();
        await this.props.fetchPokemons();
    }

    onSelectPokemon = async pokemon => {
        await this.props.fetchPokemon(pokemon);
    };

    togglePokemon = async () => {
        let {name} = this.props.selected;
        let hasPokemon = this.props.catched.filter(el => el.name === name);
        hasPokemon.length > 0 ?
            await this.props.releasePokemon(name) :
            await this.props.capturePokemon(name);
    };

    handleChange = e => {
        this.props.searchTerm(e.target.value);
    };


    render() {
        return (
            <div>
                <CssBaseline/>
                <AppBar position="static" color="secondary">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            Pokedex
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container style={{marginTop: '25px'}} spacing={8} className={this.props.classes.layout}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="inherit">
                            My Pokedex
                        </Typography>
                        <div className={this.props.classes.scrollableContainer}>
                            <PokeList
                                onPokemonSelected={this.onSelectPokemon}
                                pokemons={this.props.catched}
                            />
                        </div>
                        <SearchBar
                            handleChange={this.handleChange}
                            value={this.props.term}
                        />
                        <Typography variant="h6" color="inherit">
                            Pokemons
                        </Typography>
                        <div className={this.props.classes.scrollableContainer}>
                            <PokeList
                                onPokemonSelected={this.onSelectPokemon}
                                pokemons={this.props.pokemons}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} className={this.props.classes.selectedContainer}>
                        <PokeDetail
                            onClickPokeBall={this.togglePokemon}
                            pokemon={this.props.selected}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = ({pokemons}) => {
    return {
        catched: pokemons.catched,
        owned: pokemons.owned,
        pokemons: pokemons.pokemons,
        selected: pokemons.selected,
        term: pokemons.term,
    }
};

export default connect(mapStateToProps, {
    fetchPokemons,
    fetchPokemon,
    searchTerm,
    myPokedex,
    capturePokemon,
    releasePokemon
})(withStyles(styles)(App));
