import { useEffect, useRef } from 'react';

const useFields = (callback, time) => {

    useEffect(() => {
        const interval = setInterval(() => {
            callback()
        }, time);

        console.log('render interval');
        
        
        return () => clearInterval(interval);
    })

};

export default useFields