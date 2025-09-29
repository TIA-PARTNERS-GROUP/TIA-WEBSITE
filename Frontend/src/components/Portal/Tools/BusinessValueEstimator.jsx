import { useNavigate } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { getCurrentBusinessInfo, updateCurrentBusinessProfile } from "../../../api/business";

const currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 2,
});

// Tooltip Component
function Tooltip({ content, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPosition({
      top: rect.top + window.scrollY + rect.height / 2,
      left: rect.right + 12 + window.scrollX, // 12px gap from icon
    });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (isVisible) {
      setIsVisible(false);
    } else {
      const rect = e.target.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY + rect.height / 2,
        left: rect.right + 12 + window.scrollX,
      });
      setIsVisible(true);
    }
  };

  return (
    <div className="relative inline-block align-middle">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="cursor-pointer select-none"
        tabIndex={0}
        aria-label="Show info"
        style={{ position: 'relative' }}
      >
        {children}
        {isVisible && (
          
          <div
            className="absolute z-50 px-4 py-3 text-base font-semibold text-white bg-gray-900 rounded-lg shadow-2xl max-w-sm border border-gray-700"
            style={{
              top: '50%',
              left: 'calc(100% + 12px)',
              transform: 'translateY(-50%)',
              minWidth: '220px',
              opacity: 1,
              transition: 'none',
              whiteSpace: 'pre-line',
            }}
          >
            <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-gray-900" />
            {content}
          </div>
        )}
      </div>
    </div>
  );
}

function NumberInput({ label, value, onChange, min = 0, tooltip }) {
  const [inputValue, setInputValue] = useState(value === 0 ? "" : value.toString());

  // Keep inputValue in sync with value prop
  React.useEffect(() => {
    if (value === 0) {
      setInputValue("");
    } else if (!isNaN(value) && value !== Number(inputValue)) {
      setInputValue(value.toString());
    }
    // eslint-disable-next-line
  }, [value]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    // Allow empty string
    setInputValue(val);
    // Only update parent if valid number
    if (val === "") {
      onChange(0);
    } else if (/^-?\d*\.?\d*$/.test(val)) {
      const num = Number(val);
      if (!isNaN(num)) {
        onChange(num);
      }
    }
  };

  return (
    <label className="block mb-4">
      <div className="flex items-center justify-between font-medium">
        <span>{label}</span>
        {tooltip && (
          <Tooltip content={tooltip}>
            <BsInfoCircleFill className="text-gray-400 text-lg ml-2 cursor-pointer" />
          </Tooltip>
        )}
      </div>
      <input
        type="text"
        inputMode="decimal"
        value={inputValue}
        onChange={handleInputChange}
        min={min}
        className="mt-1 w-full rounded-lg border px-3 py-2"
        autoComplete="off"
      />
    </label>
  );
}

function Progress({ step, total }) {
  const pct = Math.round((step / total) * 100);
  const labels = ["Overview", "Calculator", "Get Result"];
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-sm mb-2">
        <div className="font-semibold">{labels[step - 1]}</div>
        <div>{pct}%</div>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-blue-600 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 text-center text-xs text-gray-500">
        {step}/{total}
      </div>
    </div>
  );
}

const BusinessValueEstimator = () => {

  const navigate = useNavigate();

  // Step state: 1 = overview, 2 = calculator, 3 = result
  const [step, setStep] = useState(1);

  // Form state
  const [avgProfit3y, setAvgProfit3y] = useState(0);
  const [ownerSalary, setOwnerSalary] = useState(0);
  const [ownerTravel, setOwnerTravel] = useState(0);
  const [ownerBenefits, setOwnerBenefits] = useState(0);
  const [sdeMultiplier, setSdeMultiplier] = useState(0);
  const [assets, setAssets] = useState(0);
  const [liabilities, setLiabilities] = useState(0);

  // Contact
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Show summary after submit
  const [showSummary, setShowSummary] = useState(false);

  // Reset all fields to initial state
  function restartEstimator() {
    setStep(1);
    setAvgProfit3y(0);
    setOwnerSalary(0);
    setOwnerTravel(0);
    setOwnerBenefits(0);
    setSdeMultiplier(0);
    setAssets(0);
    setLiabilities(0);
    setFullName("");
    setEmail("");
    setShowSummary(false);
  }

  // Derived values (mirror CF7 formula logic)
  const totalAddBacks = useMemo(
    () => ownerSalary + ownerTravel + ownerBenefits,
    [ownerSalary, ownerTravel, ownerBenefits]
  );

  const currentValueBeforeAssets = useMemo(
    () => (avgProfit3y + totalAddBacks) * sdeMultiplier,
    [avgProfit3y, totalAddBacks, sdeMultiplier]
  );

  const totalBusinessValue = useMemo(
    () => currentValueBeforeAssets + assets - liabilities,
    [currentValueBeforeAssets, assets, liabilities]
  );

  function next() {
    setStep((s) => Math.min(3, s + 1));
  }
  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  const handleSummary = async () => {
    const businessDetails = await getCurrentBusinessInfo();

    await updateCurrentBusinessProfile(businessDetails.data.businessName, businessDetails.data.contactName, businessDetails.data.contactPhone, businessDetails.data.contactEmail, businessDetails.data.businessDescription, businessDetails.data.businessCategoryId, totalBusinessValue);
    setShowSummary(true);
  }

  return (
    <div>
      <div className="sticky z-20">
          <button 
              onClick={() => (navigate('/build'))}
              className="absolute top-4 right-4 hover:font-medium pr-8"
              aria-label="Go back"
          >
              ← Back
          </button>
      </div>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Progress step={step} total={3} />

        {step === 1 && (
          <section className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-blue-700">Business Value Estimator</h1>
              <p className="mb-3 text-gray-700">
                Many owners consider future exit value and saleability. The best time
                to plan is before starting; the next best time is now. Decide on a
                target exit value, understand today's value, and work to close the gap.
              </p>
              <p className="text-gray-600">
                This tool gives a quick estimate (not a formal valuation). With
                current financials handy, it should take ~10 minutes. Re-run every
                6-12 months to track progress.
              </p>
              <div className="mt-6 flex gap-3">
                <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition" onClick={next}>
                  Start
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                alt="Calculator"
                src="https://tools.tiapartners.com.au/wp-content/uploads/2022/06/bve-new-calc-scaled.jpg"
                className="rounded-2xl shadow max-h-72 object-cover border border-blue-100"
              />
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <div className="bg-white rounded-2xl shadow-lg p-0 mb-8 border border-gray-100">
              <div className="bg-blue-50 rounded-t-2xl px-6 py-3 border-b border-blue-100">
                <h2 className="text-blue-700 font-bold text-lg tracking-wide">Business Value Calculator</h2>
              </div>
              <div className="p-6">
                <NumberInput
                  label="Average Net Profit (3 Yr)"
                  value={avgProfit3y}
                  onChange={setAvgProfit3y}
                  tooltip="The Net Profit figure will come from your accounting system and ideally should be the average of the last three years of trading."
                />

                <div className="mt-6 mb-2">
                  <div className="w-full flex flex-col">
                    <div className="flex justify-end w-full mb-1">
                      <Tooltip content={
                        "When a business owner is planning to exit a business, there are various benefits that he or she may be getting from the business. Since the owner is leaving, these benefits will go back into the business to increase the profitability. These are called 'Add Backs'."
                      }>
                        <BsInfoCircleFill className="text-gray-400 text-lg cursor-pointer" />
                      </Tooltip>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 flex items-center border border-blue-100 w-full">
                      <span className="font-bold text-blue-700 uppercase text-sm tracking-wide">Add backs</span>
                    </div>
                  </div>
                </div>

                <NumberInput
                  label="Owner's Salary / Drawings"
                  value={ownerSalary}
                  onChange={setOwnerSalary}
                  tooltip="If the owner is drawing a salary, but not working full time in the business, a portion of that salary would be considered an add back. The best way to calculate this, is to estimate the number of hours a week the owner is working in the business, subtract it from 35 and divide the result by 35 (for working hours) and multiply it by the owners drawings."
                />
                <NumberInput
                  label="Owner's Travel"
                  value={ownerTravel}
                  onChange={setOwnerTravel}
                  tooltip="If the owner is having non-business related travel reimbursements."
                />
                <NumberInput
                  label="Other Owner Benefits"
                  value={ownerBenefits}
                  onChange={setOwnerBenefits}
                  tooltip="Are there any other costs or benefits that the company is paying for the owner that would not be there if the owner left the business?"
                />

                <div className="mt-6 p-4 rounded-xl bg-blue-50 flex justify-between items-center">
                  <span className="font-semibold text-blue-700">Total Add Backs</span>
                  <span className="text-xl font-bold text-blue-700">{currency.format(totalAddBacks)}</span>
                </div>

                <div className="my-8 border-t border-gray-100" />

                <NumberInput
                  label="SDE Multiplier"
                  value={sdeMultiplier}
                  onChange={setSdeMultiplier}
                  tooltip="Seller's Discretionary Earnings (SDE) multiple appropriate for your business and industry."
                />
                
                <div className="mt-6 p-4 rounded-xl bg-blue-50 flex justify-between items-center">
                  <span className="font-bold text-blue-700">Current Value before Assets</span>
                  <span className="text-xl font-bold text-blue-700">{currency.format(currentValueBeforeAssets)}</span>
                </div>

                <div className="my-8 border-t border-gray-100" />

                <NumberInput
                  label="Current Business Assets"
                  value={assets}
                  onChange={setAssets}
                  tooltip="This information comes straight from your Balance Sheet."
                />
                <NumberInput
                  label="Current Business Liabilities"
                  value={liabilities}
                  onChange={setLiabilities}
                  tooltip="This information comes straight from your Balance Sheet."
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button className="px-6 py-2 rounded-full border border-blue-200 bg-white text-blue-700 font-semibold shadow hover:bg-blue-50 transition" onClick={back}>
                ← Back
              </button>
              <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition" onClick={next}>
                Next →
              </button>
            </div>
          </section>
        )}

        {step === 3 && !showSummary && (
          <section>
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-6 text-center">
              <h2 className="text-2xl font-semibold mb-2">Business Value Estimator</h2>
              <img
                alt="By Dycom Group"
                src="https://tools.tiapartners.com.au/wp-content/uploads/2022/06/by-dycom-group.png"
                className="h-10 mx-auto mb-3"
              />
              <p className="text-blue-700">
                Enter your name and email to save a copy of your estimate.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 bg-white rounded-2xl shadow p-6">
              <label className="block">
                <span className="font-medium">Name</span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Insert name"
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </label>
              <label className="block">
                <span className="font-medium">Email Address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Insert email address"
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </label>

              <div className="md:col-span-2 flex items-center justify-between mt-2">
                <button className="px-4 py-2 rounded-lg border" onClick={back}>
                  Back
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                  onClick={() => {
                    handleSummary()
                  }}
                >
                  Save / Email Estimate
                </button>
              </div>
            </div>
          </section>
        )}

        {showSummary && (
          <section className="flex flex-col items-center justify-center min-h-[300px] py-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Total Business Value Estimate</h2>
            <div className="bg-blue-600 text-white text-3xl font-bold rounded-full px-10 py-4 mb-6 shadow-lg">
              {currency.format(totalBusinessValue)}
            </div>
            <button
              className="mt-2 px-6 py-2 rounded-full bg-gray-100 text-blue-700 font-semibold shadow hover:bg-blue-50 transition"
              onClick={restartEstimator}
            >
              Restart
            </button>
          </section>
        )}
      </main>
    </div>
  );
};

export default BusinessValueEstimator;
