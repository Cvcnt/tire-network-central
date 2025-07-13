
import { Layout } from "@/components/layout/Layout";
import { KnowledgeManager } from "@/components/ai/KnowledgeManager";

const Knowledge = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient-gold">
              Base de Conhecimento IA
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie e organize o conhecimento da sua empresa com assistência de IA
            </p>
          </div>
        </div>
        
        <KnowledgeManager />
      </div>
    </Layout>
  );
};

export default Knowledge;
