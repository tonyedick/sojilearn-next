'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import './main.css';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date: February 7, 2026 
    const targetDate = new Date('2026-02-07T00:00:00Z').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="tw-relative theme-bg tw-text-white tw-overflow-hidden">
      {/* Background Pattern */}
      <div className="tw-absolute tw-inset-0 tw-bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] tw-opacity-20"></div>
      
      <div className="tw-relative tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-16 lg:tw-py-24">
        <div className="tw-grid lg:tw-grid-cols-2 tw-gap-12 tw-items-center">
          {/* Left Column - Main Content */}
          <div className="tw-space-y-8">
            {/* Hook */}
            <div className="tw-space-y-4">
              <h1 className="tw-text-3xl lg:tw-text-3xl tw-font-bold text-white tw-leading-tight">
                Planning to study or work{' '}
                <span className="tw-text-orange-400">ABROAD?</span>
              </h1>
            </div>

            {/* Why It Matters */}
            <div className="tw-bg-blue-800/50 tw-backdrop-blur-sm tw-rounded-2xl tw-p-6 tw-border tw-border-blue-700/50">
              <p className="tw-text-xl lg:tw-text-2xl tw-text-blue-100 tw-leading-relaxed">
                With Sojilearn, it is a straight forward process. <br />
                <br />We help students achieve their career goals through tailored admission support into choice universities in UK, Canada, Germany, USA, Ireland, and Malta. <br />We do not stop there, you get help with covering tuition and living expenses, to pursue your study abroad dream through student loan (UK, USA, Canada){' '}<span className="tw-text-orange-400 tw-font-semibold">NO COSIGNER, NO COLLATERAL</span>.
              </p>
            </div>

            {/* Benefits */}
            <div className="tw-space-y-4">
               <p className="tw-text-sm tw-text-blue-200">
                📌 Key offerings to further support you:
              </p>
            </div>
            <div className="tw-grid sm:tw-grid-cols-3 tw-gap-4">
              <div className="tw-flex tw-items-center tw-space-x-3 tw-bg-green-500/10 tw-rounded-lg tw-p-4 tw-border tw-border-green-500/20">
                <CheckCircle className="tw-w-6 tw-h-6 tw-text-green-400 tw-flex-shrink-0" />
                <span className="tw-text-sm tw-font-medium">Enroll for direct Masters with HND/Third Class in the UK.</span>
              </div>
              <div className="tw-flex tw-items-center tw-space-x-3 tw-bg-green-500/10 tw-rounded-lg tw-p-4 tw-border tw-border-green-500/20">
                <CheckCircle className="tw-w-6 tw-h-6 tw-text-green-400 tw-flex-shrink-0" />
                <span className="tw-text-sm tw-font-medium">Migrate to Japan, USA, Germamy as a Nurse within 6-9 months.</span>
              </div>
              <div className="tw-flex tw-items-center tw-space-x-3 tw-bg-green-500/10 tw-rounded-lg tw-p-4 tw-border tw-border-green-500/20">
                <CheckCircle className="tw-w-6 tw-h-6 tw-text-green-400 tw-flex-shrink-0" />
                <span className="tw-text-sm tw-font-medium">Secure student loan to cover tuition and living expenses.</span>
              </div>
            </div>

            {/* CTA */}
            <div className="tw-space-y-4">
              <button
                onClick={onGetStarted}
                className="tw-group tw-bg-orange-500 tw-hover:bg-orange-600 tw-text-white tw-px-8 tw-py-4 tw-rounded-xl tw-font-semibold tw-text-lg tw-transition-all tw-duration-300 tw-transform tw-hover:scale-105 tw-hover:shadow-xl tw-flex tw-items-center tw-space-x-3 pulse-zoom"
              >
                <span>Start Your Journey Today</span>
                <ArrowRight className="tw-w-5 tw-h-5 tw-group-hover:translate-x-1 tw-transition-transform" />
              </button>
              {/* <p className="tw-text-sm tw-text-blue-200">
                📌 Don't wait. Start the simple process now.
              </p> */}
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="tw-relative">
             {/* Countdown Timer for Urgency */}
            <div className="tw-bg-gradient-to-r tw-from-orange-500/10 tw-to-red-500/10 tw-backdrop-blur-sm tw-rounded-2xl tw-p-6 tw-border tw-border-orange-400/30 tw-mb-4">
              <div className="tw-text-center">
                <h3 className="tw-text-lg tw-font-bold tw-text-orange-300 tw-mb-2">
                  ⚡ January, May, September 2026 Intake Available
                </h3>
                <p className="tw-text-sm tw-text-orange-100 tw-mb-4">
                  Start your application NOW! Only <span className="tw-font-bold tw-text-orange-300">{timeLeft.days}</span> days left to begin applications
                </p>
                
                <div className="tw-grid tw-grid-cols-4 tw-gap-3 tw-max-w-md tw-mx-auto">
                  <div className="tw-bg-white/10 tw-rounded-lg tw-p-3 tw-text-center">
                    <div className="tw-text-2xl tw-font-bold tw-text-white">{timeLeft.days}</div>
                    <div className="tw-text-xs tw-text-orange-200">DAYS</div>
                  </div>
                  <div className="tw-bg-white/10 tw-rounded-lg tw-p-3 tw-text-center">
                    <div className="tw-text-2xl tw-font-bold tw-text-white">{timeLeft.hours}</div>
                    <div className="tw-text-xs tw-text-orange-200">HOURS</div>
                  </div>
                  <div className="tw-bg-white/10 tw-rounded-lg tw-p-3 tw-text-center">
                    <div className="tw-text-2xl tw-font-bold tw-text-white">{timeLeft.minutes}</div>
                    <div className="tw-text-xs tw-text-orange-200">MINS</div>
                  </div>
                  <div className="tw-bg-white/10 tw-rounded-lg tw-p-3 tw-text-center">
                    <div className="tw-text-2xl tw-font-bold tw-text-white">{timeLeft.seconds}</div>
                    <div className="tw-text-xs tw-text-orange-200">SECS</div>
                  </div>
                </div>
                
                <p className="tw-text-xs tw-text-orange-200 tw-mt-3">
                  💡 POF and Visa processing takes the most time - do not miss your chance!
                </p>
              </div>
            </div>

            <div className="tw-bg-white/10 tw-backdrop-blur-sm tw-rounded-3xl tw-p-8 tw-border tw-border-white/20">
              <div className="tw-space-y-6">
                <div className="tw-text-center">
                  <h3 className="tw-text-2xl tw-font-bold tw-mb-4 text-white">The Sojilearn Process</h3>
                  <p className="tw-text-blue-100">Clear path from application → admission → visa → travel</p>
                </div>
                
                <div className="tw-space-y-4">
                  <div className="tw-flex tw-items-center tw-space-x-4 tw-bg-white/5 tw-rounded-lg tw-p-4">
                    <div className="tw-bg-orange-500 tw-text-white tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-font-bold">1</div>
                    <span className="tw-tw-font-medium">Application</span>
                  </div>
                  <div className="tw-flex tw-items-center tw-space-x-4 tw-bg-white/5 tw-rounded-lg tw-p-4">
                    <div className="tw-bg-orange-500 tw-text-white tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-font-bold">2</div>
                    <span className="tw-font-medium">Admission</span>
                  </div>
                  <div className="tw-flex tw-items-center tw-space-x-4 tw-bg-white/5 tw-rounded-lg tw-p-4">
                    <div className="tw-bg-orange-500 tw-text-white tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-font-bold">3</div>
                    <span className="tw-font-medium">Visa</span>
                  </div>
                  <div className="tw-flex tw-items-center tw-space-x-4 tw-bg-white/5 tw-rounded-lg tw-p-4">
                    <div className="tw-bg-orange-500 tw-text-white tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-font-bold">4</div>
                    <span className="tw-font-medium">Travel!</span>
                  </div>
                </div>

                {/* <div className="tw-text-center tw-pt-4">
                  <div className="tw-flex tw-items-center tw-justify-center tw-space-x-2 tw-text-green-400">
                    <Clock className="tw-w-5 tw-h-5" />
                    <span className="tw-font-semibold">Super-fast, stress-free process</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}