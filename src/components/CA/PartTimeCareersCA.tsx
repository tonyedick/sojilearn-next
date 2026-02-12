'use client';

import Image from 'next/image';

import arts from "../../assets/img/arts.png";
import architecture from "../../assets/img/architecture.png";
import socialsciences from "../../assets/img/socialsciences.png";
import law from "../../assets/img/law.png";
import engineering from "../../assets/img/engineering.png";
import design from "../../assets/img/design.png";
import medicine from "../../assets/img/medicine.png";
import naturalsciences from "../../assets/img/naturalsciences.png";

export default function PartTimeCareersCA() {
  return (
    <section className="white">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-10 col-md-8">
                <div className="sec-heading center">
                    <h2>Part time Careers and Work Opportunities in Canada</h2>
                    <p className="h6">Studying in Canada offers a variety of experiences. The cultural and traditional values of Canada attract several international students every year.</p>
                </div>
            </div>
        </div>
        <div className="row align-items-center justify-content-between p-4 rounded" style={{backgroundColor: '#DFFFFF'}}>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="lmp_caption">
                    <div className="mb-4 mt-4 ml-lg-0 mr-lg-4">
                        <div className="row mt-3">
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={arts} height="50" width="50" className="img-fluid"  alt="Canada courses arts and humanities"/>
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Arts and Humanities</strong></p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-mg-6 col-sm-6 mt-1">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={socialsciences} height="50" width="50" className="img-fluid" alt="Canada courses social sciences"/>
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Social Sciences</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={law} height="50" width="50" className="img-fluid" alt="Canada courses law and legal studies"/>
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Law and Legal Studies</strong></p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-mg-6 col-sm-6 mt-1">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={engineering} height="50" width="50" className="img-fluid" alt="Canada courses engineering and technology"/>
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Engineering and Technology</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={architecture} height="50" width="50" className="img-fluid" alt="Canada courses architecture"/>
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Architecture</strong></p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-mg-6 col-sm-6 mt-1">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={design} height="50" width="50" className="img-fluid" alt="Canada courses design"/>
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Design</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={medicine} height="50" width="50" className="img-fluid"  alt="Canada courses medicine and life sciences"/>
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Medicine and Life Sciences</strong></p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-mg-6 col-sm-6 mt-1">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={naturalsciences} height="50" width="50" className="img-fluid"  alt="Canada courses natural sciences"/>
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Natural Sciences</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="lmp_caption">
                    <div className="mb-4 mt-4">
                        <div className="row p-4 rounded" style={{backgroundColor: '#8A5DAF'}}>
                            <div className="col text-center">
                                <h5 className="text-white">Post Study Work VISA</h5>
                                <p className="text-white">Students completing a Bachelors or Masters program get a work VISA of 2 years. PhD graduates get a work VISA of 3 years.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 mt-4">
                        <div className="row p-4 rounded" style={{backgroundColor: '#8A5DAF'}}>
                            <div className="col text-center">
                                <h5 className="text-white">Part-time Work Opportunities</h5>
                                <p className="text-white">Maximum of 20 hours per week for regular students. Maximum of 10 hours per week for language center students</p>
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
