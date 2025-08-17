import React from 'react';
import Banner from '../../components/Homepage/Banner/Banner';
import Featured from '../../components/Homepage/Featured/Featured';
import ContactUs from '../../components/Homepage/ContactUs/ContactUs';
import AboutUsSection from '../../components/Homepage/AboutUsSection/AboutUsSection';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <AboutUsSection></AboutUsSection>
            <ContactUs></ContactUs>
        </div>
    );
};

export default HomePage;