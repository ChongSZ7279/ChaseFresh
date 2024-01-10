import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import './autoScan.css'
import { IoIosArrowForward } from 'react-icons/io';
import { GrGallery } from "react-icons/gr";
import { MdFlashlightOn } from "react-icons/md";
import { MdFlashlightOff } from "react-icons/md";


const AutoGroupContainer = styled.div`
    flex-shrink: 0;
    height: 15rem;
    margin-bottom: 16.9rem;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Rectangle261 = styled.div`
    background-color: #008000;
    height: 24rem;
    width: 24rem;
    left: 3.1rem;
    position: absolute;
    top: 3rem;
`;

const Rectangle260 = styled.div`

background-color: #d9d9d9;
height: 23rem;
width: 23rem;
left: 3.6rem;
position: absolute;
top: 3.6rem;
`;

const MediaContainer = styled.div`
    .screenshot-video {
        height: 20.3rem;
        left: 4.4rem;
        object-fit: cover;
        position: absolute;
        top: 4.9rem;
        vertical-align: top;
        width: 21.4rem;
        z-index: 1;
    }
`;



const AutoScan = () => {
    const [isLightOn, setLightOn] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const videoRef = useRef();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    useEffect(() => {
        // If an image is selected, display it in the video place
        if (videoRef.current && selectedImage) {
            videoRef.current.srcObject = null;
            videoRef.current.src = selectedImage;
        }
    }, [selectedImage]);

    const initCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    useEffect(() => {
        initCamera();
        return () => {
            // Cleanup: stop the camera stream when the component unmounts
            if (videoRef.current) {
                const stream = videoRef.current.srcObject;
                if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach((track) => track.stop());
                }
            }
        };
    }, []); // useEffect runs once when the component mounts

    const toggleLight = () => {
        setLightOn(!isLightOn);
    };

  return (
    <>
        <div className='title'>
            <a href='/add-thing'>Add Thing</a><IoIosArrowForward /> Auto
        </div>

            <AutoGroupContainer>
                <Rectangle261 />
                <Rectangle260 />
                {selectedImage ? (
                    <MediaContainer>
                        <img
                            className="screenshot-video"
                            src={selectedImage}
                            alt="Selected"
                        />

                    </MediaContainer>
                ) : (
                    <MediaContainer>
                        <video
                            className="screenshot-video"
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                        />
                    </MediaContainer>
                )}
            <button className='submit-button'>
                Gallery
                <label htmlFor="imageUpload" className="image-upload-label">
                    <GrGallery
                        className="image-Skb"
                        id="45:377"
                        onClick={toggleLight}
                        />
                </label>
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    />
            </button>
            <button className='submit-button' onClick={toggleLight}>
                {isLightOn ? (
                    <>
                        <p>Turn On</p>
                        <MdFlashlightOn
                            className="flash-light-abu"
                            id="45:379"
                            />
                    </>
                ) : (
                    <>
                        <p>Turn Off</p>
                        <MdFlashlightOff
                            className="flash-light-abu"
                            id="45:379"
                            />
                    </>
                )}
            </button>
                </AutoGroupContainer>
    </>
  )
}

export default AutoScan