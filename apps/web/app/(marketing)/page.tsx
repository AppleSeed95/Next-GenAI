'use client'
import Image from 'next/image';
import Link from 'next/link';

import {
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  Lock,
  Sparkle,
} from 'lucide-react';

import { PricingTable } from '@kit/billing-gateway/marketing';
import { Button } from '@kit/ui/button';
import { Heading } from '@kit/ui/heading';
import { Trans } from '@kit/ui/trans';
import { cn } from '@kit/ui/utils';

import billingConfig from '~/config/billing.config';
import pathsConfig from '~/config/paths.config';
import { withI18n } from '~/lib/i18n/with-i18n';
import { motion, useAnimation } from 'framer-motion';

const items = [
  {
    name: 'Benny R',
    role: 'Solopreneur',
    image: '/Portrait.jpeg',
    text: 'Honestly the best content conversion tool I\'ve used so far. Happy customer.',
  },
  {
    name: 'Travis M',
    role: 'Marketer',
    image: '/Portrait.jpeg',
    text: 'They ship insanely fast. I\'ve got the fastest feature implementation based on my suggestion ever.',
  },
  {
    name: 'Dennis',
    role: 'Founder',
    image: '/Portrait.jpeg',
    text: 'They ship insanely fast. I\'ve got the fastest feature implementation based on my suggestion ever',
  },
  {
    name: 'Aleks J',
    role: 'Marketer',
    image: '/Portrait.jpeg',
    text: 'Amazing experience! The team exceeded all expectations.',
  },

];

function Home() {
  return (
    <div className={'mt-4 flex flex-col space-y-24 py-16'}>
      <div className='px-20'>

        {/* ----nav */}

        <div className="fixed top-2 z-50 w-full px-2  md:top-8">
          {/* <div className="flex justify-center w-full">
            <div className="flex items-center mx-auto h-12 rounded-full border  bg-white/60 px-1 pl-4 shadow-lg backdrop-blur-md">
              <div className="flex w-full justify-between gap-6">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-wider">CopyCopter</span>
                </Link>
                <div className="flex w-full items-center justify-end gap-4 px-4">
                  <button>
                    {
                      !isDarkMode &&
                      <FaRegMoon onClick={() => setIsDarkMode(true)} />
                    }
                    {
                      isDarkMode &&
                      <FaMoon onClick={() => setIsDarkMode(false)} />
                    }
                  </button>
                  <Link href="/home#pricing" className="hidden sm:flex text-sm text-gray-700 hover:underline">Pricing</Link>
                  <Link href="/home#faq" className="hidden sm:flex text-sm text-gray-700 hover:underline">FAQ</Link>
                  <Link href="/changelog" className="hidden sm:flex text-sm text-gray-700 hover:underline">Changelog</Link>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block h-5 border-r border-gray-200"></div>
                  <div className="flex items-center gap-3 text-xs">
                    <Link href="/login">
                      <button className="hidden sm:block h-10 md:h-9 px-4 py-2 rounded-full border text-sm hover:bg-gray-200">
                        Login
                      </button>
                    </Link>
                    <Link href="/signup">
                      <button className="h-10 w-24 px-4 py-2 rounded-full bg-black text-white flex items-center justify-center">
                        <span className="group-hover:-translate-x-2">Start Now</span>
                        <span className="absolute right-2 translate-x-full opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">
                          <svg stroke="currentColor" fill="currentColor" viewBox="0 0 256 256" height="1em" width="1em">
                            <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
                          </svg>
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>









        <section
          id="hero"
          className="flex min-h-[70dvh] w-full max-w-full flex-col items-stretch justify-center gap-4 py-10 md:flex-row md:py-12 xl:py-32"
        >

          <div className="relative md:pl-10  flex w-full flex-col items-center justify-center gap-4 px-4 text-center md:w-8/12 md:items-start md:gap-4 lg:gap-6 xl:gap-10">
            <div className="w-full space-y-2 text-4xl font-bold dark:text-white text-[#444240] sm:text-5xl">
              <h1 className="text-center md:text-start">
                Automate your
                <br />
                <span className="font-normal">faceless video</span> channel
              </h1>
            </div>
            <div className="dark:text-white w-full max-w-xl font-light text-[#444240]">
              <p className=" text-center md:text-start">
                Create AI Videos in minutes, post automatically on your Social Media. Our AI creation tool creates{' '}
                <span className="font-medium">viral AI videos</span> for you.
              </p>
            </div>
            <div className="dark:text-white w-full max-w-xl font-light text-[#444240]">
              <ul className="space-y-1 text-start">
                <li >⏱️ <span className="font-bold">FAST</span> - High quality video in 5 minutes</li>
                <li>🎞️ <span className="font-bold">EASY</span> - Share directly to Social Media</li>
                <li>👄 <span className="font-bold">UNIQUE</span> - 5 styles, 45 voices - for every niche</li>
                <li>🎬 <span className="font-bold">HIGH QUALITY</span> - images with extra quality refinement</li>
                <li>👀 Videos that actually <span className="font-bold">GET VIEWS</span></li>
              </ul>
            </div>
            <div className="flex w-full max-w-lg flex-col items-center rounded-lg border bg-white/40 p-4 pb-2 shadow-[5px_5px_30px_rgba(190,190,190,0.15),-5px_-5px_30px_rgba(255,255,255,0.15)] backdrop-blur-sm">
              <form className="relative w-full space-y-8">
                <div className="space-y-2">
                  <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
                    <input
                      className="flex border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-10 w-full rounded-full focus-visible:ring-blue-600 focus-visible:ring-offset-0 md:h-10"
                      placeholder="your@email.com"
                      name="email"
                      defaultValue=""
                    />
                    <button
                      className="group relative items-center justify-center whitespace-nowrap text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground px-4 py-2 flex h-10 w-full flex-grow gap-2 rounded-full bg-blue-600 hover:bg-blue-500 sm:w-5/12 overflow-hidden"
                      type="submit"
                    >
                      <span className=" transition-all duration-150 group-hover:-translate-x-2">Start Now</span>
                      <span className="absolute right-2 translate-x-full opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 256 256"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground w-full"></p>
                </div>
              </form>
              <p className="w-full text-end text-xs text-muted-foreground">
                By signing up you agree to our
                <a className="text-black hover:underline" href="/legal/terms-and-conditions">
                  terms
                </a>.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
              <div className="flex justify-between">
                <a
                  href="https://craftgen.ai/"
                  target="_blank"
                  className="mr-[-8px] h-7 w-7 overflow-hidden rounded-full border-[3px] border-white transition-all duration-150 hover:scale-110 hover:border-blue-600"
                >
                  <img
                    alt="Testimonial 1 from Neco"
                    width={28}
                    height={28}
                    decoding="async"
                    srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fneco-profile.271152fe.jpg&w=32&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fneco-profile.271152fe.jpg&w=64&q=75 2x"
                    src="Portrait.jpeg"
                  />
                </a>
                {/* Repeat similar structure for other testimonial images */}
              </div>
              <div className="dark:text-white flex gap-1 text-xs text-muted-foreground">
                Join <span className="flex gap-2 font-bold">500+</span> Happy Creators
              </div>
              <div className="flex-center gap-6 md:hidden">
                <img
                  style={{ width: '32px', height: '32px' }}
                  className="rounded-sm"
                  src=""
                  width={32}
                  height={32}
                  alt="TikTok Logo"
                />
                <img
                  style={{ minWidth: '34px', width: '34px' }}
                  className="rounded-sm"
                  src="/_next/static/media/yt_icon_rgb.806133c0.png"
                  width={34}
                  alt="YouTube Logo"
                />
                <img
                  style={{ width: '32px', height: '32px' }}
                  className="rounded-sm"
                  src="/_next/static/media/instagram.875f977f.svg"
                  width={32}
                  height={32}
                  alt="Instagram Logo"
                />
              </div>
            </div>
            <a
              href="https://www.producthunt.com/posts/copycopter?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-copycopter"
              target="_blank"
            >

            </a>
          </div>

          <div className="dark:text-white flex-center relative w-full flex-col justify-start gap-2 md:w-4/12 md:gap-20 lg:justify-center xl:pt-10">
            <div id="first-video" className=" absolute flex  -translate-y-6 translate-x-24 flex-col  gap-4 md:translate-x-36  ">

              <div className="dark:text-white flex w-full translate-x-12 rotate-12  items-end gap-1 text-xs font-bold">
                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" className="h-6 w-6 min-w-[24px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M212,32a12,12,0,0,1-12,12,84.09,84.09,0,0,0-84,84v67l27.51-27.52a12,12,0,0,1,17,17l-48,48a12,12,0,0,1-17,0l-48-48a12,12,0,0,1,17-17L92,195V128A108.12,108.12,0,0,1,200,20,12,12,0,0,1,212,32Z" /></svg>
                <p className="text-start">Get traffic<br />with faceless videos</p>
              </div>

              <div className="dark:text-white rotate-12 scale-90 rounded-md shadow-xl  transition-all duration-300  hover:scale-105 md:scale-100 ">
                <div className="relative h-[280px] w-[160px]  overflow-hidden rounded-md  border border-green-500 "><div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-white" />
                  <img alt="BannerBear Video Thumbnail z-0" loading="lazy" width={180} height={314} decoding="async" data-nimg={1} style={{ color: 'transparent', opacity: '0.9', objectFit: 'fill' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faiko.b9dcb216.jpg&w=384&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faiko.b9dcb216.jpg&w=384&q=75" />
                </div>
              </div>
            </div>
            <div id="second-video" className="dark:text-white absolute flex  -translate-x-24 -translate-y-10  flex-col gap-4 opacity-90  md:-translate-x-32"><div className=" flex w-full -translate-x-4 -rotate-12  items-end gap-1 text-xs font-bold"><svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" className="h-6 w-6 min-w-[24px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M212,32a12,12,0,0,1-12,12,84.09,84.09,0,0,0-84,84v67l27.51-27.52a12,12,0,0,1,17,17l-48,48a12,12,0,0,1-17,0l-48-48a12,12,0,0,1,17-17L92,195V128A108.12,108.12,0,0,1,200,20,12,12,0,0,1,212,32Z" /></svg><p className=" text-start">Boost your SEO<br /> with videos</p></div>
              <div className="-rotate-12 scale-90 rounded-md  shadow-xl  transition-all duration-300 hover:scale-105 md:scale-100"><div className="h-[280px] w-[160px] overflow-hidden rounded-md  border border-green-500 ">
                <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-white" />
                <img alt="Audi Video" loading="lazy" width={180} height={314} decoding="async" data-nimg={1} style={{ color: 'transparent', opacity: '0.9' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faudi-cover.a2065d6e.jpg&w=384&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faudi-cover.a2065d6e.jpg&w=384&q=75" />tbpCover</div></div></div><div id="main-video" className="   flex flex-col gap-4 transition-all duration-300"><div className=" rotate-3 scale-95  transition-all  duration-300 hover:scale-110 md:scale-105 "><div className=" right-16 h-[314px]  w-[180px]  overflow-hidden  rounded-md border border-violet-800">{/*$*/}<video poster="/images/lp/tbd-cover.jpg" loop muted autoPlay playsInline className aria-label="Video Player"><source src="https://delivery.copycopter.ai/lpexamples%2Fdiving.mp4" type="video/mp4" /></video>{/*/$*/}</div></div><div className="flex w-full items-end justify-center gap-1  text-xs font-bold md:-translate-x-16"><p className="text-right">Engage your audience <br />with next-gen content</p> <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" className="h-8 w-8 min-w-[32px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M208.49,88.49a12,12,0,0,1-17,0L164,61v67A108.12,108.12,0,0,1,56,236a12,12,0,0,1,0-24,84.09,84.09,0,0,0,84-84V61L112.49,88.49a12,12,0,0,1-17-17l48-48a12,12,0,0,1,17,0l48,48A12,12,0,0,1,208.49,88.49Z" /></svg></div></div><div className="hidden flex-col items-center justify-center gap-2 md:absolute md:top-10 md:flex" style={{ top: "-15%" }}><p className="hidden w-full text-center text-sm font-bold lg:block">Perfect for</p><div className="flex-center gap-6"><img style={{ width: '42px', height: '42px' }} className="rounded-sm" src="https://copycopter.ai/_next/static/media/TikTok-square.7476ecb4.svg" width={42} height={42} alt="TikTok Logo" /> <img style={{ minWidth: '42px', width: '42px' }} className="rounded-sm" src="https://copycopter.ai/_next/static/media/yt_icon_rgb.806133c0.png" width={42} alt="YouTube Logo" /> <img style={{ width: '42px', height: '42px' }} className="rounded-sm" src="https://copycopter.ai/_next/static/media/instagram.875f977f.svg" width={42} height={42} alt="Instagram Logo" /></div></div></div>
        </section>





        {/* ------------Animation----------- */}


        <section className='  w-full flex justify-center' >

          <div className="min-h-[20%] w-[80%] flex items-center justify-center">
            {/* <Head>
  <title>Infinite Scrolling Carousel</title>
  <meta name="description" content="An infinite scrolling carousel with Framer Motion in Next.js" />
  <link rel="icon" href="/favicon.ico" />
</Head> */}

            <main className="p-4">
              <div className="overflow-hidden relative">
                <motion.div
                  className="flex"
                  initial={{ x: 0 }}
                >
                  {items.map((item, index) => (
                    <div key={index} className="shadow-neumorphic flex flex-row items-center gap-2 rounded-lg border bg-white py-1 pl-2 pr-3 ml-2">
                      <Image
                        alt={`Avatar of ${item.name}`}
                        src={item.image}
                        width={32}
                        height={32}
                        className="h-8 w-8 min-w-[32px]  rounded-full border object-cover"
                        priority
                      />
                      <div className="w-full">
                        <div className="flex items-center gap-1 text-sm font-semibold text-card-foreground">
                          {item.name} • {item.role}
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <svg
                                key={index}
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 256 256"
                                className="text-yellow-500"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <div className="text-start font-light text-gray-700">{item.text}</div>
                      </div>
                    </div>

                  ))}
                </motion.div>
              </div>
            </main>
          </div>
        </section>







        <main className="dark:text-white  flex min-h-screen flex-col items-center justify-between p-24">
          <section id="examples" className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 py-12 md:gap-12 md:px-8">
            <div className=" flex flex-col items-center gap-2">
              <p className="text-center text-sm">Use Cases</p>
              <h3 className="dark:text-white w-full text-center text-3xl font-bold text-[#444240]">
                Create <span className="font-light">unique</span> faceless videos for every niche
              </h3>
              <p className=" text-center">CopyCopter is versatile and can be used for a wide range of content types. Find your niche and master it.</p>
            </div>
            <div className="flex-center w-full flex-col gap-6">
              <div className="grid w-full grid-cols-3 gap-4 md:grid-cols-6">
                <div className="group relative">
                  <div className="shadow-neumorphic rounded-md">
                    <video playsInline muted loop autoPlay className="rounded-md border-2 border-blue-500 transition-all duration-300 hover:scale-105" style={{ objectFit: 'cover' }}>
                      <source src="https://delivery.copycopter.ai/lpexamples%2Fdiving.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <p className="dark:text-white pt-2 text-center text-[#444240]">True Story</p>
                </div>
                <div className="group relative">
                  <div className="shadow-neumorphic rounded-md">
                    <video playsInline muted loop autoPlay className="rounded-md border-2 border-blue-500 transition-all duration-300 hover:scale-105" style={{ objectFit: 'cover' }}>
                      <source src="https://delivery.copycopter.ai/lpexamples%2Fdiving.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <p className="dark:text-white pt-2 text-center text-[#444240]">True Story</p>
                </div>
                <div className="group relative">
                  <div className="shadow-neumorphic rounded-md">
                    <video playsInline muted loop autoPlay className="rounded-md border-2 border-blue-500 transition-all duration-300 hover:scale-105" style={{ objectFit: 'cover' }}>
                      <source src="https://delivery.copycopter.ai/lpexamples%2Fdiving.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <p className="dark:text-white pt-2 text-center text-[#444240]">Book Review</p>
                </div>
                <div className="group relative">
                  <div className="shadow-neumorphic rounded-md">
                    <video playsInline muted loop autoPlay className="rounded-md border-2 border-blue-500 transition-all duration-300 hover:scale-105" style={{ objectFit: 'cover' }}>
                      <source src="https://delivery.copycopter.ai/lpexamples%2Faiko.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <p className="dark:text-white pt-2 text-center text-[#444240]">Bed Time Story</p>
                </div>
                <div className="group relative">
                  <div className="shadow-neumorphic rounded-md">
                    <video playsInline muted loop autoPlay className="rounded-md border-2 border-blue-500 transition-all duration-300 hover:scale-105" style={{ objectFit: 'cover' }}>
                      <source src="https://delivery.copycopter.ai/lpexamples%2Freligion.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <p className="dark:text-white pt-2 text-center text-[#444240]">Religion</p>
                </div>
                <div className="group relative">
                  <div className="shadow-neumorphic rounded-md">
                    <video playsInline muted loop autoPlay className="rounded-md border-2 border-blue-500 transition-all duration-300 hover:scale-105" style={{ objectFit: 'cover' }}>
                      <source src="https://delivery.copycopter.ai/lpexamples%2Fcreatures.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <p className="dark:text-white pt-2 text-center text-[#444240]">Imaginary Story</p>
                </div>
              </div>
              <div className="flex-center w-full">
                <p className="dark:text-white text-center text-[#444240]">And <span className="dark:text-white font-bold text-[#444240]">many many more!</span> Find your own niche and master it.</p>
              </div>
            </div>
          </section>
        </main>


        {/* max-w-6xl */}

        <section className="dark:text-white  relative mx-auto flex dark:max-w-full max-w-6xl flex-col gap-12 px-4 py-12 md:gap-12 md:px-8">
          <div className="flex flex-col gap-2">
            <p className="text-center text-sm">How it works</p>
            <h3 className="dark:text-white w-full text-center text-3xl font-bold text-[#444240]">Create your video in 3 easy steps</h3>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-0 text-[#444240] lg:gap-8 lg:flex-row">
            <div className="flex w-full flex-1 flex-col gap-2 py-5 text-left sm:mx-auto lg:max-w-max">
              <div className="mt-3 flex">
                <div className=" flex rounded-md border border-blue-500 bg-blue-50 px-[6px] py-[0.5px] text-xs text-blue-500">Step 1</div>
              </div>
              <h3 className="dark:text-white text-2xl font-bold">Generate script with one click</h3>
              <div className="dark:text-white flex flex-col gap-1">
                <p className="text-left">Simply <span className="font-bold">write your idea</span> and let AI do the job.</p>
                <ul className="text-left">
                  <li className="flex items-center gap-2">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    Start with an article, idea, link or just write your own story.
                  </li>
                  <li className="flex items-center gap-2">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    Get full video script to create your next video.
                  </li>
                  <li className="flex items-center gap-2">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    Works for every niche, from science to bedtime stories.
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-center mt-5 h-full min-h-[225px] w-full max-w-md flex-1 p-0 lg:mt-0 lg:w-3/12">
              <img alt="" loading="lazy" width={960} height={540} decoding="async" data-nimg={1} className="shadow-neumorphic w-full rounded-md border" style={{ color: 'transparent' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep1_v3.3bfbcc0a.jpg&w=1920&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep1_v3.3bfbcc0a.jpg&w=1920&q=75" />
            </div>
          </div>
          {/* Repeat similar blocks for Step 2 and Step 3 */}
        </section>
        <section className=" dark:text-white mx-auto flex dark:max-w-full max-w-6xl flex-col gap-12 px-4 py-12 md:gap-12 md:px-8">
          <div className="dark:text-white flex flex-col gap-2">
            <p className="dark:text-white text-center text-sm">How it works</p>
            <h3 className="dark:text-white w-full text-center text-3xl font-bold text-[#444240]">Create your video in 3 easy steps</h3>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-0 text-[#444240] lg:gap-8 lg:flex-row">
            <div className="flex w-full flex-1 flex-col gap-2 py-5 text-left sm:mx-auto lg:max-w-max">
              <div className="mt-3 flex">
                <div className="flex rounded-md border border-blue-500 bg-blue-50 px-[6px] py-[0.5px] text-xs text-blue-500">Step 1</div>
              </div>
              <h3 className="dark:text-white text-2xl font-bold">Generate script with one click</h3>
              <div className="dark:text-white flex flex-col gap-1">
                <p className="text-sm">Simply <span className="font-bold">write your idea</span> and let AI do the job.</p>
                <ul className="text-sm">
                  <li className="flex items-center gap-2">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    Start with an article, idea, link or just write your own story.
                  </li>
                  <li className="flex items-center gap-2">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    Get full video script to create your next video.
                  </li>
                  <li className="flex items-center gap-2">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    Works for every niche, from science to bedtime stories.
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex-center mt-5 h-full min-h-[225px] w-full max-w-md flex-1 p-0 lg:mt-0 lg:w-3/12">
              <img alt="" loading="lazy" width={960} height={540} decoding="async" className="shadow-neumorphic w-full rounded-md border" style={{ color: 'transparent' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep1_v3.3bfbcc0a.jpg&w=1920&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep1_v3.3bfbcc0a.jpg&w=1920&q=75" />
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-0 text-[#444240] lg:gap-8 lg:flex-row-reverse">
            <div className="flex w-full flex-1 flex-col gap-2 py-5 text-left sm:mx-auto lg:max-w-max">
              <div className="mt-3 flex">
                <div className="flex rounded-md border border-blue-500 bg-blue-50 px-[6px] py-[0.5px] text-xs text-blue-500">Step 2</div>
              </div>
              <h3 className="dark:text-white text-2xl font-bold">Customise the Video</h3>
              <div className="dark:text-white flex flex-col gap-1">
                <p className="text-sm"><span className="font-bold">Personalise</span> your video to make sure it sounds exactly as you want.</p>
                <ul className="text-sm">
                  <li className="flex items-center gap-2">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    Modify the voice Script
                  </li>
                  <li className="flex items-center gap-2">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    Use one of your preferred avatars
                  </li>
                  <li className="flex items-center gap-2">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    Add subtitles, text and shapes
                  </li>
                </ul>
              </div>
            </div>

            <div className=" flex-center mt-5 h-full min-h-[225px]  w-full max-w-md flex-1 p-0 lg:mt-0 lg:w-3/12">
              <div className=" group relative h-full w-full ">
                <img alt="" loading="lazy" width={448} height={210} decoding="async" data-nimg={1} className="shadow-neumorphic absolute -left-8 -top-24 z-0 w-full rounded-md border brightness-90 transition-all  duration-300 group-hover:brightness-90 md:brightness-100" style={{ color: 'transparent' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep21.ef6f3dc3.jpg&w=1080&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep21.ef6f3dc3.jpg&w=1080&q=75" />
                <img alt="" loading="lazy" width={448} height={170} decoding="async" data-nimg={1} className="h absolute -top-8 z-10 w-full rounded-md border brightness-90 drop-shadow-xl transition-all duration-300 group-hover:brightness-90  md:brightness-100" style={{ color: 'transparent' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep22.07bb9a98.jpg&w=1080&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep22.07bb9a98.jpg&w=1080&q=75" />
                <img alt="" loading="lazy" width={448} height={80} decoding="async" data-nimg={1} className="absolute left-8 top-8 z-20 w-full rounded-md border drop-shadow-xl transition-all duration-300 group-hover:scale-105" style={{ color: 'transparent' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep23.3df24c4d.jpg&w=1080&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep23.3df24c4d.jpg&w=1080&q=75" />
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-0 text-[#444240] lg:gap-8 lg:flex-row">
            <div className="flex w-full flex-1 flex-col gap-2 py-5 text-left sm:mx-auto lg:max-w-max">
              <div className="mt-3 flex">
                <div className="flex rounded-md border border-blue-500 bg-blue-50 px-[6px] py-[0.5px] text-xs text-blue-500">Step 3</div>
              </div>
              <h3 className="dark:text-white text-2xl font-bold">Generate your Video</h3>
              <div className="dark:text-white flex flex-col gap-1">
                <p className="text-sm">Everything is done, it’s time to get your final product.</p>
                <ul className="text-sm">
                  <li className="flex items-center gap-2">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    Easily render the video and share with others.
                  </li>
                  <li className="flex items-center gap-2">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    Save it to your desktop, tablet, or mobile device.
                  </li>
                  <li className="flex items-center gap-2">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    Have it delivered in HD with high quality.
                  </li>
                </ul>
              </div>
            </div>
            <div className=" flex-center mt-5 h-full min-h-[225px]  w-full max-w-md flex-1 p-0 lg:mt-0 lg:w-3/12">
              <div className="group relative overflow-hidden rounded-md">
                <img alt="" loading="lazy" width={280} height={110} decoding="async" data-nimg={1} className="shadow-neumorphic absolute bottom-14 right-16 z-10 w-[280px] rounded-sm border transition-all  duration-300 group-hover:w-[280px] group-hover:drop-shadow-xl md:w-[120px]" style={{ color: 'transparent' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep31.27887d14.jpg&w=640&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep31.27887d14.jpg&w=640&q=75" />
                <img alt="" loading="lazy" width={960} height={540} decoding="async" data-nimg={1} className="shadow-neumorphic z-0 w-full rounded-md border brightness-90 transition-all duration-300 group-hover:brightness-90 md:brightness-100" style={{ color: 'transparent' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep3.d045ed03.jpg&w=1920&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep3.d045ed03.jpg&w=1920&q=75" /></div></div>
            {/* 
  <div className="flex-center mt-5 h-full min-h-[225px] w-full max-w-md flex-1 p-0 lg:mt-0 lg:w-3/12">
    <img alt="" loading="lazy" width={960} height={540} decoding="async" className="shadow-neumorphic w-full rounded-md border" style={{ color: 'transparent' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep3.d045ed03.jpg&w=1920&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep3.d045ed03.jpg&w=1920&q=75" />
  </div>
</div>

<div className="pointer-events-none absolute inset-0 z-0 flex w-full items-center justify-center">
  <img alt="" loading="lazy" width={1200} height={600} decoding="async" className="h-full w-full" style={{ color: 'transparent' }} srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg_3steps.1280d916.jpg&w=1200&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg_3steps.1280d916.jpg&w=1920&q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg_3steps.1280d916.jpg&w=1920&q=75" />
</div> */}
          </div>
        </section>
        <section className=" flex-center w-full flex-col gap-8 p-6 py-12">
          <div className="flex flex-col gap-2">
            <p className="dark:text-white text-center text-sm">Features</p>
            <h3 className="dark:text-white w-full text-center text-3xl font-bold text-[#444240]">
              Simple, yet crazy powerful.
            </h3>
          </div>
          <div className="grid w-full max-w-6xl grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4">
            <div className="shadow-neumorphic group relative h-72 rounded-md border bg-white/90 p-4 text-[#444240] backdrop-blur-md transition-all duration-300 hover:border-blue-600">
              <div className="flex h-full flex-col justify-between">
                <div className="relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 top-0 z-50 bg-gradient-to-b from-transparent to-white" />
                  <img
                    alt="AI Scripts"
                    loading="lazy"
                    width={930}
                    height={500}
                    decoding="async"
                    className="transition-all duration-300 group-hover:scale-105"
                    srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvideo-script.b47f4473.jpg&w=1920&q=20"
                    src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvideo-script.b47f4473.jpg&w=1920&q=20"
                  />
                </div>
                <div className="z-10 transition-all duration-300 group-hover:pb-2">
                  <h3 className="text-lg font-bold transition-all duration-300 group-hover:text-xl">
                    AI Scripts
                  </h3>
                  <p className="text-sm font-light">
                    Get perfect video script automatically. You don’t have to be Christopher Nolan to get results.
                  </p>
                </div>
              </div>
            </div>
            <div className="shadow-neumorphic group relative h-72 rounded-md border bg-white/90 p-4 text-[#444240] backdrop-blur-md transition-all duration-300 hover:border-blue-600">
              <div className="flex h-full flex-col justify-between">
                <div className="relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 top-0 z-50 bg-gradient-to-b from-transparent to-white" />
                  <img
                    alt="45 Unique Voices"
                    loading="lazy"
                    width={707}
                    height={300}
                    decoding="async"
                    className="transition-all duration-300 group-hover:scale-105"
                    srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvoices.b8bd725b.jpg&w=1920&q=20"
                    src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvoices.b8bd725b.jpg&w=1920&q=20"
                  />
                </div>
                <div className="z-10 transition-all duration-300 group-hover:pb-2">
                  <h3 className="text-lg font-bold transition-all duration-300 group-hover:text-xl">
                    45 Unique Voices
                  </h3>
                  <p className="text-sm font-light">
                    Pick one of the 29 male and 16 female voices that resonate with your audience.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 shadow-neumorphic group relative h-72 rounded-md border bg-white/90 p-4 text-[#444240] backdrop-blur-md transition-all duration-300 hover:border-blue-600">
              <div className="flex h-full flex-col justify-between">
                <div className="relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 top-0 z-50 bg-gradient-to-b from-transparent to-white" />
                  <img
                    alt="Video Editor"
                    loading="lazy"
                    width={1090}
                    height={500}
                    decoding="async"
                    className="transition-all duration-300 group-hover:scale-105"
                    srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Feditor.319fdbe2.jpg&w=3840&q=20"
                    src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Feditor.319fdbe2.jpg&w=3840&q=20"
                  />
                </div>
                <div className="z-10 transition-all duration-300 group-hover:pb-2">
                  <h3 className="text-lg font-bold transition-all duration-300 group-hover:text-xl">
                    Video Editor
                  </h3>
                  <p className="text-sm font-light">
                    Easily edit the output and personalise it however you want. Add your own images and videos, change them to stock footage, resize the length or delete ones you don't like.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 shadow-neumorphic group relative h-72 rounded-md border bg-white/90 p-4 text-[#444240] backdrop-blur-md transition-all duration-300 hover:border-blue-600">
              <div className=" flex h-full flex-col justify-between  "><div className="relative overflow-hidden">
                <div className="flex-center relative" style={{ display: "flex", justifyContent: 'center' }}>
                  <div className="absolute  bottom-0 left-0 right-0 top-0 z-50 bg-gradient-to-b from-transparent to-white transition-all duration-300 group-hover:opacity-30" />
                  <img alt="AI Image Generator-1" loading="lazy" width={120} height={120} decoding="async" data-nimg={1} className=" -rotate-6 rounded-md border transition-all duration-300 group-hover:rotate-0" style={{ color: 'transparent' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAI-1.04ca1aa9.jpg&w=256&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAI-1.04ca1aa9.jpg&w=256&q=75" />
                  <img alt="AI Image Generator-2" loading="lazy" width={120} height={120} decoding="async" data-nimg={1} className=" rotate-6 rounded-md border transition-all duration-300 group-hover:rotate-0" style={{ color: 'transparent' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAI-2.54106127.jpg&w=256&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAI-2.54106127.jpg&w=256&q=75" />
                  <img alt="AI Image Generator-3" loading="lazy" width={120} height={120} decoding="async" data-nimg={1} className=" -rotate-6 rounded-md border transition-all duration-300 group-hover:rotate-0" style={{ color: 'transparent' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAI-3.960b2389.jpg&w=256&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAI-3.960b2389.jpg&w=256&q=75" />
                  <img alt="AI Image Generator-4" loading="lazy" width={120} height={120} decoding="async" data-nimg={1} className=" rotate-6 rounded-md border transition-all duration-300 group-hover:rotate-0" style={{ color: 'transparent' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAI-6.78b79604.jpg&w=256&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAI-6.78b79604.jpg&w=256&q=75" />
                  <img alt="AI Image Generator-5" loading="lazy" width={120} height={120} decoding="async" data-nimg={1} className=" -rotate-6 rounded-md border transition-all duration-300 group-hover:rotate-0" style={{ color: 'transparent' }} srcSet="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAI-5.bf76306e.jpg&w=256&q=75" src="https://copycopter.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAI-5.bf76306e.jpg&w=256&q=75" />
                </div>
              </div>
                <div className="z-10 transition-all duration-300 group-hover:pb-2">
                  <h3 className="text-lg  font-bold transition-all duration-300 group-hover:text-xl">AI Photo (realistic images)</h3>
                  <p className="text-sm font-light ">Make every video unique by using our fine-tuned high quality image generation AI model.</p>
                </div>
              </div>
            </div>
            <div className="false shadow-neumorphic group relative h-72 rounded-md border bg-white/90 p-4 text-[#444240] backdrop-blur-md transition-all duration-300 hover:border-blue-600">
              <div className=" flex h-full flex-col justify-between  ">
                <div className="relative overflow-hidden">
                  <div>
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-50 bg-gradient-to-b from-transparent to-white transition-all duration-300 group-hover:opacity-30" />
                    <video autoPlay playsInline muted className="rounded-sm" loop>
                      <source src="https://copycopter.ai/images/features/videos.mp4" type="video/mp4" /></video>
                  </div>
                </div>
                <div className="z-10 transition-all duration-300 group-hover:pb-2">
                  <h3 className="text-lg  font-bold transition-all duration-300 group-hover:text-xl">Stock Video Footage</h3>
                  <p className="text-sm font-light ">Effortlessly include stock videos in your creation to add more variety.</p>
                </div>
              </div>
            </div>
            <div className="false shadow-neumorphic group relative h-72 rounded-md border bg-white/90 p-4 text-[#444240] backdrop-blur-md transition-all duration-300 hover:border-blue-600">
              <div className=" flex h-full flex-col justify-between  ">
                <div className="relative overflow-hidden">
                  <div className="flex-center transi flex-wrap items-center gap-2 transition-all duration-300 group-hover:gap-1">
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-50 bg-gradient-to-b from-transparent to-white transition-all duration-300 group-hover:opacity-30" />
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇺🇸{/* */} {/* */}English</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇮🇳{/* */} {/* */}Hindi</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇵🇹{/* */} {/* */}Portuguese</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇨🇳{/* */} {/* */}Chinese</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇪🇸{/* */} {/* */}Spanish</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇫🇷{/* */} {/* */}French</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇩🇪{/* */} {/* */}German</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇯🇵{/* */} {/* */}Japanese</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇦🇪{/* */} {/* */}Arabic</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇷🇺{/* */} {/* */}Russian</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇰🇷{/* */} {/* */}Korean</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇮🇩{/* */} {/* */}Indonesian</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇮🇹{/* */} {/* */}Italian</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇳🇱{/* */} {/* */}Dutch</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇹🇷{/* */} {/* */}Turkish</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇵🇱{/* */} {/* */}Polish</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇸🇪{/* */} {/* */}Swedish</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇵🇭{/* */} {/* */}Filipino</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇲🇾{/* */} {/* */}Malay</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇷🇴{/* */} {/* */}Romanian</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇺🇦{/* */} {/* */}Ukrainian</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇬🇷{/* */} {/* */}Greek</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇨🇿{/* */} {/* */}Czech</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇩🇰{/* */} {/* */}Danish</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇫🇮{/* */} {/* */}Finnish</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇧🇬{/* */} {/* */}Bulgarian</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇭🇷{/* */} {/* */}Croatian</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇸🇰{/* */} {/* */}Slovak</div>
                    <div className="whitespace-nowrap rounded-full border px-1 text-xs">🇮🇳{/* */} {/* */}Tamil</div>
                  </div>
                </div>
                <div className="z-10 transition-all duration-300 group-hover:pb-2">
                  <h3 className="text-lg  font-bold transition-all duration-300 group-hover:text-xl">29 Languages</h3>
                  <p className="text-sm font-light ">Create your content in any language. Works for Voice and Text.</p>
                </div></div></div>
          </div>


        </section>
        <div className={'container mx-auto'}>
          <div
            className={
              'flex flex-col items-center justify-center space-y-16 py-16'
            }
          >
            <div className={'flex flex-col items-center space-y-8 text-center'}>
              <Pill>Get started for free. No credit card required.</Pill>

              <div className={'flex flex-col space-y-2'}>
                <Heading level={1}>
                  Fair pricing for all types of businesses
                </Heading>

                <Heading
                  level={2}
                  className={'font-sans font-normal text-muted-foreground'}
                >
                  Get started on our free plan and upgrade when you are ready.
                </Heading>
              </div>
            </div>

            <div className={'w-full'}>
              <PricingTable
                config={billingConfig}
                paths={{
                  signUp: pathsConfig.auth.signUp,
                  return: pathsConfig.app.home,
                }}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// export default withI18n(Home);
export default Home;



function Pill(props: React.PropsWithChildren) {
  return (
    <h2
      className={
        'rounded-full px-4 py-2 text-center text-sm text-muted-foreground shadow dark:shadow-primary/20'
      }
    >
      <Sparkle className={'inline-block h-4'} />
      {props.children}
    </h2>
  );
}


