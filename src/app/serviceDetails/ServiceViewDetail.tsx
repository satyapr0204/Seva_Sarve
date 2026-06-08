"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {serviceDetails} from "../../json/service-detail.json"
import { useState } from "react";
import toast from "react-hot-toast";


export default function ServiceViewDetail (){

  const router = useRouter()

  const [serviceDetailss,setServiceDetails]=useState(serviceDetails)
  console.log(serviceDetails)
  const [subCategories,setSubCategories]=useState(serviceDetailss?.sub_categories)
  const [addedCategory ,setAddedCategory]=useState<boolean>(false)

  const [selectSubCategories,setSelectSubCategories]=useState<any>(serviceDetails?.sub_categories?.[0]?.id);

  const [problemDesc,setProblemDesc]=useState<string>("")

  console.log(problemDesc,"problemDesc")

  const [uploadedImg, setUploadedImage] = useState<string[]>([]);
  console.log(uploadedImg,"bdsbdsbsjdsfjhsfsh") 
  //  const [storeAllUploadedImg,setAllUplodedImg]=useState([])
   
  // Track open panel indices cleanly
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      setUploadedImage((prev) => [...prev, ...imageUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImage((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleServiceCart = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    if (!addedCategory) {
      toast.error("please select sub Category");
    } else if (uploadedImg.length === 0) {
      toast.error("please upload at least one video/image");
    } else if (!problemDesc) {
      toast.error("please enter the description");
    } else {
      toast.success("services added to the cart");

      router.push("/summary-estimate");
      setAddedCategory(false)
      setProblemDesc("")
      setUploadedImage([])
      setActiveIssueId(null);
    }
  };


  return(
    <>
      <main>
        <div className="container home-wraper my-profile" style={{height: "auto"}}>
      
          <section>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="browse-wrp">
                    <div className="browse-ctg-head my-con-head">
                      <h2 className="sub-cate-page">
                        <a onClick={(e) => {
                          e.preventDefault();
                          router.back();
                        }}>
                          <img src="images/home/left-arrow.svg" alt=""/>
                        </a>
                        {serviceDetailss?.service?.category||"NA"}
                      </h2>
                      <div className="your-location-top">
                        <input
                          type="text"
                          placeholder="Search"
                          className="top-srch"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="service-details-wrp">
                    <div className="service-details-banner">
                      <div className="service-details-banner-data">
                        <h1> {serviceDetailss?.service?.banner_title||"NA"} </h1>
                        <p>
                          Fast <i className="fa-solid fa-circle"></i> Reliable
                          <i className="fa-solid fa-circle"></i> Verified Contractors
                        </p>
                      </div>
                      <img
                        src="images/service-details/service-banner.svg"
                        alt=""
                      />
                    </div>
                    
                    <div className="service-details-sub-cat">
                      <h3>Choose a Sub-category</h3>
                    
                      <div className="sub-cat-filtr-btns">
                        {subCategories.map((item) => (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectSubCategories(item?.id);
                              setActiveIssueId(null);
                              setAddedCategory(false);
                            }}
                            className={selectSubCategories === item?.id ? "active" : ""}
                            key={item?.id}
                          >
                            {item?.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="service-details-issues">
                      <h3>What issues are you facing?</h3>

                      {/* FIX: Looping directly on .service-issues-in keeps the background styles completely identical to your original UI */}
                      {serviceDetails?.facingIssues?.filter((item: any) => item.sub_category_id === selectSubCategories)?.map((item, index) => { 
                        const currentKey = `${index}_all`;
                        const isOpen = activeIssueId === currentKey;

                        return (
                          <div key={currentKey} className={`service-issues-in ${isOpen ? 'active' : ''}`}>
                            <div className="service-issues-tab">
                              <img
                                src="images/service-details/service-issue.svg"
                                alt=""
                              />
                              <div className="service-issues-tab-data">
                                <h4>
                                  {item?.issue_type?.title||"NA"}
                                  <input 
                                    type="checkbox" 
                                    className="tab-check" 
                                    checked={isOpen}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setActiveIssueId(currentKey);
                                        setAddedCategory(true);
                                      } else {
                                        setActiveIssueId(null);
                                        setAddedCategory(false);
                                      }
                                    }} 
                                  />
                                </h4>
                                <p>
                                  {item?.issue_type?.description || "Fix or install new taps in kitchen, bathroom, or wash area."}
                                </p>
                              </div>
                            </div> 
                            
                            <div
                              className="service-issues-content"
                              style={{display: isOpen ? "block" : "none"}}
                            >
                              <hr />
                              <p>Select specific issue for Tap / Faucet Repair</p>
                              <ul>
                                {item?.issue_options.map((option: any) => (
                                  <li key={option?.id}>
                                    <label>
                                      <img
                                        src="images/service-details/issues/1.jpg"
                                        alt=""
                                      />
                                      {option?.title || "Leaking Tap"} <input type="checkbox" />
                                    </label>
                                    <div className="hover-data">
                                      Upgrade your space with a new sink installation.
                                      We handle removal, fitting, and leak-proof
                                      connections for a hassle-free experience.
                                    </div>
                                  </li>
                                ))}
                              </ul>
                              
                              <div className="service-issues-content-problem">
                                <h3>Problem Description</h3>
                                <textarea
                                  value={problemDesc}
                                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProblemDesc(e.target.value)}
                                  placeholder="Describe the specific issue..."
                                ></textarea>
                                
                                <h3>Uploaded Image/Video</h3>
                                <label>
                                  <img
                                    src="images/service-details/upload-icon.svg"
                                    alt=""
                                  />
                                  Drag and drop files here, or click to browse
                                  <input 
                                    type="file"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={handleFile}
                                    hidden
                                  />
                                </label>
                                
                                <div className="service-issues-content-problem-thumbs">
                                  {uploadedImg.map((imgUrl, imgIndex) => (
                                    <div
                                      key={imgIndex}
                                      className="service-issues-content-problem-thumbs-image"
                                    >
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveImage(imgIndex)}
                                      >
                                        <img
                                          src="/images/service-details/cancel-icon.svg"
                                          alt=""
                                        />
                                      </button>
                                       
                                      <img
                                        src={imgUrl || "/images/service-details/thumb-image.svg"}
                                        alt=""
                                        width={100}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <Link href="" onClick={handleServiceCart} className="primary-cta">
                      Save & Add to Service Cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}