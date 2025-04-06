import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    // --- Animations ---

    // Page Load Animation
    const tl = gsap.timeline();
    tl.from('.navbar', { y: -50, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from('.hero-content h1', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .from('.subtitle', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('.download-now-button', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from('.client-preview', { scale: 0.9, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .from('.features-bar', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('.feature-item', { opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' }, '-=0.6');

    // Module Category Scroll Animations
    gsap.utils.toArray('.module-category').forEach((category, i) => {
        const description = category.querySelector('.module-description');
        const gridItems = category.querySelectorAll('.module-item');

        const categoryTl = gsap.timeline({
            scrollTrigger: {
                trigger: category,
                start: 'top 85%',
                toggleActions: 'play none none reverse', 
            }
        });

        categoryTl.from(description, { x: -50, opacity: 0, duration: 0.6, ease: 'power3.out' })
                 .from(gridItems, {
                     y: 30,
                     opacity: 0,
                     duration: 0.5,
                     stagger: 0.05, 
                     ease: 'power3.out'
                 }, "-=0.4"); 
    });

    // Download Section Scroll Animation
    const downloadSection = document.querySelector('.download-section');
    if (downloadSection) {
        gsap.from(downloadSection, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: downloadSection,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        });
    }


    // --- Interactions ---

    // Module Item Hover Effects
    const moduleItems = document.querySelectorAll('.module-item');
    moduleItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
        });
        item.addEventListener('mouseleave', () => {
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70; 
                    const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20; 

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    console.warn(`Smooth scroll target not found: ${targetId}`);
                }
            }
        });
    });

    // Copy Script Button Functionality
    const copyButton = document.getElementById('copy-script-button');
    const scriptCode = document.getElementById('roblox-script');

    if (copyButton && scriptCode) {
        copyButton.addEventListener('click', () => {
            const scriptText = scriptCode.textContent;
            navigator.clipboard.writeText(scriptText).then(() => {
                copyButton.textContent = 'Copied!';
                copyButton.classList.add('copied');
                gsap.fromTo(copyButton, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }); 

                setTimeout(() => {
                    copyButton.textContent = 'Copy Script';
                    copyButton.classList.remove('copied');
                }, 2000); 
            }).catch(err => {
                console.error('Failed to copy script: ', err);
                copyButton.textContent = 'Error!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy Script';
                }, 2000);
            });
        });
    } else {
        if (!copyButton) console.error("Copy button not found");
        if (!scriptCode) console.error("Script code element not found");
    }

});