/**
 * EEG Image Asset Manifest — single source of truth for every image path + alt text.
 *
 * To swap or add a photo: drop the file into the matching images/ subfolder
 * (see images/README.md), then update `src` below if the filename differs.
 * Nothing else in the codebase needs to change.
 *
 * Each entry: { src, alt: { fr, en } }
 * `src` is relative to the site root (works on GitHub Pages project sites).
 */
const EEG_IMAGES = {
  logoNav: {
    src: 'images/logo/eeg-logo.jpg',
    alt: { fr: 'Logo — École d\'Excellence Espoir de Guinée (EEG)', en: 'EEG École d\'Excellence Espoir de Guinée logo' },
  },
  logoFooter: {
    src: 'images/logo/eeg-logo.jpg',
    alt: { fr: 'Logo — École d\'Excellence Espoir de Guinée (EEG)', en: 'EEG École d\'Excellence Espoir de Guinée logo' },
  },
  partnershipBadge: {
    src: 'images/logo/eeg-logo-with-flags.jpg',
    alt: { fr: 'Logo EEG entre les drapeaux de la Suède et de la Guinée', en: 'EEG logo between the Swedish and Guinean flags' },
  },
  heroSchool: {
    src: 'images/hero/hero-school.jpg',
    alt: { fr: 'Équipe et élèves de l\'EEG devant le campus', en: 'EEG staff and students in front of the campus' },
  },
  programsLevels: {
    src: 'images/programs/niveaux-creche-maternelle-primaire.jpg',
    alt: { fr: 'Élèves de la Crèche, Maternelle et Primaire à l\'EEG', en: 'Nursery, Kindergarten and Primary students at EEG' },
  },
  admissionsBanner: {
    src: 'images/admissions/admissions-2025-2026.jpg',
    alt: { fr: 'Affiche des inscriptions EEG 2025-2026', en: 'EEG 2025-2026 admissions poster' },
  },
  facilityClassroom: {
    src: 'images/facilities/classroom.jpg',
    alt: { fr: 'Salle de classe moderne à l\'EEG', en: 'Modern classroom at EEG' },
  },
  facilityComputerLab: {
    src: 'images/facilities/computer-lab.jpg',
    alt: { fr: 'Laboratoire informatique de l\'EEG', en: 'EEG computer lab' },
  },
  facilityLibrary: {
    src: 'images/facilities/library.jpg',
    alt: { fr: 'Bibliothèque de l\'EEG', en: 'EEG library' },
  },
  facilitySports: {
    src: 'images/facilities/sports-field.jpg',
    alt: { fr: 'Terrain de sport de l\'EEG', en: 'EEG sports field' },
  },
  facilitySlojd: {
    src: 'images/facilities/slojd-workshop.jpg',
    alt: { fr: 'Atelier manuel (Slöjd) de l\'EEG', en: 'EEG handicraft (Slöjd) workshop' },
  },
  facilityGarden: {
    src: 'images/facilities/garden.jpg',
    alt: { fr: 'Jardin pédagogique de l\'EEG', en: 'EEG teaching garden' },
  },
  news1: {
    src: 'images/news/news-1.jpg',
    alt: { fr: 'Ouverture des inscriptions 2025-2026', en: '2025-2026 enrollment opening' },
  },
  news2: {
    src: 'images/news/news-2.jpg',
    alt: { fr: 'Journées portes ouvertes à l\'EEG', en: 'EEG open house days' },
  },
  news3: {
    src: 'images/news/news-3.jpg',
    alt: { fr: 'Partenariat Guinée-Suède', en: 'Guinea-Sweden partnership' },
  },
  lead1: {
    src: 'images/leadership/lead-1.jpg',
    alt: { fr: 'Direction Générale de l\'EEG', en: 'EEG General Directorate' },
  },
  lead2: {
    src: 'images/leadership/lead-2.jpg',
    alt: { fr: 'Direction Pédagogique de l\'EEG', en: 'EEG Academic Directorate' },
  },
  lead3: {
    src: 'images/leadership/lead-3.jpg',
    alt: { fr: 'Coordination du Partenariat Suédois', en: 'Swedish Partnership Coordination' },
  },
};

/**
 * Site-wide media/config constants (video links, external assets) — kept in this
 * same manifest file so anything media-related lives in one place. Update the
 * `src` below if the founders' message video ever moves.
 */
const EEG_MEDIA = {
  foundersMessageVideo: {
    src: 'https://www.facebook.com/share/v/17yu272TX3/',
    label: { fr: 'Regarder le Message des Fondateurs', en: "Watch the Founders' Message" },
  },
};

/**
 * Probe-loads an image; only swaps it into the DOM if it actually exists,
 * so a missing file never shows a broken-image icon — the existing
 * placeholder/fallback markup simply stays visible.
 *
 * @param {string} key - key into EEG_IMAGES
 * @param {(url: string, alt: string) => void} onLoad - called with the working src + current-language alt
 * @param {string} [lang] - 'fr' | 'en', defaults to document.documentElement.lang
 */
function mountImage(key, onLoad, lang) {
  const entry = EEG_IMAGES[key];
  if (!entry) return;
  const activeLang = lang || document.documentElement.lang || 'fr';
  const probe = new Image();
  probe.onload = () => onLoad(entry.src, entry.alt[activeLang] || entry.alt.fr);
  probe.onerror = () => {};
  probe.src = entry.src;
}

/**
 * Wires every <img data-asset="key"> on the page: if the manifest's file loads,
 * sets src+alt and reveals the element; otherwise leaves it hidden so a
 * sibling fallback (e.g. an SVG mark or icon) stays visible instead.
 * Safe to call again after a language switch to refresh alt text.
 */
function mountAllDataAssetImages(lang) {
  document.querySelectorAll('img[data-asset]').forEach((img) => {
    const key = img.getAttribute('data-asset');
    mountImage(key, (src, alt) => {
      img.src = src;
      img.alt = alt;
      img.classList.remove('hidden');
      const fallbackSelector = img.getAttribute('data-asset-fallback');
      if (fallbackSelector) {
        document.querySelectorAll(fallbackSelector).forEach((el) => el.classList.add('hidden'));
      }
    }, lang);
  });
}
