import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

// --- Mobile Menu Component ---
const MobileMenu = ({ isOpen, closeMenu }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-brand-dark/95 z-50 flex flex-col items-center justify-center animate-fade-in" 
            role="dialog" 
            aria-modal="true"
        >
            <button 
                onClick={closeMenu} 
                className="absolute top-6 right-4 sm:right-6 text-white" 
                aria-label="Close menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <nav className="flex flex-col items-center space-y-10">
                <a href="#our-story" onClick={closeMenu} className="font-sans text-2xl uppercase tracking-widest font-semibold text-white">Our Story</a>
                <a href="#contact-us" onClick={closeMenu} className="font-sans text-2xl uppercase tracking-widest font-semibold text-white">Contact Us</a>
            </nav>
        </div>
    );
};


// --- Header Component ---
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="py-6 px-4 sm:px-6 lg:px-8 absolute top-0 left-0 right-0 z-20 bg-transparent">
                <div className="container mx-auto relative flex justify-center items-center">
                    {/* Centered Logo */}
                    <a href="/" aria-label="KAHAANI Home">
                        <img src="https://res.cloudinary.com/dzgfkhpl1/image/upload/v1757493494/kahani_logo_cyvn22.png" alt="KAHAANI Logo" className="h-14 md:h-16" />
                    </a>

                    {/* Right-aligned Desktop Navigation */}
                    <nav className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 items-center space-x-6 md:space-x-8">
                        <a href="#our-story" className="font-sans text-sm uppercase tracking-widest font-semibold text-brand-dark link-underline">Our Story</a>
                        <a href="#contact-us" className="font-sans text-sm uppercase tracking-widest font-semibold text-brand-dark link-underline">Contact Us</a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 md:hidden">
                        <button onClick={() => setIsMenuOpen(true)} className="text-brand-dark" aria-label="Open menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                    </div>
                </div>
            </header>
            <MobileMenu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
        </>
    );
};


// --- Hero Section Component ---
const Hero = () => {
    const [isAnimated, setIsAnimated] = useState(false);
    const words = "The essence of perfume is Oudh".split(' ');

    useEffect(() => {
        // A small delay ensures the initial (translated) state is rendered before the transition begins.
        const timer = setTimeout(() => setIsAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center sm:justify-start bg-brand-blue overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://res.cloudinary.com/dzgfkhpl1/image/upload/v1757490028/kahnni_w0mmai.jpg"
                    alt="A smiling woman applying Kahaani fragrance"
                    className="w-full h-full object-cover object-center sm:object-right-top"
                />
                <div className="absolute inset-0 bg-brand-blue opacity-20"></div>
            </div>
            <div className="relative z-10 text-center sm:text-left p-6 sm:p-8 md:p-16 lg:p-24 max-w-2xl text-brand-dark hero-text-shadow">
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-none">
                    {words.map((word, index) => (
                        <span key={index} className={`inline-block overflow-hidden ${index < words.length - 1 ? 'mr-3 md:mr-4' : ''}`}>
                            <span
                                className={`inline-block transition-transform duration-700 ease-out transform ${isAnimated ? 'translate-y-0' : 'translate-y-full'}`}
                                style={{ transitionDelay: `${100 + index * 75}ms` }}
                            >
                                {word}
                            </span>
                        </span>
                    ))}
                </h1>
                <a href="#collection" className="mt-8 text-sm tracking-widest uppercase link-underline font-semibold text-brand-dark inline-block">
                    CALL US TO KNOW MORE
                </a>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 sm:left-8 md:left-16 lg:left-24 sm:translate-x-0 z-10 flex items-center space-x-3">
                <span className="w-2.5 h-2.5 bg-brand-dark rounded-full opacity-50"></span>
                <span className="w-8 h-1 bg-brand-dark rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-brand-dark rounded-full opacity-50"></span>
            </div>
        </section>
    );
};

// --- Intro Section Component ---
const Intro = () => {
    const [activeImage, setActiveImage] = useState(null);
    const [sourceBounds, setSourceBounds] = useState(null);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [previewDimensions, setPreviewDimensions] = useState(null);

    const handleClose = useCallback(() => {
        setIsPreviewVisible(false); // Trigger closing animation
        // Wait for the animation to finish before removing the element from the DOM
        setTimeout(() => {
            setActiveImage(null);
            setSourceBounds(null);
            setPreviewDimensions(null);
        }, 500); // This duration must match the CSS transition duration
    }, []);

    // Effect to trigger the "opening" animation
    useEffect(() => {
        if (activeImage) {
            requestAnimationFrame(() => {
                setIsPreviewVisible(true);
            });
        }
    }, [activeImage]);

    // Effect to handle scroll-to-close
    useEffect(() => {
        if (activeImage) {
            window.addEventListener('scroll', handleClose, { passive: true });
        }
        // Cleanup function to remove the listener
        return () => {
            window.removeEventListener('scroll', handleClose);
        };
    }, [activeImage, handleClose]);

    const handleMouseEnter = (e, src, alt) => {
        if (activeImage) return; // Prevent opening a new one if one is already animating
        const bounds = e.currentTarget.getBoundingClientRect();
        setSourceBounds(bounds);
        setActiveImage({ src, alt });

        // Calculate final dimensions while maintaining aspect ratio
        const aspectRatio = bounds.width / bounds.height;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Target width is 60vw, but cap height at 80vh to avoid being too large
        let finalWidth = viewportWidth * 0.6;
        let finalHeight = finalWidth / aspectRatio;

        const maxHeight = viewportHeight * 0.8;
        if (finalHeight > maxHeight) {
            finalHeight = maxHeight;
            finalWidth = finalHeight * aspectRatio;
        }

        setPreviewDimensions({ width: finalWidth, height: finalHeight });
    };

    return (
        <section className="py-20 md:py-32 bg-white text-center">
            <div className="container mx-auto px-4">
                <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight text-brand-dark flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8 gap-y-2 leading-tight">
                    <span>EACH</span>
                    <span>DROP</span>
                    <span
                        className="relative inline-block w-20 h-12 md:w-28 md:h-16 rounded-full overflow-hidden align-middle shadow-md transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110"
                        onMouseEnter={(e) => handleMouseEnter(e, "https://res.cloudinary.com/dzgfkhpl1/image/upload/v1757498681/WhatsApp_Image_2025-09-10_at_3.10.59_PM_vtaa7v.jpg", "Abstract drop")}
                    >
                        <img src="https://res.cloudinary.com/dzgfkhpl1/image/upload/v1757498681/WhatsApp_Image_2025-09-10_at_3.10.59_PM_vtaa7v.jpg" alt="Abstract drop" className="w-full h-full object-cover" />
                    </span>
                    <span>CARRIES</span>
                    <span className="italic font-light">A</span>
                    <span>SECRET</span>
                    <span className="italic font-light">AN</span>
                    <span>ABSTRACT</span>
                    <span
                        className="relative inline-block w-20 h-12 md:w-28 md:h-16 rounded-full overflow-hidden align-middle shadow-md transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110"
                        onMouseEnter={(e) => handleMouseEnter(e, "https://res.cloudinary.com/dzgfkhpl1/image/upload/v1757498683/Gemini_Generated_Image_4kdgi54kdgi54kdg_ozfuw8.png", "A hidden archway")}
                    >
                        <img src="https://res.cloudinary.com/dzgfkhpl1/image/upload/v1757498683/Gemini_Generated_Image_4kdgi54kdgi54kdg_ozfuw8.png" alt="A hidden archway" className="w-full h-full object-cover" />
                    </span>
                    <span>DOORWAY</span>
                    <span className="italic font-light">TO</span>
                    <span>HIDDEN</span>
                    <span>REALM</span>
                    <span>ENCLOSED</span>
                    <span className="italic font-light">IN</span>
                    <span
                        className="relative inline-block w-20 h-12 md:w-28 md:h-16 rounded-full overflow-hidden align-middle shadow-md transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110"
                        onMouseEnter={(e) => handleMouseEnter(e, "https://res.cloudinary.com/dzgfkhpl1/image/upload/v1757498681/WhatsApp_Image_2025-09-10_at_3.16.51_PM_ujyeik.jpg", "Perfume bottle detail")}
                    >
                        <img src="https://res.cloudinary.com/dzgfkhpl1/image/upload/v1757498681/WhatsApp_Image_2025-09-10_at_3.16.51_PM_ujyeik.jpg" alt="Perfume bottle detail" className="w-full h-full object-cover" />
                    </span>
                    <span>CRYSTAL</span>
                </h2>
            </div>

            {activeImage && sourceBounds && previewDimensions && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={handleClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Image preview: ${activeImage.alt}`}
                >
                    <div
                        className="absolute inset-0 bg-black/70 transition-opacity duration-500 ease-in-out"
                        style={{ opacity: isPreviewVisible ? 1 : 0 }}
                    ></div>
                    <div
                        onMouseLeave={handleClose}
                        onClick={(e) => e.stopPropagation()}
                        className="fixed rounded-full overflow-hidden shadow-2xl z-50 transition-all duration-500 ease-in-out"
                        style={{
                            top: isPreviewVisible ? '50%' : `${sourceBounds.top}px`,
                            left: isPreviewVisible ? '50%' : `${sourceBounds.left}px`,
                            width: isPreviewVisible ? `${previewDimensions.width}px` : `${sourceBounds.width}px`,
                            height: isPreviewVisible ? `${previewDimensions.height}px` : `${sourceBounds.height}px`,
                            transform: isPreviewVisible ? 'translate(-50%, -50%)' : 'none',
                        }}
                    >
                        <img src={activeImage.src} alt={activeImage.alt} className="w-full h-full object-cover" />
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
                            style={{ opacity: isPreviewVisible ? 1 : 0, transitionDelay: isPreviewVisible ? '300ms' : '0ms' }}
                            aria-label="Close image preview"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

// --- Story Section Component ---
const Story = () => {
    const headlineRef = useRef(null);
    const nameRef = useRef(null);
    const paragraphsRef = useRef(null);

    const [headlineVisible, setHeadlineVisible] = useState(false);
    const [nameVisible, setNameVisible] = useState(false);
    const [paragraphsVisible, setParagraphsVisible] = useState(false);

    const headlineText = "WONDERFUL STORIES — OUDH";
    const titleLine1 = "Oudh";
    const titleLine2 = "Eclipse";
    const p1Text = "Once, stories were told in the smoke of resin and the silence of sacred woods. Kings listened, lovers remembered, and wanderers carried those whispers across deserts. Kahaani is born of that same tradition. Not a perfume, but a chapter you wear. Each fragrance is a story etched in oudh, ittar, and time itself—mysterious, unhurried, eternal. We do not sell bottles. We hand you narratives—written not in ink, but in scent. Kahaani is history you can breathe, memory you can touch, desire that lingers..";
    const p2Text = "PURE OUDH OIL CAN COST MORE THAN GOLD BY WEIGHT.";


    useEffect(() => {
        const elementsToObserve = [
            { ref: headlineRef, setter: setHeadlineVisible },
            { ref: nameRef, setter: setNameVisible },
            { ref: paragraphsRef, setter: setParagraphsVisible },
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = elementsToObserve.find(el => el.ref.current === entry.target);
                        if (element) {
                            element.setter(true);
                            observer.unobserve(entry.target);
                        }
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.3,
            }
        );

        elementsToObserve.forEach(element => {
            if (element.ref.current) {
                observer.observe(element.ref.current);
            }
        });

        return () => {
            elementsToObserve.forEach(element => {
                if (element.ref.current) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    observer.unobserve(element.ref.current);
                }
            });
        };
    }, []);

    // Animation constants
    const titleBaseDelay = 100;
    const titleCharDelay = 70;
    const line1Duration = titleLine1.length * titleCharDelay;
    const line2BaseDelay = titleBaseDelay + line1Duration;
    const line2Duration = titleLine2.length * titleCharDelay;
    const underlineDelay = line2BaseDelay + line2Duration;

    const p1BaseDelay = 200;
    const p1CharDelay = 5;
    const p1Duration = p1Text.length * p1CharDelay;
    const p2BaseDelay = p1BaseDelay + p1Duration + 300; // Pause after p1
    const p2CharDelay = 30;
    
    return (
        <section className="py-20 md:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-3xl text-center">
                <p ref={headlineRef} className="text-sm uppercase tracking-widest text-gray-500 h-6">
                    {headlineText.split('').map((char, index) => (
                        <span
                            key={index}
                            className={`inline-block transition-all duration-300 ease-in-out ${headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                            style={{ transitionDelay: `${index * 25}ms` }}
                            aria-hidden="true"
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                     <span className="sr-only">{headlineText}</span>
                </p>
                <h2
                    id="our-story"
                    ref={nameRef}
                    className="font-serif text-5xl md:text-7xl my-6 text-brand-dark relative inline-block scroll-mt-28"
                >
                    <span className="inline-block" aria-label={titleLine1}>
                        {titleLine1.split('').map((char, index) => (
                            <span key={`l1-${index}`} className={`inline-block transition-all duration-500 ease-out ${nameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${titleBaseDelay + index * titleCharDelay}ms` }} aria-hidden="true">{char}</span>
                        ))}
                    </span>
                    <span className="block">
                        <span className="italic inline-block" aria-label={titleLine2}>
                             {titleLine2.split('').map((char, index) => (
                                <span key={`l2-${index}`} className={`inline-block transition-all duration-500 ease-out ${nameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${line2BaseDelay + index * titleCharDelay}ms` }} aria-hidden="true">{char}</span>
                            ))}
                        </span>
                        <span className={`w-20 inline-block border-b-2 border-brand-dark align-middle ml-2 transition-transform duration-500 ease-out ${nameVisible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transitionDelay: `${underlineDelay}ms`, transformOrigin: 'left' }}></span>
                    </span>
                </h2>
                <div
                    ref={paragraphsRef}
                    className="text-gray-600 leading-relaxed max-w-xl mx-auto space-y-4 text-sm md:text-base"
                >
                    <p>
                        <span className="sr-only">{p1Text}</span>
                        {p1Text.split('').map((char, index) => (
                            <span
                                key={`p1-${index}`}
                                className={`transition-opacity duration-100 ${paragraphsVisible ? 'opacity-100' : 'opacity-0'}`}
                                style={{ transitionDelay: `${p1BaseDelay + index * p1CharDelay}ms` }}
                                aria-hidden="true"
                            >
                                {char}
                            </span>
                        ))}
                    </p>
                    <p className="font-bold italic">
                        <span className="sr-only">{p2Text}</span>
                        {p2Text.split('').map((char, index) => (
                            <span
                                key={`p2-${index}`}
                                className={`transition-opacity duration-200 ${paragraphsVisible ? 'opacity-100' : 'opacity-0'}`}
                                style={{ transitionDelay: `${p2BaseDelay + index * p2CharDelay}ms` }}
                                aria-hidden="true"
                            >
                                {char}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </section>
    );
};

// --- Products Section Component ---
const Products = () => (
    <section id="collection" className="py-20 md:py-32 bg-brand-beige">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
                <div className="text-center group">
                    <div className="aspect-square flex items-center justify-center overflow-hidden">
                        <img src="https://res.cloudinary.com/dzgfkhpl1/image/upload/v1757494815/2kahni_oqcbm1.jpg" alt="Gold Dust & Cracked Perfumes" className="max-h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
                    </div>
                    <h3 className="font-serif text-3xl mt-6 text-brand-dark">Gold Dust & Cracked Perfumes</h3>
                    <p className="mt-2 text-gray-600 text-sm md:text-base">One of the most defining fragrance notes of Gold Dust is cinnamon.</p>
                    <a href="#" className="mt-4 text-sm tracking-widest uppercase link-underline font-semibold text-brand-dark inline-block">Call Now</a>
                </div>
                <div className="text-center group">
                    <div className="aspect-square flex items-center justify-center overflow-hidden">
                         <img src="https://res.cloudinary.com/dzgfkhpl1/image/upload/v1757494814/1kahni_k1pd4f.jpg" alt="Women's Fragrances Perfumes" className="max-h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500 ease-in-out"/>
                    </div>
                    <h3 className="font-serif text-3xl mt-6 text-brand-dark">Women's Fragrances Perfumes</h3>
                    <p className="mt-2 text-gray-600 text-sm md:text-base">Women's fragrances –  100ml </p>
                    <a href="#" className="mt-4 text-sm tracking-widest uppercase link-underline font-semibold text-brand-dark inline-block">Call Now</a>
                </div>
            </div>
        </div>
    </section>
);

// --- Contact Section Component ---
const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you shortly.');
    };

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 id="contact-us" className="font-serif text-5xl md:text-6xl text-brand-dark scroll-mt-28">Contact us</h2>
                    <p className="mt-4 text-gray-600">Our friendly team would love to hear from you.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                            <input type="text" name="firstName" id="firstName" placeholder="First name" className="form-input" required />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                            <input type="text" name="lastName" id="lastName" placeholder="Last name" className="form-input" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" name="email" id="email" placeholder="you@contactus.com" className="form-input" required />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="text-gray-500 text-sm">IND +91</span>
                            </div>
                            <input type="tel" name="phone" id="phone" placeholder="998 998 9988" className="form-input pl-20" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea name="message" id="message" rows={4} placeholder="Leave us a message..." className="form-input" required></textarea>
                    </div>
                    <div className="flex items-center">
                        <input id="agreed" name="agreed" type="checkbox" className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" required />
                        <label htmlFor="agreed" className="ml-2 block text-sm text-gray-900">
                            You agree to our friendly <a href="#" className="font-medium text-amber-600 hover:text-amber-500">privacy policy</a>.
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="w-full contact-button text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                            Send message
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

// --- Footer Component ---
const Footer = () => (
    <footer className="bg-gray-100 text-gray-600">
        <div className="container mx-auto py-12 px-4 text-center">
            <img 
                src="https://res.cloudinary.com/dzgfkhpl1/image/upload/v1757493494/kahani_logo_cyvn22.png" 
                alt="KAHAANI Logo" 
                className="h-12 mx-auto mb-6"
            />
            <nav className="flex justify-center space-x-6 mb-6 text-sm">
                <a href="#collection" className="hover:text-brand-dark">Collection</a>
                <a href="#our-story" className="hover:text-brand-dark">Our Story</a>
                <a href="#contact-us" className="hover:text-brand-dark">Contact</a>
            </nav>
            <p className="text-xs">&copy; {new Date().getFullYear()} Kahaani. All Rights Reserved.</p>
        </div>
    </footer>
);

// --- WhatsApp Chat Bot Component ---
const WhatsAppChat = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500); // Delay appearance for 1.5 seconds

        return () => clearTimeout(timer);
    }, []);

    const phoneNumber = "919810863495";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className={`fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
            >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
        </a>
    );
};


// --- Main App Component ---
const App = () => {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        <Intro />
        <Story />
        <Products />
        <Contact />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);