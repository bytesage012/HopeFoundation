import React, { useState, useEffect, useRef } from "react";

// Mock data for the campaign
const CAMPAIGN_DATA = {
  title: "Save the Children Emergency Fund",
  subtitle:
    "Providing life-saving assistance to children in crisis situations worldwide",
  story: {
    content:
      "Every day, children in crisis zones face unimaginable challenges. From natural disasters to conflict zones, our emergency response teams work tirelessly to provide shelter, nutrition, and protection to the most vulnerable. Your donation today can mean the difference between hope and despair for a child in need.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  impactMetrics: [
    { icon: "Heart", value: 12500, label: "Children Helped", suffix: "+" },
    { icon: "Home", value: 240, label: "Communities Served", suffix: "+" },
    { icon: "Utensils", value: 85000, label: "Meals Provided", suffix: "+" },
    { icon: "Stethoscope", value: 3200, label: "Medical Kits", suffix: "+" },
  ],
  donationTiers: [
    {
      amount: 25,
      description: "Provides emergency food for a child for one week",
    },
    {
      amount: 50,
      description: "Supplies clean water and sanitation for a family",
    },
    {
      amount: 100,
      description: "Delivers essential medical supplies and care",
    },
    {
      amount: 250,
      description: "Funds emergency shelter and protection services",
    },
  ],
  progress: {
    current: 125000,
    goal: 250000,
  },
  gallery: [
    {
      image:
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      caption: "Medical care delivery in refugee camps",
    },
    {
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      caption: "Education programs for displaced children",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      caption: "Clean water initiatives in rural areas",
    },
  ],
  testimonials: [
    {
      name: "Sarah Johnson",
      role: "Volunteer",
      content:
        "Seeing the direct impact of donations on children's lives has been the most rewarding experience of my life.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Dr. Michael Chen",
      role: "Field Medic",
      content:
        "The supplies funded by donors have saved countless lives in emergency situations.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Maria Rodriguez",
      role: "Community Leader",
      content:
        "This foundation brought hope to our village when we had nowhere else to turn.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ],
  programs: [
    {
      title: "Emergency Response",
      description: "Rapid deployment of aid in crisis situations",
      icon: "🚑",
    },
    {
      title: "Education Access",
      description: "Ensuring children continue learning in emergencies",
      icon: "📚",
    },
    {
      title: "Healthcare",
      description: "Medical care and nutrition for vulnerable children",
      icon: "❤️",
    },
    {
      title: "Protection",
      description: "Safe spaces and psychological support",
      icon: "🛡️",
    },
  ],
};

const App = () => {
  const [donationAmount, setDonationAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isSidebarSticky, setIsSidebarSticky] = useState(false);
  const [animatedMetrics, setAnimatedMetrics] = useState(
    CAMPAIGN_DATA.impactMetrics.map(() => 0),
  );
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    paymentMethod: "card",
  });
  const metricsRef = useRef(null);

  // Intersection Observer for metric animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            CAMPAIGN_DATA.impactMetrics.forEach((metric, index) => {
              let start = 0;
              const end = metric.value;
              const duration = 2000;
              const increment = end / (duration / 16);

              const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                  setAnimatedMetrics((prev) => {
                    const newMetrics = [...prev];
                    newMetrics[index] = end;
                    return newMetrics;
                  });
                  clearInterval(timer);
                } else {
                  setAnimatedMetrics((prev) => {
                    const newMetrics = [...prev];
                    newMetrics[index] = Math.floor(start);
                    return newMetrics;
                  });
                }
              }, 16);
            });
          }
        });
      },
      { threshold: 0.5 },
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll handler for sticky sidebar
  useEffect(() => {
    const handleScroll = () => {
      setIsSidebarSticky(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    const amount = customAmount ? parseInt(customAmount) : donationAmount;
    setShowDonationModal(true);
  };

  const handleFinalDonation = (e) => {
    e.preventDefault();
    const amount = customAmount ? parseInt(customAmount) : donationAmount;
    alert(
      `Thank you ${donorInfo.name} for your generous donation of $${amount}! A confirmation has been sent to ${donorInfo.email}.`,
    );
    setShowDonationModal(false);
    setDonorInfo({ name: "", email: "", paymentMethod: "card" });
    setCustomAmount("");
  };

  const progressPercentage =
    (CAMPAIGN_DATA.progress.current / CAMPAIGN_DATA.progress.goal) * 100;

  // Donation Modal Component
  const DonationModal = () => {
    if (!showDonationModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 font-playfair">
                Complete Your Donation
              </h3>
              <button
                onClick={() => setShowDonationModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleFinalDonation}>
              {/* Donation Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#DC2626] mb-2">
                    ${customAmount || donationAmount}
                  </div>
                  <div className="text-gray-600">One-time donation</div>
                </div>
              </div>

              {/* Donor Information */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={donorInfo.name}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 transition-all duration-350"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={donorInfo.email}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 transition-all duration-350"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["card", "paypal"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() =>
                        setDonorInfo({ ...donorInfo, paymentMethod: method })
                      }
                      className={`p-3 rounded-xl border-2 text-center transition-all duration-350 ${
                        donorInfo.paymentMethod === method
                          ? "border-[#DC2626] bg-red-50 text-[#DC2626] font-semibold"
                          : "border-gray-200 text-gray-600 hover:border-[#EA580C]"
                      }`}
                    >
                      {method === "card" ? "💳 Credit Card" : "📱 PayPal"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-[#059669] text-white rounded-xl p-4 text-center mb-6">
                <div className="font-semibold">
                  🔒 Secure & Encrypted Payment
                </div>
                <div className="text-sm opacity-90">
                  Your donation is protected by bank-level security
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-350"
              >
                Donate ${customAmount || donationAmount} Now
              </button>

              <p className="text-center text-gray-500 text-xs mt-4">
                By donating, you agree to our terms of service and privacy
                policy
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FEF7ED]">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-350 ${isSidebarSticky ? "bg-white shadow-lg" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">HopeFoundation</div>
          <button
            onClick={() => setShowDonationModal(true)}
            className="bg-[#DC2626] hover:bg-[#b91c1c] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-350 transform hover:scale-105 shadow-lg"
          >
            Donate Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${CAMPAIGN_DATA.story.image})` }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 font-playfair">
              {CAMPAIGN_DATA.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-source-sans">
              {CAMPAIGN_DATA.subtitle}
            </p>

            {/* Progress Bar */}
            <div className="bg-white rounded-xl p-6 shadow-xl mb-8">
              <div className="mb-4">
                <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                  <span>
                    Raised: ${CAMPAIGN_DATA.progress.current.toLocaleString()}
                  </span>
                  <span>
                    Goal: ${CAMPAIGN_DATA.progress.goal.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-[#DC2626] to-[#EA580C] h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              <div className="text-[#059669] font-semibold">
                {progressPercentage.toFixed(1)}% towards our goal!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Story Content */}
          <div className="lg:w-2/3">
            {/* Impact Metrics */}
            <section
              ref={metricsRef}
              className="bg-white rounded-2xl p-8 shadow-xl mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 font-playfair text-center">
                Our Impact So Far
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {CAMPAIGN_DATA.impactMetrics.map((metric, index) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-[#DC2626] mb-2">
                      {animatedMetrics[index].toLocaleString()}
                      {metric.suffix}
                    </div>
                    <div className="text-gray-600 font-semibold">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Programs Section */}
            <section className="bg-white rounded-2xl p-8 shadow-xl mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 font-playfair text-center">
                Our Programs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CAMPAIGN_DATA.programs.map((program, index) => (
                  <div
                    key={program.title}
                    className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-all duration-350"
                  >
                    <div className="text-4xl mb-4">{program.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {program.title}
                    </h3>
                    <p className="text-gray-600">{program.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Story Section */}
            <section className="bg-white rounded-2xl p-8 shadow-xl mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-playfair">
                The Story Behind Our Mission
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 font-source-sans">
                <p className="text-xl leading-relaxed mb-6">
                  {CAMPAIGN_DATA.story.content}
                </p>
                <div className="bg-gradient-to-r from-[#DC2626] to-[#EA580C] h-1 w-24 my-8 rounded-full"></div>
                <p className="text-xl leading-relaxed">
                  With your support, we can continue this vital work and reach
                  even more children in desperate need. Every contribution, no
                  matter the size, creates ripples of positive change that can
                  transform lives forever.
                </p>
              </div>
            </section>

            {/* Gallery Section */}
            <section className="bg-white rounded-2xl p-8 shadow-xl mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 font-playfair text-center">
                Making a Difference
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CAMPAIGN_DATA.gallery.map((item, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl mb-3">
                      <img
                        src={item.image}
                        alt={item.caption}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-350"></div>
                    </div>
                    <p className="text-gray-700 text-center font-semibold">
                      {item.caption}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 font-playfair text-center">
                Stories of Hope
              </h2>
              <div className="space-y-6">
                {CAMPAIGN_DATA.testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.name}
                    className="bg-gray-50 rounded-xl p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-bold text-gray-900">
                            {testimonial.name}
                          </h4>
                          <span className="text-[#EA580C] font-semibold">
                            {testimonial.role}
                          </span>
                        </div>
                        <p className="text-gray-700 italic">
                          "{testimonial.content}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Donation Sidebar */}
          <div
            className={`lg:w-1/3 ${isSidebarSticky ? "lg:sticky lg:top-24" : ""}`}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">
                Make a Difference Today
              </h3>

              <form onSubmit={handleDonationSubmit}>
                {/* Donation Tiers */}
                <div className="space-y-3 mb-6">
                  {CAMPAIGN_DATA.donationTiers.map((tier) => (
                    <button
                      key={tier.amount}
                      type="button"
                      onClick={() => {
                        setDonationAmount(tier.amount);
                        setCustomAmount("");
                      }}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-350 ${
                        donationAmount === tier.amount && !customAmount
                          ? "border-[#DC2626] bg-red-50"
                          : "border-gray-200 hover:border-[#EA580C]"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">
                          ${tier.amount}
                        </span>
                        <span className="text-sm text-gray-600">
                          {tier.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Or enter custom amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        if (e.target.value)
                          setDonationAmount(parseInt(e.target.value));
                      }}
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 transition-all duration-350"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-350"
                >
                  Donate ${customAmount || donationAmount} Now
                </button>

                <p className="text-center text-gray-600 text-sm mt-4">
                  Secure payment · Tax deductible · 100% goes to help children
                </p>
              </form>
            </div>

            {/* Quick Facts Sidebar */}
            <div className="bg-white rounded-2xl p-6 shadow-xl mt-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4 font-playfair">
                Why Your Donation Matters
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-[#059669] mr-2">✓</span>
                  $25 provides emergency food for a week
                </li>
                <li className="flex items-center">
                  <span className="text-[#059669] mr-2">✓</span>
                  $50 supplies clean water for a family
                </li>
                <li className="flex items-center">
                  <span className="text-[#059669] mr-2">✓</span>
                  $100 delivers medical supplies
                </li>
                <li className="flex items-center">
                  <span className="text-[#059669] mr-2">✓</span>
                  94% of funds go directly to programs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold mb-4 font-playfair">
              Our Trusted Partners
            </h4>
            <div className="flex justify-center items-center gap-8 opacity-70 flex-wrap">
              <div className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold">
                UNICEF
              </div>
              <div className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold">
                Red Cross
              </div>
              <div className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold">
                WHO
              </div>
              <div className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold">
                Save the Children
              </div>
            </div>
          </div>

          <div className="text-center border-t border-gray-700 pt-8">
            <p className="text-gray-400">
              © 2024 HopeFoundation. All donations are tax deductible.
              <span className="text-[#059669] ml-2">EIN: 12-3456789</span>
            </p>
            <p className="text-gray-500 text-sm mt-2">
              100% of your donation goes directly to program services
            </p>
          </div>
        </div>
      </footer>

      {/* Donation Modal */}
      <DonationModal />
    </div>
  );
};

export default App;
