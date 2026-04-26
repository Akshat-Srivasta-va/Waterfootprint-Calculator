// ...existing code...
import React from 'react';
import { Droplet, Users, BookOpen, Globe } from 'lucide-react';
import image from '../images/6g0x_n5a2_221222.jpg';
import image1 from '../images/i1.png';
import image2 from '../images/i2.png';
import image3 from '../images/i3.png';
import { Link } from 'react-router-dom';

const FeatureCard = ({ Icon, title, children, bg = 'bg-white' }) => (
  <div className={`flex flex-col items-center text-center p-4 rounded-xl shadow-sm ${bg}`}>
    <div className="p-3 rounded-full bg-teal-50 text-teal-600 mb-3">
      <Icon className="w-6 h-6" />
    </div>
    <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
    <p className="text-sm text-gray-500 mt-2">{children}</p>
  </div>
);

const About = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <section className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
              <Droplet className="w-4 h-4" /> Water Footprint
            </span>

            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              We measure water. We protect life.
            </h1>

            <p className="mt-4 text-gray-600 max-w-2xl">
              We help people and communities understand their freshwater use and provide practical, science-backed
              steps to reduce water waste. Every drop saved improves resilience for people and nature.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/form" className="inline-block">
                <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium shadow">
                  Calculate My Footprint
                </button>
              </Link>
              <Link to="/donate" className="text-teal-700 hover:underline self-center text-sm">
                Support our work →
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">Our Mission</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Raise awareness and empower action to reduce water consumption, for households and communities.
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">Our Vision</h3>
                <p className="mt-2 text-sm text-gray-600">
                  A future where freshwater is used responsibly, ensuring availability for generations to come.
                </p>
              </div>
            </div>
          </div>

          <div className="order-first lg:order-last h-full">
            <div className="rounded-2xl overflow-hidden shadow-lg h-full">
              <img
                src={image}
                alt="Water conservation illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard Icon={Users} title="Community Programs">
            We run local initiatives and workshops to build water-smart communities.
          </FeatureCard>

          <FeatureCard Icon={BookOpen} title="Educational Resources" bg="bg-white">
            Free guides, articles and tools to help households reduce their water footprint.
          </FeatureCard>

          <FeatureCard Icon={Globe} title="Conservation Projects" bg="bg-white">
            Partnering on projects that restore ecosystems and improve water access.
          </FeatureCard>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What we do</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <h4 className="font-medium text-gray-800">Measure</h4>
              <p className="text-sm text-gray-600 mt-2">Simple tools to estimate water use across daily activities.</p>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-sm">
              <h4 className="font-medium text-gray-800">Advise</h4>
              <p className="text-sm text-gray-600 mt-2">Personalized recommendations to reduce consumption with minimal effort.</p>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-sm">
              <h4 className="font-medium text-gray-800">Support</h4>
              <p className="text-sm text-gray-600 mt-2">Fund and scale community projects that deliver measurable impact.</p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gallery</h2>
          <div className="flex flex-wrap gap-4 items-center">
            {[image1, image2, image3].map((src, i) => (
              <div key={i} className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-md">
                <img src={src} alt={`gallery-${i}`} className="w-full h-full object-cover" />
              </div>
            ))}

            <div className="flex-1 min-w-[220px] p-4 rounded-xl bg-teal-50">
              <h4 className="font-semibold text-teal-700">Join us</h4>
              <p className="text-sm text-gray-600 mt-2">Volunteer, partner or donate to help scale our work.</p>
              <div className="mt-3">
                <Link to="/contact" className="text-sm text-teal-700 hover:underline">Contact team →</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
