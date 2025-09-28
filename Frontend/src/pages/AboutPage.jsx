import HeaderComponent from "../components/Header/Header";
import FooterComponent from "../components/Footer/Footer";
import PrimaryButton from "../components/Button/PrimaryButton";

const AboutPage = () => {
  return (
    <div className="relative overflow-hidden">

      {/* Founder Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Founder text */}
          <div>
            <h4 className="text-xl font-semibold mb-4">
              A WORD FROM THE FOUNDER, MARK STECHER
            </h4>
            <p className="mb-6">
              I have been in business for more than 30 years and over that time,
              I have made more mistakes than I care to remember. Luckily, I see
              these mistakes as learning experiences that make me stronger...
            </p>

            <h4 className="text-xl font-semibold mb-4">My Partnership Journey</h4>
            <p>
              When I started my first business, it was just me, however within a
              few years I started getting more staff and eventually ended up
              with a team of around 25...
            </p>
          </div>

          {/* Founder image */}
          <div className="flex justify-center">
            <img
              src="https://tiapartners.com.au/assets/images/mark-pic.png"
              alt="Founder Mark Stecher"
              className="rounded-lg shadow-md max-w-sm"
            />
          </div>
        </div>
      </section>

      {/* Journey & TIA Evolution */}
      <section className="container mx-auto px-4 py-12">
        <div className="space-y-6">
          <p>
            Very quickly I realised that this was a great model. I could do work
            anywhere in the state without having to send staff long distances...
          </p>
          <p>
            As a result of this success, I started visualising an organisation
            that was specifically dedicated to bringing other businesses like
            mine together...
          </p>

          <h4 className="text-xl font-semibold">Technology Integrators Australia</h4>
          <p>
            In 2018, I started formulating the organisation that is now known as
            Technology Integrators Australia or TIA...
          </p>
          <p>
            Then COVID came along and put a huge spanner in the works… We had
            already started working on an online version...
          </p>

          {/* 3 Key Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="p-6 border rounded-lg shadow-sm">
              <img
                src="https://tiapartners.com.au/assets/images/icon1.svg"
                alt="Intuitive Icon"
                className="mb-4 w-12"
              />
              <h5 className="font-semibold mb-2">Intuitive and Easy to Use</h5>
              <p>
                Making the portal intuitive has been a significant challenge and
                as it evolves it will be a continual development.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm">
              <img
                src="https://tiapartners.com.au/assets/images/icon2.svg"
                alt="Engaging Icon"
                className="mb-4 w-12"
              />
              <h5 className="font-semibold mb-2">Engaging, Interactive & Entertaining</h5>
              <p>
                We wanted to create something people would come back to, excited
                to see what updates were happening...
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm">
              <img
                src="https://tiapartners.com.au/assets/images/icon3.svg"
                alt="Useful Icon"
                className="mb-4 w-12"
              />
              <h5 className="font-semibold mb-2">Useful and Valuable</h5>
              <p>
                The TIA SmartGrow system will guide the user into areas that
                will help with their specific challenges.
              </p>
            </div>
          </div>

          <p className="mt-8">
            The Minimum Viable Product (MVP) of TIA is scheduled for launch in
            Q2 of 2023... future releases will roll in enhancements suggested by
            members.
          </p>
          <p className="font-semibold mt-6">
            Mark Stecher <br />
            Founder, TIA
          </p>
        </div>
      </section>

      
    </div>
  );
};

export default AboutPage;
