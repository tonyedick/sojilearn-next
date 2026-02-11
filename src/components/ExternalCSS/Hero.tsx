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
    <div className="relative theme-bg text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Hook */}
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-3xl font-bold text-white leading-tight">
                Planning to study or work{' '}
                <span className="text-orange-400">ABROAD?</span>
              </h1>
            </div>

            {/* Why It Matters */}
            <div className="bg-blue-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/50">
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                With Sojilearn, it is a straight forward process. <br />
                <br />We help students achieve their career goals through tailored admission support into choice universities in UK, Canada, Germany, USA, Ireland, and Malta. <br />We do not stop there, you get help with covering tuition and living expenses, to pursue your study abroad dream through student loan (UK, USA, Canada){' '}<span className="text-orange-400 font-semibold">NO COSIGNER, NO COLLATERAL</span>.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
               <p className="text-sm text-blue-200">
                📌 Key offerings to further support you:
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium">Enroll for direct Masters with HND/Third Class in the UK.</span>
              </div>
              <div className="flex items-center space-x-3 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium">Migrate to Japan, USA, Germamy as a Nurse within 6-9 months.</span>
              </div>
              <div className="flex items-center space-x-3 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium">Secure student loan to cover tuition and living expenses.</span>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <button
                onClick={onGetStarted}
                className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-3 pulse-zoom"
              >
                <span>Start Your Journey Today</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* <p className="text-sm text-blue-200">
                📌 Don't wait. Start the simple process now.
              </p> */}
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative">
             {/* Countdown Timer for Urgency */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-400/30 mb-4">
              <div className="text-center">
                <h3 className="text-lg font-bold text-orange-300 mb-2">
                  ⚡ January, May, September 2026 Intake Available
                </h3>
                <p className="text-sm text-orange-100 mb-4">
                  Start your application NOW! Only <span className="font-bold text-orange-300">{timeLeft.days}</span> days left to begin applications
                </p>
                
                <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
                    <div className="text-xs text-orange-200">DAYS</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
                    <div className="text-xs text-orange-200">HOURS</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
                    <div className="text-xs text-orange-200">MINS</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
                    <div className="text-xs text-orange-200">SECS</div>
                  </div>
                </div>
                
                <p className="text-xs text-orange-200 mt-3">
                  💡 POF and Visa processing takes the most time - do not miss your chance!
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-white">The Sojilearn Process</h3>
                  <p className="text-blue-100">Clear path from application → admission → visa → travel</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 bg-white/5 rounded-lg p-4">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                    <span className="font-medium">Application</span>
                  </div>
                  <div className="flex items-center space-x-4 bg-white/5 rounded-lg p-4">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                    <span className="font-medium">Admission</span>
                  </div>
                  <div className="flex items-center space-x-4 bg-white/5 rounded-lg p-4">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                    <span className="font-medium">Visa</span>
                  </div>
                  <div className="flex items-center space-x-4 bg-white/5 rounded-lg p-4">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                    <span className="font-medium">Travel!</span>
                  </div>
                </div>

                {/* <div className="text-center pt-4">
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Super-fast, stress-free process</span>
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