import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Copy, Check, CreditCard, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PixPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedNumbers: number[];
  customerName: string;
  customerPhone: string;
  onPaymentConfirmed: () => void;
}

export function PixPaymentDialog({ 
  open, 
  onOpenChange, 
  selectedNumbers,
  customerName,
  customerPhone,
  onPaymentConfirmed
}: PixPaymentDialogProps) {
  const [copied, setCopied] = useState(false);
  const pixKey = 'rifastusa@gmail.com';
  const totalValue = selectedNumbers.length * 15;

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast.success('Chave PIX copiada!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleConfirmPayment = () => {
    // Se não tem números selecionados, é contribuição voluntária
    if (selectedNumbers.length === 0) {
      toast.success('💛 Muito obrigado por sua contribuição!', {
        description: 'Sua generosidade vai transformar a Páscoa de muitas crianças. Que Deus abençoe você!',
      });
    } else {
      toast.success('Pagamento registrado!', {
        description: 'Você receberá a confirmação em breve via WhatsApp.',
      });
    }
    onPaymentConfirmed();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Pagamento via PIX
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* QR Code PIX */}
          <Card className="p-6 bg-white border-2 border-purple-200">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CreditCard className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-lg text-gray-800">Pague com PIX</h3>
            </div>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <p className="font-semibold text-gray-800">Use a chave PIX abaixo:</p>
              </div>

              {/* Chave PIX */}
              <div className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1">Chave PIX (E-mail)</p>
                    <p className="font-mono font-bold text-purple-600 break-all">
                      {pixKey}
                    </p>
                  </div>
                  <Button
                    onClick={handleCopyPixKey}
                    variant="outline"
                    className="flex-shrink-0 border-purple-300 hover:bg-purple-50"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        <span className="text-green-600">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Instruções */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Como pagar
            </h3>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">1</span>
                <span>Abra o aplicativo do seu banco</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">2</span>
                <span>Escolha a opção <strong>PIX</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">3</span>
                <span>Copie a <strong>chave PIX</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">4</span>
                <span>Confirme o valor de <strong>R$ {totalValue.toFixed(2)}</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">5</span>
                <span>Após pagar, clique no botão abaixo para confirmar</span>
              </li>
            </ol>
          </Card>

          {/* Dados do Comprador */}
          <Card className="p-4 bg-gray-50 border border-gray-200">
            <p className="text-xs text-gray-600 mb-2">Seus dados:</p>
            <p className="font-semibold text-gray-800">{customerName}</p>
            <p className="text-sm text-gray-600">{customerPhone}</p>
          </Card>

          {/* Botão de Confirmação */}
          <div className="space-y-3">
            <Button 
              onClick={handleConfirmPayment}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-7 text-lg shadow-xl"
            >
              <Check className="w-6 h-6 mr-2" />
              Já fiz o pagamento
            </Button>
            
            <p className="text-xs text-center text-gray-500">
              Ao confirmar, você declara que realizou o pagamento. Entraremos em contato via WhatsApp para validar.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}