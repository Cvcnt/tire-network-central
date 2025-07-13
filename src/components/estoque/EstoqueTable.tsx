import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  AlertTriangle,
  TrendingUp,
  Package,
  RefreshCw 
} from "lucide-react";

// Mock data - em produção viria do Supabase
const mockEstoque = [
  {
    id: 1,
    produto: "Pneu Michelin 195/65R15",
    codigo: "MICH195-65R15",
    quantidade: 25,
    minimo: 10,
    preco: 450.00,
    categoria: "Passeio",
    previsaoIA: 32
  },
  {
    id: 2,
    produto: "Pneu Bridgestone 205/55R16",
    codigo: "BRID205-55R16",
    quantidade: 8,
    minimo: 15,
    preco: 520.00,
    categoria: "Passeio",
    previsaoIA: 18
  },
  {
    id: 3,
    produto: "Pneu Continental 185/60R14",
    codigo: "CONT185-60R14",
    quantidade: 35,
    minimo: 20,
    preco: 380.00,
    categoria: "Econômico",
    previsaoIA: 42
  },
  {
    id: 4,
    produto: "Pneu Goodyear 225/45R17",
    codigo: "GOOD225-45R17",
    quantidade: 12,
    minimo: 8,
    preco: 680.00,
    categoria: "Performance",
    previsaoIA: 15
  },
  {
    id: 5,
    produto: "Pneu Pirelli 235/50R18",
    codigo: "PIRE235-50R18",
    quantidade: 3,
    minimo: 12,
    preco: 750.00,
    categoria: "Premium",
    previsaoIA: 8
  }
];

export function EstoqueTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");

  const getStatusBadge = (quantidade: number, minimo: number) => {
    if (quantidade === 0) {
      return <Badge variant="destructive">Sem Estoque</Badge>;
    } else if (quantidade <= minimo) {
      return <Badge variant="outline" className="border-warning text-warning">Baixo</Badge>;
    } else {
      return <Badge variant="outline" className="border-success text-success">Normal</Badge>;
    }
  };

  const filteredEstoque = mockEstoque.filter(item => {
    const matchesSearch = item.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = filtroCategoria === "todos" || item.categoria === filtroCategoria;
    return matchesSearch && matchesCategoria;
  });

  const categorias = ["todos", ...Array.from(new Set(mockEstoque.map(item => item.categoria)))];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Controle de Estoque</h1>
          <p className="text-muted-foreground">
            Monitore seus produtos e níveis de estoque
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="gradient" size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Previsão IA
          </Button>
        </div>
      </div>

      {/* Filters */}
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
            <div className="flex gap-2">
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria === "todos" ? "Todas as categorias" : categoria}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="metric-card metric-neutral">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Produtos</p>
                <p className="text-2xl font-bold">{mockEstoque.length}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card metric-negative">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Estoque Baixo</p>
                <p className="text-2xl font-bold text-destructive">
                  {mockEstoque.filter(item => item.quantidade <= item.minimo).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card metric-positive">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold text-success">
                  R$ {mockEstoque.reduce((sum, item) => sum + (item.quantidade * item.preco), 0).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card metric-neutral">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Previsão IA</p>
                <p className="text-2xl font-bold text-primary">
                  {mockEstoque.reduce((sum, item) => sum + item.previsaoIA, 0)}
                </p>
                <p className="text-xs text-muted-foreground">próximos 30 dias</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Produtos em Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Produto</th>
                  <th className="text-left p-3 font-medium">Categoria</th>
                  <th className="text-center p-3 font-medium">Quantidade</th>
                  <th className="text-center p-3 font-medium">Mínimo</th>
                  <th className="text-right p-3 font-medium">Preço</th>
                  <th className="text-center p-3 font-medium">Previsão IA</th>
                  <th className="text-center p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEstoque.map((item) => (
                  <tr 
                    key={item.id} 
                    className="border-b border-border/50 hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{item.produto}</p>
                        <p className="text-sm text-muted-foreground">{item.codigo}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{item.categoria}</Badge>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`font-bold ${
                        item.quantidade <= item.minimo ? 'text-destructive' : 'text-foreground'
                      }`}>
                        {item.quantidade}
                      </span>
                    </td>
                    <td className="p-3 text-center text-muted-foreground">
                      {item.minimo}
                    </td>
                    <td className="p-3 text-right font-medium">
                      R$ {item.preco.toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="w-3 h-3 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          {item.previsaoIA}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      {getStatusBadge(item.quantidade, item.minimo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredEstoque.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Nenhum produto encontrado</p>
              <p className="text-sm">Tente ajustar os filtros de busca</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}