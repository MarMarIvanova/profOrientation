const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN);

const INTERESTS = [
  '💻 Компьютеры и технологии',
  '🎨 Искусство и творчество',
  '🔬 Наука и исследования',
  '👥 Работа с людьми',
  '💼 Бизнес и предпринимательство',
  '🏥 Медицина и здоровье',
  '⚽ Спорт и фитнес',
  '🌿 Природа и экология'
];

const SUBJECTS = [
  '📐 Математика и физика',
  '📚 Русский и литература',
  '🌍 Иностранные языки',
  '📜 История и обществознание',
  '🧪 Биология и химия',
  '💾 Информатика',
  '🗺️ География',
  '🏃 Физкультура'
];

const WORK_STYLES = [
  '👥 Работать в команде',
  '🧑‍💻 Работать самостоятельно',
  '👔 Руководить людьми',
  '🤝 Помогать другим'
];

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

// --- Битовые операции для хранения состояния в callback_data ---

function hasBit(mask, bit) { return (mask & (1 << bit)) !== 0; }
function toggleBit(mask, bit) { return mask ^ (1 << bit); }
function countBits(mask) { let c = 0; let m = mask; while (m) { c += m & 1; m >>= 1; } return c; }
function toHex(n) { return n.toString(16); }
function fromHex(s) { return parseInt(s, 16) || 0; }

// --- Клавиатуры ---

function interestsKeyboard(mask) {
  const rows = INTERESTS.map((name, i) => {
    const sel = hasBit(mask, i) ? '✅ ' : '';
    return [{ text: sel + name, callback_data: `ti:${i}:${toHex(mask)}` }];
  });
  if (countBits(mask) > 0) {
    rows.push([{ text: '➡️ Готово, дальше!', callback_data: `di:${toHex(mask)}` }]);
  }
  return { inline_keyboard: rows };
}

function subjectsKeyboard(iMask, sMask) {
  const rows = SUBJECTS.map((name, i) => {
    const sel = hasBit(sMask, i) ? '✅ ' : '';
    return [{ text: sel + name, callback_data: `ts:${i}:${toHex(iMask)}:${toHex(sMask)}` }];
  });
  if (countBits(sMask) > 0) {
    rows.push([{ text: '➡️ Готово, дальше!', callback_data: `ds:${toHex(iMask)}:${toHex(sMask)}` }]);
  }
  return { inline_keyboard: rows };
}

function workStyleKeyboard(iMask, sMask) {
  const rows = WORK_STYLES.map((name, i) =>
    [{ text: name, callback_data: `ws:${i}:${toHex(iMask)}:${toHex(sMask)}` }]
  );
  return { inline_keyboard: rows };
}

// --- Генерация рекомендаций ---

function generateRecommendations(iMask, sMask) {
  let recs = [];

  if (hasBit(iMask, 0) && (hasBit(sMask, 0) || hasBit(sMask, 5))) {
    recs.push(...Object.entries(professions.it));
  }
  if (hasBit(iMask, 1)) {
    recs.push(...Object.entries(professions.creative));
  }
  if (hasBit(iMask, 3)) {
    recs.push(...Object.entries(professions.people));
  }
  if (hasBit(iMask, 4)) {
    recs.push(...Object.entries(professions.business));
  }
  if (hasBit(iMask, 5)) {
    recs.push(...Object.entries(professions.medicine));
  }
  if (hasBit(iMask, 2)) {
    recs.push(...Object.entries(professions.science));
  }

  if (recs.length < 2) {
    recs.push(...Object.entries(professions.business));
  }

  return recs.slice(0, 3);
}

function buildResultText(recs) {
  let text = '✨ *Вот профессии, которые могут тебе подойти:*\n\n';

  recs.forEach(([name, info], index) => {
    text += `${index + 1}\\. *${name}*\n\n`;
    text += `${info.description}\n\n`;
    text += `${info.education}\n`;
    text += `${info.salary}\n`;
    text += `📊 Востребованность: ${info.demand}\n`;
    text += `🛠 Навыки: ${info.skills}\n\n`;
    text += '─────────────────\n\n';
  });

  text += '💡 *Полезные ресурсы:*\n';
  text += '📚 [Атлас новых профессий](https://atlas100.ru/)\n';
  text += '🎓 [Профориентационные тесты](https://proforientator.ru/)\n';
  text += '💼 [Информация о ВУЗах](https://vuzopedia.ru/)\n\n';
  text += 'Хочешь пройти тест заново? Жми /quiz';

  return text;
}

// --- Обработчик для Яндекс Cloud Functions ---

module.exports.handler = async (event) => {
  const update = JSON.parse(event.body);

  try {
    if (update.message) {
      await handleMessage(update.message);
    } else if (update.callback_query) {
      await handleCallback(update.callback_query);
    }
  } catch (err) {
    console.error('Error:', err);
  }

  return { statusCode: 200, body: '' };
};

async function handleMessage(msg) {
  const chatId = msg.chat.id;
  const text = msg.text || '';
  const firstName = msg.from.first_name;

  if (text === '/start') {
    await bot.sendMessage(chatId,
      `Привет, ${firstName}! 👋\n\n` +
      'Я бот-профориентолог для девятиклассников!\n\n' +
      'Помогу тебе разобраться, какая профессия тебе подойдёт.\n\n' +
      'Готов начать? Жми /quiz 🚀'
    );
  } else if (text === '/quiz') {
    await bot.sendMessage(chatId,
      '🎯 *Вопрос 1 из 3:* Что тебе интересно?\n\nВыбери один или несколько вариантов:',
      { parse_mode: 'Markdown', reply_markup: interestsKeyboard(0) }
    );
  } else if (text === '/help') {
    await bot.sendMessage(chatId,
      '📚 *Команды бота:*\n\n' +
      '/start \\- Начать заново\n' +
      '/quiz \\- Пройти тест профориентации\n' +
      '/about \\- О боте\n' +
      '/help \\- Помощь\n\n' +
      '💡 *Как это работает:*\n' +
      '1\\. Ты отвечаешь на вопросы о своих интересах\n' +
      '2\\. Я анализирую твои ответы\n' +
      '3\\. Даю рекомендации по профессиям\n\n' +
      'Просто жми /quiz и начинай! 🎯',
      { parse_mode: 'MarkdownV2' }
    );
  } else if (text === '/about') {
    await bot.sendMessage(chatId,
      '🤖 *О боте*\n\n' +
      'Этот бот создан для помощи школьникам 9 класса в выборе профессии\\.\n\n' +
      '*Что я умею:*\n' +
      '✅ Анализировать твои интересы\n' +
      '✅ Учитывать любимые предметы\n' +
      '✅ Подбирать подходящие профессии\n' +
      '✅ Давать информацию о зарплатах и образовании\n\n' +
      '*Версия:* 1\\.0',
      { parse_mode: 'MarkdownV2' }
    );
  }
}

async function handleCallback(cbq) {
  const chatId = cbq.message.chat.id;
  const msgId = cbq.message.message_id;
  const data = cbq.data;

  await bot.answerCallbackQuery(cbq.id);

  const parts = data.split(':');
  const action = parts[0];

  if (action === 'ti') {
    const idx = parseInt(parts[1]);
    const mask = fromHex(parts[2]);
    const newMask = toggleBit(mask, idx);
    const count = countBits(newMask);
    const suffix = count > 0 ? `\n\nВыбрано: ${count}` : '';

    await bot.editMessageText(
      `🎯 *Вопрос 1 из 3:* Что тебе интересно?${suffix}`,
      { chat_id: chatId, message_id: msgId, parse_mode: 'Markdown', reply_markup: interestsKeyboard(newMask) }
    );
  } else if (action === 'di') {
    const iMask = fromHex(parts[1]);
    await bot.editMessageText(
      '👍 *Вопрос 2 из 3:* Какие предметы тебе нравятся?\n\nВыбери один или несколько:',
      { chat_id: chatId, message_id: msgId, parse_mode: 'Markdown', reply_markup: subjectsKeyboard(iMask, 0) }
    );
  } else if (action === 'ts') {
    const idx = parseInt(parts[1]);
    const iMask = fromHex(parts[2]);
    const sMask = fromHex(parts[3]);
    const newSMask = toggleBit(sMask, idx);
    const count = countBits(newSMask);
    const suffix = count > 0 ? `\n\nВыбрано: ${count}` : '';

    await bot.editMessageText(
      `👍 *Вопрос 2 из 3:* Какие предметы тебе нравятся?${suffix}`,
      { chat_id: chatId, message_id: msgId, parse_mode: 'Markdown', reply_markup: subjectsKeyboard(iMask, newSMask) }
    );
  } else if (action === 'ds') {
    const iMask = fromHex(parts[1]);
    const sMask = fromHex(parts[2]);
    await bot.editMessageText(
      '💪 *Вопрос 3 из 3:* Какой стиль работы тебе ближе?',
      { chat_id: chatId, message_id: msgId, parse_mode: 'Markdown', reply_markup: workStyleKeyboard(iMask, sMask) }
    );
  } else if (action === 'ws') {
    const iMask = fromHex(parts[2]);
    const sMask = fromHex(parts[3]);
    const recs = generateRecommendations(iMask, sMask);

    await bot.editMessageText(
      buildResultText(recs),
      { chat_id: chatId, message_id: msgId, parse_mode: 'Markdown', disable_web_page_preview: true }
    );
  }
}
