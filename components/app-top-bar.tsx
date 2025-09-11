"use client";
import { usePathname } from "next/navigation";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SidebarTrigger } from "./ui/sidebar";

export default function AppTopBar() {
  const pathname = usePathname(); // e.g. "/dashboard"

  // Map pathnames to display names
  const getTitle = () => {
    if (pathname === "/dashboard/products") return "Products";
    if (pathname === "/dashboard/customers") return "Customers";
    if (pathname === "/") return "Dashboard";
    return "Sales";
  };

  const currentURL = getTitle();

  console.log("Current URL:", currentURL);

  return (
    <Box sx={{ flexGrow: 1 }} className="flex justify-between items-center px-4 border-b">
        <SidebarTrigger />
      <AppBar position="static" sx={{ bgcolor: "inherit", boxShadow: 'none' }}>
        <Toolbar variant="dense" className="flex justify-end">
          <Typography variant="h6" color="black" component="div">
            {currentURL}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
