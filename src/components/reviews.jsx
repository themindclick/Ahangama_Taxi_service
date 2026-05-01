import React, { useState, useEffect } from 'react';

const Reviews = () => {
  const [activeReview, setActiveReview] = useState(0);

  const reviewData = [
    {
      id: 1,
      name: "Jennifer Agbanoma",
      rating: 5,
      text: "We used Uresh's taxi service to take us back to Colombo airport. Uresh was great at communicating with us. He was on time, and his van was spacious and comfortable. We really enjoyed chatting to him on the journey. Great business!",
      avatar: "JA",
      verified: true
    },
    {
      id: 2,
      name: "Raimondas Petraitis",
      rating: 5,
      text: "Amazing experience during our family trip. The drivers were not only professional and reliable, but they truly became our friends during the journey. Everything was perfect from start to finish.",
      avatar: "RP",
      verified: true
    },
    {
      id: 3,
      name: "Franziska Meiners",
      rating: 5,
      text: "Uresh is a fantastic driver and great person. Comfortable car with turning seats, always on time and available on short notice. He organizes cool custom tours and speaks good English. 100% recommended.",
      avatar: "FM",
      verified: true
    },
    {
      id: 4,
      name: "Thi Thai Vo",
      rating: 5,
      text: "They arranged a wild safari tour for us to Udawalawe and we were very happy. Uresh was very friendly and made sure we felt comfortable the whole day. Everything was well organized.",
      avatar: "TV",
      verified: true
    },
    {
      id: 5,
      name: "Eri Nishikami",
      rating: 5,
      text: "Trustworthy taxi service! The price was way more generous than other services. My driver was very friendly, professional and helpful. I would definitely recommend this company to anyone traveling Sri Lanka.",
      avatar: "EN",
      verified: true
    },
    {
      id: 6,
      name: "Daydream Ahangama",
      rating: 5,
      text: "Uresh is a very kind and honest driver. We were able to travel without any fear even with small children because of his polite driving style. He does not make us uncomfortable at any time.",
      avatar: "DA",
      verified: true
    },
    {
      id: 7,
      name: "Belinda Ashton",
      rating: 5,
      text: "My family of 5 had a wonderful experience. They always arrived on time, were extremely knowledgeable, and offered tailored packages for excursions and airport transfers.",
      avatar: "BA",
      verified: true
    },
    {
      id: 8,
      name: "Anssi Niemelä",
      rating: 5,
      text: "Uresh was truly exceptional: always on time, very friendly and a really safe driver. I highly recommend his services!",
      avatar: "AN",
      verified: true
    },
    {
      id: 9,
      name: "William van der Valk",
      rating: 5,
      text: "Booked a driver from Ahangama to Colombo. Communication was very good and clear. Perfectly on time and a very good driver. Would recommend to everyone!",
      avatar: "WV",
      verified: true
    },
    {
      id: 10,
      name: "Priit Tomp",
      rating: 5,
      text: "Absolutely amazing service! Very friendly and professional. Always on time and knows the area very well. Helped us get around Ahangama safely. Keep up the great work!",
      avatar: "PT",
      verified: true
    }
  ];

  useEffect(() => {
    const reviewInterval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviewData.length);
    }, 6000);
    return () => clearInterval(reviewInterval);
  }, [reviewData.length]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg key={index} className="w-5 h-5" fill={index < rating ? "#FBBC04" : "#D1D5DB"} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#005acd] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Real Guest <span className="text-[#EAB875]">Experiences</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="font-bold text-gray-700">4.9</span>
            <div className="flex">{renderStars(5)}</div>
            <span className="text-sm text-gray-500 font-medium">on Google Maps</span>
          </div>
        </div>

        {/* Review Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-50 rounded-xl p-6 md:p-10 shadow-sm border border-gray-100">
            {/* Google G Logo Background */}
            <div className="absolute top-6 right-6 opacity-10">
               <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" className="w-12 h-12" />
            </div>

            <div className="flex transition-opacity duration-500">
              <div className="w-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#005acd] rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {reviewData[activeReview].avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight">
                      {reviewData[activeReview].name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Local Guide • Verified</span>
                    </div>
                  </div>
                </div>

                <div className="flex mb-4">
                  {renderStars(reviewData[activeReview].rating)}
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  "{reviewData[activeReview].text}"
                </p>

                <div className="flex items-center gap-2">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-5" />
                   <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Posted on Google</span>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviewData.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveReview(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${activeReview === idx ? 'w-8 bg-[#005acd]' : 'w-2 bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
          <a
            href="https://www.google.com/search?q=T%26S+TOURS+AND+RENT+A+CAR+Reviews#lrd=0x3ae25309f44b9d4f:0x846c638a164a8a2c,3,,,,"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs px-6 py-3 border-2 border-[#EAB875] text-[#EAB875] font-bold rounded-lg text-center hover:bg-[#EAB875] hover:text-white transition-all shadow-md"
          >
            Write a Review
          </a>
          <a
            href="https://share.google/FnzNHxLyikDyFWYGC"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs px-6 py-3 bg-[#005acd] text-white font-bold rounded-lg text-center hover:bg-[#003d8f] transition-all shadow-lg"
          >
            View All on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;