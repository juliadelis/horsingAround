import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import VerCavalo from "../components/Cavalo";
import Grid from "../components/Grid";
import Home from "../components/Home";
import Layout from "../components/Layout";

import Add from "../pages/Add";
import Team from "../pages/Team";
import Organizations from "../pages/Organizations/Organizations";
import Update from "../pages/Update";
import Auth from "../pages/Auth/Auth";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Auth />} />

        {/* ROTAS PRIVADAS */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
          <Route index element={<Navigate to="/organizacoes" replace />} />

          <Route path="organizacoes" element={<Organizations />} />

          <Route path=":slug">
            <Route index element={<Home />} />
            <Route path="cavalos" element={<Grid />} />
            <Route path="adicionar_cavalo" element={<Add />} />
            <Route path="editar_cavalo/:id" element={<Update />} />
            <Route path="cavalos/:id" element={<VerCavalo />} />
            <Route path="equipe" element={<Team />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
