import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
    paper: {
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    form: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
};

const SearchBar = ({handleChange, value, classes}) => (
    <Paper className={classes.paper} elevation={1}>
        <form className={classes.form}>
            <InputBase
                className={classes.input}
                onChange={handleChange}
                type="text"
                value={value}
                placeholder="Enter a Pokemon full name or ID"/>
            <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon/>
            </IconButton>

        </form>
    </Paper>
);
export default withStyles(styles)(SearchBar);
