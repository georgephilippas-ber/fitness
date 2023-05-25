import { IonButton } from "@ionic/react";
import React, { useRef, useEffect, useState } from "react";

import { BrowserMultiFormatReader, Result } from "@zxing/library"

const browserMultiFormatReader = new BrowserMultiFormatReader();

export function Camera({ onBarcode }: { onBarcode: (barcode: string, referenceDate: number) => void })
{
    const videoRef = useRef<HTMLVideoElement>(null);

    const [mediaStream, set_mediaStream] = useState<MediaStream | undefined>(undefined);

    const [isScanning, set_isScanning] = useState<boolean>(false);

    useEffect(() =>
    {
        if (isScanning)
            navigator.mediaDevices.getUserMedia({ video: true }).then(value =>
            {
                if (videoRef.current)
                    videoRef.current.srcObject = value;

                set_mediaStream(value);
            }).catch(error =>
            {
                console.log(error);
            });

        return () =>
        {
            stop();
        }
    }, [isScanning]);

    useEffect(() =>
    {
        if (isScanning && videoRef.current)
        {
            browserMultiFormatReader.decodeFromVideo(videoRef.current).then(value =>
            {
                onBarcode(value.getText(), value.getTimestamp());

                stop();
                set_isScanning(false);
            });
        }
    }, [isScanning])

    function stop()
    {
        mediaStream?.getTracks().forEach(value =>
        {
            value.stop();

            if (videoRef.current)
                videoRef.current.srcObject = null;
        });

        set_mediaStream(undefined);
    }

    useEffect(() => {
        return () =>
        {
            stop();
        }
    }, []);


    return (
        <div>
            {isScanning ?
                <div style={{ border: "2px solid white", borderRadius: "0.45em", width: "15em", height: "5em", display: "flex", alignItems: "center", padding: "0.35em", gap: "0.3em" }}>
                    <video style={{ width: "10em", height: "3em", objectFit: "fill" }}
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                    />
                    <IonButton onClick={() =>
                    {
                        set_isScanning(false);
                        stop();
                    }}>Stop</IonButton>
                </div> : <div style={{ width: "15em", height: "5em", justifyContent: "center", display: "flex", alignItems: "center", padding: "0.35em" }}>
                    <IonButton onClick={() => set_isScanning(true)}>Scan</IonButton>
                </div>}
        </div>
    );
}
