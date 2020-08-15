import React, { useEffect } from 'react';
import { APP_BAR_LANGUAGE_SELECT } from '../../basic/styles';
import MenuItem from '@material-ui/core/MenuItem';
import IxSelect from '../../basic/ix-select';
import { translate, Trans, useTranslation } from "react-i18next";

const LangauageMenu = (props) => {
    // const [lang, setLanguage] = React.useState('en');
    const { t, i18n } = useTranslation();

    const handleChange = (event) => {
        // setLanguage(event.target.value);
        localStorage.setItem("lang", event.target.value)
        i18n.changeLanguage(event.target.value);
    };

    useEffect(() => {

    }, []);

    return (
        <IxSelect value={localStorage.getItem("lang") ? localStorage.getItem("lang") : "ja"} handleChange={(e) => handleChange(e)} customClassName={APP_BAR_LANGUAGE_SELECT}>
            <MenuItem value={"en"}>English</MenuItem>
            <MenuItem value={"ja"}>日本</MenuItem>
        </IxSelect>
    )
}

export default LangauageMenu

