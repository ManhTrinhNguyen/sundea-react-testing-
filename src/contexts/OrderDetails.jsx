import { useContext, createContext, useState } from 'react'
import { pricePerItem } from '../constants/pricePerItem';

const OrderDetails = createContext();

// create custom hook to check whether we are in a provider 

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails)

  if (!contextValue) {
    throw new Error ("useOrderDetails must be called from within an OrderDetailsProvider")
  };

  return contextValue
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {}
  })

  function updateItemCount(itemName, newItemCount, optionType) {
    // Make a copy of existing state
    let newOptionCounts = { ...optionCounts }
    // Update copy with the new infomation 
    newOptionCounts[optionType][itemName] = newItemCount
    // Update state with updated copy 
    setOptionCounts(newOptionCounts)
  }
  
  function resetOrder() {
    setOptionCounts({
      scoops: {},
      toppings: {}
    })
  }

  function calculateTotal(optionType) {
    // get an array of counts for the optionType 
    const countsArray = Object.values(optionCounts[optionType])
    // total the values in the array of counts 
    const totalCount = countsArray.reduce((total, value) => total + value, 0)
    // multiply the total number of items by the price for this item type
    return totalCount * pricePerItem[optionType]
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings")
  }

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />
}