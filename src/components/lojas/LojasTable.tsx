
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Store, 
  MapPin,
  Plus,
  RefreshCw,
  Settings
} from "lucide-react";

const mockLojas = [
  {
    id: 1,
    nome: "Centro Automotivo SP",
    endereco: "Rua das Flores, 123 - São Paulo/SP",
    status: "Ativa",
    vendedores: 8,
    vendas: "R$ 127.500"
  },
  {
    id: 2,
    nome: "Centro Automotivo RJ",
    endereco: "Av. Copacabana, 456 - Rio de Janeiro/RJ",
    status: "Ativa",
    vendedores: 6,
    vendas: "R$ 98.200"
  }
];

export function LojasTable() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lojas</h1>
          <p className="text-muted-foreground">
            Gerencie suas unidades de negócio
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="premium" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Loja
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockLojas.map((loja) => (
          <Card key={loja.id} className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Store className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{loja.nome}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {loja.endereco}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="border-success text-success">
                  {loja.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Vendedores</p>
                  <p className="text-2xl font-bold">{loja.vendedores}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vendas (mês)</p>
                  <p className="text-2xl font-bold text-success">{loja.vendas}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurar
                </Button>
                <Button variant="professional" size="sm" className="flex-1">
                  Selecionar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
