import Link from 'next/link';
import Image from 'next/image';
import cirl from "../assets/img/img-1.png";
import cirl1 from "../assets/img/img-2.png";
import cirl2 from "../assets/img/st-3.png";

export default function Steps() {
  return (
    <div>
        <section className="gray">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-8">
                        <div className="sec-heading center">
                            <h2>How It <span className="theme-cl">Works?</span></h2>
                            <p>Dive into a world of diverse destinations, prestigious universities, and exciting courses.</p>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center justify-content-between">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="side_block extream_img">
                            <div className="list_crs_img">
                                <Image src={cirl} className="img-fluid elsio cirl animate-fl-y" alt="Sojilearn hero icons" width={100} height={100} />
                                {/* <Image src="assets/img/img-3.png" className="img-fluid elsio arrow animate-fl-x" alt="Sojilearn hero icons" width={100} height={100} /> */}
                                <Image src={cirl1} className="img-fluid elsio moon animate-fl-x" alt="Sojilearn hero icons" width={100} height={100} />
                            </div>
                                <Image src={cirl2} className="img-fluid" alt="sojilearn processing steps" loading="lazy" width={100} height={100} />
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                        <div className="lmp_caption">
                            <ol className="list-unstyled p-0">
                                <li className="d-flex align-items-start my-3 my-md-4">
                                    <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                                        <div className="position-absolute text-white h5 mb-0">1</div>
                                    </div>
                                    <div className="ml-3 ml-md-4">
                                        <h4>Required Documents</h4>
                                        <p>
                                            Visit the specific country of your choice at the <strong>Top Navigation</strong> for details of documents required to process your admission. 
                                        </p>
                                    </div>
                                </li>
                                <li className="d-flex align-items-start my-3 my-md-4">
                                    <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                                        <div className="position-absolute text-white h5 mb-0">2</div>
                                    </div>
                                    <div className="ml-3 ml-md-4">
                                        <h4>Fill the Online Form</h4>
                                        <p>
                                            Click to fill this <strong><i>🔗</i> <Link href="/apply" rel="noopener noreferrer">ONLINE FORM</Link></strong> where we get basic details about your interest.
                                        </p>
                                    </div>
                                </li>
                                <li className="d-flex align-items-start my-3 my-md-4">
                                    <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                                        <div className="position-absolute text-white h5 mb-0">3</div>
                                    </div>

                                    <div className="ml-3 ml-md-4">
                                        <h4>Application Process</h4>
                                        <p>
                                            We initiate the application process, applying to our partner universities in your choice country.
                                        </p>
                                    </div>
                                </li>
                                <li className="d-flex align-items-start my-3 my-md-4">
                                    <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                                        <div className="position-absolute text-white h5 mb-0">4</div>
                                    </div>
                                    <div className="ml-3 ml-md-4">
                                        <h4>Get Admit</h4>
                                        <p>
                                            Upon receiving your admission letter, we provide necessary guide for next steps.
                                        </p>
                                    </div>
                                </li>
                                <li className="d-flex align-items-start my-3 my-md-4">
                                    <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                                        <div className="position-absolute text-white h5 mb-0">5</div>
                                    </div>
                                    <div className="ml-3 ml-md-4">
                                        <h4>Fees, Visa & Travel</h4>
                                        <p>
                                            Where necessary, we can help provide guidance for visa processing, flight and help with accommodation.
                                        </p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <div className="inline_btn">
                            <Link href="/apply" className="btn theme-bg text-white font-medium pulse-zoom" rel="noopener noreferrer">START NOW</Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
  )
}
