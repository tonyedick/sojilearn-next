'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import animate1 from '../assets/img/ic-1.png';
import animate2 from '../assets/img/ic-3.png';
import bakimageLarge from '../assets/img/banner_soji2.jpg';
import bakimageSmall from '../assets/img/banner_soji.jpg'; 

export default function Banner() {
const [backgroundImage, setBackgroundImage] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 768 
        ? bakimageSmall.src
        : bakimageLarge.src
);

useEffect(() => {
    const handleResize = () => {
        setBackgroundImage(window.innerWidth <= 768 ? bakimageSmall.src : bakimageLarge.src);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, []);

  return (
    <>
        <div className="hero_banner image-cover image_bottom h6_bg pt-0" 
            style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center center",
            backgroundSize: window.innerWidth <= 768 ? "contain" : "cover",
            // backgroundColor: "black",
            opacity: "unset",
            minHeight: "600px", 
            height: "400px",   
            maxHeight: "50vh",  
            overflow: "hidden" 
            }}
        >
          <div className="container">
              <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="simple-search-wrap text-left">
                          <div className="hero_search-2">
                              <h1 className="banner_title text-white mb-4" 
                                style={{textShadow: "8px 8px 8px black"}}
                                >Dreaming of <br />Studying Abroad?<br /><span className="text-white">Start planning today!</span></h1>
                              <p className="font-lg text-white mb-4"
                                style={{textShadow: "8px 8px 8px gray"}}
                              >The Most Comprehensive & Personalised Study Abroad Plan. <br />Obsessed with Student Success.</p>
                              <div className="inline_btn">
                                  <Link href="/apply" className="btn theme-bg text-white font-medium pulse-zoom" rel="noopener noreferrer">START NOW</Link>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="side_block extream_img">
                          <div className="list_crs_img">
                              <Image src={animate1} className="img-fluid cirl animate-fl-y" alt="animation for hero banner" />
                              {/* <Image src="/assets/img/ic-2.png" className="img-fluid arrow animate-fl-x" alt="" width={100} height={100} /> */}
                              <Image src={animate2} className="img-fluid moon animate-fl-x" alt="animation for hero banner" />
                          </div>
                          {/* <img src="assets/img/st-3.png" className="img-fluid" alt="" /> */}
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
                                            <h6>Research & Discovery</h6>
                                            <p>Dive into a world of diverse destinations, prestigious universities, and exciting courses.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                    <div className="dro_140">
                                        <div className="dro_141 de"><i className="fa fa-business-time"></i></div>
                                        <div className="dro_142">
                                            <h6>Shortlisting</h6>
                                            <p>Share your profile, and let us recommend the best-matched universities and courses for you.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                                    <div className="dro_140">
                                        <div className="dro_141 de"><i className="fa fa-user-shield"></i></div>
                                        <div className="dro_142">
                                            <h6>Applications & Offers</h6>
                                            <p>Stay Ahead with Real-Time Updates on your Applications from our partner universities</p>
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
