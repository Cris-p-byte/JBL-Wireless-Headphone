// ============================================
// JBL HEADPHONES - COMPLETE INTERACTIVE JS
// THUMBNAIL HOVER EFFECTS ADDED
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // VARIABLES
  // ============================================
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('primary-navigation');
  const navLinks = document.querySelectorAll('.nav__link');
  const mainImg = document.getElementById('main-home-img');
  const thumbImgs = document.querySelectorAll('.favorite-thumb');
  const modalOverlay = document.getElementById('modal-overlay');
  
  let lastScroll = 0;

  // ============================================
  // ✅ THUMBNAIL IMAGE SWITCHER - FIXED
  // ============================================
  if (mainImg && thumbImgs.length > 0) {
    thumbImgs.forEach(thumb => {
      thumb.style.cursor = 'pointer';
      thumb.addEventListener('click', function() {
        mainImg.src = this.dataset.img;
        mainImg.alt = this.alt;
        thumbImgs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        mainImg.style.transform = 'scale(0.95)';
        setTimeout(() => mainImg.style.transform = '', 200);
      });
      
      // ✅ ADDED: Hover effects only
      thumb.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
      });
      thumb.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    }); // ✅ Fixed closing bracket
  }

  // ============================================
  // HEADER SCROLL EFFECTS
  // ============================================
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    header.classList.toggle('blur-header', scrollTop > 100);
    if (window.innerWidth > 768 && scrollTop > 100) {
      header.style.transform = scrollTop > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
    }
    lastScroll = scrollTop;
  });

  // ============================================
  // MOBILE MENU - SINGLE CLEAN HANDLER
  // ============================================
  if (navToggle && navList) {
    navToggle.addEventListener('click', function() {
      const icon = this.querySelector('i');
      const isVisible = navList.getAttribute('data-visible') === 'true';
      navList.setAttribute('data-visible', !isVisible);
      icon.classList.toggle('ri-menu-line', isVisible);
      icon.classList.toggle('ri-close-line', !isVisible);
      document.body.style.overflow = !isVisible ? 'hidden' : '';
    });
  }

  // ============================================
  // NAVBAR - ACTIVE LINKS ON ALL PAGES
  // ============================================
  function setActiveNavLink() {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active-link');
      }
    });
  }
  setActiveNavLink();


  // ============================================
  // PARALLAX & ANIMATIONS
  // ============================================
  window.addEventListener('scroll', () => {
    const homeImgFloat = document.querySelector('.home__img-float');
    if (homeImgFloat) {
      homeImgFloat.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.model__item, .favorite-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
  });

  console.log('🎧 Thumbnails CLICKABLE! Hover effects added');
});
