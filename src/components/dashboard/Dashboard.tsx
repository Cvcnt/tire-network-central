import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";

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
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    toast({
      title: "Dados atualizados",
      description: "Dashboard foi atualizado com sucesso!",
    });
  };

  const handleMetricClick = (metric: string) => {
    switch (metric) {
      case 'vendas':
        navigate('/vendas');
        break;
      case 'estoque':
        navigate('/estoque');
        break;
      case 'usuarios':
        navigate('/usuarios');
        break;
      case 'relatorios':
        navigate('/relatorios');
        break;
      default:
        break;
    }
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'nova-venda':
        navigate('/vendas');
        break;
      case 'consultar-estoque':
        navigate('/estoque');
        break;
      case 'gerenciar-usuarios':
        navigate('/usuarios');
        break;
      case 'relatorios':
        navigate('/relatorios');
        break;
      case 'insights-ia':
        navigate('/insights');
        break;
      case 'ver-todas-vendas':
        navigate('/vendas');
        break;
      default:
        break;
    }
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
          <Button variant="premium" size="sm" onClick={() => handleActionClick('insights-ia')}>
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
          onClick={() => handleMetricClick('vendas')}
        />
        <MetricCard
          title="Vendas do Mês"
          value={`R$ ${mockMetrics.vendasMes.toLocaleString()}`}
          change={8.3}
          changeLabel="vs mês anterior"
          icon={<ShoppingCart />}
          trend="up"
          onClick={() => handleMetricClick('vendas')}
        />
        <MetricCard
          title="Ticket Médio"
          value={`R$ ${mockMetrics.ticketMedio}`}
          change={-2.1}
          changeLabel="vs semana anterior"
          icon={<TrendingUp />}
          trend="down"
          onClick={() => handleMetricClick('vendas')}
        />
        <MetricCard
          title="Estoque Baixo"
          value={mockMetrics.estoqueBaixo}
          change={-15.5}
          changeLabel="produtos críticos"
          icon={<Package />}
          trend="up"
          onClick={() => handleMetricClick('estoque')}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Vendedores Ativos"
          value={mockMetrics.vendedoresAtivos}
          icon={<Users />}
          trend="neutral"
          onClick={() => handleMetricClick('usuarios')}
        />
        <MetricCard
          title="Conversão do Mês"
          value={`${mockMetrics.conversaoMes}%`}
          change={5.2}
          icon={<Target />}
          trend="up"
          onClick={() => handleMetricClick('relatorios')}
        />
        <MetricCard
          title="Venda Hoje"
          value={`R$ ${mockMetrics.vendaDia.toLocaleString()}`}
          change={18.7}
          icon={<Calendar />}
          trend="up"
          onClick={() => handleMetricClick('vendas')}
        />
        <MetricCard
          title="Meta do Mês"
          value={`${mockMetrics.metaMes}%`}
          change={3.1}
          icon={<BarChart3 />}
          trend="up"
          onClick={() => handleMetricClick('relatorios')}
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
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => handleActionClick('ver-todas-vendas')}
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
            <Button variant="ghost" className="w-full mt-4" onClick={() => handleActionClick('ver-todas-vendas')}>
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
            <Button variant="premium" className="justify-start" onClick={() => handleActionClick('nova-venda')}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Nova Venda
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => handleActionClick('consultar-estoque')}>
              <Package className="w-4 h-4 mr-2" />
              Consultar Estoque
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => handleActionClick('gerenciar-usuarios')}>
              <Users className="w-4 h-4 mr-2" />
              Gerenciar Usuários
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => handleActionClick('relatorios')}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Relatórios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
