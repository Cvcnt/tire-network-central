
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Plus,
  QrCode,
  Package,
  RefreshCw 
} from "lucide-react";

const mockProdutos = [
  {
    id: 1,
    nome: "Pneu Michelin 195/65R15",
    codigo: "MICH195-65R15",
    categoria: "Passeio",
    preco: 450.00,
    status: "Ativo"
  },
  {
    id: 2,
    nome: "Pneu Bridgestone 205/55R16",
    codigo: "BRID205-55R16",
    categoria: "Passeio",
    preco: 520.00,
    status: "Ativo"
  }
];

export function ProdutosTable() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie o catálogo de produtos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="premium" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Produto</th>
                  <th className="text-left p-3 font-medium">Categoria</th>
                  <th className="text-right p-3 font-medium">Preço</th>
                  <th className="text-center p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockProdutos.map((produto) => (
                  <tr 
                    key={produto.id} 
                    className="border-b border-border/50 hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{produto.nome}</p>
                        <p className="text-sm text-muted-foreground">{produto.codigo}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{produto.categoria}</Badge>
                    </td>
                    <td className="p-3 text-right font-medium">
                      R$ {produto.preco.toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant="outline" className="border-success text-success">
                        {produto.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
