import React from 'react'
import './Footer.css';
const Footer = () => {
  return (
    <div className="bg-black w-full text-white  bottom-0">
    <div className="m-0 flex w-full  py-8 px-5 justify-between lg:px-40 container sm:right-0 md:right-0">
        <div className="inner-cont1 flex mb-5 ">
        <div className="px-2">
            <p>ABOUT</p>
            <p>Contact Us</p>
            <p>carrers</p>
            <p>Flipkart stories</p>
            <p>Press</p>
            <p>Corporate</p>
            <p>Information</p>
        </div>
        <div className="px-2">
            <p>GROUP COMPANIES</p>
            <p>Myntra</p>
            <p>Cleartrip</p>
            <p>Shopsy</p>
        </div>
        <div  className="px-2">
            <p>HELP</p>
            <p>Payments</p>
            <p>Shipping</p>
            <p>Cancellation& returns</p>
            <p>FAQ</p>
        </div>
        <div className="px-3">
            <p>CONSUMER POLICY</p>
            <p>cancellation & Returns</p>
            <p>Terms of Use</p>
            <p>Security</p>
            <p>Privacy</p>
            <p>Sitemap</p>
            <p>Grivenace</p>
            <p>Redressal</p>
            <p>EPR</p>
            <p>Compliance</p>
        </div>
        </div>
        <div className="inner-cont2 flex">
        <div className="lg:border-l-2 px-5">
            <p>Mail Us:</p>
            <p>
            Flipkart Internet Private Limited,</p>
            <p>Buildings Alyssa, Begonia &</p>
            <p>Clove Embassy Tech Village,</p>
            <p>Outer Ring Road, Devarabeesanahalli Village,</p>
            <p>Bengaluru, 560103,</p>
            <p>Karnataka, India </p>
        </div>
        <div>
        <p>Registered Office Address:</p>
        <p>Flipkart Internet Private Limited,</p>
        <p>Buildings Alyssa, Begonia &</p>
        <p>Clove Embassy Tech Village,</p>
        <p>Outer Ring Road, Devarabeesanahalli Village,</p>
        <p>Bengaluru, 560103,</p>
        <p>Karnataka, India</p>
        <p>CIN : U51109KA2012PTC066107</p>
        <p>Telephone: <a href="#">044-45614700</a> / <a href="#">044-67415800</a></p>

        </div>
        </div>
    </div>
    </div>
  )
}

export default Footer;