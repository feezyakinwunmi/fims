import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SlideInText from './components/textslide';
import pic1 from '@/public/pic1.jpg'
import pic2 from '@/public/pic2.jpg'
import fimock from '@/public/fimock.jpg'



export const metadata: Metadata = {
    title:
      "Fims",
    description:
      "Inventory management system",
  };
  

  const Home = async () => {
    return (
        <div className="w-full mt-[130px] flex  flex-col mb-10 transition-all duration-500">
          {/* Hero Section */}
    
    
          {/* Quality Section */}
          <section className="w-full  bg-white  py-16 transition-all duration-500">
            <article className="w-[90%] md:w-[85%] mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center py-16 lg:py-20 gap-10">
              <div className="w-[90%] lg:w-[48%] xl:w-[45%]">
                <Image
                  src={fimock}
                  className="w-full max-h-auto"
                  alt="Farmer at Eweko"
                  loading="eager"
                />
              </div>
    
              <div className="w-[90%] lg:w-[48%] xl:w-[45%] flex flex-col gap-6">
                <SlideInText
                  text={
                    <div className="text-2xl sm:text-3xl sm3:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center lg:text-left">
                      <h1 className="leading-[40px] sm3:leading-[50px] md2:leading-[65px] lg:leading-[50px] xl:leading-[60px]">
                      Accurate, Reliable and {' '}
                        <span className="text-eweko_green_light">
                        Efficient Inventory Management
                        </span>
                      </h1>
                    </div>
                  }
                  direction="right"
                />
    
                <SlideInText
                  text={
                    <div className="text-center lg:text-left flex flex-col justify-center lg:justify-start items-center lg:items-start gap-6 leading-[35px]">
                      <p className="text-gray-700">
                        At <span className="text-black">Fims</span>,you can make  Inventory Tracking and Optimize Systems
                      </p>
                      <p className="text-gray-700">
                      Streamlined inventory processes enhance productivity and reduce waste
                      </p>
                      <Link
                      rel='prefetch'
                        className="rounded-full px-12 py-4 bg-eweko_green_light text-black font-bold block w-fit hover:bg-black hover:text-eweko_green_light transition-all duration-500"
                        href="/auth/buyer"
                      >
                        Optimize Now
                      </Link>
                    </div>
                  }
                  direction="right"
                />
              </div>
            </article>
          </section>
    
          {/* Agribusiness Support Section */}
          <section className="w-full bg-lime-100 py-16 transition-all duration-500">
            <article className="w-[90%] md:w-[85%] mx-auto flex flex-col lg:flex-row-reverse justify-center lg:justify-between items-center py-16 lg:py-20 gap-10">
              <div className="w-[90%] lg:w-[48%] xl:w-[45%]">
                <Image
                  src={pic1}
                  width={500}
                  height={300}
                  className="w-full max-h-auto"
                  alt="Agribusiness Support"
                  loading="eager"
                />
              </div>
              <div className="w-[90%] lg:w-[48%] xl:w-[45%] flex flex-col gap-6">
                <SlideInText
                  text={
                    <div className="text-2xl sm:text-3xl sm3:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center lg:text-left">
                      <h1 className="leading-[40px] sm3:leading-[50px] md2:leading-[65px] lg:leading-[50px] xl:leading-[60px]">
                      Customized Inventory Management Solutions for Farms{' '}
                        <span className="text-eweko_green_light">for Farmers</span>
                      </h1>
                    </div>
                  }
                  direction="left"
                />
                <SlideInText
                  text={
                    <div className="text-center lg:text-left flex flex-col justify-center lg:justify-start items-center lg:items-start gap-6 leading-[35px]">
                      <p className="text-gray-700">
                      Aligning farm needs with inventory management to promote efficiency and reduce stock discrepancies
                      </p>
                      <p className="text-gray-700 ">
                        Farmers can join{' '}
                        <span className="text-black">Fims</span> for
                        Inventory tracking, resource allocation, demand forecasting, and operational insights
                      </p>
                      <Link
                      rel='prefetch'
                        className="rounded-full px-12 py-4 hover:text-eweko_green_light bg-eweko_green_light text-black font-bold block w-fit hover:bg-black transition-all duration-500"
                        href="/auth/farmer"
                      >
                        Get Started
                      </Link>
                    </div>
                  }
                  direction="left"
                />
              </div>
            </article>
          </section>
    
          {/* Fresh Supply Section */}
          <section className="w-full  py-16 transition-all duration-500">
            <article className="w-[90%] md:w-[85%] mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center py-16 lg:py-20 gap-10">
              <div className="w-[90%] lg:w-[48%] xl:w-[45%]">
                <Image
                  src={pic2}
                  className="w-full max-h-auto"
                  alt="Fresh Supply"
                  loading="eager"
                />
              </div>
              <div className="w-[90%] lg:w-[48%] xl:w-[45%] flex flex-col gap-6">
                <SlideInText
                  text={
                    <div className="text-2xl sm:text-3xl sm3:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center lg:text-left">
                      <h1 className="leading-[40px] sm3:leading-[50px] md2:leading-[65px] lg:leading-[50px] xl:leading-[60px]">
                      Precise Inventory Delivery <br /> When You Need It
                      </h1>
                    </div>
                  }
                  direction="right"
                />
                <SlideInText
                  text={
                    <div className="text-center lg:text-left flex flex-col justify-center lg:justify-start items-center lg:items-start gap-6 leading-[35px]">
                      <p className="text-gray-700">
                      We ensure timely delivery of inventory items with real-time tracking from storage to your operation
                      </p>
                      <Link
                      rel='prefetch'
                        className="rounded-full px-12 py-4 hover:text-eweko_green_light bg-eweko_green_light text-black font-bold block w-fit hover:bg-black transition-all duration-500"
                        href="/auth/buyer"
                      >
                        Sign Up
                      </Link>
                    </div>
                  }
                  direction="right"
                />
              </div>
            </article>
          </section>
    
          {/* Trust Section */}
          <section className="bg-white text-center py-16 gap-2 mb-16">
            <h1 className="text-2xl ssm:text-3xl lg:text-4xl font-bold text-eweko_green_light mb-10 ">
            We are building RELIABILITY in Inventory Management
            </h1>
    
            <Link
            rel='prefetch'
              className="px-12 py-4 hover:text-eweko_green_light   bg-eweko_green_light text-black bg-eweko_gtext-eweko_green_light  rounded-full  hover:bg-black  p-2 w-fit font-bold transition-all duration-500"
              href="/auth"
            >
              Register Now
            </Link>
          </section>
          {/* Slider Section */}
    
        </div>
      );
}

export default Home;
