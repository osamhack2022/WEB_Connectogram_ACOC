import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthRoutes = ({ auth, component, redirect }) => {
  return (
    auth ? component : <Navigate to={redirect} />
  );
}

export default AuthRoutes;