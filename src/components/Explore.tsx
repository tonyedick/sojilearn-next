'use client';

import Image from 'next/image';
import Link from 'next/link'
import img1 from '../assets/img/content.png';
import img2 from "../assets/img/briefcase.png";
import img3 from "../assets/img/career.png";
import img4 from "../assets/img/python.png";
import img5 from "../assets/img/designer.png";
import img6 from "../assets/img/speaker.png";
import img7 from "../assets/img/photo.png";
import img8 from "../assets/img/yoga.png";
import img9 from "../assets/img/health.png";

export default function Explore() {
  return (
    <div>
        <section className="min">
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center mb-4">
                            <h2>Explore Top <span className="theme-cl">Courses</span></h2>
                            <p>We are bridging the gap between dreams and universities, one student at a time.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-1">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/">
                                    <Image src={img1} className="img-fluid" alt="explore engineering courses" width={40} height={40} />
                                </Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Engineering</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>250+ Universities</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-2">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/">
                                    <Image src={img2} className="img-fluid" alt="explore health science courses" width={40} height={40} />
                                </Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Health Sciences</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>58+ Universities</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-3">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/">
                                    <Image src={img3} className="img-fluid" alt="explore accounting courses" width={40} height={40} />
                                </Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Accounting</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>74+ Universities</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-4">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/">
                                    <Image src={img4} className="img-fluid" alt="explore computer science and IT courses" width={40} height={40} />
                                </Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">IT &amp; Computer Science</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>65+ Universities</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-10">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/">
                                    <Image src={img5} className="img-fluid" alt="explore arts and design courses" width={40} height={40} />
                                </Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Arts &amp; Design</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>43+ Universities</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-6">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/">
                                    <Image src={img6} className="img-fluid" alt="explore business and marketing courses" width={40} height={40} />
                                </Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Business & Marketing</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>82+ Universities</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-7">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/">
                                    <Image src={img7} className="img-fluid" alt="explore law courses" width={40} height={40} />
                                </Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Law</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>250+ Universities</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-8">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/">
                                    <Image src={img8} className="img-fluid" alt="explore psysiotherapy courses" width={40} height={40} />
                                </Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Physiotherapy</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>103 Universities</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-9">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/">
                                    <Image src={img9} className="img-fluid" alt="explore counseling courses" width={40} height={40} />
                                </Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Counseling</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>38+ Universities</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
  )
}
