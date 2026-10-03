/**
 * LIMIT RING - Premium Anime Cinematic Scroll Storytelling
 *
 * Core animation architecture:
 * - GSAP timelines with ScrollTrigger scrubbing
 * - Ring travels continuously through all 6 scenes
 * - Character placeholders with subtle movement
 * - Product reveals at specific scroll positions
 * - Reduced-motion support
 */

import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
import { ScrollTrigger } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';

gsap.registerPlugin(ScrollTrigger);

/* ==========================================================================
   Reduced Motion Detection
   ========================================================================== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function suppressAnimations() {
  if (prefersReducedMotion.matches) {
    document.body.classList.add('reduced-motion');
    // Kill all GSAP animations, keep elements visible
    gsap.killTweensOf('*');
  }
}

/* ==========================================================================
   DOM Element Caching
   ========================================================================== */
const Elements = {
  // Scene 1 elements
  ring1: document.getElementById('ring-scene1'),

  // Scene 2 elements
  ring2: document.getElementById('ring-scene2'),
  gojoHead: document.querySelectorAll('.scene-2 .gojo-head')[0],
  gojoCoat: document.querySelectorAll('.scene-2 .gojo-coat')[0],
  gojoEyes: document.querySelectorAll('.scene-2 .gojo-eyes')[0],
  citySilhouette: document.querySelector('.scene-2 .city-silhouette'),

  // Scene 3 elements
  ring3: document.getElementById('ring-scene3'),
  makiBody: document.querySelectorAll('.scene-3 .maki-body')[0],
  makiBlade: document.querySelectorAll('.scene-3 .maki-blade')[0],
  gojoHead3: document.querySelectorAll('.scene-3 .gojo-head')[0],
  gojoCoat3: document.querySelectorAll('.scene-3 .gojo-coat')[0],
  energyStreaks: document.querySelectorAll('.scene-3 .streak'),

  // Scene 4 elements
  ring4: document.getElementById('ring-scene4') || document.querySelector('.scene-4 .ring-product .ring-inner'),
  ringInner4: document.querySelectorAll('.scene-4 .ring-inner')[0],
  ringBand4: document.querySelectorAll('.scene-4 .ring-band')[0],
  ringMarking4: document.querySelectorAll('.scene-4 .ring-marking')[0],
  glowInner4: document.querySelectorAll('.scene-4 .glow-inner')[0],
  productFeatures: document.querySelectorAll('.scene-4 .feature'),

  // Scene 5 elements
  ring5: document.getElementById('ring-scene5'),
  gojoHead5: document.querySelectorAll('.scene-5 .gojo-head')[0],
  gojoCoat5: document.querySelectorAll('.scene-5 .gojo-coat')[0],
  makiBody5: document.querySelectorAll('.scene-5 .maki-body')[0],
  rooftopEnv: document.querySelector('.scene-5 .rooftop-environment'),

  // Scene 6 elements
  ring6: document.querySelector('.scene-6 .ring-product-large .ring-inner-large'),
  buyNow: document.querySelector('.scene-6 .buy-now'),
  viewDetails: document.querySelector('.scene-6 .view-details'),
  closeModal: document.querySelector('.scene-6 .close-modal'),
  productModal: document.getElementById('productModal'),

  // Common elements
  particles: document.querySelectorAll('.particle'),
  navLinks: document.querySelectorAll('.nav-link'),
  sceneTexts: document.querySelectorAll('.scene-text')
};

/* ==========================================================================
   Scene Animation Timelines
   ========================================================================== */

const SceneAnimations = {
  // Scene 1: Opening / The Object
  scene1: function() {
    if (Elements.ring1 && !prefersReducedMotion.matches) {
      // Ring initial state - nearly invisible
      gsap.set(Elements.ring1, {
        opacity: 0,
        scale: 0.5,
        rotation: 0
      });

      // Reveal the ring - slow push toward viewer
      const ringTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#scene-1',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      ringTl
        .to(Elements.ring1, {
          opacity: 1,
          scale: 1,
          duration: 1
        })
        .to(Elements.ring1, {
          rotation: '360deg',
          duration: 3,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true
        })
        .to(Elements.ring1, {
          // Subtle light glow build-up
          filter: 'drop-shadow(0 0 20px rgba(0, 212, 170, 0.3))',
          duration: 2
        });
    }
  },

  // Scene 2: Gojo Arrival
  scene2: function() {
    if (Elements.ring2 && Elements.gojoHead && !prefersReducedMotion.matches) {
      // Ring moves from scene 1 position to side
      const ringTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#scene-2',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      ringTl
        .fromTo(Elements.ring2, {
          scale: 1,
          x: 0
        }, {
          scale: 0.8,
          x: '-80%',
          duration: 2,
          ease: 'power2.inOut'
        })
        .to(Elements.gojoCoat, {
          y: '-20px',
          duration: 1.5,
          ease: 'power2.out'
        })
        .to(Elements.gojoEyes, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        });

      // City silhouette fade-in
      if (Elements.citySilhouette) {
        gsap.fromTo(Elements.citySilhouette, {
          opacity: 0
        }, {
          opacity: 0.3,
          duration: 2,
          ease: 'power2.inOut'
        });
      }
    }
  },

  // Scene 3: Energy / Conflict
  scene3: function() {
    if (Elements.ring3 && Elements.makiBody && !prefersReducedMotion.matches) {
      const ringTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#scene-3',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Ring moves across scene
      ringTl
        .fromTo(Elements.ring3, {
          x: '80%'
        }, {
          x: '-50%',
          duration: 3,
          ease: 'power2.inOut'
        })
        .fromTo(Elements.makiBody, {
          x: '100px'
        }, {
          x: '0',
          duration: 2,
          ease: 'power2.out'
        });

      // Energy streaks appear
      if (Elements.energyStreaks.length > 0) {
        gsap.fromTo(Elements.energyStreaks, {
          opacity: 0,
          y: '30px'
        }, {
          opacity: 0.6,
          y: '0',
          duration: 2,
          stagger: 0.3,
          ease: 'power2.out'
        });
      }

      // Gojo coat movement
      if (Elements.gojoCoat3) {
        gsap.fromTo(Elements.gojoCoat3, {
          x: '30px'
        }, {
          x: '-30px',
          duration: 3,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true
        });
      }
    }
  },

  // Scene 4: Product Capabilities
  scene4: function() {
    if (Elements.ringInner4 && Elements.productFeatures && !prefersReducedMotion.matches) {
      const ringTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#scene-4',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Ring rotates slowly
      ringTl
        .to(Elements.ringInner4, {
          rotation: '360deg',
          duration: 6,
          ease: 'power1.continuous',
          repeat: -1
        })
        .to(Elements.ringBand4, {
          width: '100%',
          duration: 2,
          ease: 'power2.inOut'
        });

      // Features appear one by one as ring rotates
      Elements.productFeatures.forEach((feature, index) => {
        const featureTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#scene-4',
            start: `top top+=${index * 150}`,
            end: `top top+=${index * 150 + 100}`,
            scrub: 1
          }
        });

        featureTl.fromTo(feature, {
          opacity: 0,
          y: '20px'
        }, {
          opacity: 1,
          y: '0',
          duration: 0.8,
          ease: 'power2.out'
        });
      });

      // Glow inner appears
      if (Elements.glowInner4) {
        gsap.fromTo(Elements.glowInner4, {
          opacity: 0
        }, {
          opacity: 0.4,
          duration: 1.5,
          ease: 'power2.inOut'
        });
      }
    }
  },

  // Scene 5: Return to the Story
  scene5: function() {
    if (Elements.ring5 && Elements.gojoHead5 && !prefersReducedMotion.matches) {
      const ringTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#scene-5',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Ring grows toward camera
      ringTl
        .fromTo(Elements.ring5, {
          scale: 0.8,
          x: '0'
        }, {
          scale: 1.2,
          x: '-50%',
          duration: 3,
          ease: 'power2.inOut'
        });

      // Characters move in opposite directions
      if (Elements.gojoHead5) {
        gsap.fromTo(Elements.gojoHead5, {
          x: '-50px'
        }, {
          x: '50px',
          duration: 3,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true
        });
      }

      if (Elements.makiBody5) {
        gsap.fromTo(Elements.makiBody5, {
          x: '50px'
        }, {
          x: '-50px',
          duration: 3,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true
        });
      }

      // Rooftop environment subtle move
      if (Elements.rooftopEnv) {
        gsap.fromTo(Elements.rooftopEnv, {
          y: '0'
        }, {
          y: '-10px',
          duration: 4,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true
        });
      }
    }
  },

  // Scene 6: Final Product / Purchase
  scene6: function() {
    if (Elements.ring6 && !prefersReducedMotion.matches) {
      // Ring continuous slow rotation
      gsap.to(Elements.ring6, {
        rotation: '360deg',
        duration: 8,
        ease: 'power1.continuous',
        repeat: -1
      });
    }
  }
};

/* ==========================================================================
   Scroll-Triggered Animations
   ========================================================================== */

function initScrollTriggers() {
  // Each scene gets its own scroll trigger
  // The scrub ensures animations play at scroll speed

  // Scene 1 trigger
  ScrollTrigger.create({
    trigger: '#scene-1',
    start: 'top top',
    end: 'bottom top',
    onEnter: () => SceneAnimations.scene1(),
    onEnterBack: () => SceneAnimations.scene1(),
    onLeave: () => {},
    onLeaveBack: () => {}
  });

  // Scene 2 trigger
  ScrollTrigger.create({
    trigger: '#scene-2',
    start: 'top top',
    end: 'bottom top',
    onEnter: () => SceneAnimations.scene2(),
    onEnterBack: () => SceneAnimations.scene2(),
    onLeave: () => {},
    onLeaveBack: () => {}
  });

  // Scene 3 trigger
  ScrollTrigger.create({
    trigger: '#scene-3',
    start: 'top top',
    end: 'bottom top',
    onEnter: () => SceneAnimations.scene3(),
    onEnterBack: () => SceneAnimations.scene3(),
    onLeave: () => {},
    onLeaveBack: () => {}
  });

  // Scene 4 trigger
  ScrollTrigger.create({
    trigger: '#scene-4',
    start: 'top top',
    end: 'bottom top',
    onEnter: () => SceneAnimations.scene4(),
    onEnterBack: () => SceneAnimations.scene4(),
    onLeave: () => {},
    onLeaveBack: () => {}
  });

  // Scene 5 trigger
  ScrollTrigger.create({
    trigger: '#scene-5',
    start: 'top top',
    end: 'bottom top',
    onEnter: () => SceneAnimations.scene5(),
    onEnterBack: () => SceneAnimations.scene5(),
    onLeave: () => {},
    onLeaveBack: () => {}
  });

  // Scene 6 trigger
  ScrollTrigger.create({
    trigger: '#scene-6',
    start: 'top top',
    end: 'bottom top',
    onEnter: () => SceneAnimations.scene6(),
    onEnterBack: () => SceneAnimations.scene6(),
    onLeave: () => {},
    onLeaveBack: () => {}
  });
}

/* ==========================================================================
   Product Modal Functionality
   ========================================================================== */

function initProductModal() {
  const modal = Elements.productModal;
  const buyNow = Elements.buyNow;
  const viewDetails = Elements.viewDetails;
  const closeBtn = Elements.closeModal;
  const decreaseBtn = document.querySelector('.quantity-btn.decrease');
  const increaseBtn = document.querySelector('.quantity-btn.increase');
  const quantityValue = document.querySelector('.quantity-value');

  // Open modal on BUY NOW click
  buyNow.addEventListener('click', (e) => {
    e.preventDefault();
    if (modal) {
      modal.classList.add('visible');
      modal.hidden = false;
      document.body.classList.add('modal-open');
    }
  });

  // Open modal on VIEW DETAILS click
  viewDetails.addEventListener('click', (e) => {
    e.preventDefault();
    if (modal) {
      modal.classList.add('visible');
      modal.hidden = false;
      document.body.classList.add('modal-open');
    }
  });

  // Close modal on close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) {
        modal.classList.remove('visible');
        setTimeout(() => { modal.hidden = true; }, 300);
        document.body.classList.remove('modal-open');
      }
    });
  }

  // Close on overlay click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('visible');
        setTimeout(() => { modal.hidden = true; }, 300);
        document.body.classList.remove('modal-open');
      }
    });
  }

  // Quantity control
  if (decreaseBtn && increaseBtn && quantityValue) {
    let quantity = 1;

    decreaseBtn.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        quantityValue.textContent = quantity;
      }
    });

    increaseBtn.addEventListener('click', () => {
      quantity++;
      quantityValue.textContent = quantity;
    });
  }
}

/* ==========================================================================
   Navigation Interactions
   ========================================================================== */

function initNavigation() {
  Elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const scrollPosition = targetSection.offsetTop;
          window.scrollTo({
            top: scrollPosition,
            behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
          });
        }
      }
    });
  });
}

/* ==========================================================================
   Initialize Everything
   ========================================================================== */

function init() {
  // Check reduced motion first
  suppressAnimations();

  // Initialize scene animations
  SceneAnimations.scene1();
  SceneAnimations.scene2();
  SceneAnimations.scene3();
  SceneAnimations.scene4();
  SceneAnimations.scene5();
  SceneAnimations.scene6();

  // Initialize scroll triggers
  initScrollTriggers();

  // Initialize product modal
  initProductModal();

  // Initialize navigation
  initNavigation();

  // Parallax effect for cursor
  document.addEventListener('pointermove', (e) => {
    if (!prefersReducedMotion.matches) {
      const cursor = document.querySelector('.cursor');
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    }
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Re-initialize any responsive adjustments
      SceneAnimations.scene6();
    }, 100);
  });
}

/* ==========================================================================
   Start when DOM is ready
   ========================================================================== */
document.addEventListener('DOMContentLoaded', init);