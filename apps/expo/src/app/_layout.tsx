import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/trpc";


const RootLayout = () => {
  return (
    <TRPCProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f472b6",
          },
        }}
      />
      <StatusBar />
    </TRPCProvider>
  );
};

export default RootLayout;