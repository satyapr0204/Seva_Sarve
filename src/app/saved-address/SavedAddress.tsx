'use client'
import DeleteAddressModal from '@/components/modals/Address/DeleteAddressModal'
import NewAddressModal from '@/components/modals/Address/NewAddressModal'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const INITIAL_ADDRESSES = [
  {
    id: 1,
    type: 'Home',
    flat: '2118',
    floor: '2nd Floor',
    area: 'Thornridge Cir. Syracuse',
    landmark: 'Near Central Park',
    fullAddress: '2118, 2nd Floor, Thornridge Cir. Syracuse, Connecticut 35624',
    icon: 'images/saved-addresses/1.svg'
  },
  {
    id: 2,
    type: 'Office',
    flat: '4517',
    floor: '',
    area: 'Washington Ave. Manchester',
    landmark: 'Opposite Metro Station',
    fullAddress: '4517, Washington Ave. Manchester, Kentucky 39495',
    icon: 'images/saved-addresses/2.svg'
  }
];


const SavedAddress = () => {
  const router = useRouter();
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const handleSaveOrUpdate = (newData: any) => {
    const finalData = {
      ...newData,
      icon: newData.type === 'Home' ? 'images/saved-addresses/1.svg' :
        newData.type === 'Office' ? 'images/saved-addresses/2.svg' :
          'images/saved-addresses/3.svg',
      address: `${newData.flat}${newData.floor ? ', ' + newData.floor : ''}, ${newData.area}`
    };

    const exists = addresses.find(a => a.id === finalData.id);

    let updatedList;
    if (exists) {
      updatedList = addresses.map(a => a.id === finalData.id ? finalData : a);
    } else {
      updatedList = [...addresses, finalData];
    }
    setAddresses(updatedList);
    setSelectedAddress(null);
  };



  const handleDelete = (id: any) => {
    setAddresses(addresses.filter(a => a.id !== id));
    setSelectedAddress(null);
  };

  return (
    <>
      <main>
        <div className="container home-wraper my-profile">
          <section>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="browse-wrp">
                    <div className="browse-ctg-head my-con-head">
                      <h2 className="sub-cate-page">
                        <a href="#" onClick={(e) => { e.preventDefault(); router.back(); }}>
                          <img src="images/home/left-arrow.svg" alt="" /></a>
                        Saved Address
                      </h2>
                      <a type="button" data-bs-target="#add-address-popup" data-bs-toggle="modal" className="primary-cta"><i
                        className="fa-solid fa-plus"></i> Add New Address</a>
                    </div>
                    <div className="saved-addresses-wrp">
                      <h3>Your Saved Addresses</h3>
                      {addresses.map((item) => (
                        <div className="saved-addresses-in" key={item.id}>
                          <div className="saved-addresses-icon">
                            <img src={item.icon} alt={item.type} />
                          </div>
                          <div className="saved-addresses-data">
                            <h4>{item.type}</h4>
                            <p style={{ lineHeight: '1.4' }}>
                              <strong>{item.flat}</strong>{item.floor ? `, ${item.floor}` : ''} <br />
                              <span style={{ fontSize: '0.9em', opacity: '0.8' }}>
                                {item.area} {item.landmark && `(Near ${item.landmark})`}
                              </span>
                            </p>
                          </div>
                          {/* <div className="saved-addresses-cta">
                            <button
                              type="button"
                              data-bs-target="#add-address-popup"
                              data-bs-toggle="modal"
                              onClick={() => setSelectedAddress(item)}
                            >
                              <img src="images/saved-addresses/edit.svg" alt="Edit" />
                            </button>
                            <button
                              type="button"
                              data-bs-target="#delete-address-popup"
                              data-bs-toggle="modal"
                              onClick={() => setSelectedAddress(item)}
                            >
                              <img src="images/saved-addresses/delete.svg" alt="Delete" />
                            </button>
                          </div> */}



                          <div className="saved-addresses-cta">
                            {/* Edit Button */}
                            <button
                              type="button"
                              data-bs-target="#add-address-popup"
                              data-bs-toggle="modal"
                              onClick={() => setSelectedAddress(item)}
                            >
                              <img src="images/saved-addresses/edit.svg" alt="Edit" />
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              data-bs-target="#delete-address-popup"
                              data-bs-toggle="modal"
                              onClick={() => setSelectedAddress(item)}
                            >
                              <img src="images/saved-addresses/delete.svg" alt="Delete" />
                            </button>
                          </div>


                        </div>
                      ))}
                      {addresses.length === 0 && <p className="text-center py-4">No saved addresses found.</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <NewAddressModal
        selectedAddress={selectedAddress}
        onSave={handleSaveOrUpdate}
        onClose={() => setSelectedAddress(null)}
      />
      <DeleteAddressModal
        selectedAddress={selectedAddress}
        onDelete={handleDelete}
        onClose={() => setSelectedAddress(null)}
      />
    </>
  )
}

export default SavedAddress
