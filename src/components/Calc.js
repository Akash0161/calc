import { evaluate } from 'mathjs';
import React, { useState , useEffect } from 'react'
import { FcCalculator } from "react-icons/fc";

const Calc = () => {

const [input,setInput] = useState('');
const [result,setResult] = useState('');

const handleButtonClick = (value) => {
  setInput((prevInput) => prevInput + value);
};

const handleCalculate = () => {
  try {
    setResult(evaluate(input).toString());
  } catch (error) {
    setResult('');
  }
};

const handleClear = () => {
  setInput('');
  setResult('');
};


const handleButtonC = (value) => {
  if (value === 'C') {  
    setInput((prevInput) => prevInput.slice(0, -1));
  }
}

const handleButtonExpression = (value) => {
  if (value === '(+/-)') {
    if (input.startsWith('-')) {
      setInput(input.slice(1));
    } else {
      setInput('-' + input);
    }
  }
}


useEffect(() => {
  const handleKeyPress = (event) => {
    const { key } = event;

    
    const allowedKeys = '0123456789+-*/().';

    if (allowedKeys.includes(key)) {
      setInput((prevInput) => prevInput + key);
    } else if (key === 'Enter') {
      handleCalculate();
    } else if (key === 'Backspace') {
      setInput((prevInput) => prevInput.slice(0, -1));
    } else if (key === 'Escape') {
      handleClear();
    }
  };

  document.addEventListener('keydown', handleKeyPress);
  return () => document.removeEventListener('keydown', handleKeyPress);
}, [input]);

  return (
    <div className='box'>
      <h1 className='heading'>Calculator</h1>
            <div className='Calculator'>
                  
                  <div className='display'>
                    <div className='input'>{input}</div>
                     <div className='result'>{result}</div>
                  </div>

                  <div className='buttons'>
                      <button className='btn' onClick={()=> handleButtonClick('7')}>7</button>
                      <button className='btn' onClick={()=> handleButtonClick('8')}>8</button>
                      <button className='btn' onClick={()=> handleButtonClick('9')}>9</button>

                      <button className='operator' onClick={()=> handleButtonClick('/')}>/</button>
                      
                      <button className='btn' onClick={()=> handleButtonClick('6')}>6</button>
                      <button className='btn' onClick={()=> handleButtonClick('5')}>5</button>
                      <button className='btn' onClick={()=> handleButtonClick('4')}>4</button>
                      <button className='operator' onClick={()=> handleButtonClick('*')}>*</button>
                      <button className='btn' onClick={()=> handleButtonClick('3')}>3</button>
                      <button className='btn' onClick={()=> handleButtonClick('2')}>2</button>
                      <button className='btn' onClick={()=> handleButtonClick('1')}>1</button>
                      <button className='operator' onClick={()=> handleButtonClick('+')}>+</button>
                      <button className='btn' onClick={()=> handleButtonClick('0')}>0</button>
                      <button className='btn' onClick={()=> handleButtonClick('.')}>.</button>
                      <button className='equalto' onClick={handleCalculate}>=</button>
                      <button className='operator' onClick={()=> handleButtonClick('-')}>-</button>
                      <button className='btn2' onClick={handleCalculate}><FcCalculator className='cal' /></button>
                      <button className='btn2' onClick={()=> handleButtonC('C')}>C</button>
                      <button className='btn2' onClick={()=> handleButtonExpression('(+/-)')}>(+/-)</button>
                      <button className='clear' onClick={handleClear}>AC</button>
                      
                  </div>

            </div>
              
    </div>
  )
}

export default Calc