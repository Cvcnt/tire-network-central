
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
  Building2,
  Star,
  Users,
  BarChart3,
  TrendingUp
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
    notifications: true,
    analytics: true,
    multiStore: false
  });
  const { toast } = useToast();

  // AI insights rotation
  useEffect(() => {
    const insights = [
      "🧠 Sistema IA otimizando performance para sua rede",
      "📊 Dashboard inteligente preparado com seus KPIs",
      "🎯 Previsões de vendas atualizadas em tempo real",
      "🚀 Multi-lojas sincronizadas e operacionais",
      "💼 Experiência premium ativada para gestores",
      "📈 Analytics avançado detectando oportunidades",
      "⚡ Performance otimizada para alta demanda",
      "🔒 Segurança enterprise ativa e monitorada"
    ];
    
    const interval = setInterval(() => {
      setAiInsight(insights[Math.floor(Math.random() * insights.length)]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate authentication process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (email && password) {
        // Save user preferences
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
        localStorage.setItem('aiAssistanceEnabled', userPreferences.aiAssistance.toString());
        localStorage.setItem('userEmail', email);
        
        toast({
          title: "🎉 Acesso autorizado com sucesso!",
          description: "Bem-vindo ao TireSaaS Enterprise - Sistema IA ativo",
          variant: "default",
        });
        
        // Redirect based on user type
        const userType = email.includes('admin') ? 'admin' : 'manager';
        setTimeout(() => {
          window.location.href = userType === 'admin' ? "/usuarios" : "/";
        }, 1000);
        
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      toast({
        title: "❌ Erro na autenticação",
        description: "Verifique suas credenciais e tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: string) => {
    toast({
      title: `🔐 Conectando com ${provider}`,
      description: "Autenticação OAuth em andamento...",
    });

    // Simulate OAuth process
    setTimeout(() => {
      toast({
        title: "✅ Conectado com sucesso",
        description: `Autenticação ${provider} realizada`,
        variant: "default",
      });
    }, 1500);
  };

  const togglePreference = (key: keyof typeof userPreferences) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDemoLogin = () => {
    setEmail("demo@tiresaas.com");
    setPassword("demo123");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Professional Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="w-full gradient-elegant relative">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-40 right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center items-start p-12 h-full text-foreground">
            <div className="flex items-center gap-4 mb-12 hover-glow-premium">
              <div className="w-16 h-16 gradient-premium rounded-2xl flex items-center justify-center shadow-glow">
                <Building2 className="w-9 h-9 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gradient-premium">TireSaaS</h1>
                <p className="text-muted-foreground text-lg">Enterprise Management System</p>
              </div>
            </div>
            
            <div className="space-y-8 max-w-lg">
              <h2 className="text-5xl font-bold leading-tight text-luxury">
                Gestão empresarial
                <span className="text-gradient-premium"> com inteligência</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Plataforma completa para redes de lojas com IA integrada, analytics avançado e controle centralizado multi-unidades.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 p-5 glass-premium rounded-xl hover-lift-premium">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-glow animate-pulse"></div>
                  <Brain className="w-6 h-6 text-primary" />
                  <span className="text-lg">IA Preditiva e Analytics Avançado</span>
                </div>
                <div className="flex items-center gap-4 p-5 glass-premium rounded-xl hover-lift-premium">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-glow animate-pulse"></div>
                  <BarChart3 className="w-6 h-6 text-primary" />
                  <span className="text-lg">Dashboard Enterprise em Tempo Real</span>
                </div>
                <div className="flex items-center gap-4 p-5 glass-premium rounded-xl hover-lift-premium">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-glow animate-pulse"></div>
                  <Users className="w-6 h-6 text-primary" />
                  <span className="text-lg">Gestão Multi-Lojas Unificada</span>
                </div>
                <div className="flex items-center gap-4 p-5 glass-premium rounded-xl hover-lift-premium">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-glow animate-pulse"></div>
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <span className="text-lg">Relatórios Executivos Personalizados</span>
                </div>
              </div>

              {/* AI Insight Display */}
              <div className="mt-8 p-4 glass-card rounded-xl border border-primary/30">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse-professional" />
                  <span className="text-sm font-medium text-primary">Assistente IA</span>
                </div>
                <p className="text-sm text-muted-foreground animate-fade-in">
                  {aiInsight}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Professional Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 gradient-elegant">
        <div className="w-full max-w-md animate-scale-in">
          <Card className="glass-premium shadow-elegant hover-lift-premium">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-6 lg:hidden">
                <div className="w-16 h-16 gradient-premium rounded-2xl flex items-center justify-center shadow-glow">
                  <Building2 className="w-9 h-9 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gradient-premium mb-2">
                Acesso Enterprise
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                Entre em sua conta executiva
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base font-medium">E-mail Corporativo</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@empresa.com"
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

                {/* Advanced Preferences */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Preferências do Sistema</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userPreferences.aiAssistance}
                        onChange={() => togglePreference('aiAssistance')}
                        className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
                      />
                      <span className="text-sm flex items-center gap-1">
                        <Brain className="w-3 h-3 text-primary" />
                        IA
                      </span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userPreferences.notifications}
                        onChange={() => togglePreference('notifications')}
                        className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
                      />
                      <span className="text-sm flex items-center gap-1">
                        <Shield className="w-3 h-3 text-primary" />
                        Alertas
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userPreferences.analytics}
                        onChange={() => togglePreference('analytics')}
                        className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
                      />
                      <span className="text-sm flex items-center gap-1">
                        <BarChart3 className="w-3 h-3 text-primary" />
                        Analytics
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userPreferences.multiStore}
                        onChange={() => togglePreference('multiStore')}
                        className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
                      />
                      <span className="text-sm flex items-center gap-1">
                        <Store className="w-3 h-3 text-primary" />
                        Multi-lojas
                      </span>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold"
                  variant="premium"
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
                      Acessar Sistema
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
                    onClick={() => handleOAuthLogin('Microsoft')}
                    className="h-11 glass-card border-primary/30 hover:border-primary hover:bg-primary/10"
                  >
                    Microsoft
                  </Button>
                </div>
              </div>

              {/* Demo Access */}
              <div className="mt-8 space-y-4">
                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={handleDemoLogin}
                    className="text-sm text-primary hover:text-primary-hover"
                  >
                    🚀 Acesso Demo Rápido
                  </Button>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  <div className="space-y-2 text-xs glass-card p-4 rounded-lg border border-primary/20">
                    <p><strong className="text-primary">E-mail:</strong> demo@tiresaas.com</p>
                    <p><strong className="text-primary">Senha:</strong> demo123</p>
                    <p className="text-xs opacity-75">Ou admin@tiresaas.com para acesso administrativo</p>
                  </div>
                </div>
              </div>

              {/* Additional Features Info */}
              <div className="mt-6 p-4 glass-card rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Sistema Enterprise</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Segurança bancária e criptografia end-to-end</li>
                  <li>• Backup automático e sincronização em nuvem</li>
                  <li>• Suporte 24/7 e treinamento especializado</li>
                  <li>• Integração com ERPs e sistemas existentes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
