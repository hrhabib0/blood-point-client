import React from 'react';
import Banner from '../../components/Homepage/Banner/Banner';
import Featured from '../../components/Homepage/Featured/Featured';
import ContactUs from '../../components/Homepage/ContactUs/ContactUs';
import AboutUsSection from '../../components/Homepage/AboutUsSection/AboutUsSection';
import Campaign from '../../components/Homepage/Campaign/Campaign';
import Reviews from '../../components/Homepage/Reviews/Reviews';
import CallToAction from '../../components/Homepage/CallToAction/CallToAction';
import PartnersSection from '../../components/Homepage/PartnersSection/PartnersSection';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <AboutUsSection></AboutUsSection>
            <Campaign></Campaign>
            <Reviews></Reviews>
            <CallToAction></CallToAction>
            <PartnersSection></PartnersSection>
            <ContactUs></ContactUs>
        </div>
    );
};

export default HomePage;