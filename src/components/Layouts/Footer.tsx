'use client';

import Link from 'next/link';
import Image from "next/image";
import footerLogo from "../../assets/img/logo-dark.png";
import { useAnalytics } from '@/utils/websiteAnalytics';

export default function Footer() {
    const { trackLinkClick } = useAnalytics();

    const handleFooterLink = (destination: string, category: string) => {
        trackLinkClick(destination, `footer_${category}`, `Footer link: ${destination}`);
    };

    return (
        <footer role="contentinfo" className="light-footer skin-light-footer style-2">
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
        
                        <div className="col-lg-5 col-md-5">
                            <div className="footer_widget">
                                <Image
                                    className="img-footer small mb-2"
                                    src={footerLogo}
                                    alt="Sojilearn logo"
                                    priority
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
                                            <li>
                                                <Link 
                                                href="/"
                                                    onClick={() => handleFooterLink('home', 'sojilearn')}
                                                >Home
                                                </Link></li>
                                            <li><Link href="/about" onClick={() => handleFooterLink('about', 'sojilearn')}>About US</Link></li>
                                            <li><Link href="/contact" onClick={() => handleFooterLink('contact', 'sojilearn')}>Contact Page</Link></li>
                                            <li><Link href="/blog" target="_blank" onClick={() => handleFooterLink('blog', 'sojilearn')}>News & Articles</Link></li>
                                        </ul>
                                    </div>
                                </div>
        
                                <div className="col-lg-4 col-md-4">
                                    <div className="footer_widget">
                                        <h4 className="widget_title">Destinations</h4>
                                        <ul className="footer-menu">
                                            <li><Link href="/study-in-uk" onClick={() => handleFooterLink('study-in-uk', 'destinations')}>Study in UK</Link></li>
                                            <li><Link href="/study-in-canada" onClick={() => handleFooterLink('study-in-canada', 'destinations')}>Study in Canada</Link></li>
                                            <li><Link href="/study-in-usa" onClick={() => handleFooterLink('study-in-usa', 'destinations')}>Study in USA<span className="new">New</span></Link></li>
                                            <li><Link href="/study-in-germany" onClick={() => handleFooterLink('study-in-germany', 'destinations')}>Study in Germany</Link></li>
                                            <li><Link href="/study-in-malta" onClick={() => handleFooterLink('study-in-malta', 'destinations')}>Study in Malta<span className="new">New</span></Link></li>
                                        </ul>
                                    </div>
                                </div>
        
                                <div className="col-lg-4 col-md-4">
                                    <div className="footer_widget">
                                        <h4 className="widget_title">Company</h4>
                                        <ul className="footer-menu">
                                            <li><Link href="/blog" target="_blank" onClick={() => handleFooterLink('blog', 'company')}>Blog</Link></li>
                                            <li className="font-weight-bold"><Link href="/apply" rel="noopener noreferrer" onClick={() => handleFooterLink('apply', 'company')}>START NOW</Link></li>
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
                            <p className="mb-0">© 2022 - 2026 Sojilearn. All Rights Reserved<Link href="https://sojilearn.com" rel="noopener noreferrer"> Sojilearn Optimum Solutions Ltd</Link>.</p>
                        </div>
                    </div>
                    <hr />
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 col-sm-12 text-center">
                             <ul className="nav-menu nav-menu-social">
                                <li><Link href="/privacy-policy" onClick={() => handleFooterLink('privacy-policy', 'legal')}>Privacy Policy</Link></li>
                                <li><Link href="/terms-of-use" onClick={() => handleFooterLink('terms-of-use', 'legal')}>Terms of Use</Link></li>
                                <li><Link href="/disclaimer" onClick={() => handleFooterLink('disclaimer', 'legal')}>Disclaimer</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-6 col-md-12 sol-sm-12 text-center">
                            <ul className="social-links">
                                <li><Link href="https://facebook.com/sojilearn" 
                                target="_blank" rel="noopener noreferrer" onClick={() => handleFooterLink('facebook', 'social')}><i className="fab fa-facebook-f"></i></Link></li>
                                <li><Link href="https://x.com/sojilearn" target="_blank" rel="noopener noreferrer" onClick={() => handleFooterLink('twitter', 'social')}><i className="fab fa-twitter"></i></Link></li>
                                <li><Link href="https://instagram.com/sojilearn" target="_blank" rel="noopener noreferrer" onClick={() => handleFooterLink('instagram', 'social')}><i className="fab fa-instagram"></i></Link></li>
                                <li><Link href="https://www.linkedin.com/company/sojilearn/" target="_blank" rel="noopener noreferrer" onClick={() => handleFooterLink('linkedin', 'social')}><i className="fab fa-linkedin-in"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
