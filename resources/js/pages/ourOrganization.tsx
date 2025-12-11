import React from "react";
import { Head } from '@inertiajs/react';
import PublicHeader from '@/components/public-header';
import Footer from '@/components/footer';

const OurOrganization: React.FC = () => {
  return (
    <>
      <Head title="Our Organization" />
      <PublicHeader />
      <div className="w-full bg-white font-primary">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-green-700 to-green-300 text-white pt-4 pb-2">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Organization</h1>
        </div>
      </div>


      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* INTRODUCTION */}
        <section>
          <h2 className="text-3xl font-heading font-semibold text-primary mb-4">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            Youth Initiative is a dynamic community-driven organization dedicated
            to empowering young individuals, fostering leadership, and creating
            meaningful opportunities for personal and professional growth. We
            work across multiple dimensions of youth development—education,
            empowerment, innovation, and community engagement—to ensure that
            young people receive the tools and support they need to build a
            better future.
          </p>
        </section>

        {/* VISION */}
        <section>
          <h2 className="text-3xl font-heading font-semibold text-primary mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            To cultivate a generation of empowered, inspired, and socially
            responsible youth who are capable of leading transformative change
            in their communities and beyond.
          </p>
        </section>

        {/* MISSION */}
        <section>
          <h2 className="text-3xl font-heading font-semibold text-primary mb-4">
            Our Mission
          </h2>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-2">
            <li>Promote youth leadership through capacity-building programs.</li>
            <li>Encourage creativity, innovation, and critical thinking.</li>
            <li>Engage young people in community development initiatives.</li>
            <li>Provide access to mentorship, training, and learning platforms.</li>
            <li>Support youth in creating sustainable and impactful solutions.</li>
          </ul>
        </section>

        {/* OBJECTIVES */}
        <section>
          <h2 className="text-3xl font-heading font-semibold text-primary mb-4">
            Our Objectives
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Youth Development
              </h3>
              <p className="text-gray-700 text-sm">
                Provide educational resources, skill development workshops, and
                leadership training.
              </p>
            </div>

            <div className="p-4 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Community Engagement
              </h3>
              <p className="text-gray-700 text-sm">
                Bring young people together to collaborate on impactful
                community-driven projects.
              </p>
            </div>

            <div className="p-4 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Innovation & Creativity
              </h3>
              <p className="text-gray-700 text-sm">
                Encourage innovative thinking and provide platforms for idea
                incubation.
              </p>
            </div>

            <div className="p-4 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Networking & Mentorship
              </h3>
              <p className="text-gray-700 text-sm">
                Connect youth with professionals, leaders, and mentors across
                multiple domains.
              </p>
            </div>
          </div>
        </section>

        {/* MANAGEMENT / STRUCTURE */}
        <section>
          <h2 className="text-3xl font-heading font-semibold text-primary mb-4">
            Organizational Structure
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            Our organization operates through a collaborative structure,
            ensuring smooth execution of programs and effective communication
            across teams.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-4 shadow rounded-xl">
              <h3 className="text-xl font-bold">Board Members</h3>
              <p className="text-gray-600 text-sm mt-2">
                Lead strategic planning and governance.
              </p>
            </div>

            <div className="text-center p-4 shadow rounded-xl">
              <h3 className="text-xl font-bold">Executive Team</h3>
              <p className="text-gray-600 text-sm mt-2">
                Execute programs, partnerships, and stakeholder engagement.
              </p>
            </div>

            <div className="text-center p-4 shadow rounded-xl">
              <h3 className="text-xl font-bold">Volunteers</h3>
              <p className="text-gray-600 text-sm mt-2">
                Support activities, outreach, and community events.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default OurOrganization;
