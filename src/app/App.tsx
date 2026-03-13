import { useEffect, useState } from 'react';
import { RaffleGrid } from './components/RaffleGrid';
import { PixPaymentDialog } from './components/PixPaymentDialog';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Heart, Gift, Shield, Trophy, Phone, Instagram, Check, Star } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [soldNumbers, setSoldNumbers] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);

  const totalNumbers = 200;
  const pricePerNumber = 15;
  const progressPercentage = (soldNumbers.length / totalNumbers) * 100;
  const availableNumbers = totalNumbers - soldNumbers.length;

  const handleNumberClick = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  useEffect(() => {
    const loadReservedNumbers = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-reservados', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data?.reservados)) {
          const validNumbers = data.reservados
            .map((value: unknown) => Number(value))
            .filter((value: number) => Number.isInteger(value) && value >= 1 && value <= totalNumbers);
          setSoldNumbers(validNumbers);
          setSelectedNumbers((currentSelected) =>
            currentSelected.filter((number) => !validNumbers.includes(number))
          );
        }
      } catch {
        // Em ambiente sem Functions ativas, segue com todos números disponíveis.
      }
    };

    loadReservedNumbers();
    const refreshTimer = window.setInterval(loadReservedNumbers, 15000);
    return () => window.clearInterval(refreshTimer);
  }, [totalNumbers]);

  const handleSendToWhatsApp = () => {
    if (selectedNumbers.length === 0) {
      toast.error('Selecione pelo menos um número para continuar.');
      return;
    }

    if (!customerName.trim()) {
      toast.error('Informe seu nome para enviar o comprovante.');
      return;
    }

    if (!customerPhone.trim()) {
      toast.error('Informe seu telefone para enviar o comprovante.');
      return;
    }

    const numerosSelecionados = [...selectedNumbers].sort((a, b) => a - b).join(', ');
    const mensagem = `Olá! Acabei de pagar a rifa de Páscoa.

Nome: ${customerName.trim()}
Telefone: ${customerPhone.trim()}
Números escolhidos: ${numerosSelecionados}

Estou enviando o comprovante do PIX.`;

    const whatsappUrl = `https://wa.me/5519989693601?text=${encodeURIComponent(mensagem)}`;
    window.location.href = whatsappUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" richColors />
      
      {/* Header Clean E-commerce */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://i.ibb.co/7JL5850P/491443182-1879633966172148-7021411517961541018-n.jpg" 
                alt="Soldados de Aruanda"
                className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Rifa de Páscoa 2026</h1>
                <p className="text-sm text-gray-600">Soldados de Aruanda</p>
              </div>
            </div>
            <Badge className="bg-orange-500 text-white px-4 py-2 text-sm">
              Ação Solidária
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Banner com CTA Principal */}
        <div className="mb-8 -mt-4">
          <Card className="overflow-hidden border-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 shadow-2xl">
            <div className="p-8 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Trophy className="w-4 h-4" />
                OVO DE PÁSCOA 3KG • R$ 15,00 POR NÚMERO
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Concorra e Ajude Crianças que Mais Precisam!
              </h2>
              
              <p className="text-white/90 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                Escolha seus números da sorte e participe dessa ação solidária
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={() => {
                    const element = document.getElementById('numeros-grade');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg px-10 py-7 shadow-2xl hover:scale-105 transition-transform"
                >
                  <Gift className="w-6 h-6 mr-2" />
                  Escolher Meus Números da Sorte
                </Button>
                
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">{availableNumbers} números disponíveis</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Layout Principal: Produto + Info */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 mb-8">
          {/* Coluna Esquerda: Produto */}
          <div className="space-y-6">
            {/* Imagem do Produto */}
            <Card className="overflow-hidden border border-gray-200 bg-white">
              <div className="relative">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1650886584481-27112500da1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMGVhc3RlciUyMGVnZyUyMGNob2NvbGF0ZSUyMHNpbmdsZXxlbnwxfHx8fDE3NzM0MDgxMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Ovo de Páscoa 3kg"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-orange-500 text-white px-3 py-1.5 text-sm font-bold">
                    Prêmio da Rifa
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Descrição do Produto */}
            <Card className="p-6 border border-gray-200 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre o Prêmio</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Ovo de Páscoa Premium 3kg</p>
                    <p className="text-sm text-gray-600">Chocolate ao leite crocante de primeira qualidade</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Produto Premium</p>
                    <p className="text-sm text-gray-600">Alta qualidade e tamanho especial para você ganhar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Sorteio Transparente</p>
                    <p className="text-sm text-gray-600">Realizado online com todos os participantes</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Causa Social */}
            <Card className="p-6 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-pink-50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ajude uma Criança nesta Páscoa</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    100% da arrecadação será destinada para compra de ovos de Páscoa e cestas básicas 
                    para crianças carentes da nossa comunidade. Sua participação transforma vidas!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-orange-200">
                <Shield className="w-5 h-5 text-orange-600" />
                <p className="text-sm font-semibold text-gray-700">Transparência Total • Ação Verificada</p>
              </div>
            </Card>
          </div>

          {/* Coluna Direita: Compra */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="p-6 border border-gray-200 bg-white shadow-lg">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">R$ {pricePerNumber}</span>
                  <span className="text-gray-600">/número</span>
                </div>
                <p className="text-sm text-gray-600">Escolha quantos números você quiser</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-semibold text-green-800">Números Disponíveis</span>
                  <Badge className="bg-green-600 text-white">{availableNumbers}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progresso da Rifa</span>
                    <span className="font-semibold text-gray-900">{progressPercentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </div>

              <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Pagamento via PIX</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Reserva confirmada pelo ADM via WhatsApp</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Sorteio online e transparente</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Compra Segura</p>
                    <p className="text-xs text-blue-700">
                      Sua participação é registrada e você receberá confirmação por WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Trust Badges */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>Seguro</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>Social</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>Verificado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Seleção de Números */}
        <Card className="p-6 md:p-8 border border-gray-200 bg-white" id="numeros-grade">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Escolha seus números da sorte</h2>
            <p className="text-gray-600">Selecione um ou mais números disponíveis abaixo</p>
          </div>

          <RaffleGrid
            totalNumbers={totalNumbers}
            soldNumbers={soldNumbers}
            selectedNumbers={selectedNumbers}
            onNumberClick={handleNumberClick}
          />

          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded"></div>
              <span className="text-sm text-gray-700 font-medium">Disponível</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-700 font-medium">Selecionado</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-gray-300 rounded opacity-60"></div>
              <span className="text-sm text-gray-700 font-medium">Vendido</span>
            </div>
          </div>

          <Card className="mt-6 p-4 md:p-6 border border-orange-200 bg-orange-50">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="customer-name">Nome *</Label>
                <Input
                  id="customer-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Digite seu nome"
                  className="mt-1 bg-white"
                />
              </div>
              <div>
                <Label htmlFor="customer-phone">Telefone *</Label>
                <Input
                  id="customer-phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(19) 99999-9999"
                  className="mt-1 bg-white"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center gap-2">
              <Button
                onClick={handleSendToWhatsApp}
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-6"
              >
                Concluir reserva de número
              </Button>
              <p className="text-xs text-center text-gray-600">
                Os números só serão marcados como reservados após validação manual do comprovante pelo ADM.
              </p>
            </div>
          </Card>
        </Card>

        {/* Seção de Contribuição Extra */}
        <Card className="mt-8 overflow-hidden border-2 border-orange-200 bg-white">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Imagem Emocional */}
            <div className="relative h-64 md:h-auto">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1690100691688-f3b97fc15392?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkcmVuJTIwc21pbGluZyUyMGpveXxlbnwxfHx8fDE3NzM0MDg0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Crianças felizes"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
            </div>

            {/* Texto e CTA */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-xs font-bold mb-4 w-fit">
                <Heart className="w-3.5 h-3.5" />
                CONTRIBUIÇÃO VOLUNTÁRIA
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Faça a diferença na vida de uma criança
              </h3>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Além de concorrer ao prêmio, você pode contribuir com qualquer valor para multiplicarmos 
                a alegria da Páscoa. Cada real extra se transforma em sorrisos, chocolates e esperança 
                para crianças que mais precisam.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-900">R$ 10</strong> = 1 ovo de Páscoa pequeno
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-900">R$ 25</strong> = 1 ovo médio + bombons
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-900">R$ 50+</strong> = Cesta de Páscoa completa
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setDonationDialogOpen(true)}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-6 text-base font-bold shadow-lg w-full"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Quero Contribuir
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-4 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                Sua doação é 100% destinada às crianças. Transparência total.
              </p>
            </div>
          </div>
        </Card>

        {/* Contato */}
        <Card className="mt-8 p-8 border border-gray-200 bg-white">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Precisa de Ajuda?</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6">
              <Phone className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
            <Button variant="outline" className="border-gray-300 px-8 py-6">
              <Instagram className="w-5 h-5 mr-2" />
              @soldadosdearuanda
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 pb-8 space-y-2">
          <p className="text-sm text-gray-600">
            Soldados de Aruanda • Rifa de Páscoa 2026
          </p>
          <p className="text-xs text-gray-500">
            Ação solidária para crianças carentes • Sorteio online e transparente
          </p>
        </div>
      </div>

      <PixPaymentDialog
        open={donationDialogOpen}
        onOpenChange={setDonationDialogOpen}
        selectedNumbers={[]}
        customerName=""
        customerPhone=""
        onPaymentConfirmed={() => {}}
      />

    </div>
  );
}