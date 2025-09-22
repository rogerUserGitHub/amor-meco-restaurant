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

type Language = 'pt' | 'nl' | 'en' | 'es' | 'fr' | 'de';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  mounted: boolean;
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
    'nav.language': 'Idioma',
    'nav.theme': 'Tema',
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Descubra os Sabores Autênticos',
    'hero.description': 'Provar juntos é desfrutar juntos',
    'hero.reserve': 'Fazer Reserva',
    'hero.viewMenu': 'Ver Menu',
    'menu.title': 'O Nosso Menu',
    'menu.subtitle': 'Sabores Tradicionais com Toque Moderno',
    'menu.description':
      'Faça uma viagem culinária pelo mundo cheia de surpresas. Descubra uma explosão de sabores internacionais, onde cada prato é uma obra de arte para os olhos e conta uma história de tradição e inovação. De especiarias asiáticas refinadas a frutos do mar mediterrâneos, de criações de carne grelhada com influências do Médio Oriente a sobremesas refinadas de cozinhas conventuais e pastelaria mundial. Oferecemos uma experiência saborosa que conecta culturas e estimula os seus sentidos com cor, aroma e apresentação.',
    'menu.download': 'Menu PDF',
    'menu.downloadText': 'Clique para descarregar o nosso menu completo em PDF',
    'menu.photoPlaceholder': 'Foto do Menu',
    'menu.portugueseCuisine': 'Cozinha Portuguesa',
    'menu.authenticCuisine': 'Cozinha Portuguesa Autêntica',
    'menu.freshSeafood': 'Frutos do Mar Frescos',
    'menu.traditionalMeat': 'Pratos de Carne Tradicionais',
    'menu.homemadeIceCream': 'Gelado Caseiro',
    'menu.portugueseWines': 'Vinhos Portugueses & Cervejas Belgas',
    'menu.downloadPdf': 'Descarregar',
    'gallery.title': 'Galeria',
    'gallery.subtitle': 'Momentos Especiais no Amor Meco',
    'gallery.description':
      'Explore a nossa galeria de imagens e descubra a atmosfera única do Amor Meco.',
    'gallery.image1.alt': 'Interior do restaurante',
    'gallery.image1.title': 'Ambiente Acolhedor',
    'gallery.image2.alt': 'Cozinha portuguesa',
    'gallery.image2.title': 'Cozinha Portuguesa',
    'gallery.image3.alt': 'Experiência gastronómica',
    'gallery.image3.title': 'Experiência Gastronómica',
    'gallery.image4.alt': 'Seleção de vinhos',
    'gallery.image4.title': 'Seleção de Vinhos',
    'gallery.image5.alt': 'Chef a preparar comida',
    'gallery.image5.title': 'Chef em Ação',
    'gallery.discoverMagic': 'Descubra a magia da gastronomia portuguesa',
    'events.title': 'Eventos Especiais',
    'events.subtitle': 'Celebre Conosco',
    'events.description':
      'Torne o seu evento especial ainda mais memorável com os nossos serviços de catering personalizados.',
    'events.weddings.title': 'Casamentos',
    'events.weddings.description':
      'Para o seu dia especial oferecemos o que vocês desejam, desde receção até jantar até dança.',
    'events.birthdays.title': 'Aniversários',
    'events.birthdays.description':
      'Faça do seu aniversário uma ocasião memorável com os nossos menus especiais.',
    'events.corporate.title': 'Eventos Corporativos',
    'events.corporate.description':
      'Reuniões e eventos de empresa com menus profissionais e espaços adequados.',
    'events.bookNow': 'Reservar Agora',
    'events.contactUs':
      'Contacte-nos para discutir as suas necessidades e criar uma experiência única.',
    'events.privateDining.title': 'Jantar Privado',
    'events.privateDining.description':
      'Quer seja uma reunião ou o seu dia especial: organizamos tudo à medida - do menu à música e ambiente.',
    'events.liveMusic.title': 'Eventos de Música ao Vivo',
    'events.liveMusic.description':
      'Para mais informações sigam-nos no Instagram e Facebook. Se têm uma ideia interessante e precisam de um local, não hesitem em contactar-nos.',
    'events.weddingReceptions.title': 'Receções de Casamento',
    'events.weddingReceptions.description':
      'Celebre o seu dia especial com cozinha portuguesa autêntica',
    'events.corporateEvents.title': 'Eventos Corporativos',
    'events.corporateEvents.description':
      'Reuniões de negócios e eventos corporativos com catering',
    'reservations.title': 'Reservas',
    'reservations.subtitle': 'Reserve a Sua Mesa',
    'reservations.description':
      'Garanta a sua mesa no Amor Meco e prepare-se para uma experiência gastronómica inesquecível.',
    'reservations.bookNow': 'Reservar Agora',
    'reservations.contactUs': 'Contacte-nos',
    'reservations.available': 'Reservas disponíveis para almoço e jantar',
    'reservations.hours': 'Almoço: 12:00 - 15:00 | Jantar: 18:00 - 23:00',
    'reservations.groups': 'Grupos até 50 pessoas',
    'reservations.callToReserve': 'Ligar para Reservar',
    'reservations.emailUs': 'Enviar Email',
    'reservations.bookYourTable': 'Reserve a Sua Mesa',
    'reservations.date': 'Data',
    'reservations.time': 'Hora',
    'reservations.guests': 'Convidados',
    'reservations.guest': 'Convidado',
    'reservations.specialRequests': 'Pedidos Especiais',
    'reservations.none': 'Nenhum',
    'reservations.windowSeat': 'Lugar à Janela',
    'reservations.quietArea': 'Área Sossegada',
    'reservations.highChair': 'Cadeira Alta',
    'reservations.wheelchairAccessible': 'Acesso para Cadeira de Rodas',
    'reservations.anniversary': 'Aniversário de Casamento',
    'reservations.birthday': 'Aniversário',
    'reservations.name': 'Nome',
    'reservations.namePlaceholder': 'O seu nome completo',
    'reservations.email': 'Email',
    'reservations.emailPlaceholder': 'seu.email@exemplo.com',
    'reservations.phone': 'Telefone',
    'reservations.phonePlaceholder': '+351 XXXXXXX',
    'reservations.confirmReservation': 'Confirmar Reserva',
    'reservations.heldFor': 'As reservas são mantidas por 15 minutos',
    'reservations.cancellations':
      'Cancelamentos: 24 horas de antecedência necessária',
    'about.title': 'Sobre Nós',
    'about.subtitle': 'A Nossa História',
    'about.story1':
      'Olá, hello, hallo 👋',
    'about.story2':
      'Somos Killian e Amorion, homem belga e mulher holandesa. Estávamos ambos apaixonados por Portugal antes de nos apaixonarmos um pelo outro. Acreditamos no slogan "o amor passa pelo estômago" e uma experiência assim é melhor com as pessoas de quem gostamos, "partilhar é cuidar".',
    'about.values.title': 'Os Nossos Valores',
    'about.values.passion.title': 'Paixão pela Comida',
    'about.values.passion.description':
      'Cada prato é criado com amor e respeito pela cozinha tradicional portuguesa.',
    'about.values.excellence.title': 'Excelência',
    'about.values.excellence.description':
      'Esforçamo-nos pela excelência em todos os aspetos do nosso serviço e ofertas culinárias.',
    'about.values.community.title': 'Comunidade',
    'about.values.community.description':
      'Construir relações duradouras com os nossos clientes e comunidade local.',
    'about.values.innovation.title': 'Inovação',
    'about.values.innovation.description':
      'Combinar técnicas tradicionais com inovação culinária moderna.',
    'about.ourStory': 'A Nossa História',
    'about.story3':
      'Amor é um restaurante onde pratos partilhados estão no centro e queremos oferecer uma experiência excecional para a paleta de sabores e convívio. Adoramos juntar pessoas, organizar eventos é o que nos juntou e o que adoramos fazer. Para grandes e pequenos, à medida e para todos: músicos, aniversariantes ou simplesmente uma boa reunião. Contactem-nos e faremos algo inesquecível.',
    'about.ourPhilosophy': 'A Nossa Filosofia',
    'about.philosophyDescription':
      'No Amor Meco, acreditamos que a boa comida é mais do que apenas sabor—é uma experiência que une as pessoas. A nossa filosofia centra-se em três princípios fundamentais: autenticidade, qualidade e hospitalidade.',
    'about.authenticity': 'Autenticidade',
    'about.authenticityDescription':
      'Mantemo-nos fiéis às nossas receitas e métodos de cozinha, preservando os sabores autênticos.',
    'about.quality': 'Qualidade',
    'about.qualityDescription':
      'Aprovisionamos apenas os melhores ingredientes, trabalhando com produtores locais e selecionando produtos premium para garantir qualidade excecional em cada prato.',
    'about.hospitality': 'Hospitalidade',
    'about.hospitalityDescription':
      'Tratamos cada cliente como família, criando uma atmosfera quente e acolhedora onde as memórias são feitas e as tradições são celebradas.',
    'about.team.title': 'A Nossa Equipa',
    'about.team.subtitle': 'Chefs Dedicados',
    'contact.title': 'Contacto',
    'contact.subtitle': 'Entre em Contacto',
    'footer.opening': 'Horário de Funcionamento',
    'footer.address': 'Morada',
    'footer.phone': 'Telefone',
    'footer.email': 'Email',
    'footer.tagline':
      'Experimente os sabores autênticos em cada prato. Onde a tradição encontra a inovação num ambiente acolhedor.',
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
    // Reviews Section
    'reviews.title': 'Avaliações dos Clientes',
    'reviews.subtitle': 'O Que Dizem Sobre Nós',
    'reviews.averageRating': 'Avaliação Média',
    'reviews.stars': 'estrelas',
    'reviews.basedOn': 'baseado em',
    'reviews.reviews': 'avaliações',
    'reviews.joinSatisfiedCustomers':
      'Junte-se aos nossos clientes satisfeitos e descubra a magia da gastronomia portuguesa.',
    'reviews.makeReservation': 'Fazer Reserva',
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
    'contact.phone': 'Telefone',
    'contact.subject': 'Assunto',
    'contact.message': 'Mensagem',
    'contact.sendMessage': 'Enviar Mensagem',
    'contact.sending': 'A Enviar...',
    'contact.successMessage': 'Mensagem enviada com sucesso!',
    'contact.errorMessage':
      'Por favor, verifique o formulário e tente novamente.',
    'contact.submissionError':
      'Falha ao enviar mensagem. Tente novamente mais tarde.',
    'contact.sendUsMessage': 'Envie-nos uma Mensagem',
    'contact.namePlaceholder': 'O seu nome',
    'contact.emailPlaceholder': 'seu.email@exemplo.com',
    'contact.optional': 'Opcional',
    'contact.phonePlaceholder': '+351 123 456 789 (opcional)',
    'contact.subjectPlaceholder': 'Sobre o que se trata?',
    'contact.messagePlaceholder': 'Diga-nos como podemos ajudá-lo...',
    'contact.getInTouch': 'Entre em Contacto',
    'contact.address': 'Morada',
    'contact.openingHours': 'Horário de Funcionamento',
    'contact.followUs': 'Siga-nos',
    'contact.facebook': 'Facebook',
    'contact.instagram': 'Instagram',
    'contact.findUs': 'Encontre-nos',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.de': 'Deutsch',
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
    // Opening Hours
    'contact.openingHours.mondayTuesday': 'Segunda-feira - Terça-feira',
    'contact.openingHours.wednesdaySaturday': 'Quarta-feira - Sábado',
    'contact.openingHours.sunday': 'Domingo',
    'contact.openingHours.closed': 'Fechado',
    'contact.openingHours.lunchDinner': '12:00 - 15:00, 18:00 - 23:00',
    'contact.openingHours.sundayHours': '12:00 - 15:00, 18:00 - 22:00',
  },
  nl: {
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.gallery': 'Galerij',
    'nav.reservations': 'Reserveringen',
    'nav.events': 'Evenementen',
    'nav.contact': 'Contact',
    'nav.about': 'Over Ons',
    'nav.language': 'Taal',
    'nav.theme': 'Thema',
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Ontdek de authentieke smaken',
    'hero.description': 'Samen proeven is samen genieten',
    'hero.reserve': 'Reserveren',
    'hero.viewMenu': 'Menu Bekijken',
    'menu.title': 'Onze Menu',
    'menu.subtitle': 'Traditionele Smaken met Moderne Twist',
    'menu.description':
      'Maak een culinaire wereldreis vol verrassingen. Ontdek een explosie van internationale smaken, waar elk gerecht een kunstwerk is voor het oog én een verhaal vertelt van traditie en innovatie. Van verfijnde Aziatische specerijen tot mediterrane zeevruchten, van gegrilde vleescreaties met Midden-Oosterse invloeden tot verfijnde desserts uit kloosterkeukens en wereldse patisserie. Wij bieden een smaakvolle ervaring die culturen verbindt en je zintuigen prikkelt met kleur, geur en presentatie.',
    'menu.download': 'Menu PDF',
    'menu.downloadText': 'Klik om ons volledige menu in PDF te downloaden',
    'menu.photoPlaceholder': 'Menu Foto',
    'menu.portugueseCuisine': 'Portugese Keuken',
    'menu.authenticCuisine': 'Authentieke Portugese Keuken',
    'menu.freshSeafood': 'Verse Zeevruchten',
    'menu.traditionalMeat': 'Traditionele Vleesgerechten',
    'menu.homemadeIceCream': 'Zelfgemaakt ijs',
    'menu.portugueseWines': 'Portugese Wijnen & Belgische bieren',
    'menu.downloadPdf': 'Downloaden',
    'gallery.title': 'Galerij',
    'gallery.subtitle': 'Speciale Momenten bij Amor Meco',
    'gallery.description':
      'Verken onze fotogalerij en ontdek de unieke sfeer van Amor Meco.',
    'gallery.image1.alt': 'Restaurant interieur',
    'gallery.image1.title': 'Gastvrije Sfeer',
    'gallery.image2.alt': 'Portugese keuken',
    'gallery.image2.title': 'Portugese Keuken',
    'gallery.image3.alt': 'Gastronomische ervaring',
    'gallery.image3.title': 'Gastronomische Ervaring',
    'gallery.image4.alt': 'Wijnselectie',
    'gallery.image4.title': 'Wijnselectie',
    'gallery.image5.alt': 'Chef bereidt eten',
    'gallery.image5.title': 'Chef in Actie',
    'gallery.discoverMagic': 'Ontdek de magie van de Portugese gastronomie',
    'events.title': 'Speciale Evenementen',
    'events.subtitle': 'Vier Met Ons',
    'events.description':
      'Maak uw speciale evenement nog memorabeler met onze gepersonaliseerde cateringdiensten.',
    'events.weddings.title': 'Trouwerijen',
    'events.weddings.description':
      'Voor jou speciale dag bieden wat jullie graag wensen, van receptie tot dinner tot dans. ',
    'events.birthdays.title': 'Verjaardagen',
    'events.birthdays.description':
      "Maak van uw verjaardag een memorabele gelegenheid met onze speciale menu's.",
    'events.corporate.title': 'Zakelijke Evenementen',
    'events.corporate.description':
      "Vergaderingen en zakelijke evenementen met professionele menu's en geschikte ruimtes.",
    'events.bookNow': 'Nu Reserveren',
    'events.contactUs':
      'Neem contact met ons op om uw behoeften te bespreken en een unieke ervaring te creëren.',
    'events.privateDining.title': 'Privé Dineren',
    'events.privateDining.description':
      'Of het nu om een bijeenkomst gaat of jouw speciale dag: wij regelen alles op maat – van menu tot muziek en sfeer.',
    'events.liveMusic.title': 'Live Muziek Evenementen',
    'events.liveMusic.description':
      'Voor meer informatie volg ons op instagram en Facebook. Heb je zelf een leuk idee en heb je hiervoor een locatie nodig, aarzel niet om contact met ons te leggen.',
    'events.weddingReceptions.title': 'Trouwrecepties',
    'events.weddingReceptions.description':
      'Vier uw speciale dag met authentieke Portugese keuken',
    'events.corporateEvents.title': 'Zakelijke Evenementen',
    'events.corporateEvents.description':
      'Zakelijke vergaderingen en evenementen met catering.',
    'reservations.title': 'Reserveringen',
    'reservations.subtitle': 'Reserveer Uw Tafel',
    'reservations.description':
      'Zorg ervoor dat u een tafel heeft bij Amor Meco en bereid u voor op een onvergetelijke gastronomische ervaring.',
    'reservations.bookNow': 'Nu Reserveren',
    'reservations.contactUs': 'Neem Contact Op',
    'reservations.available': 'Reserveringen beschikbaar voor lunch en diner',
    'reservations.hours': 'Lunch: 12:00 - 15:00 | Diner: 18:00 - 23:00',
    'reservations.groups': 'Groepen tot 50 personen',
    'reservations.callToReserve': 'Bel om te Reserveren',
    'reservations.emailUs': 'Email Ons',
    'reservations.bookYourTable': 'Reserveer Uw Tafel',
    'reservations.date': 'Datum',
    'reservations.time': 'Tijd',
    'reservations.guests': 'Gasten',
    'reservations.guest': 'Gast',
    'reservations.specialRequests': 'Speciale Verzoeken',
    'reservations.none': 'Geen',
    'reservations.windowSeat': 'Raamplaats',
    'reservations.quietArea': 'Stille Ruimte',
    'reservations.highChair': 'Kinderstoel',
    'reservations.wheelchairAccessible': 'Rolstoeltoegankelijk',
    'reservations.anniversary': 'Trouwdag',
    'reservations.birthday': 'Verjaardag',
    'reservations.name': 'Naam',
    'reservations.namePlaceholder': 'Uw volledige naam',
    'reservations.email': 'Email',
    'reservations.emailPlaceholder': 'uw.email@voorbeeld.com',
    'reservations.phone': 'Telefoon',
    'reservations.phonePlaceholder': '+351 XXXXXXX',
    'reservations.confirmReservation': 'Reservering Bevestigen',
    'reservations.heldFor': 'Reserveringen worden 15 minuten vastgehouden',
    'reservations.cancellations': 'Annuleringen: 24 uur van tevoren vereist',
    'about.title': 'Over Ons',
    'about.subtitle': 'Onze Geschiedenis',
    'about.story1':
      'Olá, hello, hallo 👋',
    'about.story2':
      'Wij zijn Killian en Amorion, Belgische man Nederlandse vrouw. We waren allebei verliefd op Portugal voordat we verliefd werden op elkaar. Daarbij geloven wij in de slogan <liefde gaat door de maag> en zo een ervaring maakt het beter met de mensen die je graag hebt, <sharing is caring> ',
    'about.values.title': 'Onze Waarden',
    'about.values.passion.title': 'Passie voor Voedsel',
    'about.values.passion.description':
      'Elk gerecht wordt met liefde en respect voor de traditionele Portugese keuken bereid.',
    'about.values.excellence.title': 'Uitmuntendheid',
    'about.values.excellence.description':
      'We streven naar uitmuntendheid in elk aspect van onze service en culinaire aanbiedingen.',
    'about.values.community.title': 'Gemeenschap',
    'about.values.community.description':
      'Het opbouwen van blijvende relaties met onze gasten en lokale gemeenschap.',
    'about.values.innovation.title': 'Innovatie',
    'about.values.innovation.description':
      'Het combineren van traditionele technieken met moderne culinaire innovatie.',
    'about.ourStory': 'Ons Verhaal',
    'about.story3':
      'Amor is een restaurant waar sharing dishes centraal staat en waarbij je een exceptionele ervaring willen bieden voor het smaken pallet en de gezelligheid. Daarbij houden we van mensen bij elkaar brengen, evenementen organiseren is wat ons bij elkaar heeft gebracht en wat we graag doen. Voor groot en klein, op maat en voor iedereen: Muzikanten, jarigen of gewoon een fijne samenkomst. Contacteer ons en we maken er iets onvergetelijk van. ',
    'about.ourPhilosophy': 'Onze Filosofie',
    'about.philosophyDescription':
      'Bij Amor geloven we dat goed eten meer is dan alleen smaak—het is een ervaring die mensen samenbrengt. Onze filosofie draait om drie kernprincipes: authenticiteit, kwaliteit en gastvrijheid.',
    'about.authenticity': 'Authenticiteit',
    'about.authenticityDescription':
      'We blijven trouw aan onze recepten en kookmethoden, en behouden de authentieke smaken.',
    'about.quality': 'Kwaliteit',
    'about.qualityDescription':
      'We kopen alleen de beste ingrediënten in, werken samen met lokale producenten en selecteren premium producten om uitzonderlijke kwaliteit in elk gerecht te garanderen. ',
    'about.hospitality': 'Gastvrijheid',
    'about.hospitalityDescription':
      'We behandelen elke gast als familie, creëren een warme en gastvrije sfeer waar herinneringen worden gemaakt en tradities worden gevierd.',
    'about.team.title': 'Ons Team',
    'about.team.subtitle': 'Toegewijde Chefs',
    'contact.title': 'Contact',
    'contact.subtitle': 'Neem Contact Op',
    'footer.opening': 'Openingstijden',
    'footer.address': 'Adres',
    'footer.phone': 'Telefoon',
    'footer.email': 'E-mail',
    'footer.tagline':
      'Ervaar de authentieke smaken in elk gerecht. Waar traditie innovatie ontmoet in een warme, gastvrije sfeer.',
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
    // Reviews Section
    'reviews.title': 'Klantbeoordelingen',
    'reviews.subtitle': 'Wat Ze Over Ons Zeggen',
    'reviews.averageRating': 'Gemiddelde Beoordeling',
    'reviews.stars': 'sterren',
    'reviews.basedOn': 'gebaseerd op',
    'reviews.reviews': 'beoordelingen',
    'reviews.joinSatisfiedCustomers':
      'Doe mee met onze tevreden klanten en ontdek de magie van de Portugese gastronomie.',
    'reviews.makeReservation': 'Reserveren',
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
    'contact.phone': 'Telefoon',
    'contact.subject': 'Onderwerp',
    'contact.message': 'Bericht',
    'contact.sendMessage': 'Bericht Versturen',
    'contact.sending': 'Versturen...',
    'contact.successMessage': 'Bericht succesvol verzonden!',
    'contact.errorMessage': 'Controleer het formulier en probeer het opnieuw.',
    'contact.submissionError':
      'Bericht verzenden mislukt. Probeer het later opnieuw.',
    'contact.sendUsMessage': 'Stuur ons een Bericht',
    'contact.namePlaceholder': 'Uw naam',
    'contact.emailPlaceholder': 'uw.email@voorbeeld.com',
    'contact.optional': 'Optioneel',
    'contact.phonePlaceholder': '+351 123 456 789 (optioneel)',
    'contact.subjectPlaceholder': 'Waar gaat het over?',
    'contact.messagePlaceholder': 'Vertel ons hoe we u kunnen helpen...',
    'contact.getInTouch': 'Neem Contact Op',
    'contact.address': 'Adres',
    'contact.openingHours': 'Openingstijden',
    'contact.followUs': 'Volg Ons',
    'contact.facebook': 'Facebook',
    'contact.instagram': 'Instagram',
    'contact.findUs': 'Vind Ons',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.de': 'Deutsch',
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
    // Opening Hours
    'contact.openingHours.mondayTuesday': 'Maandag - Dinsdag',
    'contact.openingHours.wednesdaySaturday': 'Woensdag - Zaterdag',
    'contact.openingHours.sunday': 'Zondag',
    'contact.openingHours.closed': 'Gesloten',
    'contact.openingHours.lunchDinner': '12:00 - 15:00, 18:00 - 23:00',
    'contact.openingHours.sundayHours': '12:00 - 15:00, 18:00 - 22:00',
  },
  en: {
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.gallery': 'Gallery',
    'nav.reservations': 'Reservations',
    'nav.events': 'Events',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    'nav.language': 'Language',
    'nav.theme': 'Theme',
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Discover Authentic Flavors',
    'hero.description': 'Tasting together is enjoying together',
    'hero.reserve': 'Make Reservation',
    'hero.viewMenu': 'View Menu',
    'menu.title': 'Our Menu',
    'menu.subtitle': 'Traditional Flavors with Modern Twist',
    'menu.description':
      'Take a culinary world tour full of surprises. Discover an explosion of international flavors, where each dish is a work of art for the eyes and tells a story of tradition and innovation. From refined Asian spices to Mediterranean seafood, from grilled meat creations with Middle Eastern influences to refined desserts from convent kitchens and worldly patisserie. We offer a flavorful experience that connects cultures and stimulates your senses with color, aroma and presentation.',
    'menu.download': 'Menu PDF',
    'menu.downloadText': 'Click to download our complete menu in PDF',
    'menu.photoPlaceholder': 'Menu Photo',
    'menu.portugueseCuisine': 'Portuguese Cuisine',
    'menu.authenticCuisine': 'Authentic Portuguese Cuisine',
    'menu.freshSeafood': 'Fresh Seafood',
    'menu.traditionalMeat': 'Traditional Meat Dishes',
    'menu.homemadeIceCream': 'Homemade Ice Cream',
    'menu.portugueseWines': 'Portuguese Wines & Belgian Beers',
    'menu.downloadPdf': 'Download',
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Special Moments at Amor Meco',
    'gallery.description':
      'Explore our photo gallery and discover the unique atmosphere of Amor Meco.',
    'gallery.image1.alt': 'Restaurant interior',
    'gallery.image1.title': 'Welcoming Atmosphere',
    'gallery.image2.alt': 'Portuguese cuisine',
    'gallery.image2.title': 'Portuguese Cuisine',
    'gallery.image3.alt': 'Dining experience',
    'gallery.image3.title': 'Gastronomic Experience',
    'gallery.image4.alt': 'Wine selection',
    'gallery.image4.title': 'Wine Selection',
    'gallery.image5.alt': 'Chef preparing food',
    'gallery.image5.title': 'Chef in Action',
    'gallery.discoverMagic': 'Discover the magic of Portuguese gastronomy',
    'events.title': 'Special Events',
    'events.subtitle': 'Celebrate With Us',
    'events.description':
      'Make your special event even more memorable with our personalized catering services.',
    'events.weddings.title': 'Weddings',
    'events.weddings.description':
      'For your special day we offer what you desire, from reception to dinner to dancing.',
    'events.birthdays.title': 'Birthdays',
    'events.birthdays.description':
      'Make your birthday a memorable occasion with our special menus.',
    'events.corporate.title': 'Corporate Events',
    'events.corporate.description':
      'Meetings and corporate events with professional menus and suitable spaces.',
    'events.bookNow': 'Book Now',
    'events.contactUs':
      'Contact us to discuss your needs and create a unique experience.',
    'events.privateDining.title': 'Private Dining',
    'events.privateDining.description':
      'Whether it\'s a gathering or your special day: we arrange everything to measure - from menu to music and atmosphere.',
    'events.liveMusic.title': 'Live Music Events',
    'events.liveMusic.description':
      'For more information follow us on Instagram and Facebook. If you have a fun idea and need a location for it, don\'t hesitate to contact us.',
    'events.weddingReceptions.title': 'Wedding Receptions',
    'events.weddingReceptions.description':
      'Celebrate your special day with authentic Portuguese cuisine',
    'events.corporateEvents.title': 'Corporate Events',
    'events.corporateEvents.description':
      'Business meetings and corporate functions with catering',
    'reservations.title': 'Reservations',
    'reservations.subtitle': 'Book Your Table',
    'reservations.description':
      'Secure your table at Amor Meco and prepare for an unforgettable gastronomic experience.',
    'reservations.bookNow': 'Book Now',
    'reservations.contactUs': 'Contact Us',
    'reservations.available': 'Reservations available for lunch and dinner',
    'reservations.hours': 'Lunch: 12:00 - 15:00 | Dinner: 18:00 - 23:00',
    'reservations.groups': 'Groups up to 50 people',
    'reservations.callToReserve': 'Call to Reserve',
    'reservations.emailUs': 'Email Us',
    'reservations.bookYourTable': 'Book Your Table',
    'reservations.date': 'Date',
    'reservations.time': 'Time',
    'reservations.guests': 'Guests',
    'reservations.guest': 'Guest',
    'reservations.specialRequests': 'Special Requests',
    'reservations.none': 'None',
    'reservations.windowSeat': 'Window Seat',
    'reservations.quietArea': 'Quiet Area',
    'reservations.highChair': 'High Chair',
    'reservations.wheelchairAccessible': 'Wheelchair Accessible',
    'reservations.anniversary': 'Anniversary',
    'reservations.birthday': 'Birthday',
    'reservations.name': 'Name',
    'reservations.namePlaceholder': 'Your full name',
    'reservations.email': 'Email',
    'reservations.emailPlaceholder': 'your.email@example.com',
    'reservations.phone': 'Phone',
    'reservations.phonePlaceholder': '+351 XXXXXXX',
    'reservations.confirmReservation': 'Confirm Reservation',
    'reservations.heldFor': 'Reservations are held for 15 minutes',
    'reservations.cancellations': 'Cancellations: 24 hours notice required',
    'about.title': 'About Us',
    'about.subtitle': 'Our Story',
    'about.story1':
      'Olá, hello, hallo 👋',
    'about.story2':
      'We are Killian and Amorion, Belgian man and Dutch woman. We were both in love with Portugal before we fell in love with each other. We believe in the slogan "love goes through the stomach" and such an experience is better with the people you love, "sharing is caring".',
    'about.values.title': 'Our Values',
    'about.values.passion.title': 'Passion for Food',
    'about.values.passion.description':
      'Each dish is crafted with love and respect for traditional Portuguese cuisine.',
    'about.values.excellence.title': 'Excellence',
    'about.values.excellence.description':
      'We strive for excellence in every aspect of our service and culinary offerings.',
    'about.values.community.title': 'Community',
    'about.values.community.description':
      'Building lasting relationships with our guests and local community.',
    'about.values.innovation.title': 'Innovation',
    'about.values.innovation.description':
      'Blending traditional techniques with modern culinary innovation.',
    'about.ourStory': 'Our Story',
    'about.story3':
      'Amor is a restaurant where sharing dishes is central and we want to offer an exceptional experience for the taste palette and conviviality. We love bringing people together, organizing events is what brought us together and what we love to do. For big and small, tailored and for everyone: musicians, birthdays or just a nice gathering. Contact us and we\'ll make something unforgettable.',
    'about.ourPhilosophy': 'Our Philosophy',
    'about.philosophyDescription':
      "At Amor Meco, we believe that great food is more than just taste—it's an experience that brings people together. Our philosophy centers around three core principles: authenticity, quality, and hospitality.",
    'about.authenticity': 'Authenticity',
    'about.authenticityDescription':
      'We stay true to our recipes and cooking methods, preserving the authentic flavors.',
    'about.quality': 'Quality',
    'about.qualityDescription':
      'We source only the finest ingredients, working with local producers and selecting premium products to ensure exceptional quality in every dish.',
    'about.hospitality': 'Hospitality',
    'about.hospitalityDescription':
      'We treat every guest like family, creating a warm and welcoming atmosphere where memories are made and traditions are celebrated.',
    'about.team.title': 'Our Team',
    'about.team.subtitle': 'Dedicated Chefs',
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in Touch',
    'footer.opening': 'Opening Hours',
    'footer.address': 'Address',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.tagline':
      'Experience the authentic flavors in every dish. Where tradition meets innovation in a warm, welcoming atmosphere.',
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
    // Reviews Section
    'reviews.title': 'Customer Reviews',
    'reviews.subtitle': 'What They Say About Us',
    'reviews.averageRating': 'Average Rating',
    'reviews.stars': 'stars',
    'reviews.basedOn': 'based on',
    'reviews.reviews': 'reviews',
    'reviews.joinSatisfiedCustomers':
      'Join our satisfied customers and discover the magic of Portuguese gastronomy.',
    'reviews.makeReservation': 'Make Reservation',
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
    'contact.phone': 'Phone',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.sendMessage': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.successMessage': 'Message sent successfully!',
    'contact.errorMessage': 'Please check the form and try again.',
    'contact.submissionError':
      'Failed to send message. Please try again later.',
    'contact.sendUsMessage': 'Send us a Message',
    'contact.namePlaceholder': 'Your name',
    'contact.emailPlaceholder': 'your.email@example.com',
    'contact.optional': 'Optional',
    'contact.phonePlaceholder': '+351 123 456 789 (optional)',
    'contact.subjectPlaceholder': "What's this about?",
    'contact.messagePlaceholder': 'Tell us how we can help you...',
    'contact.getInTouch': 'Get in Touch',
    'contact.address': 'Address',
    'contact.openingHours': 'Opening Hours',
    'contact.followUs': 'Follow Us',
    'contact.facebook': 'Facebook',
    'contact.instagram': 'Instagram',
    'contact.findUs': 'Find Us',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.de': 'Deutsch',
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
    // Opening Hours
    'contact.openingHours.mondayTuesday': 'Monday - Tuesday',
    'contact.openingHours.wednesdaySaturday': 'Wednesday - Saturday',
    'contact.openingHours.sunday': 'Sunday',
    'contact.openingHours.closed': 'Closed',
    'contact.openingHours.lunchDinner': '12:00 - 15:00, 18:00 - 23:00',
    'contact.openingHours.sundayHours': '12:00 - 15:00, 18:00 - 22:00',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.menu': 'Menú',
    'nav.gallery': 'Galería',
    'nav.reservations': 'Reservas',
    'nav.events': 'Eventos',
    'nav.contact': 'Contacto',
    'nav.about': 'Sobre Nosotros',
    'nav.language': 'Idioma',
    'nav.theme': 'Tema',
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Descubre los Sabores Auténticos',
    'hero.description': 'Probar juntos es disfrutar juntos',
    'hero.reserve': 'Hacer Reserva',
    'hero.viewMenu': 'Ver Menú',
    'menu.title': 'Nuestro Menú',
    'menu.subtitle': 'Sabores Tradicionales con Toque Moderno',
    'menu.description':
      'Haz un viaje culinario por el mundo lleno de sorpresas. Descubre una explosión de sabores internacionales, donde cada plato es una obra de arte para los ojos y cuenta una historia de tradición e innovación. De especias asiáticas refinadas a mariscos mediterráneos, de creaciones de carne a la parrilla con influencias de Oriente Medio a postres refinados de cocinas conventuales y pastelería mundial. Ofrecemos una experiencia sabrosa que conecta culturas y estimula tus sentidos con color, aroma y presentación.',
    'menu.download': 'Menú PDF',
    'menu.downloadText': 'Haz clic para descargar nuestro menú completo en PDF',
    'menu.photoPlaceholder': 'Foto del Menú',
    'menu.portugueseCuisine': 'Cocina Portuguesa',
    'menu.authenticCuisine': 'Cocina Portuguesa Auténtica',
    'menu.freshSeafood': 'Mariscos Frescos',
    'menu.traditionalMeat': 'Platos de Carne Tradicionales',
    'menu.homemadeIceCream': 'Helado Casero',
    'menu.portugueseWines': 'Vinos Portugueses y Cervezas Belgas',
    'menu.downloadPdf': 'Descargar',
    'gallery.title': 'Galería',
    'gallery.subtitle': 'Momentos Especiales en Amor Meco',
    'gallery.description':
      'Explora nuestra galería de fotos y descubre la atmósfera única de Amor Meco.',
    'gallery.image1.alt': 'Interior del restaurante',
    'gallery.image1.title': 'Ambiente Acogedor',
    'gallery.image2.alt': 'Cocina portuguesa',
    'gallery.image2.title': 'Cocina Portuguesa',
    'gallery.image3.alt': 'Experiencia gastronómica',
    'gallery.image3.title': 'Experiencia Gastronómica',
    'gallery.image4.alt': 'Selección de vinos',
    'gallery.image4.title': 'Selección de Vinos',
    'gallery.image5.alt': 'Chef preparando comida',
    'gallery.image5.title': 'Chef en Acción',
    'gallery.discoverMagic': 'Descubre la magia de la gastronomía portuguesa',
    'events.title': 'Eventos Especiales',
    'events.subtitle': 'Celebra Con Nosotros',
    'events.description':
      'Haz que tu evento especial sea aún más memorable con nuestros servicios de catering personalizados.',
    'events.weddings.title': 'Bodas',
    'events.weddings.description':
      'Para tu día especial ofrecemos lo que deseas, desde recepción hasta cena hasta baile.',
    'events.birthdays.title': 'Cumpleaños',
    'events.birthdays.description':
      'Haz de tu cumpleaños una ocasión memorable con nuestros menús especiales.',
    'events.corporate.title': 'Eventos Corporativos',
    'events.corporate.description':
      'Reuniones y eventos corporativos con menús profesionales y espacios adecuados.',
    'events.bookNow': 'Reservar Ahora',
    'events.contactUs':
      'Contáctanos para discutir tus necesidades y crear una experiencia única.',
    'events.privateDining.title': 'Cena Privada',
    'events.privateDining.description':
      'Ya sea una reunión o tu día especial: organizamos todo a medida - del menú a la música y ambiente.',
    'events.liveMusic.title': 'Eventos de Música en Vivo',
    'events.liveMusic.description':
      'Para más información síguenos en Instagram y Facebook. Si tienes una idea divertida y necesitas un lugar para ello, no dudes en contactarnos.',
    'events.weddingReceptions.title': 'Recepciones de Boda',
    'events.weddingReceptions.description':
      'Celebra tu día especial con cocina portuguesa auténtica',
    'events.corporateEvents.title': 'Eventos Corporativos',
    'events.corporateEvents.description':
      'Reuniones de negocios y eventos corporativos con catering',
    'reservations.title': 'Reservas',
    'reservations.subtitle': 'Reserva Tu Mesa',
    'reservations.description':
      'Asegura tu mesa en Amor Meco y prepárate para una experiencia gastronómica inolvidable.',
    'reservations.bookNow': 'Reservar Ahora',
    'reservations.contactUs': 'Contáctanos',
    'reservations.available': 'Reservas disponibles para almuerzo y cena',
    'reservations.hours': 'Almuerzo: 12:00 - 15:00 | Cena: 18:00 - 23:00',
    'reservations.groups': 'Grupos hasta 50 personas',
    'reservations.callToReserve': 'Llamar para Reservar',
    'reservations.emailUs': 'Enviar Email',
    'reservations.bookYourTable': 'Reserva Tu Mesa',
    'reservations.date': 'Fecha',
    'reservations.time': 'Hora',
    'reservations.guests': 'Invitados',
    'reservations.guest': 'Invitado',
    'reservations.specialRequests': 'Peticiones Especiales',
    'reservations.none': 'Ninguno',
    'reservations.windowSeat': 'Asiento junto a la Ventana',
    'reservations.quietArea': 'Área Tranquila',
    'reservations.highChair': 'Silla Alta',
    'reservations.wheelchairAccessible': 'Acceso para Silla de Ruedas',
    'reservations.anniversary': 'Aniversario de Boda',
    'reservations.birthday': 'Cumpleaños',
    'reservations.name': 'Nombre',
    'reservations.namePlaceholder': 'Su nombre completo',
    'reservations.email': 'Email',
    'reservations.emailPlaceholder': 'su.email@ejemplo.com',
    'reservations.phone': 'Teléfono',
    'reservations.phonePlaceholder': '+351 XXXXXXX',
    'reservations.confirmReservation': 'Confirmar Reserva',
    'reservations.heldFor': 'Las reservas se mantienen por 15 minutos',
    'reservations.cancellations':
      'Cancelaciones: 24 horas de anticipación requerida',
    'about.title': 'Sobre Nosotros',
    'about.subtitle': 'Nuestra Historia',
    'about.story1':
      'Olá, hello, hallo 👋',
    'about.story2':
      'Somos Killian y Amorion, hombre belga y mujer holandesa. Ambos estábamos enamorados de Portugal antes de enamorarnos el uno del otro. Creemos en el eslogan "el amor pasa por el estómago" y una experiencia así es mejor con las personas que amas, "compartir es cuidar".',
    'about.values.title': 'Nuestros Valores',
    'about.values.passion.title': 'Pasión por la Comida',
    'about.values.passion.description':
      'Cada plato se elabora con amor y respeto por la cocina tradicional portuguesa.',
    'about.values.excellence.title': 'Excelencia',
    'about.values.excellence.description':
      'Nos esforzamos por la excelencia en todos los aspectos de nuestro servicio y ofertas culinarias.',
    'about.values.community.title': 'Comunidad',
    'about.values.community.description':
      'Construir relaciones duraderas con nuestros invitados y comunidad local.',
    'about.values.innovation.title': 'Innovación',
    'about.values.innovation.description':
      'Combinar técnicas tradicionales con innovación culinaria moderna.',
    'about.ourStory': 'Nuestra Historia',
    'about.story3':
      'Amor es un restaurante donde los platos compartidos son centrales y queremos ofrecer una experiencia excepcional para la paleta de sabores y la convivialidad. Nos encanta reunir personas, organizar eventos es lo que nos unió y lo que nos encanta hacer. Para grandes y pequeños, a medida y para todos: músicos, cumpleañeros o simplemente una buena reunión. Contáctanos y haremos algo inolvidable.',
    'about.ourPhilosophy': 'Nuestra Filosofía',
    'about.philosophyDescription':
      'En Amor Meco, creemos que la buena comida es más que solo sabor—es una experiencia que une a las personas. Nuestra filosofía se centra en tres principios fundamentales: autenticidad, calidad y hospitalidad.',
    'about.authenticity': 'Autenticidad',
    'about.authenticityDescription':
      'Nos mantenemos fieles a nuestras recetas y métodos de cocina, preservando los sabores auténticos.',
    'about.quality': 'Calidad',
    'about.qualityDescription':
      'Aprovisionamos solo los mejores ingredientes, trabajando con productores locales y seleccionando productos premium para garantizar calidad excepcional en cada plato.',
    'about.hospitality': 'Hospitalidad',
    'about.hospitalityDescription':
      'Tratamos a cada invitado como familia, creando una atmósfera cálida y acogedora donde se crean recuerdos y se celebran tradiciones.',
    'about.team.title': 'Nuestro Equipo',
    'about.team.subtitle': 'Chefs Dedicados',
    'contact.title': 'Contacto',
    'contact.subtitle': 'Ponte en Contacto',
    'footer.opening': 'Horario de Apertura',
    'footer.address': 'Dirección',
    'footer.phone': 'Teléfono',
    'footer.email': 'Email',
    'footer.tagline':
      'Experimenta los sabores auténticos en cada plato. Donde la tradición se encuentra con la innovación en un ambiente cálido y acogedor.',
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
    // Reviews Section
    'reviews.title': 'Reseñas de Clientes',
    'reviews.subtitle': 'Lo Que Dicen Sobre Nosotros',
    'reviews.averageRating': 'Calificación Promedio',
    'reviews.stars': 'estrellas',
    'reviews.basedOn': 'basado en',
    'reviews.reviews': 'reseñas',
    'reviews.joinSatisfiedCustomers':
      'Únase a nuestros clientes satisfechos y descubra la magia de la gastronomía portuguesa.',
    'reviews.makeReservation': 'Hacer Reserva',
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
    'contact.phone': 'Teléfono',
    'contact.subject': 'Asunto',
    'contact.message': 'Mensaje',
    'contact.sendMessage': 'Enviar Mensaje',
    'contact.sending': 'Enviando...',
    'contact.successMessage': '¡Mensaje enviado con éxito!',
    'contact.errorMessage':
      'Por favor, revise el formulario e inténtelo de nuevo.',
    'contact.submissionError':
      'Error al enviar mensaje. Inténtelo de nuevo más tarde.',
    'contact.sendUsMessage': 'Envíenos un Mensaje',
    'contact.namePlaceholder': 'Su nombre',
    'contact.emailPlaceholder': 'su.email@ejemplo.com',
    'contact.optional': 'Opcional',
    'contact.phonePlaceholder': '+351 123 456 789 (opcional)',
    'contact.subjectPlaceholder': '¿De qué se trata?',
    'contact.messagePlaceholder': 'Díganos cómo podemos ayudarle...',
    'contact.getInTouch': 'Póngase en Contacto',
    'contact.address': 'Dirección',
    'contact.openingHours': 'Horario de Apertura',
    'contact.followUs': 'Síganos',
    'contact.facebook': 'Facebook',
    'contact.instagram': 'Instagram',
    'contact.findUs': 'Encuéntrenos',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.de': 'Deutsch',
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
    // Opening Hours
    'contact.openingHours.mondayTuesday': 'Lunes - Martes',
    'contact.openingHours.wednesdaySaturday': 'Miércoles - Sábado',
    'contact.openingHours.sunday': 'Domingo',
    'contact.openingHours.closed': 'Cerrado',
    'contact.openingHours.lunchDinner': '12:00 - 15:00, 18:00 - 23:00',
    'contact.openingHours.sundayHours': '12:00 - 15:00, 18:00 - 22:00',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.menu': 'Menu',
    'nav.gallery': 'Galerie',
    'nav.reservations': 'Réservations',
    'nav.events': 'Événements',
    'nav.contact': 'Contact',
    'nav.about': 'À Propos',
    'nav.language': 'Langue',
    'nav.theme': 'Thème',
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Découvrez les Saveurs Authentiques',
    'hero.description': 'Goûter ensemble c\'est profiter ensemble',
    'hero.reserve': 'Faire une Réservation',
    'hero.viewMenu': 'Voir le Menu',
    'menu.title': 'Notre Menu',
    'menu.subtitle': 'Saveurs Traditionnelles avec une Touche Moderne',
    'menu.description':
      'Faites un voyage culinaire autour du monde plein de surprises. Découvrez une explosion de saveurs internationales, où chaque plat est une œuvre d\'art pour les yeux et raconte une histoire de tradition et d\'innovation. Des épices asiatiques raffinées aux fruits de mer méditerranéens, des créations de viande grillée avec des influences du Moyen-Orient aux desserts raffinés des cuisines conventuelles et de la pâtisserie mondiale. Nous offrons une expérience savoureuse qui connecte les cultures et stimule vos sens avec la couleur, l\'arôme et la présentation.',
    'menu.download': 'Le Menu PDF',
    'menu.downloadText': 'Cliquez pour télécharger notre menu complet en PDF',
    'menu.photoPlaceholder': 'Photo du Menu',
    'menu.portugueseCuisine': 'Cuisine Portugaise',
    'menu.authenticCuisine': 'Cuisine Portugaise Authentique',
    'menu.freshSeafood': 'Fruits de Mer Frais',
    'menu.traditionalMeat': 'Plats de Viande Traditionnels',
    'menu.homemadeIceCream': 'Glace Maison',
    'menu.portugueseWines': 'Vins Portugais et Bières Belges',
    'menu.downloadPdf': 'Télécharger',
    'gallery.title': 'Galerie',
    'gallery.subtitle': 'Moments Spéciaux chez Amor Meco',
    'gallery.description':
      "Explorez notre galerie de photos et découvrez l'atmosphère unique d'Amor Meco.",
    'gallery.image1.alt': 'Intérieur du restaurant',
    'gallery.image1.title': 'Ambiance Accueillante',
    'gallery.image2.alt': 'Cuisine portugaise',
    'gallery.image2.title': 'Cuisine Portugaise',
    'gallery.image3.alt': 'Expérience gastronomique',
    'gallery.image3.title': 'Expérience Gastronomique',
    'gallery.image4.alt': 'Sélection de vins',
    'gallery.image4.title': 'Sélection de Vins',
    'gallery.image5.alt': 'Chef préparant la nourriture',
    'gallery.image5.title': 'Chef en Action',
    'gallery.discoverMagic': 'Découvrez la magie de la gastronomie portugaise',
    'events.title': 'Événements Spéciaux',
    'events.subtitle': 'Célébrez Avec Nous',
    'events.description':
      'Rendez votre événement spécial encore plus mémorable avec nos services de restauration personnalisés.',
    'events.weddings.title': 'Mariages',
    'events.weddings.description':
      'Pour votre jour spécial nous offrons ce que vous désirez, de la réception au dîner à la danse.',
    'events.birthdays.title': 'Anniversaires',
    'events.birthdays.description':
      'Faites de votre anniversaire une occasion mémorable avec nos menus spéciaux.',
    'events.corporate.title': "Événements d'Entreprise",
    'events.corporate.description':
      "Réunions et événements d'entreprise avec des menus professionnels et des espaces appropriés.",
    'events.bookNow': 'Réserver Maintenant',
    'events.contactUs':
      'Contactez-nous pour discuter de vos besoins et créer une expérience unique.',
    'events.privateDining.title': 'Dîner Privé',
    'events.privateDining.description':
      'Que ce soit une réunion ou votre jour spécial: nous organisons tout sur mesure - du menu à la musique et l\'ambiance.',
    'events.liveMusic.title': 'Événements de Musique Live',
    'events.liveMusic.description':
      'Pour plus d\'informations suivez-nous sur Instagram et Facebook. Si vous avez une idée amusante et avez besoin d\'un lieu, n\'hésitez pas à nous contacter.',
    'events.weddingReceptions.title': 'Réceptions de Mariage',
    'events.weddingReceptions.description':
      'Célébrez votre jour spécial avec une cuisine portugaise authentique',
    'events.corporateEvents.title': "Événements d'Entreprise",
    'events.corporateEvents.description':
      "Réunions d'affaires et événements d'entreprise avec restauration",
    'reservations.title': 'Réservations',
    'reservations.subtitle': 'Réservez Votre Table',
    'reservations.description':
      'Assurez-vous une table chez Amor Meco et préparez-vous pour une expérience gastronomique inoubliable.',
    'reservations.bookNow': 'Réserver Maintenant',
    'reservations.contactUs': 'Contactez-nous',
    'reservations.available':
      'Réservations disponibles pour le déjeuner et le dîner',
    'reservations.hours': 'Déjeuner: 12:00 - 15:00 | Dîner: 18:00 - 23:00',
    'reservations.groups': "Groupes jusqu'à 50 personnes",
    'reservations.callToReserve': 'Appeler pour Réserver',
    'reservations.emailUs': 'Nous Envoyer un Email',
    'reservations.bookYourTable': 'Réservez Votre Table',
    'reservations.date': 'Date',
    'reservations.time': 'Heure',
    'reservations.guests': 'Invités',
    'reservations.guest': 'Invité',
    'reservations.specialRequests': 'Demandes Spéciales',
    'reservations.none': 'Aucune',
    'reservations.windowSeat': 'Place à la Fenêtre',
    'reservations.quietArea': 'Zone Calme',
    'reservations.highChair': 'Chaise Haute',
    'reservations.wheelchairAccessible': 'Accessible en Fauteuil Roulant',
    'reservations.anniversary': 'Anniversaire de Mariage',
    'reservations.birthday': 'Anniversaire',
    'reservations.name': 'Nom',
    'reservations.namePlaceholder': 'Votre nom complet',
    'reservations.email': 'Email',
    'reservations.emailPlaceholder': 'votre.email@exemple.com',
    'reservations.phone': 'Téléphone',
    'reservations.phonePlaceholder': '+351 XXXXXXX',
    'reservations.confirmReservation': 'Confirmer la Réservation',
    'reservations.heldFor':
      'Les réservations sont maintenues pendant 15 minutes',
    'reservations.cancellations': 'Annulations: 24 heures de préavis requises',
    'about.title': 'À Propos de Nous',
    'about.subtitle': 'Notre Histoire',
    'about.story1':
      'Olá, hello, hallo 👋',
    'about.story2':
      'Nous sommes Killian et Amorion, homme belge et femme néerlandaise. Nous étions tous les deux amoureux du Portugal avant de tomber amoureux l\'un de l\'autre. Nous croyons au slogan "l\'amour passe par l\'estomac" et une telle expérience est meilleure avec les personnes que vous aimez, "partager c\'est prendre soin".',
    'about.values.title': 'Nos Valeurs',
    'about.values.passion.title': 'Passion pour la Nourriture',
    'about.values.passion.description':
      'Chaque plat est créé avec amour et respect pour la cuisine traditionnelle portugaise.',
    'about.values.excellence.title': 'Excellence',
    'about.values.excellence.description':
      "Nous visons l'excellence dans tous les aspects de notre service et de nos offres culinaires.",
    'about.values.community.title': 'Communauté',
    'about.values.community.description':
      'Construire des relations durables avec nos clients et la communauté locale.',
    'about.values.innovation.title': 'Innovation',
    'about.values.innovation.description':
      "Combiner des techniques traditionnelles avec l'innovation culinaire moderne.",
    'about.ourStory': 'Notre Histoire',
    'about.story3':
      'Amor est un restaurant où les plats partagés sont centraux et nous voulons offrir une expérience exceptionnelle pour la palette de saveurs et la convivialité. Nous aimons rassembler les gens, organiser des événements est ce qui nous a rassemblés et ce que nous aimons faire. Pour les grands et les petits, sur mesure et pour tous: musiciens, anniversaires ou simplement une belle réunion. Contactez-nous et nous ferons quelque chose d\'inoubliable.',
    'about.ourPhilosophy': 'Notre Philosophie',
    'about.philosophyDescription':
      "Chez Amor Meco, nous croyons que la bonne nourriture est plus qu'un simple goût—c'est une expérience qui rassemble les gens. Notre philosophie se concentre sur trois principes fondamentaux: authenticité, qualité et hospitalité.",
    'about.authenticity': 'Authenticité',
    'about.authenticityDescription':
      'Nous restons fidèles à nos recettes et méthodes de cuisine, préservant les saveurs authentiques.',
    'about.quality': 'Qualité',
    'about.qualityDescription':
      'Nous nous approvisionnons uniquement avec les meilleurs ingrédients, travaillant avec des producteurs locaux et sélectionnant des produits premium pour assurer une qualité exceptionnelle dans chaque plat.',
    'about.hospitality': 'Hospitalité',
    'about.hospitalityDescription':
      'Nous traitons chaque invité comme de la famille, créant une atmosphère chaleureuse et accueillante où les souvenirs sont créés et les traditions sont célébrées.',
    'about.team.title': 'Notre Équipe',
    'about.team.subtitle': 'Chefs Dévoués',
    'contact.title': 'Contact',
    'contact.subtitle': 'Entrez en Contact',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.subject': 'Sujet',
    'contact.message': 'Message',
    'contact.sendMessage': 'Envoyer le Message',
    'contact.sending': 'Envoi...',
    'contact.successMessage': 'Message envoyé avec succès!',
    'contact.errorMessage': 'Veuillez vérifier le formulaire et réessayer.',
    'contact.submissionError':
      "Échec de l'envoi du message. Veuillez réessayer plus tard.",
    'contact.sendUsMessage': 'Envoyez-nous un Message',
    'contact.namePlaceholder': 'Votre nom',
    'contact.emailPlaceholder': 'votre.email@exemple.com',
    'contact.optional': 'Optionnel',
    'contact.phonePlaceholder': '+351 123 456 789 (optionnel)',
    'contact.subjectPlaceholder': "De quoi s'agit-il?",
    'contact.messagePlaceholder':
      'Dites-nous comment nous pouvons vous aider...',
    'contact.getInTouch': 'Entrez en Contact',
    'contact.address': 'Adresse',
    'contact.openingHours': "Heures d'Ouverture",
    'contact.followUs': 'Suivez-nous',
    'contact.facebook': 'Facebook',
    'contact.instagram': 'Instagram',
    'contact.findUs': 'Trouvez-nous',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.de': 'Deutsch',
    'cookies.title': 'Cookies et Confidentialité',
    'cookies.description':
      'Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez choisir quels cookies accepter.',
    'cookies.accept': 'Tout Accepter',
    'cookies.reject': 'Tout Rejeter',
    'cookies.settings': 'Paramètres',
    'cookies.settingsTitle': 'Paramètres des Cookies',
    'cookies.save': 'Enregistrer',
    'cookies.cancel': 'Annuler',
    'cookies.always': 'Toujours',
    'cookies.essential.title': 'Cookies Essentiels',
    'cookies.essential.description':
      'Nécessaires pour le fonctionnement de base du site web',
    'cookies.analytics.title': "Cookies d'Analyse",
    'cookies.analytics.description':
      'Nous aident à améliorer le site web grâce à des statistiques anonymes',
    'cookies.preferences.title': 'Cookies de Préférences',
    'cookies.preferences.description':
      'Se souviennent de vos choix comme la langue et le thème',
    // Opening Hours
    'contact.openingHours.mondayTuesday': 'Lundi - Mardi',
    'contact.openingHours.wednesdaySaturday': 'Mercredi - Samedi',
    'contact.openingHours.sunday': 'Dimanche',
    'contact.openingHours.closed': 'Fermé',
    'contact.openingHours.lunchDinner': '12:00 - 15:00, 18:00 - 23:00',
    'contact.openingHours.sundayHours': '12:00 - 15:00, 18:00 - 22:00',
    'reviews.title': 'Avis Clients',
    'reviews.subtitle': 'Ce que disent nos clients',
    'reviews.joinSatisfiedCustomers':
      'Rejoignez nos clients satisfaits et découvrez la magie de la gastronomie portugaise.',
    'reviews.makeReservation': 'Faire une Réservation',
    'footer.tagline':
      'Découvrez les saveurs authentiques dans une ambiance chaleureuse et accueillante.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.contactInfo': 'Informations de Contact',
    'footer.openingHours': "Heures d'Ouverture",
    'footer.monday': 'Lundi',
    'footer.tuesday': 'Mardi',
    'footer.wednesday': 'Mercredi',
    'footer.thursday': 'Jeudi',
    'footer.friday': 'Vendredi',
    'footer.saturday': 'Samedi',
    'footer.sunday': 'Dimanche',
    'footer.closed': 'Fermé',
    'footer.copyright': '© {year} Restaurant Amor Meco. Tous droits réservés.',
    'footer.privacy': 'Datenschutz & Cookie-Richtlinie',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.cookies': 'Cookie-Richtlinie',
    'footer.address': 'Adresse',
    'footer.phone': 'Telefon',
    'footer.email': 'Email',
    'footer.opening': 'Öffnungszeiten',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.menu': 'Menü',
    'nav.gallery': 'Galerie',
    'nav.reservations': 'Reservierungen',
    'nav.events': 'Veranstaltungen',
    'nav.contact': 'Kontakt',
    'nav.about': 'Über Uns',
    'nav.language': 'Sprache',
    'nav.theme': 'Thema',
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Entdecken Sie Authentische Aromen',
    'hero.description': 'Zusammen schmecken ist zusammen genießen',
    'hero.reserve': 'Reservierung Machen',
    'hero.viewMenu': 'Menü Anzeigen',
    'menu.title': 'Unser Menü',
    'menu.subtitle': 'Traditionelle Aromen mit Modernem Twist',
    'menu.description':
      'Machen Sie eine kulinarische Weltreise voller Überraschungen. Entdecken Sie eine Explosion internationaler Aromen, wo jedes Gericht ein Kunstwerk für die Augen ist und eine Geschichte von Tradition und Innovation erzählt. Von raffinierten asiatischen Gewürzen bis zu mediterranen Meeresfrüchten, von gegrillten Fleischkreationen mit nahöstlichen Einflüssen bis zu raffinierten Desserts aus Klosterküchen und weltlicher Patisserie. Wir bieten eine geschmackvolle Erfahrung, die Kulturen verbindet und Ihre Sinne mit Farbe, Aroma und Präsentation stimuliert.',
    'menu.download': 'Menü PDF',
    'menu.downloadText':
      'Klicken Sie, um unser vollständiges Menü in PDF herunterzuladen',
    'menu.photoPlaceholder': 'Menü Foto',
    'menu.portugueseCuisine': 'Portugiesische Küche',
    'menu.authenticCuisine': 'Authentische Portugiesische Küche',
    'menu.freshSeafood': 'Frische Meeresfrüchte',
    'menu.traditionalMeat': 'Traditionelle Fleischgerichte',
    'menu.homemadeIceCream': 'Hausgemachtes Eis',
    'menu.portugueseWines': 'Portugiesische Weine & Belgische Biere',
    'menu.downloadPdf': 'Herunterladen',
    'gallery.title': 'Galerie',
    'gallery.subtitle': 'Besondere Momente bei Amor Meco',
    'gallery.description':
      'Entdecken Sie unsere Fotogalerie und die einzigartige Atmosphäre von Amor Meco.',
    'gallery.image1.alt': 'Restaurant Innenraum',
    'gallery.image1.title': 'Einladende Atmosphäre',
    'gallery.image2.alt': 'Portugiesische Küche',
    'gallery.image2.title': 'Portugiesische Küche',
    'gallery.image3.alt': 'Gastronomische Erfahrung',
    'gallery.image3.title': 'Gastronomische Erfahrung',
    'gallery.image4.alt': 'Weinauswahl',
    'gallery.image4.title': 'Weinauswahl',
    'gallery.image5.alt': 'Koch bereitet Essen zu',
    'gallery.image5.title': 'Koch in Aktion',
    'gallery.discoverMagic':
      'Entdecken Sie die Magie der portugiesischen Gastronomie',
    'events.title': 'Besondere Veranstaltungen',
    'events.subtitle': 'Feiern Sie Mit Uns',
    'events.description':
      'Machen Sie Ihr besonderes Ereignis noch unvergesslicher mit unseren personalisierten Catering-Services.',
    'events.weddings.title': 'Hochzeiten',
    'events.weddings.description':
      'Für Ihren besonderen Tag bieten wir was Sie sich wünschen, von Empfang bis Abendessen bis Tanz.',
    'events.birthdays.title': 'Geburtstage',
    'events.birthdays.description':
      'Machen Sie Ihren Geburtstag zu einem unvergesslichen Anlass mit unseren Spezialmenüs.',
    'events.corporate.title': 'Firmenveranstaltungen',
    'events.corporate.description':
      'Meetings und Firmenveranstaltungen mit professionellen Menüs und geeigneten Räumen.',
    'events.bookNow': 'Jetzt Buchen',
    'events.contactUs':
      'Kontaktieren Sie uns, um Ihre Bedürfnisse zu besprechen und eine einzigartige Erfahrung zu schaffen.',
    'events.privateDining.title': 'Privates Diner',
    'events.privateDining.description':
      'Ob es eine Versammlung ist oder Ihr besonderer Tag: wir organisieren alles nach Maß - vom Menü zur Musik und Atmosphäre.',
    'events.liveMusic.title': 'Live-Musik Veranstaltungen',
    'events.liveMusic.description':
      'Für mehr Informationen folgen Sie uns auf Instagram und Facebook. Wenn Sie eine lustige Idee haben und einen Ort dafür brauchen, zögern Sie nicht uns zu kontaktieren.',
    'events.weddingReceptions.title': 'Hochzeitsempfänge',
    'events.weddingReceptions.description':
      'Feiern Sie Ihren besonderen Tag mit authentischer portugiesischer Küche',
    'events.corporateEvents.title': 'Firmenveranstaltungen',
    'events.corporateEvents.description':
      'Geschäftstreffen und Firmenveranstaltungen mit Catering',
    'reservations.title': 'Reservierungen',
    'reservations.subtitle': 'Ihren Tisch Buchen',
    'reservations.description':
      'Sichern Sie sich einen Tisch bei Amor Meco und bereiten Sie sich auf eine unvergessliche gastronomische Erfahrung vor.',
    'reservations.bookNow': 'Jetzt Buchen',
    'reservations.contactUs': 'Kontaktieren Sie Uns',
    'reservations.available':
      'Reservierungen für Mittag- und Abendessen verfügbar',
    'reservations.hours':
      'Mittagessen: 12:00 - 15:00 | Abendessen: 18:00 - 23:00',
    'reservations.groups': 'Gruppen bis zu 50 Personen',
    'reservations.callToReserve': 'Anrufen zum Buchen',
    'reservations.emailUs': 'Uns Email Senden',
    'reservations.bookYourTable': 'Ihren Tisch Buchen',
    'reservations.date': 'Datum',
    'reservations.time': 'Zeit',
    'reservations.guests': 'Gäste',
    'reservations.guest': 'Gast',
    'reservations.specialRequests': 'Besondere Wünsche',
    'reservations.none': 'Keine',
    'reservations.windowSeat': 'Fensterplatz',
    'reservations.quietArea': 'Ruhiger Bereich',
    'reservations.highChair': 'Hochstuhl',
    'reservations.wheelchairAccessible': 'Rollstuhlgerecht',
    'reservations.anniversary': 'Hochzeitstag',
    'reservations.birthday': 'Geburtstag',
    'reservations.name': 'Name',
    'reservations.namePlaceholder': 'Ihr vollständiger Name',
    'reservations.email': 'Email',
    'reservations.emailPlaceholder': 'ihre.email@beispiel.com',
    'reservations.phone': 'Telefon',
    'reservations.phonePlaceholder': '+351 XXXXXXX',
    'reservations.confirmReservation': 'Reservierung Bestätigen',
    'reservations.heldFor': 'Reservierungen werden 15 Minuten gehalten',
    'reservations.cancellations':
      'Stornierungen: 24 Stunden Vorankündigung erforderlich',
    'about.title': 'Über Uns',
    'about.subtitle': 'Unsere Geschichte',
    'about.story1':
      'Olá, hello, hallo 👋',
    'about.story2':
      'Wir sind Killian und Amorion, belgischer Mann und niederländische Frau. Wir waren beide in Portugal verliebt, bevor wir uns ineinander verliebt haben. Wir glauben an den Slogan "Liebe geht durch den Magen" und eine solche Erfahrung ist besser mit den Menschen, die Sie lieben, "Teilen ist Kümmern".',
    'about.values.title': 'Unsere Werte',
    'about.values.passion.title': 'Leidenschaft für Essen',
    'about.values.passion.description':
      'Jedes Gericht wird mit Liebe und Respekt für die traditionelle portugiesische Küche zubereitet.',
    'about.values.excellence.title': 'Exzellenz',
    'about.values.excellence.description':
      'Wir streben nach Exzellenz in allen Aspekten unseres Service und unserer kulinarischen Angebote.',
    'about.values.community.title': 'Gemeinschaft',
    'about.values.community.description':
      'Aufbau dauerhafter Beziehungen zu unseren Gästen und der lokalen Gemeinschaft.',
    'about.values.innovation.title': 'Innovation',
    'about.values.innovation.description':
      'Kombination traditioneller Techniken mit moderner kulinarischer Innovation.',
    'about.ourStory': 'Unsere Geschichte',
    'about.story3':
      'Amor ist ein Restaurant, wo geteilte Gerichte im Zentrum stehen und wir eine außergewöhnliche Erfahrung für die Geschmackspalette und Geselligkeit bieten wollen. Wir lieben es, Menschen zusammenzubringen, Veranstaltungen zu organisieren ist es, was uns zusammengebracht hat und was wir gerne tun. Für groß und klein, maßgeschneidert und für alle: Musiker, Geburtstagskinder oder einfach eine schöne Zusammenkunft. Kontaktieren Sie uns und wir machen etwas Unvergessliches.',
    'about.ourPhilosophy': 'Unsere Philosophie',
    'about.philosophyDescription':
      'Bei Amor Meco glauben wir, dass gutes Essen mehr ist als nur Geschmack—es ist eine Erfahrung, die Menschen zusammenbringt. Unsere Philosophie konzentriert sich auf drei Grundprinzipien: authenticiteit, kwaliteit en gastvrijheid.',
    'about.authenticity': 'Authenticiteit',
    'about.authenticityDescription':
      'We blijven trouw aan onze recepten en kookmethoden, en behouden de authentieke smaken.',
    'about.quality': 'Kwaliteit',
    'about.qualityDescription':
      'We kopen alleen de beste ingrediënten in, werken samen met lokale producenten en selecteren premium producten om uitzonderlijke kwaliteit in elk gerecht te garanderen. ',
    'about.hospitality': 'Gastvrijheid',
    'about.hospitalityDescription':
      'We behandelen elke gast als familie, creëren een warme en gastvrije sfeer waar herinneringen worden gemaakt en tradities worden gevierd.',
    'about.team.title': 'Ons Team',
    'about.team.subtitle': 'Toegewijde Chefs',
    'contact.title': 'Contact',
    'contact.subtitle': 'Toegang tot Contact',
    'contact.name': 'Naam',
    'contact.email': 'Email',
    'contact.phone': 'Telefoon',
    'contact.subject': 'Onderwerp',
    'contact.message': 'Bericht',
    'contact.sendMessage': 'Bericht Versturen',
    'contact.sending': 'Versturen...',
    'contact.successMessage': 'Bericht succesvol verzonden!',
    'contact.errorMessage': 'Controleer het formulier en probeer het opnieuw.',
    'contact.submissionError':
      "Échec de l'envoi du message. Veuillez réessayer plus tard.",
    'contact.sendUsMessage': 'Stuur ons een Bericht',
    'contact.namePlaceholder': 'Uw naam',
    'contact.emailPlaceholder': 'uw.email@voorbeeld.com',
    'contact.optional': 'Optioneel',
    'contact.phonePlaceholder': '+351 123 456 789 (optioneel)',
    'contact.subjectPlaceholder': 'Wat gaat het over?',
    'contact.messagePlaceholder': 'Vertel ons hoe we u kunnen helpen...',
    'contact.getInTouch': 'Neem Contact Op',
    'contact.address': 'Adres',
    'contact.openingHours': 'Openingstijden',
    'contact.followUs': 'Volg Ons',
    'contact.facebook': 'Facebook',
    'contact.instagram': 'Instagram',
    'contact.findUs': 'Vind Ons',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
    'language.fr': 'Français',
    'language.de': 'Deutsch',
    'cookies.title': 'Cookies & Datenschutz',
    'cookies.description':
      'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Sie können wählen, welche Cookies Sie akzeptieren.',
    'cookies.accept': 'Alle Akzeptieren',
    'cookies.reject': 'Alle Ablehnen',
    'cookies.settings': 'Einstellungen',
    'cookies.settingsTitle': 'Cookie-Einstellungen',
    'cookies.save': 'Speichern',
    'cookies.cancel': 'Abbrechen',
    'cookies.always': 'Immer',
    'cookies.essential.title': 'Wesentliche Cookies',
    'cookies.essential.description':
      'Notwendig für die grundlegende Funktionalität der Website',
    'cookies.analytics.title': 'Analyse-Cookies',
    'cookies.analytics.description':
      'Helfen uns, die Website durch anonyme Statistiken zu verbessern',
    'cookies.preferences.title': 'Präferenz-Cookies',
    'cookies.preferences.description':
      'Merken sich Ihre Auswahl wie Sprache und Thema',
    // Opening Hours
    'contact.openingHours.mondayTuesday': 'Montag - Dienstag',
    'contact.openingHours.wednesdaySaturday': 'Mittwoch - Samstag',
    'contact.openingHours.sunday': 'Sonntag',
    'contact.openingHours.closed': 'Geschlossen',
    'contact.openingHours.lunchDinner': '12:00 - 15:00, 18:00 - 23:00',
    'contact.openingHours.sundayHours': '12:00 - 15:00, 18:00 - 22:00',
    'reviews.title': 'Kundenbewertungen',
    'reviews.subtitle': 'Was unsere Kunden sagen',
    'reviews.joinSatisfiedCustomers':
      'Schließen Sie sich unseren zufriedenen Kunden an und entdecken Sie die Magie der portugiesischen Gastronomie.',
    'reviews.makeReservation': 'Reservierung Machen',
    'footer.tagline':
      'Entdecken Sie die authentischen Aromen in einer warmen und einladenden Atmosphäre.',
    'footer.quickLinks': 'Schnelle Links',
    'footer.contactInfo': 'Kontaktinformationen',
    'footer.openingHours': 'Öffnungszeiten',
    'footer.monday': 'Montag',
    'footer.tuesday': 'Dienstag',
    'footer.wednesday': 'Mittwoch',
    'footer.thursday': 'Donnerstag',
    'footer.friday': 'Freitag',
    'footer.saturday': 'Samstag',
    'footer.sunday': 'Sonntag',
    'footer.closed': 'Geschlossen',
    'footer.copyright':
      '© {year} Restaurant Amor Meco. Alle Rechte vorbehalten.',
    'footer.privacy': 'Datenschutz & Cookie-Richtlinie',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.cookies': 'Cookie-Richtlinie',
    'footer.address': 'Adresse',
    'footer.phone': 'Telefon',
    'footer.email': 'Email',
    'footer.opening': 'Öffnungszeiten',
  },
};

export function LanguageProvider({ 
  children, 
  initialLanguage 
}: { 
  children: React.ReactNode
  initialLanguage?: string 
}) {
  const [language, setLanguageState] = useState<Language>((initialLanguage as Language) || 'pt')
  const [mounted, setMounted] = useState(false);
  const { preferences, isLoaded } = useCookiePreferences();

  useEffect(() => {
    setMounted(true);
    // Only load saved language if preferences cookies are allowed
    if (isLoaded && preferences) {
      if (preferences.preferences) {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (
          savedLanguage &&
          ['pt', 'nl', 'en', 'es', 'fr', 'de'].includes(savedLanguage)
        ) {
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
    <LanguageContext.Provider value={{ language, setLanguage, t, mounted }}>
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
