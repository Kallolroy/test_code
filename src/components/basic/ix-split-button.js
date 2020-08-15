import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Box from '@material-ui/core/Box';
import { Divider } from '@material-ui/core';
import { useStyles as basicComponentStyles } from './styles';

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];
export default function IxSplitButton({ displayItem }) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const basicComponentClasses = basicComponentStyles();
    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <Box>
            <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                <Button style={{ "color": "#ef6c00" }} onClick={handleToggle}>{selectedIndex === 0 ? displayItem : options[selectedIndex]}</Button>
                <Box pt={1}
                    style={{ "color": "#ef6c00" }}
                    color="primary"
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="English"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon onClick={handleToggle} />
                </Box>
            </ButtonGroup>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    <Box ml={2} fontSize={12}>Company</Box>
                                    <MenuItem key={displayItem} selected={selectedIndex === 0}
                                        onClick={(event) => handleMenuItemClick(event, 0)}
                                    >
                                        {displayItem}
                                    </MenuItem>
                                    <Divider></Divider>
                                    <Box ml={2} fontSize={12}>Stores</Box>
                                    {options.map((option, index) => (
                                        <MenuItem key={option} selected={(index) === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    );
}
