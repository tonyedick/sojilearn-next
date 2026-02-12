'use client';

import Image from 'next/image';
import cost from "../../assets/img/cost.webp";
import rent from "../../assets/img/rent.svg";
import food from "../../assets/img/food.svg";
import transport from "../../assets/img/transport.svg";
import misc from "../../assets/img/misc.svg";

export default function PostUniCA() {
  return (
    <section className="gray">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-12 col-md-8">
                <div className="sec-heading center">
                    <h2>Post Admission Experience</h2>
                </div>
            </div>
        </div>
        <div className="row align-items-center justify-content-between border border-dark-subtle rounded p-4">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="lmp_caption">
                <h4>Cost Of Living in Canada</h4>
                    <div className="mb-4 mt-4 ml-lg-0 mr-lg-4">
                        <div className="d-flex align-items-center">
                            <div className="list_crs_img">
                                <Image src={cost} className="img-fluid" alt="Cost of living in Canada"/>
                                <p>Low 
                                    <span className="needle mediumLeft" 
                                        style={{
                                            transform: "rotate(-50deg)", width: "5px",
                                            height: "127px",
                                            background: "#333",
                                            border: "5.953px solid #333",
                                            left: "158px",
                                            position: "absolute",
                                            bottom: "70px",
                                            transformOrigin: "bottom",
                                            borderRadius: "20px",
                                        }}>
                                    </span>
                                    <span style={{marginLeft: "235px"}}>High</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="lmp_caption">
                <h4>Monthly Living Expenses in Canada</h4>
                    <div className="mb-4 mt-4 ml-lg-0 mr-lg-4">
                        <div className="row mt-4">
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={rent} height="50" width="50" className="img-fluid" alt="Cost of rent in canada for studen"/>
                                        <h4 className="mt-3">Rent</h4>
                                        <p>CA$ 318 - CA$ 2389</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={food} height="50" width="50" className="img-fluid" alt="Cost of feeding in Canada for students"/>
                                        <h4 className="mt-3">Food</h4>
                                        <p>CA$ 318 - CA$ 637</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={transport} height="50" width="50" className="img-fluid" alt="Transportation cost in Canada"/>
                                        <h4 className="mt-3">Transport</h4>
                                        <p>CA$ 63 - CA$ 159</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={misc} height="50" width="50" className="img-fluid" alt="Canada living expenses"/>
                                        <h4 className="mt-3">Miscellaneous</h4>
                                        <p>CA$ 79 - CA$ 398</p>
                                    </div>
                                </div>
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
