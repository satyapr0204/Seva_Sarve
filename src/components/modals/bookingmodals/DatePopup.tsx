import React, { useEffect, useState } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/style.css";
import { toast } from "react-hot-toast";

interface TimeSlot {
  id: number;
  time: string;
}

const DatePopup: React.FC = () => {
   const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [address, setAddress] = useState<string>(
    "123, Street, Anywhere, 11001"
  );

  

  const timeSlots: TimeSlot[] = [
    {
      id: 1,
      time: "11:00 AM - 1:00 PM",
    },
    {
      id: 2,
      time: "1:00 PM - 3:00 PM",
    },
    {
      id: 3,
      time: "3:00 PM - 5:00 PM",
    },
    {
      id: 4,
      time: "5:00 PM - 7:00 PM",
    },
    {
      id: 5,
      time: "7:00 PM - 9:00 PM",
    },
  ];

useEffect(() => {
  const modal = document.getElementById("select-date-time-popup");

  const initDatepicker = () => {
    const $ = (window as any).$;

    if ($ && $.fn?.datepicker) {
      if ($("#datepicker-2").hasClass("hasDatepicker")) {
        $("#datepicker-2").datepicker("destroy");
      }

      ($("#datepicker-2") as any).datepicker({
        minDate: 0,
        dateFormat: "dd M yy",
        onSelect: (dateText: string) => {
          console.log("Selected:", dateText);
          setSelectedDate(dateText);
        },
      });
    }
  };

  modal?.addEventListener("shown.bs.modal", initDatepicker);

  return () => {
    modal?.removeEventListener("shown.bs.modal", initDatepicker);
  };
}, []);

  const handleConfirmBooking = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }

    console.log({
      booking_date: selectedDate,
      booking_time: selectedTime,
      address,
    });

    const nextModal = document.getElementById("rescheduleRequest");

    if (nextModal) {
      const bootstrap = (window as any).bootstrap;

      const currentModal = document.getElementById(
        "select-date-time-popup"
      );

      if (currentModal) {
        const currentInstance =
          bootstrap.Modal.getInstance(currentModal) ||
          new bootstrap.Modal(currentModal);

        currentInstance.hide();
      }

      const nextInstance = new bootstrap.Modal(nextModal);
      nextInstance.show();
    }
  };

  const removeSelectedSlot = () => {
    setSelectedTime("");
  };

  return (
    <>
      <div
        className="modal fade"
        id="select-date-time-popup"
        data-bs-backdrop="static"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>

            <div className="modal-body">
              <div className="select-date-time-wrp">
                <h1>Reschedule Booking</h1>

                <form  >
                  <div className="select-date-time-inner" >
                    <div className="select-date-in"  >
                    <div id="datepicker-2" style={{width:'100%'}}></div>
                        
                    </div>


                    <div className="select-time-in">
                      {selectedDate && selectedTime && (
                        <div className="saved-date-times">
                          <h3>
                            Time Slot -{" "}
                          {new Date(selectedDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                          </h3>

                          <p>{selectedTime}</p>

                          <button
                            type="button"
                            className="remove-btn"
                            onClick={removeSelectedSlot}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      )}

                      <h2>
                        Time Slot
                        {selectedDate &&
                          ` - ${new Date(selectedDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}`}
                      </h2>

                      <div className="select-time-btn-grp">
                        {timeSlots.map((slot) => (
                          <React.Fragment key={slot.id}>
                            <input
                              type="radio"
                              hidden
                              id={`time-${slot.id}`}
                              name="time"
                              value={slot.time}
                              checked={selectedTime === slot.time}
                              onChange={() =>
                                setSelectedTime(slot.time)
                              }
                            />

                            <label htmlFor={`time-${slot.id}`}>
                              <i className="fa-regular fa-clock"></i>{" "}
                              {slot.time}
                            </label>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="service-address">
                    <p>Service Address</p>

                    <input
                      type="text"
                      placeholder="Enter full address"
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                    />
                  </div>

                  <div className="select-date-time-foot">
                    <button
                      type="button"
                      className="unfilled"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="filled"
                      onClick={handleConfirmBooking}
                    >
                      Confirm & Book
                      <img
                        src="images/home/right-img.svg"
                        alt=""
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatePopup;