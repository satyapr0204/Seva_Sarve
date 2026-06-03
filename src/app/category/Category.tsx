import Link from "next/link";
import  {topServices,featuredCategory,allServices} from "../../json/services.json"

const Category = () => {
  return (
    <main>
    <div className="container home-wraper my-profile">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="browse-wrp">
                <div className="browse-ctg-head my-con-head">
                  <h2 className="sub-cate-page"> <Link href="/"><img src="images/home/left-arrow.svg" alt="" /></Link>Category</h2>
                  <div className="see-search">
                     <img src="images/home/search-icon.svg" alt="" />
                    <input type="search" placeholder="Search" />
                  </div>
                </div>
                <div className="browse-inner">
                  <ul>
                    {featuredCategory.map((item) => (
                    <li key={item?.id}  >
                      <Link href="/serviceDetails" className="wrp-img">
                        <div className="c-img">
                          <img
                            src={item?.icon||"images/home/browse-category/1.svg"}
                            alt=""
                          />
                        </div>
                        <span>{item?.title}</span>
                      </Link>
                    </li>
                     ))}
                  
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       
    </div>
  </main>
  )
}

export default Category