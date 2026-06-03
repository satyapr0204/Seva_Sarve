"use client";

import Link from "next/link";
import {bookingCard} from "../../json/home.json"
import { featuredCategory } from "../../json/services.json";
import { useRouter } from "next/navigation";
import DatePopup from "@/components/modals/bookingmodals/DatePopup";
import RescheduleRequestSubmit from "@/components/modals/bookingmodals/RescheduleRequestSubmit";
import CancelBooking from "@/components/modals/bookingmodals/CancelBooking";
import ServiceRejected from "@/components/modals/bookingmodals/ServiceRejected";
import ServiceAccepted from "@/components/modals/bookingmodals/ServiceAccepted";

const ClientComponent = () => {
  const router = useRouter();
  
  return (
    <>
    <main>
    <div className="container home-wraper">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero-slider">
                  {
                    bookingCard.map((item) => (
                 <div className="item-inner" key={item?.id} >
                  <div className="inner-hero" >
                    <div className="hero-img">
                      <img src={item?.image||"images/home/hero-slider-img.svg"} alt="" />
                    </div>
                    <p>
                      Get 15% Off Your First <br />
                      SevaServe Booking Today
                    </p>
                    <div className="hero-btn">
                      <button onClick={()=>router.push("/category")}>
                        Book Now <img src="images/home/right-arrow.svg" />
                      </button>
                    </div>
                  </div>
                
                </div>
                  ))}
               
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="pipe-leakage">
                <div className="left-leakage">
                  <span></span>
                  <p>On-going Booking</p>
                </div>
                <div className="right-leakage">
                  <div className="leakage-img">
                    <img src="images/home/leakage-img.svg" />
                  </div>
                  <div className="right-text">
                    <p className="frist">Pipe Leakage Fixing</p>
                    <p className="sec">Started 20 mins ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="browse-wrp">
                <div className="browse-ctg-head">
                  <h2>Browse by Category</h2>
                  <p className="see-all">
                    <Link href="/category"
                      >See All
                      <img
                        src="images/home/browse-category/right-arrow.svg"
                        alt="right-arrow"
                    /></Link>
                  </p>
                </div>
                <div className="browse-inner">
                  <ul>
                    {  featuredCategory.map((item)=>(
                        <li key={item?.id}>
                      <Link href="/serviceDetails" className="wrp-img">
                        <div className="c-img">
                          <img
                            src={item?.icon||"images/home/browse-category/2.svg"}
                            alt=""
                          />
                        </div>
                        <span>{item?.title||"Repairing"}</span>
                      </Link>
                    </li>
                    ))
                      
                    }
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="browse-ctg-head">
                <h2>Upcoming Bookings</h2>
                <p className="see-all">
                  <Link href="/booking"
                    >See All
                    <img
                      src="images/home/browse-category/right-arrow.svg"
                      alt="right-arrow"
                  /></Link>
                </p>
              </div>
              <div className="upcoming-slider">

              { [0,1,2,3,4,5].map(()=>(

              <div className="upcoming-my-slide">
                  <div className="upcoming-img">
                    <img src="images/home/home-slider/1.svg" alt="" />
                  </div>
                  <div className="upcoming-data">
                    <p className="up-text">Plumbing - Pipe Leakage Repair</p>
                    <p className="up-date">Nov 15, 2025 • 10:00 AM</p>
                    <div className="upcm-slider-btn">
                      <button className="primary-cta upcm-btn" data-bs-target="#select-date-time-popup" data-bs-toggle="modal" >
                        <img
                          src="images/home/home-slider/re-sdl-btn.svg"
                          alt=""
                        />Reschedule
                      </button>
                      <button className="cnl" data-bs-target="#cancelBookingPopup" data-bs-toggle="modal" >Cancel</button>
                    </div>
                  </div>
                </div>
               )) }

               
              </div>
            </div>
          </div>
        </div>
      </section>


      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="my-quotes-wrp">
                <div className="browse-ctg-head">
                  <h2>My Quotes</h2>
                  <p className="see-all">
                    <Link href="/quotes"
                      >See All
                      <img
                        src="images/home/browse-category/right-arrow.svg"
                        alt="right-arrow"
                    /></Link>
                  </p>
                </div>
                <div className="my-quotes-inner">
                  <div className="add-user">
                    <p className="left">#Q1015</p>
                    <p className="right">Additional Services</p>
                  </div>
                  
                  <div className="plumbing">
                    <a href="service-details.html" className="plm">
                      Plumbing
                      <img src="images/home/up-right-arrow.svg" alt="" />
                    </a>
                    <p className="sub-cate">Sub categories Selected</p>

                    <div className="service-list-type">
                      <ol className="main-category">
                        <li>
                          Installation
                          <ul>
                            <li>
                              Sink Installation
                              <ul>
                                <li>Replace Existing Sink</li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ol>
                      <ol className="main-category">
                        <li className="more-service">+ 1 more service</li>

                        <div className="service-data">
                          <li>
                            Installation
                            <ul>
                              <li>
                                Sink Installation
                                <ul>
                                  <li>Replace Existing Sink</li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </div>
                        <li className="less-service">Less service</li>
                      </ol>
                      <div className="additional-services">
                        <p className="additional-text">
                          Additional Services
                          <img
                            src="images/home/additional-service.svg"
                            alt=""
                          />
                        </p>

                        <ul className="service-list">
                          <li>Undermount / Vessel Sink Setup</li>
                          <li>Vessel Sink Setup</li>
                        </ul>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit
                      </p>
                      <div className="service-quotes">
                        <p className="service-cost">Cost:<span>$149</span></p>
                        <div className="home-quotes-cta">
                          <button className="reject-btn"   data-bs-target="#servicesRejection" data-bs-toggle="modal">Reject</button>
                          <button className="primary-cta rgt" data-bs-target="#servicesAccepted" data-bs-toggle="modal">
                            Accept
                            <img src="images/home/right-img.svg" alt="" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="popular-service-home">
                <div className="browse-ctg-head">
                  <h2>Popular Services</h2>
                  <p className="see-all">
                    <Link href="/services"
                      >See All
                      <img
                        src="images/home/browse-category/right-arrow.svg"
                        alt="right-arrow"
                    /></Link>
                  </p>
                </div>
                <div className="upcoming-slider">
                 {
                      [0, 1, 2, 3, 4, 5].map((item) => (
                        <div className="upcoming-my-slide" key={item}>
                          <div className="upcoming-img">
                            <img src="images/home/home-slider/1.svg" alt="" />
                          </div>

                          <div className="upcoming-data">
                            <p className="up-text">
                              Plumbing - Pipe Leakage Repair
                            </p>

                            <div className="upcm-slider-btn pop-srv">
                              <button className="primary-cta upcm-btn pop-srv-btn" onClick={()=>router.push("/quotes")}>
                                Request Exact Quote
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    }

                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </main>
    <DatePopup/>
    <RescheduleRequestSubmit/>
    <ServiceRejected/>
    <ServiceAccepted/>
    <CancelBooking/>
    </>
  )
}

export default ClientComponent