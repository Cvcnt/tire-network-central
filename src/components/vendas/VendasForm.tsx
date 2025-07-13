import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  QrCode, 
  Camera, 
  Plus, 
  Trash2, 
  Calculator,
  Save,
  Scan
} from "lucide-react";

interface VendaItem {
  id: string;
  produto: string;
  quantidade: number;
  valorUnitario: number;
  total: number;
}

export function VendasForm() {
  const [codigoBarras, setCodigoBarras] = useState("");
  const [itensVenda, setItensVenda] = useState<VendaItem[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [clienteNome, setClienteNome] = useState("");
  const { toast } = useToast();

  // Mock product database
  const mockProducts = {
    "7891234567890": { nome: "Pneu Michelin 195/65R15", preco: 450.00 },
    "7891234567891": { nome: "Pneu Bridgestone 205/55R16", preco: 520.00 },
    "7891234567892": { nome: "Pneu Continental 185/60R14", preco: 380.00 },
  };

  const handleCodigoSubmit = (codigo: string) => {
    const produto = mockProducts[codigo as keyof typeof mockProducts];
    
    if (produto) {
      const novoItem: VendaItem = {
        id: Date.now().toString(),
        produto: produto.nome,
        quantidade: 1,
        valorUnitario: produto.preco,
        total: produto.preco
      };
      
      setItensVenda([...itensVenda, novoItem]);
      setCodigoBarras("");
      
      toast({
        title: "Produto adicionado!",
        description: `${produto.nome} - R$ ${produto.preco.toFixed(2)}`,
        variant: "default",
      });
    } else {
      toast({
        title: "Produto não encontrado",
        description: "Verifique o código de barras e tente novamente",
        variant: "destructive",
      });
    }
  };

  const handleScanCamera = () => {
    setIsScanning(true);
    // Mock camera scanning - in production would use WebRTC
    setTimeout(() => {
      const randomCode = Object.keys(mockProducts)[Math.floor(Math.random() * Object.keys(mockProducts).length)];
      handleCodigoSubmit(randomCode);
      setIsScanning(false);
    }, 2000);
  };

  const removeItem = (id: string) => {
    setItensVenda(itensVenda.filter(item => item.id !== id));
  };

  const updateQuantidade = (id: string, novaQuantidade: number) => {
    if (novaQuantidade < 1) return;
    
    setItensVenda(itensVenda.map(item => 
      item.id === id 
        ? { ...item, quantidade: novaQuantidade, total: item.valorUnitario * novaQuantidade }
        : item
    ));
  };

  const calcularTotal = () => {
    return itensVenda.reduce((sum, item) => sum + item.total, 0);
  };

  const handleFinalizarVenda = () => {
    if (itensVenda.length === 0) {
      toast({
        title: "Venda vazia",
        description: "Adicione pelo menos um item à venda",
        variant: "destructive",
      });
      return;
    }

    // Mock save to database
    toast({
      title: "Venda finalizada!",
      description: `Total: R$ ${calcularTotal().toFixed(2)}`,
      variant: "default",
    });
    
    // Reset form
    setItensVenda([]);
    setClienteNome("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nova Venda</h1>
          <p className="text-muted-foreground">
            Escaneie produtos ou digite códigos de barras
          </p>
        </div>
        <Button variant="outline" onClick={() => window.history.back()}>
          Voltar
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Scanning Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Barcode Scanner */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                Scanner de Código de Barras
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="codigo">Código de Barras</Label>
                  <Input
                    id="codigo"
                    value={codigoBarras}
                    onChange={(e) => setCodigoBarras(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && codigoBarras) {
                        handleCodigoSubmit(codigoBarras);
                      }
                    }}
                    placeholder="Digite ou escaneie o código..."
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2 items-end">
                  <Button 
                    variant="premium"
                    onClick={handleScanCamera}
                    disabled={isScanning}
                    size="lg"
                  >
                    {isScanning ? (
                      <Scan className="w-4 h-4 animate-pulse" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    onClick={() => codigoBarras && handleCodigoSubmit(codigoBarras)}
                    disabled={!codigoBarras}
                    size="lg"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {isScanning && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 animate-pulse">
                  <p className="text-center text-primary font-medium">
                    📱 Escaneando produto... Aponte a câmera para o código de barras
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Informações do Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="cliente">Nome do Cliente (Opcional)</Label>
                  <Input
                    id="cliente"
                    value={clienteNome}
                    onChange={(e) => setClienteNome(e.target.value)}
                    placeholder="João da Silva"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Vendedor</Label>
                  <Input value="João Silva" disabled className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items List */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Itens da Venda</span>
                <Badge variant="outline">
                  {itensVenda.length} {itensVenda.length === 1 ? 'item' : 'itens'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {itensVenda.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <QrCode className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhum item adicionado ainda</p>
                  <p className="text-sm">Escaneie um produto para começar</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {itensVenda.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 rounded-lg border bg-card/50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.produto}</p>
                        <p className="text-sm text-muted-foreground">
                          R$ {item.valorUnitario.toFixed(2)} cada
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantidade(item.id, item.quantidade - 1)}
                          disabled={item.quantidade <= 1}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantidade}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantidade(item.id, item.quantidade + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">R$ {item.total.toFixed(2)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-4">
          <Card className="glass-card sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Resumo da Venda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>R$ {calcularTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Desconto:</span>
                  <span>R$ 0,00</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-primary">R$ {calcularTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                variant="premium"
                size="lg"
                onClick={handleFinalizarVenda}
                disabled={itensVenda.length === 0}
              >
                <Save className="w-4 h-4 mr-2" />
                Finalizar Venda
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
