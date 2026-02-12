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
                        <h2 className="mb-3">Why Study in USA?</h2>
                        {showFullText ? (
                            <>
                                <p>The United States of America is amongst the most popular study destinations globally, housing the world&apos;s top-ranked institutions. It is known to host the highest number of international students from all over the globe. Studying in the USA offers a perfectly blended student experience with an exciting campus environment and cultural diversity.</p>
                                <p>The melting-pot country provides an ideal environment for students&apos; developmental growth through flexible education methods and promotes creative thinking in various fields of study. It houses all 8 Ivy League universities of the world, of which Harvard University holds the highest rank in the country and is considered the most prestigious. Thanks to the sheer size of the country and a large number of schools and universities, there is a university suited for each student. From the breathtaking L.A. beaches to the Big Apple, the United States is truly the land of opportunities.</p>
                            </>
                        ) : (
                            <> 
                                <p>The United States of America is amongst the most popular study destinations globally, housing the world&apos;s top-ranked institutions. It is known to host the highest number of international students from all over the globe. Studying in the USA offers a perfectly blended student experience with an exciting campus environment and cultural diversity.......</p>
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
