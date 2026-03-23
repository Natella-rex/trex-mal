import Head from "next/head";

export default function MaliciousScriptInjector() {
  return (
    <Head>
      <script src="/mal.js"></script>
    </Head>
  );
}
