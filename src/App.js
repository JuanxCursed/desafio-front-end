import React from 'react';
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import {
    capturePokemon,
    closeAbilityDetail,
    fetchPokemon,
    fetchPokemons,
    filterByType,
    myPokedex,
    releasePokemon,
    searchTerm,
    showAbilityDetail
} from './actions'

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

    filterByType = async value => {
        this.props.filterByType(value);
    };

    showAbilityEffects = async e => {
        this.props.showAbilityDetail(e.target.parentElement.dataset.url)
    };

    closeAbilityEffects = () => {
        this.props.closeAbilityDetail();
    };

    renderAbilityEffects = () => {
        if (this.props.dialog.show) {
            let {data, show} = this.props.dialog;
            return (
                <Dialog onClose={this.closeAbilityEffects} open={show}>
                    <DialogTitle>Ability Effects</DialogTitle>
                    <div>
                        <List>
                            {data.map(effect => (
                                <ListItem key={effect}>
                                    <ListItemText primary={effect}/>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Dialog>
            );
        }
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
                {this.renderAbilityEffects()}
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
                            onClickAbility={this.showAbilityEffects}
                            onClickType={this.filterByType}
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
        pokemons: pokemons.pokemons,
        selected: pokemons.selected,
        term: pokemons.term,
        dialog: pokemons.dialog
    }
};

export default connect(mapStateToProps, {
    fetchPokemons,
    fetchPokemon,
    searchTerm,
    myPokedex,
    capturePokemon,
    showAbilityDetail,
    closeAbilityDetail,
    releasePokemon,
    filterByType
})(withStyles(styles)(App));
