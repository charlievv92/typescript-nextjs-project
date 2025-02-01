'use client';

import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "@components/shared-theme/AppTheme";

export default function AuthLayout({
  children
}:{children: React.ReactNode}){
  return  ( 
    
    <AppTheme>
      <CssBaseline enableColorScheme />
      {children} 
    </AppTheme>
    
  )
}