// import React, { useEffect, useState } from 'react'

// const NewAddressModal = ({ selectedAddress, onSave, onClose }) => {


//   const [addressType, setAddressType] = useState('Home');
//   const [formData, setFormData] = useState({
//     flat: '',
//     floor: '',
//     area: '',
//     landmark: ''
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (selectedAddress) {
//       setAddressType(selectedAddress.type || 'Home');
//       setFormData({
//         flat: selectedAddress.flat || '',
//         floor: selectedAddress.floor || '',
//         area: selectedAddress.area || '',
//         landmark: selectedAddress.landmark || ''
//       });
//     } else {
//       setAddressType('Home');
//       setFormData({ flat: '', floor: '', area: '', landmark: '' });
//     }
//     setErrors({}); // Modal khulne par errors clear kar do
//   }, [selectedAddress]);


//   const validate = () => {
//     let newErrors = {};

//     if (!formData.flat.trim()) {
//       newErrors.flat = "Flat/House no. is required";
//     }

//     if (!formData.area.trim()) {
//       newErrors.area = "Area/Locality is required";
//     } else if (formData.area.trim().length < 3) {
//       newErrors.area = "Area name is too short";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Typing karte waqt error remove karna
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };



//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validate()) {
//       const updatedData = {
//         id: selectedAddress ? selectedAddress.id : Date.now(),
//         type: addressType,
//         fullAddress: `${formData.flat}, ${formData.area}`,
//         ...formData
//       };

//       onSave(updatedData);
//       onClose()
//       const closeBtn = document.querySelector("#add-address-popup .btn-close");
//       if (closeBtn) closeBtn.click();
//     }
//   };

//   return (
//     <>
//       <div className="modal fade" id="add-address-popup" data-bs-backdrop="static" tabIndex={-1}
//         aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
//             <div className="modal-body">
//               <div className="select-date-time-wrp">
//                 <h1>{selectedAddress ? "Edit Address" : "Add New Address"}</h1>
//                 <form onSubmit={handleSubmit}>
//                   <div className="your-location-top">
//                     <div className="your-location-top-in">
//                       <div className="use-location">
//                         <img src="images/saved-addresses/location.svg" alt="" />
//                         <div className="use-location-data">
//                           <h5>Use My Current Location</h5>
//                           <p>Enable your current location for better services</p>
//                         </div>
//                         <button type="button" className="reject-btn">Enable</button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="edit-add">
//                     <h2>Save Address as <span>*</span></h2>
//                     <div className="address-tags">
//                       {['Home', 'Office', 'Other'].map((tag) => (
//                         <button
//                           key={tag}
//                           type="button"
//                           className={addressType === tag ? "active" : ""}
//                           onClick={() => setAddressType(tag)}
//                         >
//                           {tag}
//                         </button>
//                       ))}
//                     </div>
//                     <div className="addres-form">
//                       {/* <input type="text" placeholder="Flat/ House no/ Building name" value="8502" /> */}

//                       <input
//                         type="text"
//                         name="flat"
//                         placeholder="Flat/ House no/ Building name"
//                         value={formData.flat}
//                         onChange={handleChange}
//                         style={errors.flat ? { borderColor: 'red' } : {}}
//                       />
//                       {errors.flat && <span style={{ color: 'red', fontSize: '12px' }}>{errors.flat}</span>}

//                       {/* Floor */}
//                       <input
//                         type="text"
//                         name="floor"
//                         placeholder="Floor (Optional)"
//                         value={formData.floor}
//                         onChange={handleChange}
//                       />

//                       {/* Area */}
//                       <input
//                         type="text"
//                         name="area"
//                         placeholder="Area/ Sector/ Locality"
//                         value={formData.area}
//                         onChange={handleChange}
//                         style={errors.area ? { borderColor: 'red' } : {}}
//                       />
//                       {errors.area && <span style={{ color: 'red', fontSize: '12px' }}>{errors.area}</span>}

//                       {/* Landmark */}
//                       <input
//                         type="text"
//                         name="landmark"
//                         placeholder="Nearby Landmark (Optional)"
//                         value={formData.landmark}
//                         onChange={handleChange}
//                       />
//                       <button type="submit" className="primary-cta mt-3">
//                         {selectedAddress ? "Update Address" : "Save Address"}
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default NewAddressModal








'use client'
import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";


interface NewAddressModalProps {
  selectedAddress: any; // Agar aapke paas Address ka specific interface hai toh 'any' ki jagah wo use karein
  onSave: (data: any) => void;
  onClose: () => void;
}


// const NewAddressModal = ({ selectedAddress, onSave, onClose }) => {
const NewAddressModal: React.FC<NewAddressModalProps> = ({ selectedAddress, onSave, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [isAutoEnabled, setIsAutoEnabled] = useState(false);

  // 1. Validation Schema
  const validationSchema = Yup.object({
    house: Yup.string()
      .min(3, "Building name or House no is too short")
      .required("Building name or House no is required"),
    area: Yup.string()
      .min(5, "Please provide a more detailed area")
      .required("Area/Locality is required"),
    floor: Yup.string(),
    landmark: Yup.string(),
    addressType: Yup.string().required(),
  });

  // 2. Formik Configuration
  const formik = useFormik({
    initialValues: {
      house: "",
      floor: "",
      area: "",
      landmark: "",
      addressType: "Home",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const finalData = {
        id: selectedAddress ? selectedAddress.id : Date.now(),
        ...values,
        flat: values.house,
        fullAddress: `${values.house}, ${values.floor ? values.floor + "," : ""} ${values.area}`,
        updatedAt: new Date().toISOString()
      };

      onSave(finalData);
      formik.resetForm();
      onClose();

      handleModalClose();
    },
  });




  // 3. Handle Edit Mode (Populate form when selectedAddress changes)
  useEffect(() => {
    if (selectedAddress && !isAutoEnabled) {
      formik.setValues({
        house: selectedAddress.house || selectedAddress.flat || "",
        floor: selectedAddress.floor || "",
        area: selectedAddress.area || "",
        landmark: selectedAddress.landmark || "",
        addressType: selectedAddress.type || selectedAddress.addressType || "Home",
      });
    } else {
      formik.resetForm();
    }
    setIsAutoEnabled(false);
  }, [selectedAddress]);





  // 4. Geolocation Logic
  const fetchCurrentLocation = async () => {
    if (!navigator.geolocation) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          if (data && data.address) {
            const areaName = data.address.suburb || data.display_name.split(',')[1] || data.address.suburb || data.address.neighbourhood || data.address.city_district || data.address.town || "Unknown Area";
            const houseInfo = data.address.road || data.address.amenity || "Detected Building";
            const landmarkInfo = data.address.suburb || data.display_name.split(',')[1];

            formik.setFieldValue("house", houseInfo);
            formik.setFieldValue("area", areaName);
            formik.setFieldValue("landmark", `Near${landmarkInfo}`);
          }
        } catch (err) {
          console.error("Fetch Error:", err);
        } finally {
          setLoading(false);
        }
      },
      () => setLoading(false)
    );
  };

  useEffect(() => {
    if (isAutoEnabled) fetchCurrentLocation();
  }, [isAutoEnabled]);

  const handleModalClose = (): void => {
    formik.resetForm();

    // TypeScript ko batana padega ki ye ek Button element hai
    const closeBtn = document.querySelector<HTMLButtonElement>("#add-address-popup .btn-close");

    onClose();

    // Optional chaining use karein taaki agar null ho toh crash na ho
    closeBtn?.click();
  };





  // const [addressType, setAddressType] = useState('Home');
  // const [formData, setFormData] = useState({
  //   flat: '',
  //   floor: '',
  //   area: '',
  //   landmark: ''
  // });

  // const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   if (selectedAddress) {
  //     setAddressType(selectedAddress.type || 'Home');
  //     setFormData({
  //       flat: selectedAddress.flat || '',
  //       floor: selectedAddress.floor || '',
  //       area: selectedAddress.area || '',
  //       landmark: selectedAddress.landmark || ''
  //     });
  //   } else {
  //     setAddressType('Home');
  //     setFormData({ flat: '', floor: '', area: '', landmark: '' });
  //   }
  //   setErrors({}); // Modal khulne par errors clear kar do
  // }, [selectedAddress]);


  // const validate = () => {
  //   let newErrors = {};

  //   if (!formData.flat.trim()) {
  //     newErrors.flat = "Flat/House no. is required";
  //   }

  //   if (!formData.area.trim()) {
  //     newErrors.area = "Area/Locality is required";
  //   } else if (formData.area.trim().length < 3) {
  //     newErrors.area = "Area name is too short";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });

  //   // Typing karte waqt error remove karna
  //   if (errors[name]) {
  //     setErrors({ ...errors, [name]: "" });
  //   }
  // };

  return (
    <>
      <div className="modal fade" id="add-address-popup" data-bs-backdrop="static" tabIndex={-1}
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
            <div className="modal-body">
              <div className="select-date-time-wrp">
                <h1>{selectedAddress ? "Edit Address" : "Add New Address"}</h1>

                <form onSubmit={formik.handleSubmit}>
                  <div className="your-location-top">
                    <div className="your-location-top-in">
                      <div className="use-location">
                        <img src="images/saved-addresses/location.svg" alt="" />
                        <div className="use-location-data">
                          {/* <h5>Use My Current Location</h5>
                          <p>Enable your current location for better services</p> */}


                          <h5>Use My Current Location</h5>
                          <p>{isAutoEnabled ? "Auto-detection is ON" : "Enable for automatic location fetch"}</p>



                        </div>
                        {/* <button type="button" className="reject-btn">Enable</button> */}

                        <button
                          type="button"
                          className={`reject-btn ${isAutoEnabled ? "active-mode" : ""}`}
                          onClick={() => setIsAutoEnabled(!isAutoEnabled)}
                          style={{
                            backgroundColor: isAutoEnabled ? "#ff4d4d" : "#4CAF50",
                            color: "white",
                          }}
                        >
                          {loading ? "..." : isAutoEnabled ? "Disable" : "Enable"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="edit-add">
                    <h2>Save Address as <span>*</span></h2>
                    <div className="address-tags">
                      {["Home", "Office", "Other"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={formik.values.addressType === type ? "active" : ""}
                          onClick={() => formik.setFieldValue("addressType", type)}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <div className="addres-form">
                      {/* <input type="text" placeholder="Flat/ House no/ Building name" value="8502" /> */}

                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Flat/ House no/ Building name *"
                          {...formik.getFieldProps("house")}
                          style={formik.touched.house && formik.errors.house ? { borderColor: 'red' } : {}}
                        />
                        {formik.touched.house && formik.errors.house && (
                          <span style={{ color: 'red', fontSize: '12px' }}>{formik.errors.house}</span>
                        )}
                      </div>

                      {/* Floor Input */}
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Floor (Optional)"
                          {...formik.getFieldProps("floor")}
                        />
                      </div>

                      {/* Area Input */}
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Area/ Sector/ Locality *"
                          {...formik.getFieldProps("area")}
                          style={formik.touched.area && formik.errors.area ? { borderColor: 'red' } : {}}
                        />
                        {formik.touched.area && formik.errors.area && (
                          <span style={{ color: 'red', fontSize: '12px' }}>{formik.errors.area}</span>
                        )}
                      </div>

                      {/* Landmark Input */}
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Nearby Landmark (Optional)"
                          {...formik.getFieldProps("landmark")}
                        />
                      </div>
                      <button type="submit" className="primary-cta mt-3">
                        {selectedAddress ? "Update Address" : "Save Address"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewAddressModal


















