import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core/styles';
import { themeLoginContainer } from './../../../utils/themes';
import SignIn from './signIn';
import IxCopyright from './../../composite/ix-copy-right';
import { validateUser, getUserData } from './../../../services/auth-service';
import mainLogo from './../../../assets/images/next-admin-logo.png';
import { useTranslation } from 'react-i18next';
import { PLATFORM_ADMIN, COMPANY_ADMIN, BRANCH_ADMIN } from '../../../constants/ix-user-roles'

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

const LoginContainer = (props) => {
    const classes = useStyles();
    const [isValidUser, setValidUser] = useState(true);
    const { t, i18n } = useTranslation()

    const login = async (values) => {
        const user = {
            userName: values.userEmail,
            password: values.password
        };
        const sessionData = await validateUser(user);
        if (sessionData && sessionData.data && sessionData.data.token) {
            const userData = await getUserData(sessionData.data.token);
            if (userData && userData.data) {
                localStorage.setItem('token', sessionData.data.token);
                
                if (userData.data.user.roles.find(r => r.name === PLATFORM_ADMIN)) {
                    userData.data.user.role = PLATFORM_ADMIN
                    localStorage.setItem('user', JSON.stringify(userData.data.user));
                    props.history.push("/companies")
                } else if (userData.data.user.roles.find(r => r.name === COMPANY_ADMIN)) {
                    userData.data.user.role = COMPANY_ADMIN
                    localStorage.setItem('user', JSON.stringify(userData.data.user));
                    props.history.push("/home")
                } else if (userData.data.user.roles.find(r => r.name === BRANCH_ADMIN)) {
                    userData.data.user.role = BRANCH_ADMIN
                    localStorage.setItem('user', JSON.stringify(userData.data.user));
                    props.history.push("/home")
                }

            } else
                setValidUser(false);
        } else {
            setValidUser(false);
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
                            {t('login-container.SignIn')}
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom>
                            {t('login-container.SignInToYourAccount')}
                        </Typography>
                    </Box>

                    {!isValidUser && <FormHelperText id="component-helper-text" error>Invalid user</FormHelperText>}
                    <ThemeProvider theme={themeLoginContainer}>
                        <SignIn onSubmit={login} />
                    </ThemeProvider>

                </div>

            </Container>

            <Box mt={8}>
                <IxCopyright name={"Next Corp Ltd."} />
            </Box>
        </div>
    );
}

export default LoginContainer