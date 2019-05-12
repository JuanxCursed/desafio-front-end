import _ from 'lodash';
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import {ButtonBase} from "@material-ui/core";

const styles = {
    uppercase: {
        textTransform: 'uppercase'
    },
    card: {
        display: 'flex',
    },
    thumb: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    content: {
        flex: '1',
    },
    cardTitle: {
        textTransform: 'capitalize'
    },
    media: {
        height: 250,
        width: 250
    },
    paper: {
        padding: 15,
        width: '100%'
    },
    chip: {
        marginRight: 5
    },
    grid: {
        maxWidth: '100%'
    },
    progress: {
        height: 15
    }
};


const PokeDetail = ({pokemon, onClickPokeBall, onClickType, onClickAbility, classes}) => {
    if (!pokemon || pokemon instanceof Promise) {
        return (
            <Typography gutterBottom variant="h5" component="h2">
                Select a Pokemon
            </Typography>
        );
    }
    return (
        <Card className={classes.card} raised>
            <div className={classes.thumb}>
                <CardMedia
                    component="img"
                    alt={pokemon.name}
                    className={classes.media}
                    height="140"
                    image={pokemon.thumb}
                    title={pokemon.name}
                />
            </div>
            <div className={classes.content}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                        {pokemon.name}
                        <small><em> DEX#{pokemon.id}</em></small>
                    </Typography>
                    <Grid container className={classes.grid}>
                        <Grid item xs={6}>
                            <Typography component="p">
                                Height: {pokemon.height / 10} m
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component="p">
                                Weight: {pokemon.weight / 10} kg
                            </Typography>
                        </Grid>
                        <Paper className={classes.paper}>
                            <Typography variant="h6">
                                Types
                            </Typography>
                            <Grid item xs={12}>
                                {pokemon.types.map(type => {
                                    return <Chip
                                        className={classes.chip}
                                        onClick={()=>onClickType({type:type})}
                                        key={_.uniqueId()}
                                        label={type}/>;
                                })}
                            </Grid>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Typography variant="h6">
                                Abilities
                            </Typography>
                            <Grid item xs={12}>
                                {pokemon.abilities.map(ability => {
                                    return <Chip onClick={onClickAbility}
                                                 data-url={ability.url}
                                                 className={classes.chip} key={_.uniqueId()} label={ability.name}/>;
                                })}
                            </Grid>
                        </Paper>
                        <Grid item xs={12}>
                            {pokemon.stats.map(stat => {
                                return (<div key={_.uniqueId()}>
                                        <Typography className={classes.uppercase} component="span">
                                            {stat.name}: {stat.value}
                                        </Typography>
                                        <LinearProgress className={classes.progress}
                                                        variant="determinate" value={stat.value / 3}/>
                                    </div>
                                );
                            })}
                        </Grid>
                        <Grid item xs={12} container>
                            {pokemon.evolutions.map(evolution => {
                                return (
                                    <Grid item xs key={_.uniqueId()}>
                                        <img src={evolution.thumb} alt="" width={80} height={80}/>
                                        <Typography component="p" className={classes.uppercase}>
                                            {evolution.name}
                                        </Typography>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </CardContent>
            </div>
            <CardActions>
                <ButtonBase size="small" color="primary" onClick={onClickPokeBall}>
                    <img
                        src={pokemon.owned ? '/static/pokeball-closed.png' : '/static/pokeball-open.png'}
                        alt=""
                        width={60}
                        height={60}/>
                </ButtonBase>
            </CardActions>
        </Card>
    );
};

export default withStyles(styles)(PokeDetail);
