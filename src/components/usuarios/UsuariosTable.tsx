import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  Plus, 
  Settings, 
  Shield,
  Mail,
  Phone
} from "lucide-react";

// Mock data - em produção viria do Supabase
const mockUsuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@centro-automotivo.com",
    telefone: "(11) 99999-0001",
    perfil: "proprietario",
    loja: "Centro Automotivo SP",
    status: "ativo",
    ultimoAcesso: "2 horas atrás"
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@centro-automotivo.com",
    telefone: "(11) 99999-0002",
    perfil: "gerente",
    loja: "Centro Automotivo SP",
    status: "ativo",
    ultimoAcesso: "1 hora atrás"
  },
  {
    id: 3,
    nome: "Pedro Costa",
    email: "pedro@centro-automotivo.com",
    telefone: "(11) 99999-0003",
    perfil: "vendedor",
    loja: "Centro Automotivo SP",
    status: "ativo",
    ultimoAcesso: "30 min atrás"
  },
  {
    id: 4,
    nome: "Ana Lima",
    email: "ana@loja-oeste.com",
    telefone: "(11) 99999-0004",
    perfil: "gerente",
    loja: "Loja Oeste",
    status: "inativo",
    ultimoAcesso: "3 dias atrás"
  }
];

export function UsuariosTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const getPerfilBadge = (perfil: string) => {
    switch (perfil) {
      case "proprietario":
        return <Badge variant="default" className="bg-gradient-primary">Proprietário</Badge>;
      case "gerente":
        return <Badge variant="outline" className="border-success text-success">Gerente</Badge>;
      case "vendedor":
        return <Badge variant="outline">Vendedor</Badge>;
      default:
        return <Badge variant="outline">{perfil}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "ativo" 
      ? <Badge variant="outline" className="border-success text-success">Ativo</Badge>
      : <Badge variant="outline" className="border-destructive text-destructive">Inativo</Badge>;
  };

  const filteredUsuarios = mockUsuarios.filter(usuario =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.loja.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie usuários e permissões do sistema
          </p>
        </div>
        <Button variant="premium" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      {/* Search */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="metric-card metric-neutral">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Usuários</p>
                <p className="text-2xl font-bold">{mockUsuarios.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card metric-positive">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Usuários Ativos</p>
                <p className="text-2xl font-bold text-success">
                  {mockUsuarios.filter(u => u.status === "ativo").length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card metric-neutral">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Proprietários</p>
                <p className="text-2xl font-bold">
                  {mockUsuarios.filter(u => u.perfil === "proprietario").length}
                </p>
              </div>
              <Settings className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card metric-neutral">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vendedores</p>
                <p className="text-2xl font-bold">
                  {mockUsuarios.filter(u => u.perfil === "vendedor").length}
                </p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Usuário</th>
                  <th className="text-left p-3 font-medium">Perfil</th>
                  <th className="text-left p-3 font-medium">Loja</th>
                  <th className="text-center p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Último Acesso</th>
                  <th className="text-center p-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.map((usuario) => (
                  <tr 
                    key={usuario.id} 
                    className="border-b border-border/50 hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                          {usuario.nome.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{usuario.nome}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {usuario.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {usuario.telefone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      {getPerfilBadge(usuario.perfil)}
                    </td>
                    <td className="p-3">
                      <span className="text-sm">{usuario.loja}</span>
                    </td>
                    <td className="p-3 text-center">
                      {getStatusBadge(usuario.status)}
                    </td>
                    <td className="p-3">
                      <span className="text-sm text-muted-foreground">
                        {usuario.ultimoAcesso}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsuarios.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Nenhum usuário encontrado</p>
              <p className="text-sm">Tente ajustar os filtros de busca</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
