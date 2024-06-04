import { useEffect } from 'react';

const SSEWarnings = ({ setWarnings, setHighlightedData }) => {
    useEffect(() => {
        const eventSource = new EventSource('https://gamst.omoknooni.link/camera/stream/');
        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            const newCamera = {
                id: eventData.id,
                video_uid: eventData.video_uid,
                url: eventData.section_video_url,
                created_at: eventData.created_at,
                type: 'Camera'
            };

            setWarnings(prevWarnings => {
                const isDuplicate = prevWarnings.some(warning => warning.video_uid === newCamera.video_uid);
                if (isDuplicate) {
                    return prevWarnings;
                }
                return [newCamera, ...prevWarnings];
            });

            setHighlightedData(prevData => {
                if (prevData.some(item => item.video_uid === newCamera.video_uid)) {
                    return prevData;
                } else {
                    return [...prevData, newCamera];
                }
            });

            setTimeout(() => {
                setHighlightedData(prevData => prevData.filter(item => item.video_uid !== newCamera.video_uid));
            }, 3000);
        };

        return () => {
            eventSource.close();
        };
    }, [setWarnings, setHighlightedData]);

    return null;
};

export default SSEWarnings;
