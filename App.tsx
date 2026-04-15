import React, { useState, useMemo } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Calculator, 
  Wrench, 
  ShieldCheck, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook,
  ArrowRight,
  Info,
  CheckCircle2,
  Star,
  Clock,
  Award,
  HelpCircle,
  Calendar,
  Map,
  Check,
  Layers,
  Mail,
  Send
} from 'lucide-react';

// --- TIPOS ---
type Section = 'home' | 'catalog' | 'guarantees' | 'quote' | 'contact' | 'landings' | 'support';
type Category = 'ventaneria' | 'puertas' | 'baño' | 'perfiles';

interface Product {
  id: number;
  name: string;
  category: Category;
  subCategory: string;
  image: string;
  description: string;
}

// --- CONSTANTES ---
const PRODUCTS: Product[] = [
  { id: 1, name: "Ventana Corrediza Serie 70", category: "ventaneria", subCategory: "Corredizas", image: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80&w=400", description: "Sistema de alta eficiencia térmica y acústica." },
  { id: 2, name: "Ventana Abatible Europea", category: "ventaneria", subCategory: "Línea Europea", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400", description: "Aislamiento superior y diseño elegante." },
  { id: 3, name: "Puerta Principal Pivoting", category: "puertas", subCategory: "Principales", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=400", description: "Diseño minimalista con perfiles ocultos." },
  { id: 4, name: "Fachada de Vidrio (Spider)", category: "puertas", subCategory: "Fachadas", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400", description: "Solución para locales comerciales y edificios." },
  { id: 5, name: "División de Baño Templada", category: "baño", subCategory: "Divisiones", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400", description: "Vidrio de 10mm con accesorios en acero inox." },
  { id: 6, name: "Perfil Aluminio 2x1", category: "perfiles", subCategory: "Distribución", image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&q=80&w=400", description: "Material base para constructores y talleres." },
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogFilter, setCatalogFilter] = useState<Category | 'all'>('all');

  // --- LÓGICA COTIZADOR (VERSIÓN 2.0) ---
  const [settings, setSettings] = useState({
    whatsapp: '573000000000',
    priceEstandar: 150000,
    pricePremium: 250000,
    primaryColor: '#2563eb',
    textSize: 'medium'
  });

  const buttonStyle = {
    backgroundColor: settings.primaryColor,
    color: '#fff'
  };

  const [quoteData, setQuoteData] = useState({ width: 1, height: 1, material: 'estandar', type: 'ventana' });
  
  const estimatedPrice = useMemo(() => {
    const area = quoteData.width * quoteData.height;
    const base = quoteData.material === 'premium' ? settings.pricePremium : settings.priceEstandar;
    return (area * base).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
  }, [quoteData, settings]);

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'catalog', label: 'Catálogo' },
    { id: 'quote', label: 'Cotizar' },
    { id: 'contact', label: 'Contacto' },
  ];

  const filteredProducts = catalogFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === catalogFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">AF</div>
            <div>
              <h1 className="text-lg font-black tracking-tighter leading-none">METAL ALUMINIO</h1>
              <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">Farco</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeSection === item.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {item.label}
              </button>
            ))}
            <button className="ml-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2 font-bold text-sm">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-2 animate-in slide-in-from-top duration-300">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id as Section); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:bg-slate-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW: HOME */}
        {activeSection === 'home' && (
          <div className="space-y-20 animate-in fade-in duration-700 pb-10">
            {/* Hero Section */}
            <section className="relative rounded-[2.5rem] overflow-hidden bg-[#0B1120] min-h-[600px] flex items-center shadow-2xl border border-slate-800">
              {/* Background Image & Overlays */}
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity"
                alt="Aluminio Moderno"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/90 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent"></div>
              
              {/* Decorative Glows */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full translate-y-1/3"></div>

              <div className="relative z-10 p-8 lg:p-20 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-3xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-950/50 text-blue-300 border border-blue-500/30 text-xs font-black uppercase tracking-widest rounded-full mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Calidad Garantizada
                  </div>
                  
                  {/* Heading */}
                  <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tighter">
                    Diseño y precisión en <br className="hidden lg:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 drop-shadow-sm">
                      aluminio arquitectónico.
                    </span>
                  </h2>
                  
                  {/* Subtitle */}
                  <p className="text-slate-300 text-lg lg:text-xl mb-10 font-medium max-w-2xl leading-relaxed border-l-4 border-blue-500 pl-6">
                    Fabricamos e instalamos ventanas, puertas y fachadas con los más altos estándares europeos. Transforma tus espacios hoy.
                  </p>
                  
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-5">
                    <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black rounded-2xl hover:from-green-400 hover:to-emerald-500 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-1 text-lg">
                      <MessageCircle className="w-6 h-6" /> Cotizar por WhatsApp
                    </button>
                    <button onClick={() => setActiveSection('catalog')} className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-black rounded-2xl hover:bg-white text-lg hover:text-slate-900 transition-all flex items-center justify-center gap-2 group">
                      Ver Catálogo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Floating Stats Card (Right Side) */}
                <div className="hidden lg:flex flex-col gap-6 animate-in slide-in-from-right-8 duration-1000">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl flex items-center gap-6 transform hover:scale-105 transition-transform cursor-default">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white shadow-inner">
                      <Award className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white">+15 Años</div>
                      <div className="text-blue-200 text-sm font-bold uppercase tracking-widest">De Experiencia</div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl flex items-center gap-6 transform hover:scale-105 transition-transform cursor-default translate-x-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-400 rounded-2xl flex items-center justify-center text-white shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white">100%</div>
                      <div className="text-emerald-200 text-sm font-bold uppercase tracking-widest">Clientes Satisfechos</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Productos Top */}
            <section className="space-y-10">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Nuestras Especialidades</h3>
                <p className="text-slate-500 text-lg">Soluciones integrales para cada necesidad de tu proyecto.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "Ventanería Termo-acústica", icon: <Layers className="w-8 h-8" />, desc: "Aislamiento perfecto para tu hogar.", img: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80&w=400" },
                  { title: "Puertas y Fachadas", icon: <MapPin className="w-8 h-8" />, desc: "Diseños modernos y seguros.", img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=400" },
                  { title: "Mantenimiento Especializado", icon: <Wrench className="w-8 h-8" />, desc: "Alargamos la vida de tus instalaciones.", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400" }
                ].map((item, i) => (
                  <div key={i} className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-white border border-slate-100">
                    <div className="h-48 overflow-hidden relative">
                       <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    </div>
                    <div className="p-8 relative bg-white -mt-6 rounded-t-[2.5rem] transition-transform duration-500">
                      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                        {item.icon}
                      </div>
                      <h4 className="text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-500 mb-6">{item.desc}</p>
                      <span className="text-blue-600 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                        Saber más <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tabla de Precios (Versión 2.0) */}
            <section className="bg-slate-900 rounded-[3rem] p-8 lg:p-16 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/20 blur-[100px] rounded-full"></div>
              
              <div className="relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h3 className="text-3xl lg:text-4xl font-black mb-4">Precios Transparentes (v2.0)</h3>
                  <p className="text-slate-400 text-lg">Cotiza tu proyecto con valores configurables desde el administrador de WordPress.</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: "Línea Estándar", price: settings.priceEstandar.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }), desc: "Ideal para proyectos residenciales básicos.", features: ["Perfilería nacional", "Vidrio crudo 4mm", "Accesorios estándar"] },
                    { name: "Línea Premium", price: settings.pricePremium.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }), desc: "Mayor durabilidad y mejor estética.", features: ["Perfilería pesada", "Vidrio templado 6mm", "Accesorios en acero inox"], highlight: true },
                    { name: "Línea Europea", price: "$450.000", desc: "Máximo aislamiento termo-acústico.", features: ["Perfilería europea", "Vidrio cámara (DVH)", "Cierres multipunto"] }
                  ].map((tier, i) => (
                    <div key={i} className={`rounded-[2rem] p-8 border ${tier.highlight ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-900/50 transform md:-translate-y-4' : 'bg-slate-800/50 border-slate-700 backdrop-blur-sm'}`}>
                      {tier.highlight && <span className="bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Más Vendido</span>}
                      <h4 className="text-xl font-black mb-2">{tier.name}</h4>
                      <p className={`text-sm mb-6 ${tier.highlight ? 'text-blue-100' : 'text-slate-400'}`}>{tier.desc}</p>
                      <div className="mb-8">
                        <span className="text-4xl font-black">{tier.price}</span>
                        <span className={`text-sm ${tier.highlight ? 'text-blue-200' : 'text-slate-500'}`}> / m²</span>
                      </div>
                      <ul className="space-y-4 mb-8">
                        {tier.features.map((feat, j) => (
                          <li key={j} className="flex items-center gap-3 text-sm font-medium">
                            <CheckCircle2 className={`w-5 h-5 ${tier.highlight ? 'text-white' : 'text-blue-400'}`} />
                            <span className={tier.highlight ? 'text-white' : 'text-slate-300'}>{feat}</span>
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => setActiveSection('quote')} className={`w-full py-4 rounded-xl font-black transition-all ${tier.highlight ? 'bg-white text-blue-600 hover:bg-slate-50' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>
                        Cotizar Esta Línea
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Prueba Social */}
            <section className="space-y-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Proyectos Entregados</h3>
                  <p className="text-slate-500 text-lg">La calidad de nuestro trabajo habla por sí misma.</p>
                </div>
                <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                  <Award className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-black text-slate-900">Garantía de 5 Años</div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">En instalación</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400",
                  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400",
                  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400",
                  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400"
                ].map((img, i) => (
                  <div key={i} className="rounded-3xl overflow-hidden h-48 md:h-64 shadow-sm hover:shadow-xl transition-all">
                    <img src={img} alt="Proyecto" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW: CATALOG */}
        {activeSection === 'catalog' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Catálogo de Productos</h2>
                <p className="text-slate-500 text-lg">Explora nuestra gama de soluciones arquitectónicas en aluminio y vidrio.</p>
              </div>
              <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto no-scrollbar max-w-full">
                {['all', 'ventaneria', 'puertas', 'baño', 'perfiles'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCatalogFilter(cat as any)}
                    className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${catalogFilter === cat ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'}`}
                  >
                    {cat === 'all' ? 'Todos' : cat === 'baño' ? 'Baños' : cat}
                  </button>
                ))}
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                      {product.subCategory}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-black text-slate-900 mb-3">{product.name}</h3>
                    <p className="text-sm text-slate-500 mb-8 leading-relaxed flex-grow">{product.description}</p>
                    <button 
                      onClick={() => setActiveSection('quote')}
                      className="w-full py-4 bg-slate-50 text-blue-600 font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all border border-slate-100 hover:border-blue-600"
                    >
                       Cotizar Modelo <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: GUARANTEES */}
        {activeSection === 'guarantees' && (
          <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <header className="text-center mb-16">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">Nuestra Garantía</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">El diferenciador clave de Metal Aluminio Farco. Respaldamos nuestro trabajo porque confiamos en la calidad de nuestros materiales y mano de obra.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Instalación", time: "5 Años", desc: "Cubre filtraciones, desajustes y problemas derivados de la instalación." },
                { title: "Perfilería", time: "10 Años", desc: "Garantía contra decoloración, oxidación o deformación estructural." },
                { title: "Accesorios", time: "1 Año", desc: "Rodamientos, cerraduras, bisagras y manijas." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center hover:border-blue-300 transition-colors">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <div className="text-4xl font-black text-blue-600 mb-4">{item.time}</div>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-xl border border-slate-100 mt-12">
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-blue-600" /> Preguntas Frecuentes
              </h3>
              <div className="space-y-6">
                {[
                  { q: "¿Qué cubre exactamente la garantía?", a: "Cubre defectos de fabricación en los materiales (aluminio, vidrio, accesorios) y vicios ocultos en la instalación que afecten el funcionamiento normal o la hermeticidad." },
                  { q: "¿Cómo hacer efectiva una reclamación?", a: "Solo debes contactarnos vía WhatsApp enviando una foto o video del problema junto con tu número de factura. Programaremos una visita técnica en menos de 48 horas." },
                  { q: "¿Qué invalida la garantía?", a: "El mal uso, golpes fuertes, limpieza con productos abrasivos o químicos no recomendados, y modificaciones realizadas por terceros." }
                ].map((faq, i) => (
                  <div key={i} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h4>
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-8">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Información Legal: Todos nuestros trabajos se entregan con certificado de garantía por escrito y factura legal.</p>
            </div>
          </div>
        )}

        {/* VIEW: QUOTE (Mago de Oz) */}
        {activeSection === 'quote' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
              <div className="p-10 md:w-2/5 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-600/30">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-black mb-4 leading-tight text-white">Cotizador Rápido</h2>
                  <p className="text-white/80 mb-10 text-sm leading-relaxed">Completa los datos para obtener un estimado. Te enviaremos una respuesta detallada por WhatsApp en menos de 4 horas.</p>
                  
                  <div className="space-y-6 bg-white/5 p-6 rounded-3xl border border-white/10">
                    <div className="flex justify-between items-end border-b border-slate-700 pb-4">
                      <span className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Área Estimada</span>
                      <span className="text-2xl font-black text-white">{(quoteData.width * quoteData.height).toFixed(2)} m²</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-white/60 font-bold uppercase text-[10px] tracking-widest">Valor Referencial</span>
                      <span className="text-2xl font-black text-green-400">{estimatedPrice}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-3 text-xs text-white font-medium">
                    <Clock className="w-4 h-4 text-blue-400" /> Respuesta en &lt; 4 horas
                  </div>
                </div>
              </div>

              <div className="p-10 md:w-3/5 space-y-8 bg-slate-50">
                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500">¿Qué necesitas?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['ventana', 'puerta', 'baño', 'otro'].map((type) => (
                      <button 
                        key={type}
                        onClick={() => setQuoteData({...quoteData, type})}
                        className={`p-3 rounded-xl border-2 transition-all font-bold text-sm capitalize ${quoteData.type === type ? 'border-blue-600 bg-white text-blue-600 shadow-sm' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Línea / Calidad</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setQuoteData({...quoteData, material: 'estandar'})}
                      className={`p-3 rounded-xl border-2 transition-all font-bold text-sm ${quoteData.material === 'estandar' ? 'border-blue-600 bg-white text-blue-600 shadow-sm' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
                    >
                      Estándar
                    </button>
                    <button 
                      onClick={() => setQuoteData({...quoteData, material: 'premium'})}
                      className={`p-3 rounded-xl border-2 transition-all font-bold text-sm ${quoteData.material === 'premium' ? 'border-blue-600 bg-white text-blue-600 shadow-sm' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
                    >
                      Premium
                    </button>
                  </div>
                </div>

                <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Ancho Aprox. (m)</label>
                      <span className="font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md text-xs">{quoteData.width}m</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="10" step="0.1" 
                      value={quoteData.width} 
                      onChange={(e) => setQuoteData({...quoteData, width: parseFloat(e.target.value)})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Alto Aprox. (m)</label>
                      <span className="font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md text-xs">{quoteData.height}m</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="10" step="0.1" 
                      value={quoteData.height} 
                      onChange={(e) => setQuoteData({...quoteData, height: parseFloat(e.target.value)})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>

                <button 
                  className="w-full py-5 text-white font-black rounded-2xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 text-lg hover:!bg-[#21c45d]"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  Enviar a WhatsApp <MessageCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: CONTACT */}
        {activeSection === 'contact' && (
          <div className="animate-in fade-in duration-500 -mx-4 sm:-mx-6 lg:-mx-8 -mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
              <header className="text-center space-y-4">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Hablemos de tu Proyecto</h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">Estamos listos para asesorarte. Contáctanos por el medio que prefieras.</p>
              </header>

              <div className="grid lg:grid-cols-2 gap-16 items-start">
                {/* Columna Izquierda: Info Cards */}
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { icon: <MapPin className="w-6 h-6 text-blue-600" />, title: "Dirección", desc: "Calle Principal #12-34, Lorica, Córdoba, Colombia." },
                    { icon: <Clock className="w-6 h-6 text-blue-600" />, title: "Horario", desc: "Lunes a Viernes: 8:00 AM - 6:00 PM\nSábados: 8:00 AM - 12:00 PM" },
                    { icon: <Phone className="w-6 h-6 text-blue-600" />, title: "Teléfono", desc: "+57 300 000 0000" },
                    { icon: <Mail className="w-6 h-6 text-blue-600" />, title: "Correo electrónico", desc: "contacto@metalaluminiofarco.com" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-slate-900">{item.title}</h4>
                        <p className="text-slate-500 text-sm whitespace-pre-line">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Columna Derecha: Formulario */}
                <div className="space-y-8">
                  <div className="space-y-4 text-center lg:text-left">
                    <span className="text-slate-400 text-sm font-bold uppercase tracking-widest italic">Envíanos un mensaje</span>
                    <h3 className="text-3xl font-black text-slate-900">Cuéntanos tu idea</h3>
                    <p className="text-slate-500 leading-relaxed">
                      Estamos aquí para convertir tus proyectos en realidad. Completa el formulario y nuestro equipo comercial te contactará a la brevedad posible para brindarte una asesoría personalizada.
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Nombre <span className="text-red-500">*</span></label>
                        <input type="text" required className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Teléfono <span className="text-red-500">*</span></label>
                        <input type="tel" required className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Correo electrónico <span className="text-red-500">*</span></label>
                      <input type="email" required className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Mensaje</label>
                      <textarea className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all h-32 resize-none"></textarea>
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="privacy" className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                      <label htmlFor="privacy" className="text-sm text-slate-500 leading-snug">
                        He leído la <span className="text-blue-600 font-bold cursor-pointer hover:underline">política de privacidad</span> y acepto el tratamiento de mis datos para el trámite de la solicitud realizada.
                      </label>
                    </div>
                    <div className="flex justify-center lg:justify-start">
                      <button className="px-10 py-4 bg-blue-600 text-white font-black rounded-full shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                        Enviar <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Mapa Full Width */}
            <div className="w-full h-[500px] bg-slate-200 relative overflow-hidden mt-12">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.434237817088!2d-75.8115!3d9.2395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMTQnMjIuMiJOIDc1wrA0OCczMS40Ilc!5e0!3m2!1ses!2sco!4v1711480000000!5m2!1ses!2sco" 
                className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 transition-all duration-700"
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-8 left-8 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-xs hidden md:block">
                <h4 className="font-black text-slate-900 mb-2">Sede Principal</h4>
                <p className="text-slate-500 text-sm mb-4">Lorica, Córdoba. Atendemos en todo el departamento.</p>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                  <MapPin className="w-4 h-4" /> Ver en Google Maps
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: SUPPORT (Soporte Técnico) */}
        {activeSection === 'support' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-500">
            <header className="text-center">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Wrench className="w-10 h-10" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Soporte Técnico</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                ¿Necesitas mantenimiento o una visita técnica especializada? Completa el formulario y un experto se pondrá en contacto contigo.
              </p>
            </header>

            <div className="bg-white p-8 lg:p-12 rounded-[3rem] border border-slate-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full"></div>
              
              <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Nombre Completo</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-bold" placeholder="Ej. Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Teléfono / WhatsApp</label>
                    <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-bold" placeholder="+57 ..." />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Dirección del Proyecto</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-bold" placeholder="Ciudad, Barrio, Dirección exacta..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Tipo de Servicio</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Mantenimiento', 'Reparación', 'Ajuste', 'Otro'].map(type => (
                      <button key={type} type="button" className="py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all">
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Descripción del Problema</label>
                  <textarea className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all h-32 resize-none font-bold" placeholder="Cuéntanos qué sucede con tu instalación..."></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                  <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all text-lg flex items-center justify-center gap-3">
                    <Calendar className="w-6 h-6" /> Agendar Visita
                  </button>
                  <p className="text-xs text-slate-400 font-bold leading-relaxed max-w-xs">
                    Al enviar este formulario, aceptas que un técnico te contacte para coordinar la fecha y hora de la visita.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* VIEW: LANDINGS (SEO Local) */}
        {activeSection === 'landings' && (
          <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <header className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Presencia Local</h2>
              <p className="text-slate-500 text-lg">Páginas optimizadas para SEO local (Ejemplo de estructura para WordPress).</p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Landing Lorica */}
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl group cursor-pointer">
                <div className="h-48 bg-slate-900 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" alt="Ventanas Lorica" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl font-black text-white px-4 text-center">Ventanas en Lorica</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-slate-600 mb-6">Landing page diseñada para captar búsquedas como "fábrica de ventanas en lorica", "ventanas de aluminio lorica".</p>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center gap-2 text-sm font-bold text-slate-700"><Check className="w-4 h-4 text-green-500" /> Keyword principal en H1</li>
                    <li className="flex items-center gap-2 text-sm font-bold text-slate-700"><Check className="w-4 h-4 text-green-500" /> Testimonios locales</li>
                    <li className="flex items-center gap-2 text-sm font-bold text-slate-700"><Check className="w-4 h-4 text-green-500" /> Mapa embebido</li>
                  </ul>
                  <button className="w-full py-3 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                    Ver Maqueta /ventanas-lorica
                  </button>
                </div>
              </div>

              {/* Landing Sincelejo */}
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl group cursor-pointer">
                <div className="h-48 bg-slate-900 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" alt="Puertas Sincelejo" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl font-black text-white px-4 text-center">Puertas en Sincelejo</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-slate-600 mb-6">Landing page enfocada en "puertas de aluminio sincelejo", "puertas para baño sincelejo".</p>
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center gap-2 text-sm font-bold text-slate-700"><Check className="w-4 h-4 text-green-500" /> Galería de trabajos en la ciudad</li>
                    <li className="flex items-center gap-2 text-sm font-bold text-slate-700"><Check className="w-4 h-4 text-green-500" /> Oferta especial por zona</li>
                    <li className="flex items-center gap-2 text-sm font-bold text-slate-700"><Check className="w-4 h-4 text-green-500" /> CTA directo a WhatsApp</li>
                  </ul>
                  <button className="w-full py-3 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                    Ver Maqueta /puertas-sincelejo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-20 pt-16 pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg">AF</div>
                <h4 className="font-black text-slate-900 text-lg uppercase tracking-tighter leading-none">Metal Aluminio Farco</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Soluciones integrales en aluminio y vidrio para arquitectura moderna y residencial.
              </p>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Instagram className="w-5 h-5" /></button>
                <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Facebook className="w-5 h-5" /></button>
              </div>
            </div>

            <div>
              <h5 className="font-black uppercase tracking-widest text-xs text-slate-400 mb-6">Navegación</h5>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveSection('home')}>Inicio</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveSection('catalog')}>Catálogo</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveSection('quote')}>Cotizador Online</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveSection('contact')}>Contacto</li>
              </ul>
            </div>

            <div>
              <h5 className="font-black uppercase tracking-widest text-xs text-slate-400 mb-6">Soporte y Garantías</h5>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveSection('guarantees')}>Nuestras Garantías</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveSection('support')}>Soporte Técnico</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveSection('landings')}>Zonas de Cobertura</li>
              </ul>
            </div>

            <div>
              <h5 className="font-black uppercase tracking-widest text-xs text-slate-400 mb-6">Contacto</h5>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-600" /> +57 300 000 0000</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-600" /> Lorica, Córdoba</li>
                <li className="flex items-center gap-2 text-green-600"><MessageCircle className="w-4 h-4" /> WhatsApp Directo</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>© 2025 Metal Aluminio Farco - Versión 2.0</span>
            <span>Diseño Estratégico UX: Farco Hub</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button Flotante */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group">
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold pointer-events-none">
          ¡Cotiza por WhatsApp!
        </span>
      </button>

    </div>
  );
};

export default App;
