const axios = require('axios');
const fs = require('fs');
const { Module } = require('module');

// Don't add forward slash at the end
const resilliendb_url = 'https://4a49-168-150-28-100.ngrok-free.app';

const transform_resillient_data = async (resilientData) => {
    try {
        const input = resilientData

        const transactions = input.flatMap((entry) => {
            if (entry.operation === "TRANSFER") {
                const from = entry.inputs[0].owners_before[0];
                const to = entry.outputs[0].public_keys[0];
                const amount = parseInt(entry.outputs[0].amount);

                // Extract timestamp from metadata (if available)
                const timestamp =
                    entry.metadata && entry.metadata.timestamp
                        ? entry.metadata.timestamp
                        : null;

                return [
                    {
                        from,
                        to,
                        amount,
                        timestamp,
                    },
                ];
            } else {
                return [];
            }
        });

        // Write new data into transformed-data.json
        fs.writeFileSync('./database/transformed_data.json', '');
        fs.writeFileSync('./database/transformed_data.json', JSON.stringify(transactions));
    } catch (e) {
        console.warn('Error transforming data, retrying in 5 seconds...', new Date(), e);
    }
}

const transactionPolling = async () => {
    try {
        let shouldContinue = true;
        while (shouldContinue) {
            console.log('Polling...');
            const response_resilient = await axios({
                        method: 'get',
                        url: `${resilliendb_url}/v1/transactions`
                    });
                
            if(response_resilient.data) {
                // Clear raw-data.json
                fs.writeFileSync('./database/raw_data.json', '');
                // Write new data into raw-data.json
                fs.writeFileSync('./database/raw_data.json', JSON.stringify(response_resilient.data));
            
                // Once the data is written, we can start transforming data
                await transform_resillient_data(response_resilient.data);
            }
                    
            console.log('Polling Done');
            // Sleep for 30 seconds
            await new Promise(resolve => setTimeout(resolve, 30000));
        }
    } catch (e) {
            console.warn('Error fetching transactions, retrying in 5 seconds...', new Date());
    }
};

module.exports = {transactionPolling};