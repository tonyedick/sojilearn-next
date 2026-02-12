'use client';

import Link from 'next/link';
import Image from 'next/image';
import faq from "../assets/img/side-1.png";

export default function FAQUK() {
  return (
    
    <section className="gray">
        <div className="container">
            <div className="row justify-content-left">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="sec-heading center">
                        <h2>Frequently Asked <span className="theme-cl">Questions</span></h2>
                    </div>
                    <div id="accordionExample" className="accordion">

                        <div className="card">
                            <div id="headingOne" className="card-header bg-white shadow-sm border-0">
                            <h6 className="mb-0 accordion_title"><Link href="/" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" className="d-block position-relative text-dark collapsible-link py-2 collapsed">How much does it cost to study in the UK?</Link></h6>
                            </div>
                            <div id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample" className="collapse">
                            <div className="card-body pl-3 pr-3 pt-0">
                                <p>The fees for courses vary across different universities in the UK. The average cost of UG courses in UK range from £9,000- 30,000. The fees for PG courses is around £15,000-35,000. MBA courses in UK cost around £12,000- 80,000.</p>
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div id="headingTwo" className="card-header bg-white shadow-sm border-0">
                            <h6 className="mb-0 accordion_title"><Link href="/" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" className="d-block position-relative text-dark collapsible-link py-2 collapsed">Is it possible to study in the UK without IELTS?</Link></h6>
                            </div>
                            <div id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordionExample" className="collapse">
                            <div className="card-body pl-3 pr-3 pt-0">
                                <p>Yes, it is possible for you to study in UK without IELTS! The alternatives to IELTS might include online interviews held by the university or a major in English, and high school certification. These might not be applicable for all universities but certain universities do offer this provision. Some of the universities that provide this route include the University of East Anglia, University of Bristol, London Southbank University, Brunel University among others.</p>
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div id="headingThree" className="card-header bg-white shadow-sm border-0">
                            <h6 className="mb-0 accordion_title"><Link href="/" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" className="d-block position-relative collapsed text-dark collapsible-link py-2">Can one work part-time while studying in the UK?</Link></h6>
                            </div>
                            <div id="collapseThree" aria-labelledby="headingThree" data-parent="#accordionExample" className="collapse">
                            <div className="card-body pl-3 pr-3 pt-0">
                                <p>Yes, international students who have enrolled for a full-time course are allowed to work for 20 hours a week during their stay. For students enrolled in a language course, the time is reduced to 10 hours in a week. However, there is no time limit on working hours during vacations.</p>
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div id="headingFour" className="card-header bg-white shadow-sm border-0">
                            <h6 className="mb-0 accordion_title"><Link href="/" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" className="d-block position-relative collapsed text-dark collapsible-link py-2">What is the minimum percentage required to study in the UK?</Link></h6>
                            </div>
                            <div id="collapseFour" aria-labelledby="headingFour" data-parent="#accordionExample" className="collapse">
                            <div className="card-body pl-3 pr-3 pt-0">
                                <p>The minimum required score differs across each university. However, most of the universities prefer candidates with at least 60% at the UG level and 70-75% at the PG level..</p>
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div id="headingFive" className="card-header bg-white shadow-sm border-0">
                            <h6 className="mb-0 accordion_title"><Link href="/" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" className="d-block position-relative collapsed text-dark collapsible-link py-2">What are the best courses in the UK?</Link></h6>
                            </div>
                            <div id="collapseFive" aria-labelledby="headingFive" data-parent="#accordionExample" className="collapse">
                            <div className="card-body pl-3 pr-3 pt-0">
                                <p>The most popular courses for international students to study in UK are:</p>
                                <ol>
                                    <li>Natural Sciences</li>
                                    <li>Medicine</li>
                                    <li>Social Sciences</li>
                                    <li>Business</li>
                                    <li>Law</li>
                                    <li>Engineering and Technology</li>
                                    <li>Arts</li>
                                    <li>Media and Communication</li>
                                </ol>
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div id="headingSix" className="card-header bg-white shadow-sm border-0">
                            <h6 className="mb-0 accordion_title"><Link href="/" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix" className="d-block position-relative collapsed text-dark collapsible-link py-2">Which are the top universities in the UK?</Link></h6>
                            </div>
                            <div id="collapseSix" aria-labelledby="headingSix" data-parent="#accordionExample" className="collapse">
                            <div className="card-body pl-3 pr-3 pt-0">
                                <p>The following are the top universities in the UK ranked based on academic reputation, employability and research impact.</p>
                                <ul>
                                    <li>University of Cambridge</li>
                                    <li>The University of Oxford</li>
                                    <li>London School of Economics and Political Science</li>
                                    <li>University of Bath</li>
                                    <li>University of East Anglia</li>
                                    <li>University of St Andrews</li>
                                    <li>King&apos;s College London</li>
                                    <li>University of Birmingham</li>
                                    <li>Queen Mary University of London</li>
                                    <li>University of York</li>
                                </ul>
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div id="headingSeven" className="card-header bg-white shadow-sm border-0">
                            <h6 className="mb-0 accordion_title"><Link href="/" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven" className="d-block position-relative text-dark collapsible-link py-2 collapsed">How long can one stay after studying in the UK?</Link></h6>
                            </div>
                            <div id="collapseSeven" aria-labelledby="headingSeven" data-parent="#accordionExample" className="collapse">
                            <div className="card-body pl-3 pr-3 pt-0">
                                <p>According to the new law, students will now have the opportunity of obtaining a two-year work permit upon the completion of their degree thus opening up avenues for permanent settlement in the country. There are immense prospects for a lucrative career after you study in UK. So, it is important that you engage effectively with your course and stay on the lookout for good career opportunities!</p>
                            </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="lmp_thumb">
                        <Image src={faq} className="img-fluid" alt="UK faq" loading="lazy"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
