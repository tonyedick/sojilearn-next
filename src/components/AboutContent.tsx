'use client';

import Link from "next/link";


export default function AboutContent() {
    return (
      <>
         <section className="page-title gray">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">

                        <div className="breadcrumbs-wrap">
                            <h1 className="breadcrumb-title">Who We Are?</h1>
                            <nav className="transparent">
                                <ol className="breadcrumb p-0">
                                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                    <li className="breadcrumb-item active theme-cl" aria-current="page">About Us</li>
                                </ol>
                            </nav>
                        </div> 

                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div className="lmp_caption">
                            <span className="theme-cl">About Us</span>
                            <h2 className="mb-3">What We Do &amp; Our Aim</h2>
                            <p>We are Sojilearn,
                            <br/>A <span className="theme-cl"><strong>Technology Workforce Development Company </strong></span> and <span className="theme-cl"><strong>Study Abroad Agency</strong></span>
                            <br/>
                            <br />Sojilearn Optimum Solutions Limited is incorporated in Nigeria <strong>(Company Number 8093370)</strong> with its registered address at 21 Agbaje Akio Street, Okeafo GRA, Iwo, Osun State. and registered under MSMED (Micro, Small and Medium Enterprises Development Act, 2006) with number <strong>SUIN464189319643</strong>. 
                            <br />
                            <br/>At Sojilearn, we help students navigate & assess their educational journey, matching them to personalised mentors, counsels them towards their higher education dream with an employability lens, and makes sure that everyone punched way above their weight to make dreams come alive and truly be able to level up.</p>
                            <p>We take pride in helping students figure what they should do and where they should be at - wherever that be in the world - to realise their full potential.
                            </p>
                            <div className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                                <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                                    <i className="fas fa-check"></i>
                                </div>
                                <h6 className="mb-0 ml-3">Discover universities & courses</h6>
                                </div>
                            </div>
                            <div className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                                <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                                    <i className="fas fa-check"></i>
                                </div>
                                <h6 className="mb-0 ml-3">Clear doubts and interact with the community</h6>
                                </div>
                            </div>
                            <div className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                                <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                                    <i className="fas fa-check"></i>
                                </div>
                                <h6 className="mb-0 ml-3">Latest study abroad news & updates</h6>
                                </div>
                            </div>
                            <div className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                                <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                                    <i className="fas fa-check"></i>
                                </div>
                                <h6 className="mb-0 ml-3">Track applications & offers</h6>
                                </div>
                            </div>
                            <div className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                                <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                                    <i className="fas fa-check"></i>
                                </div>
                                <h6 className="mb-0 ml-3">And a lot more</h6>
                                </div>
                            </div>
                            <div className="text-left mt-4"><Link href="/apply" className="btn-apply btn btn-md text-light font-medium theme-bg pulse-zoom">START NOW</Link></div>
                        </div>
                    </div>

                    <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                        <div className="lmp_thumb">
                            <img src="../assets/img/lmp-2.png" className="img-fluid" alt="Sojilearn- about us"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="gray">
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-8">
                        <div className="sec-heading center">
                            <h2>Trusted By <span className="theme-cl">500+ students</span></h2>
                            <p>We are building the global citizens of tomorrow by simplifying international admissions for students & our partners</p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                </div>

            </div>
        </section>
        <div className="clearfix"></div>
        <section className="theme-bg call_action_wrap-wrap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="call_action_wrap">
                            <div className="call_action_wrap-head">
                                <h3>Do You Have Questions ?</h3>
                                <span>We are here to help you grow your career and empower your dreams.</span>
                            </div>
                            <Link href="mailto:sojilearn@gmail.com" className="btn btn-call_action_wrap">Contact Us Today</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </>
    );
}