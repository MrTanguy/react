import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calculatrice from './BoutonCalculatrice'
import BoutonCalculatrice from './BoutonCalculatrice'

function Screen({leftNumber, rightNumber, operator}){
  return <div>{leftNumber} {operator ? operator.symbol : ''} {rightNumber || ''}</div>
}

const NUMBERS = new Array(10)
  .fill('')
  .map( (_, i) => i)

const OPERATORS = [
  {
    symbol: '+',
    handleCalcul: (a, b) => a + b
  }, 
  {
    symbol: 'x',
    handleCalcul: (a, b) => a * b
  }
]

function App() {
  const [numA, setNumA] = useState(0)
  const [numB, setNumB] = useState(0)
  const [operator, setOperator] = useState(null)
  
  const handleNumberClick = useCallback((num) => {
    if(operator){
      setNumB(numB * 10 + num)
    }
    else {
      setNumA(numA * 10 + num)
    }
  }, [operator, numB, numA])
  
  const handleSymbolClick = useCallback((op) => {
    if(numB){
      setNumA(operator.handleCalcul(numA, numB))
      setNumB(0)
      setOperator(op)
    }
    else {
      if(!operator){
        setOperator(op)
      }
    }
  }, [operator, numB, numA])

  return (
    <div className="App">

      <Screen 
        leftNumber={numA} 
        operator={operator} 
        rightNumber={numB} 
      />
      <div>
        <div className="numerics">
          {NUMBERS.map( (e, i) => <BoutonCalculatrice
            key={i}
            onClick={handleNumberClick} 
            value={e}
          />)}
        </div>
        <div className="operators">
          {OPERATORS.map( (op, i) => <button 
            key={i}
            disabled={!numB && operator} 
            onClick={() => handleSymbolClick(op)} 
          >{op.symbol}</button>)}
        </div>
      </div>
    </div>
  )
}

export default App