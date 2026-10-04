import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { GtagRouteTracker } from "@/components/GtagRouteTracker";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RouteFallback } from "@/components/RouteFallback";
import { AppProviders } from "@/apps/AppProviders";
/** Layouts eager: se forem lazy + Suspense no topo, cada navegação desmonta o menu. */
import EmpresaLayout from "@/components/layouts/EmpresaLayout";
import { FuncionarioLayout } from "@/components/layouts/FuncionarioLayout";

const NotFound = lazy(() => import("@/pages/NotFound"));

const DashboardPage = lazy(() => import("@/pages/empresa/DashboardPage"));
const FuncionariosPage = lazy(() => import("@/pages/empresa/FuncionariosPage"));
const FuncionarioFormPage = lazy(() => import("@/pages/empresa/FuncionarioFormPage"));
const SolicitacoesPage = lazy(() => import("@/pages/empresa/SolicitacoesPage"));
const FeriasPage = lazy(() => import("@/pages/empresa/FeriasPage"));
const FeriadosPage = lazy(() => import("@/pages/empresa/FeriadosPage"));
const RelatoriosPage = lazy(() => import("@/pages/empresa/RelatoriosPage"));
const AuditoriaPage = lazy(() => import("@/pages/empresa/AuditoriaPage"));
const PerfilEmpresaPage = lazy(() => import("@/pages/empresa/PerfilEmpresaPage"));
const PontoFuncionarioPage = lazy(() => import("@/pages/empresa/PontoFuncionarioPage"));
const BancoHorasPage = lazy(() => import("@/pages/empresa/BancoHorasPage"));
const ConfigInicialPage = lazy(() => import("@/pages/empresa/ConfigInicialPage"));
const CobrancaPage = lazy(() => import("@/pages/empresa/CobrancaPage"));
const PagamentoPendentePage = lazy(() => import("@/pages/empresa/PagamentoPendentePage"));
const BancoHorasFuncionarioPage = lazy(() => import("@/pages/funcionario/BancoHorasPage"));

const BaterPontoPage = lazy(() => import("@/pages/funcionario/BaterPontoPage"));
const CalendarioPontoPage = lazy(() => import("@/pages/funcionario/CalendarioPontoPage"));
const FeriasFuncionarioPage = lazy(() => import("@/pages/funcionario/FeriasPage"));
const PerfilFuncionarioPage = lazy(() => import("@/pages/funcionario/PerfilPage"));
const SolicitacoesFuncionarioPage = lazy(() => import("@/pages/funcionario/SolicitacoesPage"));

const authenticatedRouteTree = (
  <Routes>
    <Route
      path="/empresa"
      element={
        <ProtectedRoute allowedTypes={["EMPRESA"]}>
          <EmpresaLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<DashboardPage />} />
      <Route path="config-inicial" element={<ConfigInicialPage />} />
      <Route path="funcionarios/novo" element={<FuncionarioFormPage />} />
      <Route path="funcionarios/:usuarioId/editar" element={<FuncionarioFormPage />} />
      <Route path="funcionarios" element={<FuncionariosPage />} />
      <Route path="espelho-ponto" element={<PontoFuncionarioPage />} />
      <Route path="espelho-ponto/:funcionarioId" element={<PontoFuncionarioPage />} />
      <Route path="banco-horas" element={<BancoHorasPage />} />
      <Route path="banco-horas/:funcionarioId" element={<BancoHorasPage />} />
      <Route path="solicitacoes" element={<SolicitacoesPage />} />
      <Route path="ferias" element={<FeriasPage />} />
      <Route path="feriados" element={<FeriadosPage />} />
      <Route path="geofences" element={<Navigate to="/empresa/perfil" replace />} />
      <Route path="relatorios" element={<RelatoriosPage />} />
      <Route path="auditoria" element={<AuditoriaPage />} />
      <Route path="pagamento-pendente" element={<PagamentoPendentePage />} />
      <Route path="cobranca" element={<CobrancaPage />} />
      <Route path="perfil" element={<PerfilEmpresaPage />} />
    </Route>

    <Route
      path="/funcionario"
      element={
        <ProtectedRoute allowedTypes={["FUNCIONARIO"]}>
          <FuncionarioLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<BaterPontoPage />} />
      <Route path="calendario" element={<CalendarioPontoPage />} />
      <Route path="espelho-ponto" element={<CalendarioPontoPage />} />
      <Route path="solicitacoes" element={<SolicitacoesFuncionarioPage />} />
      <Route path="banco-horas" element={<BancoHorasFuncionarioPage />} />
      <Route path="ferias" element={<FeriasFuncionarioPage />} />
      <Route path="perfil" element={<PerfilFuncionarioPage />} />
    </Route>

    <Route
      path="*"
      element={
        <Suspense fallback={<RouteFallback />}>
          <NotFound />
        </Suspense>
      }
    />
  </Routes>
);

export default function AuthenticatedApp() {
  return (
    <HelmetProvider>
      <AppProviders>
        <BrowserRouter>
          <GtagRouteTracker />
          <ScrollToTop />
          <AuthProvider>{authenticatedRouteTree}</AuthProvider>
        </BrowserRouter>
      </AppProviders>
    </HelmetProvider>
  );
}
