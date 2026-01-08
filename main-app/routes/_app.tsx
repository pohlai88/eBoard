import { define } from "@/utils.ts";

export default define.page(({ Component }) => {
  return (
    <html class="dark">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Axis eBoard - Governance System</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
});
