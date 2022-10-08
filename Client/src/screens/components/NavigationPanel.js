import React from 'react';
import '../../assets/css/app.css';
import {MdArrowBack} from 'react-icons/md';
import {FaCircle} from 'react-icons/fa';

const NavigationPanel = (props) => {
	const handleClick= (e)=>{
		props.push("/")
	  }

	return (
		<div className='NavigationPanel'>
			<MdArrowBack onClick={handleClick} className='back'/>
			<div className='dots'>
				<FaCircle className='dotSelected' />
				<FaCircle className='dot' />
				<FaCircle className='dot' />
			</div>
			<div style={{flex: 2}}></div>
		</div>
	);
}



export default NavigationPanel;