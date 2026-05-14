import { useState } from 'react';
import styles from './HubLayout.module.css';
import Sidebar from './Sidebar';

const EXTERNAL_LINKS = {
  chatbot: "#",
  newsletter: "#",
  assistant: "#",
  bibliotheque: "#",
};

export default function HubLayout({ user, role = 'visitor', onOpenAuth, onOpenAdmin }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showConceptModal, setShowConceptModal] = useState(false);

  const handleLinkClick = (e, isPremiumFeature = false) => {
    if (role === 'visitor' || role === 'pending') {
      e.preventDefault();
      alert(role === 'visitor' ? "Veuillez créer un compte ou vous connecter pour accéder aux applications." : "Votre compte est en attente de validation par un administrateur.");
      return;
    }
    
    if (isPremiumFeature && role === 'standard') {
      e.preventDefault();
      alert("Cette fonctionnalité requiert un compte Premium.");
      return;
    }
  };

  return (
    <div className={styles.hubContainer}>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        role={role}
        onOpenAdmin={onOpenAdmin}
      />

      <header className={styles.header}>
        <button
          className={styles.menuBtn}
          onClick={() => setIsSidebarOpen(true)}
        >
          <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div>
        </button>

        <div className={styles.logoHeader}>
          <div className={styles.horizontalLine}></div>
          <div className={styles.logoEmblemContainer}>
            <div className={styles.logoEmblem}>
              <svg viewBox="0 0 100 50" className={styles.topGear}>
                {/* Dents d'engrenage mécaniques (carrées et régulières) */}
                <circle cx="50" cy="50" r="42" fill="none" stroke="#2a2a2a" strokeWidth="6" strokeDasharray="6 4" />
                {/* Jante principale de la roue */}
                <circle cx="50" cy="50" r="39" fill="#111" stroke="#444" strokeWidth="1.5" />
                {/* Anneau intérieur creux */}
                <circle cx="50" cy="50" r="28" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="2 3" />
                {/* Rayons pleins pour l'aspect structurel d'une roue */}
                <path d="M50 50 L50 11 M50 50 L16 30 M50 50 L84 30" stroke="#333" strokeWidth="3" />
              </svg>
              <div className={styles.fleurDeLys}>⚜</div>
            </div>
            <h1 className={styles.mainTitle}>ISORA</h1>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>

        {/* Background Watermarks - Horlogerie */}
        <div className={styles.watermarkContainer}>

          {/* 1. Cadran */}
          <div className={styles.watermark} style={{ top: '80px', left: '-80px' }}>
            <svg viewBox="0 0 200 200" width="400" opacity="0.10">
              <circle cx="100" cy="100" r="95" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-gold)" strokeWidth="1" />
              {[...Array(12)].map((_, i) => (
                <line key={i} x1="100" y1="10" x2="100" y2="20" stroke="var(--color-gold)" strokeWidth="1.5" transform={`rotate(${i * 30} 100 100)`} />
              ))}
              <path d="M100 100 L100 40 M100 100 L140 70" stroke="var(--color-gold)" strokeWidth="0.5" />
            </svg>
          </div>

          {/* 2. Roue / Engrenage */}
          <div className={styles.watermark} style={{ top: '350px', right: '-120px' }}>
            <svg viewBox="0 0 200 200" width="450" opacity="0.10">
              <circle cx="100" cy="100" r="70" fill="none" stroke="var(--color-gold)" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="15" fill="none" stroke="var(--color-gold)" strokeWidth="1" />
              {[...Array(6)].map((_, i) => (
                <line key={i} x1="100" y1="15" x2="100" y2="70" stroke="var(--color-gold)" strokeWidth="1" transform={`rotate(${i * 60} 100 100)`} />
              ))}
              {/* Dents d'engrenage */}
              {[...Array(24)].map((_, i) => (
                <path key={'t' + i} d="M96 30 L98 22 L102 22 L104 30 Z" fill="none" stroke="var(--color-gold)" strokeWidth="0.8" transform={`rotate(${i * 15} 100 100)`} />
              ))}
            </svg>
          </div>

          {/* 3. Cage Tourbillon (Géométrie) */}
          <div className={styles.watermark} style={{ top: '850px', left: '-150px' }}>
            <svg viewBox="0 0 200 200" width="380" opacity="0.10">
              <circle cx="100" cy="100" r="85" fill="none" stroke="var(--color-gold)" strokeWidth="1" />
              <circle cx="100" cy="100" r="5" fill="none" stroke="var(--color-gold)" strokeWidth="1" />
              <path d="M 100 15 L 120 50 L 100 85 L 80 50 Z" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" />
              <path d="M 100 115 L 120 150 L 100 185 L 80 150 Z" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" />
              <path d="M 15 100 L 50 80 L 85 100 L 50 120 Z" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" />
              <path d="M 115 100 L 150 80 L 185 100 L 150 120 Z" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* 4. Balancier (Balance Wheel) */}
          <div className={styles.watermark} style={{ top: '1300px', right: '-80px' }}>
            <svg viewBox="0 0 200 200" width="450" opacity="0.10">
              <circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" />
              <path d="M 100 100 L 100 20" stroke="var(--color-gold)" strokeWidth="1.5" />
              <path d="M 100 100 L 30 140" stroke="var(--color-gold)" strokeWidth="1.5" />
              <path d="M 100 100 L 170 140" stroke="var(--color-gold)" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="10" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
              {/* Vis de balancier */}
              {[...Array(12)].map((_, i) => (
                <rect key={'v' + i} x="97" y="17" width="6" height="5" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" transform={`rotate(${i * 30 + 15} 100 100)`} />
              ))}
            </svg>
          </div>

          {/* 5. Échappement Minimaliste */}
          <div className={styles.watermark} style={{ top: '1650px', left: '100px' }}>
            <svg viewBox="0 0 200 200" width="350" opacity="0.10">
              <path d="M 20 100 A 80 80 0 1 1 180 100" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" strokeDasharray="3 3" />
              <path d="M 10 100 L 190 100 M 100 10 L 100 190" stroke="var(--color-gold)" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="var(--color-gold)" strokeWidth="1" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" />
              <rect x="95" y="95" width="10" height="10" fill="none" stroke="var(--color-gold)" strokeWidth="1" transform="rotate(45 100 100)" />
              <circle cx="100" cy="100" r="95" fill="none" stroke="var(--color-gold)" strokeWidth="0.2" />
            </svg>
          </div>

        </div>

        <div className={styles.layoutWrapper}>

          {/* Ligne directrice unifiée connectant mathématiquement les cadres dorés */}
          <svg className={styles.unifiedLine}>
            {/* Header -> Card 1 */}
            <path d="M500 -100 C500 0, 729 -50, 729 -15" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
            <circle cx="729" cy="-15" r="4" fill="var(--color-gold)" />

            {/* Card 1 -> Card 2 */}
            <circle cx="589" cy="160" r="4" fill="var(--color-gold)" />
            <path d="M589 160 C400 160, 301 300, 301 485" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
            <circle cx="301" cy="485" r="4" fill="var(--color-gold)" />

            {/* Card 2 -> Card 3 */}
            <circle cx="441" cy="660" r="4" fill="var(--color-gold)" />
            <path d="M441 660 C550 660, 729 800, 729 955" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
            <circle cx="729" cy="955" r="4" fill="var(--color-gold)" />

            {/* Card 3 -> Card 4 */}
            <circle cx="589" cy="1130" r="4" fill="var(--color-gold)" />
            <path d="M589 1130 C400 1130, 271 1250, 271 1425" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
            <circle cx="271" cy="1425" r="4" fill="var(--color-gold)" />

            {/* Card 4 -> Footer */}
            <circle cx="271" cy="1775" r="4" fill="var(--color-gold)" />
            <path d="M271 1775 C271 1900, 500 1850, 500 2000" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
          </svg>

          {/* Card 1 : IA Expert Chatbot */}
          <div className={styles.cardRow}>
            <div className={styles.textContentLeft}>
              <h2 className={styles.cardTitle}>IA Expert Chatbot</h2>
              <p className={styles.cardDesc}>Assistant horloger à votre disposition.<br />Basé sur des connaissances techniques<br />intégrées.</p>
              <div className={styles.arrowRight}>⟶</div>
            </div>

            <div className={styles.imageBlock}>
              <div className={styles.goldFrame} style={{ top: '-15px', right: '-15px' }}></div>
              <a href={EXTERNAL_LINKS.chatbot} className={styles.imageContainer} onClick={(e) => handleLinkClick(e, false)}>
                <img src="/images/bookshelf.png" alt="Bookshelf" className={styles.realImage} />
                {(role === 'visitor' || role === 'pending') && (
                  <div className={styles.lockedOverlay}>
                    <span className={styles.lockIcon}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="11" width="12" height="10" rx="1" ry="1"></rect>
                        <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
                      </svg>
                    </span>
                    <span className={styles.lockText}>Connexion requise</span>
                  </div>
                )}
              </a>
            </div>
          </div>

          {/* Card 2 : Newsletter Horlogère */}
          <div className={styles.cardRow}>
            <div className={styles.imageBlock}>
              <div className={styles.goldFrame} style={{ bottom: '-15px', right: '-15px' }}></div>
              <a href={EXTERNAL_LINKS.newsletter} className={styles.imageContainerBlack} onClick={(e) => handleLinkClick(e, false)}>
                <div className={styles.journalTitle}>The Watch<br />Collector's<br />Journal</div>
                {(role === 'visitor' || role === 'pending') && (
                  <div className={styles.lockedOverlay}>
                    <span className={styles.lockIcon}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="11" width="12" height="10" rx="1" ry="1"></rect>
                        <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
                      </svg>
                    </span>
                    <span className={styles.lockText}>Connexion requise</span>
                  </div>
                )}
              </a>
            </div>

            <div className={styles.textContentRight}>
              <h2 className={styles.cardTitle}>Newsletter Horlogère</h2>
              <p className={styles.cardDesc}>Tenez-vous informés de l'actualité horlogère.</p>
              <div className={styles.arrowLeft}>⟵</div>
            </div>
          </div>

          {/* Card 3 : Assistant au réglage */}
          <div className={styles.cardRow}>
            <div className={styles.textContentLeft}>
              <h2 className={styles.cardTitle}>Assistant au réglage</h2>
              <p className={styles.cardDesc}>Aide au réglage, support de formation.</p>
              <div className={styles.arrowRight}>⟶</div>
            </div>

            <div className={styles.imageBlock}>
              <div className={styles.goldFrame} style={{ bottom: '-15px', right: '-15px' }}></div>
              <a href={EXTERNAL_LINKS.assistant} className={`${styles.imageContainerBlack} ${(role === 'standard' || role === 'visitor' || role === 'pending') ? styles.imageDisabled : ''}`} onClick={(e) => handleLinkClick(e, true)}>
                <img src="/images/clock.png" alt="Clock" className={styles.realImage} />
                {(role === 'standard' || role === 'visitor' || role === 'pending') && (
                  <div className={styles.lockedOverlay}>
                    <span className={styles.lockIcon}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="11" width="12" height="10" rx="1" ry="1"></rect>
                        <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
                      </svg>
                    </span>
                    <span className={styles.lockText}>{(role === 'visitor' || role === 'pending') ? 'Connexion requise' : 'Compte Premium'}</span>
                  </div>
                )}
              </a>
            </div>
          </div>

          {/* Card 4 : Bibliothèque Virtuelle */}
          <div className={styles.cardRow} style={{ marginBottom: 0 }}>
            <div className={styles.imageBlock}>
              <div className={styles.goldFrame} style={{ bottom: '-15px', left: '-15px' }}></div>
              <a href={EXTERNAL_LINKS.bibliotheque} className={`${styles.imageContainerBlack} ${(role === 'standard' || role === 'visitor' || role === 'pending') ? styles.imageDisabled : ''}`} onClick={(e) => handleLinkClick(e, true)}>
                <img src="/images/pocket_watch.png" alt="Pocket Watch" className={styles.realImage} />
                {(role === 'standard' || role === 'visitor' || role === 'pending') && (
                  <div className={styles.lockedOverlay}>
                    <span className={styles.lockIcon}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="11" width="12" height="10" rx="1" ry="1"></rect>
                        <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
                      </svg>
                    </span>
                    <span className={styles.lockText}>{(role === 'visitor' || role === 'pending') ? 'Connexion requise' : 'Compte Premium'}</span>
                  </div>
                )}
              </a>
            </div>

            <div className={styles.textContentRight}>
              <h2 className={styles.cardTitle}>Bibliothèque Virtuelle</h2>
              <p className={styles.cardDesc}>Immersion dans le savoir horloger.<br />Des centaines de documents numérisés<br />à votre portée.</p>
              <div className={styles.arrowLeft}>⟵</div>
            </div>
          </div>

        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h2 className={styles.footerTitle}>À propos d'Isora</h2>
          <nav className={styles.footerNav}>
            {user ? (
              <a href="#" onClick={(e) => { e.preventDefault(); setIsSidebarOpen(true); }}>Mon Compte</a>
            ) : (
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenAuth(); }}>Créer un compte / Connexion</a>
            )}
            <a href="#" onClick={(e) => { e.preventDefault(); setShowConceptModal(true); }}>Concept d'Isora</a>
            <a href="#">Contacts</a>
          </nav>
          <div className={styles.copyright}>
            <span className={styles.line}></span>
            <span>Par Ann Noir</span>
            <span className={styles.line}></span>
          </div>
        </div>
      </footer>

      {/* Concept Modal */}
      {showConceptModal && (
        <div className={styles.conceptOverlay} onClick={() => setShowConceptModal(false)}>
          <div className={styles.conceptModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeConceptBtn} onClick={() => setShowConceptModal(false)}>✕</button>
            <h2 className={styles.conceptTitle}>Le Concept ISORA</h2>
            <div className={styles.conceptDivider}></div>
            <p className={styles.conceptText}>
              L'Art de la Mesure, le Cœur de la Transmission. Ce n’est pas seulement une plateforme, c’est un écosystème numérique conçu comme un mouvement de haute horlogerie. Ici, chaque application est un rouage essentiel pour servir la précision et le savoir.<br /><br />
              Isora unit la main et l'esprit. Ce hub a été pensé pour réunir tous les métiers de l’horlogerie et satisfaire tous vos besoins.<br /><br />
              <span className={styles.conceptHighlight}>L'excellence au service du temps, pour ceux qui le façonnent.</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
