import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import capital from "../../assets/img/capital.webp";
import population from "../../assets/img/population.webp";
import language from "../../assets/img/language.webp";
import students from "../../assets/img/students.webp";
import gdp from "../../assets/img/gdp.webp";
import currency from "../../assets/img/currency.webp";
import dialing from "../../assets/img/dialing.webp";

export default function StudyInGermany() {
  return (
    <div>
        <section className="min">
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center mb-4">
                            <h2>Explore <span className="theme-cl">Germany</span></h2>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-1">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/"><Image src={capital} className="img-fluid" alt="Germany capital city"/></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Capital</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>Berlin</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-2">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/"><Image src={population} className="img-fluid" alt="Germany population"/></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Population</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>83 Million</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-3">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/"><Image src={language} className="img-fluid" alt="Germany language of communication"/></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Language</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>German</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-4">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/"><Image src={students} className="img-fluid" alt="Germany number of international students"/></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">International Students</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>458,210</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-10">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/"><Image src={gdp} className="img-fluid" alt="Germany gdp"/></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">GDP</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>$4.5 Trillion</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-6">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/"><Image src={dialing} className="img-fluid" alt="Germany dialing code"/></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Dialing Code</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>49</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="edu_cat_2 cat-8">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/"><Image src={currency} className="img-fluid" alt="Germany currency"/></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Currency</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>Euro</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="edu_cat_2 cat-9">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" href="/"><Image src={students} className="img-fluid" alt="Germany number of universities and colleges"/></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link href="/">Universities and Colleges</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>400+</li>
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
