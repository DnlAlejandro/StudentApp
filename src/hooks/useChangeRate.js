import { useState, useEffect } from 'react';

const host = "api.frankfurter.app";

export const useChangeRate = (amount) => {
    const [convertedAmount, setConvertedAmount] = useState(null);

    useEffect(() => {
        if (amount) {
            fetch(`https://${host}/latest?amount=${amount}&from=USD&to=EUR`)
                .then(resp => resp.json())
                .then(data => {
                    if (data.rates && data.rates.EUR) {
                        setConvertedAmount(data.rates.EUR);
                    }
                })
                .catch(error => {
                    console.error('Error fetching currency data:', error);
                    setConvertedAmount(null);
                });
        }
    }, [amount]);

    return convertedAmount;
}