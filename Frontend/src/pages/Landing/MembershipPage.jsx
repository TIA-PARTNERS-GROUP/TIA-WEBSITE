import HeaderComponent from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";
import PrimaryButton from "../../components/Button/PrimaryButton";

const MembershipPlansPage = () => {
  return (
    <div className="relative overflow-hidden">

      {/* Section Heading */}
      <section className="py-12 text-center">
        <h3 className="text-3xl font-bold">TIA Program and Pricing</h3>
      </section>

      {/* Membership Plans */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white border rounded-lg shadow-lg p-6 flex flex-col justify-between h-full">
            <h4 className="text-2xl font-semibold text-center">Free</h4>
            <p className="text-center text-gray-500">$0 /mo</p>
            <ul className="mt-6 space-y-4">
              <li>6 Month Full Membership</li>
              <li>Business Connection Tool</li>
              <li>TIA LinkedIn Group Member</li>
              <li>TIA Facebook Group Membership</li>
              <li>FREE Invitation to One LAN Partner Meeting</li>
              <li>Landing Page on TIA Main Portal</li>
              <li>Blog Posts / News Articles</li>
              <li>Access to Local Members</li>
            </ul>
            <div className="mt-6 text-center">
              <PrimaryButton>
                <a className="inline-block text-white rounded-lg">
                  Sign Up
                </a>
              </PrimaryButton>
            </div>
          </div>

          {/* Connect Plan */}
          <div className="bg-white border rounded-lg shadow-lg p-6 flex flex-col justify-between h-full">
            <h4 className="text-2xl font-semibold text-center">Connect</h4>
            <p className="text-center text-gray-500">$50 /mo</p>
            <ul className="mt-6 space-y-4">
              <li>All Free Features Plus</li>
              <li>Access to Local Job Posts</li>
              <li>Access to NETWORK Module</li>
              <li>Monthly Partner Training</li>
              <li>Monthly Technology Updates</li>
              <li>Monthly Guest Speakers</li>
            </ul>
            <div className="mt-6 text-center">
              <PrimaryButton>
                <a className="inline-block text-white rounded-lg">
                  Sign Up
                </a>
              </PrimaryButton>
            </div>
          </div>

          {/* Collaborate Plan */}
          <div className="bg-white border rounded-lg shadow-lg p-6 flex flex-col justify-between h-full">
            <h4 className="text-2xl font-semibold text-center">Collaborate</h4>
            <p className="text-center text-gray-500">$150 /mo</p>
            <ul className="mt-6 space-y-4">
              <li>Free and Connect Features Plus</li>
              <li>Meeting Coordination</li>
              <li>Full Access to the BUILD Module</li>
              <li>Full Access to the TRADE Module</li>
              <li>Full Dashboard Access</li>
            </ul>
            <div className="mt-6 text-center">
              <PrimaryButton>
                <a className="inline-block text-white rounded-lg">
                  Sign Up
                </a>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembershipPlansPage;
