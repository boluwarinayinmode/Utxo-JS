
    
// Function to transform the input data
function transformData(input) {
    const users = Array.from(new Set(input.flatMap(entry => entry.inputs.flatMap(input => input.owners_before))));
    
    const transactions = input.map(entry => ({
        from: entry.inputs[0].owners_before[0],
        to: entry.outputs[0].public_keys[0],
        amount: parseInt(entry.outputs[0].amount),
    }));

    return {
        users,
        transactions,
    };
}

// Transform the data
const transformedData = transformData(inputData);

// Log the transformed data to the console
console.log(JSON.stringify(transformedData, null, 2));