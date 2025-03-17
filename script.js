// Add click event listener to the "Get Yours Now" button
document.querySelector('#hero button').addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
});

const whatsappMessageTemplates = {
    ayam: {
        satuan: "Hai aku mau pesan ayam paket satuan",
        "5plus1": "Hai aku mau pesan ayam paket 5 + free 1",
        "12plus2": "Hai aku mau pesan ayam paket 12 + free 2"
    },
    sapi: {
        satuan: "Hai aku mau pesan sapi paket satuan",
        "5plus1": "Hai aku mau pesan sapi paket 5 + free 1",
        "12plus2": "Hai aku mau pesan sapi paket 12 + free 2"
    }
};

const whatsappNumber = "628561060045";

let selectedAyamPackage = null;
let selectedSapiPackage = null;
const groupAyam = document.querySelector('#group-ayam');

groupAyam.addEventListener('change', (e) => {
    selectedAyamPackage = e.target.value;
});

const groupSapi = document.querySelector('#group-sapi');

groupSapi.addEventListener('change', (e) => {
    selectedSapiPackage = e.target.value;
});

const buyNowAyam = document.querySelector('#buy-now-ayam');
const buyNowSapi = document.querySelector('#buy-now-sapi');

buyNowAyam.addEventListener('click', () => {
    const message = encodeURIComponent(whatsappMessageTemplates.ayam?.[selectedAyamPackage] ?? whatsappMessageTemplates?.ayam.satuan);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
});

buyNowSapi.addEventListener('click', () => {
    const message = encodeURIComponent(whatsappMessageTemplates.sapi?.[selectedSapiPackage] ?? whatsappMessageTemplates.sapi.satuan);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
});


// Testimonials data
const testimonials = [
    {
        id: 1,
        name: "Marian A.",
        content: "kakk Paul n Pot nya suka bgttt, anakku lahap bgtt yayy",
        rating: 5,
        avatar: "assets/icon/female_icon.png"
    },
    {
        id: 2,
        name: "Marian A.",
        content: "Anakku kemarin lagi bali belly sampe turun 500g, akhirnya mau makan pake kaldu inii hu seneng bgt <span class='font-normal'>&#129402&#129392</span> thank youuuu udh bikin product yg super nutritious DAN BISA DIKIRIM NON FROZEN<span class='font-normal'>&#129402</span>",
        rating: 5,
        avatar: "assets/icon/female_icon.png"
    },
    {
        id: 3,
        name: "Aulia M.",
        content: "..honest review, anakku udah sebulanan ku kasih Beef Stock 50ml doang sehari dijadiin sup telur gitu. BB nya naik 600gr dong <span class='font-normal'>&#128514</span>, mantep bgt haha...",
        rating: 5,
        avatar: "assets/icon/female_icon.png"
    },
    {
        id: 4,
        name: "Anonim",
        content: "Anakku kita tinggal 15 hari ke Jepang, setiap hari ga skip aku beliin Chicken Broth Paul n Pot, dia doyan bgt selalu habis... topcer ini hahahah",
        rating: 5,
        avatar: "assets/icon/female_icon.png"
    },
    {
        id: 5,
        name: "Aulia M.",
        content: "...Sebelumnya emang udh konsumsi suplemen zinc untuk bantu penyerapan, tapi ga signifikan dan bikin sering alergi pilek anaknya. Ku cobain Beef Stock lah mana dia suka bgt...",
        rating: 5,
        avatar: "assets/icon/female_icon.png"
    }
];

let currentTestimonial = 0;
let testimonialInterval;

// Function to render testimonials
function renderTestimonials() {
    const container = document.getElementById('testimonials-container');
    const dotsContainer = document.getElementById('testimonial-dots');

    container.innerHTML = '';
    dotsContainer.innerHTML = '';

    // Render testimonials
    testimonials.forEach((testimonial, index) => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = `absolute top-0 left-0 w-full h-full transition-opacity duration-500 flex flex-col items-center text-center ${
            index === currentTestimonial ? "opacity-100" : "opacity-0 pointer-events-none"
        }`;

        // Create stars for rating
        let starsHtml = '';
        for (let i = 0; i < testimonial.rating; i++) {
            starsHtml += `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#e86928" stroke="#e86928" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      `;
        }

        testimonialElement.innerHTML = `
      <div class="flex items-center justify-center mb-4">
        ${starsHtml}
      </div>
      <p class="text-sm md:text-lg italic mb-6">"${testimonial.content}"</p>
      <div class="flex items-center mt-8 md:mt-auto">
        <img
          src="${testimonial.avatar}"
          alt="${testimonial.name}"
          class="w-[40px] h-[40px] rounded-full mr-4 border border-border border-2"
        />
        <div class="text-left">
          <h4 class="font-semibold text-sm md:text-lg">${testimonial.name}</h4>
        </div>
      </div>
      <a class="opacity-10 mt-2 text-[12px]" href="https://www.freepik.com/icon/people_15675842#fromView=keyword&page=1&position=68&uuid=149517da-5c5b-41df-9e09-0bf0511beffe" target="_blank" rel="noopener noreferrer">Icon by Studio MRPOR</a>
    `;

        container.appendChild(testimonialElement);

        // Create dot for this testimonial
        const dot = document.createElement('button');
        dot.className = `size-2 md:size-2.5 rounded-full transition-colors ${
            index === currentTestimonial ? "bg-tertiary-green" : "bg-muted-foreground/30"
        }`;
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.addEventListener('click', () => {
            setCurrentTestimonial(index);
        });

        dotsContainer.appendChild(dot);
    });
}

function setCurrentTestimonial(index) {
    currentTestimonial = index;
    renderTestimonials();
    resetInterval();
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial === testimonials.length - 1) ? 0 : currentTestimonial + 1;
    renderTestimonials();
    resetInterval();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial === 0) ? testimonials.length - 1 : currentTestimonial - 1;
    renderTestimonials();
    resetInterval();
}

function resetInterval() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

document.getElementById('next-testimonial').addEventListener('click', nextTestimonial);
document.getElementById('prev-testimonial').addEventListener('click', prevTestimonial);

renderTestimonials();
resetInterval();

// About Us Carousel
let currentAboutSlide = 0;
const aboutItems = document.querySelectorAll('.about-carousel-item');
const aboutDots = document.querySelectorAll('.about-carousel-dot');

function showAboutSlide(index) {
    // Hide all slides
    aboutItems.forEach(item => {
        item.style.opacity = '0';
    });

    // Show the selected slide
    aboutItems[index].style.opacity = '1';

    aboutDots.forEach(dot => {
        dot.classList.remove('active');
        dot.classList.add('bg-white/50');
        dot.classList.remove('bg-white');
    });

    aboutDots[index].classList.add('active');
    aboutDots[index].classList.add('bg-white');
    aboutDots[index].classList.remove('bg-white/50');

    currentAboutSlide = index;
}

function nextAboutSlide() {
    let nextIndex = currentAboutSlide + 1;
    if (nextIndex >= aboutItems.length) {
        nextIndex = 0;
    }
    showAboutSlide(nextIndex);
}

function prevAboutSlide() {
    let prevIndex = currentAboutSlide - 1;
    if (prevIndex < 0) {
        prevIndex = aboutItems.length - 1;
    }
    showAboutSlide(prevIndex);
}

document.getElementById('next-about').addEventListener('click', nextAboutSlide);
document.getElementById('prev-about').addEventListener('click', prevAboutSlide);

aboutDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showAboutSlide(index);
    });
});
