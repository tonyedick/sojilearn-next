'use client';

import Link from 'next/link';
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="light-footer skin-light-footer style-2">
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
        
                        <div className="col-lg-5 col-md-5">
                            <div className="footer_widget">
                                <Image
                                    className="img-footer small mb-2"
                                    src="/assets/img/logo-dark.png"
                                    alt="Sojilearn logo"
                                    priority
                                    width={140}
                                    height={40}
                                />
                                <p className="mt-2">
                                    Sojilearn Optimum Solutions Limited is incorporated in Nigeria <strong>(Company Number 8093370)</strong> with its registered address at 21 Agbaje Akio Street, Okeafo GRA, Iwo, Osun State. and registered under MSMED (Micro, Small and Medium Enterprises Development Act, 2006) with number <strong>SUIN464189319643</strong>. 
                                    <br />Sojilearn helps students figure what they should do and where they should be at - wherever that be in the world - to realise their full potential.</p>
                                <p><strong>Head Office:</strong> 9, Miller Close, off Cecilia Road, Rumuolumeni, <br/>Port Harcourt, Rivers State.</p>
                                <p><strong>Office:</strong> 21 Agbaje Akio Street, Okeafo GRA, Iwo, Osun State.</p>
                                <p><strong>Phone:</strong> +234 813 780 6643</p>
                                <p><strong>Email:</strong> sojilearn@gmail.com, info@sojilearn.com</p>
                            </div>
                        </div>
        
                        <div className="col-lg-6 col-md-7 ml-auto">
                            <div className="row">
        
                                <div className="col-lg-4 col-md-4">
                                    <div className="footer_widget">
                                        <h4 className="widget_title">Sojilearn</h4>
                                        <ul className="footer-menu">
                                            <li><Link href="/">Home</Link></li>
                                            <li><Link href="/about">About US</Link></li>
                                            <li><Link href="/contact">Contact Page</Link></li>
                                            <li><Link href="/blog" target="_blank">News & Articles</Link></li>
                                        </ul>
                                    </div>
                                </div>
        
                                <div className="col-lg-4 col-md-4">
                                    <div className="footer_widget">
                                        <h4 className="widget_title">Destinations</h4>
                                        <ul className="footer-menu">
                                            <li><Link href="/study-in-uk">Study in UK</Link></li>
                                            <li><Link href="/study-in-canada">Study in Canada</Link></li>
                                            <li><Link href="/study-in-usa">Study in USA<span className="new">New</span></Link></li>
                                            <li><Link href="/study-in-germany">Study in Germany</Link></li>
                                            <li><Link href="/study-in-malta">Study in Malta<span className="new">New</span></Link></li>
                                        </ul>
                                    </div>
                                </div>
        
                                <div className="col-lg-4 col-md-4">
                                    <div className="footer_widget">
                                        <h4 className="widget_title">Company</h4>
                                        <ul className="footer-menu">
                                            <li><Link href="/blog" target="_blank">Blog</Link></li>
                                            <li className="font-weight-bold"><Link href="/apply" rel="noopener noreferrer">START NOW</Link></li>
                                        </ul>
                                    </div>
                                </div>
        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 col-md-12 text-center">
                            <p className="mb-0">© 2022 - 2025 Sojilearn. All Rights Reserved<Link href="https://sojilearn.com" rel="noopener noreferrer"> Sojilearn Optimum Solutions Ltd</Link>.</p>
                        </div>
                    </div>
                    <hr />
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 col-sm-12 text-center">
                             <ul className="nav-menu nav-menu-social">
                                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                                <li><Link href="/terms-of-use">Terms of Use</Link></li>
                                <li><Link href="/disclaimer">Disclaimer</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-6 col-md-12 sol-sm-12 text-center">
                            <ul className="social-links">
                                <li><Link href="https://facebook.com/sojilearn" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></Link></li>
                                <li><Link href="https://x.com/sojilearn" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></Link></li>
                                <li><Link href="https://instagram.com/sojilearn" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></Link></li>
                                <li><Link href="https://www.linkedin.com/company/sojilearn/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
