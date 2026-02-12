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

export default function PartTimeCareersMalta() {
  return (
    <section className="white">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-10 col-md-8">
                <div className="sec-heading center">
                    <h2>Part time Careers and Work Opportunities in Malta</h2>
                    <p className="h6">Discover a hidden gem in the heart of the Mediterranean that offers high 
quality english speaking education, affordable tuition, a safe environment, 
and strong job prospects in sectors like tourism, finance, and tech:</p>
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
                                        <Image src={arts} height="50" width="50" className="img-fluid" alt="part time career opportunities in Malta" />
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Arts and Humanities</strong></p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-mg-6 col-sm-6 mt-1">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={socialsciences} height="50" width="50" className="img-fluid" alt="part time career opportunities in Malta" />
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Social Sciences</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={law} height="50" width="50" className="img-fluid" alt="part time career opportunities in Malta" />
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Law and Legal Studies</strong></p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-mg-6 col-sm-6 mt-1">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={engineering} height="50" width="50" className="img-fluid" alt="part time career opportunities in Malta" />
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Engineering and Technology</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={architecture} height="50" width="50" className="img-fluid" alt="part time career opportunities in Malta" />
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Architecture</strong></p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-mg-6 col-sm-6 mt-1">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={design} height="50" width="50" className="img-fluid" alt="part time career opportunities in Malta" />
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Design</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={medicine} height="50" width="50" className="img-fluid" alt="part time career opportunities in Malta" />
                                    </div>
                                    <p className="mt-3 ml-4"><strong>Medicine and Life Sciences</strong></p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-mg-6 col-sm-6 mt-1">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={naturalsciences} height="50" width="50" className="img-fluid" alt="part time career opportunities in Malta" />
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
                                <p className="text-white">Students completing a Bachelors or Masters program get a work VISA of 1 year.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 mt-4">
                        <div className="row p-4 rounded" style={{backgroundColor: '#8A5DAF'}}>
                            <div className="col text-center">
                                <h5 className="text-white">Part-time Work Opportunities</h5>
                                <p className="text-white">Maximum of 20 hours per week for regular students.</p>
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
