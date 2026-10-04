export type CelestialType =
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'moon'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune';

export interface SpaceStat {
  label: string;
  value: string;
  icon?: string;
}

export interface LiveMetric {
  label: string;
  value: string;
  trend: string;
  icon: string;
}

export interface SpaceBody {
  id: string;
  type: CelestialType;
  name: string;
  subtitle: string;
  emoji: string;
  description: string;
  fact: string;
  badge: string;
  gradient: [string, string];
  accent: string;
  stats: SpaceStat[];
  highlights: string[];
  mapPoints: Array<{ x: number; y: number; size: number; color: string }>;
}

export interface SpaceLiveSnapshot {
  time: string;
  status: string;
  temperature: string;
  pressure: string;
  humidity: string;
  visibility: string;
}

export interface PlanetProfile {
  gravityMps2: number;
  meanTemperatureC: number;
  temperatureSwingC: number;
  pressure: string;
  atmosphere: string;
  ice: string;
  dayLength: string;
  yearLength: string;
  surface: string;
}

export const offlineObservations = {
  earth: {
    location: 'Tashkent, Uzbekistan',
    latitude: '41.3° N',
    longitude: '69.2° E',
    temperature: '15°C',
    humidity: '65%',
    pressure: '1013 hPa',
    wind: '5 m/s',
    visibility: '10 km',
    source: 'Offline namunaviy ma’lumot',
  },
  mars: {
    rover: 'Perseverance',
    roverStatus: 'Faol missiya',
    sol: '1234',
    temperature: '-62°C',
    pressure: '636 Pa',
    wind: '3 m/s NW',
    dustOpacity: '0.5',
    source: 'Offline namunaviy ma’lumot',
  },
} as const;

const LUNAR_CYCLE_DAYS = 29.530588853;
const KNOWN_NEW_MOON_UTC = Date.UTC(2000, 0, 6, 18, 14);
const MOON_PHASE_NAMES = [
  'Yangi oy',
  'O‘suvchi hilol',
  'Birinchi chorak',
  'O‘suvchi to‘lin oy',
  'To‘lin oy',
  'Kamayuvchi to‘lin oy',
  'Oxirgi chorak',
  'Kamayuvchi hilol',
];

export function getMoonPhase(date: Date) {
  const cycleMs = LUNAR_CYCLE_DAYS * 24 * 60 * 60 * 1000;
  const elapsed = ((date.getTime() - KNOWN_NEW_MOON_UTC) % cycleMs + cycleMs) % cycleMs;
  const phase = elapsed / cycleMs;
  const nextPhaseIndex = Math.floor(phase * 8) + 1;
  const nextPhase = (nextPhaseIndex % 8) / 8;
  const daysToNextPhase = Math.ceil(((nextPhase - phase + 1) % 1) * LUNAR_CYCLE_DAYS);

  return {
    name: MOON_PHASE_NAMES[Math.round(phase * 8) % 8],
    illumination: Math.round(((1 - Math.cos(phase * Math.PI * 2)) / 2) * 100),
    daysToNextPhase,
  };
}

export const spaceBodies: SpaceBody[] = [
  {
    id: 'earth',
    type: 'earth',
    name: 'Yer',
    subtitle: 'Yashash va suv uchun uyg’un sayyora',
    emoji: '🌍',
    description:
      'Yer — hayot mavjud bo’lgan, suv, atmosfera va dinamik iqlim tizimlariga ega uyg’un sayyora. Bu yerda geologik faollik, okeanlar va barqaror ekotizimlar birgalikda ishlaydi.',
    fact: 'Yer atmosferasi 78% azot, 21% kislorod va kichik miqdordagi boshqa gazlardan iborat.',
    badge: 'Yashash sayyorasi',
    gradient: ['#0b8dff', '#9ae6ff'],
    accent: '#6fe3ff',
    stats: [
      { label: 'Diametr', value: '12,742 km', icon: '◌' },
      { label: 'Gravitatsiya', value: '9.8 m/s²', icon: '⟡' },
      { label: 'Suv', value: '71%', icon: '◍' },
      { label: 'Aylanish', value: '24 soat', icon: '◔' },
    ],
    highlights: ['Suvning mavjudligi', 'Barqaror iqlim', 'Yashash uchun qulay atmosfera'],
    mapPoints: [
      { x: 22, y: 30, size: 6, color: '#8be9ff' },
      { x: 40, y: 25, size: 7, color: '#72d6ff' },
      { x: 58, y: 60, size: 10, color: '#9ae6ff' },
      { x: 74, y: 38, size: 6, color: '#8be9ff' },
      { x: 86, y: 54, size: 8, color: '#72d6ff' },
    ],
  },
  {
    id: 'moon',
    type: 'moon',
    name: 'Oy',
    subtitle: 'Yerning tabiiy yo’ldoshi',
    emoji: '🌙',
    description:
      'Oy — Yer atrofida aylanib yuruvchi tabiiy yo’ldosh bo’lib, kraterlar, maria va tekisliklar bilan qoplangan. Kosmik tadqiqotlar va ilmiy kuzatuvlar uchun muhim obyektdir.',
    fact: 'Oy har doim bir tomoni Yergacha qarab turadi: orbital aylanish va rotatsiya bir xil tezlikda sodir bo’ladi.',
    badge: 'Tabiiy yo’ldosh',
    gradient: ['#7b8de3', '#dfe7ff'],
    accent: '#c6d0ff',
    stats: [
      { label: 'Diametr', value: '3,474 km', icon: '◌' },
      { label: 'Gravitatsiya', value: '1.62 m/s²', icon: '⟡' },
      { label: 'Orbita', value: '384,400 km', icon: '◎' },
      { label: 'Fazalar', value: '29.5 kun', icon: '◔' },
    ],
    highlights: ['Fazalar sikli', 'Kuzatuv va tadqiqotlar', 'Kratersiz sirt'],
    mapPoints: [
      { x: 34, y: 45, size: 8, color: '#dfe7ff' },
      { x: 52, y: 34, size: 7, color: '#c9d5ff' },
      { x: 68, y: 52, size: 10, color: '#d8dfff' },
      { x: 80, y: 38, size: 6, color: '#c6d0ff' },
    ],
  },
  {
    id: 'mars',
    type: 'mars',
    name: 'Mars',
    subtitle: 'Qizil sayyora va kelajak missiyalari',
    emoji: '🔴',
    description:
      'Mars — qizg’ish cho’llar, katta vulqonlar va eski suv yo’llarining izi bilan ajralib turuvchi sayyora. Bu sayyora insoniyat uchun uzoqdagi kolonizatsiya va tadqiqotlar uchun asosiy maqsad hisoblanadi.',
    fact: 'Marsdagi kunning uzunligi Yerdagi kunga deyarli o’xshash, ammo yil davomiyligi taxminan 687 kunni tashkil etadi.',
    badge: 'Qizil sayyora',
    gradient: ['#e76b57', '#f7ce8e'],
    accent: '#ffb38b',
    stats: [
      { label: 'Diametr', value: '6,779 km', icon: '◌' },
      { label: 'Gravitatsiya', value: '3.7 m/s²', icon: '⟡' },
      { label: 'Harorat', value: '-63°C', icon: '◍' },
      { label: 'Atmosfera', value: '99% CO₂', icon: '◎' },
    ],
    highlights: ['Rover missiyalari', 'Eski suv izlari', 'Kelajak kolonizatsiyasi'],
    mapPoints: [
      { x: 28, y: 42, size: 9, color: '#ffb38b' },
      { x: 49, y: 52, size: 8, color: '#ff8a75' },
      { x: 66, y: 32, size: 10, color: '#f7ce8e' },
      { x: 81, y: 62, size: 7, color: '#ff9d7d' },
    ],
  },
  {
    id: 'mercury',
    type: 'mercury',
    name: 'Merkuriy',
    subtitle: 'Quyoshga eng yaqin kichik sayyora',
    emoji: '☿️',
    description: 'Merkuriyda deyarli atmosfera yo’q; kunduz va tun orasidagi harorat farqi juda katta.',
    fact: 'Qutb yaqinidagi doimiy soyali kraterlarda suv muzi bor deb hisoblanadi.',
    badge: 'Ichki sayyora',
    gradient: ['#8b8b91', '#d5c7ae'],
    accent: '#d1d5db',
    stats: [
      { label: 'Diametr', value: '4,879 km' },
      { label: 'Gravitatsiya', value: '3.70 m/s²' },
      { label: 'O‘rtacha harorat', value: '167°C' },
      { label: 'Yil', value: '88 Yer kuni' },
    ],
    highlights: ['Ekzosfera', 'Qutb kraterlarida suv muzi', 'Juda katta harorat farqi'],
    mapPoints: [],
  },
  {
    id: 'venus',
    type: 'venus',
    name: 'Venera',
    subtitle: 'Qalin bulutli issiq sayyora',
    emoji: '🟠',
    description: 'Venera qalin karbonat angidrid atmosferasi va kuchli issiqxona effekti bilan ajralib turadi.',
    fact: 'Venera atmosferasining asosiy qismi CO₂; bulutlari sulfat kislota tomchilaridan iborat.',
    badge: 'Issiqxona sayyorasi',
    gradient: ['#cf7042', '#f4c27a'],
    accent: '#f4c27a',
    stats: [
      { label: 'Diametr', value: '12,104 km' },
      { label: 'Gravitatsiya', value: '8.87 m/s²' },
      { label: 'O‘rtacha harorat', value: '465°C' },
      { label: 'Yil', value: '224.7 Yer kuni' },
    ],
    highlights: ['96.5% CO₂ atmosfera', 'Sulfat kislota bulutlari', 'Sirtida barqaror muz yo‘q'],
    mapPoints: [],
  },
  {
    id: 'jupiter',
    type: 'jupiter',
    name: 'Yupiter',
    subtitle: 'Quyosh tizimidagi eng katta sayyora',
    emoji: '🪐',
    description: 'Yupiter — vodorod va geliydan tashkil topgan ulkan gaz giganti; qattiq sirt chegarasi yo‘q.',
    fact: 'Buyuk Qizil Dog‘ — Yupiter atmosferasidagi ulkan va uzoq davom etuvchi bo‘ron.',
    badge: 'Gaz giganti',
    gradient: ['#b87852', '#efd1a1'],
    accent: '#e8bb86',
    stats: [
      { label: 'Diametr', value: '139,820 km' },
      { label: 'Gravitatsiya', value: '24.79 m/s²' },
      { label: 'Bulut harorati', value: '-110°C' },
      { label: 'Yil', value: '11.86 Yer yili' },
    ],
    highlights: ['H₂ va He atmosferasi', 'Buyuk Qizil Dog‘', 'Qattiq sirt yo‘q'],
    mapPoints: [],
  },
  {
    id: 'saturn',
    type: 'saturn',
    name: 'Saturn',
    subtitle: 'Muz va tosh halqali gaz giganti',
    emoji: '🪐',
    description: 'Saturn vodorod-geliy gaz giganti bo‘lib, halqalari asosan suv muzi va tosh bo‘laklaridan iborat.',
    fact: 'Saturnning o‘rtacha zichligi suvnikidan past; uning ham qattiq sirt chegarasi yo‘q.',
    badge: 'Halqali sayyora',
    gradient: ['#b48a53', '#ead4a0'],
    accent: '#e2ca91',
    stats: [
      { label: 'Diametr', value: '116,460 km' },
      { label: 'Gravitatsiya', value: '10.44 m/s²' },
      { label: 'Bulut harorati', value: '-140°C' },
      { label: 'Yil', value: '29.45 Yer yili' },
    ],
    highlights: ['Suv-muzli halqalar', 'H₂ va He atmosferasi', 'Qattiq sirt yo‘q'],
    mapPoints: [],
  },
  {
    id: 'uranus',
    type: 'uranus',
    name: 'Uran',
    subtitle: 'Yonboshlab aylanuvchi muz giganti',
    emoji: '🔵',
    description: 'Uran — atmosfera ostida suv, ammiak va metan moddalari yuqori bosimda uchraydigan muz giganti.',
    fact: 'Uran o‘z o‘qi atrofida deyarli yonboshlab aylanadi.',
    badge: 'Muz giganti',
    gradient: ['#58aeb8', '#a4e2df'],
    accent: '#8bd5d7',
    stats: [
      { label: 'Diametr', value: '50,724 km' },
      { label: 'Gravitatsiya', value: '8.69 m/s²' },
      { label: 'Bulut harorati', value: '-195°C' },
      { label: 'Yil', value: '84 Yer yili' },
    ],
    highlights: ['Metanli ko‘kimtir atmosfera', 'Suv-ammiak-metan mantiyasi', 'O‘q qiyaligi ~98°'],
    mapPoints: [],
  },
  {
    id: 'neptune',
    type: 'neptune',
    name: 'Neptun',
    subtitle: 'Quyoshdan eng uzoq muz giganti',
    emoji: '🔵',
    description: 'Neptun — metanli ko‘k atmosfera va juda kuchli shamollari bo‘lgan uzoq muz giganti.',
    fact: 'Neptun ichkarisida suv, ammiak va metan yuqori bosimli, issiq qatlamlarni hosil qiladi.',
    badge: 'Muz giganti',
    gradient: ['#164fb5', '#57b5ed'],
    accent: '#57b5ed',
    stats: [
      { label: 'Diametr', value: '49,244 km' },
      { label: 'Gravitatsiya', value: '11.15 m/s²' },
      { label: 'Bulut harorati', value: '-200°C' },
      { label: 'Yil', value: '164.8 Yer yili' },
    ],
    highlights: ['Metanli atmosfera', 'Suv-ammiak-metan mantiyasi', 'Kuchli shamollar'],
    mapPoints: [],
  },
];

const solarSystemOrder: string[] = [
  'mercury',
  'venus',
  'earth',
  'moon',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
];

spaceBodies.sort(
  (first, second) =>
    solarSystemOrder.indexOf(first.id) - solarSystemOrder.indexOf(second.id),
);

export const planetProfiles: Record<CelestialType, PlanetProfile> = {
  mercury: { gravityMps2: 3.7, meanTemperatureC: 167, temperatureSwingC: 3, pressure: '<0.000001 kPa', atmosphere: 'Juda siyrak ekzosfera: O₂, Na, H₂, He va K', ice: 'Qutbdagi soyali kraterlarda suv muzi', dayLength: '176 Yer kuni (quyosh kuni)', yearLength: '88 Yer kuni', surface: 'Kraterli, toshloq sirt' },
  venus: { gravityMps2: 8.87, meanTemperatureC: 465, temperatureSwingC: 0.5, pressure: '92 bar', atmosphere: '96.5% CO₂, 3.5% N₂; sulfat kislota bulutlari', ice: 'Sirtida muz yo‘q; suv bug‘i juda oz', dayLength: '243 Yer kuni (retrograd)', yearLength: '224.7 Yer kuni', surface: 'Vulkanik toshloq sirt' },
  earth: { gravityMps2: 9.81, meanTemperatureC: 15, temperatureSwingC: 1.2, pressure: '1.013 bar', atmosphere: '78% N₂, 21% O₂, qolgan qismi Ar va CO₂', ice: 'Antarktida, Grenlandiya va tog‘ muzliklari', dayLength: '24 soat', yearLength: '365.25 kun', surface: 'Okean, qit’a va faol geologik sirt' },
  moon: { gravityMps2: 1.62, meanTemperatureC: -20, temperatureSwingC: 2.5, pressure: 'Ekzosfera; deyarli vakuum', atmosphere: 'Juda siyrak ekzosfera: He, Ne, Ar va iz miqdorli gazlar', ice: 'Qutb kraterlarining doimiy soyasida suv muzi', dayLength: '29.5 Yer kuni', yearLength: '27.3 kun (Yer atrofida)', surface: 'Regolit va ko‘plab zarba kraterlari' },
  mars: { gravityMps2: 3.71, meanTemperatureC: -65, temperatureSwingC: 2, pressure: '6.36 hPa (o‘zgaruvchan)', atmosphere: 'Taxminan 95% CO₂, 2.7% N₂, 1.6% Ar', ice: 'Qutblarda suv muzi va mavsumiy CO₂ muzi', dayLength: '24 soat 37 daqiqa', yearLength: '687 Yer kuni', surface: 'Temir oksidli chang, vulqon va qadimiy vodiylar' },
  jupiter: { gravityMps2: 24.79, meanTemperatureC: -110, temperatureSwingC: 1.5, pressure: 'Bulut tepasida ~1 bar; chuqurlikda keskin ortadi', atmosphere: 'Asosan H₂ va He; metan, ammiak va suv izlari', ice: 'Qattiq sirt yo‘q; chuqur bulutlarda suv-muz kristallari', dayLength: '9 soat 56 daqiqa', yearLength: '11.86 Yer yili', surface: 'Qattiq sirt yo‘q; gazsimon bulut qatlamlari' },
  saturn: { gravityMps2: 10.44, meanTemperatureC: -140, temperatureSwingC: 1.5, pressure: 'Bulut tepasida ~1 bar; chuqurlikda keskin ortadi', atmosphere: 'Asosan H₂ va He; metan va ammiak izlari', ice: 'Halqalari asosan suv muzi va tosh bo‘laklari', dayLength: '10 soat 42 daqiqa', yearLength: '29.45 Yer yili', surface: 'Qattiq sirt yo‘q; gazsimon bulut qatlamlari' },
  uranus: { gravityMps2: 8.69, meanTemperatureC: -195, temperatureSwingC: 1, pressure: 'Bulut tepasida ~1 bar', atmosphere: 'H₂, He va metan', ice: 'Ichki mantiyada suv, ammiak va metan yuqori bosimda', dayLength: '17 soat 14 daqiqa', yearLength: '84 Yer yili', surface: 'Qattiq sirt yo‘q; muzli-uchuvchi moddalar mantiyasi' },
  neptune: { gravityMps2: 11.15, meanTemperatureC: -200, temperatureSwingC: 1, pressure: 'Bulut tepasida ~1 bar', atmosphere: 'H₂, He va metan', ice: 'Ichki mantiyada suv, ammiak va metan yuqori bosimda', dayLength: '16 soat 6 daqiqa', yearLength: '164.8 Yer yili', surface: 'Qattiq sirt yo‘q; muzli-uchuvchi moddalar mantiyasi' },
};

export const getBodyById = (id: string) =>
  spaceBodies.find((body) => body.id === id) ?? spaceBodies[0];

export const makeLiveSnapshot = (id: string): SpaceLiveSnapshot => {
  const now = new Date();
  const bodyId = id as CelestialType;
  const profile = planetProfiles[bodyId] ?? planetProfiles.earth;
  const bodyIndex = Math.max(0, spaceBodies.findIndex((body) => body.id === id));
  const elapsedSeconds = Math.floor(now.getTime() / 1000);
  const temperatureOffset =
    Math.sin(elapsedSeconds * 0.31 + bodyIndex) * profile.temperatureSwingC;
  const temperature = profile.meanTemperatureC + temperatureOffset;
  const pressure =
    id === 'earth'
      ? offlineObservations.earth.pressure
      : id === 'mars'
        ? offlineObservations.mars.pressure
        : profile.pressure;

  return {
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    status: 'Offline model',
    temperature: `${temperature.toFixed(1)}°C`,
    pressure,
    humidity: id === 'earth' ? offlineObservations.earth.humidity : '—',
    visibility: id === 'earth' ? offlineObservations.earth.visibility : '—',
  };
};
