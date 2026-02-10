import Link from 'next/link';
import Image from 'next/image';
import canada from "../assets/img/news.png";

export default function SimplifyAdmit() {
  return (
    <div>
        <section style={{backgroundColor: '#DFFFFF'}}>
        <div className="container">

            <div className="row align-items-center justify-content-between">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                    <div className="lmp_caption">
                        <span className="theme-cl">Join over 5,000 International Students</span>
                        <h2 className="mb-3">We simplify international admissions for students.</h2>
                        <p>Sojilearn helps students figure what they should do and where they should be at - wherever that be in the world - to realise their full potential. </p>
                        <p>We help students navigate & assess their journey thus far, matching them to personalised mentors, counsels them towards their higher education dream with an employability lens, and makes sure that everyone punched way above their weight to make dreams come alive and truly be able to level up.</p>
                        <div className="foot-news-last mt-4">
                            <div className="inline_btn">
								<Link href="/apply" 
                                className="btn-apply btn theme-bg text-white font-medium pulse-zoom" 
                                rel="noopener noreferrer">START NOW</Link>
							</div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                    <div className="lmp_thumb">
                        <Image src={canada} className="img-fluid" alt="canada simplify admission" loading="lazy" />
                    </div>
                </div>
            </div>

        </div>
    </section>
    </div>
  )
}
