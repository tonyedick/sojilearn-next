'use client';

import React, { useState }  from 'react'

export default function StudyInGYFull() {

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
                        <h2 className="mb-3">Why Study in Germany?</h2>
                        {showFullText ? (
                            <>
                                <p>With over 2 million+ job openings, Germany boasts a robust economy and offers substantial career opportunities post-graduation. As the fourth largest economy in the world, Germany offers a stable environment for both education and work. The universities here are known for their high-quality education that focuses on preparing students to thrive in the global job market. Furthermore, students can benefit from competitive minimum salary packages starting from €43,808.28, enhancing the appeal of working in Germany. Plus, when you study in Germany, you receive a Schengen Visa, giving you access to travel and explore over 26+ European countries.</p>
                                <p>Above all, if you are eligible you can also get a permanent residency in just two years coupled with an 18-month visa after your studies, providing graduates with the stability and opportunity to establish a prosperous future in Germany. These benefits collectively make studying in Germany an excellent choice for those looking to enhance their educational and professional life.</p>
                            </>
                        ) : (
                            <> 
                                <p>With over 2 million+ job openings, Germany boasts a robust economy and offers substantial career opportunities post-graduation. As the fourth largest economy in the world, Germany offers a stable environment for both education and work. The universities here are known for their high-quality education that focuses on preparing students to thrive in the global job market. Furthermore, students can benefit from competitive minimum salary packages starting from €43,808.28, enhancing the appeal o....</p>
                            </>
                        )}
                    </div>

                    <div className="inline_btn">
                        <button onClick={toggleReadMore} className="btn-apply btn theme-bg text-white">
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
