import React from 'react'
import Drawer from './Drawer'
import FuturePlan from './FuturePlan'
import Dashboard from './Dashboard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    container: {
        display: 'flex',
    }
})

export default function Sidebar(){
    const classes = useStyles();
    return (
        <div className={classes.container}> 
            <Drawer variant="permanent"/>
            <Dashboard />
            <FuturePlan />
        </div>
        
        
        
    )

}