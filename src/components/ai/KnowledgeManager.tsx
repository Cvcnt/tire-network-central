
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Save, 
  X,
  Sparkles,
  BookOpen,
  Lightbulb,
  Target
} from "lucide-react";

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

export function KnowledgeManager() {
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    priority: "medium" as const
  });
  const [aiSuggestion, setAiSuggestion] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Carrega conhecimento salvo
    const saved = localStorage.getItem('knowledgeBase');
    if (saved) {
      setKnowledgeBase(JSON.parse(saved));
    }

    // Simula sugestões de IA
    const suggestions = [
      "💡 Considere adicionar informações sobre sazonalidade de pneus",
      "🎯 Documente processos de vendas para melhor treinamento",
      "📊 Registre insights sobre comportamento de clientes",
      "🔧 Adicione troubleshooting comum de sistemas",
      "⚡ Documente best practices de gestão de estoque"
    ];
    
    const interval = setInterval(() => {
      setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const saveKnowledge = () => {
    localStorage.setItem('knowledgeBase', JSON.stringify(knowledgeBase));
  };

  const addKnowledgeItem = () => {
    if (!newItem.title || !newItem.content) {
      toast({
        title: "❌ Campos obrigatórios",
        description: "Título e conteúdo são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const item: KnowledgeItem = {
      id: Date.now().toString(),
      title: newItem.title,
      content: newItem.content,
      category: newItem.category || 'Geral',
      tags: newItem.tags.split(',').map(t => t.trim()).filter(Boolean),
      priority: newItem.priority,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updated = [...knowledgeBase, item];
    setKnowledgeBase(updated);
    localStorage.setItem('knowledgeBase', JSON.stringify(updated));
    
    setNewItem({
      title: "",
      content: "",
      category: "",
      tags: "",
      priority: "medium"
    });

    toast({
      title: "✅ Conhecimento adicionado",
      description: "Item salvo na base de conhecimento",
    });
  };

  const deleteItem = (id: string) => {
    const updated = knowledgeBase.filter(item => item.id !== id);
    setKnowledgeBase(updated);
    localStorage.setItem('knowledgeBase', JSON.stringify(updated));
    
    toast({
      title: "🗑️ Item removido",
      description: "Conhecimento removido da base",
    });
  };

  const filteredItems = knowledgeBase.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Suggestion */}
      {aiSuggestion && (
        <Card className="glass-premium border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary mt-0.5 animate-pulse" />
              <div>
                <p className="text-sm font-medium text-primary mb-1">IA Assistant - Sugestão</p>
                <p className="text-sm text-muted-foreground">{aiSuggestion}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Knowledge */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            Adicionar Conhecimento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={newItem.title}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                placeholder="Título do conhecimento"
                className="glass-card"
              />
            </div>
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                placeholder="ex: Vendas, Estoque, Processos"
                className="glass-card"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="content">Conteúdo</Label>
            <textarea
              id="content"
              value={newItem.content}
              onChange={(e) => setNewItem({...newItem, content: e.target.value})}
              placeholder="Descreva o conhecimento detalhadamente..."
              className="w-full h-24 px-3 py-2 text-sm rounded-md border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring glass-card"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
              <Input
                id="tags"
                value={newItem.tags}
                onChange={(e) => setNewItem({...newItem, tags: e.target.value})}
                placeholder="vendas, cliente, processo"
                className="glass-card"
              />
            </div>
            <div>
              <Label htmlFor="priority">Prioridade</Label>
              <select
                id="priority"
                value={newItem.priority}
                onChange={(e) => setNewItem({...newItem, priority: e.target.value as any})}
                className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background glass-card"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>
          
          <Button onClick={addKnowledgeItem} className="w-full" variant="premium">
            <Save className="w-4 h-4 mr-2" />
            Salvar Conhecimento
          </Button>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar na base de conhecimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass-card"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4" />
          {filteredItems.length} itens
        </div>
      </div>

      {/* Knowledge Items */}
      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="glass-card hover-lift-premium">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {item.category}
                    </span>
                    <span className={`font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Média' : 'Baixa'} prioridade
                    </span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(item.id)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {item.content}
              </p>
              
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && searchTerm && (
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Nenhum conhecimento encontrado para "{searchTerm}"
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
