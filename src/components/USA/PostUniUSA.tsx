'use client';

import Image from 'next/image';
import cost from "../../assets/img/cost.webp";
import rent from "../../assets/img/rent.svg";
import food from "../../assets/img/food.svg";
import transport from "../../assets/img/transport.svg";
import misc from "../../assets/img/misc.svg";

export default function PostUniUSA() {
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
                <h4>Cost Of Living in United States</h4>
                    <div className="mb-4 mt-4 ml-lg-0 mr-lg-4">
                        <div className="d-flex align-items-center">
                            <div className="list_crs_img">
                                <Image src={cost} className="img-fluid" alt="USA cost of living" />
                                <p>Low 
                                    <span className="needle mediumLeft" 
                                        style={{
                                            transform: "rotate(45deg)", width: "5px",
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
                <h4>Monthly Living Expenses in United States</h4>
                    <div className="mb-4 mt-4 ml-lg-0 mr-lg-4">
                        <div className="row mt-4">
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={rent} height="50" width="50" className="img-fluid" alt="USA cost of rent" />
                                        <h4 className="mt-3">Rent</h4>
                                        <p>$ 600 - $ 1000</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={food} height="50" width="50" className="img-fluid" alt="USA cost of feeding" />
                                        <h4 className="mt-3">Food</h4>
                                        <p>$ 350 - $ 500</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={transport} height="50" width="50" className="img-fluid" alt="USA cost of transport" />
                                        <h4 className="mt-3">Transport</h4>
                                        <p>$ 500 - $ 1000</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-mg-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="list_crs_img">
                                        <Image src={misc} height="50" width="50" className="img-fluid" alt="USA cost of living" />
                                        <h4 className="mt-3">Miscellaneous</h4>
                                        <p>$ 500 - $ 1000</p>
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
