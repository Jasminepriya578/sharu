'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { User } from "lucide-react";





const images = [
  '/bg1.jpg',
  '/bg2.jpg',
  '/bg3.jpg'
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: false });
  const AchievementSection = () => {
    const { ref, inView } = useInView({ triggerOnce: false });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <header className="w-full bg-gray-900 text-white py-2 text-center text-sm">
        <p>Affiliated to CBSE, New Delhi. No. 1930856</p>
      </header>

      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
          <a href="#" className="text-xl font-bold text-blue-900">
            <Image src="/logo.png" alt="School Logo" width={50} height={30} />
          </a>

          <div className="hidden md:flex items-center justify-end space-x-10 w-full">
  <div className="flex space-x-10 text-lg font-semibold tracking-wide items-center">
    <a href="#home" className="text-gray-800 hover:text-blue-600 transition duration-300">
      Home
    </a>
    <a href="#about" className="text-gray-800 hover:text-blue-600 transition duration-300">
      About Us
    </a>
    <a href="#contact" className="text-gray-800 hover:text-blue-600 transition duration-300">
      Contact Us
    </a>
  </div>

    {/* Login Button (Desktop) */}
    <Link 
    href="/login" 
    className="flex items-center gap-2 bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-bold hover:bg-yellow-500 transition shadow-md"
  >
    <User size={18} /> Login
  </Link>
</div>



          <button className="md:hidden text-blue-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-t py-4 space-y-4 text-center">
            <a href="#" className="block text-lg text-black hover:text-blue-500">Home</a>
            <a href="#" className="block text-lg text-black hover:text-blue-500">About Us</a>
            <a href="#" className="block text-lg text-black hover:text-blue-500">Admissions</a>
            <a href="#" className="block text-lg text-black hover:text-blue-500">Contact Us</a>
            <a href="#" className="block bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-bold hover:bg-yellow-500">
              Apply Now
            </a>
          </div>
        )}
      </nav>

      <section id="home" className="w-full h-screen relative">
        <Image src={images[currentImage]} alt="School Banner" layout="fill" objectFit="cover" className="transition-opacity duration-1000" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Building the Strong Futures</h1>
          <p className="mt-4 text-lg text-white max-w-2xl">
            Empowering students with knowledge and values.
          </p>
          <div className="mt-6 flex space-x-4">
          <Link href="/admission">
          <button className="px-6 py-3 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-500">
              Apply Now
            </button>
      </Link>
            
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold rounded-full hover:bg-yellow-400 hover:text-blue-900 transition duration-300"
            >
              Learn More
            </button>

          </div>
        </div>
      </section>
      
      {/*WhatsApp Section*/}
      <Link 
  href="https://wa.me/yourwhatsappnumber" 
  target="_blank" 
  className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center space-x-2 z-50"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 2.119.618 4.086 1.684 5.74L2 22l4.427-1.62A9.933 9.933 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8 0 1.923-.676 3.688-1.808 5.084l.122.21L18 20l-2.618-1.097-.211-.124A7.953 7.953 0 0 1 12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8zm-2.712 4.403a1 1 0 0 0-1.072.978c-.056 1.285.2 2.28.771 3.154.685 1.051 1.563 1.77 2.66 2.23.72.304 1.17.282 1.577.027.457-.288.868-.827 1.154-1.24a.998.998 0 0 0-.06-1.228l-.6-.7a.99.99 0 0 0-1.07-.283c-.22.083-.52.182-.82.028a3.253 3.253 0 0 1-1.586-1.68c-.16-.347.003-.63.08-.75a1 1 0 0 0-.17-1.262l-.54-.58a1 1 0 0 0-.714-.297z" clipRule="evenodd" />
  </svg>
  <span className="hidden md:inline">WhatsApp</span>
</Link>

        {/* Achievement Section - Removed redundant AchievementSection component call */}
        < section className="bg-white py-12" >
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Left Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img src="/achievement.jpg" alt="Achievements" className="w-1/2 md:w-3/4 lg:w-2/3 rounded-lg shadow-lg" />

          </div>
          {/* Right Stats Section */}
          <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Achievements</h2>
            <div className="grid grid-cols-2 gap-8 text-white">
              <div className="bg-blue-900 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold">
                  <CountUp start={0} end={2300} duration={3} />+
                </h3>
                <p>Successful Alumni</p>
              </div>
              <div className="bg-blue-900 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold">
                  <CountUp start={0} end={100} duration={3} />+
                </h3>
                <p>Global Universities</p>
              </div>
              <div className="bg-blue-900 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold">
                  <CountUp start={0} end={100} duration={3} />+
                </h3>
                <p>Sports Stars</p>
              </div>
              <div className="bg-blue-900 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold">
                  <CountUp start={0} end={20} duration={3} />+
                </h3>
                <p>Innovative Practices</p>
              </div>
            </div>
          </div>
        </div>
      </section >

    

      {/* About Section */}
      <section id="about" className="w-full bg-gray-100 py-16 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">About Us</h2>

          {/* Split Layout: Images on the Left, Text on the Right */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side: Three Images in Zig-Zag Layout */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              {/* First Image */}
              <div className="relative h-48 w-full rounded-lg overflow-hidden">
                <Image src="/about1.jpg" alt="About Image 1" layout="fill" objectFit="cover" />
              </div>

              {/* Second Image (Offset to the Right) */}
              <div className="relative h-48 w-3/4 ml-auto rounded-lg overflow-hidden">
                <Image src="/about2.jpg" alt="About Image 2" layout="fill" objectFit="cover" />
              </div>

              {/* Third Image (Offset to the Left) */}
              <div className="relative h-48 w-3/4 rounded-lg overflow-hidden">
                <Image src="/about3.jpg" alt="About Image 3" layout="fill" objectFit="cover" />
              </div>
            </div>

            {/* Right Side: Text Content */}
            <div className="w-full md:w-1/2">
              {/* Welcome Section */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-blue-900 mb-4">Welcome to   International School!</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  At   International School, we believe in nurturing young minds and fostering a love for learning. Our mission is to provide a well-rounded education that combines academic excellence with character building. Join us in shaping the leaders of tomorrow.
                </p>
              </div>

              {/* Mission and Approach Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mission Section */}
                <div>
                  <h4 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our mission is to cultivate a supportive and inclusive learning environment where every student is encouraged to reach their full potential. We strive to inspire curiosity, critical thinking, and a sense of community among our students.
                  </p>
                </div>

                {/* Approach Section */}
                <div>
                  <h4 className="text-2xl font-bold text-blue-900 mb-4">Our Approach</h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    At   International School, we offer a diverse curriculum that caters to the unique needs and interests of each student. Our programs are designed to challenge and inspire, from early childhood education to secondary school.
                  </p>
                </div>
              </div>

              {/* Learn More Button */}
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-500 transition duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs Section */}
      <section id="programs" className="w-full bg-white py-16 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">Our Programs</h2>

          {/* Description */}
          <p className="text-gray-700 text-lg text-center mb-12 max-w-2xl mx-auto">
            At   International School, we offer a diverse range of programs designed to cater to the unique needs and interests of our students.
          </p>

          {/* Program Cards */}
          {/* Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Early Childhood Education */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <img
                src="/early primary.jpg"
                alt="Early Childhood Education"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Early Childhood Education</h3>
              <p className="text-gray-700 mb-4">
                Our program encourages hands-on experiments and critical thinking to ignite curiosity in young minds.
              </p>
              <div className="flex justify-center mt-auto">
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-500 transition duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Primary Education */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <img
                src="/primary.jpg"
                alt="Primary Education"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Primary Education</h3>
              <p className="text-gray-700 mb-4">
                Our Primary Education program is designed to engage students in a dynamic and supportive learning environment.
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-500 transition duration-300"
              >
                Learn More
              </button>
            </div>

            {/* Secondary Education */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <img
                src="secondary.jpg"
                alt="Secondary Education"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Secondary Education</h3>
              <p className="text-gray-700 mb-4">
                The Secondary Education program at The International School aims to prepare students for higher education and future careers.
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-500 transition duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* View More Button */}

        </div>
      </section>


      {/* Trends Section */}

      <section className="relative w-full bg-blue-900 text-white py-6 px-3 md:px-12 ">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">

          {/* Left Side - Text Content */}
          <div className="md:w-1/2 text-left">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug">
              "Leaders aren’t born. <br />They are made.
            </h2>
            <p className="mt-3 text-base md:text-lg text-gray-200">
              Check Out How IS Students Are Ready To Lead Globally!
            </p>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-2 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-500 transition duration-300"
            >
              Learn More
            </button>

          </div>

          {/* Right Side - Image */}
          <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
            <Image
              src="/trend.jpg"
              alt="Student with VR"
              width={300} // Set width explicitly
              height={200} // Set height explicitly
              className="rounded-lg shadow-md w-full max-w-xs md:max-w-sm h-48 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Smart Learning Initiatives Section */}
      <section className="py-16 px-6 md:px-12 bg-white text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Our 'Smart' <br /> Learning Initiatives.
          </h2>
          <p className="mt-4 text-gray-700 text-lg">
            Academics can be overwhelming. As one of the best CBSE Schools in Madurai,
            we provide state-of-the-art digital tools to future-proof our students.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md text-center hover:scale-105 hover:shadow-lg transition-transform duration-300">
            <img src="/smart.png" alt="Smart Classrooms" className="mx-auto mb-3 w-12" />
            <h3 className="text-xl font-bold text-red-700">Smart Classrooms</h3>
            <p className="text-gray-600">Adapt to advancing Education</p>
          </div>

          {/* Card 2 */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md text-center hover:scale-105 hover:shadow-lg transition-transform duration-300">
            <img src="/robot.png" alt="Robotics Lab" className="mx-auto mb-3 w-12" />
            <h3 className="text-xl font-bold text-red-700">Robotics Lab</h3>
            <p className="text-gray-600">Unleashing Innovation</p>
          </div>

          {/* Card 3 */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md text-center hover:scale-105 hover:shadow-lg transition-transform duration-300">
            <img src="/tech.png" alt="Smart Classrooms" className="mx-auto mb-3 w-12" />
            <h3 className="text-xl font-bold text-red-700">Smart Classrooms</h3>
            <p className="text-gray-600">Digital literacy & responsibility</p>
          </div>



          {/* Card 4 */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md text-center hover:scale-105 hover:shadow-lg transition-transform duration-300">
            <img src="/lab.png" alt="Digital Tools & Networks" className="mx-auto mb-3 w-12" />
            <h3 className="text-xl font-bold text-red-700">Digital Tools & Networks</h3>
            <p className="text-gray-600">Networking and growth redefined.</p>
          </div>

          {/* Card 5 */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md text-center hover:scale-105 hover:shadow-lg transition-transform duration-300">
            <img src="/math.png" alt="XSEED Sessions" className="mx-auto mb-3 w-12" />
            <h3 className="text-xl font-bold text-red-700">iMath & X-SEED sessions.</h3>
            <p className="text-gray-600">Unleashing Innovation</p>
          </div>

          {/* Card 6 */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md text-center hover:scale-105 hover:shadow-lg transition-transform duration-300">
            <img src="/tool.png" alt="Technology Lab" className="mx-auto mb-3 w-12" />
            <h3 className="text-xl font-bold text-red-700">Technology Lab</h3>
            <p className="text-gray-600">Explore Tomorrow's Tech World.</p>
          </div>
        </div>
      </section>

      {/* Our Campus Section */}
      <section
        id="campus"
        className="relative w-full h-screen flex items-center justify-center text-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/bigcamp.jpg')" }}
      >
        {/* Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 bg-white bg-opacity-80 p-12 max-w-4xl mx-auto rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-blue-900">Our Campus</h2>
          <p className="text-gray-700 mt-4">
            Take a look at our beautiful and vibrant campus, designed to inspire learning and creativity.
          </p>
        </div>
      </section>



      {/* Additional Content Below */}
      <section className="w-full py-16 px-8 md:px-16 text-center bg-white">
        <h3 className="text-3xl font-bold text-blue-900">Explore More</h3>
        <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
          Our campus offers state-of-the-art facilities, open spaces, and a nurturing environment for students.
        </p>

        {/* Image Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["/ourcamp1.jpg", "/ourcamp2.jpg", "/ourcapm3.jpg"].map((src, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <Image
                src={src}
                alt={`Campus Image ${index + 1}`}
                width={400}
                height={250}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </section>


      {/* Parental Testimony Section */}
      <section id="testimonials" className="w-full bg-gray-100 py-12 md:py-16 px-4 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center relative">

          {/* Left Side - Title & Quote */}
          <div className="md:w-1/2 flex flex-col items-start justify-center px-4 md:px-6 mb-8 md:mb-0">
            <div className="text-7xl md:text-9xl text-gray-300 leading-none">“</div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Parent Testimonials</h2>
          </div>

          {/* Right Side - Testimonials with Navigation Outside */}
          <div className="md:w-1/2 relative w-full">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              className="mySwiper"
            >
              {/* Testimonial 1 */}
              <SwiperSlide key="1">
                <div className="bg-white p-6 md:p-12 rounded-xl shadow-lg flex flex-col md:flex-row items-start space-x-0 md:space-x-6 space-y-6 md:space-y-0 min-h-[250px]">
                  <img
                    src="/parent1.jpg"
                    alt="Parent"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-blue-900">Mrs. Nabila Rahman</h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      "The International School has truly transformed my child's learning experience.
                      The teachers are dedicated, creating an environment where my daughter feels supported
                      and encouraged to excel. The diverse programs have helped her develop a range of skills
                      and interests."
                    </p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Testimonial 2 */}
              <SwiperSlide key="2">
                <div className="bg-white p-6 md:p-12 rounded-xl shadow-lg flex flex-col md:flex-row items-start space-x-0 md:space-x-6 space-y-6 md:space-y-0 min-h-[250px]">
                  <img
                    src="/parent2.jpg"
                    alt="Parent"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-blue-900">Mr. Jebayer Ahmed</h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      "The school's environment is amazing! My child has made great friends and developed
                      confidence through various activities. The teachers ensure a balance between academics
                      and extracurriculars, making the learning experience enjoyable."
                    </p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Testimonial 3 */}
              <SwiperSlide key="3">
                <div className="bg-white p-6 md:p-12 rounded-xl shadow-lg flex flex-col md:flex-row items-start space-x-0 md:space-x-6 space-y-6 md:space-y-0 min-h-[250px]">
                  <img
                    src="/parent3.jpg"
                    alt="Parent"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-blue-900">Mrs. Priya Sharma</h3>
                    <p className="text-gray-700 text-sm md:text-base">
                      "We are highly impressed with the holistic education approach.
                      The school has an excellent curriculum, modern infrastructure, and
                      great faculty. Our child is happy and excited to go to school every day!"
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>



            {/* Navigation Buttons - Placed Outside */}
            <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 swiper-button-prev cursor-pointer text-3xl text-blue-900">
              ❮
            </div>
            <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 swiper-button-next cursor-pointer text-3xl text-blue-900">
              ❯
            </div>
          </div>
        </div >
      </section >

    
      {/* FAQ Section */}
      < section className="py-16 px-6 md:px-12 bg-white text-left" >
        <div className="max-w-full mx-auto">
          <h2 className="text-full md:text-4xl font-bold text-blue-900">FAQs</h2>

          {/* FAQ List */}
          <div className="mt-6 space-y-4 max-w-3xl mx-auto"> {/* Fixed width container */}
            {[
              {
                question: "Can I get a tour of the school before applying?",
                answer: "Yes! You can schedule a tour to explore our campus, meet our teachers, and experience student life. Contact our admissions office or book online.",
              },
              {
                question: "How do I pay the registration fee?",
                answer: "You can pay via:\n✔ Online: Credit/debit cards, net banking\n✔ Bank Transfer: Official school account\n✔ In-Person: Cash or card at the school office\n\nNeed help? Our team is happy to assist!",
              },
              {
                question: "Is there a waitlist for admissions?",
                answer: "Yes, some grades have a waitlist. If a seat isn’t available, you can join our priority waitlist and we’ll notify you when there’s an opening.",
              },
              {
                question: "What are the next steps once the application is submitted?",
                answer: "1️⃣ Review: Admissions team checks your application\n2️⃣ Interview/Assessment (if needed)\n3️⃣ Admission Offer: Receive confirmation if selected\n4️⃣ Fee Payment & Enrollment\n5️⃣ Welcome to Our School! 🎉",
              },
            ].map((item, index) => (
              <details key={index} className="border-b border-gray-300 py-3 w-full"> {/* Added w-full */}
                <summary className="text-lg font-medium cursor-pointer flex justify-between text-black">
                  {item.question}
                  <span className="text-gray-600">▼</span>
                </summary>
                <p className="text-gray-600 mt-2 whitespace-pre-line">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section >

      <section id="contact" className="py-16 px-6 md:px-12 bg-white text-left border-4 border-gray-300 rounded-xl shadow-lg p-8 md:p-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left - Contact Form */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Get in <span className="text-red-600">Touch</span>
            </h2>
            <p className="text-gray-600 mt-2">
              We'd love to hear from you! Whether you have questions, need more information, or want to schedule a visit, our team is here to help.
            </p>

            <form className="mt-6 space-y-4">
              <input type="text" placeholder="Name *" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
              <input type="email" placeholder="Email" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
              <input type="tel" placeholder="Phone number *" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
              <select className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>How did you find us?</option>
              </select>
              <button className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition duration-300">
                SEND
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-6 flex flex-col space-y-2 text-gray-700">
              <p><strong>📞 Phone:</strong> +8801571273741</p>
              <p><strong>📠 Fax:</strong> 054654 1434</p>
              <p><strong>📧 Email:</strong> abdulhaakim96@gmail.com</p>
            </div>
          </div>

          {/* Right - Image & Call to Action */}
          <div className="relative text-center">
            {/* Image Positioned Above Text */}
            <img src="/contact.jpg" alt="Student" className="w-65 mx-auto rounded-lg shadow-md relative z-10" />


            {/* Text & Button Below the Image */}
            <div className="mt-6">
              <h3 className="text-lg text-gray-700 font-semibold">Interested in joining Our School?</h3>
              <p className="text-gray-600 text-sm">Click the <span className="text-red-600">"Apply Now"</span> button to start your application today!</p>
              <button className="bg-red-600 text-white py-3 px-6 rounded-md font-semibold mt-4 hover:bg-red-700 transition duration-300">
                Apply Now
              </button>
            </div>
          </div>


        </div>
      </section>



      {/* Footer */}
      {/* Footer Section */}
      <footer className="bg-blue-900 text-white py-10 px-6 md:px-12 w-full">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">

          {/* School Logo & Address */}
          <div className="mb-6 md:mb-0">
            <img src="/logo.png" alt="School Logo" className="w-32 mx-auto md:mx-0" />
            <h3 className="text-lg font-semibold mt-3">Come Visit</h3>
            <p className="text-gray-300 text-sm mt-1">
              The International School <br />
              Sholavandhan Road, Melakkal Rd, Kochadai, <br />
              Madurai, Tamil Nadu 625019
            </p>
          </div>

          {/* Social Media Links */}
          <div className="mt-4 md:mt-0">
            <h3 className="text-xl font-bold text-red-500">Stay Connected with Us</h3>
            <div className="flex space-x-6 mt-3">
              <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
              <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-white">YouTube</a>
            </div>
          </div>

        </div>
      </footer>

    </div >
  );
}/*  */