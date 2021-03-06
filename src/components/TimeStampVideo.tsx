import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { TimeStampAnalytic } from "../types/types";
import { convertMsToDate } from "../utils/utils";


export default function TimeStampVideo(props: any) {

    const stamps = useSelector((state: any) => state.timestamps)

    const videoRef = useRef<HTMLVideoElement>()
    const canvasRef = useRef<HTMLCanvasElement>()


    useEffect(() => {
        videoRef.current?.addEventListener('timeupdate', handleTimeUpdate)


        canvasRef.current?.addEventListener('click', handleCanvasClick)
        videoRef.current?.addEventListener('play', () => {
            const ctx = canvasRef.current?.getContext('2d')

            ctx?.drawImage(videoRef.current as CanvasImageSource,
                0,
                0,
                videoRef.current?.width || 0,
                videoRef.current?.height || 0)

        })
        return () => {
            videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate)
            canvasRef.current?.removeEventListener('click', handleCanvasClick)
        }
    }, [stamps])

    function handleCanvasClick() {
        if (videoRef.current?.paused) {
            videoRef.current?.play()
        }
        else {
            videoRef.current?.pause()
        }
    }
    function handleTimeUpdate(event: Event) {
        let tmstmp = parseInt(((event.target as HTMLVideoElement).currentTime * 1000).toString())
            .toString()

        let indexTimestamp = stamps?.map((stamp: TimeStampAnalytic) => parseInt(
            stamp.timestamp.toString().substring(0, stamp.timestamp.toString().length - 3)
        ))
            .indexOf(parseInt(tmstmp.substring(0, tmstmp.length - 3)))

        if (indexTimestamp > -1) {
            const ctx = canvasRef.current?.getContext('2d')

            ctx!.strokeStyle = "green";
            ctx?.strokeRect(
                stamps[indexTimestamp].zone.left % (canvasRef.current!.width - 20),
                stamps[indexTimestamp].zone.top % (canvasRef.current!.height - 20),
                stamps[indexTimestamp].zone.width / 2,
                stamps[indexTimestamp].zone.height / 2)

            // ?????????????? ?????????? ???? ?????????????????? duration 
            setTimeout(() => {
                ctx?.clearRect(
                    0,
                    0,
                    canvasRef.current?.width || 0,
                    canvasRef.current?.height || 0);
            }, stamps[indexTimestamp].duration)

        }
    }

    return <div className='video-container'>
        <div className='video-zone'>
            <video ref={videoRef as LegacyRef<HTMLVideoElement>} className='video' controls >
                <source src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' />


            </video>
            <canvas ref={canvasRef as LegacyRef<HTMLCanvasElement>} className='timestap-zone'>

            </canvas>


        </div>

        <div>
            <div className='timestamps'>
                {
                    stamps ? stamps?.map((ts: TimeStampAnalytic, index: number) => {
                        function handleClick() {
                            videoRef.current!.currentTime = (ts.timestamp / 1000)
                        }
                        return <div key={index} className='timestamp' onClick={handleClick}>
                            {convertMsToDate(ts.timestamp)}
                        </div>
                    }) : null
                }
            </div>
        </div>
    </div>
}