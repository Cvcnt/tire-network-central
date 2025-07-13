
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  TrendingUp,
  AlertTriangle,
  Target,
  RefreshCw
} from "lucide-react";

const insights = [
  {
    id: 1,
    titulo: "Previsão de Vendas",
    descricao: "Próximos 7 dias: R$ 28.5K (+15% vs atual)",
    tipo: "success",
    icone: TrendingUp
  },
  {
    id: 2,
    titulo: "Alerta de Estoque",
    descricao: "12 itens precisam ser reabastecidos em 5 dias",
    tipo: "warning",
    icone: AlertTriangle
  },
  {
    id: 3,
    titulo: "Melhor Período de Vendas",
    descricao: "14h-17h apresenta 89% de conversão",
    tipo: "info",
    icone: Target
  }
];

export function InsightsTable() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Insights IA</h1>
          <p className="text-muted-foreground">
            Análises inteligentes para otimizar seu negócio
          </p>
        </div>
        <Button variant="premium" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar Insights
        </Button>
      </div>

      <div className="grid gap-6">
        {insights.map((insight) => (
          <Card key={insight.id} className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    insight.tipo === 'success' ? 'bg-success/20' :
                    insight.tipo === 'warning' ? 'bg-warning/20' :
                    'bg-primary/20'
                  }`}>
                    <insight.icone className={`w-6 h-6 ${
                      insight.tipo === 'success' ? 'text-success' :
                      insight.tipo === 'warning' ? 'text-warning' :
                      'text-primary'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{insight.titulo}</h3>
                    <p className="text-muted-foreground">{insight.descricao}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
