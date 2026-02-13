import React from 'react'
import Link from 'next/link'

export default function StudyInGermany() {
  return (
    <div>
        <section className="white">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-7 col-md-8">
                    <div className="sec-heading center">
                        <h2>Study in <span className="theme-cl">Canada</span></h2>
                    </div>
                </div>
            </div>
            <div className="row align-items-center justify-content-between mt-5">
                <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                    <div className="side_block extream_img">
                        <img src="assets/img/canada.jpg" className="img-fluid rounded" alt="Why study in Canada" loading="lazy"/>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mt-3">
                    <div className="lmp_caption">
                        <h2 className="mb-3">Why Study in Canada?</h2>
                        <p>Canada is one of the leading study abroad destinations for African students. The country offers top-notch education at affordable costs which makes it an ideal choice for international students. </p>
                        <p> Offering a dynamic student life, many of the Canadian institutions are ranked among the top 10 global universities. The Canadian Ministry of Education highly encourages foreign students and has also provided various financial aids and facilities to ease their stay.</p>
                    </div>

                    <div className="inline_btn">
                        <Link to="/study-in-canada" className="btn theme-bg text-white">View More</Link>
                    </div>
                </div>
            </div>

        </div>
    </section>
    </div>
  )
}
