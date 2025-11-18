import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  ArrowUpRight,
  Instagram,
  Twitter,
  Facebook,
  Play,
  Pause,
  Award,
  Users,
  Building2,
  Target,
} from "lucide-react";

// Mock data for the real estate agency
const agencyData = {
  company: {
    name: "ARCHITECTURA",
    tagline: "Redefining Urban Luxury",
    description:
      "We transform visionary architectural concepts into exceptional living experiences, crafting spaces that harmonize form, function, and timeless elegance.",
    founded: "2009",
    projectsCompleted: "50+",
    portfolioValue: "$2B+",
    teamMembers: "25+",
  },
  featuredProperties: [
    {
      id: 1,
      title: "Skyline Residences",
      location: "Manhattan, NY",
      type: "Luxury Condominium",
      price: "$4.2M",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      status: "Available",
      specs: "4BD • 3BA • 3,200 sqft",
    },
    {
      id: 2,
      title: "Cliffside Villa",
      location: "Malibu, CA",
      type: "Oceanfront Estate",
      price: "$8.7M",
      image:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      status: "Sold",
      specs: "5BD • 4.5BA • 4,800 sqft",
    },
    {
      id: 3,
      title: "Urban Loft",
      location: "Chicago, IL",
      type: "Penthouse",
      price: "$2.9M",
      image:
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      status: "Available",
      specs: "3BD • 2.5BA • 2,100 sqft",
    },
  ],
  services: [
    {
      title: "Architectural Design",
      description:
        "Custom architectural solutions tailored to your vision and site requirements",
    },
    {
      title: "Development Consulting",
      description:
        "Strategic guidance through every phase of your real estate development project",
    },
    {
      title: "Portfolio Management",
      description:
        "Comprehensive management of your luxury real estate investment portfolio",
    },
  ],
  testimonials: [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Property Investor",
      quote:
        "ARCHITECTURA transformed our vision into a masterpiece. Their attention to detail is unparalleled.",
      company: "Chen Holdings",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Commercial Developer",
      quote:
        "Working with ARCHITECTURA elevated our project from excellent to exceptional. True visionaries.",
      company: "Rodriguez Developments",
    },
  ],
  team: [
    {
      name: "Elena Vasquez",
      role: "Principal Architect",
      bio: "20+ years shaping urban landscapes with sustainable luxury designs. Harvard Graduate School of Design.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      specialties: [
        "Sustainable Design",
        "Urban Planning",
        "Luxury Residential",
      ],
    },
    {
      name: "James Fitzgerald",
      role: "Development Director",
      bio: "Expert in luxury real estate markets and investment strategy. Former Director at Related Companies.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      specialties: [
        "Investment Strategy",
        "Market Analysis",
        "Portfolio Management",
      ],
    },
    {
      name: "Marcus Thorne",
      role: "Senior Project Manager",
      bio: "15+ years managing complex development projects from concept to completion. MIT Civil Engineering.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      specialties: [
        "Project Management",
        "Construction Oversight",
        "Budget Optimization",
      ],
    },
    {
      name: "Sophia Reynolds",
      role: "Design Director",
      bio: "Award-winning interior architect with a focus on creating timeless, functional living spaces.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      specialties: [
        "Interior Architecture",
        "Space Planning",
        "Material Selection",
      ],
    },
  ],
  values: [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Precision",
      description:
        "Every detail matters. We approach each project with meticulous attention to architectural precision and craftsmanship.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaboration",
      description:
        "We believe the best results come from close collaboration with our clients, architects, and builders.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our work, from initial concept to final execution.",
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Innovation",
      description:
        "We embrace innovative technologies and sustainable practices to create forward-thinking designs.",
    },
  ],
  milestones: [
    { year: "2009", event: "Founded by Elena Vasquez" },
    { year: "2012", event: "First $10M+ project completed" },
    { year: "2015", event: "Expanded to commercial developments" },
    { year: "2018", event: "Portfolio value surpassed $1B" },
    { year: "2021", event: "International project in London" },
    { year: "2024", event: "Current portfolio value: $2B+" },
  ],
};

const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) =>
        prev === agencyData.testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-['Figtree']">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-8 bg-[#C5A47E]"></div>
              <span className="text-xl font-semibold tracking-tight">
                {agencyData.company.name}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.substring(1))}
                  className={`text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "text-[#C5A47E] border-b-2 border-[#C5A47E]"
                      : "text-gray-600 hover:text-[#C5A47E]"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden md:flex items-center px-6 py-3 bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#2A2A2A] transition-all duration-300"
            >
              Schedule Consultation
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-6 py-4 space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.substring(1))}
                  className={`block w-full text-left py-2 text-base font-medium ${
                    activeSection === item.href.substring(1)
                      ? "text-[#C5A47E]"
                      : "text-gray-600"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full flex items-center justify-center px-6 py-3 bg-[#1A1A1A] text-white text-sm font-medium mt-4"
              >
                Schedule Consultation
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-[#C5A47E]/10 text-[#8B7355] text-sm font-medium rounded-full">
                  Premium Real Estate Development
                </div>
                <h1 className="text-5xl lg:text-6xl font-['Cormorant_Garamond'] font-medium leading-tight">
                  Where Vision Meets
                  <span className="text-[#C5A47E]"> Excellence</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  {agencyData.company.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white font-medium hover:bg-[#2A2A2A] transition-all duration-300"
                >
                  View Portfolio
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="flex items-center justify-center px-8 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] font-medium hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
                >
                  Our Story
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-2xl font-['Cormorant_Garamond'] font-semibold text-[#1A1A1A]">
                    {agencyData.company.projectsCompleted}
                  </div>
                  <div className="text-sm text-gray-600">
                    Projects Completed
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-['Cormorant_Garamond'] font-semibold text-[#1A1A1A]">
                    {agencyData.company.portfolioValue}
                  </div>
                  <div className="text-sm text-gray-600">Portfolio Value</div>
                </div>
                <div>
                  <div className="text-2xl font-['Cormorant_Garamond'] font-semibold text-[#1A1A1A]">
                    {agencyData.company.teamMembers}
                  </div>
                  <div className="text-sm text-gray-600">Expert Team</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="text-sm text-gray-300">Featured Project</div>
                  <div className="text-2xl font-['Cormorant_Garamond'] font-medium mt-1">
                    Skyline Residences
                  </div>
                  <div className="text-sm text-gray-300 mt-2">
                    Manhattan, NY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Company Story */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-['Cormorant_Garamond'] font-medium text-[#1A1A1A] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in {agencyData.company.founded}, ARCHITECTURA emerged
                  from a simple yet powerful vision: to redefine urban luxury
                  through architectural excellence. What began as a boutique
                  studio has evolved into a renowned development firm known for
                  transformative projects that shape city skylines.
                </p>
                <p>
                  Our journey spans over a decade of creating exceptional spaces
                  that harmonize aesthetic beauty with functional design. Each
                  project reflects our commitment to precision, innovation, and
                  sustainable development practices.
                </p>
                <p>
                  Today, we continue to push boundaries while maintaining the
                  core values that have defined our success: uncompromising
                  quality, client collaboration, and visionary design thinking.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-gray-200"></div>
              <div className="aspect-square bg-gray-300 mt-8"></div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-['Cormorant_Garamond'] font-medium text-[#1A1A1A] mb-4">
                Our Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide every decision and define our approach
                to exceptional real estate development
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {agencyData.values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-[#C5A47E] rounded-full flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-['Cormorant_Garamond'] font-medium text-[#1A1A1A] mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-['Cormorant_Garamond'] font-medium text-[#1A1A1A] mb-4">
                Leadership Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the visionary leaders and expert professionals who drive
                our success and innovation
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {agencyData.team.map((member, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-gray-200 mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        {member.bio}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-['Cormorant_Garamond'] font-medium text-[#1A1A1A]">
                      {member.name}
                    </h3>
                    <div className="text-[#C5A47E] font-medium mb-2">
                      {member.role}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, specIndex) => (
                        <span
                          key={specIndex}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-['Cormorant_Garamond'] font-medium text-[#1A1A1A] mb-4">
                Our Journey
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Key milestones that mark our growth and achievements in the
                world of luxury real estate development
              </p>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#C5A47E]"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {agencyData.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}
                    >
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-2xl font-['Cormorant_Garamond'] font-medium text-[#C5A47E] mb-2">
                          {milestone.year}
                        </div>
                        <div className="text-gray-700 font-medium">
                          {milestone.event}
                        </div>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#C5A47E] rounded-full border-4 border-white"></div>

                    {/* Spacer */}
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-['Cormorant_Garamond'] font-medium text-[#1A1A1A] mb-4">
              Featured Properties
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of exceptional properties that
              redefine luxury living
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agencyData.featuredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <div className="absolute inset-0 bg-gray-200"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-sm text-gray-300">
                      {property.location}
                    </div>
                    <div className="text-xl font-['Cormorant_Garamond'] font-medium">
                      {property.title}
                    </div>
                    <div className="text-lg text-[#C5A47E] font-medium mt-1">
                      {property.price}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        property.status === "Available"
                          ? "bg-green-500/20 text-green-700"
                          : "bg-gray-500/20 text-gray-700"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-600 mb-2">
                    {property.type}
                  </div>
                  <div className="text-sm font-medium text-[#1A1A1A]">
                    {property.specs}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-['Cormorant_Garamond'] font-medium text-[#1A1A1A] mb-6">
                Comprehensive Real Estate Solutions
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                From concept to completion, we provide end-to-end services that
                ensure every project achieves its full potential.
              </p>

              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center px-8 py-4 bg-[#1A1A1A] text-white font-medium hover:bg-[#2A2A2A] transition-all duration-300"
              >
                Explore Services
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {agencyData.services.map((service, index) => (
                <div
                  key={index}
                  className="border-l-4 border-[#C5A47E] pl-6 py-2 group hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <h3 className="text-xl font-['Cormorant_Garamond'] font-medium text-[#1A1A1A] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-['Cormorant_Garamond'] font-medium text-white mb-4">
              Client Testimonials
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear from our valued clients about their experience working with
              ARCHITECTURA
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentTestimonial * 100}%)`,
                  }}
                >
                  {agencyData.testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="text-center">
                        <div className="text-2xl font-['Cormorant_Garamond'] font-medium italic mb-8 leading-relaxed">
                          "{testimonial.quote}"
                        </div>
                        <div className="text-[#C5A47E] font-medium text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center mt-12 space-x-4">
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className="p-2 hover:text-[#C5A47E] transition-colors duration-300"
                >
                  {autoPlay ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </button>
                <div className="flex space-x-2">
                  {agencyData.testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentTestimonial(index);
                        setAutoPlay(false);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentTestimonial === index
                          ? "bg-[#C5A47E]"
                          : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-['Cormorant_Garamond'] font-medium text-[#1A1A1A] mb-6">
                Start Your Project
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Ready to transform your vision into reality? Contact us to
                schedule a consultation with our team.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#C5A47E]/10 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#C5A47E] rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Email</div>
                    <div className="text-gray-600">
                      contact@architectura.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#C5A47E]/10 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#C5A47E] rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Phone</div>
                    <div className="text-gray-600">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#C5A47E]/10 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#C5A47E] rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Office</div>
                    <div className="text-gray-600">
                      123 Architectural Ave, New York, NY 10001
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-8">
                <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-[#C5A47E] hover:text-[#C5A47E] transition-all duration-300">
                  <Instagram className="h-5 w-5" />
                </button>
                <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-[#C5A47E] hover:text-[#C5A47E] transition-all duration-300">
                  <Twitter className="h-5 w-5" />
                </button>
                <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-[#C5A47E] hover:text-[#C5A47E] transition-all duration-300">
                  <Facebook className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#C5A47E] focus:ring-1 focus:ring-[#C5A47E] outline-none transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#C5A47E] focus:ring-1 focus:ring-[#C5A47E] outline-none transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-[#C5A47E] focus:ring-1 focus:ring-[#C5A47E] outline-none transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 focus:border-[#C5A47E] focus:ring-1 focus:ring-[#C5A47E] outline-none transition-all duration-300">
                    <option>Residential Development</option>
                    <option>Commercial Project</option>
                    <option>Consultation</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-[#C5A47E] focus:ring-1 focus:ring-[#C5A47E] outline-none transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white font-medium hover:bg-[#2A2A2A] transition-all duration-300"
                >
                  Submit Inquiry
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-2 h-6 bg-[#C5A47E]"></div>
              <span className="text-lg font-semibold">
                {agencyData.company.name}
              </span>
            </div>

            <div className="text-gray-400 text-sm">
              © 2024 ARCHITECTURA. All rights reserved.
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <button className="text-gray-400 hover:text-[#C5A47E] transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-[#C5A47E] transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-[#C5A47E] transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
