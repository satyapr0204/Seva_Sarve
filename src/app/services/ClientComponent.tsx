"use client";
import { topServices, featuredCategory, allServices } from "../../json/services.json"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ClientComponent() {

  const router = useRouter()

  const [filterTopServices, setFilteredServices] = useState<any[]>([])
  const [filterfeaturedCategory, setFilteredfeaturedCategory] = useState<any[]>([])
  const [filertallServices, setFilteredAllServices] = useState<any[]>([])

  const [searchServices, setSearchServices] = useState<any>("")

  // Restores immediate mounting slick sliders on navigation transitions safely
  useEffect(() => {
    const $ = (window as any).$;
    if (!$) return;

    const initServicesSliders = () => {
      if ($(".top-services-slider").length && !$(".top-services-slider").hasClass("slick-initialized") && filterTopServices.length > 0) {
        $(".top-services-slider").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
          draggable: false,
          infinite: filterTopServices.length > 4, // Fix infinite loop if items are less than slides
          autoplay: false,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
      }

      if ($(".featured-category-slider").length && !$(".featured-category-slider").hasClass("slick-initialized") && filterfeaturedCategory.length > 0) {
        $(".featured-category-slider").slick({
          slidesToShow: 8,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
          draggable: false,
          infinite: filterfeaturedCategory.length > 8,
          autoplay: false,
          responsive: [
            {
              breakpoint: 1439,
              settings: {
                slidesToShow: 6
              }
            }, 
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 5
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
      }
    };

    setTimeout(initServicesSliders, 50);

    return () => {
      // Safe teardown before running calculations
      if ($(".top-services-slider").hasClass("slick-initialized")) {
        $(".top-services-slider").slick("unslick");
      }
      if ($(".featured-category-slider").hasClass("slick-initialized")) {
        $(".featured-category-slider").slick("unslick");
      }
    };
  }, [filterTopServices, filterfeaturedCategory]);

  useEffect(() => {
    const $ = (window as any).$;
    
    // CRITICAL: Force destroy slider instances cleanly right before changing lists
    if ($) {
      if ($(".top-services-slider").hasClass("slick-initialized")) {
        $(".top-services-slider").slick("unslick");
      }
      if ($(".featured-category-slider").hasClass("slick-initialized")) {
        $(".featured-category-slider").slick("unslick");
      }
    }

    setFilteredServices(handlefilter(topServices));
    setFilteredfeaturedCategory(handlefilter(featuredCategory));
    setFilteredAllServices(handlefilter(allServices));
  }, [
    searchServices,
    topServices,
    featuredCategory,
    allServices,
  ]);

  const handlefilter = (data: any[]) => {
    return data.filter((item) =>
      item?.title
        ?.toLowerCase()
        ?.includes(searchServices.toLowerCase())
    );
  };

  return (
    <>
      {/* Dynamic structural system wrapper protection layout to maintain native styles layout */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .top-services-slider:not(.slick-initialized),
            .featured-category-slider:not(.slick-initialized) {
              display: flex !important;
              overflow: hidden;
              gap: 15px;
            }
            .top-services-slider:not(.slick-initialized) .top-services-slider-item {
              flex: 0 0 auto !important;
              width: 24%;
            }
            .featured-category-slider:not(.slick-initialized) .featured-category-slider-item {
              flex: 0 0 auto !important;
              width: 12%;
            }
            @media (max-width: 1024px) {
              .top-services-slider:not(.slick-initialized) .top-services-slider-item { width: 49%; }
              .featured-category-slider:not(.slick-initialized) .featured-category-slider-item { width: 20%; }
            }
            @media (max-width: 767px) {
              .top-services-slider:not(.slick-initialized) .top-services-slider-item,
              .featured-category-slider:not(.slick-initialized) .featured-category-slider-item {
                width: 100%;
              }
            }
          `,
        }}
      />

      <main>
        <div className="container home-wraper my-profile" style={{ height: "auto" }}>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="browse-wrp">
                    <div className="browse-ctg-head my-con-head">
                      <h2 className="sub-cate-page">
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            router.back();
                          }}><img src="images/home/left-arrow.svg" alt="" /></a>
                        Services
                      </h2>
                      <div className="your-location-top" >

                        <input type="text"
                          placeholder="Search"
                          value={searchServices}
                          onChange={(e) => setSearchServices(e.target.value)}
                          className="top-srch" />

                        <select name="" id="">
                          <option value="0">All Category</option>
                          <option value="1">Plumbing</option>
                          <option value="2">Repairing</option>
                          <option value="3">Painting</option>
                          <option value="4">Laundry</option>
                        </select>
                      </div>
                    </div>
                    <div className="services-sec-wrp">
                      <h3>Top Services</h3>
                      <div className="top-services-slider"   >

                        {filterTopServices?.map((item) => (
                          <div className="top-services-slider-item" key={`${item.id}_top`} >
                            <div className="upcoming-my-slide">
                              <Link href="/serviceDetails">
                                <div className="upcoming-img">
                                  <img src="images/home/home-slider/1.svg" alt="" />
                                </div>
                                <div className="upcoming-data ser">
                                  <p className="up-text">{item?.title}</p>
                                  <p className="up-date">{item?.description}</p>
                                </div>
                              </Link>
                            </div>
                          </div>
                        ))}


                      </div>
                    </div>
                    <div className="services-sec-wrp">
                      <h3>Featured Category</h3>
                      <div className="featured-category-slider">

                        {filterfeaturedCategory.map((item) => (
                          <div className="featured-category-slider-item" key={`${item.id}_featured`}>
                            <div className="browse-inner">
                              <ul>

                                <li >
                                  <Link href="/serviceDetails" className="wrp-img">
                                    <div className="c-img">
                                      <img src={item?.icon} alt={item?.title} />
                                    </div>
                                    <span>{item?.title}</span>
                                  </Link>
                                </li>

                              </ul>
                            </div>

                          </div>
                        ))}



                      </div>
                    </div>
                    <div className="services-sec-wrp">
                      <h3 style={{padding:'10px'}}>All Services</h3>
                      <div className="services-sec-in">

                        {filertallServices.map((item) => (
                          <div className="upcoming-my-slide" key={`${item.id}_all`}>
                            <Link href="/serviceDetails">
                              <div className="upcoming-img">
                                <img src={item?.image} alt="" />
                              </div>
                              <div className="upcoming-data ser">
                                <p className="up-text">{item?.title}</p>
                                <p className="up-date">{item?.description}.</p>
                              </div>
                            </Link>
                          </div>))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}