import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "./MetricCard";
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Zap,
  Calendar,
  RefreshCw
} from "lucide-react";

// Mock data - em produção viria do Supabase
const mockMetrics = {
  totalVendas: 127500,
  vendasMes: 23450,
  ticketMedio: 850,
  estoqueBaixo: 15,
  vendedoresAtivos: 8,
  conversaoMes: 68,
  vendaDia: 3450,
  metaMes: 85
};

const mockRecentSales = [
  { id: 1, produto: "Pneu Michelin 195/65R15", vendedor: "Maria Santos", valor: 450, tempo: "2min atrás" },
  { id: 2, produto: "Pneu Bridgestone 205/55R16", vendedor: "João Pedro", valor: 520, tempo: "5min atrás" },
  { id: 3, produto: "Pneu Continental 185/60R14", vendedor: "Ana Costa", valor: 380, tempo: "8min atrás" },
  { id: 4, produto: "Pneu Goodyear 225/45R17", vendedor: "Carlos Lima", valor: 680, tempo: "12min atrás" },
];

export function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral das suas operações de venda
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button variant="gradient" size="sm">
            <Zap className="w-4 h-4 mr-2" />
            Insights IA
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Vendas Totais"
          value={`R$ ${mockMetrics.totalVendas.toLocaleString()}`}
          change={12.5}
          changeLabel="últimos 30 dias"
          icon={<DollarSign />}
          trend="up"
        />
        <MetricCard
          title="Vendas do Mês"
          value={`R$ ${mockMetrics.vendasMes.toLocaleString()}`}
          change={8.3}
          changeLabel="vs mês anterior"
          icon={<ShoppingCart />}
          trend="up"
        />
        <MetricCard
          title="Ticket Médio"
          value={`R$ ${mockMetrics.ticketMedio}`}
          change={-2.1}
          changeLabel="vs semana anterior"
          icon={<TrendingUp />}
          trend="down"
        />
        <MetricCard
          title="Estoque Baixo"
          value={mockMetrics.estoqueBaixo}
          change={-15.5}
          changeLabel="produtos críticos"
          icon={<Package />}
          trend="up"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Vendedores Ativos"
          value={mockMetrics.vendedoresAtivos}
          icon={<Users />}
          trend="neutral"
        />
        <MetricCard
          title="Conversão do Mês"
          value={`${mockMetrics.conversaoMes}%`}
          change={5.2}
          icon={<Target />}
          trend="up"
        />
        <MetricCard
          title="Venda Hoje"
          value={`R$ ${mockMetrics.vendaDia.toLocaleString()}`}
          change={18.7}
          icon={<Calendar />}
          trend="up"
        />
        <MetricCard
          title="Meta do Mês"
          value={`${mockMetrics.metaMes}%`}
          change={3.1}
          icon={<BarChart3 />}
          trend="up"
        />
      </div>

      {/* Charts and Tables Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Insights Card */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Insights IA - Previsões
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-success/10 border border-success/20">
                <div>
                  <p className="font-medium text-success">Previsão de Vendas</p>
                  <p className="text-sm text-muted-foreground">Próximos 7 dias</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-success">R$ 28.5K</p>
                  <p className="text-xs text-success">+15% vs atual</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div>
                  <p className="font-medium text-warning-foreground">Alerta de Estoque</p>
                  <p className="text-sm text-muted-foreground">Reabastecer em 5 dias</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-warning-foreground">12 itens</p>
                  <p className="text-xs text-warning-foreground">Ação necessária</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div>
                  <p className="font-medium text-primary">Melhor Período</p>
                  <p className="text-sm text-muted-foreground">Para vendas hoje</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">14h-17h</p>
                  <p className="text-xs text-primary">89% conversão</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRecentSales.map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{sale.produto}</p>
                    <p className="text-sm text-muted-foreground">
                      por {sale.vendedor} • {sale.tempo}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">R$ {sale.valor}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              Ver Todas as Vendas
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="gradient" className="justify-start">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Nova Venda
            </Button>
            <Button variant="outline" className="justify-start">
              <Package className="w-4 h-4 mr-2" />
              Consultar Estoque
            </Button>
            <Button variant="outline" className="justify-start">
              <Users className="w-4 h-4 mr-2" />
              Gerenciar Usuários
            </Button>
            <Button variant="outline" className="justify-start">
              <BarChart3 className="w-4 h-4 mr-2" />
              Relatórios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}