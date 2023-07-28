import React from "react";
import {Drawer as MUIDrawer, ListItem, List, ListItemIcon, ListItemText} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaidIcon from '@mui/icons-material/Paid';
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    drawer: {
        width: '200px',
    }
    
});


const Drawer = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const itemsList = [
        {
            text: "Dashboard",
            icon: <DashboardIcon/>,
            onClick: () => navigate('/dashboard'), // Correct onClick property
        },
        {
            text: "Transactions",
            icon: <PaidIcon/>,
            onClick: () => navigate('/transactions'), // Correct onClick property
        }
    ];
    return (
        <MUIDrawer variant="permanent" className={classes.drawer}>
            <List>
            {itemsList.map((item, index) => {
                const {text, icon, onClick} = item;
                return (
                    <ListItem button key={text} onClick={onClick}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text}/>
                </ListItem>
                )  
                })}
            </List>
        </MUIDrawer>
    );
}
export default Drawer;
