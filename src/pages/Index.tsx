import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'iPhone 15 Pro', category: 'Смартфоны', price: 89990, image: 'https://v3b.fal.media/files/b/panda/fGmvbwfK1NIz6LoyRHg9b_output.png' },
  { id: 2, name: 'MacBook Air M2', category: 'Ноутбуки', price: 124990, image: 'https://v3b.fal.media/files/b/panda/fGmvbwfK1NIz6LoyRHg9b_output.png' },
  { id: 3, name: 'AirPods Pro 2', category: 'Наушники', price: 24990, image: 'https://v3b.fal.media/files/b/panda/fGmvbwfK1NIz6LoyRHg9b_output.png' },
  { id: 4, name: 'iPad Pro 12.9', category: 'Планшеты', price: 109990, image: 'https://v3b.fal.media/files/b/panda/fGmvbwfK1NIz6LoyRHg9b_output.png' },
  { id: 5, name: 'Samsung Galaxy S24', category: 'Смартфоны', price: 79990, image: 'https://v3b.fal.media/files/b/panda/fGmvbwfK1NIz6LoyRHg9b_output.png' },
  { id: 6, name: 'Sony WH-1000XM5', category: 'Наушники', price: 29990, image: 'https://v3b.fal.media/files/b/panda/fGmvbwfK1NIz6LoyRHg9b_output.png' },
  { id: 7, name: 'Dell XPS 15', category: 'Ноутбуки', price: 149990, image: 'https://v3b.fal.media/files/b/panda/fGmvbwfK1NIz6LoyRHg9b_output.png' },
  { id: 8, name: 'Apple Watch Series 9', category: 'Умные часы', price: 44990, image: 'https://v3b.fal.media/files/b/panda/fGmvbwfK1NIz6LoyRHg9b_output.png' },
];

const categories = ['Все товары', 'Смартфоны', 'Ноутбуки', 'Наушники', 'Планшеты', 'Умные часы'];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все товары');
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все товары' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Smartphone" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold text-[#1E293B]">ELECTRONICS STORE</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="tel:89226125076" className="flex items-center gap-2 text-[#1E293B] hover:text-primary transition-colors">
                <Icon name="Phone" size={20} />
                <span className="font-semibold hidden sm:inline">8 (922) 612-50-76</span>
              </a>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col h-full">
                    {cart.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                        <Icon name="ShoppingCart" size={48} className="mb-4 opacity-50" />
                        <p>Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-auto space-y-4">
                          {cart.map(item => (
                            <Card key={item.id} className="p-4">
                              <div className="flex gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                  <h3 className="font-semibold text-sm">{item.name}</h3>
                                  <p className="text-sm text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => removeFromCart(item.id)}
                                      className="ml-auto"
                                    >
                                      <Icon name="Trash2" size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Итого:</span>
                            <span className="text-2xl font-bold text-primary">
                              {totalPrice.toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                          <div className="space-y-3">
                            <div className="bg-muted p-3 rounded-lg">
                              <p className="text-sm font-semibold mb-2">Доставка и оплата</p>
                              <p className="text-xs text-muted-foreground mb-1">Оплата переводом на номер:</p>
                              <a href="tel:89221193616" className="text-sm font-bold text-primary hover:underline">
                                8 (922) 119-36-16
                              </a>
                            </div>
                            <Button className="w-full" size="lg" asChild>
                              <a href="tel:89221193616">Оформить заказ</a>
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap justify-center">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                  <Button onClick={() => addToCart(product)}>
                    <Icon name="Plus" size={16} className="mr-1" />
                    В корзину
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-xl text-muted-foreground">Товары не найдены</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2 justify-center md:justify-start">
                <Icon name="Phone" size={20} className="text-primary" />
                Контакты
              </h3>
              <a href="tel:89226125076" className="text-primary hover:underline text-lg font-semibold block">
                8 (922) 612-50-76
              </a>
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2 justify-center md:justify-start">
                <Icon name="CreditCard" size={20} className="text-primary" />
                Доставка и оплата
              </h3>
              <p className="text-sm text-muted-foreground mb-2">Оплата переводом на номер:</p>
              <a href="tel:89221193616" className="text-primary hover:underline text-lg font-semibold block">
                8 (922) 119-36-16
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}