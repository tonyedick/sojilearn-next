'use client';

import React from 'react';
import Link from 'next/link'

export default function CTAMalta() {
  return (
    <div>
        <div className="clearfix"></div>

        <section className="theme-bg call_action_wrap-wrap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="call_action_wrap">
                            <div className="call_action_wrap-head">
                                <h2 className="text-white">Make Your Dream To Study in Malta</h2>
                                <h3 style={{textShadow: "8px 8px 8px gray"}}>A Reality With Our Experts!</h3>
                            </div>
                            <Link href="/apply" className="btn-apply btn btn-call_action_wrap pulse-zoom" rel="noopener noreferrer">START NOW</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
