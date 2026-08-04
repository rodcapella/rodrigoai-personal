import { Helmet } from "react-helmet-async";
import { personSchemaData } from "@/data/personSchema";

export const PersonSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        ...personSchemaData,
      })}
    </script>
  </Helmet>
);
