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
        name: 'Брелочек "Нежность"', 
        price: '450 ₽', 
        image: '/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg',
        images: ['/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg', '/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg'],
        description: 'Милый брелочек ручной работы из нежно-розовых и лавандовых бусин. Идеально подойдет для ключей или сумочки.'
      },
      { 
        id: 2, 
        name: 'Брелочек "Лаванда"', 
        price: '450 ₽', 
        image: '/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg',
        images: ['/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg', '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg'],
        description: 'Очаровательный брелочек в лавандовых тонах. Каждая бусинка подобрана вручную.'
      },
      { 
        id: 3, 
        name: 'Брелочек "Сирень"', 
        price: '500 ₽', 
        image: '/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg',
        images: ['/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg', '/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg'],
        description: 'Изящный брелочек с акцентом на сиреневых оттенках. Ручная работа с любовью.'
      },
    ],
    bracelets: [
      { 
        id: 4, 
        name: 'Браслет "Розовый сон"', 
        price: '850 ₽', 
        image: '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg',
        images: ['/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg', '/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg'],
        description: 'Нежный браслет из розовых и лавандовых бусин. Регулируемый размер, подходит для любого запястья.'
      },
      { 
        id: 5, 
        name: 'Браслет "Мечта"', 
        price: '900 ₽', 
        image: '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg',
        images: ['/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg', '/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg'],
        description: 'Воздушный браслет с переливающимися бусинами. Создан для особенных моментов.'
      },
      { 
        id: 6, 
        name: 'Браслет "Облако"', 
        price: '800 ₽', 
        image: '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg',
        images: ['/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg', '/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg'],
        description: 'Легкий и нежный браслет, словно облако на вашем запястье. Комфортный и стильный.'
      },
    ],
    earrings: [
      { 
        id: 7, 
        name: 'Серьги "Воздушные"', 
        price: '650 ₽', 
        image: '/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg',
        images: ['/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg', '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg'],
        description: 'Изящные серьги из бусин пастельных оттенков. Гипоаллергенная фурнитура.'
      },
      { 
        id: 8, 
        name: 'Серьги "Весна"', 
        price: '700 ₽', 
        image: '/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg',
        images: ['/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg', '/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg'],
        description: 'Весенние серьги с нежными бусинами. Добавят свежести любому образу.'
      },
      { 
        id: 9, 
        name: 'Серьги "Цветок"', 
        price: '750 ₽', 
        image: '/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg',
        images: ['/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg', '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg'],
        description: 'Романтичные серьги с цветочным мотивом. Легкие и комфортные для повседневной носки.'
      },
    ],
    necklaces: [
      { 
        id: 10, 
        name: 'Колье "Романтика"', 
        price: '1200 ₽', 
        image: '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg',
        images: ['/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg', '/img/52ca3181-4b5e-4a60-9377-47cc192a6b7e.jpg'],
        description: 'Элегантное колье ручной работы. Станет украшением вечернего образа.'
      },
      { 
        id: 11, 
        name: 'Колье "Грация"', 
        price: '1350 ₽', 
        image: '/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg',
        images: ['/img/b44e157a-3f69-4642-9d25-b38e0f1279d7.jpg', '/img/396c6b97-ea55-4484-9ac0-14992d5aa000.jpg'],
        description: 'Изысканное колье с градиентом пастельных оттенков. Регулируемая длина.'
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
      question: 'Из чего сделаны украшения?',
      answer: 'Все украшения изготовлены вручную из качественных бусин, бисера и фурнитуры. Используются гипоаллергенные материалы.',
    },
    {
      question: 'Сколько времени занимает доставка?',
      answer: 'Доставка по России занимает 3-7 рабочих дней. Отправка заказа осуществляется в течение 1-2 дней после оплаты.',
    },
    {
      question: 'Можно ли заказать украшение по индивидуальному дизайну?',
      answer: 'Да, конечно! Напишите мне в Telegram, и мы обсудим ваши пожелания. Создам украшение специально для вас.',
    },
    {
      question: 'Как ухаживать за украшениями?',
      answer: 'Храните украшения в сухом месте, избегайте контакта с водой и химическими веществами. Протирайте мягкой тканью.',
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
          <h2 className="text-4xl font-bold text-center mb-12">Избранные работы</h2>
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

      <main>{renderContent()}</main>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src={selectedProduct.images[currentImageIndex]}
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  {selectedProduct.images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
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
                        onClick={(e) => {
                          e.stopPropagation();
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
                  <div className="flex gap-2 justify-center">
                    {selectedProduct.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentImageIndex === index 
                            ? 'bg-primary scale-125' 
                            : 'bg-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-primary">{selectedProduct.price}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {selectedProduct.description}
                  </p>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">
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
            </>
          )}
        </DialogContent>
      </Dialog>

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