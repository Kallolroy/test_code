import React, { Component } from 'react';
import { useTranslation } from 'react-i18next'
const About = (props) => {
    const { t, i18n } = useTranslation()
    return (
        <h4> {t('hello.label')}</h4>
    );

}

export default About;