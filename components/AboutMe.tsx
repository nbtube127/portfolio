import AboutList from "./AboutList";

const AboutMe = () => {
  return (
    <section
      id="about"
      className="w-full h-full bg-black text-white py-28 px-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-16">
        <h1 className="text-3xl uppercase font-semibold text-center">
          About us.
        </h1>
        <p className="text-xl md:text-3xl font-medium md:leading-relaxed text-textColor">
          <span className="font-bold tracking-wider text-white">Nbtubeindia</span>{" "} is a leading provider of high-quality
           industrial iron pipes across India.Our portfolio website highlights our rich company history, experienced team, diverse product range,
          industry expertise, commitment to quality assurance, latest news, contact details.
        </p>
        {/* <div className="w-[700px] grid grid-cols-1 md:grid-cols-2 gap-8">
          <AboutList title="Web design" />
          <AboutList title="Graphic & print" />
          <AboutList title="iOS design" />
          <AboutList title="Front-end development" />
          <AboutList title="User experience" />
          <AboutList title="Branding" />
          <AboutList title="Back-end development" />
          <AboutList title="Responsive" />
          <AboutList title="Wordpress Website" />
        </div> */}
      </div>
    </section>
  );
};

export default AboutMe;
