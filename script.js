// Wait for DOM content to be loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Set current year in footer
  document.getElementById('current-year').textContent =
    new Date().getFullYear();

  // Hero Section Animations
  const heroTimeline = gsap.timeline();

  heroTimeline
    .from('.main-title', { opacity: 0, y: 50, duration: 1 })
    .from('.subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
    .to('.tagline', { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
    .from('#begin-journey', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3');

  // Scroll to journey section when Begin Journey button is clicked
  document.getElementById('begin-journey').addEventListener('click', () => {
    window.scrollTo({
      top: document.getElementById('journey').offsetTop,
      behavior: 'smooth',
    });
  });

  // Journey Section Animations
  const journeyAnimations = () => {
    // Pin the journey section for the duration of the animation
    ScrollTrigger.create({
      trigger: '#journey',
      pin: true,
      start: 'top top',
      end: '+=200%',
      scrub: 1,
    });

    // Animate the character walking through the scenes
    gsap.to('.journey-path', {
      x: '-75%',
      ease: 'none',
      scrollTrigger: {
        trigger: '#journey',
        start: 'top top',
        end: '+=200%',
        scrub: 1,
      },
    });

    // Animate scene content appearing
    const scenes = document.querySelectorAll('.scene-content');
    scenes.forEach((scene, index) => {
      gsap.to(scene, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '#journey',
          start: `top+=${index * 25}% top`,
          end: `top+=${(index + 1) * 25}% top`,
          scrub: 1,
        },
      });
    });
  };

  journeyAnimations();

  // Flip Card Event Handlers
  // Using mouseenter and mouseleave for better touch device support
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('.flip-card-inner').style.transform =
        'rotateY(180deg)';
    });

    card.addEventListener('mouseleave', () => {
      card.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
    });
  });

  // Quote Carousel
  const carouselTrack = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  let interval;

  const updateCarousel = (index) => {
    // Update slide position
    carouselTrack.style.transform = `translateX(-${index * 100}%)`;

    // Update active dot
    dots.forEach((dot) => dot.classList.remove('active'));
    dots[index].classList.add('active');

    // Update current slide index
    currentSlide = index;
  };

  // Set up click event for dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateCarousel(index);
      resetInterval();
    });
  });

  // Auto-advance carousel
  const startInterval = () => {
    interval = setInterval(() => {
      let nextSlide = currentSlide + 1;
      if (nextSlide >= slides.length) {
        nextSlide = 0;
      }
      updateCarousel(nextSlide);
    }, 5000);
  };

  const resetInterval = () => {
    clearInterval(interval);
    startInterval();
  };

  startInterval();

  // Mini Game Logic
  const sayNoBtn = document.getElementById('say-no');
  const acceptBtn = document.getElementById('accept');
  const gameOutcome = document.getElementById('game-outcome');
  const positiveOutcome = document.getElementById('positive-outcome');
  const negativeOutcome = document.getElementById('negative-outcome');
  const positiveMessage = document.getElementById('positive-message');
  const negativeMessage = document.getElementById('negative-message');
  const tryAgainBtn = document.getElementById('try-again');

  const positiveMessages = [
    "Your strength to say no shows character. That's a quality that will serve you well in all areas of life.",
    "Making healthy choices now leads to a brighter future. You've chosen wisely.",
    "True friends respect your decisions. You've just shown what real strength looks like.",
    'Your body and mind thank you for protecting them. This is self-love in action.',
    'Great job standing your ground! Remember this feeling of empowerment.',
  ];

  const negativeMessages = [
    "What starts as experimentation often leads to dependency. It's never too late to make a different choice.",
    'Substances offer temporary escape but create long-term problems. Your future self would choose differently.',
    "Every addiction starts with a single 'yes'. But every recovery also starts with a single 'no'.",
    'This path often leads to losing what matters most - health, relationships, and opportunities.',
    'The high is temporary, but the consequences can last forever. You deserve better.',
  ];

  // Get random message from array
  const getRandomMessage = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Handle Say No choice
  sayNoBtn.addEventListener('click', () => {
    gameOutcome.classList.remove('hidden');
    positiveOutcome.classList.remove('hidden');
    negativeOutcome.classList.add('hidden');
    positiveMessage.textContent = getRandomMessage(positiveMessages);

    // Scroll to outcome
    gameOutcome.scrollIntoView({ behavior: 'smooth' });
  });

  // Handle Accept choice
  acceptBtn.addEventListener('click', () => {
    gameOutcome.classList.remove('hidden');
    negativeOutcome.classList.remove('hidden');
    positiveOutcome.classList.add('hidden');
    negativeMessage.textContent = getRandomMessage(negativeMessages);

    // Scroll to outcome
    gameOutcome.scrollIntoView({ behavior: 'smooth' });
  });

  // Handle Try Again button
  tryAgainBtn.addEventListener('click', () => {
    gameOutcome.classList.add('hidden');
    positiveOutcome.classList.add('hidden');
    negativeOutcome.classList.add('hidden');
  });

  // Final CTA Section
  const joinCauseBtn = document.getElementById('join-cause');
  const joinForm = document.getElementById('join-form');
  const emailForm = document.getElementById('email-form');
  const formMessage = document.querySelector('.form-message');

  // Toggle join form visibility
  joinCauseBtn.addEventListener('click', () => {
    joinForm.classList.toggle('hidden');

    if (!joinForm.classList.contains('hidden')) {
      joinForm.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Handle form submission
  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;

    // Simulate form submission - in a real app, this would send data to a server
    formMessage.textContent =
      "Thank you for joining our cause! We'll be in touch.";
    formMessage.style.color = 'white';

    // Reset form
    e.target.reset();

    // Hide form after successful submission
    setTimeout(() => {
      formMessage.textContent = '';
      joinForm.classList.add('hidden');
    }, 3000);
  });

  // Resources Section
  const getHelpBtn = document.querySelector('a[href="#resources"]');
  const resourcesSection = document.getElementById('resources');

  getHelpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resourcesSection.classList.remove('hidden');
    resourcesSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Animation for sections as they come into view
  const animateSections = () => {
    const sections = document.querySelectorAll('.section');

    sections.forEach((section) => {
      if (section.id !== 'journey') {
        // Skip journey section as it has custom animations
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(section, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
            });
          },
          once: true,
        });
      }
    });
  };

  animateSections();
});
