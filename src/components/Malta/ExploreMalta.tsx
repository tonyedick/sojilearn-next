import React from 'react'
import { Link } from 'react-router-dom'
import capital from "../../assets/img/capital.webp";
import population from "../../assets/img/population.webp";
import language from "../../assets/img/language.webp";
import students from "../../assets/img/students.webp";
import gdp from "../../assets/img/gdp.webp";
import currency from "../../assets/img/currency.webp";
import dialing from "../../assets/img/dialing.webp";

export default function ExploreMalta() {
  return (
    <div>
        <section className="min">
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10 text-center">
                        <div className="sec-heading center mb-4">
                            <h2>Explore <span className="theme-cl">Malta</span></h2>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-1">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" to="/"><img src={capital} className="img-fluid" alt="Explore malta currency, dialing code, gdp, international students, language, capital, population" /></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link to="/">Capital</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>Valletta</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-2">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" to="/"><img src={population} className="img-fluid" alt="Explore malta currency, dialing code, gdp, international students, language, capital, population" /></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link to="/">Population</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>535,000</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-3">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" to="/"><img src={language} className="img-fluid" alt="Explore malta currency, dialing code, gdp, international students, language, capital, population" /></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link to="/">Language</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>Maltese and English</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-4">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" to="/"><img src={students} className="img-fluid" alt="Explore malta currency, dialing code, gdp, international students, language, capital, population" /></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link to="/">International Students</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>1,700</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-10">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" to="/"><img src={gdp} className="img-fluid" alt="Explore malta currency, dialing code, gdp, international students, language, capital, population" /></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link to="/">GDP</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>$22.7 billion</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="edu_cat_2 cat-6">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" to="/"><img src={dialing} className="img-fluid" alt="Explore malta currency, dialing code, gdp, international students, language, capital, population" /></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link to="/">Dialing Code</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>+356</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="edu_cat_2 cat-8">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" to="/"><img src={currency} className="img-fluid" alt="Explore malta currency, dialing code, gdp, international students, language, capital, population" /></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link to="/">Currency</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>Euro (€)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="edu_cat_2 cat-9">
                            <div className="edu_cat_icons">
                                <Link className="pic-main" to="/"><img src={students} className="img-fluid" alt="Explore malta currency, dialing code, gdp, international students, language, capital, population" /></Link>
                            </div>
                            <div className="edu_cat_data">
                                <h4 className="title"><Link to="/">Universities and Colleges</Link></h4>
                                <ul className="meta">
                                    <li className="video"><i className="ti-video-clapper"></i>359</li>
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
