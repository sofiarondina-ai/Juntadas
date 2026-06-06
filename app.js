/* --------------------------------------------------------------------------
   LÓGICA DE LA APLICACIÓN: JUNTADAS 💜
   -------------------------------------------------------------------------- */

class JuntadasApp {
  constructor() {
    this.state = {
      friends: [],
      juntadas: [],
      availability: {}, // Disponibilidad semanal grupal
      activeFriendId: null, // ID de la amiga que está usando el simulador
      activeJuntadaId: null, // ID de la juntada que se está detallando
      activeJuntadaTab: 'rsvp', // Pestaña activa en detalles (rsvp, fecha, checklist, cuentas)
    };

    // Estado del juego de mesa digital
    this.gamesState = {
      activeGame: null,
      isSpicy: false,
      usedPhrases: {
        'yo-nunca': [],
        'probablemente': [],
        'verdades': [],
        'retos': []
      },
      currentTurnFriendId: null,
      
      // Estado para los juegos de mesa adicionales
      timerInterval: null,
      tabooScore: 0,
      tabooTimer: 60,
      tabooUsed: [],
      tabooCurrentWord: null,
      quienSoyCategory: null,
      quienSoyScore: 0,
      quienSoyTimer: 60,
      quienSoyUsed: [],
      quienSoyCurrentWord: null,
      impostorPlayers: [],
      impostorCurrentPlayerIndex: 0,
      impostorStarterFriendId: null,
      impostorPhase: 'pass',
      isSpinning: false,
      lastSelectedFood: null
    };

    // Base de datos de frases para los juegos
    this.gamesDb = {
      'yo-nunca': [
        "Yo nunca nunca le mandé un mensaje al ex de una amiga.",
        "Yo nunca nunca fingí estar enferma para no ir a una juntada.",
        "Yo nunca nunca me comí un bajón ajeno de la heladera.",
        "Yo nunca nunca busqué mi propio nombre en Google.",
        "Yo nunca nunca stalkeé a mi ex desde una cuenta falsa.",
        "Yo nunca nunca salí de fiesta sin plata y volví habiendo tomado de todo.",
        "Yo nunca nunca me probé ropa en un local, me saqué una foto y me fui sin comprar nada.",
        "Yo nunca nunca mentí en este juego.",
        "Yo nunca nunca lloré en el transporte público escuchando música triste.",
        "Yo nunca nunca mandé un audio criticando a alguien al chat de esa misma persona.",
        "Yo nunca nunca le inventé una mentira a un jefe para faltar a trabajar.",
        "Yo nunca nunca tuve un accidente gracioso con ropa en público.",
        "Yo nunca nunca me olvidé del cumpleaños de una de las que está acá.",
        "Yo nunca nunca tuve un flechazo con el hermano/a de una amiga.",
        "Yo nunca nunca me saqué una selfie llorando.",
        "Yo nunca nunca usé cepillo de dientes ajeno sin avisar."
      ],
      'probablemente': [
        "¿Quién es más probable que se mude a otro país de un día para el otro?",
        "¿Quién es más probable que termine presa por algo absurdo?",
        "¿Quién es más probable que se enamore de un desconocido en el colectivo?",
        "¿Quién es más probable que gaste todo su sueldo en el primer día del mes?",
        "¿Quién es más probable que se olvide las llaves adentro de la casa?",
        "¿Quién es más probable que se ría en un momento totalmente inapropiado?",
        "¿Quién es más probable que gane la lotería y la pierda a la semana siguiente?",
        "¿Quién es más probable que adopte 10 gatos?",
        "¿Quién es más probable que se quede dormida en una fiesta?",
        "¿Quién es más probable que llegue una hora tarde a su propio casamiento?",
        "¿Quién es más probable que se convierta en una influencer famosa?",
        "¿Quién es más probable que empiece a llorar de la nada viendo una película animada?",
        "¿Quién es más probable que organice una juntada y después no tenga ganas de ir?",
        "¿Quién es más probable que envíe un mensaje al grupo equivocado?"
      ],
      'verdades': [
        "¿Cuál es la mentira más grande que le dijiste a tus papás?",
        "¿Qué es lo más ridículo que hiciste por amor o por un capricho?",
        "Si tuvieras que eliminar a una de las presentes del grupo de WhatsApp por un día, ¿a quién elegirías?",
        "¿Qué es lo primero que harías si fueras del sexo opuesto por un día?",
        "¿Cuál es tu peor hábito que nadie o casi nadie conoce?",
        "¿Quién del grupo te cae mejor y por qué? (¡Sin diplomacia!)",
        "¿Cuál fue la última búsqueda vergonzosa que hiciste en tu celular?",
        "¿Alguna vez tuviste un sueño romántico con la pareja de una amiga?",
        "¿Cuál es el peor regalo que te hicieron y tuviste que simular que te encantaba?",
        "¿Qué es lo que más te molesta de la convivencia con otras personas?"
      ],
      'retos': [
        "Mostrá la foto más vergonzosa de tu galería de fotos al grupo.",
        "Mandale un mensaje a tu contacto número 10 en WhatsApp diciendo 'Sé lo que hiciste'.",
        "Hacé una imitación de una de las que está acá hasta que adivinen quién es.",
        "Dejá que la persona a tu derecha le mande un emoji a cualquiera de tus contactos de Instagram.",
        "Hacé 10 sentadillas cantando una canción infantil.",
        "Hablá con acento extranjero (ej. mexicano, español, italiano) por los próximos dos turnos.",
        "Intentá lamerte el codo o hacer una mueca ridícula y sostenela por 10 segundos.",
        "Mostrá el último audio de WhatsApp que enviaste o recibiste.",
        "Llamá a alguien y cantale el feliz cumpleaños (aunque no sea su cumpleaños) y colga inmediatamente.",
        "Dejá que una amiga te maquille con los ojos vendados durante 1 minuto."
      ],
      'taboo': [
        { word: "Mate", taboo: ["Yerba", "Caliente", "Bombilla", "Tomar"] },
        { word: "Teclado", taboo: ["Escribir", "Computadora", "Teclas", "Oficina"] },
        { word: "Sol", taboo: ["Playa", "Cielo", "Calor", "Estrella"] },
        { word: "Cerveza", taboo: ["Bebida", "Alcohol", "Bar", "Lúpulo"] },
        { word: "Celular", taboo: ["Teléfono", "Pantalla", "Llamar", "WhatsApp"] },
        { word: "Netflix", taboo: ["Películas", "Series", "Pantalla", "Streaming"] },
        { word: "Perro", taboo: ["Mascota", "Ladrar", "Gato", "Animal"] },
        { word: "Chocolate", taboo: ["Dulce", "Cacao", "Kiosco", "Negro"] },
        { word: "Espejo", taboo: ["Reflejo", "Vidrio", "Mirar", "Baño"] },
        { word: "Zapatillas", taboo: ["Pies", "Calzado", "Correr", "Zapatos"] }
      ],
      'impostor': [
        "Manzana", "Fútbol", "Playa", "Cine", "Perro", "Café", "Avión", "Helado", "Pizza", "Hospital", "Mate", "Asado", "Instagram", "Boliche", "Sushi"
      ],
      'quien-soy': {
        'famosos': ["Lionel Messi", "Shakira", "Harry Potter", "Spider-Man", "Taylor Swift", "Barack Obama", "Batman", "Maradona", "Mickey Mouse", "Snape"],
        'animales': ["León", "Jirafa", "Elefante", "Delfín", "Perro", "Loro", "Tiburón", "Gato", "Canguro", "Oso Panda"],
        'objetos': ["Llave", "Celular", "Mate", "Taza", "Heladera", "Guitarra", "Reloj", "Auto", "Anteojos", "Lápiz"]
      },
      'roulette_foods': [
        { name: "Milanesa con puré", emoji: "🥩" },
        { name: "Empanadas", emoji: "🥟" },
        { name: "Hamburguesas", emoji: "🍔" },
        { name: "Pastas", emoji: "🍝" },
        { name: "Panchos", emoji: "🌭" },
        { name: "Asado", emoji: "🍖" },
        { name: "Pizza", emoji: "🍕" },
        { name: "Picada", emoji: "🧀" },
        { name: "Tacos", emoji: "🌮" },
        { name: "Sándwiches", emoji: "🥪" }
      ]
    };

    // Base de datos de frases picantes para los juegos (+18)
    this.gamesSpicyDb = {
      'yo-nunca': [
        "Yo nunca nunca tuve una fantasía con el novio/a de una amiga.",
        "Yo nunca nunca mandé una foto íntima (nude) por error a un grupo o persona equivocada.",
        "Yo nunca nunca mentí sobre mi historial amoroso para quedar bien.",
        "Yo nunca nunca le revisé el celular a una pareja a escondidas.",
        "Yo nunca nunca tuve una aventura de una noche de la que me arrepienta profundamente.",
        "Yo nunca nunca besé a alguien en esta habitación.",
        "Yo nunca nunca usé una app de citas estando de novia.",
        "Yo nunca nunca mandé un mensaje subido de tono al chat de trabajo por error.",
        "Yo nunca nunca estuve con dos personas diferentes en el mismo fin de semana.",
        "Yo nunca nunca mentí para zafar de un encuentro íntimo diciendo que me dolía la cabeza."
      ],
      'probablemente': [
        "¿Quién es más probable que termine besando a un desconocido en un boliche esta noche?",
        "¿Quién es más probable que tenga una cuenta secreta de OnlyFans?",
        "¿Quién es más probable que se enamore de su jefe/a?",
        "¿Quién es más probable que proponga un trío en una relación?",
        "¿Quién es más probable que mande un mensaje borracha a su ex a las 4 de la mañana?",
        "¿Quién es más probable que tenga juguetes íntimos guardados en la valija de viaje?",
        "¿Quién es más probable que haya besado a alguien solo por despecho?",
        "¿Quién es más probable que tenga una cita con alguien 20 años mayor?"
      ],
      'verdades': [
        "¿Cuál fue tu experiencia íntima más vergonzosa o graciosa?",
        "¿Quién de las personas presentes te parece la más atractiva físicamente?",
        "¿Cuál es la fantasía más rara que tenés y nunca le contaste a nadie?",
        "¿Alguna vez tuviste sentimientos románticos o físicos por una amiga de este grupo?",
        "¿Cuál es el lugar más extraño en el que tuviste un encuentro íntimo?",
        "¿Alguna vez mentiste en una relación sobre estar satisfecha?",
        "¿Quién de este grupo pensás que tiene la peor vida amorosa y por qué?",
        "¿Cuál es el secreto más oscuro que le ocultás a tu actual pareja o ex?"
      ],
      'retos': [
        "Confesale a una de las presentes qué fantasía te genera o qué te gusta de ella físicamente.",
        "Mostrá el chat de WhatsApp con la última persona con la que histeriqueaste o tuviste onda.",
        "Hacé una llamada de 10 segundos a alguien que te guste y decile 'Te tengo ganas' sin dar explicaciones, luego cortá.",
        "Dale un beso (en la mejilla o donde decidan) a la persona que te parezca más atractiva del grupo.",
        "Leé en voz alta el último mensaje subido de tono o íntimo que enviaste.",
        "Dejá que el grupo redacte un mensaje de Instagram para la persona que te gusta y tenés que enviarlo.",
        "Confesá cuál es tu posición favorita recreándola de forma cómica con un almohadón."
      ]
    };

    this.rouletteRotation = 0;

    // Inicialización al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  // ------------------------------------------------------------------------
  // INICIALIZACIÓN Y DATOS SEMILLA
  // ------------------------------------------------------------------------
  init() {
    this.checkImportedState();
    this.loadState();
    
    // Limpieza de juntadas de prueba preexistentes 'j1' y 'j2' para iniciar limpio
    if (this.state.juntadas && this.state.juntadas.some(j => j.id === 'j1' || j.id === 'j2')) {
      this.state.juntadas = this.state.juntadas.filter(j => j.id !== 'j1' && j.id !== 'j2');
      if (this.state.activeJuntadaId === 'j1' || this.state.activeJuntadaId === 'j2') {
        this.state.activeJuntadaId = this.state.juntadas.length > 0 ? this.state.juntadas[0].id : null;
      }
      this.saveState();
    }

    // Si no hay datos en localStorage, cargamos datos semilla realistas
    if (this.state.friends.length === 0) {
      this.seedData();
    }

    // Inicializar disponibilidad si falta
    if (!this.state.availability || Object.keys(this.state.availability).length === 0) {
      this.seedAvailability();
    }

    // Inicializar íconos Lucide
    lucide.createIcons();

    // Renderizar Header e Pantalla de Inicio
    this.renderHeader();
    this.renderDashboard();
    this.renderFriendsScreen();

    // Vincular selectores del modal de gastos e checklist
    this.populateFriendDropdowns();

    // Configurar autocompletado de fecha por defecto en el modal
    const dateInput = document.getElementById('juntada-date');
    if (dateInput) {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      dateInput.value = now.toISOString().slice(0, 16);
    }
  }

  // Cargar del LocalStorage
  loadState() {
    try {
      const saved = localStorage.getItem('juntadas_app_state');
      if (saved) {
        this.state = JSON.parse(saved);
        // Reseteamos pestañas al iniciar
        this.state.activeJuntadaTab = 'rsvp';
      }
    } catch (e) {
      console.error("Error al cargar localStorage:", e);
    }
  }

  // Guardar en LocalStorage
  saveState() {
    try {
      localStorage.setItem('juntadas_app_state', JSON.stringify(this.state));
    } catch (e) {
      console.error("Error al guardar en localStorage:", e);
    }
  }

  // Generar datos ficticios iniciales
  seedData() {
    const defaultFriends = [
      { id: 'f1', name: 'Sofi', color: '#8b5cf6' }, // Violeta
      { id: 'f2', name: 'Flor', color: '#3b82f6' }, // Azul
      { id: 'f3', name: 'Mile', color: '#ec4899' }, // Rosa
      { id: 'f4', name: 'Valen', color: '#10b981' }, // Verde
      { id: 'f5', name: 'Cami', color: '#f59e0b' }  // Naranja
    ];

    const defaultJuntadas = [];

    this.state.friends = defaultFriends;
    this.state.juntadas = defaultJuntadas;
    this.state.activeFriendId = 'f1'; // Sofi por defecto
    this.state.activeJuntadaId = null; // Ninguna juntada activa por defecto
    
    this.saveState();
  }

  seedAvailability() {
    this.state.availability = {
      'f1': ['vie_noche', 'sab_noche', 'dom_tarde'],
      'f2': ['sab_noche', 'dom_tarde', 'jue_noche'],
      'f3': ['vie_noche', 'sab_noche', 'sab_tarde'],
      'f4': ['sab_noche', 'dom_tarde', 'vie_noche'],
      'f5': ['sab_noche', 'mie_tarde', 'jue_noche']
    };
    this.saveState();
  }

  // ------------------------------------------------------------------------
  // ENRUTADOR Y NAVEGACIÓN
  // ------------------------------------------------------------------------
  navigateTo(screenId) {
    // Cerrar modales por las dudas
    this.closeAllModals();

    // Actualizar clases activas en pantallas
    const screens = document.querySelectorAll('.app-screen');
    screens.forEach(s => s.classList.remove('active'));

    const targetScreenId = screenId === 'juntada' ? 'juntada-detail' : screenId;
    const activeScreen = document.getElementById(`screen-${targetScreenId}`);
    if (activeScreen) {
      activeScreen.classList.add('active');
    }

    // Si navegamos a la juntada activa, asegurarnos de cargar sus datos
    if (screenId === 'juntada') {
      if (!this.state.activeJuntadaId && this.state.juntadas.length > 0) {
        this.state.activeJuntadaId = this.state.juntadas[0].id;
      }
      this.renderJuntadaDetail();
    } else if (screenId === 'dashboard') {
      this.renderDashboard();
    } else if (screenId === 'friends') {
      this.renderFriendsScreen();
    } else if (screenId === 'calendar') {
      this.renderCalendarScreen();
    } else if (screenId === 'games') {
      this.exitGame();
    } else if (screenId === 'roulette') {
      setTimeout(() => this.drawFoodWheel(), 50);
    }

    // Actualizar barra de navegación inferior
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const activeNav = document.getElementById(`nav-item-${screenId}`);
    if (activeNav) {
      activeNav.classList.add('active');
    }

    // Hacer scroll arriba
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  switchJuntadaTab(tabId) {
    this.state.activeJuntadaTab = tabId;
    
    // Cambiar clases de botones de pestañas
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    
    const activeTabBtn = document.getElementById(`tab-btn-${tabId}`);
    if (activeTabBtn) activeTabBtn.classList.add('active');

    // Cambiar paneles de contenido
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(p => p.classList.remove('active'));

    const activePanel = document.getElementById(`juntada-tab-${tabId}`);
    if (activePanel) activePanel.classList.add('active');

    this.renderJuntadaTabContent(tabId);
  }

  // ------------------------------------------------------------------------
  // MÓDULOS DE RENDERIZADO
  // ------------------------------------------------------------------------
  
  // Renderizar Header
  renderHeader() {
    const activeFriend = this.getActiveFriend();
    if (!activeFriend) return;

    // Actualizar nombre
    document.getElementById('header-user-name').innerText = activeFriend.name;
    document.getElementById('welcome-friend-name').innerText = activeFriend.name;
    
    // Actualizar Avatar
    const avatarElement = document.getElementById('header-user-avatar');
    avatarElement.innerText = activeFriend.name.charAt(0).toUpperCase();
    avatarElement.style.background = activeFriend.color || 'var(--color-violet)';
    avatarElement.style.padding = '';
  }

  // Renderizar Pantalla Principal (Dashboard)
  renderDashboard() {
    const nextJuntadaCardContainer = document.getElementById('next-juntada-card-container');
    const juntadasListElement = document.getElementById('juntadas-list');
    
    // Buscar la juntada activa / próxima (si es encuesta, o la que tenga fecha más cercana futura)
    // Para simplificar, la última creada es la destacada, y las demás al historial
    if (this.state.juntadas.length === 0) {
      nextJuntadaCardContainer.innerHTML = `
        <div class="card-glass text-center p-4">
          <p class="text-secondary">No hay juntadas planeadas. ¡Organizá la primera!</p>
          <button class="btn-primary btn-violet mt-3" style="margin: 0 auto;" onclick="app.openNewJuntadaModal()">
            <i data-lucide="plus"></i> Crear Juntada
          </button>
        </div>
      `;
      juntadasListElement.innerHTML = `
        <div class="empty-state">
          <i data-lucide="calendar-x"></i>
          <span>El historial está vacío.</span>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    // Copiamos la lista y la invertimos para mostrar primero lo más reciente
    const sortedJuntadas = [...this.state.juntadas].reverse();
    const featuredJuntada = sortedJuntadas[0]; // Destacada
    const historyJuntadas = sortedJuntadas.slice(1); // Historial

    // Renderizar Destacada
    nextJuntadaCardContainer.innerHTML = this.buildJuntadaCardHTML(featuredJuntada, true);

    // Renderizar Historial
    if (historyJuntadas.length === 0) {
      juntadasListElement.innerHTML = `
        <div class="empty-state">
          <i data-lucide="history"></i>
          <span>No hay juntadas anteriores.</span>
        </div>
      `;
    } else {
      juntadasListElement.innerHTML = historyJuntadas.map(j => this.buildJuntadaCardHTML(j, false)).join('');
    }

    lucide.createIcons();
  }

  // Construye el HTML de una Juntada
  buildJuntadaCardHTML(juntada, isFeatured = false) {
    // Determinar la fecha legible
    let dateText = '';
    if (juntada.isPoll) {
      dateText = '📅 Encuesta de fechas activa';
    } else {
      dateText = this.formatDateLegible(juntada.fixedDate);
    }

    // Contar RSVP asistencias
    let goingCount = 0;
    let maybeCount = 0;
    const avatarList = [];

    Object.entries(juntada.rsvp || {}).forEach(([friendId, status]) => {
      const friend = this.getFriendById(friendId);
      if (!friend) return;
      if (status === 'going') {
        goingCount++;
        avatarList.push(friend);
      } else if (status === 'maybe') {
        maybeCount++;
      }
    });

    const totalGoingMaybe = goingCount + maybeCount;

    // Avatar overlapping HTML
    let avatarsHTML = '';
    avatarList.slice(0, 4).forEach(f => {
      avatarsHTML += `<div class="overlap-avatar" style="background: ${f.color}">${f.name.charAt(0).toUpperCase()}</div>`;
    });
    if (avatarList.length > 4) {
      avatarsHTML += `<div class="overlap-more">+${avatarList.length - 4}</div>`;
    }

    const emoji = juntada.emoji || '🎉';

    if (isFeatured) {
      return `
        <div class="card-glass featured-card accent-border-purple" onclick="app.selectAndGoToJuntada('${juntada.id}')" style="cursor: pointer;">
          <div class="featured-header">
            <div class="juntada-icon-badge">${emoji}</div>
            <span class="juntada-status-tag ${juntada.isPoll ? 'status-poll' : 'status-active'}">
              ${juntada.isPoll ? 'Votando' : 'Confirmado'}
            </span>
          </div>
          <h4 class="featured-title">${juntada.title}</h4>
          <div class="featured-meta">
            <div class="meta-row">
              <i data-lucide="calendar"></i>
              <span>${dateText}</span>
            </div>
            <div class="meta-row">
              <i data-lucide="map-pin"></i>
              <span>${juntada.location}</span>
            </div>
          </div>
          <div class="featured-stats">
            <div class="avatars-overlap">
              ${avatarsHTML || '<span class="text-muted text-xs">Sin confirmaciones aún</span>'}
            </div>
            <span class="attendance-counter">
              <span class="text-highlight">${goingCount}</span> van | <span class="text-secondary">${maybeCount}</span> en duda
            </span>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="card-glass juntada-history-item" onclick="app.selectAndGoToJuntada('${juntada.id}')" style="cursor: pointer;">
          <div class="history-left">
            <div class="juntada-icon-badge" style="width:36px; height:36px; font-size: 16px;">${emoji}</div>
            <div class="history-info">
              <span class="history-title">${juntada.title}</span>
              <span class="history-date">${dateText}</span>
            </div>
          </div>
          <i data-lucide="chevron-right" class="text-muted" style="width: 18px; height: 18px;"></i>
        </div>
      `;
    }
  }

  selectAndGoToJuntada(juntadaId) {
    this.state.activeJuntadaId = juntadaId;
    this.saveState();
    this.navigateTo('juntada');
  }

  // Renderizar Pantalla de Detalle de Juntada
  renderJuntadaDetail() {
    const juntada = this.getActiveJuntada();
    if (!juntada) {
      this.navigateTo('dashboard');
      return;
    }

    // Título y Tipo
    document.getElementById('detail-juntada-title').innerText = juntada.title;
    document.getElementById('detail-juntada-type').innerText = juntada.type;

    // Fecha
    const dateValueElement = document.getElementById('detail-juntada-date');
    if (juntada.isPoll) {
      dateValueElement.innerHTML = '<span class="text-blue">¡Votando fecha! 🗳️</span>';
    } else {
      dateValueElement.innerText = this.formatDateLegible(juntada.fixedDate);
    }

    // Lugar
    const locationValElement = document.getElementById('detail-juntada-location');
    locationValElement.innerHTML = `
      <a href="https://maps.google.com/?q=${encodeURIComponent(juntada.location)}" target="_blank" class="text-blue" style="text-decoration: none;">
        ${juntada.location} <i data-lucide="external-link" class="inline-icon" style="width:12px; height:12px;"></i>
      </a>
    `;

    // Descripción
    const descWrapper = document.getElementById('detail-juntada-desc-wrapper');
    const descElement = document.getElementById('detail-juntada-description');
    if (juntada.description && juntada.description.trim() !== '') {
      descWrapper.style.display = 'block';
      descElement.innerText = juntada.description;
    } else {
      descWrapper.style.display = 'none';
    }

    // Manejar visibilidad de la pestaña de Votación
    const tabBtnFecha = document.getElementById('tab-btn-fecha');
    if (juntada.isPoll) {
      tabBtnFecha.style.display = 'flex';
      // Si la pestaña actual es fecha, o si el tab era rsvp pero está en votación, quizás queremos ver fechas
    } else {
      tabBtnFecha.style.display = 'none';
      if (this.state.activeJuntadaTab === 'fecha') {
        this.state.activeJuntadaTab = 'rsvp';
      }
    }

    // Renderizar la pestaña activa
    this.switchJuntadaTab(this.state.activeJuntadaTab);
    lucide.createIcons();
  }

  // Renderizar contenido de pestañas individuales
  renderJuntadaTabContent(tabId) {
    const juntada = this.getActiveJuntada();
    if (!juntada) return;

    if (tabId === 'rsvp') {
      this.renderTabRSVP(juntada);
    } else if (tabId === 'fecha') {
      this.renderTabFecha(juntada);
    } else if (tabId === 'checklist') {
      this.renderTabChecklist(juntada);
    } else if (tabId === 'cuentas') {
      this.renderTabCuentas(juntada);
    }
  }

  // ------------------------------------------------------------------------
  // TAB A: RSVP / ASISTENCIA
  // ------------------------------------------------------------------------
  renderTabRSVP(juntada) {
    const activeFriendId = this.state.activeFriendId;
    const myStatus = juntada.rsvp[activeFriendId] || 'pending';

    // Resaltar botón de mi RSVP
    const rsvpButtons = document.querySelectorAll('.rsvp-opt-btn');
    rsvpButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-status') === myStatus) {
        btn.classList.add('active');
      }
    });

    // Listado de amigas con su RSVP
    const rsvpListElement = document.getElementById('rsvp-list');
    rsvpListElement.innerHTML = '';

    // Dividimos por categorías de respuesta para que quede más lindo
    const categories = { going: [], maybe: [], cant: [], pending: [] };

    this.state.friends.forEach(friend => {
      const status = juntada.rsvp[friend.id] || 'pending';
      categories[status].push(friend);
    });

    // Crear lista ordenada de asistentes
    const orderedStatuses = [
      { key: 'going', label: 'Van ✅', class: 'badge-going' },
      { key: 'maybe', label: 'En duda 💬', class: 'badge-maybe' },
      { key: 'cant', label: 'No van ❌', class: 'badge-cant' },
      { key: 'pending', label: 'Sin responder ⏳', class: 'badge-pending' }
    ];

    let rsvpHTML = '';
    orderedStatuses.forEach(cat => {
      const list = categories[cat.key];
      if (list.length > 0) {
        list.forEach(friend => {
          const isMe = friend.id === activeFriendId ? ' (Vos)' : '';
          rsvpHTML += `
            <div class="rsvp-row">
              <div class="rsvp-friend">
                <div class="friend-avatar" style="background: ${friend.color}">
                  ${friend.name.charAt(0).toUpperCase()}
                </div>
                <span class="friend-name">${friend.name}${isMe}</span>
              </div>
              <span class="rsvp-badge ${cat.class}">${cat.label}</span>
            </div>
          `;
        });
      }
    });

    rsvpListElement.innerHTML = rsvpHTML || `<p class="text-secondary text-center text-xs">No hay integrantes registradas.</p>`;
  }

  setMyRSVP(status) {
    const juntada = this.getActiveJuntada();
    const activeFriendId = this.state.activeFriendId;
    if (!juntada || !activeFriendId) return;

    juntada.rsvp[activeFriendId] = status;
    this.saveState();
    this.renderTabRSVP(juntada);
    this.renderDashboard(); // Actualizar contadores del inicio
  }

  // ------------------------------------------------------------------------
  // TAB B: VOTACIÓN DE FECHAS
  // ------------------------------------------------------------------------
  renderTabFecha(juntada) {
    if (!juntada.isPoll) return;

    const dateVotesContainer = document.getElementById('date-votes-container');
    const bestOptionContainer = document.getElementById('poll-best-option');
    const activeFriendId = this.state.activeFriendId;
    const totalFriends = this.state.friends.length;

    dateVotesContainer.innerHTML = '';

    // Buscar la opción con más votos
    let maxVotes = -1;
    let winningOption = null;

    // Renderizar opciones de fecha
    juntada.pollOptions.forEach(opt => {
      const votes = opt.votes || [];
      const hasVoted = votes.includes(activeFriendId);
      const voteCount = votes.length;
      
      // Calcular porcentaje de votos
      const percentage = totalFriends > 0 ? (voteCount / totalFriends) * 100 : 0;

      if (voteCount > maxVotes) {
        maxVotes = voteCount;
        winningOption = opt;
      }

      // Nombre de votantes
      const votersNames = votes.map(id => {
        const f = this.getFriendById(id);
        return f ? (id === activeFriendId ? 'Vos' : f.name) : '';
      }).filter(n => n !== '').join(', ');

      const votersListText = voteCount > 0 ? `Votaron: ${votersNames}` : 'Sin votos aún';

      const optCard = document.createElement('div');
      optCard.className = `vote-option-card ${hasVoted ? 'voted' : ''}`;
      optCard.onclick = () => this.toggleDateVote(opt.id);

      optCard.innerHTML = `
        <div class="vote-option-info">
          <span class="vote-option-title">${opt.text}</span>
          <span class="vote-count">${voteCount} ${voteCount === 1 ? 'voto' : 'votos'}</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${percentage}%"></div>
        </div>
        <span class="vote-voters-list">${votersListText}</span>
      `;
      
      dateVotesContainer.appendChild(optCard);
    });

    // Mostrar resumen ganador
    if (winningOption && maxVotes > 0) {
      bestOptionContainer.innerHTML = `
        <i data-lucide="award" class="text-blue" style="width:18px; height:18px;"></i>
        <span>Fecha favorita actual: <strong>${winningOption.text}</strong> (${maxVotes} votos)</span>
      `;
      document.getElementById('btn-lock-date').style.display = 'flex';
    } else {
      bestOptionContainer.innerHTML = `
        <i data-lucide="help-circle" class="text-muted" style="width:18px; height:18px;"></i>
        <span>Nadie votó todavía. ¡Sé la primera!</span>
      `;
      document.getElementById('btn-lock-date').style.display = 'none';
    }

    lucide.createIcons();
  }

  toggleDateVote(optionId) {
    const juntada = this.getActiveJuntada();
    const activeFriendId = this.state.activeFriendId;
    if (!juntada || !activeFriendId) return;

    const option = juntada.pollOptions.find(o => o.id === optionId);
    if (!option) return;

    const voteIndex = option.votes.indexOf(activeFriendId);
    if (voteIndex > -1) {
      option.votes.splice(voteIndex, 1); // Quitar voto
    } else {
      option.votes.push(activeFriendId); // Agregar voto
    }

    this.saveState();
    this.renderTabFecha(juntada);
    this.renderDashboard();
  }

  lockJuntadaDate() {
    const juntada = this.getActiveJuntada();
    if (!juntada || !juntada.isPoll) return;

    // Buscar opción más votada
    let winningOption = null;
    let maxVotes = -1;

    juntada.pollOptions.forEach(opt => {
      if (opt.votes.length > maxVotes) {
        maxVotes = opt.votes.length;
        winningOption = opt;
      }
    });

    if (!winningOption) {
      alert("No hay votos para fijar una fecha.");
      return;
    }

    if (confirm(`¿Fijar la fecha definitiva como "${winningOption.text}" y cerrar la votación?`)) {
      // Intentar formatear la fecha a un formato adecuado si es posible, o guardar la descripción literal
      juntada.fixedDate = winningOption.text;
      juntada.isPoll = false;
      juntada.pollOptions = []; // Limpiar
      this.saveState();
      
      // Recargar detalles
      this.renderJuntadaDetail();
    }
  }

  // ------------------------------------------------------------------------
  // TAB C: CHECKLIST COLABORATIVO (TRAER COSAS)
  // ------------------------------------------------------------------------
  renderTabChecklist(juntada) {
    const container = document.getElementById('checklist-container');
    container.innerHTML = '';

    if (!juntada.checklist || juntada.checklist.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i data-lucide="shopping-cart"></i>
          <span>Nadie agregó cosas para traer aún.</span>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    const activeFriendId = this.state.activeFriendId;

    juntada.checklist.forEach(item => {
      const assignee = this.getFriendById(item.assigneeId);
      const isAssigned = !!item.assigneeId;
      const isAssignedToMe = item.assigneeId === activeFriendId;

      let assigneeHTML = '';
      if (isAssigned && assignee) {
        assigneeHTML = `
          <div class="checklist-assignee">
            <div class="assignee-avatar" style="background: ${assignee.color}">
              ${assignee.name.charAt(0).toUpperCase()}
            </div>
            <span class="assignee-name">${assignee.name === this.getFriendById(activeFriendId)?.name ? 'Vos' : assignee.name}</span>
          </div>
        `;
      } else {
        assigneeHTML = `<span class="assignee-empty">Sin asignar ✋</span>`;
      }

      const card = document.createElement('div');
      card.className = `checklist-card ${isAssignedToMe ? 'assigned-to-me' : ''} ${isAssigned ? 'assigned' : ''}`;
      card.onclick = () => this.toggleChecklistItemAssignment(item.id);

      card.innerHTML = `
        <div class="checklist-left">
          <div class="checkbox-visual">
            <i data-lucide="check" style="width:12px; height:12px; stroke-width: 3.5px;"></i>
          </div>
          <div class="checklist-text-area">
            <span class="checklist-name">${item.name}</span>
            <span class="checklist-qty">${item.qty || 'Cualquier cantidad'}</span>
          </div>
        </div>
        ${assigneeHTML}
      `;

      container.appendChild(card);
    });

    lucide.createIcons();
  }

  toggleChecklistItemAssignment(itemId) {
    const juntada = this.getActiveJuntada();
    const activeFriendId = this.state.activeFriendId;
    if (!juntada || !activeFriendId) return;

    const item = juntada.checklist.find(i => i.id === itemId);
    if (!item) return;

    if (item.assigneeId === activeFriendId) {
      // Si estaba asignado a mí, se libera
      item.assigneeId = '';
    } else {
      // Si no estaba asignado a nadie o estaba asignado a otra persona, se me asigna a mí
      // (Permitimos "robarse" el ítem para facilidad de uso)
      item.assigneeId = activeFriendId;
    }

    this.saveState();
    this.renderTabChecklist(juntada);
  }

  // ------------------------------------------------------------------------
  // TAB D: CUENTAS Y DIVISIÓN DE GASTOS
  // ------------------------------------------------------------------------
  renderTabCuentas(juntada) {
    const activeFriendId = this.state.activeFriendId;
    const expListElement = document.getElementById('expenses-list');
    const debtsListElement = document.getElementById('debts-resolution-list');
    
    // 1. Mostrar Historial de Gastos
    expListElement.innerHTML = '';
    if (!juntada.expenses || juntada.expenses.length === 0) {
      expListElement.innerHTML = `
        <div class="empty-state">
          <i data-lucide="piggy-bank"></i>
          <span>No se cargaron gastos todavía.</span>
        </div>
      `;
      debtsListElement.innerHTML = `
        <div class="empty-state">
          <span>¡Todo al día! No hay deudas cargadas.</span>
        </div>
      `;
      document.getElementById('exp-total').innerText = '$0';
      document.getElementById('exp-per-person').innerText = '$0';
      lucide.createIcons();
      return;
    }

    // Calcular gasto total general
    let totalSpent = 0;
    juntada.expenses.forEach(exp => {
      totalSpent += exp.amount;
      
      const payer = this.getFriendById(exp.payerId);
      const payerName = payer ? (exp.payerId === activeFriendId ? 'Vos' : payer.name) : 'Desconocido';
      
      // Participantes texto
      const partNames = exp.participants.map(id => {
        const f = this.getFriendById(id);
        return f ? (id === activeFriendId ? 'Vos' : f.name) : '';
      }).filter(n => n !== '').join(', ');

      const item = document.createElement('div');
      item.className = 'expense-item';
      item.innerHTML = `
        <div class="expense-left">
          <div class="user-avatar-mini" style="background: ${payer?.color || 'var(--color-violet)'}">
            ${payer?.name.charAt(0).toUpperCase() || '?'}
          </div>
          <div class="expense-info">
            <span class="expense-desc">${exp.desc}</span>
            <span class="expense-sub">Pagó ${payerName}</span>
          </div>
        </div>
        <div class="expense-right">
          <span class="expense-amount">$${this.formatNumber(exp.amount)}</span>
          <br>
          <span class="expense-participants-tooltip">Entre ${exp.participants.length} (${partNames})</span>
        </div>
      `;
      expListElement.appendChild(item);
    });

    document.getElementById('exp-total').innerText = `$${this.formatNumber(totalSpent)}`;

    // 2. Calcular Balances y Deudas Simplificadas
    const results = this.calculateBalancesAndSettleDebts(juntada);
    
    // Mostrar Gasto promedio por persona
    // Nota: El promedio es relativo a los participantes, pero mostramos el promedio ponderado
    document.getElementById('exp-per-person').innerText = `$${this.formatNumber(results.avgPerPerson)}`;

    // Renderizar deudas simplificadas
    debtsListElement.innerHTML = '';
    if (results.debts.length === 0) {
      debtsListElement.innerHTML = `
        <div class="empty-state">
          <i data-lucide="check-circle" class="text-going" style="color:var(--color-going);"></i>
          <span style="color: #fff; font-weight: 600;">¡Están todas al día! Nadie le debe a nadie.</span>
        </div>
      `;
    } else {
      results.debts.forEach(debt => {
        const debtor = this.getFriendById(debt.from);
        const creditor = this.getFriendById(debt.to);
        
        if (!debtor || !creditor) return;

        const isDebtorMe = debt.from === activeFriendId;
        const isCreditorMe = debt.to === activeFriendId;
        
        const debtorName = isDebtorMe ? 'Vos' : debtor.name;
        const creditorName = isCreditorMe ? 'Vos' : creditor.name;

        let actionButtonHTML = '';
        // Si yo soy la deudora, mostrar botón simulador de pagar
        if (isDebtorMe) {
          actionButtonHTML = `<button class="btn-pay-mock" onclick="app.simulatePayment('${debt.from}', '${debt.to}', ${debt.amount})">Marcar como pagado ✔</button>`;
        }

        const row = document.createElement('div');
        row.className = 'debt-row';
        row.innerHTML = `
          <div class="debt-info-area">
            <span style="color: ${isDebtorMe ? 'var(--color-cant)' : '#fff'}; font-weight: 700;">${debtorName}</span>
            <i data-lucide="arrow-right" class="debt-arrow"></i>
            <span style="color: ${isCreditorMe ? 'var(--color-going)' : '#fff'}; font-weight: 700;">${creditorName}</span>
          </div>
          <div class="debt-value-area">
            <span class="debt-amount">$${this.formatNumber(debt.amount)}</span>
            ${actionButtonHTML}
          </div>
        `;
        debtsListElement.appendChild(row);
      });
    }

    lucide.createIcons();
  }

  // ALGORITMO CORE: División y optimización de gastos
  calculateBalancesAndSettleDebts(juntada) {
    // 1. Inicializar balances en 0 para todas las amigas
    const balances = {};
    this.state.friends.forEach(f => {
      balances[f.id] = 0;
    });

    // 2. Procesar cada gasto
    juntada.expenses.forEach(exp => {
      const payerId = exp.payerId;
      const amount = exp.amount;
      const participants = exp.participants || [];

      if (participants.length === 0) return;

      // El pagador incrementa su balance por el monto pagado
      balances[payerId] += amount;

      // Cada participante decrementa su balance por su parte correspondiente
      const share = amount / participants.length;
      participants.forEach(pId => {
        if (balances[pId] !== undefined) {
          balances[pId] -= share;
        }
      });
    });

    // Calcular el gasto promedio general por persona (para información de UI)
    // Se divide el total por las amigas involucradas (o el total de amigas del grupo si no hay datos)
    const totalSpent = juntada.expenses.reduce((sum, e) => sum + e.amount, 0);
    const activeParticipants = new Set();
    juntada.expenses.forEach(e => e.participants.forEach(p => activeParticipants.add(p)));
    const divider = activeParticipants.size > 0 ? activeParticipants.size : this.state.friends.length;
    const avgPerPerson = totalSpent / divider;

    // 3. Separar deudores (balance < 0) y acreedores (balance > 0)
    const debtors = [];
    const creditors = [];

    Object.entries(balances).forEach(([friendId, balance]) => {
      // Redondear a centavos para evitar flotantes
      const roundedBalance = Math.round(balance * 100) / 100;
      if (roundedBalance < -0.1) {
        debtors.push({ id: friendId, balance: roundedBalance });
      } else if (roundedBalance > 0.1) {
        creditors.push({ id: friendId, balance: roundedBalance });
      }
    });

    // Ordenar deudores de forma ascendente (el que más debe primero)
    debtors.sort((a, b) => a.balance - b.balance);
    // Ordenar acreedores de forma descendente (al que más se le debe primero)
    creditors.sort((a, b) => b.balance - a.balance);

    const debts = [];

    // Algoritmo codicioso para liquidar deudas
    let dIdx = 0;
    let cIdx = 0;

    while (dIdx < debtors.length && cIdx < creditors.length) {
      const debtor = debtors[dIdx];
      const creditor = creditors[cIdx];

      const owedAmount = -debtor.balance;
      const creditAmount = creditor.balance;

      const transactionAmount = Math.min(owedAmount, creditAmount);
      
      if (transactionAmount > 0.1) {
        debts.push({
          from: debtor.id,
          to: creditor.id,
          amount: Math.round(transactionAmount * 100) / 100
        });
      }

      // Actualizar balances simulados
      debtor.balance += transactionAmount;
      creditor.balance -= transactionAmount;

      // Avanzar índices si se saldó el balance
      if (Math.abs(debtor.balance) < 0.1) dIdx++;
      if (Math.abs(creditor.balance) < 0.1) cIdx++;
    }

    return {
      debts,
      avgPerPerson: Math.round(avgPerPerson * 100) / 100
    };
  }

  // Simular pago rápido (elimina proporcionalmente deudas registrando un contragasto o saldando la app)
  simulatePayment(fromId, toId, amount) {
    const juntada = this.getActiveJuntada();
    if (!juntada) return;

    const debtor = this.getFriendById(fromId);
    const creditor = this.getFriendById(toId);

    if (confirm(`¿Marcar que ${debtor.name} le pagó $${this.formatNumber(amount)} a ${creditor.name}? Se registrará una transferencia de saldo.`)) {
      // Para simular el pago real, registramos un gasto de compensación:
      // "fromId" pagó "amount" y la única participante de ese beneficio es "toId"
      // Así el balance neto de fromId sube en +amount, y el de toId baja en -amount. ¡Física pura!
      const paymentExpense = {
        id: 'pay_' + Date.now(),
        payerId: fromId,
        amount: amount,
        desc: `Transferencia: ${debtor.name} ➔ ${creditor.name}`,
        participants: [toId]
      };

      juntada.expenses.push(paymentExpense);
      this.saveState();
      this.renderTabCuentas(juntada);
    }
  }

  // ------------------------------------------------------------------------
  // PANTALLA 4: CALENDARIO GRUPAL Y DISPONIBILIDAD
  // ------------------------------------------------------------------------
  getFriendsAvailableForSlot(slotKey) {
    const list = [];
    this.state.friends.forEach(friend => {
      const friendAvailability = this.state.availability[friend.id] || [];
      if (friendAvailability.includes(slotKey)) {
        list.push(friend);
      }
    });
    return list;
  }

  isFriendAvailableForSlot(friendId, slotKey) {
    const friendAvailability = this.state.availability[friendId] || [];
    return friendAvailability.includes(slotKey);
  }

  toggleAvailability(slotKey) {
    const activeFriendId = this.state.activeFriendId;
    if (!activeFriendId) return;

    if (!this.state.availability[activeFriendId]) {
      this.state.availability[activeFriendId] = [];
    }

    const list = this.state.availability[activeFriendId];
    const idx = list.indexOf(slotKey);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(slotKey);
    }

    this.saveState();
    this.renderCalendarScreen();
  }

  formatSlotVoters(availableFriends) {
    if (availableFriends.length === 0) return '—';
    if (availableFriends.length === this.state.friends.length) return 'Todas 🌟';
    return availableFriends.map(f => f.name.charAt(0).toUpperCase()).join(', ');
  }

  renderCalendarScreen() {
    const container = document.getElementById('calendar-weekly-grid');
    if (!container) return;

    container.innerHTML = '';

    const days = [
      { id: 'lun', name: 'Lunes' },
      { id: 'mar', name: 'Martes' },
      { id: 'mie', name: 'Miércoles' },
      { id: 'jue', name: 'Jueves' },
      { id: 'vie', name: 'Viernes' },
      { id: 'sab', name: 'Sábado' },
      { id: 'dom', name: 'Domingo' }
    ];

    const blocks = [
      { id: 'manana', name: 'Mañana' },
      { id: 'tarde', name: 'Tarde' },
      { id: 'noche', name: 'Noche' }
    ];

    const activeFriendId = this.state.activeFriendId;
    const totalFriends = this.state.friends.length;

    days.forEach(day => {
      const row = document.createElement('div');
      row.className = 'calendar-day-row';

      const label = document.createElement('div');
      label.className = 'day-row-label';
      label.innerText = day.name;
      row.appendChild(label);

      const slotsContainer = document.createElement('div');
      slotsContainer.className = 'day-slots-container';

      blocks.forEach(block => {
        const slotKey = `${day.id}_${block.id}`;
        const availableFriends = this.getFriendsAvailableForSlot(slotKey);
        const isMeAvailable = this.isFriendAvailableForSlot(activeFriendId, slotKey);

        const totalAvailable = availableFriends.length;
        
        let levelClass = 'level-0';
        if (totalAvailable > 0) {
          const ratio = totalAvailable / totalFriends;
          if (ratio === 1) levelClass = 'level-full';
          else if (ratio >= 0.6) levelClass = 'level-high';
          else if (ratio >= 0.4) levelClass = 'level-medium';
          else levelClass = 'level-low';
        }

        const markedClass = isMeAvailable ? 'marked-by-me' : '';

        const cell = document.createElement('div');
        cell.className = `slot-cell ${levelClass} ${markedClass}`;
        cell.onclick = () => this.toggleAvailability(slotKey);
        cell.title = totalAvailable > 0 
          ? `Disponibles: ${availableFriends.map(f => f.name).join(', ')}`
          : 'Nadie disponible';

        cell.innerHTML = `
          <span class="slot-label-text">${block.name}</span>
          <span class="slot-voters-text">${this.formatSlotVoters(availableFriends)}</span>
        `;

        slotsContainer.appendChild(cell);
      });

      row.appendChild(slotsContainer);
      container.appendChild(row);
    });

    this.renderCalendarSuggestions();
    lucide.createIcons();
  }

  renderCalendarSuggestions() {
    const suggestionsContainer = document.getElementById('calendar-suggestions');
    if (!suggestionsContainer) return;

    suggestionsContainer.innerHTML = '';

    const days = [
      { id: 'lun', name: 'Lunes' },
      { id: 'mar', name: 'Martes' },
      { id: 'mie', name: 'Miércoles' },
      { id: 'jue', name: 'Jueves' },
      { id: 'vie', name: 'Viernes' },
      { id: 'sab', name: 'Sábado' },
      { id: 'dom', name: 'Domingo' }
    ];

    const blocks = [
      { id: 'manana', name: 'Mañana' },
      { id: 'tarde', name: 'Tarde' },
      { id: 'noche', name: 'Noche' }
    ];

    const allOptions = [];

    days.forEach(day => {
      blocks.forEach(block => {
        const slotKey = `${day.id}_${block.id}`;
        const availableFriends = this.getFriendsAvailableForSlot(slotKey);
        if (availableFriends.length > 0) {
          allOptions.push({
            day: day.name,
            block: block.name,
            available: availableFriends,
            count: availableFriends.length
          });
        }
      });
    });

    // Ordenar de mayor a menor coincidencia
    allOptions.sort((a, b) => b.count - a.count);

    const topSuggestions = allOptions.slice(0, 3);

    if (topSuggestions.length === 0) {
      suggestionsContainer.innerHTML = `
        <div class="empty-state">
          <i data-lucide="calendar-heart"></i>
          <span>Ninguna amiga cargó sus horarios aún. ¡Marcá tu disponibilidad arriba!</span>
        </div>
      `;
      return;
    }

    const rankEmojis = ['🏆', '🥈', '🥉'];

    topSuggestions.forEach((sug, index) => {
      const votersNames = sug.available.map(f => f.id === this.state.activeFriendId ? 'Vos' : f.name).join(', ');
      const rankEmoji = rankEmojis[index] || '⭐';

      const card = document.createElement('div');
      card.className = 'suggestion-item-card';
      card.innerHTML = `
        <div class="suggestion-left">
          <span class="suggestion-rank">${rankEmoji}</span>
          <div class="suggestion-info">
            <span class="suggestion-title">${sug.day} por la ${sug.block}</span>
            <span class="suggestion-count">${sug.count} de ${this.state.friends.length} libres</span>
            <span class="suggestion-voters">Coinciden: ${votersNames}</span>
          </div>
        </div>
        <button class="btn-secondary btn-xs btn-blue" onclick="app.quickCreateJuntada('${sug.day} por la ${sug.block}')">
          <i data-lucide="plus" style="width:10px; height:10px;"></i> Organizar
        </button>
      `;
      suggestionsContainer.appendChild(card);
    });
  }

  quickCreateJuntada(suggestionText) {
    this.openNewJuntadaModal();
    // Pre-llenar el formulario de nueva juntada
    document.getElementById('juntada-title').value = `Juntada: ${suggestionText} 💜`;
    
    // Seleccionar "Fecha Fija" por defecto y en la descripción agregar notas de la fecha
    document.getElementById('juntada-desc').value = `Plan organizado en base al calendario de disponibilidad grupal (${suggestionText}).`;
  }

  shareGroupState() {
    try {
      const stateString = JSON.stringify(this.state);
      const encoded = btoa(unescape(encodeURIComponent(stateString)));
      const shareUrl = `${window.location.origin}${window.location.pathname}#state=${encoded}`;
      
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("¡Enlace de sincronización copiado! Envíalo por WhatsApp a tus amigas para compartir el grupo y tus horarios.");
      }).catch(err => {
        prompt("Copia este enlace y envíaselo a tus amigas:", shareUrl);
      });
    } catch(e) {
      alert("Error al generar el enlace.");
      console.error(e);
    }
  }

  checkImportedState() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#state=')) {
      try {
        const encoded = hash.substring(7);
        const decoded = decodeURIComponent(escape(atob(encoded)));
        const importedState = JSON.parse(decoded);
        
        if (importedState && Array.isArray(importedState.friends) && typeof importedState.availability === 'object') {
          if (confirm("Se detectaron datos compartidos del grupo. ¿Deseas cargarlos en tu aplicación? (Esto actualizará tu calendario y lista de juntadas).")) {
            this.state = importedState;
            this.saveState();
            window.location.hash = '';
            window.location.reload();
          }
        }
      } catch (e) {
        console.error("Error al importar el estado:", e);
        alert("El enlace compartido no es válido o está incompleto.");
      }
    }
  }

  // ------------------------------------------------------------------------
  // PANTALLA 3: AMIGAS DEL GRUPO
  // ------------------------------------------------------------------------
  calculateAttendanceStats() {
    const stats = {};
    
    // Inicializar estadísticas para cada amiga
    this.state.friends.forEach(f => {
      stats[f.id] = { attended: 0, total: 0, percentage: 0 };
    });

    // Calcular asistencia
    // Solo contamos las juntadas con fecha fija (no encuestas activas)
    this.state.juntadas.forEach(j => {
      if (j.isPoll) return; // Si es una encuesta activa, no se cuenta aún para la asistencia real

      this.state.friends.forEach(f => {
        const rsvpStatus = j.rsvp[f.id] || 'pending';
        stats[f.id].total += 1;
        if (rsvpStatus === 'going') {
          stats[f.id].attended += 1;
        }
      });
    });

    // Calcular porcentajes
    this.state.friends.forEach(f => {
      const s = stats[f.id];
      s.percentage = s.total > 0 ? Math.round((s.attended / s.total) * 100) : 0;
    });

    return stats;
  }

  renderFriendsScreen() {
    const container = document.getElementById('friends-list-container');
    container.innerHTML = '';

    const activeFriendId = this.state.activeFriendId;
    const stats = this.calculateAttendanceStats();

    this.state.friends.forEach(friend => {
      const isActive = friend.id === activeFriendId;
      const s = stats[friend.id] || { attended: 0, total: 0, percentage: 0 };

      // Si no hay juntadas registradas en total, mostrar "Sin juntadas"
      const attendanceText = s.total > 0 
        ? `Asistencia: <strong style="color:var(--color-going);">${s.percentage}%</strong> (${s.attended}/${s.total})`
        : `Asistencia: <span style="color:var(--text-muted);">Sin juntadas</span>`;

      const row = document.createElement('div');
      row.className = `friend-settings-row ${isActive ? 'active-user-row' : ''}`;
      row.innerHTML = `
        <div class="friend-card-left">
          <div class="friend-avatar" style="background: ${friend.color}">
            ${friend.name.charAt(0).toUpperCase()}
          </div>
          <div style="display: flex; flex-direction: column;">
            <span class="friend-name" style="font-weight: 700; display: flex; align-items: center; gap: 6px;">
              ${friend.name} 
              ${isActive ? '<span class="text-highlight text-xs" style="font-weight: 600;">(Activa)</span>' : ''}
            </span>
            <span class="friend-attendance-rate" style="font-size: 11px; margin-top: 2px;">
              ${attendanceText}
            </span>
          </div>
        </div>
        <div class="friend-card-actions">
          <button class="btn-star-active ${isActive ? 'is-active' : ''}" onclick="app.setActiveFriend('${friend.id}')" title="Hacer activa">
            <i data-lucide="star" style="fill: ${isActive ? '#f59e0b' : 'none'};"></i>
          </button>
          <button class="btn-delete-friend" onclick="app.deleteFriend('${friend.id}')" title="Eliminar amiga" ${isActive ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ''}>
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `;
      container.appendChild(row);
    });

    lucide.createIcons();
  }

  setActiveFriend(friendId) {
    this.state.activeFriendId = friendId;
    this.saveState();
    
    // Actualizar vistas
    this.renderHeader();
    this.renderDashboard();
    
    // Si estamos en la pantalla de detalles, recargarla
    const activeScreen = document.querySelector('.app-screen.active');
    if (activeScreen.id === 'screen-juntada-detail') {
      this.renderJuntadaDetail();
    } else if (activeScreen.id === 'screen-friends') {
      this.renderFriendsScreen();
    }

    // Cerrar el modal por si se abrió desde allí
    this.closeModal('modal-user-selector');
  }

  handleAddFriendForm(event) {
    event.preventDefault();
    const input = document.getElementById('new-friend-name');
    const name = input.value.trim();

    if (!name) return;

    // Verificar repetido
    const exists = this.state.friends.some(f => f.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      alert("Ya hay una amiga con ese nombre en el grupo.");
      return;
    }

    // Colores lindos aleatorios para avatars
    const colors = ['#8b5cf6', '#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#ef4444', '#14b8a6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newFriend = {
      id: 'f_' + Date.now(),
      name: name,
      color: randomColor
    };

    this.state.friends.push(newFriend);
    this.saveState();

    input.value = '';
    this.renderFriendsScreen();
    this.populateFriendDropdowns();
    
    // Si la juntada destacada tiene una encuesta o rsvp, agregar el rsvp de la nueva amiga como 'pending'
    this.state.juntadas.forEach(j => {
      if (!j.rsvp[newFriend.id]) {
        j.rsvp[newFriend.id] = 'pending';
      }
    });
    this.saveState();
  }

  deleteFriend(friendId) {
    if (friendId === this.state.activeFriendId) {
      alert("No podés eliminar a la amiga activa.");
      return;
    }

    const friend = this.getFriendById(friendId);
    if (!friend) return;

    if (confirm(`¿Segura que querés eliminar a ${friend.name} del grupo? Se borrarán sus confirmaciones.`)) {
      // Eliminar amiga
      this.state.friends = this.state.friends.filter(f => f.id !== friendId);
      
      // Limpiar sus RSVP y asignaciones
      this.state.juntadas.forEach(j => {
        delete j.rsvp[friendId];
        j.checklist.forEach(item => {
          if (item.assigneeId === friendId) {
            item.assigneeId = '';
          }
        });
        // Si hay gastos que pagó ella, quizás sea mejor reasignarlos a 'Desconocido' o alertar, pero para el prototipo los dejamos o borramos
        j.expenses = j.expenses.filter(e => e.payerId !== friendId);
        // Quitarla de participantes de gastos
        j.expenses.forEach(e => {
          e.participants = e.participants.filter(pid => pid !== friendId);
        });
      });

      this.saveState();
      this.renderFriendsScreen();
      this.populateFriendDropdowns();
      
      // Recargar detalles si estábamos allí
      const activeScreen = document.querySelector('.app-screen.active');
      if (activeScreen.id === 'screen-juntada-detail') {
        this.renderJuntadaDetail();
      }
    }
  }

  // ------------------------------------------------------------------------
  // MODALES - MÉTODOS DE CONTROL
  // ------------------------------------------------------------------------
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  }

  closeAllModals() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(m => m.classList.remove('active'));
  }

  openUserSelectorModal() {
    const optionsContainer = document.getElementById('user-selector-options');
    optionsContainer.innerHTML = '';

    this.state.friends.forEach(friend => {
      const isActive = friend.id === this.state.activeFriendId;
      const option = document.createElement('div');
      option.className = `user-picker-option ${isActive ? 'active' : ''}`;
      option.onclick = () => this.setActiveFriend(friend.id);

      option.innerHTML = `
        <div class="user-picker-avatar" style="background: ${friend.color}">
          ${friend.name.charAt(0).toUpperCase()}
        </div>
        <span class="user-picker-name">${friend.name}</span>
      `;
      optionsContainer.appendChild(option);
    });

    this.openModal('modal-user-selector');
  }

  openNewJuntadaModal() {
    // Limpiar formulario anterior
    document.getElementById('form-new-juntada').reset();
    this.toggleDateTypeInput('fixed');
    
    // Resetear opciones de poll adicionales
    const inputsList = document.getElementById('poll-options-inputs-list');
    inputsList.innerHTML = `
      <input type="text" placeholder="Opción 1: Viernes 12/6 a la noche" class="input-text mb-2 poll-option-input">
      <input type="text" placeholder="Opción 2: Sábado 13/6 al mediodía" class="input-text mb-2 poll-option-input">
    `;

    this.openModal('modal-new-juntada');
  }

  toggleDateTypeInput(type) {
    const fixedGroup = document.getElementById('date-fixed-group');
    const pollGroup = document.getElementById('date-poll-group');

    if (type === 'fixed') {
      fixedGroup.style.display = 'flex';
      pollGroup.style.display = 'none';
      document.getElementById('juntada-date').setAttribute('required', 'true');
    } else {
      fixedGroup.style.display = 'none';
      pollGroup.style.display = 'flex';
      document.getElementById('juntada-date').removeAttribute('required');
    }
  }

  addPollOptionInput() {
    const container = document.getElementById('poll-options-inputs-list');
    const currentCount = container.querySelectorAll('.poll-option-input').length;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Opción ${currentCount + 1}`;
    input.className = 'input-text mb-2 poll-option-input';
    
    container.appendChild(input);
  }

  handleCreateJuntada(event) {
    event.preventDefault();
    
    const title = document.getElementById('juntada-title').value.trim();
    const type = document.getElementById('juntada-type').value;
    const emoji = document.getElementById('juntada-emoji').value.trim() || '🎉';
    const location = document.getElementById('juntada-location').value.trim();
    const description = document.getElementById('juntada-desc').value.trim();
    
    const dateType = document.querySelector('input[name="date-type"]:checked').value;
    
    let isPoll = false;
    let fixedDate = null;
    let pollOptions = [];

    if (dateType === 'fixed') {
      fixedDate = document.getElementById('juntada-date').value;
      if (!fixedDate) {
        alert("Por favor selecciona una fecha válida.");
        return;
      }
    } else {
      isPoll = true;
      const optionInputs = document.querySelectorAll('.poll-option-input');
      const optionsText = Array.from(optionInputs).map(inp => inp.value.trim()).filter(val => val !== '');

      if (optionsText.length < 2) {
        alert("Tenés que agregar al menos 2 opciones de fecha para votar.");
        return;
      }

      pollOptions = optionsText.map((text, index) => ({
        id: `o_${Date.now()}_${index}`,
        text: text,
        votes: []
      }));
    }

    // Inicializar RSVP con todas las amigas en 'pending'
    const rsvp = {};
    this.state.friends.forEach(f => {
      rsvp[f.id] = 'pending';
    });

    // La creadora asiste por defecto
    if (this.state.activeFriendId) {
      rsvp[this.state.activeFriendId] = 'going';
    }

    const newJuntada = {
      id: 'j_' + Date.now(),
      title,
      type,
      emoji,
      location,
      description,
      isPoll,
      fixedDate,
      pollOptions,
      rsvp,
      checklist: [],
      expenses: []
    };

    this.state.juntadas.push(newJuntada);
    this.state.activeJuntadaId = newJuntada.id;
    this.saveState();

    this.closeModal('modal-new-juntada');
    this.navigateTo('juntada');
  }

  // Abrir Modal de Gastos
  openNewExpenseModal() {
    const payerSelect = document.getElementById('exp-payer');
    payerSelect.innerHTML = '';

    // Llenar dropdown de pagador
    this.state.friends.forEach(friend => {
      const opt = document.createElement('option');
      opt.value = friend.id;
      opt.innerText = friend.name;
      // Por defecto poner a la amiga activa seleccionada
      if (friend.id === this.state.activeFriendId) {
        opt.selected = true;
      }
      payerSelect.appendChild(opt);
    });

    // Llenar lista de checkboxes de participantes
    const participantsContainer = document.getElementById('exp-participants-checkboxes');
    participantsContainer.innerHTML = '';

    const juntada = this.getActiveJuntada();
    
    this.state.friends.forEach(friend => {
      // Solo sugerir por defecto a los que asisten (confirmados o tal vez)
      const rsvpStatus = juntada?.rsvp[friend.id] || 'pending';
      const shouldCheck = rsvpStatus === 'going' || rsvpStatus === 'maybe' || rsvpStatus === 'pending';

      const label = document.createElement('label');
      label.className = 'participant-checkbox-row';
      label.innerHTML = `
        <input type="checkbox" value="${friend.id}" ${shouldCheck ? 'checked' : ''} class="exp-part-check">
        <span>${friend.name} (${rsvpStatus === 'going' ? 'Voy' : rsvpStatus === 'maybe' ? 'En duda' : rsvpStatus === 'cant' ? 'No voy' : 'Sin resp.'})</span>
      `;
      participantsContainer.appendChild(label);
    });

    // Limpiar montos y descripciones
    document.getElementById('form-new-expense').reset();

    this.openModal('modal-new-expense');
  }

  handleCreateExpense(event) {
    event.preventDefault();

    const payerId = document.getElementById('exp-payer').value;
    const amountInput = document.getElementById('exp-amount').value;
    const desc = document.getElementById('exp-desc').value.trim();

    const amount = parseFloat(amountInput);
    if (isNaN(amount) || amount <= 0) {
      alert("Ingresá un monto válido.");
      return;
    }

    // Obtener participantes seleccionados
    const checkboxes = document.querySelectorAll('.exp-part-check:checked');
    const participants = Array.from(checkboxes).map(cb => cb.value);

    if (participants.length === 0) {
      alert("Al menos una amiga tiene que participar del gasto.");
      return;
    }

    const juntada = this.getActiveJuntada();
    if (!juntada) return;

    const newExpense = {
      id: 'e_' + Date.now(),
      payerId,
      amount,
      desc,
      participants
    };

    juntada.expenses.push(newExpense);
    this.saveState();

    this.closeModal('modal-new-expense');
    this.renderTabCuentas(juntada);
  }

  // Abrir Modal de Checklist
  openNewChecklistItemModal() {
    const assigneeSelect = document.getElementById('checklist-item-assignee');
    assigneeSelect.innerHTML = '<option value="">Nadie aún (lo elige cualquiera)</option>';

    this.state.friends.forEach(friend => {
      const opt = document.createElement('option');
      opt.value = friend.id;
      opt.innerText = friend.name;
      assigneeSelect.appendChild(opt);
    });

    document.getElementById('form-new-checklist').reset();
    this.openModal('modal-new-checklist');
  }

  handleCreateChecklistItem(event) {
    event.preventDefault();

    const name = document.getElementById('checklist-item-name').value.trim();
    const qty = document.getElementById('checklist-item-qty').value.trim();
    const assigneeId = document.getElementById('checklist-item-assignee').value;

    const juntada = this.getActiveJuntada();
    if (!juntada) return;

    const newItem = {
      id: 'c_' + Date.now(),
      name,
      qty,
      assigneeId
    };

    if (!juntada.checklist) {
      juntada.checklist = [];
    }

    juntada.checklist.push(newItem);
    this.saveState();

    this.closeModal('modal-new-checklist');
    this.renderTabChecklist(juntada);
  }

  // ------------------------------------------------------------------------
  // MÉTODOS AUXILIARES Y UTILS
  // ------------------------------------------------------------------------
  
  // Amiga activa en el simulador
  getActiveFriend() {
    return this.getFriendById(this.state.activeFriendId);
  }

  getFriendById(id) {
    return this.state.friends.find(f => f.id === id);
  }

  // Juntada seleccionada
  getActiveJuntada() {
    return this.state.juntadas.find(j => j.id === this.state.activeJuntadaId);
  }

  // Poblar los selects con las amigas cargadas en tiempo de ejecución
  populateFriendDropdowns() {
    // Este método se puede llamar cada vez que se agrega/elimina una amiga
  }

  // Formato legible de fecha
  formatDateLegible(dateString) {
    if (!dateString) return 'Sin fecha';
    
    // Si la fecha ya fue fijada por votación, podría ser un texto descriptivo
    if (dateString.includes('Viernes') || dateString.includes('Sábado') || dateString.includes('Domingo')) {
      return `📅 ${dateString}`;
    }

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return `📅 ${dateString}`; // Si falló el parseo pero tiene un texto, devolverlo
      
      const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
      const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      
      const diaSemana = dias[date.getDay()];
      const diaNum = date.getDate();
      const mesText = meses[date.getMonth()];
      
      let horas = date.getHours();
      let minutos = date.getMinutes();
      
      // Formatear minutos
      minutos = minutos < 10 ? '0' + minutos : minutos;
      
      return `📅 ${diaSemana} ${diaNum} de ${mesText} - ${horas}:${minutos} hs`;
    } catch(e) {
      return `📅 ${dateString}`;
    }
  }

  // Formato numérico para precios (ej: 12.500)
  formatNumber(num) {
    return Number(num).toLocaleString('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

  // ------------------------------------------------------------------------
  // SECCIÓN DE JUEGOS DE MESA DIGITALES
  // ------------------------------------------------------------------------
  startGame(type) {
    if (this.gamesState.timerInterval) {
      clearInterval(this.gamesState.timerInterval);
    }
    
    this.gamesState.activeGame = type;
    this.gamesState.usedPhrases[type] = [];
    if (type === 'verdad-reto') {
      this.gamesState.usedPhrases['verdades'] = [];
      this.gamesState.usedPhrases['retos'] = [];
    }

    // Cambiar visibilidad de menús y contenedor
    document.getElementById('games-menu').style.display = 'none';
    const container = document.getElementById('game-active-container');
    container.style.display = 'flex';

    // Setear título
    const titleElement = document.getElementById('game-active-title');
    if (type === 'yo-nunca') {
      titleElement.innerText = 'Yo Nunca Nunca 🍷';
    } else if (type === 'verdad-reto') {
      titleElement.innerText = 'Verdad o Reto 🔥';
    } else if (type === 'probablemente') {
      titleElement.innerText = '¿Quién es más probable...? 🤷‍♀️';
    } else if (type === 'taboo') {
      titleElement.innerText = 'Tabú 🤫';
    } else if (type === 'impostor') {
      titleElement.innerText = 'El Impostor 🕵️‍♀️';
    } else if (type === 'quien-soy') {
      titleElement.innerText = '¿Quién soy? 🎭';
    }

    // Ocultar todos los sub-cuerpos
    document.getElementById('game-body-default').style.display = 'none';
    document.getElementById('game-body-taboo').style.display = 'none';
    document.getElementById('game-body-quiensoy').style.display = 'none';
    document.getElementById('game-body-impostor').style.display = 'none';

    // Ocultar todos los controles
    document.getElementById('game-turn-badge').style.display = 'none';
    document.getElementById('game-controls-normal').style.display = 'none';
    document.getElementById('game-controls-truth-dare').style.display = 'none';
    document.getElementById('game-controls-next-turn').style.display = 'none';
    document.getElementById('game-controls-taboo').style.display = 'none';
    document.getElementById('game-controls-quiensoy').style.display = 'none';

    if (type === 'verdad-reto') {
      document.getElementById('game-body-default').style.display = 'flex';
      document.getElementById('game-turn-badge').style.display = 'flex';
      document.getElementById('game-controls-truth-dare').style.display = 'flex';
      this.selectNextTruthDarePlayer();
    } else if (type === 'yo-nunca' || type === 'probablemente') {
      document.getElementById('game-body-default').style.display = 'flex';
      document.getElementById('game-controls-normal').style.display = 'block';
      this.nextGamePhrase();
    } else if (type === 'taboo') {
      document.getElementById('game-body-taboo').style.display = 'flex';
      document.getElementById('game-controls-taboo').style.display = 'flex';
      this.startTabooRound();
    } else if (type === 'quien-soy') {
      document.getElementById('game-body-quiensoy').style.display = 'flex';
      document.getElementById('quiensoy-category-select').style.display = 'block';
      document.getElementById('quiensoy-play-screen').style.display = 'none';
    } else if (type === 'impostor') {
      document.getElementById('game-body-impostor').style.display = 'flex';
      this.startImpostorRound();
    }

    lucide.createIcons();
  }

  selectNextTruthDarePlayer() {
    const friends = this.state.friends;
    const turnBadge = document.getElementById('game-turn-badge');
    const turnText = document.getElementById('game-turn-text');
    
    if (friends.length === 0) {
      turnText.innerText = 'Turno de: Invitada';
      this.gamesState.currentTurnFriendId = null;
    } else {
      // Intentamos elegir una amiga al azar diferente de la anterior si hay más de 1
      let nextFriend = null;
      if (friends.length > 1 && this.gamesState.currentTurnFriendId) {
        const otherFriends = friends.filter(f => f.id !== this.gamesState.currentTurnFriendId);
        nextFriend = otherFriends[Math.floor(Math.random() * otherFriends.length)];
      } else {
        nextFriend = friends[Math.floor(Math.random() * friends.length)];
      }
      this.gamesState.currentTurnFriendId = nextFriend.id;
      turnText.innerText = `Turno de: ${nextFriend.name}`;
      
      // Personalizar el badge con el color de la amiga
      turnBadge.style.background = `rgba(${parseInt(nextFriend.color.slice(1,3), 16) || 139}, ${parseInt(nextFriend.color.slice(3,5), 16) || 92}, ${parseInt(nextFriend.color.slice(5,7), 16) || 246}, 0.15)`;
      turnBadge.style.borderColor = nextFriend.color;
      turnText.style.color = nextFriend.color;
    }

    const phraseText = document.getElementById('game-phrase-text');
    phraseText.innerText = '¿Qué vas a elegir?';
    phraseText.style.color = 'var(--text-secondary)';
    phraseText.style.fontStyle = 'italic';
  }

  showTruth() {
    const db = this.gamesState.isSpicy ? this.gamesSpicyDb : this.gamesDb;
    const list = db['verdades'];
    const used = this.gamesState.usedPhrases['verdades'];

    if (used.length >= list.length) {
      this.gamesState.usedPhrases['verdades'] = [];
    }

    const available = list.filter(p => !this.gamesState.usedPhrases['verdades'].includes(p));
    const randomPhrase = available.length > 0 
      ? available[Math.floor(Math.random() * available.length)]
      : list[Math.floor(Math.random() * list.length)];
    this.gamesState.usedPhrases['verdades'].push(randomPhrase);

    const phraseText = document.getElementById('game-phrase-text');
    phraseText.innerText = randomPhrase;
    phraseText.style.color = '#fff';
    phraseText.style.fontStyle = 'normal';

    // Ocultar botones de Verdad/Reto, mostrar Siguiente Turno
    document.getElementById('game-controls-truth-dare').style.display = 'none';
    document.getElementById('game-controls-next-turn').style.display = 'block';
  }

  showDare() {
    const db = this.gamesState.isSpicy ? this.gamesSpicyDb : this.gamesDb;
    const list = db['retos'];
    const used = this.gamesState.usedPhrases['retos'];

    if (used.length >= list.length) {
      this.gamesState.usedPhrases['retos'] = [];
    }

    const available = list.filter(p => !this.gamesState.usedPhrases['retos'].includes(p));
    const randomPhrase = available.length > 0 
      ? available[Math.floor(Math.random() * available.length)]
      : list[Math.floor(Math.random() * list.length)];
    this.gamesState.usedPhrases['retos'].push(randomPhrase);

    const phraseText = document.getElementById('game-phrase-text');
    phraseText.innerText = randomPhrase;
    phraseText.style.color = '#fff';
    phraseText.style.fontStyle = 'normal';

    // Ocultar botones de Verdad/Reto, mostrar Siguiente Turno
    document.getElementById('game-controls-truth-dare').style.display = 'none';
    document.getElementById('game-controls-next-turn').style.display = 'block';
  }

  nextTruthDareTurn() {
    // Volver a mostrar botones de verdad/reto, ocultar siguiente turno
    document.getElementById('game-controls-truth-dare').style.display = 'flex';
    document.getElementById('game-controls-next-turn').style.display = 'none';

    // Seleccionar siguiente jugadora
    this.selectNextTruthDarePlayer();
  }

  nextGamePhrase() {
    const type = this.gamesState.activeGame;
    if (!type || type === 'verdad-reto') return;

    const db = this.gamesState.isSpicy ? this.gamesSpicyDb : this.gamesDb;
    const list = db[type];
    const used = this.gamesState.usedPhrases[type];

    if (used.length >= list.length) {
      this.gamesState.usedPhrases[type] = [];
    }

    const available = list.filter(p => !this.gamesState.usedPhrases[type].includes(p));
    const randomPhrase = available.length > 0 
      ? available[Math.floor(Math.random() * available.length)]
      : list[Math.floor(Math.random() * list.length)];
    this.gamesState.usedPhrases[type].push(randomPhrase);

    const phraseText = document.getElementById('game-phrase-text');
    phraseText.innerText = randomPhrase;
    phraseText.style.color = '#fff';
    phraseText.style.fontStyle = 'normal';
  }

  exitGame() {
    if (this.gamesState.timerInterval) {
      clearInterval(this.gamesState.timerInterval);
    }
    
    this.gamesState.activeGame = null;
    this.gamesState.currentTurnFriendId = null;

    // Volver a mostrar el menú y ocultar contenedor del juego
    document.getElementById('games-menu').style.display = 'block';
    document.getElementById('game-active-container').style.display = 'none';
    
    // Desmarcar picante si se sale
    const toggleInput = document.getElementById('game-spicy-toggle');
    if (toggleInput) {
      toggleInput.checked = false;
      this.toggleSpicyMode(false);
    }
  }

  toggleSpicyMode(isSpicy) {
    this.gamesState.isSpicy = isSpicy;
    const slider = document.getElementById('spicy-slider-visual');
    const knob = document.getElementById('spicy-slider-knob');
    if (!slider || !knob) return;
    
    if (isSpicy) {
      slider.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
      slider.style.borderColor = '#ef4444';
      knob.style.transform = 'translateX(20px)';
      knob.style.backgroundColor = '#ef4444';
    } else {
      slider.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      slider.style.borderColor = 'var(--border-light)';
      knob.style.transform = 'translateX(0)';
      knob.style.backgroundColor = '#fff';
    }
  }

  // ------------------------------------------------------------------------
  // LÓGICA DE JUEGOS ADICIONALES (TABÚ, IMPLOSTOR, QUIÉN SOY)
  // ------------------------------------------------------------------------
  startTabooRound() {
    this.gamesState.tabooScore = 0;
    this.gamesState.tabooUsed = [];
    document.getElementById('taboo-score-badge').innerText = `Puntos este turno: 0`;
    
    this.nextTabooCard();
    this.startTabooTimer();
  }

  startTabooTimer() {
    if (this.gamesState.timerInterval) clearInterval(this.gamesState.timerInterval);
    this.gamesState.tabooTimer = 60;
    const timerBadge = document.getElementById('taboo-timer-badge');
    timerBadge.innerText = `⏱️ 60s`;
    
    this.gamesState.timerInterval = setInterval(() => {
      this.gamesState.tabooTimer--;
      timerBadge.innerText = `⏱️ ${this.gamesState.tabooTimer}s`;
      if (this.gamesState.tabooTimer <= 0) {
        clearInterval(this.gamesState.timerInterval);
        alert(`¡Tiempo terminado! Lograron ${this.gamesState.tabooScore} puntos.`);
        this.exitGame();
      }
    }, 1000);
  }

  nextTabooCard() {
    const list = this.gamesDb['taboo'];
    const available = list.filter(item => !this.gamesState.tabooUsed.includes(item.word));
    
    let card = null;
    if (available.length === 0) {
      this.gamesState.tabooUsed = [];
      card = list[Math.floor(Math.random() * list.length)];
    } else {
      card = available[Math.floor(Math.random() * available.length)];
    }
    
    this.gamesState.tabooUsed.push(card.word);
    this.gamesState.tabooCurrentWord = card;
    
    document.getElementById('taboo-word-title').innerText = card.word;
    const forbiddenList = document.getElementById('taboo-forbidden-list');
    forbiddenList.innerHTML = card.taboo.map(word => `<span style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 4px 0;">${word}</span>`).join('');
  }

  tabooNextPhrase(isCorrect) {
    if (isCorrect) {
      this.gamesState.tabooScore++;
    } else {
      this.gamesState.tabooScore--;
    }
    document.getElementById('taboo-score-badge').innerText = `Puntos este turno: ${this.gamesState.tabooScore}`;
    this.nextTabooCard();
  }

  startQuienSoyRound(category) {
    this.gamesState.quienSoyCategory = category;
    this.gamesState.quienSoyScore = 0;
    this.gamesState.quienSoyUsed = [];
    
    document.getElementById('quiensoy-category-select').style.display = 'none';
    document.getElementById('quiensoy-play-screen').style.display = 'block';
    document.getElementById('game-controls-quiensoy').style.display = 'flex';
    document.getElementById('quiensoy-score-badge').innerText = `Adivinadas: 0`;
    
    this.nextQuienSoyCard();
    this.startQuienSoyTimer();
  }

  startQuienSoyTimer() {
    if (this.gamesState.timerInterval) clearInterval(this.gamesState.timerInterval);
    this.gamesState.quienSoyTimer = 60;
    const timerBadge = document.getElementById('quiensoy-timer-badge');
    timerBadge.innerText = `⏱️ 60s`;
    
    this.gamesState.timerInterval = setInterval(() => {
      this.gamesState.quienSoyTimer--;
      timerBadge.innerText = `⏱️ ${this.gamesState.quienSoyTimer}s`;
      if (this.gamesState.quienSoyTimer <= 0) {
        clearInterval(this.gamesState.timerInterval);
        alert(`¡Tiempo terminado! Adivinaste ${this.gamesState.quienSoyScore} palabras.`);
        this.exitGame();
      }
    }, 1000);
  }

  nextQuienSoyCard() {
    const list = this.gamesDb['quien-soy'][this.gamesState.quienSoyCategory];
    const available = list.filter(w => !this.gamesState.quienSoyUsed.includes(w));
    
    let word = '';
    if (available.length === 0) {
      this.gamesState.quienSoyUsed = [];
      word = list[Math.floor(Math.random() * list.length)];
    } else {
      word = available[Math.floor(Math.random() * available.length)];
    }
    
    this.gamesState.quienSoyUsed.push(word);
    this.gamesState.quienSoyCurrentWord = word;
    
    document.getElementById('quiensoy-card-text').innerText = word;
  }

  quienSoyNextPhrase(isCorrect) {
    if (isCorrect) {
      this.gamesState.quienSoyScore++;
      document.getElementById('quiensoy-score-badge').innerText = `Adivinadas: ${this.gamesState.quienSoyScore}`;
    }
    this.nextQuienSoyCard();
  }

  startImpostorRound() {
    const friends = this.state.friends;
    if (friends.length < 3) {
      alert("Para jugar a El Impostor necesitan al menos 3 amigas registradas. ¡Agregá más en la sección de Amigas!");
      this.exitGame();
      return;
    }

    this.gamesState.impostorPhase = 'select';
    
    // Mostrar selector de jugadoras y ocultar los demás pasos
    document.getElementById('impostor-select-step').style.display = 'block';
    document.getElementById('impostor-pass-step').style.display = 'none';
    document.getElementById('impostor-play-step').style.display = 'none';
    document.getElementById('impostor-vote-step').style.display = 'none';
    document.getElementById('impostor-result-message').style.display = 'none';

    // Renderizar lista de checkboxes
    const selectionList = document.getElementById('impostor-players-selection-list');
    selectionList.innerHTML = '';
    
    friends.forEach(friend => {
      const row = document.createElement('label');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.gap = '10px';
      row.style.background = 'rgba(255,255,255,0.03)';
      row.style.padding = '8px 12px';
      row.style.borderRadius = '8px';
      row.style.cursor = 'pointer';
      row.style.border = '1px solid var(--border-light)';
      
      row.innerHTML = `
        <input type="checkbox" value="${friend.id}" checked class="impostor-player-check" style="cursor: pointer; width: 16px; height: 16px;">
        <div class="user-avatar-mini" style="background: ${friend.color}; width: 24px; height: 24px; font-size: 11px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff;">
          ${friend.name.charAt(0).toUpperCase()}
        </div>
        <span style="font-weight: 600; color: #fff; font-size: 13px;">${friend.name}</span>
      `;
      selectionList.appendChild(row);
    });
  }

  impostorConfirmPlayers() {
    const checkboxes = document.querySelectorAll('.impostor-player-check:checked');
    const selectedIds = Array.from(checkboxes).map(cb => cb.value);

    if (selectedIds.length < 3) {
      alert("Tienen que seleccionar al menos 3 jugadoras para jugar.");
      return;
    }

    // 1. Elegir palabra secreta de la lista
    const words = this.gamesDb['impostor'];
    const secretWord = words[Math.floor(Math.random() * words.length)];

    // 2. Elegir quién es la impostora
    const impostorIndex = Math.floor(Math.random() * selectedIds.length);
    const impostorFriendId = selectedIds[impostorIndex];

    // 3. Crear lista de jugadoras activas
    this.gamesState.impostorPlayers = selectedIds.map(id => {
      const friend = this.getFriendById(id);
      const isImpostor = id === impostorFriendId;
      return {
        id: friend.id,
        name: friend.name,
        color: friend.color,
        isAlive: true,
        role: isImpostor ? 'impostor' : 'civil',
        word: isImpostor ? 'Impostor' : secretWord
      };
    });

    this.gamesState.impostorCurrentPlayerIndex = 0;
    this.gamesState.impostorPhase = 'pass';
    
    // Ocultar selector e iniciar pase de celular
    document.getElementById('impostor-select-step').style.display = 'none';
    this.impostorShowPassScreen();
  }

  impostorShowPassScreen() {
    const players = this.gamesState.impostorPlayers;
    const index = this.gamesState.impostorCurrentPlayerIndex;

    if (index >= players.length) {
      // Todas leyeron, ir a fase de describir
      this.impostorStartPlayPhase();
      return;
    }

    const currentPlayer = players[index];
    
    document.getElementById('impostor-pass-step').style.display = 'block';
    document.getElementById('impostor-play-step').style.display = 'none';
    document.getElementById('impostor-vote-step').style.display = 'none';

    // Setear avatar y nombre
    const avatar = document.getElementById('impostor-current-avatar');
    avatar.innerText = currentPlayer.name.charAt(0).toUpperCase();
    avatar.style.background = currentPlayer.color;
    
    document.getElementById('impostor-current-player-name').innerText = `Turno de: ${currentPlayer.name}`;
    
    // Resetear botones y cajas
    document.getElementById('btn-impostor-reveal').style.display = 'block';
    document.getElementById('impostor-secret-word-box').style.display = 'none';
  }

  impostorRevealWord() {
    const players = this.gamesState.impostorPlayers;
    const index = this.gamesState.impostorCurrentPlayerIndex;
    const currentPlayer = players[index];

    document.getElementById('btn-impostor-reveal').style.display = 'none';
    
    const wordBox = document.getElementById('impostor-secret-word-box');
    wordBox.style.display = 'block';
    
    const wordText = document.getElementById('impostor-word-text');
    wordText.innerText = currentPlayer.word;
    wordText.style.color = currentPlayer.color;
    wordBox.style.borderColor = currentPlayer.color;
  }

  impostorHideWord() {
    // Pasar a la siguiente jugadora
    this.gamesState.impostorCurrentPlayerIndex++;
    this.impostorShowPassScreen();
  }

  impostorStartPlayPhase() {
    this.gamesState.impostorPhase = 'play';
    
    document.getElementById('impostor-pass-step').style.display = 'none';
    document.getElementById('impostor-play-step').style.display = 'block';
    document.getElementById('impostor-vote-step').style.display = 'none';

    // Elegir quién empieza describiendo de las vivas
    const alivePlayers = this.gamesState.impostorPlayers.filter(p => p.isAlive);
    const starter = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
    this.gamesState.impostorStarterFriendId = starter.id;
    
    document.getElementById('impostor-starter-friend').innerText = starter.name;
    document.getElementById('impostor-starter-friend').style.color = starter.color;
  }

  impostorGoToVoting() {
    this.gamesState.impostorPhase = 'vote';
    
    document.getElementById('impostor-pass-step').style.display = 'none';
    document.getElementById('impostor-play-step').style.display = 'none';
    document.getElementById('impostor-vote-step').style.display = 'block';
    
    document.getElementById('impostor-result-message').style.display = 'none';

    this.impostorRenderVotingGrid();
  }

  impostorRenderVotingGrid() {
    const grid = document.getElementById('impostor-voting-grid');
    grid.innerHTML = '';

    const alivePlayers = this.gamesState.impostorPlayers.filter(p => p.isAlive);

    alivePlayers.forEach(player => {
      const btn = document.createElement('button');
      btn.className = 'btn-secondary btn-full';
      btn.style.borderLeft = `4px solid ${player.color}`;
      btn.style.textAlign = 'left';
      btn.style.paddingLeft = '12px';
      btn.innerHTML = `<span style="font-weight: 700;">${player.name}</span>`;
      btn.onclick = () => this.impostorVotePlayer(player.id);
      grid.appendChild(btn);
    });
  }

  impostorVotePlayer(friendId) {
    const players = this.gamesState.impostorPlayers;
    const votedPlayer = players.find(p => p.id === friendId);
    if (!votedPlayer) return;

    const msgBox = document.getElementById('impostor-result-message');
    msgBox.style.display = 'block';

    const civilWord = players.find(p => p.role === 'civil')?.word || '';
    const impostorPlayer = players.find(p => p.role === 'impostor');

    if (votedPlayer.role === 'impostor') {
      // 1. Ganaron las civiles
      msgBox.style.backgroundColor = 'rgba(16, 185, 129, 0.15)'; // Green
      msgBox.style.border = '1px solid #10b981';
      msgBox.style.color = '#10b981';
      msgBox.innerHTML = `
        <strong>🎉 ¡ACERTARON!</strong><br>
        <span style="font-weight: 700; color: #fff;">${votedPlayer.name} era la Impostora.</span><br>
        La palabra secreta de las Civiles era: <strong>${civilWord}</strong>.
      `;
      
      // Ocultar grid
      document.getElementById('impostor-voting-grid').innerHTML = '';
      
      // Agregar botón para salir/reiniciar
      const btnExit = document.createElement('button');
      btnExit.className = 'btn-primary btn-full btn-blue mt-3';
      btnExit.innerText = 'Volver al Menú ➔';
      btnExit.onclick = () => this.exitGame();
      document.getElementById('impostor-voting-grid').appendChild(btnExit);
      
    } else {
      // 2. Eliminaron a una civil inocente
      votedPlayer.isAlive = false;
      
      // Verificar si quedan suficientes jugadoras
      const alivePlayers = players.filter(p => p.isAlive);
      const impostorAlive = alivePlayers.some(p => p.role === 'impostor');

      // Si quedan 2 jugadoras vivas en total (incluyendo la impostora), gana la impostora
      if (alivePlayers.length <= 2 && impostorAlive) {
        msgBox.style.backgroundColor = 'rgba(239, 68, 68, 0.15)'; // Red
        msgBox.style.border = '1px solid #ef4444';
        msgBox.style.color = '#ef4444';
        msgBox.innerHTML = `
          <strong>👿 ¡GANÓ LA IMPOSTORA!</strong><br>
          Se eliminó a <span style="font-weight: 700; color: #fff;">${votedPlayer.name} (Civil inocente)</span>.<br>
          La impostora era <strong>${impostorPlayer.name}</strong>.<br>
          La palabra secreta era: <strong>${civilWord}</strong>.
        `;
        
        document.getElementById('impostor-voting-grid').innerHTML = '';
        const btnExit = document.createElement('button');
        btnExit.className = 'btn-primary btn-full btn-violet mt-3';
        btnExit.innerText = 'Volver al Menú ➔';
        btnExit.onclick = () => this.exitGame();
        document.getElementById('impostor-voting-grid').appendChild(btnExit);
      } else {
        // El juego continúa, ronda de descripción
        alert(`¡${votedPlayer.name} era Civil inocente! Quedan ${alivePlayers.length} jugadoras vivas. Prepárense para otra ronda de pistas.`);
        this.impostorStartPlayPhase();
      }
    }
  }

  deleteActiveJuntada() {
    const activeJuntada = this.getActiveJuntada();
    if (!activeJuntada) return;

    if (confirm(`¿Segura que querés eliminar la juntada "${activeJuntada.title}"? Se borrarán todos sus gastos, checklist y asistencias asociadas.`)) {
      // Filtrar de la lista
      this.state.juntadas = this.state.juntadas.filter(j => j.id !== activeJuntada.id);
      
      // Establecer otra juntada activa si queda alguna
      this.state.activeJuntadaId = this.state.juntadas.length > 0 ? this.state.juntadas[this.state.juntadas.length - 1].id : null;
      
      this.saveState();
      
      // Volver a la pantalla de inicio
      this.navigateTo('dashboard');
    }
  }

  // ------------------------------------------------------------------------
  // RULETA DE COMIDAS
  // ------------------------------------------------------------------------
  drawFoodWheel() {
    const canvas = document.getElementById('food-roulette-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = width / 2 - 10;
    const foods = this.gamesDb['roulette_foods'];
    const numSegments = foods.length;
    const segmentAngle = (2 * Math.PI) / numSegments;

    // Colores alternados neon muy premium
    const colors = ['#8b5cf6', '#3b82f6', '#d946ef', '#06b6d4'];

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < numSegments; i++) {
      const startAngle = i * segmentAngle;
      const endAngle = (i + 1) * segmentAngle;
      const color = colors[i % colors.length];

      // Dibujar rebanada
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Borde sutil
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Dibujar emoji y texto
      ctx.save();
      ctx.translate(cx, cy);
      // Rotar hasta el medio de la rebanada
      const midAngle = startAngle + segmentAngle / 2;
      ctx.rotate(midAngle);
      
      // Alinear texto
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      
      // Letra premium
      ctx.font = 'bold 11px Outfit, system-ui, -apple-system, sans-serif';
      
      // Dibujar el emoji + comida
      const food = foods[i];
      const text = `${food.emoji} ${food.name}`;
      ctx.fillText(text, radius - 15, 0);
      ctx.restore();
    }

    // Dibujar círculo central (donut)
    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, 2 * Math.PI);
    ctx.fillStyle = '#000000'; // Fondo oscuro absoluto
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  spinFoodWheel() {
    if (this.gamesState.isSpinning) return;

    const foods = this.gamesDb['roulette_foods'];
    if (!foods || foods.length === 0) return;

    this.gamesState.isSpinning = true;
    
    // Deshabilitar botón visualmente
    const spinBtn = document.getElementById('btn-spin-wheel');
    if (spinBtn) {
      spinBtn.disabled = true;
      spinBtn.style.opacity = '0.7';
      spinBtn.style.cursor = 'not-allowed';
      spinBtn.innerHTML = '...';
    }

    // Ocultar tarjeta de resultado anterior
    const resultCard = document.getElementById('roulette-result-card');
    if (resultCard) {
      resultCard.style.display = 'none';
      resultCard.classList.remove('roulette-result-active');
    }

    // Elegir comida ganadora al azar
    const winIndex = Math.floor(Math.random() * foods.length);
    const winningFood = foods[winIndex];

    const canvas = document.getElementById('food-roulette-canvas');
    if (!canvas) return;

    const segmentAngle = 360 / foods.length;
    const midAngle = (winIndex + 0.5) * segmentAngle;
    const extraTurns = 5;

    // Calcular el siguiente ángulo de rotación continuo
    if (this.rouletteRotation === undefined) {
      this.rouletteRotation = 0;
    }
    const currentCompletedTurnsAngle = this.rouletteRotation + (360 - (this.rouletteRotation % 360));
    const targetAngle = (270 - midAngle + 360) % 360;
    const nextRotation = currentCompletedTurnsAngle + targetAngle + (extraTurns * 360);
    this.rouletteRotation = nextRotation;

    // Aplicar rotación al canvas
    canvas.style.transform = `rotate(${nextRotation}deg)`;

    // Esperar la transición
    setTimeout(() => {
      this.gamesState.isSpinning = false;
      this.gamesState.lastSelectedFood = winningFood;

      if (spinBtn) {
        spinBtn.disabled = false;
        spinBtn.style.opacity = '1';
        spinBtn.style.cursor = 'pointer';
        spinBtn.innerHTML = 'GIRAR<br>🎯';
      }

      const resultFood = document.getElementById('roulette-result-food');
      if (resultFood) {
        resultFood.innerText = `${winningFood.emoji} ${winningFood.name}`;
      }

      if (resultCard) {
        resultCard.style.display = 'flex';
        resultCard.classList.add('roulette-result-active');
      }

      // Mostrar botón para agregar a checklist si hay juntada activa
      const addChecklistBtn = document.getElementById('btn-roulette-add-checklist');
      if (addChecklistBtn) {
        if (this.state.activeJuntadaId) {
          addChecklistBtn.style.display = 'inline-flex';
        } else {
          addChecklistBtn.style.display = 'none';
        }
      }
      
      // Crear iconos de Lucide actualizados si los hay
      lucide.createIcons();
    }, 4000); // 4 segundos de transición
  }

  addRouletteFoodToChecklist() {
    const food = this.gamesState.lastSelectedFood;
    const juntada = this.getActiveJuntada();
    if (!food || !juntada) return;

    const newItem = {
      id: 'c_' + Date.now(),
      name: `${food.emoji} ${food.name}`,
      qty: '1 porción/grupo',
      assigneeId: '' // Inicialmente sin asignar para que cualquiera lo agarre
    };

    if (!juntada.checklist) {
      juntada.checklist = [];
    }

    juntada.checklist.push(newItem);
    this.saveState();

    alert(`¡"${food.emoji} ${food.name}" se agregó al checklist de la juntada "${juntada.title}"!`);

    // Redirigir al checklist de la juntada para que lo vean
    this.state.activeJuntadaTab = 'checklist';
    this.navigateTo('juntada');
  }
}

// Inicializar la app global
const app = new JuntadasApp();
window.app = app;
