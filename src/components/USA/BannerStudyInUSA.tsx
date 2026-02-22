'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import bakImageLarge from "../../assets/img/usa_banner.png";
import bakImageSmall from "../../assets/img/usa-banner-small.png"; 
import flag from "../../assets/img/usa-flag.webp";
import { usePageTracking } from '@/lib/analytics/websiteAnalytics';

export default function BannerStudyInUSA() {
    usePageTracking('Study In USA');

    const [backgroundImage, SetBackgroundImage] = useState(bakImageLarge.src);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            SetBackgroundImage(mobile ? bakImageSmall.src : bakImageLarge.src);
        };
    
        checkMobile();
    
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
  
  return (
    <>    
        <div className="hero_banner image-cover image_bottom h6_bg pt-0" 
                style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: "center center",
                backgroundSize: isMobile ? "contain" : "cover",
                backgroundColor: "black",
                minHeight: "600px", 
                height: "400px",   
                maxHeight: "50vh",  
                overflow: "hidden" 
                }}
            >
          <div className="container" >
              <div className="row align-items-center">
                    <div className="simple-search-wrap">
                        <div className="hero_search-2">
                            <h1 className="banner_title mb-4 text-white" style={{textShadow: "8px 8px 8px black"}} 
                            ><span><Image src={flag} alt="Study in USA banner" height="45" width="60" /></span> Study in USA<br /></h1>
                            <div className="inline_btn">
                                <Link href="/apply" className="btn-apply btn theme-bg text-white font-medium pulse-zoom" rel="noopener noreferrer">START NOW</Link></div>
                        </div>
                    </div>
              </div>
          </div>
        </div>
          {/* // <!-- ============================ Hero Banner End ================================== --> */}
        <section className="p-0">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="crp_box fl_color ovr_top">
                            <div className="row align-items-center">
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                    <div className="dro_140">
                                        <div className="dro_141 de"><i className="fa fa-journal-whills"></i></div>
                                        <div className="dro_142">
                                            <h6>AFTER 12TH / UG</h6>
                                            <p><strong>How to Apply: </strong>UG Applications are submitted directly through our online form.</p>
                                            <p><strong>Cost Estimate: </strong>$24,000- $32,000 per year</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                    <div className="dro_140">
                                        <div className="dro_141 de"><i className="fa fa-business-time"></i></div>
                                        <div className="dro_142">
                                            <h6>MASTERS</h6>
                                            <p><strong>How to Apply: </strong>PG applications are directly sent to the universities online.</p>
                                            <p><strong>Cost Estimate: </strong>$30,000 - $35,000 per year</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                    <div className="dro_140">
                                        <div className="dro_141 de"><i className="fa fa-user-shield"></i></div>
                                        <div className="dro_142">
                                            <h6>MBA</h6>
                                            <p><strong>How to Apply: </strong>MBA applications are submitted directly to the universities.</p>
                                            <p><strong>Cost Estimate: </strong>$60,000- $48,000 per year</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </>
  )
}
