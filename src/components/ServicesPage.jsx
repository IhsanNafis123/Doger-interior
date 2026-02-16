import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronsRight,
  PenTool,
  MessageSquare,
  Star,
} from "lucide-react";
import "./ServicesPage.css";

// --- IMPORT FOTO LAYANAN ---
import imgKitchen from "../assets/kitchenset.png";
import imgWardrobe from "../assets/foto-8.jpg";
import imgTangga from "../assets/foto-6.jpg";
import imgTV from "../assets/foto-3.jpg";
import imgSliding from "../assets/foto-5.jpg";
import imgKanopi from "../assets/foto-10.jpg";

const SERVICES_DATA = [
  { id: 1, title: "Kitchen Set", desc: "Dapur mewah dengan material premium.", img: imgKitchen },
  { id: 2, title: "Wardrobe", desc: "Penyimpanan cerdas dan rapi.", img: imgWardrobe },
  { id: 3, title: "Lemari Bawah Tangga", desc: "Storage multifungsi estetik.", img: imgTangga },
  { id: 4, title: "Backdrop TV", desc: "Area hiburan mewah tanpa kabel.", img: imgTV },
  { id: 5, title: "Pintu Sliding", desc: "Sekat ruangan fleksibel aluminium.", img: imgSliding },
  { id: 6, title: "Interior Komersial", desc: "Solusi interior kantor/kafe.", img: imgKanopi },
];

// DATA DIDUPLIKASI 3X AGAR SCROLLING TERASA TIDAK PERNAH HABIS
const INFINITE_SERVICES = [...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA];

// KONSTANTA UKURAN (Sesuaikan dengan CSS)
const CARD_WIDTH = 350; 
const GAP = 30;
// Titik reset: Lebar 1 set data original
const RESET_POINT = (CARD_WIDTH + GAP) * SERVICES_DATA.length;

const ServicesPage = () => {
  const scrollContainerRef = useRef(null);
  
  // Ref untuk menyimpan status tanpa memicu render ulang
  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0
  });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    
    // Kecepatan Auto Scroll (makin besar makin ngebut)
    const autoScrollSpeed = 1; 

    const animate = () => {
      // LOGIKA UTAMA:
      // Hanya jalan otomatis jika mouse TIDAK ditekan (!isDown)
      if (!dragInfo.current.isDown) {
        container.scrollLeft += autoScrollSpeed;
      }

      // LOGIKA INFINITE LOOP:
      // Jika posisi scroll sudah melewati panjang 1 set data, kurangi posisinya
      if (container.scrollLeft >= RESET_POINT) {
        container.scrollLeft -= RESET_POINT;
      } 
      // Handle jika user scroll manual ke kiri sampai mentok (kurang dari 0)
      else if (container.scrollLeft <= 0) {
        container.scrollLeft += RESET_POINT;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Mulai Animasi
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup saat komponen hilang
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // --- EVENT HANDLERS UNTUK DRAG MANUAL ---

  const handleMouseDown = (e) => {
    dragInfo.current.isDown = true;
    dragInfo.current.startX = e.pageX - scrollContainerRef.current.offsetLeft;
    dragInfo.current.scrollLeft = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    dragInfo.current.isDown = false;
    if(scrollContainerRef.current) scrollContainerRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    dragInfo.current.isDown = false;
    if(scrollContainerRef.current) scrollContainerRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e) => {
    if (!dragInfo.current.isDown) return;
    
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    // Walk: seberapa jauh mouse digeser
    const walk = (x - dragInfo.current.startX) * 1.5; // * 1.5 biar gesernya lebih responsif
    scrollContainerRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;
  };

  // Support untuk Layar Sentuh (HP/Tablet)
  const handleTouchStart = () => { dragInfo.current.isDown = true; };
  const handleTouchEnd = () => { dragInfo.current.isDown = false; };

  return (
    <div className="services-root">
      <main className="services-main">
        {/* HEADER */}
        <section className="services-header">
          <div className="op10-container center-text">
            <span className="brand-tag">Layanan Fabrikasi</span>
            <h1>
              Kualitas Interior <br />
              <span className="text-brown">Standar Premium</span>.
            </h1>
            <p className="header-desc">
              Pilihan layanan fabrikasi kustom yang dirancang untuk memenuhi
              kebutuhan fungsional dan estetika ruang Anda.
            </p>
          </div>
        </section>

        {/* MARQUEE SECTION */}
        <section className="services-marquee-wrapper">
          <div
            className="services-marquee-scroll-container"
            ref={scrollContainerRef}
            // Event Listeners Mouse (Desktop)
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            // Event Listeners Touch (Mobile)
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="services-marquee-track">
              {INFINITE_SERVICES.map((service, index) => (
                <div key={`${service.id}-${index}`} className="service-v-card">
                  <div className="card-img-top">
                    <img src={service.img} alt={service.title} />
                    <span className="card-type-badge">Tipe Premium</span>
                  </div>

                  <div className="card-body">
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                    <div className="card-features">
                        <div className="feat-item"><Star size={12}/> Custom Size</div>
                        <div className="feat-item"><Star size={12}/> Best Material</div>
                    </div>
                  </div>

                  <Link to="/contact" className="card-footer-btn">
                    <div className="btn-icon-box">
                      <ChevronsRight size={24} />
                    </div>
                    <div className="btn-text-box">Pesan Sekarang</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="services-values bg-cream-light">
          <div className="op10-container">
            <div className="values-grid">
              <ValueBox
                icon={<PenTool />}
                title="Custom Sepenuhnya"
                text="Desain fleksibel mengikuti preferensi estetika Anda."
              />
              <ValueBox
                icon={<MessageSquare />}
                title="Konsultasi Gratis"
                text="Diskusi mendalam online maupun offline."
              />
              <ValueBox
                icon={<Star />}
                title="Bergaransi"
                text="Jaminan kualitas material dan pengerjaan."
              />
            </div>
          </div>
        </section>
      </main>

      <Link to="/" className="btn-back-float">
        <ArrowLeft size={24} />
      </Link>
    </div>
  );
};

const ValueBox = ({ icon, title, text }) => (
  <div className="value-box">
    <div className="v-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
);

export default ServicesPage;