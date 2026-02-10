import { GraduationCap, Clock, Shield, CheckCircle } from 'lucide-react';
import '../Components/ExternalCSS/main.css';

export default function WhySoji() {
  return (
    <div className="gray py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Sojilearn?
          </h2>
          <p className="text-lg text-gray-600">
            We make studying abroad faster, simpler, and stress-free
          </p>
        </div>

        <div className="  grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Super Fast
            </h3>
            <p className="text-gray-600">
              Get results in weeks, not months. Our streamlined process cuts through the red tape.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Stress-Free
            </h3>
            <p className="text-gray-600">
              No confusing paperwork or endless back-and-forth. We handle the complexity for you.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Expert Guidance
            </h3>
            <p className="text-gray-600">
              Our experienced counselors know exactly what UK universities want.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Proven Results
            </h3>
            <p className="text-gray-600">
              98% success rate with students now studying at top UK universities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}