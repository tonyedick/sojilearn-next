import { GraduationCap, Clock, Shield, CheckCircle } from 'lucide-react';
import '../Components/ExternalCSS/main.css';

export default function WhySoji() {
  return (
    <div className="gray tw-py-16">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
        <div className="tw-text-center tw-mb-12">
          <h2 className="tw-text-3xl tw-font-bold tw-text-gray-900 tw-mb-4">
            Why Choose Sojilearn?
          </h2>
          <p className="tw-text-lg tw-text-gray-600">
            We make studying abroad faster, simpler, and stress-free
          </p>
        </div>

        <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-8">
          <div className="tw-bg-white tw-rounded-2xl tw-p-6 tw-text-center tw-shadow-lg">
            <div className="tw-bg-blue-100 tw-w-16 tw-h-16 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4">
              <Clock className="tw-w-8 tw-h-8 tw-text-blue-600" />
            </div>
            <h3 className="tw-text-xl tw-font-bold tw-text-gray-900 tw-mb-2">
              Super Fast
            </h3>
            <p className="tw-text-gray-600">
              Get results in weeks, not months. Our streamlined process cuts through the red tape.
            </p>
          </div>

          <div className="tw-bg-white tw-rounded-2xl tw-p-6 tw-text-center tw-shadow-lg">
            <div className="tw-bg-green-100 tw-w-16 tw-h-16 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4">
              <Shield className="tw-w-8 tw-h-8 tw-text-green-600" />
            </div>
            <h3 className="tw-text-xl tw-font-bold tw-text-gray-900 tw-mb-2">
              Stress-Free
            </h3>
            <p className="tw-text-gray-600">
              No confusing paperwork or endless back-and-forth. We handle the complexity for you.
            </p>
          </div>

          <div className="tw-bg-white tw-rounded-2xl tw-p-6 tw-text-center tw-shadow-lg">
            <div className="tw-bg-purple-100 tw-w-16 tw-h-16 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4">
              <GraduationCap className="tw-w-8 tw-h-8 tw-text-purple-600" />
            </div>
            <h3 className="tw-text-xl tw-font-bold tw-text-gray-900 tw-mb-2">
              Expert Guidance
            </h3>
            <p className="tw-text-gray-600">
              Our experienced counselors know exactly what UK universities want.
            </p>
          </div>

          <div className="tw-bg-white tw-rounded-2xl tw-p-6 tw-text-center tw-shadow-lg">
            <div className="tw-bg-orange-100 tw-w-16 tw-h-16 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4">
              <CheckCircle className="tw-w-8 tw-h-8 tw-text-orange-600" />
            </div>
            <h3 className="tw-text-xl tw-font-bold tw-text-gray-900 tw-mb-2">
              Proven Results
            </h3>
            <p className="tw-text-gray-600">
              98% success rate with students now studying at top UK universities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}