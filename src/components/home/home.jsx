import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, addMonths, subMonths, getDay } from 'date-fns';
import { useSwipeable } from 'react-swipeable';
import './home.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { db } from '../../config/firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { TiTickOutline } from "react-icons/ti";

const Home = () => {
  const [thingList, setThingList] = useState([]);
  const thingCollectionRef = collection(db, 'things');

  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  const [settledThings, setSettledThings] = useState([]);
  const [selectedThingId, setSelectedThingId] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    const getThingList = async () => {
      try {
        const data = await getDocs(thingCollectionRef);
        const allThings = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setThingList(allThings);
      } catch (err) {
        console.error(err);
      }
    };

    getThingList();
  }, [thingCollectionRef]);

  const formatMalaysianDate = (date) => {
    const options = { timeZone: 'Asia/Kuala_Lumpur', day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('en-MY', options).format(date);
  };

  const renderCalendar = () => {
    const firstDayOfWeek = getDay(firstDayOfMonth);

    const daysWithPlaceholders = Array.from({ length: firstDayOfWeek }).fill(null).concat(daysInMonth);

    return (
      <div className="calendar">
        <div className="calendar-row">
          <div className="month-name">{format(currentDate, 'MMMM')}</div>
        </div>
        <div className="calendar-row">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="calendar-day">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-row">
          {daysWithPlaceholders.map((day, index) => (
            <div
              key={index}
              className={`calendar-no ${isToday(day) ? 'today' : ''} ${
                isSameMonth(day, currentDate) ? 'current-month' : 'other-month'
              }`}
            >
              {day ? format(day, 'd') : ''}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      handleNextMonth();
    } else if (direction === 'right') {
      handlePrevMonth();
    }
  };

  const doneThing = async (id) => {
    try {
      setSelectedThingId(id);
      setSelectedAction('done');
      console.log(`Done button clicked for thingId: ${id}`);
    } catch (error) {
      console.error('Error updating settle date: ', error);
    }
  };

  const deleteThing = async (id) => {
    const userDoc = doc(thingCollectionRef, id);
    await deleteDoc(userDoc);
  };
  
  return (
    <>
      <section>
        <div className="title">Home</div>
        <div className="calendar-container">
          <div className="date-container">
            <p>{formatMalaysianDate(currentDate)}</p>
          </div>
          <useSwipeable onSwipedLeft={() => handleSwipe('left')} onSwipedRight={() => handleSwipe('right')}>
            <div className="navigation">
              <button className="navigation-buttons" onClick={handlePrevMonth}>
                <FaArrowLeft />
              </button>
              {renderCalendar()}
              <button className="navigation-buttons" onClick={handleNextMonth}>
                <FaArrowRight />
              </button>
            </div>
          </useSwipeable>
        </div>
        <div className="list-container">
          <div className="listing overdue">
              <h3>Overdue</h3>
              <div className="listed">
                {thingList.map((thing) => {
                  const expiredDate = thing.expiredDate instanceof Date ? thing.expiredDate : thing.expiredDate?.toDate();
                  const currentDate = new Date();
                  const differenceInDays = Math.floor((expiredDate - currentDate) / (24 * 60 * 60 * 1000));
                  const isSettled = thing.settleDate instanceof Date;
  
                  if (differenceInDays < 0 && !isSettled) {
                    return (
                      <>
                        <div className="list-info">
                          <div className="list-num">
                            <h3>{differenceInDays}</h3>
                          </div>
                          <div className="list-title">
                            <table>
                              <tr>
                                <th>Type</th>
                                <td>: </td>
                                <td>{thing.types}</td>
                              </tr>
                              <tr>
                                <th>Layer</th>
                                <td>: </td>
                                <td>{thing.layer}</td>
                              </tr>
                              <tr>
                                <th>Expired Date</th>
                                <td>: </td>
                                <td>{formatMalaysianDate(expiredDate)}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        <div className="list-buttons">
                          <button className="list-button-delete" onClick={() => deleteThing(thing.id)}>
                            Delete
                          </button>
                          <button className="list-button-done" onClick={() => doneThing(thing.id)}>
                            Done
                          </button>
                          <button className="list-button-edit">Edit</button>
                        </div>
                        </>
                    );
                  }
                })}
              </div>
            </div>
            <div className="listing less-than-7days">
              <h3>Less than 1 week </h3>
              <div className="listed">
                {thingList.map((thing) => {
                  const expiredDate = thing.expiredDate instanceof Date ? thing.expiredDate : thing.expiredDate?.toDate();
                  const currentDate = new Date();
                  const differenceInDays = Math.floor((expiredDate - currentDate) / (24 * 60 * 60 * 1000));
                  const isSettled = thing.settleDate instanceof Date;
  
                  if (differenceInDays < 0 && !isSettled) {
                    return (
                      <>
                        <div className="list-info">
                          <div className="list-num">
                            <h3>{differenceInDays}</h3>
                          </div>
                          <div className="list-title">
                            <table>
                              <tr>
                                <th>Type</th>
                                <td>: </td>
                                <td>{thing.types}</td>
                              </tr>
                              <tr>
                                <th>Layer</th>
                                <td>: </td>
                                <td>{thing.layer}</td>
                              </tr>
                              <tr>
                                <th>Expired Date</th>
                                <td>: </td>
                                <td>{formatMalaysianDate(expiredDate)}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        <div className="list-buttons">
                          <button className="list-button-delete" onClick={() => deleteThing(thing.id)}>
                            Delete
                          </button>
                          <button className="list-button-done" onClick={() => doneThing(thing.id)}>
                            Done
                          </button>
                          <button className="list-button-edit">Edit</button>
                        </div>
                        </>
                    );
                  }
                })}
              </div>
            </div>
            <div className="listing less-than-1month">
              <h3>Less than 1 month</h3>
              <div className="listed">
                {thingList.map((thing) => {
                  const expiredDate = thing.expiredDate instanceof Date ? thing.expiredDate : thing.expiredDate?.toDate();
                  const currentDate = new Date();
                  const differenceInDays = Math.floor((expiredDate - currentDate) / (24 * 60 * 60 * 1000));
                  const isSettled = thing.settleDate instanceof Date;
  
                   if (differenceInDays >= 0 && differenceInDays < 7 && !isSettled) {
                    return (
                      <>
                        <div className="list-info">
                          <div className="list-num">
                            <h3>{differenceInDays}</h3>
                          </div>
                          <div className="list-title">
                            <table>
                              <tr>
                                <th>Type</th>
                                <td>: </td>
                                <td>{thing.types}</td>
                              </tr>
                              <tr>
                                <th>Layer</th>
                                <td>: </td>
                                <td>{thing.layer}</td>
                              </tr>
                              <tr>
                                <th>Expired Date</th>
                                <td>: </td>
                                <td>{formatMalaysianDate(expiredDate)}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        <div className="list-buttons">
                          <button className="list-button-delete" onClick={() => deleteThing(thing.id)}>
                            Delete
                          </button>
                          <button className="list-button-done" onClick={() => doneThing(thing.id)}>
                            Done
                          </button>
                          <button className="list-button-edit">Edit</button>
                        </div>
                        </>
                    );
                  }
                })}
              </div>
            </div>
            <div className="listing more-than-1month">
              <h3>More than 1 month</h3>
              <div className="listed">
                {thingList.map((thing) => {
                  const expiredDate = thing.expiredDate instanceof Date ? thing.expiredDate : thing.expiredDate?.toDate();
                  const currentDate = new Date();
                  const differenceInDays = Math.floor((expiredDate - currentDate) / (24 * 60 * 60 * 1000));
                  const isSettled = thing.settleDate instanceof Date;
  
                  if (differenceInDays >= 7 && differenceInDays < 30 && !isSettled) {
                      return (
                        <>
                        <div className="list-info">
                          <div className="list-num">
                            <h3>{differenceInDays}</h3>
                          </div>
                          <div className="list-title">
                            <table>
                              <tr>
                                <th>Type</th>
                                <td>: </td>
                                <td>{thing.types}</td>
                              </tr>
                              <tr>
                                <th>Layer</th>
                                <td>: </td>
                                <td>{thing.layer}</td>
                              </tr>
                              <tr>
                                <th>Expired Date</th>
                                <td>: </td>
                                <td>{formatMalaysianDate(expiredDate)}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        <div className="list-buttons">
                          <button className="list-button-delete" onClick={() => deleteThing(thing.id)}>
                            Delete
                          </button>
                          <button className="list-button-done" onClick={() => doneThing(thing.id)}>
                            Done
                          </button>
                          <button className="list-button-edit">Edit</button>
                        </div>
                        </>
                    );
                  }
                })}
              </div>
            </div>
            <div className="listing done">
              <h3>Done</h3>
              <div className="listed">
                {thingList.map((thing) => {
                  const expiredDate = thing.expiredDate instanceof Date ? thing.expiredDate : thing.expiredDate?.toDate();
                  const currentDate = new Date();
                  const differenceInDays = Math.floor((expiredDate - currentDate) / (24 * 60 * 60 * 1000));
                  const isSettled = thing.settleDate instanceof Date;
  
                  if (differenceInDays >= 7 && differenceInDays < 30 && !isSettled) {
                      return (
                        <>
                        <div className="list-info">
                          <div className="list-num">
                            <h3><TiTickOutline /></h3>
                          </div>
                          <div className="list-title">
                            <table>
                              <tr>
                                <th>Type</th>
                                <td>: </td>
                                <td>{thing.types}</td>
                              </tr>
                              <tr>
                                <th>Layer</th>
                                <td>: </td>
                                <td>{thing.layer}</td>
                              </tr>
                              <tr>
                                <th>Expired Date</th>
                                <td>: </td>
                                <td>{formatMalaysianDate(expiredDate)}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        <div className="list-buttons">
                          <button className="list-button-delete" onClick={() => deleteThing(thing.id)}>
                            Delete
                          </button>
                          <button className="list-button-done" onClick={() => doneThing(thing.id)}>
                            Done
                          </button>
                          <button className="list-button-edit">Edit</button>
                        </div>
                        </>
                    );
                  }
                })}
              </div>
            </div>
        
          </div>
      </section>
    </>
  );
};

export default Home;
