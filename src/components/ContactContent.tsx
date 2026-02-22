'use client';

import Link from "next/link";
import { usePageTracking } from '@/utils/websiteAnalytics';

export default function ContactContent() {
    usePageTracking('contact');

    return (
      <>
            <section className="page-title gray">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">

                                <div className="breadcrumbs-wrap">
                                    <h1 className="breadcrumb-title">Get in Touch</h1>
                                    <nav className="transparent">
                                        <ol className="breadcrumb p-0">
                                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                            <li className="breadcrumb-item active theme-cl" aria-current="page">Contact Us</li>
                                        </ol>
                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container">
                        <div className="row align-items-start">

                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="form-group">
                                    <h4>We&apos;d love to hear from you</h4>
                                    <span>Please send us a mail, and we will get back to you </span>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="lmp_thumb">
                                            <img src="../assets/img/cr-6.jpg" className="img-fluid" alt="sojilearn contact us graphics"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-4">
                                        <Link href="mailto:sojilearn@gmail.com" className="link text-uppercase font-bold text-bold" rel="noopener noreferrer">Send an Email</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                                <div className="lmp_caption pl-lg-5">
                                    <ol className="list-unstyled p-0">
                                        <li className="d-flex align-items-start my-3 my-md-4">
                                            <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                                                <div className="position-absolute theme-cl h5 mb-0"><i className="fas fa-home"></i></div>
                                            </div>
                                            <div className="ml-3 ml-md-4">
                                                <h4>Reach Us</h4>
                                                <p><strong>Head Office:</strong> 9, Miller Close, off Cecilia Road, Iwofe Road, Rumuolumeni, Port Harcourt, Rivers State.</p>
                                                <p>
                                                    <strong>Branch Office: </strong>21, Agbaje Akio Street, Okeafo GRA, Iwo, Osun State, Nigeria
                                                </p>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-start my-3 my-md-4">
                                            <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                                                <div className="position-absolute theme-cl h5 mb-0"><i className="fas fa-at"></i></div>
                                            </div>
                                            <div className="ml-3 ml-md-4">
                                                <h4>Drop A Mail</h4>
                                                <p>
                                                    sojilearn@gmail.com<br />
                                                    info@sojilearn.com
                                                </p>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-start my-3 my-md-4">
                                            <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                                                <div className="position-absolute theme-cl h5 mb-0"><i className="fas fa-phone-alt"></i></div>
                                            </div>
                                            <div className="ml-3 ml-md-4">
                                                <h4>Make a Call</h4>
                                                <p>
                                                    (+234) 813 780 6643<br />+234 815 274 2646
                                                </p>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
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