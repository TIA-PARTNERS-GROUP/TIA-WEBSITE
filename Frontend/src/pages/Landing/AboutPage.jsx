import HeaderComponent from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/Footer";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { motion } from "framer-motion";

const AboutPage = () => {
  
  return (
    <div className="relative overflow-hidden">

      <section className="py-12 text-center bg-gray-50">
        <h3 className="text-4xl font-bold">About TIA</h3>
      </section>

      <section className="container mx-auto px-4 py-12 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.65 }}
            variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: { opacity: 1, x: 0 }
                    }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h4 className="text-3xl font-semibold mb-4">
              A WORD FROM THE FOUNDER, MARK STECHER
            </h4>
            <p className="mb-6 space-y-4 text-gray-700 leading-relaxed">
              I have been in business for more than 30 years and over that time, 
              I have made more mistakes than I care to remember. Luckily, I see 
              these mistakes as learning experiences that make me stronger.
              About 6 years ago, I started writing a book about these learning 
              experiences. I very quickly realised that if I were to put various 
              things I had learned through experience and the copious training 
              I had undertaken, the book could be a very useful guide for small 
              business owners looking to do things a bit faster than I had done.
              The book was about things that I would do differently – it wasn't 
              theoretical, it was based on hard and sometimes costly and painful 
              experiences. Each of the 25 chapters in the book is the precursor 
              to another more detailed book and related short course.
              One chapter is called 'Partner To Profit' and it is based on my 
              experience of how powerful and beneficial partnerships can be for 
              any small business.
            </p>

            <h4 className="text-3xl font-semibold mb-4">My Partnership Journey</h4>
            <p className="space-y-4 text-gray-700 leading-relaxed">
              When I started my first business, it was just me, however within a 
              few years I started getting more staff and eventually ended up with 
              a team of around 25. There was a lot of work and life was good. In 
              those days we were riding the crest of the wave and things were 
              great – it seemed we could do no wrong.
              As with many things in life and business there are cycles and 
              eventually the wheel turned and there was a downturn in the economy, 
              we started getting some very tough competition and lost a lot of 
              money on a few projects. Within a very short period, money had 
              almost dried up and paying wages became an absolute nightmare.
              Staff could see the writing on the wall and many left. We somehow 
              weathered the storm and shortly after, I decided to split the 
              business up and two of my staff took over different divisions of 
              the business and I effectively downsized to only four local staff 
              including myself in one of the remaining divisions.
              Cashflow was easier to manage, however as things picked up we were 
              getting more work than we could deal with. I was very hesitant to 
              employ more staff again so I started seeking out other small 
              businesses and individuals that I could partner with to help with 
              the workload.
            </p>
          </motion.div>

          <motion.div 
            className="flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.65 }}
            variants={{
                      hidden: { opacity: 0, x: 50 },
                      visible: { opacity: 1, x: 0 }
                    }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src="https://tiapartners.com.au/assets/images/mark-pic.png"
              alt="Founder Mark Stecher"
              className="rounded-lg shadow-md max-w-xl"
            />
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 bg-white">
        <div className="space-y-6">
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.65 }}
            variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="space-y-4 text-gray-700 leading-relaxed">
              Very quickly I realised that this was a great model. I could do 
              work anywhere in the state without having to send staff to sites 
              that were up to a 5-hour drive away. I could get my partners to 
              quote on jobs and I would put a margin on top so that I would 
              always make a profit on jobs. The best part was that I was only 
              paying partners when they were working and generating income.
              In addition to all that, it was the most productive and cheapest 
              form of marketing that I had ever engaged in. As an example, 
              during the 2 to 3 years of COVID when everyone else was struggling, 
              we generated over $1m worth of business through our established 
              partnerships.
            </p>
            <p className="space-y-4 text-gray-700 leading-relaxed">
              As a result of this success, I started visualising an organisation 
              that was specifically dedicated to bringing other businesses like 
              mine together, across the country. I imagined tapping into that 
              collective would help my business no end and it would also help 
              other businesses in the same way. It was a win for everyone.
            </p>
          </motion.div>
          
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.65 }}
            variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h4 className="text-3xl font-semibold">Technology Integrators Australia</h4>
            <p className="space-y-4 text-gray-700 leading-relaxed">
              In 2018, I started formulating the organisation that is now known 
              as Technology Integrators Australia or TIA. In those days the 
              concept was to bring small technology businesses together into 
              groups of between 12 and 18 businesses and facilitate connections. 
              These groups would be location based and also be able to connect 
              to other members locally, state-wide and nationally.
              Over the next 18 months or so we ran a number of meetings and 
              continued to develop the concept. One of the huge challenges was 
              to ensure that there was enough value in the groups that people 
              would continue to come back – small business owners tend to be 
              extremely busy and getting them to dedicate time even a couple of 
              hours a week for this type of activity, is very challenging.
              These events proved to be very popular, and participants made some 
              great connections and did good business. By the end of 2019 we were 
              ready with a basic version of the concept and had a celebratory 
              launch in Melbourne with the idea of a setting up the first real 
              events in early 2020.
            </p>
            <p className="space-y-4 text-gray-700 leading-relaxed">
              Then COVID came along and put a huge spanner in the works…
            </p>
            <p className="space-y-4 text-gray-700 leading-relaxed">
              We had already started working on an online version, so I got our 
              Creative Media development team to turn their full efforts to 
              creating a fully online version of the concept. Over the next three 
              years the TIA concept has developed into six core modules each with 
              a number of submodules and the brief given to the development team 
              was that it need to fulfill three key principles:
              The Minimum Viable Product (MVP) of TIA is scheduled for launch in 
              Q2 of 2023 and subsequent releases over the next 2 quarters of 2023 
              will fulfill the first version of the platform. There are a list of 
              enhancements that will be rolled into future releases and as new 
              members come on board we will be inviting them to make suggestions 
              as to how to improve the platform so development will continue into 
              the foreseeable future.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.65 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="p-6 border rounded-lg shadow-sm"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src="https://tiapartners.com.au/assets/images/icon1.svg"
                alt="Intuitive Icon"
                className="mb-4 w-12"
              />
              <h5 className="font-semibold mb-2">Intuitive and Easy to Use</h5>
            </motion.div>
            <motion.div 
              className="p-6 border rounded-lg shadow-sm"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src="https://tiapartners.com.au/assets/images/icon2.svg"
                alt="Engaging Icon"
                className="mb-4 w-12"
              />
              <h5 className="font-semibold mb-2">Engaging, Interactive & Entertaining</h5>
            </motion.div>
            <motion.div
              className="p-6 border rounded-lg shadow-sm"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src="https://tiapartners.com.au/assets/images/icon3.svg"
                alt="Useful Icon"
                className="mb-4 w-12"
              />
              <h5 className="font-semibold mb-2">Useful and Valuable</h5>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="space-y-6"
                        initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.65 }}
            variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-gray-700 leading-relaxed">
              The Minimum Viable Product (MVP) of TIA is scheduled for launch in 
              Q2 of 2023 and subsequent releases over the next 2 quarters of 2023 
              will fulfill the first version of the platform. There are a list of 
              enhancements that will be rolled into future releases and as new 
              members come on board we will be inviting them to make suggestions 
              as to how to improve the platform so development will continue into 
              the foreseeable future.
            </p>
            <div>
            <p className="text-2xl font-semibold mt-6">
              Mark Stecher
            </p>
            <p className="text-lg font-medium pb-24">
              Founder, TIA
            </p>
            </div>
          </motion.div>
        </div>
      </section>

      
    </div>
  );
};

export default AboutPage;
