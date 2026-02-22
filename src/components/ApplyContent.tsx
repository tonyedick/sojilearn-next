'use client';

import MultiStepForm from "./ExternalCSS/MultiStepForm";
import Hero from "./ExternalCSS/Hero";
import { useRef } from "react";
import { usePageTracking } from '@/utils/websiteAnalytics';

export default function AboutContent() {
    usePageTracking('application');
    const formRef = useRef<HTMLDivElement>(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
    <div className="min-h-screen bg-gray-50">
        <Hero onGetStarted={scrollToForm} />

        <div className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Join 500+ Students Who&apos;ve Made It Abroad in 2025
                    </h2>
                    <p className="text-lg text-gray-600">
                    Real results from real students who chose us
                    </p>
                </div>

                {/* Testimonials */}
                <section id="success-stories">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 theme-bg rounded-full flex items-center justify-center text-white font-bold">
                                R
                                </div>
                                <div className="ml-4">
                                <h4 className="font-semibold text-gray-900">Rufai T. (MSc. Project Management), Canada</h4>
                                <p className="text-sm text-gray-600">Support with student loan</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">
                                &quot;I was able to secure admission in a top university in Toronto, Canada, and qualify for student loan that covers my tuition and living expenses. I still cannot believe this is real.&quot;
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 theme-bg rounded-full flex items-center justify-center text-white font-bold">
                                J
                                </div>
                                <div className="ml-4">
                                <h4 className="font-semibold text-gray-900">Justice N. (MSc. Artificial Intelligence), USA</h4>
                                <p className="text-sm text-gray-600">Support with Student loan</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">
                                &quot;I needed support to secure admission in a top university in the US and fund my studies. With the help of Sojilearn, I was able to get admission into Northeastern Univeristy, Khoury School of Sciences, Boston USA and accessed over $72,000 to cover tuition and living expenses.&quot;
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 theme-bg rounded-full flex items-center justify-center text-white font-bold">
                                L
                                </div>
                                <div className="ml-4">
                                <h4 className="font-semibold text-gray-900">Leonard A. (MSc. International Relations), UK</h4>
                                <p className="text-sm text-gray-600">Registered in Coventry University for September 2025</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">
                                &quot;I was having difficulties drafting statement of purpose, but Sojilearn assisted me with everything as well as drafting a professional resume based on my background.&quot;
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 theme-bg rounded-full flex items-center justify-center text-white font-bold">
                                C
                                </div>
                                <div className="ml-4">
                                <h4 className="font-semibold text-gray-900">Comfort O. (MRes), UK</h4>
                                <p className="text-sm text-gray-600">Expert support for application</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">
                                &quot;I needed an MRes course to travel with my fiancé, thankfully I came across Sojilearn and got admission into MRes Operations Management at University of Gloucesteshire.&quot;
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 theme-bg rounded-full flex items-center justify-center text-white font-bold">
                                B
                                </div>
                                <div className="ml-4">
                                <h4 className="font-semibold text-gray-900">Becky T. (MSc. Oil & Gas Engineering), UK</h4>
                                <p className="text-sm text-gray-600">Now rounding up Masters degree at Coventry University</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">
                                &quot;The process was so smooth. No stress, no confusion. Sojilearn handled everything professionally, and provided accommodation support before I arrived UK.&quot;
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 theme-bg rounded-full flex items-center justify-center text-white font-bold">
                                C
                                </div>
                                <div className="ml-4">
                                <h4 className="font-semibold text-gray-900">Ekpo O. (MSc Organizational Health Safety), UK</h4>
                                <p className="text-sm text-gray-600">Preparing for study in January 2026.</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">
                                &quot;I needed an agency that could help me process admission, as well provide tailored guidance each step of the application process. Sojilearn came through for me, and helped me secure student loan to cover tuition and living expenses.&quot;
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 theme-bg rounded-full flex items-center justify-center text-white font-bold">
                                I
                                </div>
                                <div className="ml-4">
                                <h4 className="font-semibold text-gray-900">Igbanam Y. (MSc. Public Health), UK</h4>
                                <p className="text-sm text-gray-600">Preparing for study in January 2026</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">
                                &quot;I completed my UG in Benin Replublic. With Sojilearn&apos;s expert guidance, I was able to secure a place in a Top UK university.&quot;
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 theme-bg rounded-full flex items-center justify-center text-white font-bold">
                                T
                                </div>
                                <div className="ml-4">
                                <h4 className="font-semibold text-gray-900">Oluremi G. (MSc. Data Science), UK</h4>
                                <p className="text-sm text-gray-600">My expectations were exceeded</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">
                                &quot;I reached out to Sojilearn, to help secure admission in the UK. I was able to secure offers from University of Roehampton, University of Aberdeen. I also got access to funds to cover tuition and living expenses.&quot;
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <div ref={formRef} className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-2">
                <h2 className="text-3xl font-bold text-gray-900">
                    Ready to Start Your Journey?
                </h2>
                <p className="text-lg text-gray-600">
                    Fill out this quick form and get personalized guidance within 24 hours
                </p>
            </div>
            <MultiStepForm />
        </div>
    </div>
    );
}