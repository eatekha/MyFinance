import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  appBar: {

    khbackgroundColor: '#323233', // Set the background color here
  },
  appBarText: {
    color: 'white', // Set the text color here
  },
});

const MyAppBar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.appBarText}>
          My App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
