import React, { useState } from 'react';
import { useParams, Route } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import mainLogo from './../../../assets/images/next-admin-logo.png';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core/styles';
import { themeLoginContainer } from '../../../utils/themes';
import ForgotPassword from './forgot-password';
import IxCopyright from '../../composite/ix-copy-right';
import { resetPassword } from '../../../services/auth-service';
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    main: {
        backgroundColor: 'white',
        borderRadius: 4
    },
    paper: {
        marginTop: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'black'
    },
    avatar: {
        marginTop: theme.spacing(5),
        width: '100px',
        height: 'auto'
    }
}));

const ForgotPasswordContainer = (props) => {
    const classes = useStyles();
    const [isValidUser, setValidUser] = useState(true);
    const { resetCode } = useParams();
    const { t, i18n } = useTranslation()

    const forgotPassword = async (values) => {
        const newPassword = values.password;
        const data = {
            newPassword: newPassword,
            resetCode: resetCode
        }
        const responsedata = await resetPassword(data);
        if (responsedata) {
            // to do
        } else {
            // to do
        }
    }

    return (
        <div>
            <Container component="main" maxWidth="xs" className={classes.main}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar variant="square" className={classes.avatar} src={mainLogo}>
                    </Avatar>
                    <Box m={3} textAlign="center">
                        <Typography component="h1" variant="h6">
                            {t('forgotPassword.Reset_password')}
                        </Typography>
                    </Box>

                    {!isValidUser && <FormHelperText id="component-helper-text" error>User not found</FormHelperText>}
                    <ThemeProvider theme={themeLoginContainer}>
                        <ForgotPassword onSubmit={forgotPassword} />
                    </ThemeProvider>
                </div>
            </Container>

            <Box mt={8}>
                <IxCopyright name={"Next Corp Ltd."} />
            </Box>
        </div>
    );
}

export default ForgotPasswordContainer