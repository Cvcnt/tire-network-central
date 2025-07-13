
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Store, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Brain, 
  Shield, 
  Zap,
  Crown,
  Star,
  Gem
} from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState("");
  const [userPreferences, setUserPreferences] = useState({
    theme: "dark",
    aiAssistance: true,
    notifications: true
  });
  const { toast } = useToast();

  // Simulação de IA para insights de login
  useEffect(() => {
    const insights = [
      "🧠 IA detectou padrão de acesso otimizado para seu perfil",
      "⚡ Sistema preparado para performance máxima",
      "🎯 Dashboard personalizado baseado em seu histórico",
      "🚀 Previsões de vendas atualizadas em tempo real",
      "💎 Experiência premium ativada para sua conta"
    ];
    
    const interval = setInterval(() => {
      setAiInsight(insights[Math.floor(Math.random() * insights.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula autenticação com IA
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "🎉 Login realizado com sucesso!",
          description: "Bem-vindo ao TireSaaS Premium - IA ativada",
          variant: "default",
        });
        
        // Salva preferências do usuário
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
        localStorage.setItem('aiAssistanceEnabled', 'true');
        
        // Redirect para dashboard
        window.location.href = "/";
      } else {
        toast({
          title: "❌ Erro no login",
          description: "Verifique suas credenciais",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleOAuthLogin = (provider: string) => {
    toast({
      title: `🔐 Conectando com ${provider}`,
      description: "Autenticação OAuth em andamento...",
    });
  };

  const togglePreference = (key: keyof typeof userPreferences) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Premium Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="w-full gradient-elegant relative">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-40 right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center items-start p-12 h-full text-foreground">
            <div className="flex items-center gap-4 mb-12 hover-glow-gold">
              <div className="w-16 h-16 gradient-gold rounded-2xl flex items-center justify-center shadow-glow">
                <Crown className="w-9 h-9 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gradient-gold">TireSaaS</h1>
                <p className="text-muted-foreground text-lg">Premium AI-Powered Management</p>
              </div>
            </div>
            
            <div className="space-y-8 max-w-lg">
              <h2 className="text-5xl font-bold leading-tight text-luxury">
                Revolucione sua gestão com
                <span className="text-gradient-gold"> Inteligência Artificial</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Sistema completo com IA integrada para previsões, insights automáticos e gestão inteligente de múltiplas lojas.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 p-5 glass-premium rounded-xl hover-lift-premium">
                  <div className="w-3 h-3 bg-success rounded-full shadow-glow animate-glow-pulse"></div>
                  <Brain className="w-6 h-6 text-primary" />
                  <span className="text-lg">IA Preditiva para Vendas e Estoque</span>
                </div>
                <div className="flex items-center gap-4 p-5 glass-premium rounded-xl hover-lift-premium">
                  <div className="w-3 h-3 bg-success rounded-full shadow-glow animate-glow-pulse"></div>
                  <Zap className="w-6 h-6 text-primary" />
                  <span className="text-lg">Dashboard em Tempo Real com Insights</span>
                </div>
                <div className="flex items-center gap-4 p-5 glass-premium rounded-xl hover-lift-premium">
                  <div className="w-3 h-3 bg-success rounded-full shadow-glow animate-glow-pulse"></div>
                  <Gem className="w-6 h-6 text-primary" />
                  <span className="text-lg">Gestão Multi-Lojas Unificada</span>
                </div>
              </div>

              {/* AI Insight Display */}
              <div className="mt-8 p-4 glass-card rounded-xl border border-primary/30">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-sm font-medium text-primary">IA Assistant</span>
                </div>
                <p className="text-sm text-muted-foreground animate-fade-in">
                  {aiInsight}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Premium Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 gradient-elegant">
        <div className="w-full max-w-md animate-scale-in">
          <Card className="glass-premium shadow-elegant hover-lift-premium">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-6 lg:hidden">
                <div className="w-16 h-16 gradient-gold rounded-2xl flex items-center justify-center shadow-glow">
                  <Crown className="w-9 h-9 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gradient-gold mb-2">
                Premium Access
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                Entre em sua conta premium com IA
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base font-medium">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="pl-12 h-12 text-base glass-card border-primary/30 focus:border-primary focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-base font-medium">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Sua senha"
                      className="pl-12 pr-12 h-12 text-base glass-card border-primary/30 focus:border-primary focus:ring-primary/50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* User Preferences */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Preferências</Label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userPreferences.aiAssistance}
                        onChange={() => togglePreference('aiAssistance')}
                        className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
                      />
                      <span className="text-sm flex items-center gap-2">
                        <Brain className="w-4 h-4 text-primary" />
                        Ativar Assistente IA
                      </span>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userPreferences.notifications}
                        onChange={() => togglePreference('notifications')}
                        className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
                      />
                      <span className="text-sm flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        Notificações Inteligentes
                      </span>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold gradient-gold text-primary-foreground hover:opacity-90 shadow-glow hover:shadow-glow transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      Autenticando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Entrar Premium
                    </div>
                  )}
                </Button>
              </form>

              {/* OAuth Options */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm uppercase">
                    <span className="bg-card px-4 text-muted-foreground font-medium">
                      Ou continue com
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleOAuthLogin('Google')}
                    className="h-11 glass-card border-primary/30 hover:border-primary hover:bg-primary/10"
                  >
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOAuthLogin('Apple')}
                    className="h-11 glass-card border-primary/30 hover:border-primary hover:bg-primary/10"
                  >
                    Apple
                  </Button>
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="mt-8 space-y-4">
                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-3 font-medium">🚀 Credenciais de demonstração:</p>
                  <div className="space-y-2 text-xs glass-card p-4 rounded-lg border border-primary/20">
                    <p><strong className="text-primary">E-mail:</strong> demo@tiresaas.com</p>
                    <p><strong className="text-primary">Senha:</strong> demo123</p>
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
