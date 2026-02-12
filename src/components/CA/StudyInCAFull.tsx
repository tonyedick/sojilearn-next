'use client';

import React, { useState }  from 'react'

export default function StudyInCAFull() {

    const [showFullText, setShowFullText] = useState(false);

    const toggleReadMore = () => {
      setShowFullText(!showFullText);
    };

  return (
    <div>
        <section className="gray">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="lmp_caption">
                        <h2 className="mb-3">Why Study in Canada?</h2>
                        {showFullText ? (
                            <>
                                <p>Canada is one of the leading study abroad destinations for Nigerian students. The country offers top-notch education at affordable costs which makes it an ideal choice for international students. Offering a dynamic student life, many of the Canadian institutions are ranked among the top 10 global universities. The Canadian Ministry of Education highly encourages foreign students and has also provided various financial aids and facilities to ease their stay.</p>
                                <p>Being ranked as one of the best places to reside, the country is also renowned for its quality of life. It is also among the safest countries in the world and several residencies provide complete medical coverage for international students. With student-friendly cities like Ottawa, Montreal, Toronto, Vancouver, and Quebec, the vast country has a scenic and pleasant environment with multiple leisure activities. Owing to the flexible and streamlined PR and immigration policies, the country accumulates the largest amount of international students.</p>
                            </>
                        ) : (
                            <> 
                                <p>Canada is one of the leading study abroad destinations for Nigerian students. The country offers top-notch education at affordable costs which makes it an ideal choice for international students. Offering a dynamic student life, many of the Canadian institutions are ranked among the top 10 global universities. The Canadian Ministry of Education highly encourages foreign students and has also provided various financial aids and facilities to ease their stay.....</p>
                            </>
                        )}
                    </div>

                    <div className="inline_btn">
                        <button onClick={toggleReadMore} className="btn theme-bg text-white">
                            {showFullText ? 'Read Less' : 'Read More'}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </section>
    </div>
  )
}
