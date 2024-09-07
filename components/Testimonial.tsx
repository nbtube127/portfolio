import React, { useState } from "react";
import Slider from "react-slick";

const Testimonial = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev: any, next: any) => {
      setDocActive(next);
    },

    appendDots: (dots: any) => (
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
      >
        <ul
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i: any) => (
      <div
        style={
          i === dotActive
            ? {
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              cursor: "pointer",
              border: "1px solid #F7D449",
            }
            : {
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              cursor: "pointer",
              border: "1px solid #aeaeae",
            }
        }
      ></div>
    ),
  };
  return (
    <section
      id="testimonial"
      className="text-white bg-[#0F1113] py-20 flex justify-center items-center"
    >
      <div className="w-[500px] md:w-[620px] h-60 px-4">
        <div>
          <Slider {...settings}>
            <div>
              <p className="text-xl text-textColor text-center leading-8">
                <span className="text-white">Pankaj -</span> NbTube's iron tubes are top-notch—durable and reliable.
                Their exceptional customer service and quick delivery make them our go-to supplier.
              </p>
            </div>
            <div>
              <p className="text-xl text-textColor text-center leading-8">
                <span className="text-white">Raj Dairy -</span> We trust NbTube for all our industrial projects.
                Their high-quality iron tubes and commitment to precision consistently exceed our expectations.
              </p>
            </div>
            <div>
              <p className="text-xl text-textColor text-center leading-8">
                <span className="text-white">MM Builders -</span> NbTube has been a game-changer for us.
                Their iron tubes are built to last, and their professionalism ensures smooth, hassle-free transactions.
              </p>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
