import React from 'react'
import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    actionsWrapper:{
        padding: '12px 24px'
    },
    actionButtons:{
        height: '30px'
    }
 }));

export const IxDialogue = ({open, handleClose, handleAgree, handleDisagree, title, description, agreeButtonLabel, disagreeButtonLabel}) => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            {description && <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>}
            <DialogActions className={classes.actionsWrapper}>
                <Button onClick={handleDisagree} color="secondary" size="small" className={classes.actionButtons}>
                    {disagreeButtonLabel || t('common.cancel_button')}
                </Button>
                <Button variant="contained" onClick={handleAgree} color="secondary" size="small" autoFocus className={classes.actionButtons}>
                    {agreeButtonLabel || t('common.OK')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
