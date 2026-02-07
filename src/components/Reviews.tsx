import Image from 'next/image';

const reviews = [
    { user: 'Roy M. Cardona', role: 'Google Founder', stars: 4.9, imgSrc: 'assets/img/user-3.jpg', logoSrc: 'assets/img/c-3.png', comment: 'Sojilearn has obviously taken the time to understudy the needs of students and created the best solution to cater for it through this portal'},
    { user: 'Dorothy K. Shipton', role: 'Linkedin Leader', stars: 4.7, imgSrc: 'assets/img/user-4.jpg', logoSrc: 'assets/img/c-4.png', comment: 'Demo comment'},
    { user: 'Robert P. McKissack', role: 'CEO, Leader', stars: 4.7, imgSrc: 'assets/img/user-5.jpg', logoSrc: 'assets/img/c-5.png', comment: 'Demo comment'},
    { user: 'Susan D. Murphy', role: 'CEO, Leader', stars: 4.7, imgSrc: 'assets/img/user-1.jpg', logoSrc: 'assets/img/c-1.png', comment: 'Demo comment'},
    { user: 'Maxine E. Gagliardi', role: 'Apple CEO', stars: 4.5, imgSrc: 'assets/img/user-2.jpg', logoSrc: 'assets/img/c-2.png', comment: 'Demo comment'},
];

export default function Reviews() {
  return (
    <div>
      <section className="white">
        <div className="container">

            <div className="row justify-content-center">
                <div className="col-lg-7 col-md-8">
                    <div className="sec-heading center">
                        <h2>Our <span className="theme-cl">Reviews</span></h2>
                        <p>Here&rsquo;s what our students and partner institutions have to say about our service delivery.</p>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-xl-12 col-lg-12 col-sm-12">

                    <div className="reviews-slide space slick-initialized slick-slider">
                        <button type="button" data-role="none" className="slick-prev slick-arrow" aria-label="Previous">Previous</button>

                        <div aria-live="polite" className="slick-list draggable">
                          <div className="slick-track">
                            {reviews.map((review, index) => (
                              <div
                                key={index}
                                className="single_items lios_item slick-slide slick-current slick-active"
                                style={{ width: "390px" }}
                              >
                                <div className="_testimonial_wrios shadow_none">
                                  <div className="_testimonial_flex">
                                    <div className="_testimonial_flex_first">
                                      <div className="_tsl_flex_thumb">
                                        <Image src={review.imgSrc} className="img-fluid" alt="Reviews from blog users" width={50} height={50} />
                                      </div>
                                      <div className="_tsl_flex_capst">
                                        <h5>{review.user}</h5>
                                        <div className="_ovr_posts"><span>{review.role}</span></div>
                                      </div>
                                    </div>
                                    <div className="_testimonial_flex_first_last">
                                      <div className="_tsl_flex_thumb">
                                        <div className="_ovr_rates"><span><i className="fa fa-star"></i></span>{review.stars}</div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="facts-detail text-center">
                                    <p>{review.comment}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button type="button" data-role="none" className="slick-next slick-arrow" aria-label="Next">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}
