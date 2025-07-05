import HeroSectionStyleTwo from '@/components/hero/styleTwo'
import React from 'react'
import serviceData from '@/data/service/residential.json';
import { LayoutOne } from '@/layouts';
import AboutUsStyleOne from '@/components/aboutUs/aboutUsStyleOne';
import ApartmentsPlanTabs from '@/components/apartments/ApartmentsPlanTabs';
import Feature from '@/components/features';
import featuresData from "@/data/service";
import { getProducts } from '@/lib/product';
import ContactSection from '@/components/contact/ContactSection';

const Residential = () => {

    const featureData = getProducts(featuresData, "buying", "residential", 3);

    return (
        <LayoutOne topbar={true}>
            <div className="ltn__slider-area ltn__slider-11 section-bg-1">
                <HeroSectionStyleTwo data={serviceData.hero} />
            </div>

            <div className="ltn__about-us-area pt-115 pb-100">
                <AboutUsStyleOne data={serviceData.aboutSectionOne} />
            </div>


            <div className="ltn__about-us-area pt-115 pb-100 section-bg-1">
                <AboutUsStyleOne data={serviceData.aboutSectionTwo} />
            </div>

            <div className="ltn__apartments-plan-area pt-115 pb-100">
                <ApartmentsPlanTabs sectionTitle={serviceData.ApartmentsPlan.sectionTitle} tabs={serviceData.ApartmentsPlan.tabs} />
            </div>


            <div className="ltn__about-us-area pt-115 pb-100 section-bg-1">
                <AboutUsStyleOne data={serviceData.aboutSectionThree} />
            </div>


            <Feature
                servicebtn={false}
                iconTag={false}
                data={featureData}
                headingClasses="section-subtitle-2"
                titleSectionData={{
                    sectionClasses: "text-center",
                    subTitle: "Workplace Interiors",
                    title: "Smart Designs for Modern Offices",
                }}
            />

            <ContactSection classes="section-bg-1 pt-115 pb-100" />


            <div style={{ "--image": `url(${serviceData.aboutSectionFour.beforeImage})` }} className="ltn__about-us-area bg-image-right-before pt-120 pb-90">
                <AboutUsStyleOne data={serviceData.aboutSectionFour} />
            </div>
        </LayoutOne>
    )
}

export default Residential
