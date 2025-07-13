
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  User,
  Phone,
  Plus,
  RefreshCw
} from "lucide-react";

const mockProspeccoes = [
  {
    id: 1,
    nome: "João Silva",
    telefone: "(11) 99999-9999",
    status: "Novo",
    origem: "Site",
    valor: "R$ 850"
  },
  {
    id: 2,
    nome: "Maria Santos",
    telefone: "(11) 88888-8888",
    status: "Contato",
    origem: "Indicação",
    valor: "R$ 1.200"
  }
];

export function ProspeccoesTable() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prospecções</h1>
          <p className="text-muted-foreground">
            Gerencie leads e oportunidades de venda
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="premium" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Prospecção
          </Button>
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Lista de Prospecções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Cliente</th>
                  <th className="text-left p-3 font-medium">Origem</th>
                  <th className="text-center p-3 font-medium">Status</th>
                  <th className="text-right p-3 font-medium">Valor Est.</th>
                  <th className="text-center p-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockProspeccoes.map((prospeccao) => (
                  <tr 
                    key={prospeccao.id} 
                    className="border-b border-border/50 hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">{prospeccao.nome}</p>
                          <p className="text-sm text-muted-foreground">{prospeccao.telefone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{prospeccao.origem}</Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant="outline" className="border-warning text-warning">
                        {prospeccao.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right font-medium">
                      {prospeccao.valor}
                    </td>
                    <td className="p-3 text-center">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
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
