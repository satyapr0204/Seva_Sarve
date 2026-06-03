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


  useEffect(() => {
    setFilteredServices(handlefilter(topServices));

    setFilteredfeaturedCategory(
      handlefilter(featuredCategory)
    );

    setFilteredAllServices(
      handlefilter(allServices)
    );
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
        .includes(searchServices.toLowerCase())
    );
  };

  return (
    <>
      <main>
        <div className="container home-wraper my-profile" style={{ height: " auto" }}>
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
                      <div className="your-location-top">

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
                      <h3>All Services</h3>
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