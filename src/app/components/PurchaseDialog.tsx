import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ArrowRight } from 'lucide-react';

interface PurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedNumbers: number[];
  onConfirm: (data: PurchaseData) => void;
}

export interface PurchaseData {
  name: string;
  phone: string;
  notes: string;
}

export function PurchaseDialog({ 
  open, 
  onOpenChange, 
  selectedNumbers,
  onConfirm 
}: PurchaseDialogProps) {
  const [formData, setFormData] = useState<PurchaseData>({
    name: '',
    phone: '',
    notes: ''
  });

  const totalValue = selectedNumbers.length * 15;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Seus Dados
          </DialogTitle>
          <DialogDescription>
            Preencha suas informações para continuar com o pagamento
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Números selecionados:</span>
            <span className="font-bold text-purple-600">{selectedNumbers.length}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedNumbers.map(num => (
              <span key={num} className="bg-white px-2 py-1 rounded text-sm font-semibold text-purple-600">
                {num}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-purple-200 pt-2">
            <span className="font-semibold text-gray-700">Valor Total:</span>
            <span className="text-2xl font-bold text-purple-600">
              R$ {totalValue.toFixed(2)}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Seu nome completo"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefone/WhatsApp *</Label>
            <Input
              id="phone"
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(00) 00000-0000"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Alguma mensagem ou observação..."
              rows={3}
              className="mt-1"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-6 text-lg"
          >
            Continuar para Pagamento
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}