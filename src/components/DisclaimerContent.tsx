'use client';

import Link from "next/link";


export default function DisclaimerContent() {
    return (
      <>
        <section>
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="lmp_caption">
                            <h2 className="mb-3 theme-cl">Disclaimer</h2>
                            <p>While Sojilearn Optimun Solutions Ltd has attempted to make the information on this server as accurate as possible, the information on this website server is for personal and/or educational use only and is provided in good faith without any express or implied warranty. There is no guarantee given as to the accuracy or currency of any individual item on the website.</p>
                            <br />
                            <p>Persons accessing the website who require confirmation of any information should refer to Sojilearn&apos;s sourcing the information for this website. Sojilearn does not accept responsibility for any loss or damage occasioned by use of the information contained on the server nor from any access to the server. While Sojilearn will make every effort to ensure the availability and integrity of its resources, it cannot guarantee that these will always be available, and/or free of any defects, including viruses. Users should take this into account when accessing the resources. All access and use is at the risk of the user.</p>
                            <br />
                            <p>Sojilearn has provided hypertext links to a number of other websites as a service to users of this website. This service does not mean that Sojilearn endorses those sites or material on them in any way. Sojilearn is not responsible for the use of a hypertext link for which a commercial charge applies. Individual users are responsible for any charges that their use may incur.</p>
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