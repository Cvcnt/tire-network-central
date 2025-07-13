import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Store, Mail, Lock, Eye, EyeOff } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login - in production would use Supabase Auth
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao TireSaaS",
          variant: "default",
        });
        // Redirect to dashboard
        window.location.href = "/";
      } else {
        toast({
          title: "Erro no login",
          description: "Verifique suas credenciais",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="w-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/60"></div>
          <div className="relative z-10 flex flex-col justify-center items-start p-12 h-full text-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Store className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">TireSaaS</h1>
                <p className="text-white/80">Gestão Inteligente de Pneus</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                Revolucione a gestão das suas lojas de pneus
              </h2>
              <p className="text-xl text-white/90 max-w-lg">
                Controle de estoque inteligente, vendas em tempo real e insights de IA para maximizar seus resultados.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mt-8">
                <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Dashboard em tempo real com métricas avançadas</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Scanner de código de barras integrado</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Previsões de estoque com inteligência artificial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-subtle">
        <div className="w-full max-w-md">
          <Card className="glass-card shadow-elegant">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4 lg:hidden">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Store className="w-7 h-7 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Entrar na Plataforma</CardTitle>
              <p className="text-muted-foreground">
                Acesse sua conta e gerencie suas lojas
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Sua senha"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  variant="gradient"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>

              <div className="mt-6 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Demo Access
                    </span>
                  </div>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-2">Credenciais de demonstração:</p>
                  <div className="space-y-1 text-xs bg-muted/30 p-3 rounded-lg">
                    <p><strong>E-mail:</strong> demo@tiresaas.com</p>
                    <p><strong>Senha:</strong> demo123</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}