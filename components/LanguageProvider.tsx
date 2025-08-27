'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { useCookiePreferences } from '../hooks/useCookiePreferences';

type Language = 'pt' | 'nl' | 'en' | 'es';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Translation data
const translations = {
  pt: {
    'nav.home': 'Início',
    'nav.menu': 'Menu',
    'nav.gallery': 'Galeria',
    'nav.reservations': 'Reservas',
    'nav.events': 'Eventos',
    'nav.contact': 'Contacto',
    'nav.about': 'Sobre',
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Experiência Gastronómica Única',
    'hero.description': 'Descubra os sabores autênticos da cozinha portuguesa',
    'hero.reserve': 'Fazer Reserva',
    'hero.viewMenu': 'Ver Menu',
    'menu.title': 'O Nosso Menu',
    'menu.subtitle': 'Sabores Tradicionais com Toque Moderno',
    'menu.download': 'Descarregar Menu PDF',
    'gallery.title': 'Galeria',
    'gallery.subtitle': 'Momentos Especiais no Amor Meco',
    'events.title': 'Eventos Especiais',
    'events.subtitle': 'Celebre Conosco',
    'reservations.title': 'Reservas',
    'reservations.subtitle': 'Reserve a Sua Mesa',
    'about.title': 'Sobre Nós',
    'about.subtitle': 'A Nossa História',
    'contact.title': 'Contacto',
    'contact.subtitle': 'Entre em Contacto',
    'footer.opening': 'Horário de Funcionamento',
    'footer.address': 'Morada',
    'footer.phone': 'Telefone',
    'footer.email': 'Email',
    'footer.tagline':
      'Experimente os sabores autênticos de Portugal em cada prato. Onde a tradição encontra a inovação num ambiente acolhedor.',
    'footer.quickLinks': 'Links Rápidos',
    'footer.contactInfo': 'Informações de Contacto',
    'footer.openingHours': 'Horário de Funcionamento',
    'footer.monday': 'Segunda-feira',
    'footer.tuesday': 'Terça-feira',
    'footer.wednesday': 'Quarta-feira',
    'footer.thursday': 'Quinta-feira',
    'footer.friday': 'Sexta-feira',
    'footer.saturday': 'Sábado',
    'footer.sunday': 'Domingo',
    'footer.closed': 'Fechado',
    'footer.copyright':
      '© {year} Restaurante Amor Meco. Todos os direitos reservados.',
    'footer.privacy': 'Política de Privacidade & Cookies',
    'footer.terms': 'Termos de Serviço',
    'footer.cookies': 'Política de Cookies',
    // Privacy Policy
    'privacy.title': 'Política de Privacidade & Cookies',
    'privacy.subtitle': 'Como protegemos e utilizamos os seus dados pessoais',
    'privacy.lastUpdated': 'Última atualização',
    'privacy.whoWeAre': 'Quem Somos',
    'privacy.whoWeAreContent':
      'O Restaurante Amor Meco ("nós", "nosso", "nos") opera o website https://amormeco.pt. Respeitamos a sua privacidade e estamos comprometidos em proteger os seus dados pessoais.',
    'privacy.dataCollection': 'Dados Pessoais que Recolhemos',
    'privacy.dataCollectionIntro':
      'Quando utiliza o nosso website, podemos recolher:',
    'privacy.contactDetails':
      'Dados de contacto (nome, email, telefone) se fizer uma reserva ou preencher o nosso formulário de contacto.',
    'privacy.technicalData':
      'Dados técnicos (endereço IP, navegador, dispositivo, idioma) através de análises e registos de segurança.',
    'privacy.usageData':
      'Dados de utilização (páginas visitadas, tempo no site, cliques) para melhorar a experiência do utilizador.',
    'privacy.noDataSale': 'Não vendemos nem alugamos os seus dados.',
    'privacy.dataUsage': 'Como Utilizamos os Seus Dados',
    'privacy.dataUsageIntro': 'Processamos dados pessoais para:',
    'privacy.handleReservations': 'Gerir reservas e responder a consultas.',
    'privacy.sendConfirmations': 'Enviar confirmações de eventos ou reservas.',
    'privacy.improveSite': 'Melhorar o desempenho e conteúdo do site.',
    'privacy.legalCompliance': 'Cumprir obrigações legais.',
    'privacy.cookies': 'Cookies & Rastreamento',
    'privacy.cookiesIntro': 'O nosso website utiliza cookies para:',
    'privacy.essentialCookies':
      'Funções essenciais (navegação do site, reservas).',
    'privacy.analyticsCookies':
      'Análises (estatísticas de utilização anónimas).',
    'privacy.preferenceCookies':
      'Preferências (seleção de idioma, modo escuro/claro).',
    'privacy.cookieManagement':
      'Pode gerir cookies nas definições do seu navegador ou através do nosso banner de cookies.',
    'privacy.dataSharing': 'Partilha de Dados',
    'privacy.dataSharingIntro':
      'Podemos partilhar dados apenas com fornecedores de confiança, por exemplo:',
    'privacy.reservationSystem': 'Sistema de reservas (Guestplan)',
    'privacy.analyticsTools':
      'Ferramentas de análise (ex. Google Analytics, se ativado)',
    'privacy.hostingProviders': 'Fornecedores de alojamento',
    'privacy.gdprCompliance':
      'Todos os fornecedores cumprem o RGPD e processam dados em nosso nome.',
    'privacy.yourRights': 'Os Seus Direitos',
    'privacy.yourRightsIntro': 'Ao abrigo do RGPD, tem o direito de:',
    'privacy.accessData': 'Aceder aos seus dados',
    'privacy.correctData': 'Corrigir dados inexatos',
    'privacy.deleteData': 'Solicitar a eliminação dos seus dados',
    'privacy.restrictProcessing': 'Restringir ou opor-se ao processamento',
    'privacy.withdrawConsent': 'Retirar o consentimento a qualquer momento',
    'privacy.contactForRights':
      'Para exercer estes direitos, contacte-nos através do email indicado abaixo.',
    'privacy.dataRetention': 'Retenção de Dados',
    'privacy.dataRetentionContent':
      'Mantemos os seus dados apenas pelo tempo necessário para reservas, cumprimento legal ou melhoria dos nossos serviços.',
    'privacy.contact': 'Contacto',
    'privacy.contactIntro':
      'Se tiver questões sobre esta Política de Privacidade & Cookies, contacte-nos:',
    'privacy.phone': 'Telefone',
    'privacy.email': 'Email',
    'privacy.supervisoryAuthority': 'Autoridade de Supervisão',
    'privacy.supervisoryAuthorityContent':
      'Se acredita que tratámos mal os seus dados, pode apresentar uma queixa à sua Autoridade de Proteção de Dados local.',
    // Contact Form Validation Messages
    'validation.name.required': 'Nome é obrigatório',
    'validation.name.min': 'Nome deve ter pelo menos 2 caracteres',
    'validation.name.max': 'Nome deve ter menos de 50 caracteres',
    'validation.name.pattern':
      'Nome só pode conter letras, espaços, hífens e apóstrofos',
    'validation.name.invalid': 'Caracteres inválidos detetados',
    'validation.email.required': 'Email é obrigatório',
    'validation.email.invalid': 'Por favor, introduza um email válido',
    'validation.email.max': 'Endereço de email é muito longo',
    'validation.phone.invalid':
      'Por favor, introduza um número de telefone válido',
    'validation.subject.required': 'Assunto é obrigatório',
    'validation.subject.min': 'Assunto deve ter pelo menos 5 caracteres',
    'validation.subject.max': 'Assunto deve ter menos de 100 caracteres',
    'validation.subject.invalid': 'Assunto contém caracteres inválidos',
    'validation.message.required': 'Mensagem é obrigatória',
    'validation.message.min': 'Mensagem deve ter pelo menos 10 caracteres',
    'validation.message.max': 'Mensagem deve ter menos de 1000 caracteres',
    'validation.message.invalid': 'Mensagem contém caracteres inválidos',
    'validation.security.invalid': 'Caracteres inválidos detetados',
    // Contact Form Labels
    'contact.name': 'Nome',
    'contact.email': 'Email',
    'contact.phone': 'Telefone (Opcional)',
    'contact.subject': 'Assunto',
    'contact.message': 'Mensagem',
    'contact.sendMessage': 'Enviar Mensagem',
    'contact.sending': 'A Enviar...',
    'contact.successMessage': 'Mensagem enviada com sucesso!',
    'contact.errorMessage':
      'Por favor, verifique o formulário e tente novamente.',
    'contact.submissionError':
      'Falha ao enviar mensagem. Tente novamente mais tarde.',
    // Cookie Banner
    'cookies.title': 'Cookies e Privacidade',
    'cookies.description':
      'Utilizamos cookies para melhorar a sua experiência. Pode escolher quais cookies aceitar.',
    'cookies.accept': 'Aceitar Todos',
    'cookies.reject': 'Rejeitar Todos',
    'cookies.settings': 'Definições',
    'cookies.settingsTitle': 'Definições de Cookies',
    'cookies.save': 'Guardar',
    'cookies.cancel': 'Cancelar',
    'cookies.always': 'Sempre',
    'cookies.essential.title': 'Cookies Essenciais',
    'cookies.essential.description':
      'Necessários para o funcionamento básico do site',
    'cookies.analytics.title': 'Cookies de Análise',
    'cookies.analytics.description':
      'Ajudam-nos a melhorar o site através de estatísticas anónimas',
    'cookies.preferences.title': 'Cookies de Preferências',
    'cookies.preferences.description':
      'Lembram as suas escolhas como idioma e tema',
  },
  nl: {
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.gallery': 'Galerij',
    'nav.reservations': 'Reserveringen',
    'nav.events': 'Evenementen',
    'nav.contact': 'Contact',
    'nav.about': 'Over Ons',
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Unieke Gastronomische Ervaring',
    'hero.description': 'Ontdek de authentieke smaken van de Portugese keuken',
    'hero.reserve': 'Reserveren',
    'hero.viewMenu': 'Menu Bekijken',
    'menu.title': 'Onze Menu',
    'menu.subtitle': 'Traditionele Smaken met Moderne Twist',
    'menu.download': 'Menu PDF Downloaden',
    'gallery.title': 'Galerij',
    'gallery.subtitle': 'Speciale Momenten bij Amor Meco',
    'events.title': 'Speciale Evenementen',
    'events.subtitle': 'Vier Met Ons',
    'reservations.title': 'Reserveringen',
    'reservations.subtitle': 'Reserveer Uw Tafel',
    'about.title': 'Over Ons',
    'about.subtitle': 'Onze Geschiedenis',
    'contact.title': 'Contact',
    'contact.subtitle': 'Neem Contact Op',
    'footer.opening': 'Openingstijden',
    'footer.address': 'Adres',
    'footer.phone': 'Telefoon',
    'footer.email': 'E-mail',
    'footer.tagline':
      'Ervaar de authentieke smaken van Portugal in elk gerecht. Waar traditie innovatie ontmoet in een warme, gastvrije sfeer.',
    'footer.quickLinks': 'Snelle Links',
    'footer.contactInfo': 'Contactgegevens',
    'footer.openingHours': 'Openingstijden',
    'footer.monday': 'Maandag',
    'footer.tuesday': 'Dinsdag',
    'footer.wednesday': 'Woensdag',
    'footer.thursday': 'Donderdag',
    'footer.friday': 'Vrijdag',
    'footer.saturday': 'Zaterdag',
    'footer.sunday': 'Zondag',
    'footer.closed': 'Gesloten',
    'footer.copyright':
      '© {year} Amor Meco Restaurant. Alle rechten voorbehouden.',
    'footer.privacy': 'Privacy & Cookiebeleid',
    'footer.terms': 'Servicevoorwaarden',
    'footer.cookies': 'Cookiebeleid',
    // Privacy Policy
    'privacy.title': 'Privacy & Cookiebeleid',
    'privacy.subtitle':
      'Hoe we uw persoonlijke gegevens beschermen en gebruiken',
    'privacy.lastUpdated': 'Laatst bijgewerkt',
    'privacy.whoWeAre': 'Wie We Zijn',
    'privacy.whoWeAreContent':
      'Restaurant Amor Meco ("wij", "ons", "onze") exploiteert de website https://amormeco.pt. Wij respecteren uw privacy en zijn toegewijd aan het beschermen van uw persoonlijke gegevens.',
    'privacy.dataCollection': 'Persoonlijke Gegevens die We Verzamelen',
    'privacy.dataCollectionIntro':
      'Wanneer u onze website gebruikt, kunnen we verzamelen:',
    'privacy.contactDetails':
      'Contactgegevens (naam, e-mail, telefoon) als u een reservering maakt of ons contactformulier invult.',
    'privacy.technicalData':
      'Technische gegevens (IP-adres, browser, apparaat, taal) via analyses en beveiligingslogs.',
    'privacy.usageData':
      "Gebruiksgegevens (bezochte pagina's, tijd op site, klikken) om de gebruikerservaring te verbeteren.",
    'privacy.noDataSale': 'We verkopen of verhuren uw gegevens niet.',
    'privacy.dataUsage': 'Hoe We Uw Gegevens Gebruiken',
    'privacy.dataUsageIntro': 'We verwerken persoonlijke gegevens om:',
    'privacy.handleReservations':
      'Reserveringen af te handelen en vragen te beantwoorden.',
    'privacy.sendConfirmations':
      'Event- of reserveringsbevestigingen te sturen.',
    'privacy.improveSite': 'Site-prestaties en inhoud te verbeteren.',
    'privacy.legalCompliance': 'Aan wettelijke verplichtingen te voldoen.',
    'privacy.cookies': 'Cookies & Tracking',
    'privacy.cookiesIntro': 'Onze website gebruikt cookies voor:',
    'privacy.essentialCookies':
      'Essentiële functies (sitenavigatie, reserveringen).',
    'privacy.analyticsCookies': 'Analyses (anonieme gebruiksstatistieken).',
    'privacy.preferenceCookies':
      'Voorkeuren (taalselectie, donkere/lichte modus).',
    'privacy.cookieManagement':
      'U kunt cookies beheren in uw browserinstellingen of via onze cookiebanner.',
    'privacy.dataSharing': 'Gegevensdeling',
    'privacy.dataSharingIntro':
      'We kunnen gegevens alleen delen met vertrouwde providers, bijvoorbeeld:',
    'privacy.reservationSystem': 'Reserveringssysteem (Guestplan)',
    'privacy.analyticsTools':
      'Analysetools (bijv. Google Analytics, indien ingeschakeld)',
    'privacy.hostingProviders': 'Hostingproviders',
    'privacy.gdprCompliance':
      'Alle providers voldoen aan de AVG en verwerken gegevens namens ons.',
    'privacy.yourRights': 'Uw Rechten',
    'privacy.yourRightsIntro': 'Onder de AVG heeft u het recht om:',
    'privacy.accessData': 'Uw gegevens in te zien',
    'privacy.correctData': 'Onjuiste gegevens te corrigeren',
    'privacy.deleteData': 'Verwijdering van uw gegevens te verzoeken',
    'privacy.restrictProcessing':
      'Verwerking te beperken of ertegen in te gaan',
    'privacy.withdrawConsent': 'Toestemming te allen tijde in te trekken',
    'privacy.contactForRights':
      'Om deze rechten uit te oefenen, neem contact met ons op via de onderstaande e-mail.',
    'privacy.dataRetention': 'Gegevensbewaring',
    'privacy.dataRetentionContent':
      'We bewaren uw gegevens alleen zolang als nodig is voor reserveringen, wettelijke naleving of het verbeteren van onze diensten.',
    'privacy.contact': 'Contact',
    'privacy.contactIntro':
      'Als u vragen heeft over dit Privacy & Cookiebeleid, neem dan contact met ons op:',
    'privacy.phone': 'Telefoon',
    'privacy.email': 'E-mail',
    'privacy.supervisoryAuthority': 'Toezichthoudende Autoriteit',
    'privacy.supervisoryAuthorityContent':
      'Als u van mening bent dat we uw gegevens verkeerd hebben behandeld, kunt u een klacht indienen bij uw lokale Autoriteit Persoonsgegevens.',
    // Contact Form Validation Messages
    'validation.name.required': 'Naam is verplicht',
    'validation.name.min': 'Naam moet minimaal 2 tekens bevatten',
    'validation.name.max': 'Naam moet minder dan 50 tekens bevatten',
    'validation.name.pattern':
      'Naam mag alleen letters, spaties, streepjes en apostroffen bevatten',
    'validation.name.invalid': 'Ongeldige tekens gedetecteerd',
    'validation.email.required': 'E-mail is verplicht',
    'validation.email.invalid': 'Voer een geldig e-mailadres in',
    'validation.email.max': 'E-mailadres is te lang',
    'validation.phone.invalid': 'Voer een geldig telefoonnummer in',
    'validation.subject.required': 'Onderwerp is verplicht',
    'validation.subject.min': 'Onderwerp moet minimaal 5 tekens bevatten',
    'validation.subject.max': 'Onderwerp moet minder dan 100 tekens bevatten',
    'validation.subject.invalid': 'Onderwerp bevat ongeldige tekens',
    'validation.message.required': 'Bericht is verplicht',
    'validation.message.min': 'Bericht moet minimaal 10 tekens bevatten',
    'validation.message.max': 'Bericht moet minder dan 1000 tekens bevatten',
    'validation.message.invalid': 'Bericht bevat ongeldige tekens',
    'validation.security.invalid': 'Ongeldige tekens gedetecteerd',
    // Contact Form Labels
    'contact.name': 'Naam',
    'contact.email': 'E-mail',
    'contact.phone': 'Telefoon (Optioneel)',
    'contact.subject': 'Onderwerp',
    'contact.message': 'Bericht',
    'contact.sendMessage': 'Bericht Versturen',
    'contact.sending': 'Versturen...',
    'contact.successMessage': 'Bericht succesvol verzonden!',
    'contact.errorMessage': 'Controleer het formulier en probeer het opnieuw.',
    'contact.submissionError':
      'Bericht verzenden mislukt. Probeer het later opnieuw.',
    // Cookie Banner
    'cookies.title': 'Cookies en Privacy',
    'cookies.description':
      'We gebruiken cookies om uw ervaring te verbeteren. U kunt kiezen welke cookies u accepteert.',
    'cookies.accept': 'Alles Accepteren',
    'cookies.reject': 'Alles Weigeren',
    'cookies.settings': 'Instellingen',
    'cookies.settingsTitle': 'Cookie Instellingen',
    'cookies.save': 'Opslaan',
    'cookies.cancel': 'Annuleren',
    'cookies.always': 'Altijd',
    'cookies.essential.title': 'Essentiële Cookies',
    'cookies.essential.description':
      'Noodzakelijk voor de basis functionaliteit van de website',
    'cookies.analytics.title': 'Analytische Cookies',
    'cookies.analytics.description':
      'Helpen ons de website te verbeteren door anonieme statistieken',
    'cookies.preferences.title': 'Voorkeur Cookies',
    'cookies.preferences.description':
      'Onthouden uw keuzes zoals taal en thema',
  },
  en: {
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.gallery': 'Gallery',
    'nav.reservations': 'Reservations',
    'nav.events': 'Events',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Unique Gastronomic Experience',
    'hero.description': 'Discover the authentic flavors of Portuguese cuisine',
    'hero.reserve': 'Make Reservation',
    'hero.viewMenu': 'View Menu',
    'menu.title': 'Our Menu',
    'menu.subtitle': 'Traditional Flavors with Modern Twist',
    'menu.download': 'Download Menu PDF',
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Special Moments at Amor Meco',
    'events.title': 'Special Events',
    'events.subtitle': 'Celebrate With Us',
    'reservations.title': 'Reservations',
    'reservations.subtitle': 'Book Your Table',
    'about.title': 'About Us',
    'about.subtitle': 'Our Story',
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in Touch',
    'footer.opening': 'Opening Hours',
    'footer.address': 'Address',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.tagline':
      'Experience the authentic flavors of Portugal in every dish. Where tradition meets innovation in a warm, welcoming atmosphere.',
    'footer.quickLinks': 'Quick Links',
    'footer.contactInfo': 'Contact Info',
    'footer.openingHours': 'Opening Hours',
    'footer.monday': 'Monday',
    'footer.tuesday': 'Tuesday',
    'footer.wednesday': 'Wednesday',
    'footer.thursday': 'Thursday',
    'footer.friday': 'Friday',
    'footer.saturday': 'Saturday',
    'footer.sunday': 'Sunday',
    'footer.closed': 'Closed',
    'footer.copyright': '© {year} Amor Meco Restaurant. All rights reserved.',
    'footer.privacy': 'Privacy & Cookie Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    // Privacy Policy
    'privacy.title': 'Privacy & Cookie Policy',
    'privacy.subtitle': 'How we protect and use your personal data',
    'privacy.lastUpdated': 'Last updated',
    'privacy.whoWeAre': 'Who We Are',
    'privacy.whoWeAreContent':
      'Amor Meco Restaurant ("we", "our", "us") operates the website https://amormeco.pt. We respect your privacy and are committed to protecting your personal data.',
    'privacy.dataCollection': 'Personal Data We Collect',
    'privacy.dataCollectionIntro': 'When you use our website, we may collect:',
    'privacy.contactDetails':
      'Contact details (name, email, phone) if you make a reservation or fill in our contact form.',
    'privacy.technicalData':
      'Technical data (IP address, browser, device, language) via analytics and security logs.',
    'privacy.usageData':
      'Usage data (pages visited, time on site, clicks) to improve the user experience.',
    'privacy.noDataSale': 'We do not sell or rent your data.',
    'privacy.dataUsage': 'How We Use Your Data',
    'privacy.dataUsageIntro': 'We process personal data to:',
    'privacy.handleReservations':
      'Handle reservations and respond to inquiries.',
    'privacy.sendConfirmations': 'Send event or booking confirmations.',
    'privacy.improveSite': 'Improve site performance and content.',
    'privacy.legalCompliance': 'Comply with legal obligations.',
    'privacy.cookies': 'Cookies & Tracking',
    'privacy.cookiesIntro': 'Our website uses cookies for:',
    'privacy.essentialCookies':
      'Essential functions (site navigation, reservations).',
    'privacy.analyticsCookies': 'Analytics (anonymous usage statistics).',
    'privacy.preferenceCookies':
      'Preferences (language selection, dark/light mode).',
    'privacy.cookieManagement':
      'You can manage cookies in your browser settings or through our cookie banner.',
    'privacy.dataSharing': 'Data Sharing',
    'privacy.dataSharingIntro':
      'We may share data only with trusted providers, for example:',
    'privacy.reservationSystem': 'Reservation system (Guestplan)',
    'privacy.analyticsTools':
      'Analytics tools (e.g. Google Analytics, if enabled)',
    'privacy.hostingProviders': 'Hosting providers',
    'privacy.gdprCompliance':
      'All providers comply with GDPR and process data on our behalf.',
    'privacy.yourRights': 'Your Rights',
    'privacy.yourRightsIntro': 'Under GDPR, you have the right to:',
    'privacy.accessData': 'Access your data',
    'privacy.correctData': 'Correct inaccurate data',
    'privacy.deleteData': 'Request deletion of your data',
    'privacy.restrictProcessing': 'Restrict or object to processing',
    'privacy.withdrawConsent': 'Withdraw consent at any time',
    'privacy.contactForRights':
      'To exercise these rights, contact us at the email below.',
    'privacy.dataRetention': 'Data Retention',
    'privacy.dataRetentionContent':
      'We keep your data only as long as necessary for reservations, legal compliance, or improving our services.',
    'privacy.contact': 'Contact',
    'privacy.contactIntro':
      'If you have any questions about this Privacy & Cookie Policy, please contact us:',
    'privacy.phone': 'Phone',
    'privacy.email': 'Email',
    'privacy.supervisoryAuthority': 'Supervisory Authority',
    'privacy.supervisoryAuthorityContent':
      'If you believe we have mishandled your data, you may lodge a complaint with your local Data Protection Authority.',
    // Contact Form Validation Messages
    'validation.name.required': 'Name is required',
    'validation.name.min': 'Name must be at least 2 characters',
    'validation.name.max': 'Name must be less than 50 characters',
    'validation.name.pattern':
      'Name can only contain letters, spaces, hyphens, and apostrophes',
    'validation.name.invalid': 'Invalid characters detected',
    'validation.email.required': 'Email is required',
    'validation.email.invalid': 'Please enter a valid email address',
    'validation.email.max': 'Email address is too long',
    'validation.phone.invalid': 'Please enter a valid phone number',
    'validation.subject.required': 'Subject is required',
    'validation.subject.min': 'Subject must be at least 5 characters',
    'validation.subject.max': 'Subject must be less than 100 characters',
    'validation.subject.invalid': 'Subject contains invalid characters',
    'validation.message.required': 'Message is required',
    'validation.message.min': 'Message must be at least 10 characters',
    'validation.message.max': 'Message must be less than 1000 characters',
    'validation.message.invalid': 'Message contains invalid characters',
    'validation.security.invalid': 'Invalid characters detected',
    // Contact Form Labels
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone (Optional)',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.sendMessage': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.successMessage': 'Message sent successfully!',
    'contact.errorMessage': 'Please check the form and try again.',
    'contact.submissionError':
      'Failed to send message. Please try again later.',
    // Cookie Banner
    'cookies.title': 'Cookies & Privacy',
    'cookies.description':
      'We use cookies to improve your experience. You can choose which cookies to accept.',
    'cookies.accept': 'Accept All',
    'cookies.reject': 'Reject All',
    'cookies.settings': 'Settings',
    'cookies.settingsTitle': 'Cookie Settings',
    'cookies.save': 'Save',
    'cookies.cancel': 'Cancel',
    'cookies.always': 'Always',
    'cookies.essential.title': 'Essential Cookies',
    'cookies.essential.description':
      'Necessary for basic website functionality',
    'cookies.analytics.title': 'Analytics Cookies',
    'cookies.analytics.description':
      'Help us improve the website through anonymous statistics',
    'cookies.preferences.title': 'Preference Cookies',
    'cookies.preferences.description':
      'Remember your choices like language and theme',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.menu': 'Menú',
    'nav.gallery': 'Galería',
    'nav.reservations': 'Reservas',
    'nav.events': 'Eventos',
    'nav.contact': 'Contacto',
    'nav.about': 'Sobre Nosotros',
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Experiencia Gastronómica Única',
    'hero.description':
      'Descubre los sabores auténticos de la cocina portuguesa',
    'hero.reserve': 'Hacer Reserva',
    'hero.viewMenu': 'Ver Menú',
    'menu.title': 'Nuestro Menú',
    'menu.subtitle': 'Sabores Tradicionales con Toque Moderno',
    'menu.download': 'Descargar Menú PDF',
    'gallery.title': 'Galería',
    'gallery.subtitle': 'Momentos Especiales en Amor Meco',
    'events.title': 'Eventos Especiales',
    'events.subtitle': 'Celebra Con Nosotros',
    'reservations.title': 'Reservas',
    'reservations.subtitle': 'Reserva Tu Mesa',
    'about.title': 'Sobre Nosotros',
    'about.subtitle': 'Nuestra Historia',
    'contact.title': 'Contacto',
    'contact.subtitle': 'Ponte en Contacto',
    'footer.opening': 'Horario de Apertura',
    'footer.address': 'Dirección',
    'footer.phone': 'Teléfono',
    'footer.email': 'Email',
    'footer.tagline':
      'Experimenta los sabores auténticos de Portugal en cada plato. Donde la tradición se encuentra con la innovación en un ambiente cálido y acogedor.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.contactInfo': 'Información de Contacto',
    'footer.openingHours': 'Horario de Apertura',
    'footer.monday': 'Lunes',
    'footer.tuesday': 'Martes',
    'footer.wednesday': 'Miércoles',
    'footer.thursday': 'Jueves',
    'footer.friday': 'Viernes',
    'footer.saturday': 'Sábado',
    'footer.sunday': 'Domingo',
    'footer.closed': 'Cerrado',
    'footer.copyright':
      '© {year} Restaurante Amor Meco. Todos los derechos reservados.',
    'footer.privacy': 'Política de Privacidad & Cookies',
    'footer.terms': 'Términos de Servicio',
    'footer.cookies': 'Política de Cookies',
    // Privacy Policy
    'privacy.title': 'Política de Privacidad & Cookies',
    'privacy.subtitle': 'Cómo protegemos y utilizamos sus datos personales',
    'privacy.lastUpdated': 'Última actualización',
    'privacy.whoWeAre': 'Quiénes Somos',
    'privacy.whoWeAreContent':
      'El Restaurante Amor Meco ("nosotros", "nuestro", "nos") opera el sitio web https://amormeco.pt. Respetamos su privacidad y estamos comprometidos a proteger sus datos personales.',
    'privacy.dataCollection': 'Datos Personales que Recopilamos',
    'privacy.dataCollectionIntro':
      'Cuando utiliza nuestro sitio web, podemos recopilar:',
    'privacy.contactDetails':
      'Datos de contacto (nombre, email, teléfono) si hace una reserva o completa nuestro formulario de contacto.',
    'privacy.technicalData':
      'Datos técnicos (dirección IP, navegador, dispositivo, idioma) a través de análisis y registros de seguridad.',
    'privacy.usageData':
      'Datos de uso (páginas visitadas, tiempo en el sitio, clics) para mejorar la experiencia del usuario.',
    'privacy.noDataSale': 'No vendemos ni alquilamos sus datos.',
    'privacy.dataUsage': 'Cómo Utilizamos Sus Datos',
    'privacy.dataUsageIntro': 'Procesamos datos personales para:',
    'privacy.handleReservations': 'Gestionar reservas y responder consultas.',
    'privacy.sendConfirmations': 'Enviar confirmaciones de eventos o reservas.',
    'privacy.improveSite': 'Mejorar el rendimiento y contenido del sitio.',
    'privacy.legalCompliance': 'Cumplir con obligaciones legales.',
    'privacy.cookies': 'Cookies & Seguimiento',
    'privacy.cookiesIntro': 'Nuestro sitio web utiliza cookies para:',
    'privacy.essentialCookies':
      'Funciones esenciales (navegación del sitio, reservas).',
    'privacy.analyticsCookies': 'Análisis (estadísticas de uso anónimas).',
    'privacy.preferenceCookies':
      'Preferencias (selección de idioma, modo oscuro/claro).',
    'privacy.cookieManagement':
      'Puede gestionar las cookies en la configuración de su navegador o a través de nuestro banner de cookies.',
    'privacy.dataSharing': 'Compartir Datos',
    'privacy.dataSharingIntro':
      'Podemos compartir datos solo con proveedores de confianza, por ejemplo:',
    'privacy.reservationSystem': 'Sistema de reservas (Guestplan)',
    'privacy.analyticsTools':
      'Herramientas de análisis (ej. Google Analytics, si está habilitado)',
    'privacy.hostingProviders': 'Proveedores de alojamiento',
    'privacy.gdprCompliance':
      'Todos los proveedores cumplen con el RGPD y procesan datos en nuestro nombre.',
    'privacy.yourRights': 'Sus Derechos',
    'privacy.yourRightsIntro': 'Bajo el RGPD, tiene derecho a:',
    'privacy.accessData': 'Acceder a sus datos',
    'privacy.correctData': 'Corregir datos inexactos',
    'privacy.deleteData': 'Solicitar la eliminación de sus datos',
    'privacy.restrictProcessing': 'Restringir u oponerse al procesamiento',
    'privacy.withdrawConsent': 'Retirar el consentimiento en cualquier momento',
    'privacy.contactForRights':
      'Para ejercer estos derechos, contáctenos en el email indicado abajo.',
    'privacy.dataRetention': 'Retención de Datos',
    'privacy.dataRetentionContent':
      'Mantenemos sus datos solo el tiempo necesario para reservas, cumplimiento legal o mejora de nuestros servicios.',
    'privacy.contact': 'Contacto',
    'privacy.contactIntro':
      'Si tiene preguntas sobre esta Política de Privacidad & Cookies, contáctenos:',
    'privacy.phone': 'Teléfono',
    'privacy.email': 'Email',
    'privacy.supervisoryAuthority': 'Autoridad de Supervisión',
    'privacy.supervisoryAuthorityContent':
      'Si cree que hemos manejado mal sus datos, puede presentar una queja a su Autoridad de Protección de Datos local.',
    // Contact Form Validation Messages
    'validation.name.required': 'El nombre es obligatorio',
    'validation.name.min': 'El nombre debe tener al menos 2 caracteres',
    'validation.name.max': 'El nombre debe tener menos de 50 caracteres',
    'validation.name.pattern':
      'El nombre solo puede contener letras, espacios, guiones y apóstrofes',
    'validation.name.invalid': 'Caracteres inválidos detectados',
    'validation.email.required': 'El email es obligatorio',
    'validation.email.invalid': 'Por favor, introduzca un email válido',
    'validation.email.max': 'La dirección de email es demasiado larga',
    'validation.phone.invalid':
      'Por favor, introduzca un número de teléfono válido',
    'validation.subject.required': 'El asunto es obligatorio',
    'validation.subject.min': 'El asunto debe tener al menos 5 caracteres',
    'validation.subject.max': 'El asunto debe tener menos de 100 caracteres',
    'validation.subject.invalid': 'El asunto contiene caracteres inválidos',
    'validation.message.required': 'El mensaje es obligatorio',
    'validation.message.min': 'El mensaje debe tener al menos 10 caracteres',
    'validation.message.max': 'El mensaje debe tener menos de 1000 caracteres',
    'validation.message.invalid': 'El mensaje contiene caracteres inválidos',
    'validation.security.invalid': 'Caracteres inválidos detectados',
    // Contact Form Labels
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.phone': 'Teléfono (Opcional)',
    'contact.subject': 'Asunto',
    'contact.message': 'Mensaje',
    'contact.sendMessage': 'Enviar Mensaje',
    'contact.sending': 'Enviando...',
    'contact.successMessage': '¡Mensaje enviado con éxito!',
    'contact.errorMessage':
      'Por favor, revise el formulario e inténtelo de nuevo.',
    'contact.submissionError':
      'Error al enviar mensaje. Inténtelo de nuevo más tarde.',
    // Cookie Banner
    'cookies.title': 'Cookies y Privacidad',
    'cookies.description':
      'Utilizamos cookies para mejorar su experiencia. Puede elegir qué cookies aceptar.',
    'cookies.accept': 'Aceptar Todo',
    'cookies.reject': 'Rechazar Todo',
    'cookies.settings': 'Configuración',
    'cookies.settingsTitle': 'Configuración de Cookies',
    'cookies.save': 'Guardar',
    'cookies.cancel': 'Cancelar',
    'cookies.always': 'Siempre',
    'cookies.essential.title': 'Cookies Esenciales',
    'cookies.essential.description':
      'Necesarios para la funcionalidad básica del sitio web',
    'cookies.analytics.title': 'Cookies de Análisis',
    'cookies.analytics.description':
      'Nos ayudan a mejorar el sitio web a través de estadísticas anónimas',
    'cookies.preferences.title': 'Cookies de Preferencias',
    'cookies.preferences.description':
      'Recuerdan sus elecciones como idioma y tema',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');
  const { preferences, isLoaded } = useCookiePreferences();

  useEffect(() => {
    // Only load saved language if preferences cookies are allowed
    if (isLoaded && preferences) {
      if (preferences.preferences) {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && ['pt', 'nl', 'en', 'es'].includes(savedLanguage)) {
          setLanguageState(savedLanguage);
        }
      }
    }
  }, [isLoaded, preferences]);

  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang);
      // Only save to localStorage if preferences cookies are allowed
      if (preferences?.preferences) {
        localStorage.setItem('language', lang);
      }
    },
    [preferences?.preferences]
  );

  const t = useMemo(() => {
    return (key: string): string => {
      return (
        translations[language][
          key as keyof (typeof translations)[typeof language]
        ] || key
      );
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
