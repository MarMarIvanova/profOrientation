const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

const token = process.env.BOT_TOKEN || '8341971548:AAEGKFFa4WFflnhEMRVm2fXOio_fw0ckHYo';

const bot = new TelegramBot(token, { polling: true });

const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running');
}).listen(PORT, () => {
  console.log(`Health check server listening on port ${PORT}`);
});

// Хранилище данных пользователей
const userData = {};

// Профессии и их характеристики
const professions = {
  it: {
    'Frontend-разработчик': {
      description: '💻 Создание красивых и удобных веб-сайтов',
      education: '🎓 ВУЗ: Программирование, информатика. Можно учиться онлайн!',
      salary: '💰 80,000 - 200,000+ руб/мес',
      skills: 'HTML, CSS, JavaScript, React',
      demand: '🔥 Очень высокий спрос'
    },
    'Data Scientist': {
      description: '📊 Работа с большими данными и искусственным интеллектом',
      education: '🎓 ВУЗ: Прикладная математика, Computer Science',
      salary: '💰 100,000 - 250,000+ руб/мес',
      skills: 'Python, статистика, машинное обучение',
      demand: '🔥 Очень высокий спрос'
    },
    'Кибербезопасник': {
      description: '🛡️ Защита компьютерных систем от взлома',
      education: '🎓 ВУЗ: Информационная безопасность',
      salary: '💰 90,000 - 300,000+ руб/мес',
      skills: 'Сети, криптография, этичный взлом',
      demand: '🔥 Критический спрос'
    }
  },
  creative: {
    'UX/UI Дизайнер': {
      description: '🎨 Создание интерфейсов приложений и сайтов',
      education: '🎓 ВУЗ: Дизайн, можно курсы и онлайн-обучение',
      salary: '💰 70,000 - 180,000 руб/мес',
      skills: 'Figma, Adobe XD, психология пользователей',
      demand: '📈 Высокий спрос'
    },
    'Графический дизайнер': {
      description: '🖌️ Создание визуального контента для брендов',
      education: '🎓 ВУЗ/Колледж: Графический дизайн, реклама',
      salary: '💰 50,000 - 150,000 руб/мес',
      skills: 'Photoshop, Illustrator, композиция',
      demand: '📈 Средний спрос'
    },
    'Контент-мейкер': {
      description: '📹 Создание контента для соцсетей и YouTube',
      education: '🎓 Курсы, самообучение, колледж медиа',
      salary: '💰 40,000 - 200,000+ руб/мес',
      skills: 'Видеомонтаж, SMM, креативность',
      demand: '📈 Растущий спрос'
    }
  },
  people: {
    'HR-менеджер': {
      description: '👥 Работа с персоналом, подбор сотрудников',
      education: '🎓 ВУЗ: Управление персоналом, психология',
      salary: '💰 60,000 - 150,000 руб/мес',
      skills: 'Коммуникация, психология, рекрутинг',
      demand: '📈 Стабильный спрос'
    },
    'Психолог': {
      description: '🧠 Помощь людям в решении проблем',
      education: '🎓 ВУЗ: Психология (5-6 лет)',
      salary: '💰 50,000 - 200,000 руб/мес',
      skills: 'Эмпатия, анализ, консультирование',
      demand: '📈 Высокий спрос'
    },
    'Event-менеджер': {
      description: '🎉 Организация мероприятий и праздников',
      education: '🎓 ВУЗ: Менеджмент, можно курсы',
      salary: '💰 50,000 - 180,000 руб/мес',
      skills: 'Организация, общение, креативность',
      demand: '📈 Средний спрос'
    }
  },
  business: {
    'Product Manager': {
      description: '📱 Управление разработкой продуктов',
      education: '🎓 ВУЗ: Менеджмент, экономика',
      salary: '💰 100,000 - 300,000+ руб/мес',
      skills: 'Аналитика, коммуникация, стратегия',
      demand: '🔥 Очень высокий спрос'
    },
    'Маркетолог': {
      description: '📢 Продвижение продуктов и услуг',
      education: '🎓 ВУЗ: Маркетинг, реклама',
      salary: '💰 50,000 - 180,000 руб/мес',
      skills: 'Аналитика, креатив, digital-маркетинг',
      demand: '📈 Высокий спрос'
    },
    'Предприниматель': {
      description: '💼 Создание своего бизнеса',
      education: '🎓 Опыт, курсы, можно без ВУЗа',
      salary: '💰 0 - бесконечность руб/мес',
      skills: 'Лидерство, стратегия, упорство',
      demand: '🚀 Всегда актуально'
    }
  },
  medicine: {
    'Врач': {
      description: '⚕️ Лечение людей, спасение жизней',
      education: '🎓 Медицинский университет (6 лет + ординатура)',
      salary: '💰 60,000 - 200,000+ руб/мес',
      skills: 'Биология, ответственность, эмпатия',
      demand: '🔥 Критический спрос'
    },
    'Медсестра/медбрат': {
      description: '💉 Уход за пациентами, медицинские процедуры',
      education: '🎓 Медицинский колледж (3-4 года)',
      salary: '💰 40,000 - 80,000 руб/мес',
      skills: 'Внимательность, забота, стрессоустойчивость',
      demand: '🔥 Очень высокий спрос'
    }
  },
  science: {
    'Инженер': {
      description: '⚙️ Проектирование и создание техники',
      education: '🎓 Технический ВУЗ',
      salary: '💰 60,000 - 200,000 руб/мес',
      skills: 'Математика, физика, CAD-системы',
      demand: '📈 Высокий спрос'
    },
    'Биотехнолог': {
      description: '🧬 Работа с живыми организмами для создания продуктов',
      education: '🎓 ВУЗ: Биотехнология, биология',
      salary: '💰 70,000 - 180,000 руб/мес',
      skills: 'Биология, химия, лабораторная работа',
      demand: '📈 Растущий спрос'
    }
  }
};

// Стартовое сообщение
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  
  userData[chatId] = {
    interests: [],
    subjects: [],
    workStyle: null,
    step: 'start'
  };

  const welcomeText = `
Привет, ${firstName}! 👋

Я бот-профориентолог для девятиклассников! 

Помогу тебе разобраться, какая профессия тебе подойдёт. 

Я задам несколько вопросов о твоих интересах и предметах, а потом дам рекомендации.

Готов начать? Жми /quiz 🚀
  `;

  bot.sendMessage(chatId, welcomeText, {
    reply_markup: {
      keyboard: [['/quiz'], ['/help']],
      resize_keyboard: true
    }
  });
});

// Помощь
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpText = `
📚 *Команды бота:*

/start - Начать заново
/quiz - Пройти тест профориентации
/stats - Статистика (сколько человек прошло тест)
/about - О боте
/help - Помощь

💡 *Как это работает:*
1. Ты отвечаешь на вопросы о своих интересах
2. Я анализирую твои ответы
3. Даю рекомендации по профессиям
4. Ты можешь узнать подробности о каждой профессии

Просто жми /quiz и начинай! 🎯
  `;
  bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown' });
});

// О боте
bot.onText(/\/about/, (msg) => {
  const chatId = msg.chat.id;
  const aboutText = `
🤖 *О боте*

Этот бот создан для помощи школьникам 9 класса в выборе профессии.

*Что я умею:*
✅ Анализировать твои интересы
✅ Учитывать любимые предметы
✅ Подбирать подходящие профессии
✅ Давать информацию о зарплатах и образовании

*Создатель:* Девятиклассница-программист 💪

*Версия:* 1.0

Напиши @твой_ник, если есть идеи по улучшению!
  `;
  bot.sendMessage(chatId, aboutText, { parse_mode: 'Markdown' });
});

// Начало теста
bot.onText(/\/quiz/, (msg) => {
  const chatId = msg.chat.id;
  
  userData[chatId] = {
    interests: [],
    subjects: [],
    workStyle: null,
    step: 'interests'
  };

  bot.sendMessage(chatId, '🎯 Отлично! Начинаем тест.\n\nВопрос 1 из 3: Что тебе интересно? (Можно выбрать несколько)', {
    reply_markup: {
      keyboard: [
        ['💻 Компьютеры и технологии', '🎨 Искусство и творчество'],
        ['🔬 Наука и исследования', '👥 Работа с людьми'],
        ['💼 Бизнес и предпринимательство', '🏥 Медицина и здоровье'],
        ['⚽ Спорт и фитнес', '🌿 Природа и экология'],
        ['✅ Готово, перейти дальше']
      ],
      resize_keyboard: true
    }
  });
});

// Обработка ответов
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!userData[chatId] || text.startsWith('/')) return;

  const user = userData[chatId];

  // Обработка интересов
  if (user.step === 'interests') {
    if (text === '✅ Готово, перейти дальше') {
      if (user.interests.length === 0) {
        bot.sendMessage(chatId, '⚠️ Выбери хотя бы один вариант!');
        return;
      }
      user.step = 'subjects';
      bot.sendMessage(chatId, '👍 Отлично!\n\nВопрос 2 из 3: Какие предметы тебе нравятся? (Можно несколько)', {
        reply_markup: {
          keyboard: [
            ['📐 Математика и физика', '📚 Русский и литература'],
            ['🌍 Иностранные языки', '📜 История и обществознание'],
            ['🧪 Биология и химия', '💾 Информатика'],
            ['🗺️ География', '🏃 Физкультура'],
            ['✅ Готово, перейти дальше']
          ],
          resize_keyboard: true
        }
      });
    } else {
      if (!user.interests.includes(text)) {
        user.interests.push(text);
        bot.sendMessage(chatId, `✓ Добавлено: ${text}\n\nВыбрано: ${user.interests.length}`);
      }
    }
  }
  // Обработка предметов
  else if (user.step === 'subjects') {
    if (text === '✅ Готово, перейти дальше') {
      if (user.subjects.length === 0) {
        bot.sendMessage(chatId, '⚠️ Выбери хотя бы один предмет!');
        return;
      }
      user.step = 'workStyle';
      bot.sendMessage(chatId, '💪 Супер!\n\nВопрос 3 из 3: Какой стиль работы тебе ближе?', {
        reply_markup: {
          keyboard: [
            ['👥 Работать в команде'],
            ['🧑‍💻 Работать самостоятельно'],
            ['👔 Руководить людьми'],
            ['🤝 Помогать другим']
          ],
          resize_keyboard: true,
          one_time_keyboard: true
        }
      });
    } else {
      if (!user.subjects.includes(text)) {
        user.subjects.push(text);
        bot.sendMessage(chatId, `✓ Добавлено: ${text}\n\nВыбрано: ${user.subjects.length}`);
      }
    }
  }
  // Обработка стиля работы
  else if (user.step === 'workStyle') {
    user.workStyle = text;
    user.step = 'completed';
    
    bot.sendMessage(chatId, '🔍 Анализирую твои ответы...', {
      reply_markup: {
        remove_keyboard: true
      }
    });

    setTimeout(() => {
      generateRecommendations(chatId);
    }, 2000);
  }
});

// Генерация рекомендаций
function generateRecommendations(chatId) {
  const user = userData[chatId];
  let recommendations = [];

  // Логика подбора профессий
  if (user.interests.some(i => i.includes('Компьютеры'))) {
    if (user.subjects.some(s => s.includes('Математика') || s.includes('Информатика'))) {
      recommendations.push(...Object.entries(professions.it));
    }
  }

  if (user.interests.some(i => i.includes('Искусство'))) {
    recommendations.push(...Object.entries(professions.creative));
  }

  if (user.interests.some(i => i.includes('Работа с людьми'))) {
    recommendations.push(...Object.entries(professions.people));
  }

  if (user.interests.some(i => i.includes('Бизнес'))) {
    recommendations.push(...Object.entries(professions.business));
  }

  if (user.interests.some(i => i.includes('Медицина'))) {
    recommendations.push(...Object.entries(professions.medicine));
  }

  if (user.interests.some(i => i.includes('Наука'))) {
    recommendations.push(...Object.entries(professions.science));
  }

  // Если рекомендаций мало, добавляем универсальные
  if (recommendations.length < 2) {
    recommendations.push(...Object.entries(professions.business));
  }

  // Ограничиваем до 3-х профессий
  recommendations = recommendations.slice(0, 3);

  let resultText = '✨ *Вот профессии, которые могут тебе подойти:*\n\n';

  recommendations.forEach(([name, info], index) => {
    resultText += `${index + 1}. *${name}*\n\n`;
    resultText += `${info.description}\n\n`;
    resultText += `${info.education}\n`;
    resultText += `${info.salary}\n`;
    resultText += `📊 Востребованность: ${info.demand}\n`;
    resultText += `🛠 Навыки: ${info.skills}\n\n`;
    resultText += '─────────────────\n\n';
  });

  resultText += '💡 *Полезные ресурсы:*\n';
  resultText += '📚 [Атлас новых профессий](https://atlas100.ru/)\n';
  resultText += '🎓 [Профориентационные тесты](https://proforientator.ru/)\n';
  resultText += '💼 [Информация о ВУЗах](https://vuzopedia.ru/)\n\n';
  resultText += 'Хочешь пройти тест заново? Жми /quiz';

  bot.sendMessage(chatId, resultText, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
    reply_markup: {
      keyboard: [['/quiz'], ['/help']],
      resize_keyboard: true
    }
  });
}

console.log('🤖 Бот запущен!');