import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosArrowForward } from 'react-icons/io';

const Auto = () => {
  const [selectedOption, setSelectedOption] = useState('normal');
  const [expiredDate, setExpiredDate] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div className='title'>
        Add Thing <IoIosArrowForward /> Auto
      </div>
      
      <div className="grey-container">
      <div className='selection-container'>
        <div className='select-title'>Type:</div>
        <select value={selectedOption} onChange={handleDropdownChange}>
          <option value='vegetables'>Vegetables</option>
          <option value='meat'>Meat</option>
          <option value='seafood'>Seafood</option>
          <option value='Fruit'>Fruit</option>
          <option value='snack'>Snack</option>
        </select>
      </div>
      <div className='selection-container'>
        <div className='select-title'>Layer:</div>
        <select value={selectedOption} onChange={handleDropdownChange}>
          <option value='1'>1</option>
          <option value='2'>2</option>
        </select>
      </div>
      <div className='selection-container'>
        <div className='select-title'>Expired Date:</div>
        <DatePicker
          selected={expiredDate}
          onChange={(date) => setExpiredDate(date)}
          minDate={new Date()} // Set minDate to today
        />
      </div>
      <div className='selection-container'>
        <div className='select-title'>Created Date:</div>
        <DatePicker
          selected={createdDate}
          onChange={(date) => setCreatedDate(date)}
        //   showTimeSelect
        //   timeFormat='HH:mm'
        //   timeIntervals={15}
        //   timeCaption='time'
        //   dateFormat='MMMM d, yyyy h:mm aa'
        />
      </div>
      <button className='submit-button'>Create</button>
      </div>
    </>
  );
};

export default Auto;
