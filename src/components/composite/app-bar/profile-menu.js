
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useTranslation } from 'react-i18next';

export const ProfileMenu = ({ isMenuOpen, anchorEl, menuId, menuCloseEvent }) => {
    const { t, i18n } = useTranslation()
    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={menuCloseEvent}
        >
            <MenuItem onClick={(event) => menuCloseEvent(event)} value={0}>{t('ProfileMenu.Profile')}</MenuItem>
            <MenuItem onClick={(event) => menuCloseEvent(event)} value={1}>{t('ProfileMenu.Myaccount')}</MenuItem>
            <MenuItem onClick={(event) => menuCloseEvent(event)} value={2}>{t('ProfileMenu.Logout')}</MenuItem>
        </Menu>
    )
};