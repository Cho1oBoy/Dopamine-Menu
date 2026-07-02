import type { Suggestion, MoodState, ActionDifficulty, ActionType } from "./types";

type ActionSeed = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: ActionDifficulty;
  type: ActionType;
  shortWhy: string;
};

function makeActions(stateId: string, items: ActionSeed[]): Suggestion[] {
  return items.map((item) => ({
    ...item,
    stateId,
    category: stateId
  }));
}

export const MOOD_STATES: MoodState[] = [
  { id: "bored", label: "Скучно" },
  { id: "anxious", label: "Тревожно" },
  { id: "tired", label: "Устал" },
  { id: "scroll", label: "Хочу скроллить" },
  { id: "stuck", label: "Не могу начать задачу" },
  { id: "craving-food", label: "Хочу сладкое или фастфуд" },
  { id: "impulse-buy", label: "Хочу импульсивно купить" },
  { id: "lonely", label: "Мне одиноко" }
];

const boredActions = makeActions("bored", [
  {
    id: "bored-walk",
    title: "Пройдись по комнате и назови 5 вещей вокруг",
    description: "Просто короткий выход из режима зависания.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "movement",
    shortWhy: "Маленькое движение возвращает внимание в реальность."
  },
  {
    id: "bored-window",
    title: "Подойди к окну и 2 минуты смотри вдаль",
    description: "Без телефона и без задачи на продуктивность.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "environment",
    shortWhy: "Смена визуального фокуса сбивает автопилот."
  },
  {
    id: "bored-water",
    title: "Налей воды и выпей её медленно",
    description: "Без параллельного скролла и музыки.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "replacement",
    shortWhy: "Маленькое действие даёт мозгу другой стимул."
  },
  {
    id: "bored-squats",
    title: "Сделай 10 приседаний в своём темпе",
    description: "Не на рекорд, а просто чтобы встряхнуться.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "movement",
    shortWhy: "Телу становится чуть бодрее, и скука уже не такая липкая."
  },
  {
    id: "bored-list",
    title: "Запиши 3 вещи, которые тебе сейчас интересны",
    description: "Даже если это очень случайные вещи.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "journaling",
    shortWhy: "Скука часто смягчается, когда появляется хоть маленький интерес."
  },
  {
    id: "bored-clean",
    title: "Убери 5 предметов со стола на место",
    description: "Только 5, не начинай генеральную уборку.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "environment",
    shortWhy: "Маленький порядок даёт ощущение движения вперёд."
  },
  {
    id: "bored-stretch",
    title: "Потянись стоя и раскрой плечи",
    description: "Побудь в движении пару минут.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "movement",
    shortWhy: "Смена позы помогает не проваливаться в вялый залип."
  },
  {
    id: "bored-message",
    title: "Скинь другу мем или короткое «как ты?»",
    description: "Без долгого разговора, просто касание.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "social",
    shortWhy: "Небольшой контакт даёт живой стимул вместо пустого скролла."
  },
  {
    id: "bored-doodle",
    title: "Нарисуй что угодно на листке 2 минуты",
    description: "Линии, каракули, символы — без оценки.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "replacement",
    shortWhy: "Рукам и мозгу становится чем заняться прямо сейчас."
  },
  {
    id: "bored-microtask",
    title: "Выбери один микрошаг, который можно сделать за 2 минуты",
    description: "Например, открыть файл или подписать папку.",
    durationMinutes: 2,
    difficulty: "medium",
    type: "focus",
    shortWhy: "Скука иногда уходит, когда появляется конкретное действие."
  }
]);

const anxiousActions = makeActions("anxious", [
  {
    id: "anxious-ground",
    title: "Найди глазами 5 спокойных вещей вокруг",
    description: "Назови их про себя медленно, по одной.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "breathing",
    shortWhy: "Заземление помогает немного снизить внутренний шум."
  },
  {
    id: "anxious-exhale",
    title: "Сделай 8 длинных выдохов подряд",
    description: "Пусть выдох будет длиннее вдоха.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "breathing",
    shortWhy: "Длинный выдох часто помогает телу чуть отпустить спешку."
  },
  {
    id: "anxious-feet",
    title: "Упрись стопами в пол и почувствуй опору",
    description: "Сиди или стой так 2 минуты.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "breathing",
    shortWhy: "Когда тело чувствует опору, мысли часто становятся тише."
  },
  {
    id: "anxious-note",
    title: "Запиши одну тревожную мысль одним предложением",
    description: "Не решай её, просто вынеси из головы.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "journaling",
    shortWhy: "Мысль на бумаге часто выглядит менее огромной."
  },
  {
    id: "anxious-shoulders",
    title: "Подними и опусти плечи 10 раз",
    description: "Медленно, без рывков.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "movement",
    shortWhy: "Напряжение часто сидит в теле, а не только в голове."
  },
  {
    id: "anxious-water-face",
    title: "Умой лицо прохладной водой",
    description: "Потом постой минуту без экрана.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "environment",
    shortWhy: "Сенсорная смена иногда быстро возвращает в момент."
  },
  {
    id: "anxious-voice",
    title: "Скажи вслух: «я сейчас тревожусь, и это просто момент»",
    description: "Один раз спокойно, без драматизации.",
    durationMinutes: 2,
    difficulty: "medium",
    type: "replacement",
    shortWhy: "Названное состояние перестаёт быть таким расплывчатым."
  },
  {
    id: "anxious-hand",
    title: "Положи ладонь на грудь и посиди так 2 минуты",
    description: "Можно с закрытыми глазами, если ок.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "breathing",
    shortWhy: "Мягкий телесный контакт помогает чуть успокоиться."
  },
  {
    id: "anxious-list",
    title: "Напиши: что реально под моим контролем сегодня",
    description: "Достаточно 3 коротких пунктов.",
    durationMinutes: 4,
    difficulty: "medium",
    type: "journaling",
    shortWhy: "Конкретика часто снижает чувство внутреннего хаоса."
  },
  {
    id: "anxious-message",
    title: "Напиши одному человеку: «мне нужен маленький чек-ин»",
    description: "Коротко и по-человечески.",
    durationMinutes: 3,
    difficulty: "medium",
    type: "social",
    shortWhy: "Иногда тревога смягчается, когда ты не один в ней."
  }
]);

const tiredActions = makeActions("tired", [
  {
    id: "tired-stretch",
    title: "Потянись стоя и разомни плечи",
    description: "Без силового усилия, просто разбуди тело.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "movement",
    shortWhy: "Небольшое движение часто бодрит мягче, чем ещё один стимул."
  },
  {
    id: "tired-water-face",
    title: "Умой лицо прохладной водой",
    description: "Потом минуту постой без экрана.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "environment",
    shortWhy: "Это маленькая перезагрузка для внимания."
  },
  {
    id: "tired-window-air",
    title: "Открой окно и постой у воздуха 2 минуты",
    description: "Без телефона в руках.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "environment",
    shortWhy: "Свежий воздух иногда помогает не плыть дальше по инерции."
  },
  {
    id: "tired-walk",
    title: "Сходи на кухню или в коридор и вернись",
    description: "Просто короткий маршрут, не миссия.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "movement",
    shortWhy: "Даже мини-ходьба помогает выйти из оцепенения."
  },
  {
    id: "tired-water",
    title: "Выпей стакан воды маленькими глотками",
    description: "И не открывай в это время ленту.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "replacement",
    shortWhy: "Иногда телу нужна базовая поддержка, а не ещё один допинг."
  },
  {
    id: "tired-reset-desk",
    title: "Освободи себе маленький кусок стола",
    description: "Ровно под одно следующее действие.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "environment",
    shortWhy: "Когда вокруг чуть яснее, стартовать легче."
  },
  {
    id: "tired-breathe",
    title: "Сделай 5 спокойных вдохов и выдохов",
    description: "Ничего не ускоряй, просто выровняй темп.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "breathing",
    shortWhy: "Усталость хуже, когда тело ещё и зажато."
  },
  {
    id: "tired-check",
    title: "Спроси себя: мне нужен отдых, еда или пауза от экрана?",
    description: "Ответь одним честным словом.",
    durationMinutes: 2,
    difficulty: "medium",
    type: "journaling",
    shortWhy: "Усталость легче выдерживать, когда понятна её форма."
  },
  {
    id: "tired-sit-straight",
    title: "Сядь ровнее и упрись стопами в пол",
    description: "Побудь так 2 минуты.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "movement",
    shortWhy: "Смена позы иногда возвращает чуть больше энергии."
  },
  {
    id: "tired-microtask",
    title: "Сделай один самый лёгкий шаг из всех возможных",
    description: "Только один. Больше не требуй.",
    durationMinutes: 3,
    difficulty: "medium",
    type: "focus",
    shortWhy: "Когда сил мало, побеждает не героизм, а маленький вход."
  }
]);

const scrollActions = makeActions("scroll", [
  {
    id: "scroll-breath",
    title: "Убери телефон на край стола и сделай 10 медленных вдохов",
    description: "Побудь без ленты всего пару минут.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "breathing",
    shortWhy: "Короткая пауза даёт мозгу шанс переключиться."
  },
  {
    id: "scroll-water",
    title: "Встань и медленно выпей стакан воды",
    description: "Без экрана и без спешки.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "replacement",
    shortWhy: "Небольшое физическое действие разрывает привычную петлю."
  },
  {
    id: "scroll-other-room",
    title: "Положи телефон в другую комнату на 3 минуты",
    description: "Да, просто физически отнеси.",
    durationMinutes: 3,
    difficulty: "medium",
    type: "environment",
    shortWhy: "Когда экран не под рукой, импульсу труднее рулить."
  },
  {
    id: "scroll-window",
    title: "Выйди к окну и смотри наружу 2 минуты",
    description: "Пусть большой мир напомнит о себе.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "environment",
    shortWhy: "Смена масштаба помогает вынырнуть из ленты."
  },
  {
    id: "scroll-lock",
    title: "Заблокируй экран и посиди с ним перевёрнутым",
    description: "Не открывай заново хотя бы 2 минуты.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "replacement",
    shortWhy: "Небольшая задержка уже уменьшает автопилот."
  },
  {
    id: "scroll-squats",
    title: "Сделай 10 приседаний перед тем как снова брать телефон",
    description: "Считай это входным билетом обратно в ленту.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "movement",
    shortWhy: "Тело получает слово раньше, чем палец тянется к экрану."
  },
  {
    id: "scroll-note",
    title: "Запиши: зачем я вообще сейчас хочу открыть ленту?",
    description: "Одной короткой фразой.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "journaling",
    shortWhy: "Когда причина названа, желание уже не такое туманное."
  },
  {
    id: "scroll-tab-close",
    title: "Закрой одну вкладку или приложение, которое тянет",
    description: "Не весь телефон, только один источник шума.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "environment",
    shortWhy: "Меньше триггеров вокруг — легче не сорваться сразу."
  },
  {
    id: "scroll-message",
    title: "Напиши человеку вместо того, чтобы смотреть чужие сторис",
    description: "Хоть одно слово, но живое.",
    durationMinutes: 3,
    difficulty: "medium",
    type: "social",
    shortWhy: "Живой контакт часто насыщает лучше, чем пассивный просмотр."
  },
  {
    id: "scroll-first-step",
    title: "Сделай один маленький офлайн-шаг, а потом решишь снова",
    description: "Например, открыть тетрадь или прибрать кружку.",
    durationMinutes: 3,
    difficulty: "medium",
    type: "focus",
    shortWhy: "После реального действия залипнуть уже не так автоматически."
  }
]);

const stuckActions = makeActions("stuck", [
  {
    id: "stuck-two-min",
    title: "Открой задачу и сделай только первые две минуты",
    description: "Разреши себе остановиться после них.",
    durationMinutes: 2,
    difficulty: "medium",
    type: "focus",
    shortWhy: "Начало обычно тяжелее, чем продолжение."
  },
  {
    id: "stuck-list",
    title: "Запиши самый маленький следующий шаг",
    description: "Одна строка, не идеальный план.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "journaling",
    shortWhy: "Ясный первый шаг уменьшает внутреннее сопротивление."
  },
  {
    id: "stuck-open-file",
    title: "Просто открой нужный файл или тетрадь",
    description: "Ничего больше пока не требуй от себя.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "focus",
    shortWhy: "Иногда старт начинается с простого контакта с задачей."
  },
  {
    id: "stuck-timer",
    title: "Поставь себе режим «поработаю всего 3 минуты»",
    description: "И правда держись только этого.",
    durationMinutes: 3,
    difficulty: "medium",
    type: "focus",
    shortWhy: "Ограниченный вход кажется мозгу безопаснее."
  },
  {
    id: "stuck-voice",
    title: "Скажи вслух, что именно сейчас стопорит",
    description: "Одним предложением.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "journaling",
    shortWhy: "Когда проблема названа, с ней легче работать."
  },
  {
    id: "stuck-clear-space",
    title: "Освободи место только под эту задачу",
    description: "Убери лишнее с экрана или стола.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "environment",
    shortWhy: "Меньше визуального шума — легче начать."
  },
  {
    id: "stuck-breath",
    title: "Сделай 5 спокойных вдохов перед первым шагом",
    description: "И только потом открой задачу.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "breathing",
    shortWhy: "Пауза помогает начать не из паники, а из устойчивости."
  },
  {
    id: "stuck-one-line",
    title: "Напиши один кривой черновой абзац или одну строку кода",
    description: "Кривой — это ок, главное чтобы появился.",
    durationMinutes: 3,
    difficulty: "medium",
    type: "focus",
    shortWhy: "Черновик снимает давление «сделать сразу идеально»."
  },
  {
    id: "stuck-ask",
    title: "Напиши человеку один вопрос по задаче",
    description: "Если реально упёрся — не сиди в одиночку.",
    durationMinutes: 4,
    difficulty: "medium",
    type: "social",
    shortWhy: "Иногда стартует не задача, а запрос на ясность."
  },
  {
    id: "stuck-headline",
    title: "Запиши заголовок того, что хочешь сделать",
    description: "Без деталей, только имя задачи.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "journaling",
    shortWhy: "Название делает хаос чуть более конкретным."
  }
]);

const foodActions = makeActions("craving-food", [
  {
    id: "craving-food-tea",
    title: "Сделай чай или воду с лимоном и подожди пару минут",
    description: "Не запрещай себе еду, просто добавь паузу.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "replacement",
    shortWhy: "Пауза помогает отделить импульс от реального голода."
  },
  {
    id: "craving-food-check",
    title: "Спроси себя: я голоден, устал или хочу награду?",
    description: "Ответь одной честной фразой.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "journaling",
    shortWhy: "Иногда тяга маскирует совсем другую потребность."
  },
  {
    id: "craving-food-water",
    title: "Выпей стакан воды и сделай 5 вдохов",
    description: "Потом снова решишь, что хочешь.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "replacement",
    shortWhy: "Маленький буфер убирает часть автоматизма."
  },
  {
    id: "craving-food-fruit",
    title: "Съешь что-то простое первым делом, если реально голоден",
    description: "Например, банан или йогурт, если есть.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "replacement",
    shortWhy: "Иногда телу нужна еда, но не обязательно самый резкий вариант."
  },
  {
    id: "craving-food-walk",
    title: "Пройдись 2 минуты до окна или по коридору",
    description: "Не чтобы «заслужить» еду, а чтобы сменить импульс.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "movement",
    shortWhy: "Короткое движение даёт телу другой сигнал."
  },
  {
    id: "craving-food-note",
    title: "Запиши, чего тебе хочется на самом деле",
    description: "Утешения, отдыха, вкуса, паузы?",
    durationMinutes: 3,
    difficulty: "medium",
    type: "journaling",
    shortWhy: "Когда желание становится яснее, выбор становится мягче."
  },
  {
    id: "craving-food-delay",
    title: "Отложи решение о заказе на 10 минут",
    description: "Пока просто не открывай доставку.",
    durationMinutes: 2,
    difficulty: "medium",
    type: "environment",
    shortWhy: "Небольшая задержка часто снижает силу порыва."
  },
  {
    id: "craving-food-clean",
    title: "Убери со стола упаковки и лишние триггеры",
    description: "Пусть еда не кричит на тебя со всех сторон.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "environment",
    shortWhy: "Когда вокруг меньше напоминаний, удержаться чуть легче."
  },
  {
    id: "craving-food-breathe",
    title: "Сделай 5 глубоких вдохов перед первым кусочком",
    description: "Если всё же ешь — начни не на автомате.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "breathing",
    shortWhy: "Пауза перед действием делает выбор более своим."
  },
  {
    id: "craving-food-message",
    title: "Напиши кому-то: «меня тянет заесть день»",
    description: "Без стыда, просто факт.",
    durationMinutes: 3,
    difficulty: "medium",
    type: "social",
    shortWhy: "Озвученный импульс уже не так правит в одиночку."
  }
]);

const impulseBuyActions = makeActions("impulse-buy", [
  {
    id: "impulse-buy-wishlist",
    title: "Добавь покупку в список «через 24 часа», а не в корзину",
    description: "Ничего не решай прямо сейчас.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "replacement",
    shortWhy: "Отложенное решение часто спасает от покупки на всплеске."
  },
  {
    id: "impulse-buy-balance",
    title: "Запиши цену и одну причину купить, и одну — не купить",
    description: "Всего по одной строке.",
    durationMinutes: 3,
    difficulty: "medium",
    type: "journaling",
    shortWhy: "Когда импульс становится текстом, он обычно слабеет."
  },
  {
    id: "impulse-buy-close-tab",
    title: "Закрой вкладку магазина на 3 минуты",
    description: "Не навсегда, просто на паузу.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "environment",
    shortWhy: "Иногда достаточно не видеть кнопку «купить сейчас»."
  },
  {
    id: "impulse-buy-water",
    title: "Встань, попей воды и только потом решай",
    description: "Пусть решение подождёт пару минут.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "replacement",
    shortWhy: "Небольшой телесный шаг снижает силу рывка."
  },
  {
    id: "impulse-buy-screenshot",
    title: "Сделай скрин товара вместо покупки",
    description: "Если он правда нужен, ты к нему вернёшься.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "replacement",
    shortWhy: "Так желание сохраняется, но деньги остаются у тебя."
  },
  {
    id: "impulse-buy-closet",
    title: "Посмотри, есть ли у тебя уже что-то похожее",
    description: "Только быстро и честно.",
    durationMinutes: 4,
    difficulty: "medium",
    type: "environment",
    shortWhy: "Реальность дома часто охлаждает желание купить ещё."
  },
  {
    id: "impulse-buy-wait",
    title: "Поставь себе правило: покупка не раньше чем через 10 минут",
    description: "Прямо сейчас ничего не подтверждай.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "focus",
    shortWhy: "Импульсы любят скорость, а пауза им не нравится."
  },
  {
    id: "impulse-buy-message",
    title: "Скинь другу скрин и спроси: «оно мне реально надо?»",
    description: "Если есть такой человек.",
    durationMinutes: 3,
    difficulty: "medium",
    type: "social",
    shortWhy: "Внешний взгляд помогает вернуть масштаб."
  },
  {
    id: "impulse-buy-breathe",
    title: "Сделай 5 выдохов перед кнопкой оплаты",
    description: "Даже если кажется смешным — это работает как пауза.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "breathing",
    shortWhy: "Между желанием и действием появляется пространство."
  },
  {
    id: "impulse-buy-reason",
    title: "Напиши, что ты хочешь почувствовать от этой покупки",
    description: "Новизну, награду, статус, облегчение?",
    durationMinutes: 3,
    difficulty: "medium",
    type: "journaling",
    shortWhy: "Когда видишь скрытую цель, проще выбрать другой путь."
  }
]);

const lonelyActions = makeActions("lonely", [
  {
    id: "lonely-message",
    title: "Отправь одному человеку короткое «как ты?»",
    description: "Без длинного вступления и лишнего давления.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "social",
    shortWhy: "Даже маленький контакт может смягчить чувство изоляции."
  },
  {
    id: "lonely-voice",
    title: "Запиши себе голосовую заметку на минуту",
    description: "Скажи, что ты сейчас чувствуешь и чего хочешь.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "journaling",
    shortWhy: "Когда состояние названо, оно становится менее тяжёлым."
  },
  {
    id: "lonely-window",
    title: "Выйди к окну или на балкон и побудь среди мира",
    description: "Хотя бы пару минут без телефона.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "environment",
    shortWhy: "Ощущение внешнего мира иногда помогает не замыкаться."
  },
  {
    id: "lonely-photo",
    title: "Отправь кому-то фото своей реальности прямо сейчас",
    description: "Чашка, стол, небо — что угодно живое.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "social",
    shortWhy: "Это мягкий способ сказать «я здесь»."
  },
  {
    id: "lonely-hand",
    title: "Обними подушку или завернись в плед на 2 минуты",
    description: "Без иронии. Просто дай телу опору.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "replacement",
    shortWhy: "Иногда телу нужен сигнал безопасности, а не слова."
  },
  {
    id: "lonely-list",
    title: "Запиши 3 человека, с кем тебе обычно чуть легче",
    description: "Не обязательно писать им всем прямо сейчас.",
    durationMinutes: 3,
    difficulty: "easy",
    type: "journaling",
    shortWhy: "Список напоминает, что связь вообще существует."
  },
  {
    id: "lonely-checkin",
    title: "Напиши в чат одно честное предложение о себе",
    description: "Например: «я сегодня выпал из жизни».",
    durationMinutes: 4,
    difficulty: "medium",
    type: "social",
    shortWhy: "Честный маленький сигнал лучше, чем молчать в одиночку."
  },
  {
    id: "lonely-walk",
    title: "Сходи на короткий круг по дому или во двор",
    description: "Только чтобы сменить картинку и ритм.",
    durationMinutes: 5,
    difficulty: "medium",
    type: "movement",
    shortWhy: "Одиночество часто усиливается, когда ты застываешь на месте."
  },
  {
    id: "lonely-breathe",
    title: "Сделай 5 спокойных вдохов с рукой на груди",
    description: "Побудь с собой без осуждения.",
    durationMinutes: 2,
    difficulty: "easy",
    type: "breathing",
    shortWhy: "Это маленький способ не бросать себя в этот момент."
  },
  {
    id: "lonely-plan",
    title: "Назначь один живой контакт на ближайшие дни",
    description: "Созвон, прогулка, кофе, учёба вместе.",
    durationMinutes: 4,
    difficulty: "medium",
    type: "focus",
    shortWhy: "Появляется не только чувство, но и следующий шаг."
  }
]);

export const SUGGESTIONS: Suggestion[] = [
  ...boredActions,
  ...anxiousActions,
  ...tiredActions,
  ...scrollActions,
  ...stuckActions,
  ...foodActions,
  ...impulseBuyActions,
  ...lonelyActions
];
