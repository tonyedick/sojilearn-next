'use client';

import React from 'react';
import Link from 'next/link'

export default function CTA() {

  return (
    <div>
        <div className="clearfix"></div>

        <section className="theme-bg call_action_wrap-wrap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="call_action_wrap">
                            <div className="call_action_wrap-head">
                                <h3>Do You Have Questions ?</h3>
                                <span>We help you to grow your career and empower your dreams.</span>
                            </div>
                            <Link href="mailto:sojilearn@gmail.com" className="btn btn-call_action_wrap" rel="noopener noreferrer"
                                onClick={handleCTAClick}
                            >Contact Us Today</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
