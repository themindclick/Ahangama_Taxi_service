import React, { useState, useEffect } from 'react';

const Reviews = () => {
  const [activeReview, setActiveReview] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Google Reviews Data - DATES REMOVED
const reviewData = [
  {
    id: 1,
    name: "Mustafa Rahman",
    rating: 5,
    text: "Amazing rental service. Very professional. Thimesh is very sweet and humble. We booked 3 cars in a span of 1 week (2 Toyota Hiace and a Wagon R). The cars were in mint condition and very clean.",
    avatar: "MR",
    verified: true
  },
  {
    id: 2,
    name: "IDW Sri Lanka",
    rating: 5,
    text: "Incredible service and super clean and comfortable vehicles! Tharanga was very supportive! Next time also looking here first before anywhere else!",
    avatar: "IS",
    verified: true
  },
  {
    id: 3,
    name: "Navodya Thathsara",
    rating: 5,
    text: "Great experience with T&S Rent a Car. The car was clean, well maintained, and delivered on time. Friendly staff and smooth process from start to finish. Highly recommended.",
    avatar: "NT",
    verified: true
  },
  {
    id: 4,
    name: "Shazwan Mahboob",
    rating: 5,
    text: "Highly recommended. We took the brand new KDH silver high roof van. Vehicle was in top condition and clean. We had a comfortable family trip. Thank you Thimesh.",
    avatar: "SM",
    verified: true
  },
  {
    id: 5,
    name: "Dinuk Wikramanayake",
    rating: 5,
    text: "Rented a Nissan X-Trail for a month. From day one, the service and coordination were excellent. Thimesh was very professional and the experience was great.",
    avatar: "DW",
    verified: true
  },
  {
    id: 6,
    name: "Sethmina Sadeepa",
    rating: 5,
    text: "Awesome customer service and the most friendly service I've ever gotten in Sri Lanka. Affordable, worth the price, and 100% transparency. No cheap service here.",
    avatar: "SS",
    verified: true
  },
  {
    id: 7,
    name: "Nadeeshani Dayawansha",
    rating: 5,
    text: "T&S TOURS RENT A CAR is the best car rental service! Highly recommend their good service and best condition vehicles.",
    avatar: "ND",
    verified: true
  },
  {
    id: 8,
    name: "Dumindu Nukulasooriya",
    rating: 5,
    text: "I rented a brand-new Highroof KDH for our family visit to Anuradhapura. Thimesh handled a very last-minute booking with great service. Highly recommended.",
    avatar: "DN",
    verified: true
  },
  {
    id: 9,
    name: "Uthum Hirunika",
    rating: 5,
    text: "The vehicle was super clean, in excellent condition, and very easy to drive. The whole rental process was smooth and hassle-free.",
    avatar: "UH",
    verified: true
  },
  {
    id: 10,
    name: "Samantha Kumara",
    rating: 5,
    text: "Really happy with the service. Booking was simple, pickup was on time, and the car was in great shape. Best rent-a-car service!",
    avatar: "SK",
    verified: true
  },
  {
    id: 11,
    name: "Min Kas",
    rating: 5,
    text: "Excellent and reliable car rental service. The owner was friendly and professional. Pricing was very reasonable for the quality provided.",
    avatar: "MK",
    verified: true
  },
  {
    id: 12,
    name: "Imesha Kaushalya",
    rating: 5,
    text: "Well satisfied customer service! Prices are affordable and the staff is very friendly. The cars are very clean.",
    avatar: "IK",
    verified: true
  },
  {
    id: 13,
    name: "Nuwan Madusanka",
    rating: 5,
    text: "Rented a KDH for a day. Paperwork was minimal, which saved a lot of time. The customer service team was very accommodating.",
    avatar: "NM",
    verified: true
  },
  {
    id: 14,
    name: "Uditha Basnayake",
    rating: 5,
    text: "Fantastic experience from start to finish. No waiting time at pickup and the staff (especially the young team) was very helpful.",
    avatar: "UB",
    verified: true
  },
  {
    id: 15,
    name: "Lasaras Shanaka Sapunda",
    rating: 5,
    text: "Excellent service! Booking was easy, and the car was in perfect condition. I’ll definitely use their service again.",
    avatar: "LS",
    verified: true
  },
  {
    id: 16,
    name: "Asanka Indunil",
    rating: 5,
    text: "Received a comfortable and reliable travel service within our budget. Complete with all necessary facilities and friendly service.",
    avatar: "AI",
    verified: true
  },
  {
    id: 17,
    name: "Malith Prasanjith",
    rating: 5,
    text: "Really great service and very friendly staff. Thank you so much Mr. Tharanga for your great service.",
    avatar: "MP",
    verified: true
  },
  {
    id: 18,
    name: "Nili Fernando",
    rating: 5,
    text: "Great service. Communication with T&S Tours via WhatsApp was very easy and they answered all questions with no hesitation.",
    avatar: "NF",
    verified: true
  },
  {
    id: 19,
    name: "Prasad Baduwatte",
    rating: 5,
    text: "Friendly, exceptional service and high quality well-maintained vehicles. I've rented multiple times with great satisfaction.",
    avatar: "PB",
    verified: true
  },
  {
    id: 20,
    name: "Nethra N Wedage",
    rating: 5,
    text: "Exceptional rental experience. Top-notch customer service, clean and reliable vehicles, and a quick, convenient process.",
    avatar: "NW",
    verified: true
  }
];

 const customerPhotos = [
  { id: 1, image: "/assets/c1.jpeg" },
  { id: 2, image: "/assets/c2.jpeg" },
  { id: 3, image: "/assets/c3.jpeg" },
  { id: 4, image: "/assets/c4.jpeg" },
  { id: 5, image: "/assets/c5.jpeg" },
  { id: 6, image: "/assets/c6.jpeg" },
  { id: 7, image: "/assets/c7.jpeg" },
  { id: 8, image: "/assets/c8.jpeg" },
  { id: 9, image: "/assets/c9.jpeg" },
  { id: 10, image: "/assets/c10.jpeg" },
  { id: 11, image: "/assets/c11.jpeg" },
  { id: 12, image: "/assets/c12.jpeg" },
  { id: 13, image: "/assets/c13.jpeg" },
  { id: 14, image: "/assets/c14.jpeg" },
  { id: 15, image: "/assets/c15.jpeg" },
  { id: 16, image: "/assets/c16.jpeg" },
  { id: 17, image: "/assets/c17.jpeg" },
  { id: 18, image: "/assets/c18.jpeg" },
  { id: 19, image: "/assets/c19.jpeg" },
  { id: 20, image: "/assets/c20.jpeg" }
];

  useEffect(() => {
    const reviewInterval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviewData.length);
    }, 5000);
    return () => clearInterval(reviewInterval);
  }, [reviewData.length]);

  useEffect(() => {
    const photoInterval = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % customerPhotos.length);
    }, 4000);
    return () => clearInterval(photoInterval);
  }, [customerPhotos.length]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg key={index} className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-black rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-4">
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-red-600">Customer Testimonials</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            What Our Customers <span className="text-red-600">Say</span>
          </h2>
        </div>

        {/* Google Reviews Carousel */}
        <div className="max-w-6xl mx-auto mb-20">
           {/* Summary ratings removed for cleaner flow, can be re-added if needed */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeReview * 100}%)` }}>
                {reviewData.map((review) => (
                  <div key={review.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:border-red-600 transition-all duration-300 max-w-4xl mx-auto">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {review.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-black text-lg">{review.name}</h4>
                              {review.verified && (
                                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                              )}
                            </div>
                          </div>
                        </div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6 opacity-50" />
                      </div>
                      <div className="flex gap-1 mb-4">{renderStars(review.rating)}</div>
                      <p className="text-gray-700 leading-relaxed text-lg italic">"{review.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Arrows */}
            <button onClick={() => setActiveReview((prev) => (prev - 1 + reviewData.length) % reviewData.length)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white hover:bg-red-600 text-black hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
            <button onClick={() => setActiveReview((prev) => (prev + 1) % reviewData.length)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white hover:bg-red-600 text-black hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
          </div>
        </div>

        {/* Happy Customers Photo Gallery */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h3 className="text-3xl lg:text-4xl font-bold text-black mb-4">Happy Customers <span className="text-red-600">Gallery</span></h3>
            <p className="text-gray-600">Moments captured with our satisfied customers across Sri Lanka</p>
          </div>

          <div className="relative mb-8 max-w-sm mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group border-8 border-white">
              {/* VERTICAL IMAGE RATIO 3:4 */}
              <div className="aspect-[3/4] bg-gray-100">
                <img src={customerPhotos[activePhotoIndex].image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              </div>
              
            </div>
          </div>

          {/* RESTORED: Thumbnail Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            {customerPhotos.map((photo, index) => (
              <button key={photo.id} onClick={() => setActivePhotoIndex(index)} className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${activePhotoIndex === index ? 'ring-4 ring-red-600 scale-105 shadow-xl' : 'hover:scale-105 opacity-60 hover:opacity-100'}`}>
                <img src={photo.image} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RESTORED: Call to Action */}
       <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
  <p className="text-lg text-gray-600 mb-6 italic">Join thousands of satisfied customers who trust T&S Tours</p>
  
  <div className="flex flex-col items-center gap-4">
    {/* Button 1: Leave a Review */}
    <a
      href="https://www.google.com/search?sca_esv=40662ef7c8bae166&sxsrf=ANbL-n78mM58uyksUqtTPbn3bNe1m9Q69w:1771052030364&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOaH4xdJx9sVYF4TPGdXzTAOoT8-Cg6geDgK7ORqxH3OI6CvTPcPP_oJqBNeRMZpvbuDYpnFwzSC1_OQqz1iXd7imhF2IC2jlXbs5v5gDvONZzVU66Q%3D%3D&q=T%26S+TOURS+AND+RENT+A+CAR+Reviews&sa=X&ved=2ahUKEwjk7pf5stiSAxX5ELkGHS4MFbMQ0bkNegQIHRAF&biw=1528&bih=732&dpr=1.25#lrd=0x3ae25309f44b9d4f:0x846c638a164a8a2c,3,,,,"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full max-w-xs inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      Leave a Google Review
    </a>

    {/* Button 2: View Google Business Profile */}
    <a
      href="https://share.google/FnzNHxLyikDyFWYGC" 
      target="_blank"
      rel="noopener noreferrer"
      className="w-full max-w-xs inline-flex items-center justify-center gap-3 px-8 py-4 bg-red-600 text-white hover:bg-red-700 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      View on Google Maps
    </a>
  </div>
</div>
        
      </div>

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
      `}</style>
    </section>
  );
};

export default Reviews;