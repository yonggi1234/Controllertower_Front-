import React, { useEffect, useRef } from 'react';

function Content() {
    const screenRef = useRef(null);

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                var N = 4;
                var mar = 2;
                const totalN = N * (N + 1);
                const screen = screenRef.current;
                if (screen) {
                    screen.innerHTML = "";

                    const widthPerItem = (width - 20) / (N + 1) - 2 * (N + 1);
                    const heightPerItem = (height - 20) / N - 2 * N;

                    for (let i = 0; i < totalN; i++) {
                        let img = document.createElement("img");
                        img.setAttribute("class", "screenImage");
                        img.setAttribute("style", `width:${widthPerItem}px;height:${heightPerItem}px;`);
                        img.setAttribute("src", `https://placehold.co/${widthPerItem}x${heightPerItem}/`);
                        screen.appendChild(img);
                    }
                }
            }
        });
        if (screenRef.current) {
            observer.observe(screenRef.current);
        }
        return () => {
            if (screenRef.current) {
                observer.unobserve(screenRef.current);
            }
        };
    }, []);

    return (
        <div className="content">
            <div className="left_content">
                <div className="list">
                    <div className="list_header">
                        {/* <img src="./rec_button.png"/> */}
                        List
                    </div>
                    <div className="camera_list">
                        {[...Array(50)].map((_, i) => (
                            <div className="li" key={i}>
                                camera_name{i}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="warnings">
                    <div className="warning_header">
                        ⚠️ warning
                    </div>
                    <div className="warning_list">
                        {[...Array(50)].map((_, i) => (
                            <div className="wli" key={i}>
                                camera_name{i}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="screen" ref={screenRef}>
                {/* ResizeObserver 구현 */}
            </div>
        </div>
    );
}

export default Content;
