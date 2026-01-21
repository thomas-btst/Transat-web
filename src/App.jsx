import React, { useState, useEffect } from 'react';
import { 
  User, Wind, Utensils, Search, Beef, ChefHat, Home, LayoutGrid, 
  UserCircle, Smartphone, Eye, EyeOff, Mail, Lock, ArrowRight, 
  Sun, CloudRain, Cloud, Calendar, MapPin, Phone, Beer, Shirt, 
  Users, ChevronLeft, Droplets, Clock, Music, AlertCircle, 
  PartyPopper, Coffee, Link, Pizza, Salad, IceCream, Sandwich, Info, 
  GraduationCap, ChevronDown, ChevronRight, Filter, X, Timer, CheckCircle, Bell, 
  Gamepad2, Mic, Star, Code, Heart, Briefcase, Camera, Plus, Shield, HeartPulse, Stethoscope, PhoneCall, Copy, Globe, ExternalLink
} from 'lucide-react';

// --- 1. THÈME & CONFIGURATION ---
const theme = {
  bg: 'bg-[#F8F9FA]',
  text: 'text-[#1A1A1A]',
  textGray: 'text-[#666666]',
  cardBg: 'bg-white',
  orange: 'text-[#FF6B4A]',
  orangeBg: 'bg-[#FF6B4A]',
  orangeBorder: 'border-[#FF6B4A]',
  inputBg: 'bg-gray-50',
};

// --- 2. COMPOSANTS UTILITAIRES ---
const TransatIconFallback = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 18h16" />
    <path d="M6 18L18 6" />
    <path d="M12 12l-4 6" />
    <path d="M16 8l2-2" />
    <path d="M8 16l-2 2" />
  </svg>
);

const Activity = ({size, className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

// --- 3. DONNÉES PARTAGÉES ---
const SHARED_DATA = {
  weather: {
    current: { temp: '1', condition: 'Ensoleillé', wind: '12 km/h', humidity: '45%', pressure: '1024' },
    hourly: [
      { time: 'Maintenant', icon: Sun, temp: '1', condition: 'Ensoleillé', wind: '12 km/h', humidity: '45%', pressure: '1024' },
      { time: '14h', icon: Sun, temp: '3', condition: 'Ensoleillé', wind: '15 km/h', humidity: '40%', pressure: '1023' },
      { time: '15h', icon: Cloud, temp: '3', condition: 'Nuageux', wind: '18 km/h', humidity: '42%', pressure: '1022' },
      { time: '16h', icon: Cloud, temp: '2', condition: 'Couvert', wind: '20 km/h', humidity: '50%', pressure: '1020' },
      { time: '17h', icon: CloudRain, temp: '1', condition: 'Pluie faible', wind: '22 km/h', humidity: '65%', pressure: '1018' },
      { time: '18h', icon: CloudRain, temp: '0', condition: 'Pluie', wind: '25 km/h', humidity: '75%', pressure: '1016' },
    ],
    weekly: [
      { d: 'Demain', i: Cloud, min: '-1°', max: '4°', rain: '10%' },
      { d: 'Vendredi', i: Sun, min: '0°', max: '5°', rain: '0%' },
      { d: 'Samedi', i: CloudRain, min: '2°', max: '7°', rain: '60%' },
      { d: 'Dimanche', i: Sun, min: '-2°', max: '3°', rain: '0%' },
      { d: 'Lundi', i: Cloud, min: '1°', max: '6°', rain: '20%' },
    ]
  },
  menu: {
    midi: {
      grill: [
        { name: "Steak haché de bœuf", desc: "Origine France", labels: ["Bœuf"] },
        { name: "Escalope de dinde", desc: "Sauce normande", labels: ["Volaille"] },
        { name: "Frites maison", desc: "Pommes de terre locales" },
        { name: "Haricots verts", desc: "Ail et persil", labels: ["Végé"] }
      ],
      chef: [
        { name: "Buns and roll à l'italienne", desc: "Mozzarella, tomates séchées, pesto", labels: ["Nouveau"] },
        { name: "Omelette au chèvre", desc: "Et pommes de terre rissolées", labels: ["Végé"] }
      ],
      pasta: [
        { name: "Tortellinis Ricotta", desc: "Sauce tomate basilic", labels: ["Bio"] },
        { name: "Spaghetti Carbonara", desc: "Lardons fumés" }
      ],
      desserts: [
        { name: "Île flottante", desc: "Crème anglaise vanille" },
        { name: "Fromage blanc", desc: "Coulis de fruits rouges" },
        { name: "Fruit de saison", desc: "Pomme / Banane / Clémentine" }
      ]
    }
  },
  planning: {
    today: '2025-11-26',
    courses: {
      '2025-11-26': [
          { title: 'Mathématiques', type: 'TD', start: '14h', end: '16h', room: 'C103', prof: 'M. Martin', color: 'bg-orange-100 text-orange-700 border-orange-200' },
          { title: 'Informatique', type: 'TP', start: '16h15', end: '18h15', room: 'Info 1', prof: 'Mme. Bernard', color: 'bg-green-100 text-green-700 border-green-200' }
      ]
    }
  },
  laundry: {
    washing: [
      { id: 1, status: 'free', time: null },
      { id: 2, status: 'busy', time: '14 min' },
      { id: 3, status: 'free', time: null },
      { id: 4, status: 'busy', time: '32 min' },
    ],
    dryers: [
      { id: 1, status: 'busy', time: '5 min' },
      { id: 2, status: 'free', time: null },
      { id: 3, status: 'out_of_order', time: null },
      { id: 4, status: 'free', time: null },
    ]
  },
  events: [
    { 
      id: 1, 
      title: "Soirée BDE", 
      date: "Jeu. 28 Nov", 
      time: "22h00 - 04h00", 
      location: "Le Foyer", 
      category: "Soirée",
      icon: PartyPopper,
      color: "bg-purple-100 text-purple-600",
      description: "La traditionnelle soirée du jeudi ! Venez nombreux pour décompresser après les cours. Thème : Années 80."
    },
    { 
      id: 2, 
      title: "Brunch du Dimanche", 
      date: "Dim. 30 Nov", 
      time: "11h00 - 14h00", 
      location: "Cafétéria", 
      category: "Vie étudiante",
      icon: Coffee,
      color: "bg-orange-100 text-orange-600",
      description: "Œufs brouillés, pancakes, jus frais... Le meilleur moyen de commencer son dimanche."
    },
    { 
      id: 3, 
      title: "Tournoi FIFA", 
      date: "Lun. 01 Déc", 
      time: "18h00", 
      location: "Salle TV", 
      category: "Jeux",
      icon: Gamepad2,
      color: "bg-blue-100 text-blue-600",
      description: "Montre qui est le patron. Inscriptions sur place. Nombreux lots à gagner !"
    },
  ],
  beers: [
    { name: 'Cuvée des Trolls', degree: '7.0°', type: 'Blonde', price: '2.50€', icon: '🍺' },
    { name: 'Paix Dieu', degree: '10.0°', type: 'Blonde', price: '3.00€', icon: '🍺' },
    { name: 'Kwak', degree: '8.4°', type: 'Ambrée', price: '2.90€', icon: '🍺' },
    { name: 'Chouffe', degree: '8.0°', type: 'Blonde', price: '2.60€', icon: '🍺' },
    { name: 'Guinness', degree: '4.2°', type: 'Noire', price: '3.00€', icon: '🍺' },
    { name: 'Kriek', degree: '3.5°', type: 'Rouge', price: '2.80€', icon: '🍒' }, 
    { name: 'Chimay Bleue', degree: '9.0°', type: 'Brune', price: '3.20€', icon: '🍺' },
  ],
  clubs: [
    { name: 'BDE Transat', category: 'Vie étudiante', icon: PartyPopper, color: 'bg-orange-100 text-orange-600', description: "Bureau des Élèves. Organisation des soirées, WEI et de la vie du campus." },
    { name: 'BDS', category: 'Sport', icon: null, color: 'bg-green-100 text-green-600', description: "Bureau des Sports." }, 
    { name: 'Club Musique', category: 'Art', icon: Music, color: 'bg-purple-100 text-purple-600', description: "Pour les musiciens de tous niveaux." },
    { name: 'Junior Entreprise', category: 'Pro', icon: Briefcase, color: 'bg-blue-100 text-blue-600', description: "Réalise des missions professionnelles pour des entreprises." },
    { name: 'Club Photo', category: 'Art', icon: Camera, color: 'bg-pink-100 text-pink-600', description: "Couverture des événements et sorties photo." },
    { name: 'Club Info', category: 'Tech', icon: Code, color: 'bg-gray-100 text-gray-600', description: "Développement, hackathons et entraide en programmation." },
    { name: 'Humanitaire', category: 'Vie étudiante', icon: Heart, color: 'bg-red-100 text-red-600', description: "Actions solidaires et collectes de fonds." },
  ],
  numbers: [
    { name: 'Maison des Élèves (MDE)', number: '01 23 45 67 10', icon: Home, description: 'Vie étudiante & Asso' },
    { name: 'Accueil École', number: '01 23 45 67 00', icon: Info, description: 'Administration & Renseignements' },
    { name: 'Sécurité', number: '01 23 45 67 89', icon: Shield, description: '24h/24 - 7j/7' },
  ],
  links: [
    { name: 'Moodle', url: 'https://moodle.imt-atlantique.fr/', icon: GraduationCap, color: 'text-orange-600 bg-orange-100' },
    { name: 'Mails (Zimbra)', url: 'https://z.imt.fr', icon: Mail, color: 'text-blue-600 bg-blue-100' },
    { name: 'Planning (Pass)', url: 'https://pass.imt-atlantique.fr', icon: Calendar, color: 'text-green-600 bg-green-100' },
    { name: 'Intranet', url: 'https://intranet.imt-atlantique.fr/', icon: Globe, color: 'text-purple-600 bg-purple-100' },
  ]
};

// --- 4. COMPOSANTS DE BASE ---

const Logo = ({ size = "md" }) => {
  const [error, setError] = useState(false);
  const dim = size === "lg" ? "w-16 h-16" : "w-10 h-10";
  const textSize = size === "lg" ? "text-4xl" : "text-xl";

  return (
    <div className="flex items-center gap-3 cursor-pointer">
      {!error ? (
        <img 
          src="https://transat.dev/logo.png" 
          alt="Logo" 
          className={`${dim} object-contain`}
          onError={() => setError(true)} 
        />
      ) : (
        <TransatIconFallback className={`${dim} ${theme.orange}`} />
      )}
      <p className={`font-bold ${textSize} tracking-tight ${theme.orange}`}>Transat</p>
    </div>
  );
};

const InputField = ({ icon: Icon, type = "text", placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon size={20} />
      </div>
      <input 
        type={inputType} 
        placeholder={placeholder}
        className={`w-full py-4 pl-12 pr-${isPassword ? '12' : '4'} bg-white rounded-2xl border border-gray-200 shadow-sm focus:border-[#FF6B4A] focus:ring-4 focus:ring-[#FF6B4A]/10 outline-none text-[#1A1A1A] font-medium transition-all placeholder:text-gray-400`}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseStyle = "w-full py-4 rounded-full font-bold transition-all transform active:scale-[0.98] cursor-pointer";
  const styles = variant === "primary" 
    ? `bg-[#FF6B4A] text-white shadow-lg shadow-orange-200 hover:bg-[#ff5530]`
    : `bg-white text-[#1A1A1A] border border-gray-200 hover:bg-gray-50`;
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${styles} ${className}`}>
      {children}
    </button>
  );
};

// Footer réutilisable avec marge ajustée
const Footer = () => (
  <footer className="mt-12 py-8 border-t border-gray-200/60 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
      <div className="text-sm text-gray-400 font-medium">
        © 2025 Transat. Tous droits réservés.
      </div>
      <div className="flex items-center gap-6 text-sm text-gray-500 font-medium justify-center">
        <a href="#" className="hover:text-[#FF6B4A] transition-colors flex items-center gap-2 cursor-pointer">
          <Smartphone size={16} />
          Version Mobile
        </a>
      </div>
    </div>
  </footer>
);

// --- 5. PAGES ---

const LoginPage = ({ onNavigate }) => (
  <div className={`flex flex-col min-h-screen ${theme.bg}`}>
    <div className="flex-grow flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <div className="mb-4 transform hover:scale-105 transition-transform duration-500 cursor-pointer">
          <Logo size="lg" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-[#1A1A1A]">Bon retour !</h1>
          <p className="text-gray-500">Connectez-vous pour accéder à votre espace.</p>
        </div>
        <div className="w-full space-y-4">
          <InputField icon={Mail} type="email" placeholder="Email étudiant" />
          <InputField icon={Lock} type="password" placeholder="Mot de passe" />
          <div className="flex justify-end">
            <button className="text-sm font-medium text-[#FF6B4A] hover:underline cursor-pointer">Mot de passe oublié ?</button>
          </div>
        </div>
        <div className="w-full space-y-4 mt-4">
          <Button onClick={() => onNavigate('home')}>Se connecter</Button>
          <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-[#F8F9FA] text-gray-500">ou</span></div>
          </div>
          <Button variant="secondary" onClick={() => onNavigate('register')}>Créer un compte</Button>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto w-full px-6">
      <Footer />
    </div>
  </div>
);

const RegisterPage = ({ onNavigate }) => (
  <div className={`flex flex-col min-h-screen ${theme.bg}`}>
    <div className="flex-grow flex flex-col items-center justify-center p-6 animate-in slide-in-from-right duration-500">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <div className="mb-2 cursor-pointer">
          <Logo size="lg" />
        </div>
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-[#1A1A1A]">Créer un compte</h1>
          <p className="text-gray-500">Rejoignez la communauté Transat.</p>
        </div>
        <div className="w-full space-y-3">
          <div className="flex gap-3">
              <InputField icon={User} placeholder="Prénom" />
              <InputField icon={User} placeholder="Nom" />
          </div>
          <InputField icon={Mail} type="email" placeholder="Email étudiant" />
          <InputField icon={Lock} type="password" placeholder="Mot de passe" />
          <InputField icon={Lock} type="password" placeholder="Confirmer" />
        </div>
        <div className="w-full space-y-4 mt-2">
          <Button onClick={() => onNavigate('home')}>S'inscrire</Button>
          <p className="text-center text-gray-500 text-sm">
            Déjà un compte ? <button onClick={() => onNavigate('login')} className="font-bold text-[#FF6B4A] hover:underline cursor-pointer">Se connecter</button>
          </p>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto w-full px-6">
      <Footer />
    </div>
  </div>
);

const WeatherPage = ({ onBack }) => {
  const { hourly, weekly } = SHARED_DATA.weather;
  const [selectedForecast, setSelectedForecast] = useState(hourly[0]);

  return (
    <div className="animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">
              <ChevronLeft size={24} />
          </button>
          <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Météo Campus</h2>
      </div>

      <div className="mb-8">
          <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-xl font-bold text-[#1A1A1A]">Aujourd'hui</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
              {hourly.map((item, i) => (
                  <button 
                      key={i} 
                      onClick={() => setSelectedForecast(item)}
                      className={`flex flex-col items-center justify-between min-w-[72px] h-32 p-4 rounded-[2rem] border transition-all duration-300 cursor-pointer ${
                          selectedForecast.time === item.time 
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-lg scale-105' 
                          : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
                      }`}
                  >
                      <span className="text-xs font-bold">{item.time}</span>
                      <item.icon size={28} className={selectedForecast.time === item.time ? 'text-[#FF6B4A]' : 'text-gray-400'} />
                      <span className="text-lg font-bold">{item.temp}°</span>
                  </button>
              ))}
          </div>
      </div>

      <div className="bg-[#FF6B4A] rounded-[2.5rem] p-8 text-white shadow-xl shadow-orange-200 mb-8 relative overflow-hidden transition-all duration-300 cursor-default">
          <div className="absolute -top-10 -right-10 text-white/20 transition-transform duration-500 transform hover:rotate-12">
              <selectedForecast.icon size={200} />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
              <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                  {selectedForecast.time === 'Maintenant' ? 'En direct' : `Prévisions ${selectedForecast.time}`}
              </span>
              <div className="flex items-start justify-center mb-2">
                  <span className="text-8xl font-black tracking-tighter ml-6">{selectedForecast.temp}</span>
                  <span className="text-4xl font-bold mt-2">°C</span>
              </div>
              <p className="text-2xl font-bold mb-8">{selectedForecast.condition}</p>
              
              <div className="grid grid-cols-3 gap-8 w-full border-t border-white/20 pt-6">
                  <div className="flex flex-col items-center gap-2">
                      <Wind size={20} className="opacity-80" />
                      <span className="font-bold">{selectedForecast.wind}</span>
                      <span className="text-xs opacity-70">Vent</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                      <Droplets size={20} className="opacity-80" />
                      <span className="font-bold">{selectedForecast.humidity}</span>
                      <span className="text-xs opacity-70">Humidité</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                      <Clock size={20} className="opacity-80" />
                      <span className="font-bold">{selectedForecast.pressure}</span>
                      <span className="text-xs opacity-70">hPa</span>
                  </div>
              </div>
          </div>
      </div>

      <div>
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 px-2">Cette semaine</h3>
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100">
              <div className="space-y-6">
                  {weekly.map((day, i) => (
                      <div key={i} className="flex items-center justify-between">
                          <span className="font-bold text-[#1A1A1A] w-24">{day.d}</span>
                          
                          <div className="flex flex-col items-center gap-1 w-12">
                              <day.i size={24} className={day.i === Sun ? 'text-orange-400' : 'text-blue-400'} />
                              {day.rain !== '0%' && <span className="text-[10px] font-bold text-blue-500">{day.rain}</span>}
                          </div>

                          <div className="flex items-center gap-4 flex-grow justify-end">
                              <span className="text-gray-400 font-medium w-8 text-right">{day.min}</span>
                              <div className="w-24 h-1.5 bg-gray-100 rounded-full relative overflow-hidden">
                                  <div 
                                      className="absolute h-full rounded-full bg-gradient-to-r from-blue-300 to-orange-300"
                                      style={{ left: '20%', right: '20%' }}
                                  ></div>
                              </div>
                              <span className="text-[#1A1A1A] font-bold w-8">{day.max}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

const MenuPage = ({ onBack }) => {
  const [mealTime, setMealTime] = useState('midi');

  const MenuSection = ({ title, icon: Icon, items, color }) => (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-4 animate-in slide-in-from-bottom-4 fade-in duration-500 cursor-default">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-xl ${color}`}>
          <Icon size={24} />
        </div>
        <h3 className="text-lg font-bold text-[#1A1A1A]">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start justify-between group">
            <div>
              <p className="font-bold text-[#1A1A1A]">{item.name}</p>
              {item.desc && <p className="text-sm text-gray-500">{item.desc}</p>}
            </div>
            {item.labels && (
              <div className="flex gap-1">
                {item.labels.map((label, lIdx) => (
                  <span key={lIdx} className="text-[10px] font-bold px-2 py-1 bg-gray-100 rounded-full text-gray-500 uppercase tracking-wide">
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">
              <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Restaurant</h2>
            <p className="text-sm text-gray-500 font-medium">Mercredi 26 novembre</p>
          </div>
        </div>
        <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-[#FF6B4A] cursor-pointer">
          <Info size={24} />
        </button>
      </div>

      <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 flex mb-8">
        <button 
          onClick={() => setMealTime('midi')}
          className={`flex-1 py-3 rounded-full font-bold text-sm transition-all cursor-pointer ${mealTime === 'midi' ? 'bg-[#FF6B4A] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Midi
        </button>
        <button 
          onClick={() => setMealTime('soir')}
          className={`flex-1 py-3 rounded-full font-bold text-sm transition-all cursor-pointer ${mealTime === 'soir' ? 'bg-[#FF6B4A] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Soir
        </button>
      </div>

      <div className="space-y-2 pb-10">
        {mealTime === 'midi' ? (
          <>
            <MenuSection title="Le Stand Grill" icon={Beef} color="bg-red-50 text-red-500" items={SHARED_DATA.menu.midi.grill} />
            <MenuSection title="Le Stand Chef" icon={ChefHat} color="bg-blue-50 text-blue-500" items={SHARED_DATA.menu.midi.chef} />
            <MenuSection title="Le Stand Pâtes" icon={Pizza} color="bg-yellow-50 text-yellow-600" items={SHARED_DATA.menu.midi.pasta} />
            <MenuSection title="Desserts" icon={IceCream} color="bg-pink-50 text-pink-500" items={SHARED_DATA.menu.midi.desserts} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <Utensils size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-700">Fermé ce soir</h3>
            <p className="text-gray-500 mt-2 max-w-xs">Le restaurant universitaire n'est pas ouvert pour le service du soir aujourd'hui.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const LaundryPage = ({ onBack }) => {
  const { washing, dryers } = SHARED_DATA.laundry;

  const MachineCard = ({ machine, type }) => {
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const isWashing = type === 'washing';
    const statusConfig = 
      machine.status === 'free' 
        ? { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', iconBg: 'bg-white', label: 'Disponible' }
        : machine.status === 'busy' 
        ? { color: 'text-orange-600', bg: 'bg-white', border: 'border-gray-200', iconBg: 'bg-orange-50', label: 'En cours' }
        : { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', iconBg: 'bg-white', label: 'Hors service' };

    return (
      <div className={`p-4 rounded-[1.5rem] border-2 shadow-sm flex flex-col items-center justify-between gap-3 relative transition-all h-full cursor-default ${statusConfig.bg} ${statusConfig.border}`}>
        <div className="w-full flex justify-between items-start">
            <span className="font-extrabold text-[#1A1A1A] text-lg">N°{machine.id}</span>
            <div className={`w-3 h-3 rounded-full ${machine.status === 'free' ? 'bg-green-500' : machine.status === 'busy' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
        </div>

        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${statusConfig.iconBg} ${machine.status === 'free' ? 'border-green-100' : 'border-gray-100'}`}>
            {isWashing ? <Shirt size={28} className={statusConfig.color} strokeWidth={1.5} /> : <Wind size={28} className={statusConfig.color} strokeWidth={1.5} />}
        </div>

        <div className="text-center w-full">
            {machine.status === 'busy' ? (
                <p className="text-xl font-mono font-bold text-orange-600 mt-1">{machine.time}</p>
            ) : (
                <p className={`text-sm font-bold uppercase tracking-wide mt-1 ${statusConfig.color}`}>{statusConfig.label}</p>
            )}
        </div>

        {machine.status === 'busy' && (
             <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setNotificationEnabled(!notificationEnabled);
                }}
                className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-sm border-2 cursor-pointer ${
                    notificationEnabled 
                    ? 'bg-[#FF6B4A] border-[#FF6B4A] text-white ring-2 ring-[#FF6B4A] ring-offset-1' 
                    : 'bg-white border-orange-100 text-[#FF6B4A] hover:bg-orange-50'
                }`}
             >
                <Bell size={14} className={notificationEnabled ? 'fill-current' : ''} />
                {notificationEnabled ? 'Alerte activée' : "M'avertir"}
             </button>
        )}
      </div>
    );
  };

  return (
    <div className="animate-in slide-in-from-right duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Laverie</h2>
      </div>

      <div className="space-y-10">
        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600"><Droplets size={20} /></div>
              Lave-linges
            </h3>
            <span className="text-sm font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                {washing.filter(m => m.status === 'free').length} dispos
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {washing.map(m => <MachineCard key={m.id} machine={m} type="washing" />)}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
              <div className="p-1.5 bg-orange-100 rounded-lg text-orange-600"><Wind size={20} /></div>
              Sèche-linges
            </h3>
            <span className="text-sm font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                {dryers.filter(m => m.status === 'free').length} dispos
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {dryers.map(m => <MachineCard key={m.id} machine={m} type="dryer" />)}
          </div>
        </div>
      </div>
      
      <div className="mt-10 bg-blue-50 p-5 rounded-[1.5rem] flex gap-4 text-blue-800 text-sm items-start border border-blue-100">
        <Info size={24} className="flex-shrink-0 mt-0.5" />
        <div>
            <p className="font-bold mb-1">Rappel</p>
            <p className="leading-relaxed opacity-90">Les machines sont réservées aux résidents. Pensez à récupérer votre linge dès la fin du cycle pour libérer la place.</p>
        </div>
      </div>
    </div>
  );
};

const ImportantNumbersPage = ({ onBack }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (number, idx) => {
    const el = document.createElement('textarea');
    el.value = number;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    setCopiedId(idx);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="animate-in slide-in-from-right duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Numéros importants</h2>
      </div>

      <div className="space-y-8">
        <div>
            <div className="space-y-3">
                {SHARED_DATA.numbers.map((contact, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all group">
                        <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-500">
                                <contact.icon size={24} />
                             </div>
                             <div>
                                 <h4 className="font-bold text-[#1A1A1A] text-lg">{contact.name}</h4>
                                 <p className="text-sm text-gray-500">{contact.description}</p>
                                 <button 
                                    onClick={() => handleCopy(contact.number, idx)}
                                    className="text-sm font-bold text-[#FF6B4A] mt-0.5 text-left hover:underline flex items-center gap-1 transition-all cursor-pointer"
                                 >
                                    {copiedId === idx ? (
                                        <span className="text-green-500 flex items-center gap-1"><CheckCircle size={14} /> Copié !</span>
                                    ) : (
                                        contact.number
                                    )}
                                 </button>
                             </div>
                        </div>
                        <a href={`tel:${contact.number.replace(/\s/g, '')}`} className="p-3 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors cursor-pointer">
                            <PhoneCall size={20} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const UsefulLinksPage = ({ onBack }) => {
  return (
    <div className="animate-in slide-in-from-right duration-500">
       <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Liens utiles</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SHARED_DATA.links.map((link, idx) => (
            <a 
                key={idx} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md hover:scale-[1.02] transition-all group cursor-pointer"
            >
                <div className="flex items-center gap-1.5"> {/* Condensed gap */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${link.color.replace('text-', 'bg-').replace('bg-', 'text-').replace('100', '600').replace('600', '50')}`}>
                        {link.name[0]}
                    </div>
                    <span className="font-bold text-lg text-[#1A1A1A] truncate">{link.name}</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-full text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600 transition-colors">
                    <ExternalLink size={20} />
                </div>
            </a>
        ))}
      </div>
    </div>
  );
};

const BeersPage = ({ onBack }) => {
  const getTypeStyle = (type) => {
    switch(type) {
        case 'Blonde': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'Ambrée': return 'bg-orange-100 text-orange-700 border-orange-200';
        case 'Brune': return 'bg-[#3E2723] text-[#D7CCC8] border-[#5D4037]';
        case 'Noire': return 'bg-gray-800 text-gray-100 border-gray-600';
        case 'Rouge': return 'bg-red-100 text-red-700 border-red-200';
        default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
     <div className="animate-in slide-in-from-right duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Bières du Traq</h2>
      </div>
      
      <div className="space-y-4">
        {SHARED_DATA.beers.map((beer, index) => (
             <div key={index} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {beer.icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-[#1A1A1A] text-lg">{beer.name}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border ${getTypeStyle(beer.type)}`}>
                            {beer.type}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-lg font-extrabold text-[#FF6B4A]">{beer.price}</span>
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase tracking-wide">{beer.degree}</span>
                </div>
             </div>
        ))}
      </div>

      <div className="mt-8 p-5 rounded-[2rem] bg-yellow-50 border border-yellow-100 flex gap-3 text-yellow-800 text-sm">
         <Info size={20} className="flex-shrink-0" />
         <p>L'abus d'alcool est dangereux pour la santé, à consommer avec modération.</p>
      </div>
    </div>
  );
};

const ClubsPage = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [subscribedClubs, setSubscribedClubs] = useState(new Set());

  const toggleSubscription = (clubName) => {
    const newSubscriptions = new Set(subscribedClubs);
    if (newSubscriptions.has(clubName)) {
      newSubscriptions.delete(clubName);
    } else {
      newSubscriptions.add(clubName);
    }
    setSubscribedClubs(newSubscriptions);
  };

  const categories = ['Tous', 'Vie étudiante', 'Sport', 'Art', 'Tech', 'Pro'];
  const filteredClubs = selectedCategory === 'Tous' 
    ? SHARED_DATA.clubs 
    : SHARED_DATA.clubs.filter(c => c.category === selectedCategory);

  return (
    <div className="animate-in slide-in-from-right duration-500">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Clubs & Assos</h2>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2">
          {categories.map((cat) => (
              <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat 
                      ? 'bg-[#FF6B4A] text-white shadow-md' 
                      : 'bg-white text-gray-500 border border-gray-100'
                  }`}
              >
                  {cat}
              </button>
          ))}
      </div>

      <div className="space-y-4 pb-8">
          {filteredClubs.map((club, idx) => (
              <div key={idx} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex gap-4 group hover:shadow-md transition-all cursor-pointer">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${club.color}`}>
                       {club.icon ? <club.icon size={32} /> : <Activity size={32} />}
                  </div>
                  
                  <div className="flex-grow py-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-lg text-[#1A1A1A]">{club.name}</h3>
                          <span className="text-[10px] font-bold bg-gray-50 px-2 py-1 rounded-full text-gray-500 uppercase tracking-wide border border-gray-100">
                              {club.category}
                          </span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
                          {club.description}
                      </p>

                      <div className="mt-auto flex justify-end">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSubscription(club.name);
                            }}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                                subscribedClubs.has(club.name)
                                ? 'bg-[#FF6B4A] border-[#FF6B4A] text-white shadow-sm'
                                : 'bg-white border-gray-200 text-gray-500 hover:border-[#FF6B4A] hover:text-[#FF6B4A]'
                            }`}
                        >
                            {subscribedClubs.has(club.name) ? (
                                <>
                                    <CheckCircle size={14} className="fill-current" /> Abonné
                                </>
                            ) : (
                                <>
                                    <Plus size={14} /> S'abonner
                                </>
                            )}
                        </button>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

const EventsPage = ({ onBack }) => {
  const [interestedEvents, setInterestedEvents] = useState(new Set([1])); 

  const toggleInterest = (eventId) => {
    const newInterested = new Set(interestedEvents);
    if (newInterested.has(eventId)) {
      newInterested.delete(eventId);
    } else {
      newInterested.add(eventId);
    }
    setInterestedEvents(newInterested);
  };

  return (
    <div className="animate-in slide-in-from-right duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">
            <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-extrabold text-[#1A1A1A]">Événements</h2>
      </div>

      <div className="space-y-4">
        {SHARED_DATA.events.map((event) => (
          <div key={event.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex gap-5 group cursor-pointer hover:shadow-md transition-all">
            <div className={`flex flex-col items-center justify-center min-w-[4rem] rounded-2xl ${event.color} bg-opacity-20 self-start h-20`}>
              <span className={`text-xs font-bold uppercase tracking-wider opacity-80 ${event.color.split(' ')[1]}`}>{event.date.split(' ')[0]}</span>
              <span className={`text-xl font-extrabold ${event.color.split(' ')[1]}`}>{event.date.split(' ')[1]}</span>
            </div>

            <div className="flex-grow py-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#FF6B4A] transition-colors">{event.title}</h3>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide bg-gray-50 text-gray-500`}>
                  {event.category}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-3">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} /> {event.time}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} /> {event.location}
                </div>
              </div>

              <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">
                {event.description}
              </p>

              <div className="mt-auto flex justify-end">
                  <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleInterest(event.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                      interestedEvents.has(event.id)
                        ? 'bg-[#FF6B4A] border-[#FF6B4A] text-white shadow-sm'
                        : 'bg-white border-gray-200 text-gray-500 hover:border-[#FF6B4A] hover:text-[#FF6B4A]'
                    }`}
                  >
                    <Star size={14} className={interestedEvents.has(event.id) ? 'fill-current' : ''} />
                    {interestedEvents.has(event.id) ? 'Intéressé(e)' : "Ça m'intéresse"}
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlanningPage = ({ onBack }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);

  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];

  const formationPresence = [
    { name: 'A1', color: 'bg-blue-400', label: 'A1 Gén.', days: [3, 4, 5, 6, 7, 10, 11, 13, 14, 24, 25, 26, 27, 28] }, 
    { name: 'A2', color: 'bg-orange-400', label: 'A2 Gén.', days: [3, 4, 5, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28] },
    { name: 'A3', color: 'bg-green-400', label: 'A3 Info', days: [6, 7, 13, 14, 20, 21, 27, 28] },
  ];

  const getCoursesForDate = (day) => {
    if (!day) return [];
    
    const dateKey = `2025-11-${String(day).padStart(2, '0')}`;
    if (SHARED_DATA.planning.courses[dateKey]) {
        return SHARED_DATA.planning.courses[dateKey];
    }

    const date = new Date(2025, 10, day);
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) return [];

    if (dayOfWeek === 1) {
        return [
            { title: 'Anglais', type: 'TD', start: '08h30', room: 'B202', color: 'bg-blue-100 text-blue-700 border-blue-200' },
            { title: 'Physique', type: 'CM', start: '10h15', room: 'Amphi A', color: 'bg-purple-100 text-purple-700 border-purple-200' }
        ];
    }
    if (dayOfWeek === 2) {
        return [
            { title: 'Gestion', type: 'CM', start: '09h00', room: 'Amphi B', color: 'bg-red-100 text-red-700 border-red-200' },
            { title: 'Projet', type: 'TP', start: '14h00', room: 'Salle Info 2', color: 'bg-green-100 text-green-700 border-green-200' }
        ];
    }
    if (dayOfWeek === 3) {
        return [
             { title: 'Mathématiques', type: 'TD', start: '08h30', room: 'C103', color: 'bg-orange-100 text-orange-700 border-orange-200' }
        ];
    }
    if (dayOfWeek === 4) {
        return [
            { title: 'Sport', type: 'Sport', start: '14h00', room: 'Gymnase', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' }
        ];
    }
    if (dayOfWeek === 5) {
        return [
            { title: 'Algorithmie', type: 'CM', start: '10h15', room: 'Amphi C', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' }
        ];
    }

    return [];
  };

  const getDaysGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const weeks = [];
    let currentWeek = [null, null, null, null, null]; 
    
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const dayOfWeek = date.getDay();

        if (dayOfWeek === 0 || dayOfWeek === 6) continue;

        const dayIndex = dayOfWeek - 1; 

        currentWeek[dayIndex] = i;

        if (dayOfWeek === 5) {
            weeks.push(currentWeek);
            currentWeek = [null, null, null, null, null];
        }
    }
    if (currentWeek.some(d => d !== null)) {
        weeks.push(currentWeek);
    }

    return weeks;
  };

  const weeks = getDaysGrid();

  const handleDayClick = (day) => {
      const courses = getCoursesForDate(day);
      setSelectedDayInfo({ day, courses });
      setIsModalOpen(true);
  };

  return (
    <div className="animate-in slide-in-from-right duration-500 h-full flex flex-col">
       <div className="flex flex-col gap-6 mb-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex flex-col">
                    <h2 className="text-2xl font-extrabold text-[#1A1A1A] leading-none">Planning</h2>
                    <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm font-medium">
                        <span className="uppercase tracking-wide">Novembre 2025</span>
                    </div>
                </div>
            </div>
            
             {/* Navigation Mois à droite */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                 <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors text-gray-500"><ChevronLeft size={18} /></button>
                 <span className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wide px-2">Nov. 2025</span>
                 <button className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors text-gray-500"><ChevronRight size={18} /></button>
            </div>
        </div>
      </div>

      <div className="flex gap-4 px-2 mb-2 overflow-x-auto scrollbar-hide pb-2">
          {formationPresence.map((f, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                  <div className={`w-4 h-4 rounded-full ${f.color}`}></div>
                  <span className="text-sm font-bold text-gray-500">{f.label}</span>
              </div>
          ))}
      </div>

      <div className="flex-grow bg-white rounded-[2rem] shadow-sm border border-gray-100 p-2 sm:p-6 overflow-hidden flex flex-col">
        <div className="grid grid-cols-5 mb-2 border-b border-gray-100 pb-2">
            {weekDays.map((d, i) => (
                <div key={i} className="text-center text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider truncate">
                    {d}
                </div>
            ))}
        </div>
        
        <div className="flex-grow overflow-auto">
            <div className="flex flex-col gap-[1px] bg-gray-100 border border-gray-100 rounded-xl overflow-hidden h-full min-h-[450px]">
                {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="grid grid-cols-5 gap-[1px] flex-grow">
                        {week.map((day, dIdx) => {
                            const isToday = day === 26;
                            const courses = day ? getCoursesForDate(day) : [];
                            
                            return (
                                <div 
                                    key={dIdx} 
                                    onClick={() => day && handleDayClick(day)}
                                    className={`relative flex flex-col justify-between bg-white ${day ? 'cursor-pointer hover:bg-gray-50 transition-colors' : 'bg-gray-50/50'}`}
                                >
                                    {day && (
                                        <>
                                            <div className="flex justify-center pt-1.5">
                                                <span className={`text-sm sm:text-base font-bold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-[#FF6B4A] text-white' : 'text-gray-700'}`}>
                                                    {day}
                                                </span>
                                            </div>
                                            <div className="flex-grow flex flex-col gap-1 px-1 py-1 overflow-hidden">
                                                {courses.slice(0, 2).map((c, idx) => (
                                                    <div key={idx} className={`text-[9px] sm:text-[11px] leading-tight px-1.5 py-1 rounded truncate font-medium ${c.color.split(' ')[0]} ${c.color.split(' ')[1]}`}>
                                                        {c.start.replace('h', ':')} {c.title}
                                                    </div>
                                                ))}
                                                {courses.length > 2 && (
                                                    <div className="text-[8px] text-gray-400 text-center leading-none">
                                                        +{courses.length - 2}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-[2px] pb-1 w-full px-0.5 mt-auto">
                                                {formationPresence.map((formation, fIdx) => {
                                                    const isPresent = formation.days.includes(day);
                                                    return (
                                                        <div 
                                                            key={fIdx} 
                                                            className={`h-1.5 w-full rounded-full ${isPresent ? formation.color : 'bg-transparent'}`}
                                                        ></div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
      </div>

      {isModalOpen && selectedDayInfo && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative w-full max-w-md bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h3 className="text-2xl font-extrabold text-[#1A1A1A]">{selectedDayInfo.day} Novembre</h3>
                        <p className="text-sm text-gray-500 font-medium">Détails des cours</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto bg-gray-50/50">
                    <div className="space-y-4">
                        {selectedDayInfo.courses.length > 0 ? (
                            selectedDayInfo.courses.map((course, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100 flex gap-4 items-stretch relative overflow-hidden">
                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${course.color.split(' ')[0].replace('100', '400')}`}></div>
                                    <div className="flex flex-col justify-center items-center w-14 border-r border-gray-100 pr-4">
                                        <span className="text-lg font-bold text-[#1A1A1A]">{course.start}</span>
                                    </div>
                                    <div className="flex-grow pl-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="font-bold text-lg text-[#1A1A1A]">{course.title}</h4>
                                            <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-500">{course.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <MapPin size={14} /> {course.room}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                <Coffee size={48} className="mb-4 opacity-30 text-[#FF6B4A]" />
                                <p className="font-bold text-lg text-gray-500">Aucun cours</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('login'); 

  if (currentPage === 'login') return <LoginPage onNavigate={setCurrentPage} />;
  if (currentPage === 'register') return <RegisterPage onNavigate={setCurrentPage} />;

  return (
    <div className={`min-h-screen ${theme.bg} font-sans selection:bg-orange-100 pb-24 md:pb-0 flex flex-col`}>
      <div className="max-w-6xl mx-auto p-6 md:p-8 w-full flex-grow flex flex-col">
        <header className={`flex justify-between items-center mb-10 ${['menu', 'planning', 'laundry', 'events', 'beers', 'clubs', 'numbers', 'links'].includes(currentPage) ? 'hidden md:flex' : ''}`}>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
                <Logo />
            </div>

            <div 
                onClick={() => setCurrentPage('account')}
                className="flex items-center gap-3 cursor-pointer group"
            >
                <span className="hidden md:block font-bold text-gray-700 group-hover:text-[#FF6B4A] transition-colors">Mon profil</span>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                    <User size={20} className="text-gray-600" />
                </div>
            </div>
        </header>

        <div className="flex-grow flex flex-col">
            {currentPage === 'weather' && <WeatherPage onBack={() => setCurrentPage('home')} />}
            {currentPage === 'menu' && <MenuPage onBack={() => setCurrentPage('home')} />}
            {currentPage === 'planning' && <PlanningPage onBack={() => setCurrentPage('home')} />}
            {currentPage === 'laundry' && <LaundryPage onBack={() => setCurrentPage('home')} />}
            {currentPage === 'events' && <EventsPage onBack={() => setCurrentPage('home')} />}
            {currentPage === 'beers' && <BeersPage onBack={() => setCurrentPage('home')} />}
            {currentPage === 'clubs' && <ClubsPage onBack={() => setCurrentPage('home')} />}
            {currentPage === 'numbers' && <ImportantNumbersPage onBack={() => setCurrentPage('home')} />}
            {currentPage === 'links' && <UsefulLinksPage onBack={() => setCurrentPage('home')} />}

            {currentPage === 'home' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A]">
                            Bonjour <span className={theme.orange}>Matéo</span>
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium">Voici ce qui se passe sur le campus aujourd'hui.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        <div 
                            onClick={() => setCurrentPage('weather')}
                            className={`${theme.cardBg} rounded-[1.5rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-52 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer`}
                        >
                            <div>
                                <p className="font-semibold text-gray-800 text-lg">Météo</p>
                                <div className="mt-2">
                                    <span className="text-5xl font-extrabold text-[#1A1A1A]">{SHARED_DATA.weather.current.temp}°C</span>
                                    <p className="text-xl font-medium text-gray-500 mt-1">{SHARED_DATA.weather.current.condition}</p>
                                </div>
                            </div>
                            <div className={`absolute right-6 top-1/2 transform -translate-y-1/2 w-20 h-20 ${theme.orangeBg} rounded-full shadow-lg flex items-center justify-center`}>
                                <Sun className="text-white" size={40} />
                            </div>
                        </div>

                        <div 
                            onClick={() => setCurrentPage('menu')}
                            className={`${theme.cardBg} rounded-[1.5rem] p-6 shadow-sm border border-gray-100 flex flex-col h-52 hover:shadow-md transition-all cursor-pointer group`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-bold text-[#1A1A1A]">Menu du jour</h2>
                                <ArrowRight size={20} className="text-gray-300 group-hover:text-[#FF6B4A] transition-colors" />
                            </div>
                            <div className="flex-grow flex flex-col justify-center gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-50 rounded-lg text-red-500"><Beef size={20} /></div>
                                    <span className="font-bold text-gray-800">Grillades</span>
                                </div>
                                <div className="pl-11 text-sm text-gray-500 space-y-1">
                                    {SHARED_DATA.menu.midi.grill.slice(0, 2).map((item, idx) => (
                                        <p key={idx}>• {item.name}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div 
                            onClick={() => setCurrentPage('planning')}
                            className={`${theme.cardBg} rounded-[1.5rem] p-6 shadow-sm border border-gray-100 flex flex-col h-52 hover:shadow-md transition-all cursor-pointer group`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-bold text-[#1A1A1A]">Planning</h2>
                                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full group-hover:bg-green-200 transition-colors">En cours</span>
                            </div>
                            <div className="flex-grow flex flex-col justify-center">
                                <div className="flex gap-4 items-center mb-4">
                                    <div className="text-center w-12">
                                        <span className="block text-sm text-gray-400">DEB</span>
                                        <span className="block font-bold text-lg">{SHARED_DATA.planning.courses[SHARED_DATA.planning.today][0].start}</span>
                                    </div>
                                    <div className="w-1 h-10 bg-gray-200 rounded-full"></div>
                                    <div>
                                        <h3 className="font-bold text-lg">{SHARED_DATA.planning.courses[SHARED_DATA.planning.today][0].title}</h3>
                                        <p className="text-gray-500 text-sm">{SHARED_DATA.planning.courses[SHARED_DATA.planning.today][0].room} • {SHARED_DATA.planning.courses[SHARED_DATA.planning.today][0].prof}</p>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400 text-center">Prochain: {SHARED_DATA.planning.courses[SHARED_DATA.planning.today][1].title} à {SHARED_DATA.planning.courses[SHARED_DATA.planning.today][1].start}</div>
                            </div>
                        </div>

                        <div 
                            onClick={() => setCurrentPage('laundry')}
                            className={`${theme.cardBg} rounded-[1.5rem] p-6 shadow-sm border border-gray-100 h-52 flex flex-col hover:shadow-md transition-all cursor-pointer group`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-bold text-[#1A1A1A]">Laverie</h2>
                                <Clock size={20} className="text-gray-300 group-hover:text-[#FF6B4A] transition-colors" />
                            </div>
                            <div className="flex flex-1 items-center justify-around">
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-12 h-12 border-2 border-[#FF6B4A] rounded-xl flex items-center justify-center relative`}>
                                        <div className="absolute top-[-5px] right-[-5px] w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                        <Shirt size={20} className={theme.orange} />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-lg font-bold text-[#1A1A1A] block">
                                            {SHARED_DATA.laundry.washing.filter(m => m.status === 'free').length}/{SHARED_DATA.laundry.washing.length}
                                        </span>
                                        <span className="text-[10px] uppercase font-bold text-gray-400">Machines disponibles</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-12 h-12 border-2 border-gray-200 rounded-xl flex items-center justify-center`}>
                                        <Wind size={20} className="text-gray-400" />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-lg font-bold text-[#1A1A1A] block">
                                            {SHARED_DATA.laundry.dryers.filter(m => m.status === 'free').length}/{SHARED_DATA.laundry.dryers.length}
                                        </span>
                                        <span className="text-[10px] uppercase font-bold text-gray-400">Sèche-linges disponibles</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div 
                            onClick={() => setCurrentPage('events')}
                            className={`${theme.cardBg} rounded-[1.5rem] p-6 shadow-sm border border-gray-100 h-52 flex flex-col hover:shadow-md transition-all cursor-pointer group`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-bold text-[#1A1A1A]">Événements</h2>
                                <Calendar size={24} className="text-[#FF6B4A]" />
                            </div>
                            <div className="flex-grow flex flex-col justify-center gap-3">
                                {SHARED_DATA.events.slice(0, 2).map((event, idx) => (
                                    <div key={idx} className={`flex items-center gap-3 ${idx === 0 ? 'border-b border-gray-100 pb-2' : ''}`}>
                                        <div className={`w-10 h-10 ${event.color.replace('100', '50')} rounded-lg flex flex-col items-center justify-center font-bold text-xs`}>
                                            <span>{event.date.split(' ')[1]}</span><span>{event.date.split(' ')[2].toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-[#1A1A1A]">{event.title}</p>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <event.icon size={10} /> {event.time.split(' - ')[0]}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div 
                            onClick={() => setCurrentPage('beers')}
                            className={`${theme.cardBg} rounded-[1.5rem] p-6 shadow-sm border border-gray-100 h-52 flex flex-col hover:shadow-md transition-all relative overflow-hidden cursor-pointer group`}
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-bl-[4rem] -mr-4 -mt-4 z-0"></div>
                            <div className="relative z-10 flex justify-between items-start mb-2">
                                <h2 className="text-xl font-bold text-[#1A1A1A] max-w-[70%]">Bières du Traq</h2>
                                <Beer size={24} className="text-yellow-500" />
                            </div>
                            <div className="relative z-10 flex-grow flex flex-col justify-end">
                                <div className="space-y-2">
                                    {SHARED_DATA.beers.slice(0, 3).map((beer, idx) => (
                                        <div key={idx} className={`flex items-center justify-between ${idx < 2 ? 'border-b border-dashed border-gray-200 pb-1' : ''}`}>
                                            <span className="text-sm font-medium text-gray-700">{beer.name}</span>
                                            <span className="text-xs font-bold text-[#FF6B4A]">{beer.degree}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div 
                            onClick={() => setCurrentPage('clubs')}
                            className={`${theme.cardBg} rounded-[1.5rem] p-6 shadow-sm border border-gray-100 h-52 flex flex-col hover:shadow-md transition-all cursor-pointer group`}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-[#1A1A1A]">Clubs</h2>
                                <Users size={24} className="text-blue-500" />
                            </div>
                            <div className="flex-grow flex flex-col justify-center gap-4">
                                <div className="flex justify-between px-2">
                                    {SHARED_DATA.clubs.slice(0, 3).map((club, i) => (
                                        <div key={i} className="flex flex-col items-center gap-1">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden">
                                                {club.icon ? <club.icon size={20} className="text-gray-600" /> : club.name.slice(0, 3)}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-12 h-12 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center text-xs font-bold text-gray-400">
                                            +{SHARED_DATA.clubs.length - 3}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <span className="text-sm text-[#FF6B4A] font-bold cursor-pointer hover:underline">Voir toutes les assos</span>
                                </div>
                            </div>
                        </div>

                        <div 
                            onClick={() => setCurrentPage('numbers')}
                            className={`${theme.cardBg} rounded-[1.5rem] p-6 shadow-sm border border-gray-100 h-52 flex flex-col hover:shadow-md transition-all cursor-pointer group`}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-[#1A1A1A] leading-tight">Numéros<br/>importants</h2>
                                <Phone size={24} className="text-green-500" />
                            </div>
                            <div className="space-y-3">
                                {SHARED_DATA.numbers.slice(0, 2).map((num, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 ${idx === 0 ? 'bg-blue-500' : 'bg-green-500'} rounded-full`}></div>
                                            <span className="font-bold text-sm truncate max-w-[100px]">{num.name}</span>
                                        </div>
                                        <span className="font-mono text-sm font-bold text-gray-600">{num.number}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div 
                            onClick={() => setCurrentPage('links')}
                            className={`${theme.cardBg} rounded-[1.5rem] p-6 shadow-sm border border-gray-100 h-52 flex flex-col hover:shadow-md transition-all cursor-pointer group`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-bold text-[#1A1A1A]">Liens utiles</h2>
                                <Link size={24} className="text-[#FF6B4A]" />
                            </div>
                            <div className="flex-grow flex flex-col justify-center gap-2">
                                {SHARED_DATA.links.slice(0, 3).map((link, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${link.color.replace('text-', 'bg-').replace('bg-', 'text-').replace('100', '600').replace('600', '50')}`}>
                                            {link.name[0]}
                                        </div>
                                        <span className="font-bold text-lg text-[#1A1A1A] truncate">{link.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {currentPage === 'account' && (
                <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-300">
                    <button onClick={() => setCurrentPage('home')} className="self-start mb-6 flex items-center gap-2 text-gray-500 hover:text-[#FF6B4A] cursor-pointer">
                         <ChevronLeft size={20} /> Retour
                    </button>
                    <div className="w-24 h-24 bg-[#FFF2EF] rounded-full flex items-center justify-center mb-6 text-[#FF6B4A]">
                        <User size={64} />
                    </div>
                    <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">Matéo</h2>
                    <p className="text-gray-500">mateo.etudiant@transat.dev</p>
                    <button onClick={() => setCurrentPage('login')} className="mt-8 px-6 py-3 border border-gray-200 text-red-500 rounded-full font-bold hover:bg-red-50 transition-all cursor-pointer">
                        Déconnexion
                    </button>
                </div>
            )}
        </div>

        <Footer />
      </div>
      
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 pb-4 px-6 flex justify-between items-end z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         <button onClick={() => setCurrentPage('home')} className={`flex flex-col items-center gap-1 min-w-[64px] cursor-pointer ${['home', 'weather', 'menu', 'planning', 'laundry', 'events', 'beers', 'clubs', 'numbers', 'links'].includes(currentPage) ? theme.orange : 'text-gray-400'}`}>
            <Home size={24} strokeWidth={currentPage === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-medium mt-1">Accueil</span>
         </button>
         <button onClick={() => setCurrentPage('home')} className={`flex flex-col items-center gap-1 min-w-[64px] text-gray-400 hover:${theme.orange} cursor-pointer`}>
            <LayoutGrid size={24} strokeWidth={2} />
            <span className="text-[10px] font-medium mt-1">Services</span>
         </button>
         <button onClick={() => setCurrentPage('account')} className={`flex flex-col items-center gap-1 min-w-[64px] cursor-pointer ${currentPage === 'account' ? theme.orange : 'text-gray-400'}`}>
            <UserCircle size={24} strokeWidth={currentPage === 'account' ? 2.5 : 2} />
            <span className="text-[10px] font-medium mt-1">Compte</span>
         </button>
      </div>

    </div>
  );
}

export default App;