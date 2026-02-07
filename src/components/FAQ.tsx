'use client';

import Link from 'next/link';

export default function FAQ() {
  return (
    
    <section>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-7 col-md-8">
                    <div className="sec-heading center">
                        <h2>There are no stupid questions, Ask Away, <span className="theme-cl">We are All Ears</span></h2>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12">
                    <div id="accordionExample" className="accordion">

                        <div className="card">
                            <div id="headingOne" className="card-header bg-white shadow-sm border-0">
                            <h6 className="mb-0 accordion_title"><Link href="/" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" className="d-block position-relative text-dark collapsible-link py-2 collapsed">How much does it cost to process admission for a student?</Link></h6>
                            </div>
                            <div id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample" className="collapse">
                            <div className="card-body pl-3 pr-3 pt-0">
                                <p>Sojilearn charges a one-time fee of $199 to process undergraduate or post graduate admission in USA and Canada, while for the UK, Germany, Malta, Ireland, we charge a one-time fee of $70.</p>
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div id="headingTwo" className="card-header bg-white shadow-sm border-0">
                            <h6 className="mb-0 accordion_title"><Link href="/" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" className="d-block position-relative text-dark collapsible-link py-2 collapsed">Can I have multiple applications at the same time?</Link></h6>
                            </div>
                            <div id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordionExample" className="collapse">
                            <div className="card-body pl-3 pr-3 pt-0">
                                <p>Yes, when we submit your application, we apply to multiple universities for you.</p>
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div id="headingThree" className="card-header bg-white shadow-sm border-0">
                            <h6 className="mb-0 accordion_title"><Link href="/" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" className="d-block position-relative collapsed text-dark collapsible-link py-2">How can I track my applications?</Link></h6>
                            </div>
                            <div id="collapseThree" aria-labelledby="headingThree" data-parent="#accordionExample" className="collapse">
                            <div className="card-body pl-3 pr-3 pt-0">
                                <p>For smooth communication, our team will keep you updated on the status of your applications via email and WhatsApp.</p>
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div id="headingFour" className="card-header bg-white shadow-sm border-0">
                            <h6 className="mb-0 accordion_title"><Link href="/" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" className="d-block position-relative collapsed text-dark collapsible-link py-2">Are there benefits for referring students to Sojilearn?</Link></h6>
                            </div>
                            <div id="collapseFour" aria-labelledby="headingFour" data-parent="#accordionExample" className="collapse">
                            <div className="card-body pl-3 pr-3 pt-0">
                                <p>Yes, when you refer a student to Sojilearn, you stand a chance to earn from $150 to $300.</p>
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div id="headingFive" className="card-header bg-white shadow-sm border-0">
                            <h6 className="mb-0 accordion_title"><Link href="/" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" className="d-block position-relative collapsed text-dark collapsible-link py-2">What are the countries you process admission for?</Link></h6>
                            </div>
                            <div id="collapseFive" aria-labelledby="headingFive" data-parent="#accordionExample" className="collapse">
                            <div className="card-body pl-3 pr-3 pt-0">
                                <p>Currently, our partner universities are in Malta, UK, Germany, USA, Canada and Ireland.</p>
                            </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
