// @ts-nocheck
import { Suspense } from "react";
import Layout from "./component/layout";
import SearchComponent from "./component/serachpage";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading search results...</div>}>
      <Layout>
        <SearchComponent />
      </Layout>
    </Suspense>
  );
}
