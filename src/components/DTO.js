export function DataTransferObject(data) {
    let newData = []; // this is an empty array which will be appended based on the data available
  
    // here the data param passing the data from the api
    // contains arrays of arrays that i need
    // so I'm converting this to an object that can be mapped below.
    // so the keys are iterated below
    data.forEach((key, index) => {
      // below I'm appending the array and it's index with
      // the following keys and values
      newData[index] = { value: key[0], label: key[1] + " (" + key[0] + ")" };
    });
  
    // below an array of objects will be returned to where this function is called
    // setCurrencies(DataTransferObject(apiData));
    return newData;
  }
  