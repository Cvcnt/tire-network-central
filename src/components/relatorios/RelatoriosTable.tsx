
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  TrendingUp,
  BarChart3,
  Calendar,
  Download
} from "lucide-react";

const relatoriosDisponiveis = [
  {
    id: 1,
    nome: "Vendas Mensais",
    descricao: "Relatório detalhado das vendas do mês",
    icone: TrendingUp,
    formato: "PDF/Excel"
  },
  {
    id: 2,
    nome: "Estoque Atual",
    descricao: "Situação atual do estoque por produto",
    icone: BarChart3,
    formato: "PDF/Excel"
  },
  {
    id: 3,
    nome: "Performance Vendedores",
    descricao: "Análise de performance da equipe",
    icone: Calendar,
    formato: "PDF"
  }
];

export function RelatoriosTable() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Gere relatórios detalhados do seu negócio
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatoriosDisponiveis.map((relatorio) => (
          <Card key={relatorio.id} className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <relatorio.icone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{relatorio.nome}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {relatorio.formato}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {relatorio.descricao}
              </p>
              <Button variant="professional" size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
