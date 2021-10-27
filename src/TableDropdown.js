import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link as RouterLink, Redirect, 
    useRouteMatch} from 'react-router-dom';
import { Button, Link} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const TableDropdown = ({text, items}) => {
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);
    const menuClose = () => {
        if(anchor != null){
            setAnchor(null);
        }
    }

    const menuClickHandler = () => {
        setAnchor(null);
    }

    const clickHandler = (e) => {
        setAnchor(e.currentTarget);
    }

    return <div>
        <Button onClick={clickHandler} variant='contained'>
            {text}
        </Button>
        <Menu
                anchorEl={anchor}
                open={open}
                onClose={menuClose}
        >
            {items.map(item => {
                if(item.link){
                    return <MenuItem
                    key={item.path}
                    onClick={menuClickHandler}
                    component={RouterLink}
                    to={item.path}
                >
                {item.text}
            </MenuItem>
                }else{
                    return <MenuItem
                    key={item.text}
                    onClick={(e) => {
                        menuClickHandler();
                        item.action();
                    }}
                    >
                    {item.text}
                    </MenuItem>
                }

            })}
        </Menu>        
    </div>
}

export default TableDropdown;