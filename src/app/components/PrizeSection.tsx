import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Sparkles, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PrizeSection() {
  return (
    <Card className="overflow-hidden border-4 border-orange-400 shadow-2xl bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 relative">
      {/* Brilho decorativo */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative p-4 md:p-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-3xl">🏆</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-center bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            O QUE VOCÊ PODE GANHAR
          </h2>
          <span className="text-3xl">🍫</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Imagem do Prêmio */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1745227883379-6456fbf23da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXN0ZXIlMjBlZ2clMjBjaG9jb2xhdGUlMjBkZWxpY2lvdXN8ZW58MXx8fHwxNzczNDA0MTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Ovo de Páscoa Premium"
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-orange-500 text-white font-bold text-sm px-3 py-1 shadow-lg animate-pulse">
                  <Trophy className="w-4 h-4 mr-1" />
                  PRÊMIO
                </Badge>
              </div>
            </div>
          </div>

          {/* Descrição do Prêmio */}
          <div className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1.5 rounded-full font-semibold text-sm mb-3 shadow-lg">
                <Award className="w-4 h-4" />
                Prêmio Premium
              </div>
              
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                Ovo de Páscoa Gigante 🥚
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-md border-2 border-orange-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    3kg
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Peso Total</div>
                    <div className="text-gray-600 text-sm">Chocolate de primeira qualidade</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-md border-2 border-pink-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Chocolate ao Leite Crocante</div>
                    <div className="text-gray-600 text-sm">Recheio especial irresistível</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-xl p-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide opacity-90">
                    Valor Estimado
                  </div>
                  <div className="text-3xl font-extrabold">
                    R$ 350,00+
                  </div>
                </div>
                <Trophy className="w-12 h-12 opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Banner promocional */}
        <div className="mt-6 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 text-white rounded-xl p-4 text-center shadow-xl">
          <p className="text-lg md:text-xl font-bold">
            🎯 Participe agora e concorra! 🎯
          </p>
          <p className="text-orange-100 mt-1 text-sm">
            Apenas R$ 15,00 por número • Sorteio online e transparente
          </p>
        </div>
      </div>
    </Card>
  );
}