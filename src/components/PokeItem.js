import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        cursor:'pointer'
    },
    text:{
        textTransform: 'capitalize'
    }
});

const PokeItem = ({pokemon, onPokemonSelected, classes}) => {
    return (
        <Grid item xs={4}>
            <Paper className={classes.paper} onClick={() => onPokemonSelected(pokemon)} elevation={1}>
                <Typography variant="h5" component="h3" className={classes.text}>
                    {pokemon.name}
                </Typography>
            </Paper>
        </Grid>
    );
};

export default withStyles(styles)(PokeItem);
