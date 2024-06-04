import { useEffect } from 'react';

const SSEWarnings = ({ setWarnings, setHighlightedData, processedWarnings, setProcessedWarnings }) => {
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
                if (processedWarnings.some(item => item.video_uid === newCamera.video_uid) || prevData.some(item => item.video_uid === newCamera.video_uid)) {
                    return prevData;
                } else {
                    setProcessedWarnings(prevProcessed => [...prevProcessed, newCamera]);
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
    }, [setWarnings, setHighlightedData, processedWarnings, setProcessedWarnings]);

    return null;
};

export default SSEWarnings;
