import { Layout } from "@/components/Layout";
import { queryClient } from "@/utils/queryClient";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

const theme = createTheme({});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        {router.pathname === "/" ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </MantineProvider>
    </QueryClientProvider>
  );
}
