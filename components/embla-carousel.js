import React, { useCallback, useRef, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import AutoHeight from 'embla-carousel-auto-height';
import Image from 'next/image';
import { getStrapiURL } from '../lib/api';


const EmblaCarousel = ({ images }) => {
    const AutoPlayOptions = {
        delay: 4000,
        stopOnMouseEnter: true,
    }

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,

    }, [
        Autoplay(AutoPlayOptions),
        AutoHeight()
    ])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

// animation: Fix ANimation speed and pick events to start and stop animation
    // const rafId = useRef(0); // requestAnimationFrame ID

    // const animate = useCallback(() => {
    //     if (!emblaApi || !rafId.current) return;

    //     const engine = emblaApi.internalEngine();
    //     engine.location.add(-1);
    //     engine.target.set(engine.location);
    //     engine.scrollLooper.loop(-1);
    //     engine.slideLooper.loop();
    //     engine.translate.to(engine.location);
    //     rafId.current = requestAnimationFrame(animate);
    // }, [emblaApi]);

    // const startAutoScroll = useCallback(() => {
    //     rafId.current = requestAnimationFrame(animate);
    // }, [animate]);

    // const stopAutoScroll = useCallback(() => {
    //     rafId.current = cancelAnimationFrame(rafId.current) || 0;
    // }, []);

    // useEffect(() => {
    //     if (!emblaApi) return;
    //     emblaApi.on("init", startAutoScroll);
    //mouse over???
    //     emblaApi.on("pointerDown", stopAutoScroll);
    //     //   emblaApi.on("pointerDown", startAutoScroll);

    //     startAutoScroll();
    //     return () => stopAutoScroll();
    // }, [emblaApi, startAutoScroll, stopAutoScroll]);


    

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">

                    {images.data.map((image) =>
                        <div key={image.attributes.name} className="embla__slide" >
                            <Image

                                src={getStrapiURL(image.attributes.url)}
                                alt={
                                    image.attributes.alternativeText
                                }
                                height={
                                    image.attributes.height
                                }
                                width={
                                    image.attributes.width
                                }
                                className="rounded-lg"

                                placeholder="blur"
                                blurDataURL="https://www.fillmurray.com/642/361"
                            />
                        </div>
                    )}


                </div>
            </div>

            <button className="embla__button embla__button--prev" onClick={scrollNext} type="button">
                <svg
                    className="embla__button__svg"
                    viewBox="137.718 -1.001 366.563 643.999"
                >
                    <path
                        d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z"
                    ></path>
                </svg>
            </button>
            <button className="embla__button embla__button--next" onClick={scrollNext} type="button">
                <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
                    <path
                        d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z"
                    ></path>
                </svg>
            </button>
            
        </div>
    )
};

export default EmblaCarousel;