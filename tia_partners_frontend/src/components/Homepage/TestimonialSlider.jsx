import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Dennis Frank',
    tier: 'Connect',
    company: 'Complex Technology',
    image: 'https://tiapartners.com.au/assets/images/testi.png',
    quote:
      'TIA has been a great platform for building my business, I made over $40,000 in the first 12 months and it has opened up a heap of new opportunities. Business is booming and I am now looking for more partners.',
  },
  {
    name: 'James Garcia',
    tier: 'Connect',
    company: 'Complex Technology',
    image: 'https://tiapartners.com.au/assets/images/testi.png',
    quote:
      'TIA has helped me grow my network quickly and efficiently. I\'ve made lasting business relationships and gained more clients through the platform.',
  },
  {
    name: 'Blair Jereza',
    tier: 'Connect',
    company: 'Complex Technology',
    image: 'https://tiapartners.com.au/assets/images/testi.png',
    quote:
      'I was skeptical at first, but TIA delivered. The mastermind panels alone were worth it — insightful and actionable business advice every time.',
  },
  {
    name: 'Mark Stecher',
    tier: 'Connect',
    company: 'Complex Technology',
    image: 'https://tiapartners.com.au/assets/images/testi.png',
    quote:
      'Within a few months of joining, I landed several high-value contracts. TIA is a no-brainer for anyone serious about business.',
  },
];

export default function TestimonialSlider() {
  return (
    <div className="py-12 bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={true}
          a11y={{
            enabled: true,
            prevSlideMessage: 'Previous testimonial',
            nextSlideMessage: 'Next testimonial',
          }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="rounded-xl shadow-sm p-8 h-full flex flex-col justify-between">
                <div className="flex items-center gap-5 mb-6">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                  <div>
                    <h5 className="font-semibold text-white text-lg">
                      {t.name}{' '}
                      <span className="text-sm text-blue-700 font-medium ml-2 bg-blue-50 px-2 py-1 rounded">
                        {t.tier}
                      </span>
                    </h5>
                    <p className="text-sm text-white">{t.company}</p>
                  </div>
                </div>
                <blockquote className="text-white text-base leading-relaxed italic before:content-['\'] after:content-['\']">
                  {t.quote}
                </blockquote>
              </div>
            </SwiperSlide>
          ))}
          
          <div className="swiper-button-prev !text-blue-500 !left-0 after:!text-xl"></div>
          <div className="swiper-button-next !text-blue-500 !right-0 after:!text-xl"></div>
        </Swiper>
      </div>
    <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm opacity-50"></div>
    </div>
  );
}
