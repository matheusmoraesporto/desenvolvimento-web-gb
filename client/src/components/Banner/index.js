import React, { useState } from 'react';
import slides from './mock';
import './styles.css';

export function Banner() {
    const defaultCurrentSlide = slides.filter(o => o.current)[0];

    const [currentSlide, setCurrentSlide] = useState(defaultCurrentSlide);

    const handleSlides = (i) => {
        let newCurrentSlide;

        if (i > 0) {
            const sortNextSlide = currentSlide.sort + 1;

            if (sortNextSlide > 3) {
                newCurrentSlide = slides[0];
            }
            else {
                newCurrentSlide = slides.filter(o => o.sort === sortNextSlide)[0];
            }
        }
        else {
            const sortPreviousSlide = currentSlide.sort - 1;

            if (sortPreviousSlide <= 0) {
                newCurrentSlide = slides[slides.length - 1]
            }
            else {
                newCurrentSlide = slides.filter(o => o.sort === sortPreviousSlide)[0];
            }
        }

        setCurrentSlide(newCurrentSlide);
    };

    const selectSlide = (sort) => {
        setCurrentSlide(slides.filter(o => o.sort === sort)[0]);
    };

    return (
        <div className="slideshow-container">
            <div className="fade">
                <div className="numbertext">{currentSlide.label}</div>
                <img className="img-banner" src={currentSlide.img} alt="" />
            </div>

            <a className="prev" onClick={() => handleSlides(-1)}>&#10094;</a>
            <a className="next" onClick={() => handleSlides(1)}>&#10095;</a>

            <div className="dots">
                <span className={currentSlide.sort === 1 ? "dot active" : "dot"} onClick={() => selectSlide(1)}></span>
                <span className={currentSlide.sort === 2 ? "dot active" : "dot"} onClick={() => selectSlide(2)}></span>
                <span className={currentSlide.sort === 3 ? "dot active" : "dot"} onClick={() => selectSlide(3)}></span>
            </div>
        </div>
    );
}