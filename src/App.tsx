
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Vendas from "./pages/Vendas";
import Estoque from "./pages/Estoque";
import Produtos from "./pages/Produtos";
import Lojas from "./pages/Lojas";
import Usuarios from "./pages/Usuarios";
import Prospeccoes from "./pages/Prospeccoes";
import Relatorios from "./pages/Relatorios";
import Insights from "./pages/Insights";
import Configuracoes from "./pages/Configuracoes";
import Knowledge from "./pages/Knowledge";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/lojas" element={<Lojas />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/prospeccoes" element={<Prospeccoes />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
