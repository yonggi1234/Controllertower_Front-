import  { useEffect } from 'react';

const FetchWarnings = ({ setWarnings }) => {
    useEffect(() => {
        const warningURLs = Array.from({ length: 6 }, (_, i) => `https://gamst.omoknooni.link/video/${i + 1}/risk/`);

        Promise.all(
            warningURLs.map(url =>
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.results) {
                            return data.results.map(result => ({
                                id: parseInt(url.match(/\/video\/(\d+)\/risk/)[1]),
                                url: result.clip_url,
                                type: 'Video'
                            }));
                        } else {
                            console.error('Invalid video data:', data);
                            return [];
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching video data:', error);
                        return [];
                    })
            )
        )
        .then(warningsData => {
            const mergedWarnings = warningsData.flat();
            setWarnings(prevWarnings => [...prevWarnings, ...mergedWarnings]);
        });
    }, [setWarnings]);

    return null;
};

export default FetchWarnings;
