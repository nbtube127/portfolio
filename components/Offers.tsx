import React from "react";
import { RxCopy } from "react-icons/rx";
import { SiAntdesign, SiEditorconfig } from "react-icons/si";
import { FaChartPie, FaConnectdevelop, FaEdit, FaPaintBrush } from "react-icons/fa";
import OfferCard from "./OfferCard";
import { TbTestPipe, TbTruckDelivery } from "react-icons/tb";

const Offers = () => {
  return (
    <div className="bg-[#0F1113] text-white py-28">
      <div>
        <h1 className="text-3xl uppercase tracking-[6px] font-semibold text-center text-white">
          Our Services Includes.
        </h1>
        <div className="w-full px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20">
          <OfferCard
            title="DELIVERY"
            subTitle="Delivering high-quality iron pipes swiftly, reliably, and efficiently, with a focus on customer satisfaction and timely service."
            Icon={TbTruckDelivery}
          />
          <OfferCard
            title="CUSTOMISATION"
            subTitle="We offer tailored customization and precision, ensuring reliability for every order with our expert team."
            Icon={FaEdit}
          />
          <OfferCard
            title="SAMPLE DELIVERY"
            subTitle="Get a sample pipe before placing your full order to ensure the perfect fit for your project needs."
            Icon={TbTestPipe}
          />
          <OfferCard
            title="COLORING"
            subTitle="Choose from a range of vibrant colors for our durable iron pipes, adding both strength and style to your projects."
            Icon={FaPaintBrush}
          />
        </div>
      </div>
    </div>
  );
};

export default Offers;
