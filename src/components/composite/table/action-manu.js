import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    paper: {
        boxShadow: '0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)',
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        // padding: '8px 0',
        '& .MuiList-root':{
            padding: 0
        }
    },
    menuItem: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.87)',
        padding: '12px 16px',
        height: '48px'
    }
  });

const ActionMenu = ({ rowdata, options, handleActionClick }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(null);
        handleActionClick(e.target.innerText, rowdata)
    };

    const menuId = 'button-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'top' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={() => setAnchorEl(null)}
            classes={{
                paper: classes.paper
            }}
        >
            {options.map((option) => {
                let property, subProperty, value;
                if(option.displayLogic){
                    property = option.displayLogic.property;
                    subProperty = option.displayLogic.subProperty;
                    value = option.displayLogic.value;
                }
                if(!option.displayLogic || (option.displayLogic && property && !subProperty && rowdata[property] === value) ||
                    (option.displayLogic && property && subProperty && rowdata[property][subProperty] === value)
                )  {
                    return (
                        <MenuItem key={option.displayName} 
                        disabled={option.disabled ? true : false}
                        onClick={(e) => handleClick(e)} classes={{
                            root: classes.menuItem
                        }}>
                            {option.displayName}
                        </MenuItem>
                    )
                }
            })}
        </Menu>
    );

    return (
        <div>
            <IconButton
                size="small"
                aria-label="more"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                <MoreVertIcon />
            </IconButton>
            {renderMenu}
        </div >
    )
}

export default ActionMenu 