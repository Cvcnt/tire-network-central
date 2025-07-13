import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Store, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  FileText, 
  TrendingUp,
  QrCode,
  Target,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Vendas", url: "/vendas", icon: ShoppingCart },
  { title: "Estoque", url: "/estoque", icon: Package },
  { title: "Produtos", url: "/produtos", icon: QrCode },
  { title: "Lojas", url: "/lojas", icon: Store },
  { title: "Usuários", url: "/usuarios", icon: Users },
  { title: "Prospecções", url: "/prospeccoes", icon: Target },
  { title: "Relatórios", url: "/relatorios", icon: FileText },
  { title: "Insights IA", url: "/insights", icon: TrendingUp },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavCls = (path: string) =>
    cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
      isActive(path)
        ? "bg-primary text-primary-foreground shadow-md"
        : "text-muted-foreground hover:text-foreground hover:bg-accent"
    );

  return (
    <div className={cn(
      "flex flex-col h-screen bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">TireSaaS</h1>
              <p className="text-xs text-muted-foreground">Gestão de Pneus</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-accent"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Store Selector */}
      {!isCollapsed && (
        <div className="p-4 border-b border-border">
          <div className="glass-card p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Loja Ativa</span>
            </div>
            <p className="text-sm text-muted-foreground">Centro Automotivo SP</p>
            <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
              Trocar Loja
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={getNavCls(item.url)}
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!isCollapsed ? (
          <div className="glass-card p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-success rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-success-foreground">JS</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">João Silva</p>
                <p className="text-xs text-muted-foreground">Proprietário</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full text-xs">
              Configurar Perfil
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-gradient-success rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-success-foreground">JS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}