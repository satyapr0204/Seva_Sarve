"use client";
import RequestModal from '@/components/modals/RequestModal'
import {estimation} from '../../json/service-detail.json'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link';
import toast from 'react-hot-toast';

const SummaryEstimate = () => {
 const router =useRouter()

  const [estimationDetails,setEstimationDetails]=useState(estimation)

  const handleClick =()=>{
     if(estimationDetails){
        toast.error("estimation details is not available")
     }
    
  }

  return (
   <> 
     <main>
      <div className="container home-wraper">
       
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="browse-wrp">
                  <div className="browse-ctg-head">
                    <h2 className="sub-cate-page"> <a  onClick={(e) => {
                            e.preventDefault();
                            router.back();
                        }}>
                     <img src="images/home/left-arrow.svg" alt=""/></a>Summary & Estimate</h2>
                                    </div>
                 <div className="issue-details-wrp">
                    <div className="selected-category">
                        <div className="category">
                            <p>Selected Category</p>
                        <Link href="/serviceDetails"><img src="images/inner-page/edit-icon-c.svg" alt=""/></Link>
                        </div>
                        <h4>{ estimationDetails?.category?.name||"Plumbing"}</h4>
                    </div>

                    <div className="selected-category">
                        <div className="category">
                            <p>Selected Subcategory</p>
                         <Link href="/serviceDetails"><img src="images/inner-page/edit-icon-c.svg" alt=""/></Link>
                        </div>
                        <h4>{ estimationDetails?.subcategory?.name||"Installations"}</h4>
                    </div>

                    <div className="selected-category">
                        <div className="category">
                            <p>Selected Issue</p>
                         <Link href="/serviceDetails"><img src="images/inner-page/edit-icon-c.svg" alt=""/></Link>
                        </div>
                        <h4>{ estimationDetails?.issue?.title||"Tap / Faucet Installation"}</h4>
                       { estimationDetails?.issue?.tags.map((item,index)=>(
                             <span className="primary-cta tap" key={index}>{item||"Tap Handle Broken"}</span>
                       ))}
                    </div>

                    <div className="selected-category">
                        <div className="category">
                            <p>Problem Description</p>
                         <Link href="/serviceDetails"><img src="images/inner-page/edit-icon-c.svg" alt=""/></Link>
                        </div>
                        <h4>{ estimationDetails?.problem_description}</h4>
                    </div>

                    <div className="upload-img selected-category">
                        <p>Uploaded Image/Video</p>
                             <div className="up-image-wrp">
                        {  estimationDetails?.uploaded_media.map(()=>(
                            <img src="images/inner-page/issue-icon.svg" alt=""/>
                        )) }
                        </div>
                    </div>

                    

                    <div className="estimated-total">
                        <div className="estimated">
                            <p>Estimated Total (range)</p>
                            <span>{ `$${estimationDetails?.estimate?.minimum} - $${estimationDetails?.estimate?.maximum}` ||"$149-$299"}</span>
                        </div>
                        <div className="avrg">
                            <p>Average cost</p>
                            <span>{`$${estimationDetails?.estimate?.average_cost}`||"$224"} </span>
                        </div>
                    </div>

                    <div className="request-btn">
                        <button type="button" className="secondary-cta" data-bs-dismiss="modal" onClick={()=>router.push("/serviceDetails")}>Save & Add More</button>
                        <button type="button" data-bs-target="#requestSuccessfully" data-bs-toggle="modal" className="primary-cta" onClick={()=>handleClick()}>Save & Add to Service Cart</button>
                    </div>

                 </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
         
      </div>
      
</main>

<RequestModal/>
   </>
  )
}

export default SummaryEstimate
