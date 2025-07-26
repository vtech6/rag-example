"use client";

import { Provider as ChakraProvider } from "@/components/ui/provider";
import { makeStore } from "@/store/store";
import { Provider } from "react-redux";

// I'm aware that by wrapping the children in redux store we're losing server components,
// but it does make sense when the scope of the app is just one client-side feature.

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <Provider store={makeStore()}>{children}</Provider>
    </ChakraProvider>
  );
}

export default Providers;
