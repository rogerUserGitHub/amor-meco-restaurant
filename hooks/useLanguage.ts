import { useState, useEffect, useCallback } from 'react';

type Language = 'pt' | 'nl' | 'en' | 'es';

// Translation data
const translations = {
  pt: {
    'nav.menu': 'Menu',
    'nav.gallery': 'Galeria',
    'nav.reservations': 'Reservas',
    'nav.events': 'Eventos',
    'nav.contact': 'Contacto',
    'nav.about': 'Sobre',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
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
    // Hero Section
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Experiência Gastronómica Única',
    'hero.description': 'Descubra os sabores autênticos da cozinha portuguesa',
    'hero.reserve': 'Fazer Reserva',
    'hero.viewMenu': 'Ver Menu',
    // Menu Section
    'menu.title': 'O Nosso Menu',
    'menu.subtitle': 'Sabores Tradicionais com Toque Moderno',
    'menu.description':
      'Descubra os sabores únicos da gastronomia portuguesa, onde cada prato conta uma história de tradição e inovação. Dos frescos frutos do mar às carnes grelhadas, passando pelos doces conventuais, oferecemos uma experiência culinária que celebra a rica herança gastronómica de Portugal.',
    'menu.download': 'Descarregar Menu PDF',
    'menu.downloadText': 'Clique para descarregar o nosso menu completo em PDF',
    // About Section
    'about.title': 'Sobre Nós',
    'about.subtitle': 'A Nossa História',
    'about.story1':
      'Fundado em 2010, o Amor Meco nasceu da paixão pela gastronomia portuguesa e do desejo de partilhar os sabores autênticos de Portugal com o mundo. O nosso restaurante é mais do que um local para comer - é um espaço onde a tradição se encontra com a inovação.',
    'about.story2':
      'Cada prato conta uma história, desde os frescos frutos do mar da costa portuguesa até aos vinhos regionais cuidadosamente selecionados. A nossa equipa de chefs combina técnicas tradicionais com apresentações modernas, criando uma experiência culinária única.',
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
    'about.team.title': 'A Nossa Equipa',
    'about.team.subtitle': 'Chefs Dedicados',
    // Reservations Section
    'reservations.title': 'Reservas',
    'reservations.subtitle': 'Reserve a Sua Mesa',
    'reservations.description':
      'Garanta a sua mesa no Amor Meco e prepare-se para uma experiência gastronómica inesquecível.',
    'reservations.bookNow': 'Reservar Agora',
    'reservations.contactUs': 'Contacte-nos',
    // Events Section
    'events.title': 'Eventos Especiais',
    'events.subtitle': 'Celebre Conosco',
    'events.description':
      'Torne o seu evento especial ainda mais memorável com os nossos serviços de catering personalizados.',
    'events.weddings.title': 'Casamentos',
    'events.weddings.description':
      'Celebre o seu dia especial com um menu personalizado e serviço dedicado.',
    'events.birthdays.title': 'Aniversários',
    'events.birthdays.description':
      'Faça do seu aniversário uma ocasião memorável com os nossos menus especiais.',
    'events.corporate.title': 'Eventos Corporativos',
    'events.corporate.description':
      'Reuniões e eventos de empresa com menus profissionais e espaços adequados.',
    'events.bookNow': 'Reservar Agora',
    'events.contactUs':
      'Contacte-nos para discutir as suas necessidades e criar uma experiência única.',
    // Gallery Section
    'gallery.title': 'Galeria',
    'gallery.subtitle': 'Momentos Especiais no Amor Meco',
    'gallery.description':
      'Explore a nossa galeria de imagens e descubra a atmosfera única do Amor Meco.',
    // Reviews Section
    'reviews.title': 'Avaliações dos Clientes',
    'reviews.subtitle': 'O Que Dizem Sobre Nós',
    'reviews.averageRating': 'Avaliação Média',
    'reviews.stars': 'estrelas',
    'reviews.basedOn': 'baseado em',
    'reviews.reviews': 'avaliações',
    // Footer Section
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
    'footer.address': 'Morada',
    'footer.phone': 'Telefone',
    'footer.email': 'Email',
    'footer.opening': 'Horário de Funcionamento',
  },
  nl: {
    'nav.menu': 'Menu',
    'nav.gallery': 'Galerij',
    'nav.reservations': 'Reserveringen',
    'nav.events': 'Evenementen',
    'nav.contact': 'Contact',
    'nav.about': 'Over Ons',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
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
    // Hero Section
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Unieke Gastronomische Ervaring',
    'hero.description': 'Ontdek de authentieke smaken van de Portugese keuken',
    'hero.reserve': 'Reserveren',
    'hero.viewMenu': 'Menu Bekijken',
    // Menu Section
    'menu.title': 'Onze Menu',
    'menu.subtitle': 'Traditionele Smaken met Moderne Twist',
    'menu.description':
      'Ontdek de unieke smaken van de Portugese gastronomie, waar elk gerecht een verhaal vertelt van traditie en innovatie. Van verse zeevruchten tot gegrilde vleesgerechten, en van kloosterdesserts, bieden we een culinaire ervaring die de rijke gastronomische erfenis van Portugal viert.',
    'menu.download': 'Menu PDF Downloaden',
    'menu.downloadText': 'Klik om ons volledige menu in PDF te downloaden',
    // About Section
    'about.title': 'Over Ons',
    'about.subtitle': 'Onze Geschiedenis',
    'about.story1':
      'Opgericht in 2010, werd Amor Meco geboren uit een passie voor Portugese gastronomie en de wens om de authentieke smaken van Portugal met de wereld te delen. Ons restaurant is meer dan een plek om te eten - het is een ruimte waar traditie innovatie ontmoet.',
    'about.story2':
      'Elk gerecht vertelt een verhaal, van verse zeevruchten van de Portugese kust tot zorgvuldig geselecteerde regionale wijnen. Ons team van chefs combineert traditionele technieken met moderne presentaties, wat resulteert in een unieke culinaire ervaring.',
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
    'about.team.title': 'Ons Team',
    'about.team.subtitle': 'Toegewijde Chefs',
    // Reservations Section
    'reservations.title': 'Reserveringen',
    'reservations.subtitle': 'Reserveer Uw Tafel',
    'reservations.description':
      'Zorg ervoor dat u een tafel heeft bij Amor Meco en bereid u voor op een onvergetelijke gastronomische ervaring.',
    'reservations.bookNow': 'Nu Reserveren',
    'reservations.contactUs': 'Neem Contact Op',
    // Events Section
    'events.title': 'Speciale Evenementen',
    'events.subtitle': 'Vier Met Ons',
    'events.description':
      'Maak uw speciale evenement nog memorabeler met onze gepersonaliseerde cateringdiensten.',
    'events.weddings.title': 'Trouwerijen',
    'events.weddings.description':
      'Vier uw speciale dag met een gepersonaliseerd menu en toegewijde service.',
    'events.birthdays.title': 'Verjaardagen',
    'events.birthdays.description':
      "Maak van uw verjaardag een memorabele gelegenheid met onze speciale menu's.",
    'events.corporate.title': 'Zakelijke Evenementen',
    'events.corporate.description':
      "Vergaderingen en zakelijke evenementen met professionele menu's en geschikte ruimtes.",
    'events.bookNow': 'Nu Reserveren',
    'events.contactUs':
      'Neem contact met ons op om uw behoeften te bespreken en een unieke ervaring te creëren.',
    // Gallery Section
    'gallery.title': 'Galerij',
    'gallery.subtitle': 'Speciale Momenten bij Amor Meco',
    'gallery.description':
      'Verken onze fotogalerij en ontdek de unieke sfeer van Amor Meco.',
    // Reviews Section
    'reviews.title': 'Klantbeoordelingen',
    'reviews.subtitle': 'Wat Ze Over Ons Zeggen',
    'reviews.averageRating': 'Gemiddelde Beoordeling',
    'reviews.stars': 'sterren',
    'reviews.basedOn': 'gebaseerd op',
    'reviews.reviews': 'beoordelingen',
    // Footer Section
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
    'footer.address': 'Adres',
    'footer.phone': 'Telefoon',
    'footer.email': 'E-mail',
    'footer.opening': 'Openingstijden',
  },
  en: {
    'nav.menu': 'Menu',
    'nav.gallery': 'Gallery',
    'nav.reservations': 'Reservations',
    'nav.events': 'Events',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
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
    // Hero Section
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Unique Gastronomic Experience',
    'hero.description': 'Discover the authentic flavors of Portuguese cuisine',
    'hero.reserve': 'Make Reservation',
    'hero.viewMenu': 'View Menu',
    // Menu Section
    'menu.title': 'Our Menu',
    'menu.subtitle': 'Traditional Flavors with Modern Twist',
    'menu.description':
      'Discover the unique flavors of Portuguese gastronomy, where each dish tells a story of tradition and innovation. From fresh seafood to grilled meats, and convent desserts, we offer a culinary experience that celebrates the rich gastronomic heritage of Portugal.',
    'menu.download': 'Download Menu PDF',
    'menu.downloadText': 'Click to download our complete menu in PDF',
    // About Section
    'about.title': 'About Us',
    'about.subtitle': 'Our Story',
    'about.story1':
      'Founded in 2010, Amor Meco was born from a passion for Portuguese gastronomy and the desire to share the authentic flavors of Portugal with the world. Our restaurant is more than a place to eat - it is a space where tradition meets innovation.',
    'about.story2':
      'Each dish tells a story, from the fresh seafood of the Portuguese coast to carefully selected regional wines. Our team of chefs combines traditional techniques with modern presentations, creating a unique culinary experience.',
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
    'about.team.title': 'Our Team',
    'about.team.subtitle': 'Dedicated Chefs',
    // Reservations Section
    'reservations.title': 'Reservations',
    'reservations.subtitle': 'Book Your Table',
    'reservations.description':
      'Secure your table at Amor Meco and prepare for an unforgettable gastronomic experience.',
    'reservations.bookNow': 'Book Now',
    'reservations.contactUs': 'Contact Us',
    // Events Section
    'events.title': 'Special Events',
    'events.subtitle': 'Celebrate With Us',
    'events.description':
      'Make your special event even more memorable with our personalized catering services.',
    'events.weddings.title': 'Weddings',
    'events.weddings.description':
      'Celebrate your special day with a personalized menu and dedicated service.',
    'events.birthdays.title': 'Birthdays',
    'events.birthdays.description':
      'Make your birthday a memorable occasion with our special menus.',
    'events.corporate.title': 'Corporate Events',
    'events.corporate.description':
      'Meetings and corporate events with professional menus and suitable spaces.',
    'events.bookNow': 'Book Now',
    'events.contactUs':
      'Contact us to discuss your needs and create a unique experience.',
    // Gallery Section
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Special Moments at Amor Meco',
    'gallery.description':
      'Explore our photo gallery and discover the unique atmosphere of Amor Meco.',
    // Reviews Section
    'reviews.title': 'Customer Reviews',
    'reviews.subtitle': 'What They Say About Us',
    'reviews.averageRating': 'Average Rating',
    'reviews.stars': 'stars',
    'reviews.basedOn': 'based on',
    'reviews.reviews': 'reviews',
    // Footer Section
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
    'footer.address': 'Address',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.opening': 'Opening Hours',
  },
  es: {
    'nav.menu': 'Menú',
    'nav.gallery': 'Galería',
    'nav.reservations': 'Reservas',
    'nav.events': 'Eventos',
    'nav.contact': 'Contacto',
    'nav.about': 'Sobre Nosotros',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
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
      'Por favor, verifique el formulario e inténtelo de nuevo.',
    'contact.submissionError':
      'Error al enviar mensaje. Inténtelo de nuevo más tarde.',
    // Hero Section
    'hero.title': 'Amor Meco',
    'hero.subtitle': 'Experiencia Gastronómica Única',
    'hero.description':
      'Descubre los sabores auténticos de la cocina portuguesa',
    'hero.reserve': 'Hacer Reserva',
    'hero.viewMenu': 'Ver Menú',
    // Menu Section
    'menu.title': 'Nuestro Menú',
    'menu.subtitle': 'Sabores Tradicionales con Toque Moderno',
    'menu.description':
      'Descubre los sabores únicos de la gastronomía portuguesa, donde cada plato cuenta una historia de tradición e innovación. Desde mariscos frescos hasta carnes a la parrilla, y postres conventuales, ofrecemos una experiencia culinaria que celebra la rica herencia gastronómica de Portugal.',
    'menu.download': 'Descargar Menú PDF',
    'menu.downloadText': 'Haz clic para descargar nuestro menú completo en PDF',
    // About Section
    'about.title': 'Sobre Nosotros',
    'about.subtitle': 'Nuestra Historia',
    'about.story1':
      'Fundado en 2010, Amor Meco nació de la pasión por la gastronomía portuguesa y el deseo de compartir los sabores auténticos de Portugal con el mundo. Nuestro restaurante es más que un lugar para comer - es un espacio donde la tradición se encuentra con la innovación.',
    'about.story2':
      'Cada plato cuenta una historia, desde los frescos mariscos de la costa portuguesa hasta los vinos regionales cuidadosamente seleccionados. Nuestro equipo de chefs combina técnicas tradicionales con presentaciones modernas, creando una experiencia culinaria única.',
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
    'about.team.title': 'Nuestro Equipo',
    'about.team.subtitle': 'Chefs Dedicados',
    // Reservations Section
    'reservations.title': 'Reservas',
    'reservations.subtitle': 'Reserva Tu Mesa',
    'reservations.description':
      'Asegura tu mesa en Amor Meco y prepárate para una experiencia gastronómica inolvidable.',
    'reservations.bookNow': 'Reservar Ahora',
    'reservations.contactUs': 'Contáctanos',
    // Events Section
    'events.title': 'Eventos Especiales',
    'events.subtitle': 'Celebra Con Nosotros',
    'events.description':
      'Haz que tu evento especial sea aún más memorable con nuestros servicios de catering personalizados.',
    'events.weddings.title': 'Bodas',
    'events.weddings.description':
      'Celebra tu día especial con un menú personalizado y servicio dedicado.',
    'events.birthdays.title': 'Cumpleaños',
    'events.birthdays.description':
      'Haz de tu cumpleaños una ocasión memorable con nuestros menús especiales.',
    'events.corporate.title': 'Eventos Corporativos',
    'events.corporate.description':
      'Reuniones y eventos corporativos con menús profesionales y espacios adecuados.',
    'events.bookNow': 'Reservar Ahora',
    'events.contactUs':
      'Contáctanos para discutir tus necesidades y crear una experiencia única.',
    // Gallery Section
    'gallery.title': 'Galería',
    'gallery.subtitle': 'Momentos Especiales en Amor Meco',
    'gallery.description':
      'Explora nuestra galería de fotos y descubre la atmósfera única de Amor Meco.',
    // Reviews Section
    'reviews.title': 'Reseñas de Clientes',
    'reviews.subtitle': 'Lo Que Dicen Sobre Nosotros',
    'reviews.averageRating': 'Calificación Promedio',
    'reviews.stars': 'estrellas',
    'reviews.basedOn': 'basado en',
    'reviews.reviews': 'reseñas',
    // Footer Section
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
    'footer.address': 'Dirección',
    'footer.phone': 'Teléfono',
    'footer.email': 'Email',
    'footer.opening': 'Horario de Apertura',
  },
};

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get language from localStorage or default to 'pt'
    const savedLanguage = localStorage.getItem('language') || 'pt';
    setLanguageState(savedLanguage as Language);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Save to localStorage
      localStorage.setItem('language', language);
    }
  }, [language, mounted]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const currentTranslations = translations[language];
      if (!currentTranslations) {
        console.warn(`No translations found for language: ${language}`);
        return key;
      }

      const translation = (currentTranslations as Record<string, string>)[key];
      if (!translation) {
        console.warn(
          `Translation key not found: ${key} for language: ${language}`
        );
        return key;
      }

      return translation;
    },
    [language]
  );

  return { language, setLanguage, t, mounted };
}
// Contact Form Validation Messages
