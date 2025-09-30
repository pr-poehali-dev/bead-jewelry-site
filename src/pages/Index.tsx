import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

type Section = 'home' | 'catalog' | 'faq' | 'telegram';
type Category = 'keychains' | 'bracelets' | 'earrings' | 'necklaces';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  images: string[];
  description: string;
  materials: string[];
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [activeCategory, setActiveCategory] = useState<Category>('keychains');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const products: Record<Category, Product[]> = {
    keychains: [
      { 
        id: 1, 
        name: 'Парные брелки "Фруктовые котики"', 
        price: '240 ₽ за штуку', 
        image: 'https://cdn.poehali.dev/files/b17d7238-bf66-407d-8636-d01a70c5cc43.png',
        images: [
          'https://cdn.poehali.dev/files/b17d7238-bf66-407d-8636-d01a70c5cc43.png', 
          'https://cdn.poehali.dev/files/208f8abf-18fd-415f-aaab-ab777aeee4ad.png',
          'https://cdn.poehali.dev/files/6ae30623-d9f8-4300-a369-92f807953779.png'
        ],
        description: 'Милые парные брелочки ручной работы из нежно-розовых и красных бусин с очаровательными фруктовыми котиками. Идеально подойдут для сумочки. Изготовлены на заказ — покупатель передал мне серьги с котиками, чтобы я переделала их в брелки.',
        materials: ['Акриловые бусины', 'Стеклянные бусины', 'Акриловые котики от сережек', 'Вощеная нить', 'Металлическая фурнитура']
      },
      { 
        id: 2, 
        name: 'Брелочек "Серебряное сияние"', 
        price: '200 ₽', 
        image: 'https://cdn.poehali.dev/files/318569af-a628-41f7-a93c-acbbbb794798.png',
        images: [
          'https://cdn.poehali.dev/files/318569af-a628-41f7-a93c-acbbbb794798.png',
          'https://cdn.poehali.dev/files/1ff7b144-e15d-4f53-9ca9-81a64f9745ca.png',
          'https://cdn.poehali.dev/files/dd1dca9f-ecab-46eb-a102-8248e6d281b6.png'
        ],
        description: 'Элегантный брелочек в серебристо-белых тонах с нежными элементами. Изящная цепочка украшена бантиком, бусинами и подвесками в виде сердечка и цветочка. Лёгкий и воздушный, отлично дополнит любую сумочку или связку ключей.',
        materials: ['Стеклянные бусины', 'Акриловые элементы', 'Металлическая цепочка', 'Серебристая фурнитура', 'Вощеная нить']
      },
      { 
        id: 3, 
        name: 'Брелочек "Рыбка"', 
        price: '180 ₽', 
        image: 'https://cdn.poehali.dev/files/dd31c288-3742-4d70-8ef9-01aa31550b83.png',
        images: [
          'https://cdn.poehali.dev/files/dd31c288-3742-4d70-8ef9-01aa31550b83.png',
          'https://cdn.poehali.dev/files/1c00ca82-3aa2-4c98-b0bd-48123649146c.png',
          'https://cdn.poehali.dev/files/14fa40f1-458f-43ba-ae5f-2ffa7b8a7b6e.png'
        ],
        description: 'Очаровательный брелочек с керамической рыбкой в нежно-розовых и сиреневых оттенках. Украшен матовыми бусинами, бильярдным шариком "8" и цветочными элементами. Яркий и необычный аксессуар для любителей уникальных вещей. Доступны разные цвета рыбки — при заказе уточните желаемый оттенок!',
        materials: ['Керамическая рыбка', 'Матовые бусины', 'Акриловые элементы', 'Металлическая фурнитура', 'Вощеная нить']
      },
    ],
    bracelets: [
      { 
        id: 4, 
        name: 'Браслет "Розовый сон"', 
        price: '850 ₽', 
        image: '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg',
        images: ['/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg', '/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg'],
        description: 'Нежный браслет из розовых и лавандовых бусин. Регулируемый размер, подходит для любого запястья.',
        materials: ['Натуральный жемчуг', 'Розовый кварц', 'Эластичная нить', 'Серебряные разделители']
      },
      { 
        id: 5, 
        name: 'Браслет "Мечта"', 
        price: '900 ₽', 
        image: '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg',
        images: ['/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg', '/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg'],
        description: 'Воздушный браслет с переливающимися бусинами. Создан для особенных моментов.',
        materials: ['Стеклянные бусины', 'Чешский бисер', 'Эластичная основа', 'Металлические акценты']
      },
      { 
        id: 6, 
        name: 'Браслет "Облако"', 
        price: '800 ₽', 
        image: '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg',
        images: ['/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg', '/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg'],
        description: 'Легкий и нежный браслет, словно облако на вашем запястье. Комфортный и стильный.',
        materials: ['Акриловые бусины', 'Жемчужный бисер', 'Эластичная нить', 'Хлопковая основа']
      },
    ],
    earrings: [
      { 
        id: 7, 
        name: 'Серьги "Воздушные"', 
        price: '650 ₽', 
        image: '/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg',
        images: ['/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg', '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg'],
        description: 'Изящные серьги из бусин пастельных оттенков. Гипоаллергенная фурнитура.',
        materials: ['Хирургическая сталь', 'Стеклянные бусины', 'Позолоченные элементы', 'Ювелирная проволока']
      },
      { 
        id: 8, 
        name: 'Серьги "Весна"', 
        price: '700 ₽', 
        image: '/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg',
        images: ['/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg', '/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg'],
        description: 'Весенние серьги с нежными бусинами. Добавят свежести любому образу.',
        materials: ['Медицинская сталь', 'Чешские бусины', 'Серебряное покрытие', 'Декоративные подвески']
      },
      { 
        id: 9, 
        name: 'Серьги "Цветок"', 
        price: '750 ₽', 
        image: '/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg',
        images: ['/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg', '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg'],
        description: 'Романтичные серьги с цветочным мотивом. Легкие и комфортные для повседневной носки.',
        materials: ['Титановые швензы', 'Жемчужные бусины', 'Кристаллы', 'Позолоченная фурнитура']
      },
    ],
    necklaces: [
      { 
        id: 10, 
        name: 'Колье "Романтика"', 
        price: '1200 ₽', 
        image: '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg',
        images: ['/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg', '/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg'],
        description: 'Элегантное колье ручной работы. Станет украшением вечернего образа.',
        materials: ['Натуральный жемчуг', 'Чешский бисер люкс', 'Вощеная нить', 'Серебряный замок']
      },
      { 
        id: 11, 
        name: 'Колье "Грация"', 
        price: '1350 ₽', 
        image: '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg',
        images: ['/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg', '/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg'],
        description: 'Изысканное колье с градиентом пастельных оттенков. Регулируемая длина.',
        materials: ['Речной жемчуг', 'Розовый кварц', 'Японская нить', 'Позолоченная застежка']
      },
    ],
  };

  const categories = [
    { id: 'keychains', name: 'Брелочки', icon: 'Sparkles' },
    { id: 'bracelets', name: 'Браслеты', icon: 'Circle' },
    { id: 'earrings', name: 'Серьги', icon: 'Gem' },
    { id: 'necklaces', name: 'Колье', icon: 'Heart' },
  ];

  const faqItems = [
    {
      question: 'Как сделать заказ?',
      answer: 'Сделайте скриншот карточки с товаром и пришлите мне в лс Telegram @Nast_461174',
    },
    {
      question: 'Какой службой доставки пользуетесь?',
      answer: 'Яндекс/Почта России/Авито/5post. Если вы из Санкт-Петербурга, можем договориться о личной встрече.',
    },
    {
      question: 'Сколько времени занимает доставка?',
      answer: 'Доставка по России занимает 3-7 рабочих дней. Если товара нет в наличии, лучше делать предзаказ за 2 недели, так как некоторые материалы могут идти от 2 до 14 дней.',
    },
    {
      question: 'Можно ли заказать украшение по индивидуальному дизайну?',
      answer: 'Да, конечно! Напишите мне в Telegram, и мы обсудим ваши пожелания. Создам украшение специально для вас.',
    },
    {
      question: 'Как ухаживать за украшениями?',
      answer: 'Храните украшения в сухом месте, избегайте контакта с водой и химическими веществами. Снимайте перед сном, во время тренировок или работы по дому (браслеты, ожерелья, серьги и другие украшения, контактирующие с кожей). Протирайте мягкой тканью.',
    },
    {
      question: 'Из чего сделаны украшения?',
      answer: 'Все украшения изготовлены вручную из качественных бусин, бисера и фурнитуры. Используются гипоаллергенные материалы.',
    },
  ];

  const renderHome = () => (
    <div className="animate-fade-in">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-accent to-primary opacity-30" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Украшения ручной работы
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Брелочки, браслеты и другие изделия из бусин, созданные с любовью
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            onClick={() => setActiveSection('catalog')}
          >
            Перейти в каталог
            <Icon name="ArrowRight" className="ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Избранные работы</h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Здесь собраны мои самые необычные и оригинальные украшения, созданные по индивидуальным заказам
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.keychains.slice(0, 3).map((product) => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover:shadow-xl transition-all hover-scale cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentImageIndex(0);
                }}
              >
                <CardContent className="p-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-64 object-cover ${product.id === 2 ? 'object-[center_15%]' : ''}`}
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-3 p-6">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary">{product.price}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">О мастере</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-5">
                <p className="text-lg leading-relaxed">
                  Привет! Меня зовут <span className="font-semibold text-primary">Настя</span> ✨
                </p>
                
                <div className="h-1 w-24 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full"></div>
                
                <p className="text-lg leading-relaxed">
                  В марте 2024 года я сделала своё первое украшение. Что начиналось с простых брелочков, 
                  превратилось в настоящее творческое путешествие.
                </p>
                
                <div className="h-1 w-24 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full"></div>
                
                <p className="text-lg leading-relaxed">
                  Сегодня в моей мастерской рождаются украшения: воздушные брелки, 
                  нежные браслеты, изящные серьги, элегантные ожерелья и цепочки для очков.
                </p>
                
                <div className="h-1 w-24 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full"></div>
                
                <p className="text-lg leading-relaxed">
                  Я с радостью создаю новые украшения для тех, кто ценит 
                  ручную работу и уникальность! 💝
                </p>
                
                <div className="h-1 w-24 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full"></div>
                
                <p className="text-lg leading-relaxed font-medium">
                  Следите за новыми работами в моём Telegram-канале:
                </p>
              </div>
              
              <Button
                size="lg"
                className="rounded-full w-full sm:w-auto"
                onClick={() => window.open('https://t.me/kittybeadsy', '_blank')}
              >
                <Icon name="Send" className="mr-2" />
                Telegram-канал
              </Button>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://cdn.poehali.dev/files/2766e8f6-d629-4b7e-b483-087d0ddfabca.png"
                    alt="Настя"
                    className="rounded-2xl shadow-lg w-full object-cover aspect-[3/4]"
                  />
                  <img
                    src="https://cdn.poehali.dev/files/aefdc640-3432-4580-8baf-db13a43c17b6.png"
                    alt="Украшения"
                    className="rounded-2xl shadow-lg w-full object-cover aspect-square"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://cdn.poehali.dev/files/074cea31-d5ae-433a-a65c-db2f75665111.png"
                    alt="Работы"
                    className="rounded-2xl shadow-lg w-full object-cover aspect-square"
                  />
                  <img
                    src="https://cdn.poehali.dev/files/c7ce1d55-e1c6-4515-b61d-ec524e0c5923.png"
                    alt="Процесс создания"
                    className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]"
                  />
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 text-6xl animate-bounce">✨</div>
              <div className="absolute -bottom-4 -left-4 text-5xl animate-pulse">💝</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderCatalog = () => (
    <div className="py-12 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Каталог украшений</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(cat.id as Category)}
              className="rounded-full px-6 py-6 text-lg"
            >
              <Icon name={cat.icon as any} className="mr-2" size={20} />
              {cat.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products[activeCategory].map((product) => (
            <Card 
              key={product.id} 
              className="overflow-hidden hover:shadow-xl transition-all hover-scale cursor-pointer"
              onClick={() => {
                setSelectedProduct(product);
                setCurrentImageIndex(0);
              }}
            >
              <CardContent className="p-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-center gap-3 p-6">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-2xl font-bold text-primary">{product.price}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="py-12 px-4 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pt-2">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );

  const renderTelegram = () => (
    <div className="py-12 px-4 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-secondary via-accent to-primary rounded-3xl p-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <img 
              src="https://cdn.poehali.dev/files/67ddb66d-4fb2-42d4-976f-2df6aab13f97.png" 
              alt="kittybeadsy logo"
              className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white/30"
            />
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold mb-4">Присоединяйтесь к нашему Telegram!</h2>
              <p className="text-xl text-muted-foreground">
                Следите за новинками, получайте эксклюзивные предложения и задавайте вопросы напрямую
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full shadow-lg mb-6"
              onClick={() => window.open('https://t.me/kittybeadsy', '_blank')}
            >
              <Icon name="Send" className="mr-2" />
              Перейти в Telegram
            </Button>
            <div className="text-base text-muted-foreground mt-6 pt-6 border-t border-white/20">
              <p className="mb-2">По всем вопросам и предложениям пишите:</p>
              <p className="font-semibold">
                лс в телеграм:{' '}
                <a 
                  href="https://t.me/Nast_461174" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @Nast_461174
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return renderHome();
      case 'catalog':
        return renderCatalog();
      case 'faq':
        return renderFAQ();
      case 'telegram':
        return renderTelegram();
      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => setActiveSection('home')}
              className="text-3xl font-bold text-primary tracking-wide"
              style={{ fontFamily: "'Cormorant', serif" }}
            >
              kittybeadsy
            </button>
            <div className="hidden md:flex gap-2">
              <Button
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('home')}
                className="rounded-full"
              >
                <Icon name="Home" className="mr-2" size={18} />
                Главная
              </Button>
              <Button
                variant={activeSection === 'catalog' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('catalog')}
                className="rounded-full"
              >
                <Icon name="Grid3x3" className="mr-2" size={18} />
                Каталог
              </Button>
              <Button
                variant={activeSection === 'faq' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('faq')}
                className="rounded-full"
              >
                <Icon name="HelpCircle" className="mr-2" size={18} />
                FAQ
              </Button>
              <Button
                variant={activeSection === 'telegram' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('telegram')}
                className="rounded-full"
              >
                <Icon name="Send" className="mr-2" size={18} />
                Telegram
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {selectedProduct ? (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          <div className="min-h-screen">
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
              <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-full"
                >
                  <Icon name="ArrowLeft" size={24} />
                </Button>
                <h1 className="text-xl font-semibold">{selectedProduct.name}</h1>
                <div className="w-10" />
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                    <img
                      src={selectedProduct.images[currentImageIndex]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedProduct.images.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between px-4">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full shadow-lg"
                          onClick={() => {
                            setCurrentImageIndex((prev) => 
                              prev === 0 ? selectedProduct.images.length - 1 : prev - 1
                            );
                          }}
                        >
                          <Icon name="ChevronLeft" size={24} />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full shadow-lg"
                          onClick={() => {
                            setCurrentImageIndex((prev) => 
                              prev === selectedProduct.images.length - 1 ? 0 : prev + 1
                            );
                          }}
                        >
                          <Icon name="ChevronRight" size={24} />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {selectedProduct.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-3">
                      {selectedProduct.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`aspect-square rounded-lg overflow-hidden transition-all ${
                            currentImageIndex === index 
                              ? 'ring-2 ring-primary scale-95' 
                              : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Cormorant', serif" }}>
                      {selectedProduct.name}
                    </h2>
                    <p className="text-4xl font-bold text-primary">{selectedProduct.price}</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Описание</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="text-xl font-semibold">Материалы</h3>
                    <ul className="space-y-2">
                      {selectedProduct.materials.map((material, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Icon name="Sparkles" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 pt-6 border-t">
                    <div className="bg-muted/50 rounded-2xl p-6 space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Все украшения создаются вручную с любовью и вниманием к деталям. 
                        Для заказа напишите в Telegram:
                      </p>
                      <Button
                        className="w-full rounded-full"
                        size="lg"
                        onClick={() => window.open('https://t.me/Nast_461174', '_blank')}
                      >
                        <Icon name="Send" className="mr-2" />
                        Написать в Telegram
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <main>{renderContent()}</main>
      )}

      <footer className="bg-muted py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-lg">
            Украшения ручной работы с любовью ✨
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;