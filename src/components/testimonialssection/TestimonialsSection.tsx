import testiMonialLeft from 'assets/images/resource/testimonial-left.png';
import testimonialRight from 'assets/images/resource/testimonial-right.png';
import testimonilaContent from 'common/data/testimonial';

import Slider from 'react-slick';
const TestimonialsSection = () => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
  };
  return (
    <section className="testimonial-section-two">
      <div className="container-fluid">
        <div className="testimonial-left">
          <img src={testiMonialLeft} alt="testimonial" />
        </div>
        {/* End left img group */}

        <div className="testimonial-right">
          <img src={testimonialRight} alt="testimonial" />
        </div>
        {/* End right img group */}

        <div className="sec-title text-center">
          <h2>Testimonials From Our Customers</h2>
          <div className="text">Lorem ipsum dolor sit amet elit, sed do eiusmod tempor</div>
        </div>
        {/* <!-- Sec Title --> */}

        <div className="carousel-outer" data-aos="fade-up">
          <div className="testimonial-carousel">
            {/* <Testimonial2 /> */}
            <Slider {...settings} arrows={false}>
              {testimonilaContent.slice(3, 6).map((item) => (
                <div className="testimonial-block-two" key={item.id}>
                  <div className="inner-box">
                    <div className="thumb">
                      <img src={item.avatar} alt="testimonial" />
                    </div>
                    <h4 className="title">{item.feedback}</h4>
                    <div className="text">{item.feedbackText}</div>
                    <div className="info-box">
                      <h4 className="name">{item.name}</h4>
                      <span className="designation">{item.designation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          {/* <!-- Testimonial Carousel --> */}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
