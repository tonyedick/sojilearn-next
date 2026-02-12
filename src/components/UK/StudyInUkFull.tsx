'use client';

import React, { useState }  from 'react'

export default function StudyInUkFull() {

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
                        <h2 className="mb-3">Why Study in United Kingdom?</h2>
                        {showFullText ? (
                            <>
                                <p>The United Kingdom is home to the world&apos;s most esteemed universities and is among the popular destinations for studying abroad. Ranked as the best education systems in the world, the British Education System provides a plethora of courses in various subjects including Business, Engineering, Medicine, Arts, and Design delivered through exceptional teaching styles.</p>
                                <p>The curriculum is designed in a flexible way which helps students customize their courses depending on their unique interests.</p>
                                <p>The United Kingdom is among the top countries for advanced research and has contributed consistently to groundbreaking discoveries. Apart from ranking high in academic excellence, the UK is known for its multicultural ethos that attracts many students globally. Famed for its heritage sites and art, students can also indulge a dynamic culture which makes their stay merrier. Being the global hub of Europe, the country has a high-income economy making it the best place to find various job opportunities.</p>
                            </>
                        ) : (
                            <> 
                                <p>The United Kingdom is home to the world&apos;s most esteemed universities and is among the popular destinations for studying abroad. Ranked as the best education systems in the world, the British Education System provides a plethora of courses in various subjects including Business, Engineering, Medicine, Arts, and Design delivered through exceptional teaching styles.</p>
                                <p>The curriculum is designed in a flexible way which helps students customize their courses depending on their unique interests ....</p>
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
