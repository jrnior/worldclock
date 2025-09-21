
const defaultTimezones = [
    { city: 'São Paulo', country: 'Brasil', timezone: 'America/Sao_Paulo' },
    { city: 'Nova York', country: 'Estados Unidos', timezone: 'America/New_York' },
    { city: 'Londres', country: 'Reino Unido', timezone: 'Europe/London' },
    { city: 'Tóquio', country: 'Japão', timezone: 'Asia/Tokyo' },
    { city: 'Sydney', country: 'Austrália', timezone: 'Australia/Sydney' },
    { city: 'Dubai', country: 'Emirados Árabes Unidos', timezone: 'Asia/Dubai' }
];


const allTimezones = [
    { city: 'São Paulo', country: 'Brasil', timezone: 'America/Sao_Paulo' },
    { city: 'Rio de Janeiro', country: 'Brasil', timezone: 'America/Sao_Paulo' },
    { city: 'Brasília', country: 'Brasil', timezone: 'America/Sao_Paulo' },
    { city: 'Nova York', country: 'Estados Unidos', timezone: 'America/New_York' },
    { city: 'Los Angeles', country: 'Estados Unidos', timezone: 'America/Los_Angeles' },
    { city: 'Chicago', country: 'Estados Unidos', timezone: 'America/Chicago' },
    { city: 'Londres', country: 'Reino Unido', timezone: 'Europe/London' },
    { city: 'Paris', country: 'França', timezone: 'Europe/Paris' },
    { city: 'Berlim', country: 'Alemanha', timezone: 'Europe/Berlin' },
    { city: 'Roma', country: 'Itália', timezone: 'Europe/Rome' },
    { city: 'Madrid', country: 'Espanha', timezone: 'Europe/Madrid' },
    { city: 'Moscou', country: 'Rússia', timezone: 'Europe/Moscow' },
    { city: 'Tóquio', country: 'Japão', timezone: 'Asia/Tokyo' },
    { city: 'Pequim', country: 'China', timezone: 'Asia/Shanghai' },
    { city: 'Mumbai', country: 'Índia', timezone: 'Asia/Kolkata' },
    { city: 'Dubai', country: 'Emirados Árabes Unidos', timezone: 'Asia/Dubai' },
    { city: 'Sydney', country: 'Austrália', timezone: 'Australia/Sydney' },
    { city: 'Melbourne', country: 'Austrália', timezone: 'Australia/Melbourne' },
    { city: 'Cairo', country: 'Egito', timezone: 'Africa/Cairo' },
    { city: 'Lagos', country: 'Nigéria', timezone: 'Africa/Lagos' },
    { city: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires' },
    { city: 'México City', country: 'México', timezone: 'America/Mexico_City' },
    { city: 'Toronto', country: 'Canadá', timezone: 'America/Toronto' },
    { city: 'Vancouver', country: 'Canadá', timezone: 'America/Vancouver' },
    { city: 'Seul', country: 'Coreia do Sul', timezone: 'Asia/Seoul' },
    { city: 'Bangkok', country: 'Tailândia', timezone: 'Asia/Bangkok' },
    { city: 'Singapura', country: 'Singapura', timezone: 'Asia/Singapore' },
    { city: 'Hong Kong', country: 'Hong Kong', timezone: 'Asia/Hong_Kong' }
];

let activeTimezones = [...defaultTimezones];


function updateClocks() {
    const existingClocks = document.querySelectorAll('.clock-card');
    
    
    if (existingClocks.length === 0) {
        const clocksGrid = document.getElementById('clocksGrid');
        const addButton = clocksGrid.querySelector('.add-timezone');
        
        activeTimezones.forEach((tz, index) => {
            const clockCard = createClockCard(tz, index);
            clocksGrid.insertBefore(clockCard, addButton);
        });
        return;
    }

    
    activeTimezones.forEach((tz, index) => {
        if (existingClocks[index]) {
            const now = new Date();
            const timeInZone = new Intl.DateTimeFormat('pt-BR', {
                timeZone: tz.timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(now);

            const dateInZone = new Intl.DateTimeFormat('pt-BR', {
                timeZone: tz.timezone,
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                weekday: 'long'
            }).format(now);

            const timeElement = existingClocks[index].querySelector('.time');
            const dateElement = existingClocks[index].querySelector('.date');
            
            if (timeElement) timeElement.textContent = timeInZone;
            if (dateElement) dateElement.textContent = dateInZone;
        }
    });
}


function createClockCard(timezone, index) {
    const now = new Date();
    const timeInZone = new Intl.DateTimeFormat('pt-BR', {
        timeZone: timezone.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(now);

    const dateInZone = new Intl.DateTimeFormat('pt-BR', {
        timeZone: timezone.timezone,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        weekday: 'long'
    }).format(now);

    const clockCard = document.createElement('div');
    clockCard.className = 'clock-card';
    clockCard.innerHTML = `
        ${activeTimezones.length > 1 ? `<button class="remove-btn" onclick="removeTimezone(${index})">&times;</button>` : ''}
        <div class="city-name">${timezone.city}</div>
        <div class="country-name">${timezone.country}</div>
        <div class="time">${timeInZone}</div>
        <div class="date">${dateInZone}</div>
    `;

    return clockCard;
}


function removeTimezone(index) {
    if (activeTimezones.length > 1) {
        activeTimezones.splice(index, 1);
        recreateClocks();
    }
}


function recreateClocks() {
    const clocksGrid = document.getElementById('clocksGrid');
    const addButton = clocksGrid.querySelector('.add-timezone');
    
    
    const existingClocks = clocksGrid.querySelectorAll('.clock-card');
    existingClocks.forEach(clock => clock.remove());

    
    activeTimezones.forEach((tz, index) => {
        const clockCard = createClockCard(tz, index);
        clocksGrid.insertBefore(clockCard, addButton);
    });
}


function openTimezoneSelector() {
    const selector = document.getElementById('timezoneSelector');
    const timezoneList = document.getElementById('timezoneList');
    
   
    timezoneList.innerHTML = '';
    allTimezones.forEach(tz => {
        const isActive = activeTimezones.some(active => 
            active.city === tz.city && active.timezone === tz.timezone
        );
        
        if (!isActive) {
            const item = document.createElement('div');
            item.className = 'timezone-item';
            item.textContent = `${tz.city}, ${tz.country}`;
            item.onclick = () => addTimezone(tz);
            timezoneList.appendChild(item);
        }
    });

    selector.style.display = 'flex';
}


function closeTimezoneSelector() {
    const selector = document.getElementById('timezoneSelector');
    selector.style.display = 'none';
    document.getElementById('timezoneSearch').value = '';
}


function addTimezone(timezone) {
    activeTimezones.push(timezone);
    recreateClocks();
    closeTimezoneSelector();
}

/**
 * Initialize the application
 */
function init() {
    // Initial load
    updateClocks();
    
     
    setInterval(updateClocks, 1000);
    
    //
    document.getElementById('timezoneSearch').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.timezone-item');
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    });

    
    document.getElementById('timezoneSelector').addEventListener('click', (e) => {
        if (e.target.id === 'timezoneSelector') {
            closeTimezoneSelector();
        }
    });

    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeTimezoneSelector();
        }
    });
}


document.addEventListener('DOMContentLoaded', init);