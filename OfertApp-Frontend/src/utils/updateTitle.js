import { useEffect } from 'react';

export default function useUpdateTitle(title) {
    useEffect(() => {
        document.title = title;
    }, [title]);
}