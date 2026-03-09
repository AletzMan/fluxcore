import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement = HTMLDivElement>(handler: () => void) => {
    const ref = useRef<T>(null);
    const handlerRef = useRef(handler);

    // Actualiza el ref cada vez que el handler cambie
    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handlerRef.current();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, []);

    return ref;
};
