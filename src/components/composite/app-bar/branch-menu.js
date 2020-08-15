import React, { useEffect, Suspense } from 'react';
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

export default function BranchMenu({ company, branches, handleCompanyMenuChange }) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    // const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [appContext, setAppContext] = React.useState([]);

    const handleMenuItemClick = (event, index) => {
        // setSelectedIndex(index);
        localStorage.setItem("selectedIndex", index)
        localStorage.setItem("appContext", JSON.stringify(appContext[index]))
        setOpen(false);
        handleCompanyMenuChange(appContext[index]);
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

    const generateappContext = () => {
        var appContext = [{
            id: company.id,
            name: company.name,
            isCompany: true
        }];
        branches.map((b, i) => {
            appContext.push({
                id: b.id,
                name: b.name,
                isCompany: false
            })
        })

        setAppContext(appContext);
        localStorage.setItem("appContext", JSON.stringify(appContext[1]))
    }

    useEffect(() => {
        generateappContext()
        // handleMenuItemClick(null,1)
    }, []);

    return (
        <Box>
            <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                {appContext.length > 0 &&
                    <Button
                        style={
                            {
                                "color": "#f18e00",
                                'font-size': '20px',
                                'border-right': '0',
                                'padding': 0
                            }
                        }
                        onClick={handleToggle}>
                        {appContext[localStorage.getItem("selectedIndex") ? localStorage.getItem("selectedIndex") : 1].name}
                    </Button>}
                <Box pt={1}
                    style={{ "color": "#f18e00" }}
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
                        <Paper style={{ minWidth: 200 }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {appContext.map((item, index) => (
                                        <>
                                            {index >= 1 &&
                                                <>
                                                    <MenuItem key={item.id}
                                                        selected={index.toString() === localStorage.getItem("selectedIndex")}
                                                        onClick={(event) => handleMenuItemClick(event, index)}
                                                        style={{
                                                            "font-size": "16px",
                                                            "font-weight": "400"
                                                        }}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                </>
                                            }

                                        </>
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
