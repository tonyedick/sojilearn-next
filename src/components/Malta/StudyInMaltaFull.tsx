'use client';

import React, { useState }  from 'react'

export default function StudyInMaltaFull() {

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
                        <h2 className="mb-3">Why Study in Malta?</h2>
                        {showFullText ? (
                            <>
                                <p>Discover a hidden gem in the heart of the Mediterranean that offers high 
quality english speaking education, affordable tuition, a safe environment, 
and strong job prospects in sectors like tourism, finance, and tech, Malta 
combines a vibrant cultural experience with career-building opportunities, 
making it a prime study destination.</p>
                                <p>Accreditation by MQF (Malta Qualification Framework), Programmes accredited by “Get Qualified Scheme”, High Quality Teaching and Learning, Global Academic Progression, Student Visa support, MFHEA Approved, Great Scholarships.</p>
                                <p>Study at GBS Malta, a vibrant business hub, and gain the skills, global 
connections, and experience to thrive in international markets.</p>
                            </>
                        ) : (
                            <> 
                                <p>Discover a hidden gem in the heart of the Mediterranean that offers high 
quality english speaking education, affordable tuition, a safe environment, 
and strong job prospects in sectors like tourism, finance, and tech, Malta 
combines a vibrant cultural experience with career-building opportunities, 
making it a prime study destination.</p>
                                <p>Accreditation by MQF (Malta Qualification Framework)....</p>
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
